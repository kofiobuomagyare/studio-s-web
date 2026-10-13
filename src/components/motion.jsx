import { useEffect, useRef, useState } from "react";

/* Motion gates: immersive effects run only for fine-pointer users
   without a reduced-motion preference. Everyone else gets the
   calm static experience (which is also the SSR-safe default). */
export function useReducedMotion() {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return reduced;
}

export function useMotionEnabled() {
  const [enabled] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return fine && !calm;
  });
  return enabled;
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/* Lerped 3D tilt + scroll drift for a media element. A single rAF loop
   eases current values toward targets and stops itself when settled,
   so no work happens on idle pages. IO-gated + scroll-driven. */
export function useMediaMotion({ tiltMax = 5, drift = 26 } = {}) {
  const ref = useRef(null);
  const enabled = useMotionEnabled();
  const st = useRef({
    rx: 0, ry: 0, px: 0, trx: 0, try: 0, tpx: 0,
    raf: 0, running: false, visible: true, lastScroll: 0,
  });

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const s = st.current;

    const kick = () => {
      if (!s.running && s.visible) {
        s.running = true;
        el.style.willChange = "transform";
        s.raf = requestAnimationFrame(step);
      }
    };
    const step = () => {
      s.rx += (s.trx - s.rx) * 0.09;
      s.ry += (s.try - s.ry) * 0.09;
      s.px += (s.tpx - s.px) * 0.09;
      const settled =
        Math.abs(s.trx - s.rx) < 0.015 &&
        Math.abs(s.try - s.ry) < 0.015 &&
        Math.abs(s.tpx - s.px) < 0.06 &&
        performance.now() - s.lastScroll > 240;
      if (settled) {
        s.running = false;
        if (Math.abs(s.rx) < 0.02 && Math.abs(s.ry) < 0.02 && Math.abs(s.px) < 0.08) {
          el.style.transform = "";
          el.style.willChange = "";
        } else {
          el.style.transform = `translate3d(0, ${s.px.toFixed(2)}px, 0) perspective(1100px) rotateX(${s.rx.toFixed(3)}deg) rotateY(${s.ry.toFixed(3)}deg)`;
        }
        return;
      }
      el.style.transform = `translate3d(0, ${s.px.toFixed(2)}px, 0) perspective(1100px) rotateX(${s.rx.toFixed(3)}deg) rotateY(${s.ry.toFixed(3)}deg)`;
      s.raf = requestAnimationFrame(step);
    };

    const retarget = () => {
      const r = el.getBoundingClientRect();
      const off = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      s.tpx = clamp(-off * 44, -drift, drift);
      s.lastScroll = performance.now();
      kick();
    };
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        if (s.visible) retarget();
      });
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        s.visible = entry.isIntersecting;
        if (s.visible) retarget();
        else if (s.running) {
          cancelAnimationFrame(s.raf);
          s.running = false;
        }
      },
      { threshold: 0 }
    );
    io.observe(el);
    retarget();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(s.raf);
      cancelAnimationFrame(scrollRaf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      s.running = false;
      el.style.transform = "";
      el.style.willChange = "";
    };
  }, [enabled, tiltMax, drift]);

  const onPointerMove = (e) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    const s = st.current;
    s.try = clamp(nx * 2 * tiltMax, -tiltMax, tiltMax);
    s.trx = clamp(-ny * 2 * tiltMax, -tiltMax, tiltMax);
    s.lastScroll = performance.now();
    if (!s.running && s.visible) {
      s.running = true;
      el.style.willChange = "transform";
      s.raf = requestAnimationFrame(function step() {
        s.rx += (s.trx - s.rx) * 0.09;
        s.ry += (s.try - s.ry) * 0.09;
        s.px += (s.tpx - s.px) * 0.09;
        el.style.transform = `translate3d(0, ${s.px.toFixed(2)}px, 0) perspective(1100px) rotateX(${s.rx.toFixed(3)}deg) rotateY(${s.ry.toFixed(3)}deg)`;
        const settled =
          Math.abs(s.trx - s.rx) < 0.015 &&
          Math.abs(s.try - s.ry) < 0.015 &&
          Math.abs(s.tpx - s.px) < 0.06;
        if (settled) {
          s.running = false;
          if (Math.abs(s.rx) < 0.02 && Math.abs(s.ry) < 0.02 && Math.abs(s.px) < 0.08) {
            el.style.transform = "";
            el.style.willChange = "";
          }
          return;
        }
        s.raf = requestAnimationFrame(step);
      });
    }
  };
  const onPointerLeave = () => {
    if (!enabled) return;
    st.current.trx = 0;
    st.current.try = 0;
  };
  return { ref, onPointerMove, onPointerLeave, motionOn: enabled };
}

/* Magnetic wrapper: nudges interactive children toward the cursor
   (capped), then springs back. Pointer-fine devices only. */
export function Magnetic({ children, strength = 12, className = "" }) {
  const enabled = useMotionEnabled();
  const ref = useRef(null);
  if (!enabled) return <span className={className}>{children}</span>;
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = clamp((e.clientX - (r.left + r.width / 2)) * 0.28, -strength, strength);
    const dy = clamp((e.clientY - (r.top + r.height / 2)) * 0.28, -strength, strength);
    el.classList.remove("snap");
    el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("snap");
    el.style.transform = "";
    window.setTimeout(() => el.classList.remove("snap"), 480);
  };
  return (
    <span ref={ref} className={`magnetic ${className}`.trim()} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  );
}

/* Ambient ember-dust canvas. Low particle count, DPR capped,
   IO-gated, static (rendered as nothing) under reduced motion. */
export function ParticleField({ max = 56, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rnd = (a, b) => a + Math.random() * (b - a);
    const TONES = ["255, 232, 200", "255, 204, 164", "255, 244, 230"];
    let parts = [];
    const seed = () => {
      const n = Math.max(18, Math.min(max, Math.floor(w / 26)));
      parts = Array.from({ length: n }, () => ({
        x: rnd(0, w), y: rnd(0, h), r: rnd(0.7, 2.4),
        vy: rnd(-0.28, -0.08), sway: rnd(0.2, 0.9), ph: rnd(0, Math.PI * 2),
        tw: rnd(0.5, 1.6), a: rnd(0.14, 0.42), tone: TONES[(Math.random() * TONES.length) | 0],
      }));
    };
    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);
    let prev = performance.now();
    const tick = (now) => {
      if (!visible) return;
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;
      for (const p of parts) {
        p.y += p.vy * 60 * dt * 0.28;
        p.ph += dt * p.sway;
        if (p.y < -6) { p.y = h + 6; p.x = rnd(0, w); }
        const alpha = p.a * (0.45 + 0.55 * Math.abs(Math.sin(t * p.tw + p.ph)));
        const x = p.x + Math.sin(p.ph) * 9;
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.tone}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        const was = visible;
        visible = entry.isIntersecting;
        if (visible && !was) { prev = performance.now(); raf = requestAnimationFrame(tick); }
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    raf = requestAnimationFrame(tick);
    const onVis = () => {
      if (!document.hidden && visible) { prev = performance.now(); raf = requestAnimationFrame(tick); }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced, max]);
  if (reduced) return null;
  return <canvas ref={ref} className={`particle-field ${className}`.trim()} aria-hidden="true" />;
}

/* Scroll-velocity marquee: base drift plus a boost from scroll speed,
   with a matching skew. Static text under reduced motion. */
export function VelocityMarquee({ children, className = "", base = 46, cap = 340 }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;
    let x = 0, boost = 0, target = 0, half = 0, raf = 0, run = true;
    let lastY = window.scrollY, lastT = performance.now(), prev = performance.now();
    const measure = () => { half = track.scrollWidth / 2; };
    measure();
    const onScroll = () => {
      const now = performance.now();
      const v = Math.abs(window.scrollY - lastY) / Math.max(now - lastT, 1);
      lastY = window.scrollY;
      lastT = now;
      target = Math.min(v * 230, cap);
    };
    const tick = (now) => {
      if (!run) return;
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      target *= 0.93;
      boost += (target - boost) * 0.09;
      x -= (base + boost) * dt;
      if (half > 0) x = x % half;
      const skew = clamp(-boost * 0.018, -7, 0);
      track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        run = entry.isIntersecting;
        if (run) { prev = performance.now(); lastT = prev; raf = requestAnimationFrame(tick); }
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );
    io.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [reduced, base, cap]);
  if (reduced) {
    return (
      <div className={`strip ${className}`.trim()} aria-hidden="true">
        <div className="strip-inner">
          <span>{children}</span>
        </div>
      </div>
    );
  }
  return (
    <div ref={wrapRef} className={`strip ${className}`.trim()} aria-hidden="true">
      <div ref={trackRef} className="strip-inner driven">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

/* Back-to-top: appears as soon as the reader starts scrolling down the page,
   stays visible while scrolling, and scrolls smoothly home on click. Instant
   jump under reduced motion. */
export default function BackToTop({ lifted = false }) {
  const [visible, setVisible] = useState(false);
  const [inFooter, setInFooter] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      setVisible(window.scrollY > 0);
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        // The indicator is pinned to the bottom-right; treat it as being
        // "within the footer" once the footer reaches that area of the viewport.
        setInFooter(rect.top <= window.innerHeight - 24);
      } else {
        setInFooter(false);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTop = () => {
    const calm =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      className={`to-top${visible ? " show" : ""}${lifted ? " lifted" : ""}${inFooter ? " in-footer" : ""}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={goTop}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

import { useEffect, useState } from "react";

/* Back-to-top: appears as the reader nears the bottom of the page and
   scrolls smoothly home on click. Instant jump under reduced motion. */
export default function BackToTop({ lifted = false }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500;
      setVisible(nearBottom);
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
      type="button"
      className={`to-top${visible ? " show" : ""}${lifted ? " lifted" : ""}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={goTop}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

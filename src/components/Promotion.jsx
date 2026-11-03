import { useEffect, useRef, useState } from "react";
import studioLogo from "../assets/studio-s-logo.svg";
import { STUDIO_S_CONFIG } from "../config.js";

const STORAGE_KEY = "studio-s-podcast-support-promo";
const APPLICATION_URL = "https://forms.gle/kCDFrUQ3AHKdztkC7";
const PODCAST_IMAGE = "/images/studio/audio-production.jpg";

function getInitialState() {
  try {
    const savedState = window.localStorage.getItem(STORAGE_KEY);
    if (savedState === "banner" || savedState === "dismissed") return savedState;
  } catch {
    // Keep the promotion usable when browser storage is unavailable.
  }
  return "modal";
}

function saveState(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // The in-memory state still works for this visit when storage is unavailable.
  }
}

export default function Promotion() {
  const [state, setState] = useState(getInitialState);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (state !== "modal") return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const background = [
      document.querySelector(".site-head"),
      document.querySelector("main"),
      document.querySelector("footer"),
      document.querySelector(".to-top"),
    ].filter(Boolean);

    document.body.style.overflow = "hidden";
    background.forEach((element) => {
      element.dataset.promoInert = element.inert ? "true" : "false";
      element.inert = true;
    });
    closeButtonRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        saveState("banner");
        setState("banner");
      }

      if (event.key !== "Tab") return;
      const dialog = document.querySelector(".promo-dialog");
      const focusable = dialog?.querySelectorAll("a[href], button:not([disabled])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => {
        element.inert = element.dataset.promoInert === "true";
        delete element.dataset.promoInert;
      });
      document.removeEventListener("keydown", onKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [state]);

  function dismissModal() {
    saveState("banner");
    setState("banner");
  }

  function dismissBanner() {
    saveState("dismissed");
    setState("dismissed");
  }

  if (state === "dismissed") return null;

  if (state === "banner") {
    return (
      <aside className="promo-banner" aria-label="Podcast studio support promotion">
        <div className="promo-banner-inner">
          <img className="promo-banner-logo" src={studioLogo} alt="" width="34" height="34" aria-hidden="true" />
          <p>
            <strong>Got a podcast idea?</strong>{" "}
            Get 3 months of free studio support.
          </p>
          <a
            className="promo-banner-apply"
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply now <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="promo-close promo-banner-close"
            aria-label="Dismiss promotion announcement"
            onClick={dismissBanner}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <div className="promo-overlay">
      <section
        className="promo-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        aria-describedby="promo-description"
      >
        <div className="promo-visual">
          <img
            src={PODCAST_IMAGE}
            alt=""
            width="845"
            height="1200"
            loading="eager"
            decoding="async"
            aria-hidden="true"
          />
          <span className="promo-visual-label">STUDIO OF STORIES · TEMA</span>
          <span className="promo-visual-note">Your story deserves a room.</span>
        </div>
        <div className="promo-content">
          <button
            ref={closeButtonRef}
            type="button"
            className="promo-close promo-modal-close"
            aria-label="Dismiss promotion"
            onClick={dismissModal}
          >
            <span aria-hidden="true">×</span>
          </button>
          <span className="promo-kicker">A little room for a big idea</span>
          <h2 className="display promo-title" id="promo-title">
            3 months of <i>free studio support.</i>
          </h2>
          <p className="promo-description" id="promo-description">
            What if your podcast idea is the one someone needs to hear?
            We&apos;re sponsoring one exceptional idea with 3 months of free
            studio support.
          </p>
          <div className="promo-location">
            <span>One exceptional idea</span>
            <span aria-hidden="true">·</span>
            <span>{STUDIO_S_CONFIG.studioAddress}</span>
          </div>
          <a
            className="btn btn-ember promo-apply"
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismissModal}
          >
            Apply now <span aria-hidden="true">↗</span>
          </a>
          <p className="promo-contact">
            Questions? <a href={`tel:${STUDIO_S_CONFIG.phone.replace(/[^\d+]/g, "")}`}>{STUDIO_S_CONFIG.phone}</a>
            <span aria-hidden="true"> · </span>
            <a href={`mailto:${STUDIO_S_CONFIG.email}`}>Email Studio S</a>
          </p>
        </div>
      </section>
    </div>
  );
}

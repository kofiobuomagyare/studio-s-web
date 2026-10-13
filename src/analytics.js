// Privacy-first analytics (Plausible, cookieless). Everything here is inert
// unless VITE_PLAUSIBLE_DOMAIN is set at build time AND the visitor accepts
// tracking in the consent banner. See README "Analytics & privacy".
const CONSENT_KEY = "studio-s-consent";
const PLAUSIBLE_SRC = import.meta.env.VITE_PLAUSIBLE_SRC || "https://plausible.io/js/manual.js";

export function analyticsConfigured() {
  return Boolean(import.meta.env.VITE_PLAUSIBLE_DOMAIN);
}

export function getConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function setStoredConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode etc. — consent simply won't persist */
  }
}

export function loadAnalytics() {
  if (!analyticsConfigured() || document.querySelector('script[data-plausible]')) return;
  const s = document.createElement("script");
  s.defer = true;
  s.dataset.plausible = "true";
  s.dataset.domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  s.src = PLAUSIBLE_SRC;
  document.head.appendChild(s);
}

export function acceptTracking() {
  setStoredConsent("accepted");
  loadAnalytics();
  trackPageview();
}

export function declineTracking() {
  setStoredConsent("declined");
}

export function trackPageview() {
  if (getConsent() === "accepted" && typeof window.plausible === "function") {
    window.plausible("pageview");
  }
}

export function trackBookingClick() {
  if (getConsent() === "accepted" && typeof window.plausible === "function") {
    window.plausible("Booking CTA");
  }
}

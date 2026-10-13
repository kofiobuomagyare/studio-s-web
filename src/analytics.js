// Privacy-first analytics (Plausible, cookieless). Everything here is inert
// unless VITE_PLAUSIBLE_DOMAIN is set at build time AND the visitor accepts
// tracking in the consent banner. See README "Analytics & privacy".
const CONSENT_KEY = "studio-s-consent";
const CONSENT_DAYS = 180;
const PLAUSIBLE_SRC = import.meta.env.VITE_PLAUSIBLE_SRC || "https://plausible.io/js/manual.js";

export function analyticsConfigured() {
  return Boolean(import.meta.env.VITE_PLAUSIBLE_DOMAIN);
}

function cookieAttrs(days) {
  // Domain is intentionally omitted so the cookie stays host-only (never
  // leaks to subdomains). Secure is added on HTTPS, which Vercel enforces.
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  return `; Max-Age=${days * 86400}; Path=/; SameSite=Lax${secure}`;
}

export function getConsent() {
  try {
    const pair = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${encodeURIComponent(CONSENT_KEY)}=`));
    if (!pair) return null;
    const value = decodeURIComponent(pair.slice(pair.indexOf("=") + 1));
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

function setStoredConsent(value) {
  try {
    document.cookie = `${encodeURIComponent(CONSENT_KEY)}=${encodeURIComponent(value)}${cookieAttrs(CONSENT_DAYS)}`;
  } catch {
    /* cookies blocked — the banner simply reappears next visit */
  }
}

export function clearConsent() {
  try {
    document.cookie = `${encodeURIComponent(CONSENT_KEY)}=; Max-Age=0; Path=/; SameSite=Lax`;
  } catch {
    /* ignore */
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

import { useState } from "react";
import { acceptTracking, analyticsConfigured, declineTracking, getConsent } from "../analytics.js";

/* Cookie/tracking consent. Renders nothing at all unless analytics has been
   configured AND the visitor hasn't chosen yet — this site sets no cookies
   and runs zero tracking by default. */
export default function ConsentBanner({ onResolve } = {}) {
  const [visible, setVisible] = useState(() => analyticsConfigured() && getConsent() === null);
  if (!visible) return null;
  const done = () => {
    setVisible(false);
    onResolve?.();
  };
  return (
    <div className="consent" role="dialog" aria-modal="false" aria-label="Tracking consent">
      <p>
        <b>Your call on tracking.</b>{" "}
        We only measure visits if you accept — your choice is remembered in a
        single consent cookie (up to 6 months, never advertising). See our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <div className="consent-actions">
        <button
          type="button"
          className="btn btn-ember btn-sm"
          onClick={() => { acceptTracking(); done(); }}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => { declineTracking(); done(); }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

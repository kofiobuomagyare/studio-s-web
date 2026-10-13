import { useState } from "react";
import { acceptTracking, analyticsConfigured, declineTracking, getConsent } from "../analytics.js";

/* Cookie/tracking consent. Renders nothing at all unless analytics has been
   configured AND the visitor hasn't chosen yet — this site sets no cookies
   and runs zero tracking by default. */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(() => analyticsConfigured() && getConsent() === null);
  if (!visible) return null;
  return (
    <div className="consent" role="dialog" aria-modal="false" aria-label="Tracking consent">
      <p>
        <b>Your call on tracking.</b>{" "}
        We only measure visits if you accept — no cookies either way, and you can change
        your mind by clearing this site&apos;s data. See our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <div className="consent-actions">
        <button
          type="button"
          className="btn btn-solid btn-sm"
          onClick={() => { acceptTracking(); setVisible(false); }}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => { declineTracking(); setVisible(false); }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

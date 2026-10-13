import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks.js";

export default function Privacy() {
  usePageMeta(
    "Privacy Policy — Studio S",
    "How Studio S collects, uses and protects your information when you enquire or request a booking."
  );
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Privacy Policy</p>
        <span className="kicker">Your information</span>
        <h1 className="display h-giant">Privacy, <i>plainly stated.</i></h1>
        <p className="lede">This website collects as little as possible, and only what is needed to answer enquiries and arrange bookings. Have this policy reviewed by legal counsel before relying on it.</p>
      </div></div>
      <section className="section"><div className="wrap prose">
        <p className="hint">Last updated: October 2026.</p>
        <h2 className="display h-md">What we collect</h2>
        <ul>
          <li><b>Booking requests:</b> when you submit the official Google Form, Google collects your name, contact details, preferred dates and project brief on our behalf. That data is governed by Google&apos;s privacy terms as well as this policy.</li>
          <li><b>Email enquiries:</b> anything you choose to send to studios@smartlinepublishers.com.</li>
          <li><b>Consent choices:</b> your cookie/analytics preference is stored only in your own browser (local storage) — never sent to us.</li>
        </ul>
        <h2 className="display h-md">What we don&apos;t do</h2>
        <ul>
          <li>No accounts, no passwords, no payment details are collected on this website.</li>
          <li>No tracking, analytics or advertising scripts run until you explicitly accept them in the consent banner — and only if analytics has been configured at all.</li>
          <li>We never sell your information or share it beyond what is needed to deliver your booking (for example, confirming crew availability).</li>
        </ul>
        <h2 className="display h-md">How we use it</h2>
        <p>To reply to enquiries, check availability, prepare quotes, confirm bookings and improve our services. We keep enquiry records only as long as needed for these purposes.</p>
        <h2 className="display h-md">Your rights</h2>
        <p>Ask us at any time what we hold about you, or ask us to correct or delete it, via the <Link to="/contact">contact page</Link>. We will respond within a reasonable time.</p>
        <h2 className="display h-md">External links</h2>
        <p>Booking runs on Google Forms, maps on Google Maps, and social profiles on their own platforms — each applies its own privacy terms once you leave this site.</p>
      </div></section>
    </>
  );
}

import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { usePageMeta } from "../hooks.js";

export default function Terms() {
  usePageMeta(
    "Terms & Conditions — Studio S",
    "The terms that apply when you enquire about or book Studio S facilities and production services."
  );
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Terms &amp; Conditions</p>
        <span className="kicker">The fine print, in plain language</span>
        <h1 className="display h-giant">Terms that <i>protect both sides.</i></h1>
        <p className="lede">Short version: a request is not a booking until we confirm it in writing, prices follow the published rate card, and anything extra is agreed before the clock runs. Have these terms reviewed by legal counsel.</p>
      </div></div>
      <section className="section"><div className="wrap prose">
        <p className="hint">Last updated: October 2026.</p>
        <h2 className="display h-md">Requests vs confirmations</h2>
        <p>Submitting the <BookingLink to="/booking">booking form</BookingLink> is a request for availability — not a confirmed booking. Your date is locked only when Studio S confirms it back to you in writing, with the agreed service, time and price.</p>
        <h2 className="display h-md">Prices &amp; payment</h2>
        <p>Package prices follow the <Link to="/rate-card">rate card</Link> (Ghana cedis). Extra hours, overtime, additional crew and extended edits are charged per the published rates and agreed before they happen. Deposit, cancellation and rescheduling terms are confirmed in writing before each booking.</p>
        <h2 className="display h-md">On the day</h2>
        <ul>
          <li>Arrive ready at your confirmed call time; set-up and wrap happen inside your booked window unless agreed otherwise.</li>
          <li>Treat rooms, equipment and other people&apos;s sessions with care. Damage or loss caused by your party may be charged at replacement cost.</li>
          <li>Follow the reasonable directions of studio staff, especially around sound levels, safety and other clients&apos; privacy.</li>
        </ul>
        <h2 className="display h-md">Your content</h2>
        <p>You keep full ownership of everything you create at Studio S. By sharing references or brand assets with us, you confirm you have the right to use them. Finished work is delivered in the formats agreed at booking.</p>
        <h2 className="display h-md">Changes &amp; cancellations</h2>
        <p>Life happens — tell us as early as you can and we will try to move your date. Late cancellations may attract the fee stated in your written confirmation, since the room was held for you.</p>
        <h2 className="display h-md">Liability</h2>
        <p>We take reasonable care of people, premises and equipment, but we are not liable for indirect losses such as missed opportunities or third-party costs arising from a delayed or rescheduled session. Nothing here limits liability that cannot legally be limited.</p>
        <h2 className="display h-md">Questions</h2>
        <p>Anything unclear? <Link to="/contact">Ask us</Link> before you book — we would rather agree expectations upfront.</p>
      </div></section>
    </>
  );
}

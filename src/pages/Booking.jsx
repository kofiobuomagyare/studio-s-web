import { Link } from "react-router-dom";
import { BookingFormLink } from "../components/Layout.jsx";
import { usePageMeta } from "../hooks.js";

export default function Booking() {
  usePageMeta("Booking — Studio S | How to request a date", "How to book Studio S in five steps, what to prepare, and the official Google Form request link.");
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Booking</p>
        <span className="kicker">Request, we confirm</span>
        <h1 className="display h-giant">Booking in <i>five moves.</i></h1>
        <p className="lede">Submitting the form is a request — not a confirmation. We reply with availability, a quote where needed, and written confirmation.</p>
      </div></div>
      <section className="section"><div className="wrap two-col booking-layout">
        <div className="bsteps">
          <div className="bstep"><span className="bstep-num">1</span><div><h2>Explore spaces &amp; services</h2><p className="mut">Walk the <Link to="/spaces">rooms</Link> and pick your <Link to="/services">craft</Link> — note which room fits your crew size and setup.</p></div></div>
          <div className="bstep"><span className="bstep-num">2</span><div><h2>Check the rate card</h2><p className="mut">Find your shape — hourly, half / full day, or project quote — on the <Link to="/rate-card">rate card</Link>.</p></div></div>
          <div className="bstep"><span className="bstep-num">3</span><div><h2>Prepare your details</h2>
            <ul className="checklist"><li>Preferred date + backup date, arrival &amp; wrap times</li><li>Service / room, headcount, equipment needs</li><li>Brief: what you&apos;re making, references, deliverables</li><li>Contact name, phone, email</li></ul></div></div>
          <div className="bstep"><span className="bstep-num">4</span><div><h2>Submit the official form</h2>
            <p className="mut">One form for every request. Opens in a new tab; takes about 3 minutes. Your date is only locked when we confirm it in writing.</p>
            <p><BookingFormLink className="btn btn-ember">Open the booking form <span aria-hidden="true">↗</span></BookingFormLink></p>
            <p className="hint">This opens the official Studio S Google Form in a new tab. Submitting is a request, not a confirmation.</p></div></div>
          <div className="bstep"><span className="bstep-num">5</span><div><h2>Wait for our confirmation</h2><p className="mut">We review, check the calendar, and reply with availability + next steps (quote, deposit if any, call-time). Your date is locked only on written confirmation.</p></div></div>
        </div>
        <aside className="card booking-sidebar" aria-label="Booking requirements">
          <h2 className="display h-md">Good to know</h2><div className="rule"></div>
          <p><b>Requirements:</b> <span className="mut">valid contact, clear date/time, brief. If a deposit or ID is required for your booking, we will confirm it in writing before you pay.</span></p>
          <p><b>Lead time:</b> <span className="mut">send your request as early as you can — weekends and full-day shoots book out first.</span></p>
          <p><b>Cancellations:</b> <span className="mut">any cancellation or rescheduling terms are agreed in writing before you book.</span></p>
          <div className="rule"></div>
          <p><BookingFormLink className="btn btn-solid">Open the booking form <span aria-hidden="true">↗</span></BookingFormLink></p>
          <p className="hint">Problems with the form? <Link to="/contact">Contact us directly</Link>.</p>
          <div className="rule"></div>
          <p><b>At a glance</b></p>
          <ul className="checklist">
            <li><Link to="/spaces">Choose a room</Link></li>
            <li><Link to="/services">Choose a craft</Link></li>
            <li><Link to="/rate-card">Check rates</Link></li>
            <li><Link to="/contact">Ask for a quote</Link></li>
          </ul>
        </aside>
      </div></section>
    </>
  );
}

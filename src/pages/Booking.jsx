import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
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
      <section className="section"><div className="wrap two-col">
        <div className="bsteps">
          <div className="bstep"><span className="bstep-num">1</span><div><h3>Explore spaces &amp; services</h3><p className="mut">Walk the <Link to="/spaces">rooms</Link> and pick your <Link to="/services">craft</Link> — note which room fits your crew size and setup.</p></div></div>
          <div className="bstep"><span className="bstep-num">2</span><div><h3>Check the rate card</h3><p className="mut">Find your shape — hourly, half / full day, or project quote — on the <Link to="/rate-card">rate card</Link>.</p></div></div>
          <div className="bstep"><span className="bstep-num">3</span><div><h3>Prepare your details</h3>
            <ul className="checklist"><li>Preferred date + backup date, arrival &amp; wrap times</li><li>Service / room, headcount, equipment needs</li><li>Brief: what you&apos;re making, references, deliverables</li><li>Contact name, phone, email</li></ul></div></div>
          <div className="bstep"><span className="bstep-num">4</span><div><h3>Submit the official form</h3>
            <p className="mut">One form for every request. Opens in a new tab; takes about 3 minutes.</p>
            <p><BookingLink className="btn btn-ember">Request a Booking — Google Form</BookingLink></p>
            <p className="hint">This opens the official Studio S Google Form in a new tab.</p></div></div>
          <div className="bstep"><span className="bstep-num">5</span><div><h3>Wait for our confirmation</h3><p className="mut">We review, check the calendar, and reply with availability + next steps (quote, deposit if any, call-time). Your date is locked only on written confirmation.</p></div></div>
        </div>
        <aside className="card" aria-label="Booking requirements">
          <h2 className="display h-md">Good to know</h2><div className="rule"></div>
          <p><b>Requirements:</b> <span className="mut">valid contact, clear date/time, brief. ID or deposit only if the studio confirms it — currently <span className="tbd">TBC</span>.</span></p>
          <p><b>Lead time:</b> <span className="mut">earlier is safer for weekends. Minimum notice <span className="tbd">TBC</span>.</span></p>
          <p><b>Cancellations:</b> <span className="mut">windows &amp; fees <span className="tbd">TBC</span> — agreed in writing before you book.</span></p>
          <div className="rule"></div>
          <p><BookingLink className="btn btn-solid">Open the booking form</BookingLink></p>
          <p className="hint">Problems with the form? <Link to="/contact">Contact us directly</Link>.</p>
        </aside>
      </div></section>
    </>
  );
}

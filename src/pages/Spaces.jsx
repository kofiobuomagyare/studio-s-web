import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { usePageMeta } from "../hooks.js";
import { unsplashSrcSet } from "../imageUtils.js";

export default function Spaces() {
  usePageMeta("Studio Spaces — Studio S", "Tour Studio S spaces: sound & podcast room, daylight photo studio and creative lounge — atmosphere, uses and amenities.");
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Spaces</p>
        <span className="kicker">Rooms &amp; facilities</span>
        <h1 className="display h-giant">Rooms with <i>a point of view.</i></h1>
        <p className="lede">Three rooms with clear purposes. Full kit lists and dimensions are shared when you enquire, so we can match the room to your production.</p>
      </div></div>
      <section className="section"><div className="wrap">
        <article className="split" style={{ marginBottom: 60 }}>
          <div className="img-stack"><img className="main" src="/images/studio/space-1.jpg" alt="Studio S recording set-up from the official rate card" width="800" height="534" loading="lazy" decoding="async" /></div>
          <div className="copy"><span className="kicker">Space A — quiet</span><h2 className="display h-lg">Sound &amp; Podcast Room</h2>
            <p>Our quietest room. Treated walls, closed door, controlled light — built for voices, interviews and small ensemble records.</p>
            <ul className="checklist"><li>Best for: podcasts, voiceovers, interviews</li><li>Atmosphere: warm, low-stimulus, focused</li><li>Included: seating for hosts + guests, engineer position</li></ul>
            <p><Link to="/rate-card#podcast">Rates</Link> · <BookingLink to="/booking">Request this room</BookingLink></p></div>
        </article>
        <article className="split flip" style={{ marginBottom: 60 }}>
          <div className="copy"><span className="kicker">Space B — light</span><h2 className="display h-lg">Daylight Photo Studio</h2>
            <p>Tall soft window light, clean backdrop wall and room to style. Fashion, portrait, product and lookbook work lives here.</p>
            <ul className="checklist"><li>Best for: portraits, fashion, product, editorial</li><li>Atmosphere: bright, minimal, adaptable</li><li>Included: backdrop wall, styling rail &amp; steamer access, daylight + support lighting</li></ul>
            <p><Link to="/rate-card#photo">Rates</Link> · <BookingLink to="/booking">Request this room</BookingLink></p></div>
          <div className="img-stack"><img className="main" src="/images/studio/space-2.jpg" alt="Studio S recording set-up from the official rate card" width="798" height="658" loading="lazy" decoding="async" /></div>
        </article>
        <article className="split">
          <div className="img-stack"><img className="main" src="/images/studio/space-3.jpg" alt="Studio S recording set-up from the official rate card" width="653" height="822" loading="lazy" decoding="async" /></div>
          <div className="copy"><span className="kicker">Space C — gather</span><h2 className="display h-lg">Creative Lounge &amp; Prep</h2>
            <p>Briefings, fittings, edit reviews and small intimate shoots. The room where productions start the day and land the ending.</p>
            <ul className="checklist"><li>Best for: prep, castings, interviews, reviews</li><li>Atmosphere: relaxed, domestic, warm</li><li>Included: lounge seating, table space, refreshment point</li></ul>
            <p><Link to="/rate-card#sessions">Rates</Link> · <BookingLink to="/booking">Request this room</BookingLink></p></div>
        </article>
        <div className="cond" style={{ marginTop: 40 }}><b>Shared across the house:</b> <span className="mut">reliable power, fast internet, restrooms &amp; changing provision, cleaning between bookings. Tell us your access needs in the booking form and we will plan around them.</span></div>
        <p className="media-note" style={{ marginTop: 18 }}>Photography on this page comes from the official Studio S rate card.</p>
      </div></section>
    </>
  );
}

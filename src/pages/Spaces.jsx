import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { usePageMeta } from "../hooks.js";

export default function Spaces() {
  usePageMeta("Studio Spaces — Studio S", "Tour Studio S spaces: sound & podcast room, daylight photo studio and creative lounge — atmosphere, uses and amenities.");
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Spaces</p>
        <span className="kicker">Rooms &amp; facilities</span>
        <h1 className="display h-giant">Rooms with <i>a point of view.</i></h1>
        <p className="lede">Dimensions, full kit lists and capacities will be added once confirmed — what follows is atmosphere, intended use and confirmed amenities only.</p>
      </div></div>
      <section className="section"><div className="wrap">
        <article className="split" style={{ marginBottom: 60 }}>
          <div className="img-stack"><img className="main" src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop" alt="Sound-treated podcast and sound room" loading="lazy" /></div>
          <div className="copy"><span className="kicker">Space A — quiet</span><h2 className="display h-lg">Sound &amp; Podcast Room</h2>
            <p>Our quietest room. Treated walls, closed door, controlled light — built for voices, interviews and small ensemble records.</p>
            <ul className="checklist"><li>Best for: podcasts, voiceovers, interviews</li><li>Atmosphere: warm, low-stimulus, focused</li><li>Amenities: seating for hosts + guests, engineer position <span className="mut">(kit list TBC)</span></li></ul>
            <p><span className="tbd">Size &amp; kit TBC</span> <Link to="/rate-card#podcast">Rates</Link> · <BookingLink to="/booking">Request this room</BookingLink></p></div>
        </article>
        <article className="split flip" style={{ marginBottom: 60 }}>
          <div className="copy"><span className="kicker">Space B — light</span><h2 className="display h-lg">Daylight Photo Studio</h2>
            <p>Tall soft window light, clean backdrop wall and room to style. Fashion, portrait, product and lookbook work lives here.</p>
            <ul className="checklist"><li>Best for: portraits, fashion, product, editorial</li><li>Atmosphere: bright, minimal, adaptable</li><li>Amenities: backdrop wall, styling rail &amp; steamer access, daylight + support lighting <span className="mut">(specs TBC)</span></li></ul>
            <p><span className="tbd">Dimensions TBC</span> <Link to="/rate-card#photo">Rates</Link> · <BookingLink to="/booking">Request this room</BookingLink></p></div>
          <div className="img-stack"><img className="main" src="https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=1200&auto=format&fit=crop" alt="Bright daylight photo studio with backdrop" loading="lazy" /></div>
        </article>
        <article className="split">
          <div className="img-stack"><img className="main" src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" alt="Creative lounge with tables for prep and meetings" loading="lazy" /></div>
          <div className="copy"><span className="kicker">Space C — gather</span><h2 className="display h-lg">Creative Lounge &amp; Prep</h2>
            <p>Briefings, fittings, edit reviews and small intimate shoots. The room where productions start the day and land the ending.</p>
            <ul className="checklist"><li>Best for: prep, castings, interviews, reviews</li><li>Atmosphere: relaxed, domestic, warm</li><li>Amenities: lounge seating, table space, refreshment point</li></ul>
            <p><span className="tbd">Capacity TBC</span> <Link to="/rate-card#sessions">Rates</Link> · <BookingLink to="/booking">Request this room</BookingLink></p></div>
        </article>
        <div className="cond" style={{ marginTop: 40 }}><b>Shared across the house:</b> <span className="mut">reliable power, fast internet, restrooms &amp; changing provision, cleaning between bookings. Accessibility details to be confirmed — tell us your needs in the booking form and we will plan around them.</span></div>
      </div></section>
    </>
  );
}

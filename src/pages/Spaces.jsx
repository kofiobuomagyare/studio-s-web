import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import SPACES from "../spacesData.js";
import { usePageMeta } from "../hooks.js";

export default function Spaces() {
  usePageMeta("Studio Spaces — Studio S", "Tour Studio S spaces: sound & podcast room, daylight photo studio, creative lounge, and studio rental — atmosphere, uses and amenities.");

  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Spaces</p>
        <span className="kicker">Rooms &amp; facilities</span>
        <h1 className="display h-giant">Rooms with <i>a point of view.</i></h1>
        <p className="lede">Four rooms with clear purposes. Full kit lists and dimensions are shared when you enquire, so we can match the room to your production.</p>
      </div></div>
      <section className="section"><div className="wrap">
        <div className="cond" style={{ marginBottom: 40 }}><b>Shared across the house:</b> <span className="mut">reliable power, fast internet, restrooms &amp; changing provision, cleaning between bookings. Tell us your access needs in the booking form and we will plan around them.</span></div>
        <div className="service-grid">
          {SPACES.map((space) => (
            <article key={space.id} className="service-grid-item">
              <Link to={`/spaces/${space.id}`} className="service-card-link">
                <div className="service-image"><img src={space.image} alt={space.imageAlt} width="800" height="600" loading="lazy" decoding="async" /></div>
                <div className="service-grid-content">
                  <span className="kicker">{space.label}</span>
                  <h2 className="display h-md" style={{ margin: "10px 0" }}>{space.title}</h2>
                  <p className="mut">{space.shortDescription}</p>
                </div>
              </Link>
              <div className="service-grid-actions">
                <BookingLink to={space.ctaLink} className="btn btn-ember btn-sm btn-block">
                  {space.ctaText}
                </BookingLink>
                <Link to={`/rate-card#${space.rateCardAnchor}`} className="btn btn-ghost btn-sm btn-block">
                  View rates
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="media-note" style={{ marginTop: 18 }}>Photography on this page comes from the official Studio S rate card.</p>
      </div></section>
    </>
  );
}
import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import SERVICES from "../servicesData.js";
import { usePageMeta } from "../hooks.js";

export default function Services() {
  usePageMeta(
    "Services — Studio S | Podcast, Photo, Video, Sound, Animation, Weddings, Events",
    "Studio S services: podcast production, photoshoots, video, sound, animation, wedding coverage, event coverage — what each includes and where to check rates."
  );

  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Services</p>
        <span className="kicker">Seven crafts, one crew</span>
        <h1 className="display h-giant">Choose your <i>craft.</i></h1>
        <p className="lede">Each service can be room-only, assisted, or fully produced. Package names, inclusions and prices below come straight from the studio&apos;s official packages brochure, in Ghana cedis.</p>
      </div></div>
      <section className="section"><div className="wrap">
        <div className="service-grid">
          {SERVICES.map((service) => (
            <article key={service.id} className="service-grid-item">
              <Link to={`/services/${service.id}`} className="service-card-link">
                <div className="service-image"><img src={service.image} alt={service.imageAlt} width="800" height="600" loading="lazy" decoding="async" /></div>
                <div className="service-grid-content">
                  <span className="kicker">{service.number} — {service.category}</span>
                  <h2 className="display h-md" style={{ margin: "10px 0" }}>{service.title}</h2>
                  <p className="mut">{service.shortDescription}</p>
                  <div className="tag-row">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="service-grid-actions">
                <BookingLink to={service.ctaLink} className="btn btn-ember btn-sm btn-block">
                  {service.ctaText}
                </BookingLink>
                <Link to={`/rate-card#${service.rateCardAnchor}`} className="btn btn-ghost btn-sm btn-block">
                  View rates
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="hint" style={{ marginTop: 18 }}>Four recording set-ups (roundtable, independent corner, casual interview, green screen) and full package details live on the rate card.</p>
      </div></section>
    </>
  );
}
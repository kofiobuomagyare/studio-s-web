import { Link, useParams } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import SPACES from "../spacesData.js";
import { usePageMeta } from "../hooks.js";

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const space = SPACES.find((s) => s.id === spaceId);

  usePageMeta(
    space ? `${space.title} — Studio S Spaces` : "Space not found — Studio S",
    space ? space.shortDescription : "This space doesn't exist."
  );

  if (!space) {
    return (
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/spaces">Spaces</Link></p>
        <span className="kicker">Nothing here</span>
        <h1 className="display h-giant">That space <i>isn&apos;t written yet.</i></h1>
        <p className="lede">The space you asked for doesn&apos;t exist.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <Link className="btn btn-ember" to="/spaces">Back to spaces</Link>
        </div>
      </div></div>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="crumb"><Link to="/spaces">Spaces</Link> / {space.title}</p>
          <span className="kicker">{space.label}</span>
          <h1 className="display h-giant">{space.title}</h1>
          <p className="lede">{space.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="detail-back-header">
            <Link className="btn btn-ghost btn-sm" to="/spaces">
              ← Back to spaces
            </Link>
          </div>
          <div className="service-detail-grid">
            <div className="service-detail-main">
              <div className="service-detail-image">
                <img src={space.image} alt={space.imageAlt} width="800" height="600" loading="eager" decoding="async" />
              </div>

              <div className="service-detail-section">
                <h2 className="display h-md">Purpose</h2>
                <p>{space.purpose}</p>
              </div>

              <div className="service-detail-section">
                <h2 className="display h-md">Features</h2>
                <ul className="checklist">
                  {space.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="service-detail-section">
                <h2 className="display h-md">Included with booking</h2>
                <ul className="checklist">
                  {space.included.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="service-detail-section">
                <h2 className="display h-md">Best for</h2>
                <ul className="checklist">
                  {space.bestFor.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="service-detail-section">
                <h2 className="display h-md">Amenities</h2>
                <ul className="checklist">
                  {space.amenities.map((amenity, i) => (
                    <li key={i}>{amenity}</li>
                  ))}
                </ul>
              </div>

              <p className="mut" style={{ marginTop: 16 }}>
                <Link to={`/rate-card#${space.rateCardAnchor}`}>View rates on rate card →</Link>
              </p>
            </div>

            <aside className="service-detail-sidebar">
              <div className="sidebar-card">
                <h3>Quick facts</h3>
                <dl className="service-meta">
                  <dt>Capacity</dt>
                  <dd>{space.capacity}</dd>
                  <dt>Best for</dt>
                  <dd>{space.bestFor?.slice(0, 3).join(", ") || "—"}</dd>
                </dl>
              </div>

              <div className="sidebar-card">
                <BookingLink to={space.ctaLink} className="btn btn-ember btn-block" style={{ marginBottom: 12 }}>
                  {space.ctaText}
                </BookingLink>
                <Link to={`/rate-card#${space.rateCardAnchor}`} className="btn btn-ghost btn-block">
                  View rates
                </Link>
                <Link to="/contact" className="btn btn-ghost btn-block" style={{ marginTop: 12 }}>
                  Ask a question
                </Link>
              </div>

              <div className="sidebar-card">
                <h3>Other spaces</h3>
                <ul className="related-services">
                  {SPACES.filter(s => s.id !== space.id).map((s) => (
                    <li key={s.id}>
                      <Link to={`/spaces/${s.id}`}>
                        <span className="related-number">{s.label}</span>
                        <span className="related-title">{s.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
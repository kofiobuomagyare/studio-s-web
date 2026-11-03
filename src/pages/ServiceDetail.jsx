import { Link, useParams } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import SERVICES from "../servicesData.js";
import { usePageMeta } from "../hooks.js";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = SERVICES.find((s) => s.id === serviceId);

  usePageMeta(
    service ? `${service.title} — Studio S Services` : "Service not found — Studio S",
    service ? service.shortDescription : "This service doesn't exist."
  );

  if (!service) {
    return (
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/services">Services</Link></p>
        <span className="kicker">Nothing here</span>
        <h1 className="display h-giant">That service <i>isn&apos;t written yet.</i></h1>
        <p className="lede">The service you asked for doesn&apos;t exist.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <Link className="btn btn-ember" to="/services">Back to services</Link>
        </div>
      </div></div>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="crumb"><Link to="/services">Services</Link> / {service.title}</p>
          <span className="kicker">{service.number} — {service.category}</span>
          <h1 className="display h-giant">{service.title}</h1>
          <p className="lede">{service.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="detail-back-header">
            <Link className="btn btn-ghost btn-sm" to="/services">
              ← Back to services
            </Link>
          </div>
          <div className="service-detail-grid">
            <div className="service-detail-main">
              <div className="service-detail-image">
                <img src={service.image} alt={service.imageAlt} width="800" height="600" loading="eager" decoding="async" />
              </div>

              <div className="service-detail-section">
                <h2 className="display h-md">What&apos;s included</h2>
                <ul className="checklist">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="service-detail-section">
                <h2 className="display h-md">Deliverables</h2>
                <ul className="checklist">
                  {service.deliverables.map((deliverable, i) => (
                    <li key={i}>{deliverable}</li>
                  ))}
                </ul>
              </div>

              <div className="service-detail-section">
                <h2 className="display h-md">Packages &amp; pricing</h2>
                <div className="service-packages">
                  {service.packages.map((pkg, i) => (
                    <article key={i} className="service-package">
                      <div className="package-header">
                        <h3>{pkg.name}</h3>
                        <span className="package-price">{pkg.price}</span>
                      </div>
                      <p className="package-duration"><b>Duration:</b> {pkg.duration}</p>
                      <p className="package-includes"><b>Includes:</b> {pkg.includes}</p>
                    </article>
                  ))}
                </div>
                <p className="mut" style={{ marginTop: 16 }}>
                  <Link to={`/rate-card#${service.rateCardAnchor}`}>View full rate card →</Link>
                </p>
              </div>
            </div>

            <aside className="service-detail-sidebar">
              <div className="sidebar-card">
                <h3>Quick facts</h3>
                <dl className="service-meta">
                  <dt>Category</dt>
                  <dd>{service.category}</dd>
                  <dt>Best for</dt>
                  <dd>{service.bestFor?.join(", ") || "—"}</dd>
                  <dt>Capacity</dt>
                  <dd>{service.capacity || "—"}</dd>
                </dl>
              </div>

              <div className="sidebar-card">
                <BookingLink to={service.ctaLink} className="btn btn-ember btn-block" style={{ marginBottom: 12 }}>
                  {service.ctaText}
                </BookingLink>
                <Link to={`/rate-card#${service.rateCardAnchor}`} className="btn btn-ghost btn-block">
                  View rate card
                </Link>
                <Link to="/contact" className="btn btn-ghost btn-block" style={{ marginTop: 12 }}>
                  Ask a question
                </Link>
              </div>

              <div className="sidebar-card">
                <h3>Related services</h3>
                <ul className="related-services">
                  {SERVICES.filter(s => s.id !== service.id).slice(0, 3).map((s) => (
                    <li key={s.id}>
                      <Link to={`/services/${s.id}`}>
                        <span className="related-number">{s.number}</span>
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
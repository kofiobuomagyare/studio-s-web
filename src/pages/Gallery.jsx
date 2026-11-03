import { Link } from "react-router-dom";
import EVENT_COLLECTIONS from "../galleryCollections.js";
import { STUDIO_S_CONFIG } from "../config.js";
import { usePageMeta } from "../hooks.js";

export default function Gallery() {
  usePageMeta(
    "Studio S Gallery — Recent Work",
    "Explore curated event photography collections from Studio S."
  );
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="crumb"><Link to="/">Home</Link> / Gallery</p>
          <span className="kicker">Made at Studio S</span>
          <h1 className="display h-giant">A closer look at <i>our stories.</i></h1>
          <p className="lede">A living collection of recent work and moments from inside the house.</p>
          <a className="btn btn-ember" href={STUDIO_S_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer">
            Follow @studio_s.gh
          </a>
        </div>
      </section>
      <section className="section selected-stories-section">
        <div className="wrap">
          <div className="selected-stories-heading">
            <span className="kicker">Selected stories</span>
            <h2 className="display h-md">Photographs from events we&apos;ve covered.</h2>
            <p className="mut">A curated archive of event photography — each collection documents a story Studio S was commissioned to capture.</p>
          </div>
          <div className="event-collections-grid">
            {EVENT_COLLECTIONS.map((collection) => (
              <Link key={collection.id} to={`/gallery/${collection.id}`} className="event-collection-link">
                <article className="event-collection-card">
                  <div className="event-collection-cover">
                    <img src={collection.cover} alt={collection.coverAlt} loading="lazy" decoding="async" />
                    <span className="event-collection-count">{collection.images.length} photos</span>
                  </div>
                  <div className="event-collection-info">
                    <span className="event-collection-kicker">{collection.kicker}</span>
                    <h3 className="event-collection-title">{collection.title}</h3>
                    <p className="event-collection-desc">{collection.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
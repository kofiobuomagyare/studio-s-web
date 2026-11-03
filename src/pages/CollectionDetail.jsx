import { Link, useParams } from "react-router-dom";
import Lightbox from "../components/Lightbox.jsx";
import EVENT_COLLECTIONS from "../galleryCollections.js";
import { usePageMeta } from "../hooks.js";

import { useState } from "react";

export default function CollectionDetail() {
  const { collectionId } = useParams();
  const collection = EVENT_COLLECTIONS.find((c) => c.id === collectionId);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  usePageMeta(
    collection
      ? `${collection.title} — Studio S Gallery`
      : "Collection not found — Studio S",
    collection
      ? `${collection.description} Explore all ${collection.images.length} photos from this Studio S event collection.`
      : "This gallery collection doesn't exist."
  );

  if (!collection) {
    return (
      <div className="page-hero"><div className="page-hero-inner">
        <span className="kicker">Nothing here</span>
        <h1 className="display h-giant">That collection <i>isn&apos;t written yet.</i></h1>
        <p className="lede">The collection you asked for doesn&apos;t exist.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <Link className="btn btn-ember" to="/gallery">Back to gallery</Link>
        </div>
      </div></div>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="crumb"><Link to="/gallery">Gallery</Link> / {collection.title}</p>
          <span className="kicker">{collection.kicker}</span>
          <h1 className="display h-giant">{collection.title}</h1>
          <p className="lede">{collection.description}</p>
        </div>
      </section>
      <section className="section event-collection-detail-section">
        <div className="wrap">
          <div className="event-collection-detail-header">
            <Link className="btn btn-ghost btn-sm" to="/gallery">
              ← Back to gallery
            </Link>
          </div>
          <div className="instagram-grid">
            {collection.images.map((image, index) => (
              <article className="instagram-card" key={image.src}>
                <button
                  className="instagram-image"
                  type="button"
                  aria-label={image.alt}
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width="853"
                    height="1280"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      {lightboxIndex !== null && (
        <Lightbox
          images={collection.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

import { Link } from "react-router-dom";
import InstagramGallery from "../components/InstagramGallery.jsx";
import { STUDIO_S_CONFIG } from "../config.js";
import { usePageMeta } from "../hooks.js";

export default function Gallery() {
  usePageMeta(
    "Studio S Gallery — Recent Work",
    "Explore recent Studio S stories, spaces and productions from Instagram."
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
      <section className="section instagram-gallery-section">
        <div className="wrap">
          <div className="instagram-gallery-heading">
            <span className="kicker">Selected stories</span>
            <p className="mut">A curated Studio S image archive, alongside new Instagram posts when connected.</p>
          </div>
          <InstagramGallery />
        </div>
      </section>
    </>
  );
}

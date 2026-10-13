import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { BookingLink } from "../components/Layout.jsx";
import { Magnetic, ParticleField, VelocityMarquee } from "../components/motion.jsx";
import { usePageMeta } from "../hooks.js";

const HERO_SLIDES = [
  { key: "podcast", label: "Podcast", src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1400&auto=format&fit=crop", alt: "Podcast microphones in a warm studio", caption: "Podcast studio — set for conversation", to: "/services#podcast" },
  { key: "photoshoot", label: "Photoshoot", src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1400&auto=format&fit=crop", alt: "Photographer directing a photoshoot in soft studio light", caption: "Daylight studio — composed for portraits", to: "/services#photoshoot" },
  { key: "video", label: "Video", src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop", alt: "Cinema camera on a video set", caption: "Video stage — lit for moving image", to: "/services#video" },
  { key: "sound", label: "Sound", src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1400&auto=format&fit=crop", alt: "Mixing desk in a sound-treated studio", caption: "Sound room — tuned for clean audio", to: "/services#sound" },
  { key: "animation", label: "Animation", src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop", alt: "Colourful animation workspace on screen", caption: "Animation desk — built frame by frame", to: "/services#animation" },
];

const HERO_INTERVAL = 8000;

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop", alt: "Sound-treated studio with mixing desk", title: "Sound & Podcast Room", sub: "Quiet, treated, mic-ready." },
  { src: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=1000&auto=format&fit=crop", alt: "Bright photo studio with backdrop", title: "Daylight Photo Studio", sub: "Soft window light + backdrop wall." },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop", alt: "Creative lounge and production office", title: "Creative Lounge", sub: "Prep, interviews and small gatherings." },
];

export default function Home() {
  usePageMeta(
    "Studio S — Studio of Stories | Podcast, Photo, Video, Sound & Animation",
    "Studio S (Studio of Stories) is a creative studio for podcasts, photoshoots, video production, sound production and animation. Explore spaces, rates and booking."
  );
  const [lightbox, setLightbox] = useState(null);
  const [slide, setSlide] = useState(0);
  const [hoverHold, setHoverHold] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const autoplay = !hoverHold && !reducedMotion;
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), HERO_INTERVAL);
    return () => clearTimeout(t);
  }, [slide, autoplay]);
  const current = HERO_SLIDES[slide];
  return (
    <>
      <section className="hero" aria-label="Introduction">
        <div className="hero-frame">
          <figure
            className="hero-media hero-rotator"
            style={{ margin: 0 }}
            aria-roledescription="carousel"
            aria-label="Studio services showcase"
            onMouseEnter={() => setHoverHold(true)}
            onMouseLeave={() => setHoverHold(false)}
            onFocus={() => setHoverHold(true)}
            onBlur={() => setHoverHold(false)}
          >
            {HERO_SLIDES.map((s, i) => (
              <img
                key={s.key}
                src={s.src}
                alt={i === slide ? s.alt : ""}
                aria-hidden={i === slide ? undefined : "true"}
                fetchPriority={i === 0 ? "high" : undefined}
                loading={i === 0 ? undefined : "lazy"}
                className={`hero-slide${i === slide ? " active" : ""}`}
              />
            ))}
            <span className="hero-tag" aria-hidden="true">{current.label}</span>
            <figcaption key={current.key} className="hero-caption">{current.caption}</figcaption>
          </figure>
          <div className="hero-copy">
            <span className="kicker">Studio of Stories — creative production house</span>
            <h1 className="display h-giant hero-title">
              <span className="mask-line"><span className="mask-inner">Every story deserves</span></span>
              <span className="mask-line"><span className="mask-inner mask-inner-2"><i>a room of its own.</i></span></span>
            </h1>
            <p className="lede">
              Studio S gives podcasters, photographers, filmmakers, musicians and animators professional rooms,
              attentive crew and a calm place to make their best work.
            </p>
            <div className="hero-ctas">
              <BookingLink className="btn btn-ember">Request a Booking</BookingLink>
              <Link className="btn btn-ghost" to="/spaces">Tour the spaces</Link>
            </div>
            <div className="hero-meta">
              <div><b>05</b><span>production crafts</span></div>
              <div><b>03</b><span>studio spaces</span></div>
              <div><b>01</b><span>request-to-confirmation</span></div>
            </div>
          </div>
        </div>
      </section>

      <VelocityMarquee>Podcast · Photoshoot · Video · Sound · Animation · Podcast · Photoshoot · Video · Sound · Animation ·&nbsp;</VelocityMarquee>

      <section className="section">
        <div className="wrap split">
          <Reveal className="img-stack">
            <img className="main" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop" alt="Calm studio lounge with wooden table and chairs" loading="lazy" />
            <img className="float" src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop" alt="Cinema camera on set" loading="lazy" />
          </Reveal>
          <Reveal className="copy" delay={120}>
            <span className="kicker">What we are</span>
            <h2 className="display h-xl">A <i>working house</i> for people who make things.</h2>
            <p className="lede">
              Not a backdrop-rental warehouse. Studio S pairs considered rooms with production support — so a podcast,
              a lookbook, a music session or a short film all get the same care: good light, good sound, good company.
            </p>
            <div className="tag-row">
              <span className="tag">Podcast-ready rooms</span>
              <span className="tag">Daylight photo studio</span>
              <span className="tag">Video &amp; sound stages</span>
              <span className="tag">Animation support</span>
            </div>
            <Link className="btn btn-ghost" to="/about">Our story &amp; philosophy</Link>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="kicker">Featured services</span>
          <h2 className="display h-xl">Five crafts, <i>one address.</i></h2>
          <div className="svc-list">
            {[
              ["01", "Podcast production", "Treated room, multi-mic setup and edited audio & video cuts.", "/services#podcast", "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop", "Podcast microphone close-up"],
              ["02", "Photoshoots", "Daylight studio for portraits, fashion, product and editorial stories.", "/services#photoshoot", "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=800&auto=format&fit=crop", "Photographer in studio with softbox"],
              ["03", "Video production", "Interviews, brand films, music visuals and social cuts — shot and finished.", "/services#video", "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop", "Video shoot with camera operator"],
            ].map(([idx, h, p, to, src, alt]) => (
              <Link className="svc-row" to={to} key={idx}>
                <span className="idx">{idx}</span>
                <span><h3>{h}</h3><p>{p}</p></span>
                <img src={src} alt={alt} loading="lazy" />
                <span className="go" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link className="btn btn-ghost" to="/services">All five services</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="band">
            <div className="wrap">
              <span className="kicker" style={{ color: "#E8FF47" }}>Inside the house</span>
              <h2 className="display h-xl">Rooms that <i style={{ color: "#E8FF47" }}>photograph well</i> and work harder.</h2>
              <p className="lede">Three environments to choose from. Walk them visually, then check the rate card for what fits your project.</p>
              <div className="gallery-3">
                {GALLERY.map((g) => (
                  <figure
                    key={g.title}
                    data-zoom
                    tabIndex={0}
                    role="button"
                    aria-label={`Enlarge image: ${g.alt}`}
                    onClick={() => setLightbox(g)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightbox(g); } }}
                  >
                    <img src={g.src} alt={g.alt} loading="lazy" />
                    <figcaption><b>{g.title}</b><br />{g.sub} Select to enlarge.</figcaption>
                  </figure>
                ))}
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link className="btn btn-ember" to="/spaces">Explore spaces</Link>
                <Link className="btn btn-light" to="/rate-card">See rates</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="kicker">Pricing, plainly</span>
          <h2 className="display h-lg">Start with the shape of <i>pricing.</i></h2>
          <p className="lede">Real package prices from the studio&apos;s rate card — these are the rental shapes clients use most.</p>
          <div className="rate-grid">
            <div className="rate-card"><h3>Hourly</h3><p className="mut">For short podcast records, voiceovers and quick shoots.</p><p className="price"><b>From GH₵350</b> <small>/ hour · Starter package</small></p><Link to="/rate-card#visual">Details</Link></div>
            <div className="rate-card featured"><h3>Half / Full day</h3><p className="mut">For shoots and productions that need setup + wrap.</p><p className="price"><b>From GH₵1,150</b> <small>/ session · Standard 4-hour</small></p><Link to="/rate-card#sessions" style={{ color: "#fff" }}>Details</Link></div>
            <div className="rate-card"><h3>Project</h3><p className="mut">Post-production, streaming and animation — scoped per brief.</p><p className="price"><b>From GH₵700</b> <small>/ project · Basic edit</small></p><Link to="/rate-card#projects">Details</Link></div>
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn btn-ghost" to="/rate-card">Full rate card</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="kicker">Booking in brief</span>
          <h2 className="display h-lg">From idea to <i>confirmed date</i> in five moves.</h2>
          <div className="steps">
            {[["1", "Explore", "Spaces & services."], ["2", "Check rates", "Find your shape."], ["3", "Prepare", "Date, time, crew size."], ["4", "Request", "Via Google Form."], ["5", "Confirm", "We reply & lock in."]].map(([n, h, p]) => (
              <div className="step" key={n}><b className="step-n">{n}</b><h4>{h}</h4><p>{p}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <Link className="btn btn-ghost" to="/booking">How booking works</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta-panel">
            <ParticleField />
            <div>
              <h2 className="display h-xl">Have a story? <i>Let&apos;s give it a room.</i></h2>
              <p>Tell us the date, the craft and the shape of your idea. We reply with availability and next steps.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Magnetic><BookingLink className="btn btn-solid">Request a Booking</BookingLink></Magnetic>
              <Magnetic strength={10}><Link className="btn btn-light" to="/contact">Contact us</Link></Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox open" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setLightbox(null)}>
          <button className="btn btn-light btn-sm" style={{ position: "absolute", top: 18, right: 18 }} onClick={() => setLightbox(null)}>Close ✕</button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { BookingLink } from "../components/Layout.jsx";
import { Magnetic, ParticleField, VelocityMarquee, useReducedMotion, useScrollCardStack } from "../components/motion.jsx";
import { usePageMeta } from "../hooks.js";
import InstagramGallery from "../components/InstagramGallery.jsx";

const HERO_SLIDES = [
  {
    key: "spark",
    label: "01 · The spark",
    chapter: "First, there is a feeling.",
    title: "Every brand has",
    accent: "a story worth telling.",
    copy: "A point of view. A half-formed idea. Something you want the world to understand. That is where we begin.",
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop",
    alt: "A considered creative studio space ready for a new idea",
    caption: "Every good story starts with a little room to think.",
  },
  {
    key: "thread",
    label: "02 · Find the thread",
    chapter: "We start by listening.",
    title: "Find the thought",
    accent: "only you can tell.",
    copy: "We get close to the people, purpose and details that make your story yours — then find the clearest way to bring it out.",
    src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1400&auto=format&fit=crop",
    alt: "Podcast microphones set up for an honest conversation",
    caption: "Good questions make space for the real story.",
  },
  {
    key: "world",
    label: "03 · Shape the world",
    chapter: "Then we find its form.",
    title: "Give the idea",
    accent: "a world to live in.",
    copy: "A portrait, a set, a sound, a scene. We shape the right visual language and choose the right space for your story to feel real.",
    src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1400&auto=format&fit=crop",
    alt: "Photographer shaping a portrait on a softly lit set",
    caption: "Light, space and detail turn a thought into a world.",
  },
  {
    key: "make",
    label: "04 · Bring it to life",
    chapter: "Make something people can feel.",
    title: "From first frame",
    accent: "to final sound.",
    copy: "Podcast, photography, film, sound and animation — thoughtful production turns the plan into something made to be experienced.",
    src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop",
    alt: "Cinema camera ready to capture a story on set",
    caption: "Five creative crafts. One story, brought to life.",
  },
  {
    key: "impact",
    label: "05 · Make it matter",
    chapter: "Now it can travel.",
    title: "Make them feel",
    accent: "something real.",
    copy: "Because the best content does more than look good. It creates connection, stays with people and gives your brand a voice.",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop",
    alt: "Vibrant creative imagery representing a story reaching its audience",
    caption: "A story made to connect, wherever it goes.",
  },
];

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
  const closeButtonRef = useRef(null);
  const isLightboxOpen = lightbox !== null;
  const reducedMotion = useReducedMotion();
  const [walkScene, setWalkScene] = useState(0);
  const heroSectionRef = useRef(null);
  const heroMediaRef = useRef(null);

  const walkEnabled = !reducedMotion;
  useScrollCardStack({
    sectionRef: heroSectionRef,
    mediaRef: heroMediaRef,
    count: HERO_SLIDES.length,
    enabled: walkEnabled,
    onScene: setWalkScene,
  });

  const activeIndex = walkEnabled ? walkScene : 0;
  const current = HERO_SLIDES[activeIndex];
  useEffect(() => {
    if (!isLightboxOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [isLightboxOpen]);

  return (
    <>
      <section className={`hero${walkEnabled ? " hero-scroll" : " hero-static"}`} aria-label="Introduction" ref={heroSectionRef}>
        <div className="hero-frame">
          <figure
            ref={heroMediaRef}
            className="hero-media"
            style={{ margin: 0 }}
            aria-label="Studio S story in five chapters"
          >
            {HERO_SLIDES.map((s, i) => (
              <article
                key={s.key}
                className={`hero-slide${i === activeIndex ? " active" : ""}`}
                aria-hidden={i === activeIndex ? undefined : "true"}
              >
                <div className="hero-card-face hero-card-front">
                  <img
                    src={s.src}
                    alt={i === activeIndex ? s.alt : ""}
                    fetchPriority={i === 0 ? "high" : undefined}
                    loading={i === 0 || walkEnabled ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="hero-card-copy">
                    <span>{s.label}</span>
                    <b>{s.title} <i>{s.accent}</i></b>
                  </div>
                </div>
                <div className="hero-card-face hero-card-back" aria-hidden="true">
                  <span>STUDIO OF STORIES</span>
                  <b>S</b>
                  <small>{String(i + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}</small>
                </div>
              </article>
            ))}
            <span className="hero-tag">{current.label}</span>
            <figcaption key={current.key} className="hero-caption">{current.caption}</figcaption>
            {walkEnabled && (
              <div className="hero-walkmeter" aria-hidden="true">
                <span className="hero-walkmeter-hint">Follow the story</span>
                <span className="hero-walkmeter-track"><i /></span>
                <span className="hero-walkmeter-count">
                  <b>{String(activeIndex + 1).padStart(2, "0")}</b> / {String(HERO_SLIDES.length).padStart(2, "0")}
                </span>
              </div>
            )}
          </figure>
          <div className="hero-copy">
            <div className="hero-story" key={current.key}>
              <span className="kicker">Studio of Stories · Creative production house</span>
              <span className="hero-chapter">{current.chapter}</span>
              <h1 className="display hero-title">
                <span>{current.title}</span>
                <i>{current.accent}</i>
              </h1>
              <p className="lede">{current.copy}</p>
            </div>
            <div className="hero-ctas">
              <BookingLink className="btn btn-ember">Request a Booking</BookingLink>
              <Link className="btn btn-ghost" to="/spaces">Tour the spaces</Link>
            </div>
            <div className="hero-meta">
              <span>Podcast · Photo · Film · Sound · Animation</span>
              <span>One story, made with care.</span>
            </div>
          </div>
        </div>
        {!walkEnabled && (
          <div className="story-chapters" aria-label="The Studio S creative process">
            {HERO_SLIDES.slice(1).map((scene) => (
              <article className="story-chapter" key={scene.key}>
                <img src={scene.src} alt={scene.alt} loading="lazy" />
                <div>
                  <span className="kicker">{scene.label}</span>
                  <h2 className="display h-xl">{scene.title} <i>{scene.accent}</i></h2>
                  <p className="lede">{scene.copy}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <VelocityMarquee>Find the thread · Shape the world · Bring it to life · Make it matter · Find the thread · Shape the world · Bring it to life · Make it matter ·&nbsp;</VelocityMarquee>

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
              ["04", "Sound production", "Clean recording, thoughtful sound design and post-production that gives every story its tone.", "/services#sound", "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop", "Sound mixing desk in a treated studio"],
              ["05", "Animation", "Frame-by-frame ideas, motion graphics and visual details that make a message move.", "/services#animation", "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop", "Colourful animation workspace"],
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

      <section className="section instagram-preview-section">
        <div className="wrap">
          <div className="instagram-preview-heading">
            <div>
              <span className="kicker">Selected stories</span>
              <h2 className="display h-xl">Stories from <i>inside the house.</i></h2>
            </div>
          </div>
          <InstagramGallery preview />
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

      {lightbox && createPortal(
        <div className="lightbox open home-lightbox" role="dialog" aria-modal="true" aria-label="Studio spaces image preview" onClick={() => setLightbox(null)}>
          <button ref={closeButtonRef} className="btn btn-sm lightbox-control home-lightbox-close" type="button" onClick={() => setLightbox(null)}>Close ×</button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
        </div>,
        document.body
      )}
    </>
  );
}

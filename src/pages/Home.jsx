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

const CRAFTS = [
  {
    n: "01",
    tone: "lavender",
    title: "Podcast production",
    copy: "Treated rooms, multi-mic setups and edited audio + video cuts that sound like you.",
    tags: ["Recording", "Editing", "Distribution"],
    to: "/services#podcast",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
      </svg>
    ),
  },
  {
    n: "02",
    tone: "pink",
    title: "Photography",
    copy: "Daylight studio and location shoots for portraits, fashion, product and editorial stories.",
    tags: ["Portrait", "Editorial", "Product"],
    to: "/services#photoshoot",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 8h4l2-3h6l2 3h4v11H3z" />
        <circle cx="12" cy="13" r="3.6" />
      </svg>
    ),
  },
  {
    n: "03",
    tone: "lime",
    title: "Film & video",
    copy: "Interviews, brand films, music visuals and social cuts — directed, shot and finished.",
    tags: ["Direction", "Production", "Post"],
    to: "/services#video",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="13" height="12" rx="2" />
        <path d="M15 10l7-4v12l-7-4z" />
      </svg>
    ),
  },
  {
    n: "04",
    tone: "cyan",
    title: "Sound design",
    copy: "Clean recording, original scores and post-production that gives every story its tone.",
    tags: ["Mixing", "Voice", "Score"],
    to: "/services#sound",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h2M8 6v12M12 3v18M16 8v8M20 11v2" />
      </svg>
    ),
  },
  {
    n: "05",
    tone: "teal",
    title: "Animation & design",
    copy: "Motion graphics, identities and visual details that make an idea move people.",
    tags: ["Motion", "Identity", "Graphics"],
    to: "/services#animation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
        <circle cx="19" cy="19" r="1.6" />
      </svg>
    ),
  },
];

const WORK = [
  {
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop",
    alt: "Sound-treated studio with mixing desk",
    title: "Sound & Podcast Room",
    sub: "Quiet, treated, mic-ready.",
    tag: "Podcast",
  },
  {
    src: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=1000&auto=format&fit=crop",
    alt: "Bright photo studio with backdrop",
    title: "Daylight Photo Studio",
    sub: "Soft window light + backdrop wall.",
    tag: "Photo",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    alt: "Creative lounge and production office",
    title: "Creative Lounge",
    sub: "Prep, interviews and small gatherings.",
    tag: "Space",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Listen",
    copy: "We start with the story, the audience and the feeling you want to leave behind.",
    accent: "var(--pink)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 10a8 8 0 0 1 16 0v4a4 4 0 0 1-4 4h-2" />
        <path d="M4 11v4a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2zM20 11v4a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Shape",
    copy: "Together we choose the rooms, the crafts and the visual language that fit the idea.",
    accent: "var(--cyan)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Make",
    copy: "Cameras, mics and motion — a calm production day with a crew that cares about detail.",
    accent: "var(--lime-deep)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="13" height="12" rx="2" />
        <path d="M15 10l7-4v12l-7-4z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Deliver",
    copy: "Edited, mixed and finished assets — ready for your channels, cinema or the world.",
    accent: "var(--teal)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
      </svg>
    ),
  },
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
            <span className="hero-sticker hero-sticker-lime">Podcast · Photo · Film</span>
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

      <section className="manifesto" aria-labelledby="manifesto-title">
        <span className="kicker manifesto-label">What we are</span>
        <h2 className="manifesto-title" id="manifesto-title">
          A <i>working house</i> for people who make things.
          <span className="manifesto-chip">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop"
              alt="Calm studio lounge with wooden table and chairs"
              loading="lazy"
            />
          </span>
        </h2>
        <div className="manifesto-body">
          <p>
            Not a backdrop-rental warehouse. Studio S pairs considered rooms with production support — so a podcast,
            a lookbook, a music session or a short film all get the same care: good light, good sound, good company.
          </p>
          <p>
            Five crafts under one roof, one team from first idea to final cut. That is what makes a studio feel
            less like a hire and more like a home for your story.
          </p>
          <Link className="text-link" to="/about">Our story &amp; philosophy <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="crafts-section" aria-labelledby="crafts-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="kicker">What we do</span>
              <h2 className="display h-xl" id="crafts-title">Five crafts, <i>one address.</i></h2>
            </div>
            <div className="section-head-side">
              <p>
                Photography and film get the time they deserve. So do sound, motion and the design that holds it
                all together. Choose a craft — or bring us the whole story.
              </p>
              <Link className="text-link" to="/services">Explore all five services <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="craft-grid">
            {CRAFTS.map((c) => (
              <Link className={`craft-card craft-${c.tone}`} to={c.to} key={c.n}>
                <div className="craft-top">
                  <span className="craft-num">{c.n}</span>
                  <span className="craft-icon">{c.icon}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.copy}</p>
                <div className="craft-tags">
                  {c.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <span className="craft-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <div className="craft-foot">
            <p>Need more than one craft? Most projects do. We build the team around the story, not the other way round.</p>
            <BookingLink className="btn btn-ember">Start a project</BookingLink>
          </div>
        </div>
      </section>

      <section className="work-section" aria-labelledby="work-title">
        <div className="wrap">
          <div className="work-head">
            <div>
              <span className="kicker">Inside the house</span>
              <h2 className="display" id="work-title">Rooms that <i>work harder.</i></h2>
            </div>
            <Link className="text-link text-link-light" to="/spaces">Explore the spaces <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="work-grid">
            {WORK.map((w) => (
              <button
                className="work-card"
                type="button"
                key={w.title}
                onClick={() => setLightbox(w)}
                aria-label={`Enlarge image: ${w.alt}`}
              >
                <span className="work-media">
                  <img src={w.src} alt={w.alt} loading="lazy" />
                  <span className="work-tag">{w.tag}</span>
                </span>
                <span className="work-meta">
                  <span className="work-title">{w.title}</span>
                  <span className="work-sub">{w.sub}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="work-foot">
            <Link className="btn btn-ember" to="/spaces">Book a walkthrough</Link>
          </div>
        </div>
      </section>

      <section className="instagram-preview-section" aria-labelledby="stories-title">
        <div className="wrap">
          <div className="instagram-preview-heading">
            <div>
              <span className="kicker">Selected stories</span>
              <h2 className="display h-xl" id="stories-title">Stories from <i>inside the house.</i></h2>
            </div>
            <a className="text-link text-link-light" href="https://www.instagram.com/studio_s.gh" target="_blank" rel="noopener">
               Follow @studio_s.gh on Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
          <InstagramGallery preview />
        </div>
      </section>

      <section className="stats-section" id="stats" aria-label="Studio at a glance">
        <div className="wrap stats-grid">
          {[
            ["05", "Creative crafts", "var(--pink)"],
            ["03", "Shoot-ready rooms", "var(--cyan)"],
            ["120+", "Stories produced", "var(--lime-deep)"],
            ["01", "Team, end to end", "var(--teal)"],
          ].map(([value, label, dot]) => (
            <div className="stat" key={label} style={{ "--dot": dot }}>
              <i aria-hidden="true" />
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-preview" id="pricing" aria-labelledby="pricing-title">
        <div className="wrap">
          <span className="kicker">Pricing, plainly</span>
          <h2 className="display h-lg" id="pricing-title">Start with the shape of <i>pricing.</i></h2>
          <p className="lede">Real package prices from the studio&apos;s rate card — these are the rental shapes clients use most.</p>
          <div className="rate-grid">
            <div className="rate-card"><h3>Hourly</h3><p className="mut">For short podcast records, voiceovers and quick shoots.</p><p className="price"><b>From GH₵350</b> <small>/ hour · Starter package</small></p><Link to="/rate-card#visual">Details</Link></div>
            <div className="rate-card featured"><h3>Half / Full day</h3><p className="mut">For shoots and productions that need setup + wrap.</p><p className="price"><b>From GH₵1,150</b> <small>/ session · Standard 4-hour</small></p><Link to="/rate-card#sessions">Details</Link></div>
            <div className="rate-card"><h3>Project</h3><p className="mut">Post-production, streaming and animation — scoped per brief.</p><p className="price"><b>From GH₵700</b> <small>/ project · Basic edit</small></p><Link to="/rate-card#projects">Details</Link></div>
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn btn-ghost" to="/rate-card">Full rate card</Link>
          </div>
        </div>
      </section>

      <section className="process-section" id="process" aria-labelledby="process-title">
        <div className="wrap">
          <div className="process-head">
            <div>
              <span className="kicker">How it works</span>
              <h2 className="display h-lg" id="process-title">From first idea to <i>final cut.</i></h2>
            </div>
            <p>Four clear moves. No mystery, no runaway timelines — just a studio that knows how to take an idea seriously.</p>
          </div>
          <div className="process-grid">
            {STEPS.map((s) => (
              <div className="process-step" key={s.n}>
                <span className="process-num">{s.n}</span>
                <div className="process-icon" style={{ "--accent": s.accent }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </div>
            ))}
          </div>
          <div className="process-thread" aria-hidden="true">
            <i style={{ left: "12%", background: "var(--pink)" }} />
            <i style={{ left: "37%", background: "var(--cyan)" }} />
            <i style={{ left: "62%", background: "var(--lime)" }} />
            <i style={{ left: "87%", background: "var(--teal)" }} />
          </div>
          <div style={{ marginTop: 22 }}>
            <Link className="btn btn-ghost" to="/booking">How booking works</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
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

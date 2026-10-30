import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { usePageMeta } from "../hooks.js";

const CATEGORIES = [
  {
    id: "studios",
    label: "Studio rental",
    index: "01",
    aliases: ["hourly"],
    blurb: "Room-only time for teams bringing their own gear — or adding crew support.",
    note: "Freelancers: the sound-treated studio is open for podcasting, video recording, photography and content creation — professional lighting, microphones and cameras available.",
  },
  {
    id: "visual",
    label: "Video & photoshoot",
    index: "02",
    aliases: ["sessions", "photo", "video"],
    blurb: "Four flat-rate packages for promos, portraits, music videos and full productions.",
    note: "GH₵350 for each additional hour on the Starter, Super-Saver and Standard packages.",
  },
  {
    id: "audio",
    label: "Audio production",
    index: "03",
    aliases: ["podcast", "sound"],
    blurb: "Treated rooms and engineers for podcasts, voiceovers and music sessions.",
    note: "Choose your set-up: roundtable for debates, independent recording corner, casual twin-lounge interview, or green screen — your setting, your way.",
  },
  {
    id: "streaming",
    label: "Live streaming",
    index: "04",
    aliases: [],
    blurb: "Turnkey live production, from a one-hour stream to a multi-camera show.",
    note: "Advanced Streaming runs for 3 hours; extra hours are GH₵1,500 each.",
  },
  {
    id: "post",
    label: "Post-production",
    index: "05",
    aliases: ["animation", "projects"],
    blurb: "Editing, finishing and motion graphics, priced by scope.",
    note: "Animation customizations are GH₵200 per hour. All project work is scoped and agreed before it starts.",
  },
];

const PLANS = [
  {
    id: "hourly",
    category: "studios",
    name: "Hourly Studio Rental",
    desc: "Bring your own gear for a short, focused session in the bare room.",
    price: 700,
    unit: "for up to 2 hours",
    note: null,
    badge: null,
    highlights: [
      "Bare studio space with basic set-up",
      "Minimal equipment included",
      "Up to 2 hours of room time",
      "Bring your own gear",
    ],
    compare: {
      length: "Up to 2 hours",
      access: "Bare studio space",
      setup: "Basic set-up",
      equipment: "Minimal equipment",
      crew: false,
      bestFor: "Short records & quick shoots",
    },
    cta: "Book hourly",
  },
  {
    id: "full-day-rental",
    category: "studios",
    name: "Full-Day Studio Rental",
    desc: "Maximum flexibility — the whole room for a full production day.",
    price: 2800,
    unit: "per full day (8 hours)",
    note: null,
    badge: null,
    highlights: [
      "Full studio access",
      "Custom setups, equipment & tools",
      "Tech support for up to 3 personnel",
      "8 hours of room time",
    ],
    compare: {
      length: "8 hours",
      access: "Full studio access",
      setup: "Custom setups",
      equipment: "Equipment & tools included",
      crew: "Up to 3 personnel",
      bestFor: "Full productions",
    },
    cta: "Book full day",
  },
  {
    id: "starter",
    category: "visual",
    name: "Starter Package",
    desc: "Short promos, product shots and social content.",
    price: 350,
    unit: "per 1-hour session",
    note: null,
    badge: null,
    highlights: [
      "Studio space with basic lighting",
      "Plain or simple-themed backdrops",
      "Basic cameras & tripods",
      "1 hour of studio time",
    ],
    compare: {
      length: "1 hour",
      space: true,
      lighting: "Basic lighting",
      backdrops: "Plain or simple themed",
      cameras: "Basic cameras + tripods",
      support: false,
      priority: false,
      crew: false,
      extra: "GH₵350",
    },
    cta: "Start with Starter",
  },
  {
    id: "super-saver",
    category: "visual",
    name: "Super-Saver Package",
    desc: "Short promos, product shots and social content — with twice the time.",
    price: 600,
    unit: "per 2-hour session",
    note: null,
    badge: null,
    highlights: [
      "Studio space with basic lighting",
      "Plain or simple-themed backdrops",
      "Basic cameras & tripods",
      "2 hours of studio time",
    ],
    compare: {
      length: "2 hours",
      space: true,
      lighting: "Basic lighting",
      backdrops: "Plain or simple themed",
      cameras: "Basic cameras + tripods",
      support: false,
      priority: false,
      crew: false,
      extra: "GH₵350",
    },
    cta: "Choose Super-Saver",
  },
  {
    id: "standard",
    category: "visual",
    name: "Standard Package",
    desc: "A flat rate for up to four hours — the sweet spot for most shoots.",
    price: 1150,
    unit: "per 4-hour session",
    note: null,
    badge: "Most booked",
    highlights: [
      "Everything in the Starter package",
      "Soft boxes & ring lights",
      "More backdrops & customisable sets",
      "Priority scheduling",
      "Dedicated studio assistant",
    ],
    compare: {
      length: "4 hours",
      space: true,
      lighting: "Soft boxes + ring lights",
      backdrops: "More backdrops + custom sets",
      cameras: "Basic cameras + tripods",
      support: "Dedicated studio assistant",
      priority: true,
      crew: false,
      extra: "GH₵350",
    },
    cta: "Book Standard",
  },
  {
    id: "premium",
    category: "visual",
    name: "Premium Package",
    desc: "Music videos, short films and large-scale shoots.",
    price: 3200,
    unit: "per full day (8 hours)",
    note: null,
    badge: null,
    highlights: [
      "Full studio access",
      "Professional cameras, gimbals & advanced gear",
      "Multiple set changes or green screen",
      "Standby technical crew",
      "Full day · 8 hours",
    ],
    compare: {
      length: "Full day · 8 hours",
      space: true,
      lighting: "Professional lighting",
      backdrops: "Multiple sets or green screen",
      cameras: "Pro cameras + gimbals",
      support: "Standby technical crew",
      priority: "On request",
      crew: true,
      extra: "On request",
    },
    cta: "Request Premium",
  },
  {
    id: "podcasting",
    category: "audio",
    name: "Podcasting Package",
    desc: "Debates, discussions and interviews, recorded clean.",
    price: 500,
    unit: "for up to 2 hours",
    note: null,
    badge: null,
    highlights: [
      "Soundproof recording booth",
      "Microphones, headphones & mixers",
      "Live-adjust editing software",
      "Up to 2 hours in the booth",
    ],
    compare: {
      length: "Up to 2 hours",
      booth: "Soundproof booth",
      mics: "Mics, headphones + mixers",
      teleprompter: false,
      technician: false,
      editing: "Live mix adjustments",
      instruments: false,
      bestFor: "Debates & interviews",
    },
    cta: "Book podcasting",
  },
  {
    id: "voiceover",
    category: "audio",
    name: "Voiceover Recording",
    desc: "Long-form or timed reads, with a technician on hand.",
    price: 400,
    unit: "per 1-hour session",
    note: null,
    badge: null,
    highlights: [
      "Soundproof booth + condenser mic",
      "Teleprompter, pop filters & acoustic treatment",
      "Raw-file import with minimal edits",
      "On-site technician",
    ],
    compare: {
      length: "1 hour",
      booth: "Soundproof booth",
      mics: "Condenser mic + treatment",
      teleprompter: true,
      technician: "On-site technician",
      editing: "Raw import + minimal edits",
      instruments: false,
      bestFor: "Timed reads & voice work",
    },
    cta: "Book a voiceover",
  },
  {
    id: "music",
    category: "audio",
    name: "Music Session",
    desc: "Multi-track recording time, with engineer help if you need it.",
    price: 1200,
    unit: "for up to 3 hours",
    note: null,
    badge: null,
    highlights: [
      "Multi-track recording",
      "MIDI keyboards available",
      "Engineer assistance if required",
      "Up to 3 hours in session",
    ],
    compare: {
      length: "Up to 3 hours",
      booth: "Recording room",
      mics: "Multi-track recording",
      teleprompter: false,
      technician: "Engineer on request",
      editing: false,
      instruments: "MIDI keyboards",
      bestFor: "Music tracking",
    },
    cta: "Book a music session",
  },
  {
    id: "basic-streaming",
    category: "streaming",
    name: "Basic Streaming",
    desc: "A clean, simple stream for a launch or event.",
    price: 3000,
    unit: "per 1-hour stream",
    note: null,
    badge: null,
    highlights: [
      "Camera, encoder & lighting setup",
      "YouTube or Twitch integration",
      "3-person technical team",
      "1-hour live stream",
    ],
    compare: {
      length: "1 hour",
      setup: true,
      platform: true,
      crew: "3-person team",
      advanced: false,
      grading: false,
      mix: false,
      extra: "—",
    },
    cta: "Book basic streaming",
  },
  {
    id: "advanced-streaming",
    category: "streaming",
    name: "Advanced Streaming",
    desc: "Longer live productions with a bigger crew and full finishing.",
    price: 8000,
    unit: "per 3-hour stream",
    note: "+ GH₵1,500 each extra hour",
    badge: null,
    highlights: [
      "Full camera, encoder & lighting setup",
      "Platform integration",
      "4-person technical team",
      "Advanced edits, colour grading & multi-track mixing",
      "3-hour live stream",
    ],
    compare: {
      length: "3 hours",
      setup: true,
      platform: true,
      crew: "4-person team",
      advanced: true,
      grading: true,
      mix: true,
      extra: "GH₵1,500",
    },
    cta: "Request advanced",
  },
  {
    id: "basic-post",
    category: "post",
    name: "Basic Editing",
    desc: "A clean first pass for simple content.",
    price: 700,
    unit: "for up to 2 hours of edit",
    note: null,
    badge: null,
    highlights: [
      "Trimming, colour correction & audio balancing",
      "Export in standard formats (MP4, WAV)",
      "Technical consultation",
      "Up to 2 hours of edit time",
    ],
    compare: {
      scope: "Up to 2 hours",
      trim: true,
      audio: true,
      advanced: false,
      grading: false,
      mix: false,
      exports: "MP4, WAV",
      consult: true,
      custom: false,
    },
    cta: "Book basic editing",
  },
  {
    id: "full-post",
    category: "post",
    name: "Full Post-Production",
    desc: "Everything in Basic, taken through to a finished piece.",
    price: 1800,
    unit: "for up to 5 hours of edit",
    note: null,
    badge: null,
    highlights: [
      "Everything in the Basic package",
      "Advanced edits, transitions & sound design",
      "Colour grading & multi-track audio mixing",
      "Up to 5 hours of edit time",
    ],
    compare: {
      scope: "Up to 5 hours",
      trim: true,
      audio: true,
      advanced: true,
      grading: true,
      mix: true,
      exports: "MP4, WAV + advanced",
      consult: true,
      custom: false,
    },
    cta: "Book full post",
  },
  {
    id: "animation",
    category: "post",
    name: "Animation & Motion Graphics",
    desc: "Custom motion graphics, scoped with a motion graphics artist.",
    price: 2500,
    unit: "per project",
    note: "+ GH₵200/hr customizations",
    badge: null,
    highlights: [
      "Custom animated logos",
      "Lower thirds & explainer videos",
      "Motion graphics artist",
      "Scoped and quoted per project",
    ],
    compare: {
      scope: "Per project",
      trim: false,
      audio: false,
      advanced: "Motion graphics",
      grading: false,
      mix: false,
      exports: "Final renders",
      consult: true,
      custom: "GH₵200 / hour",
    },
    cta: "Request animation",
  },
];

const COMPARE_ROWS = {
  studios: [
    ["Session length", "length"],
    ["Studio access", "access"],
    ["Set-up", "setup"],
    ["Equipment", "equipment"],
    ["Technical support", "crew"],
    ["Best for", "bestFor"],
  ],
  visual: [
    ["Session length", "length"],
    ["Studio space", "space"],
    ["Lighting", "lighting"],
    ["Backdrops & sets", "backdrops"],
    ["Cameras & grip", "cameras"],
    ["On-set support", "support"],
    ["Priority scheduling", "priority"],
    ["Standby crew", "crew"],
    ["Extra hour", "extra"],
  ],
  audio: [
    ["Session length", "length"],
    ["Room", "booth"],
    ["Microphones & monitoring", "mics"],
    ["Teleprompter", "teleprompter"],
    ["Technician", "technician"],
    ["Editing / mixing", "editing"],
    ["Instruments", "instruments"],
    ["Best for", "bestFor"],
  ],
  streaming: [
    ["Session length", "length"],
    ["Streaming setup", "setup"],
    ["Platform integration", "platform"],
    ["Technical team", "crew"],
    ["Advanced edits", "advanced"],
    ["Colour grading", "grading"],
    ["Multi-track audio mixing", "mix"],
    ["Extra hour", "extra"],
  ],
  post: [
    ["Scope", "scope"],
    ["Trimming & colour correction", "trim"],
    ["Audio balancing", "audio"],
    ["Advanced edits & sound design", "advanced"],
    ["Colour grading", "grading"],
    ["Multi-track audio mixing", "mix"],
    ["Export formats", "exports"],
    ["Technical consultation", "consult"],
    ["Customizations", "custom"],
  ],
};

const TABS = [["all", "All packages"], ...CATEGORIES.map((cat) => [cat.id, cat.label])];

const HASH_CATEGORY = Object.fromEntries(
  CATEGORIES.flatMap((cat) => [
    [cat.id, cat.id],
    ...cat.aliases.map((alias) => [alias, cat.id]),
  ])
);

const formatPrice = (value) => `GH₵${value.toLocaleString("en-US")}`;

function PlanCard({ plan }) {
  const titleId = `plan-${plan.id}-title`;
  return (
    <article className={`plan-card${plan.badge ? " featured" : ""}`} aria-labelledby={titleId}>
      <div className="plan-head">
        <h3 className="plan-name" id={titleId}>{plan.name}</h3>
        {plan.badge && <span className="plan-badge">{plan.badge}</span>}
      </div>
      <p className="plan-desc">{plan.desc}</p>
      <div className="plan-price-block">
        <p className="plan-price"><span className="plan-currency">GH₵</span>{plan.price.toLocaleString("en-US")}</p>
        <p className="plan-unit">{plan.unit}</p>
        {plan.note && <p className="plan-note">{plan.note}</p>}
      </div>
      <ul className="plan-features">
        {plan.highlights.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <BookingLink className={`btn plan-cta ${plan.badge ? "btn-ember" : "btn-ghost"}`} to="/booking">
        {plan.cta}
      </BookingLink>
    </article>
  );
}

export default function RateCard() {
  usePageMeta(
    "Rate Card — Studio S | Packages & pricing",
    "Studio S rate card: official studio rental and production packages with prices in Ghana cedis. Browse pricing cards, compare plans and request your date."
  );
  const [tab, setTab] = useState("all");
  const [compareTab, setCompareTab] = useState("visual");
  const { hash } = useLocation();
  const navigate = useNavigate();
  const compareRef = useRef(null);
  const tabRefs = useRef([]);

  const visiblePlans = PLANS.filter((plan) => tab === "all" || plan.category === tab);
  const activeCategory = CATEGORIES.find((cat) => cat.id === tab);
  const compareCategory = CATEGORIES.find((cat) => cat.id === compareTab) || CATEGORIES[1];
  const comparePlans = PLANS.filter((plan) => plan.category === compareCategory.id);
  const compareRows = COMPARE_ROWS[compareCategory.id];

  useEffect(() => {
    const category = HASH_CATEGORY[hash.slice(1)];
    if (!category) return;
    setTab(category);
    setCompareTab(category);
  }, [hash]);

  useEffect(() => {
    if (!hash) return;
    const category = HASH_CATEGORY[hash.slice(1)];
    if (category && tab !== category) return;
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 140);
    return () => clearTimeout(timer);
  }, [hash, tab]);

  const chooseTab = (name) => {
    setTab(name);
    if (name !== "all") setCompareTab(name);
    if (hash) navigate("/rate-card", { replace: true });
  };

  const onTabKeyDown = (event, index) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = TABS.length - 1;
    chooseTab(TABS[next][0]);
    tabRefs.current[next]?.focus();
  };

  const nudgeCompare = (direction) => {
    const el = compareRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(240, el.clientWidth * 0.72), behavior: "smooth" });
  };

  const renderCompareValue = (value) => {
    if (value === true) return <span className="cmp-yes" aria-label="Included">✓</span>;
    if (value === false || value == null) return <span className="cmp-no" aria-label="Not included">—</span>;
    return <span className="cmp-text">{value}</span>;
  };

  return (
    <>
      <section className="pricing-hero" aria-labelledby="pricing-title">
        <div className="wrap pricing-hero-inner">
          <p className="crumb pricing-crumb"><Link to="/">Home</Link> / Rate Card</p>
          <span className="kicker">Pricing — transparent by design</span>
          <h1 className="display pricing-title" id="pricing-title">One rate card, <i>no riddles.</i></h1>
          <p className="lede pricing-lede">
            Every price below comes from the official Studio S 2025 packages brochure, in Ghana cedis (GH₵).
            Pick a category, compare packages, then request your date — submitting a request never auto-confirms a booking.
          </p>
          <div className="pricing-trust">
            <span><b aria-hidden="true">✓</b> Official 2025 packages</span>
            <span><b aria-hidden="true">✓</b> Prices in Ghana cedis</span>
            <span><b aria-hidden="true">✓</b> Requests never auto-confirm</span>
          </div>
        </div>
      </section>

      <section className="pricing-main" aria-label="Packages">
        <div className="wrap">
          <div className="pricing-filter-head">
            <span className="kicker">Browse the rate card</span>
            <p className="hint pricing-status" role="status">
              {tab === "all"
                ? `${PLANS.length} packages across ${CATEGORIES.length} services`
                : `${visiblePlans.length} ${visiblePlans.length === 1 ? "package" : "packages"} in ${activeCategory?.label}`}
              {" · "}prices in GH₵ · requests never auto-confirm
            </p>
          </div>

          <div className="tabs pricing-tabs" role="tablist" aria-label="Filter pricing categories">
            {TABS.map(([name, label], index) => (
              <button
                key={name}
                ref={(el) => { tabRefs.current[index] = el; }}
                id={`pricing-tab-${name}`}
                className="tab"
                type="button"
                role="tab"
                aria-selected={tab === name ? "true" : "false"}
                aria-controls="pricing-panel"
                tabIndex={tab === name ? 0 : -1}
                onClick={() => chooseTab(name)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            id="pricing-panel"
            role="tabpanel"
            aria-labelledby={`pricing-tab-${tab}`}
            tabIndex={0}
            className="pricing-panel"
          >
            {CATEGORIES.filter((cat) => tab === "all" || tab === cat.id).map((cat) => {
              const plans = PLANS.filter((plan) => plan.category === cat.id);
              return (
                <section className="plan-group" id={cat.id} key={cat.id} aria-labelledby={`${cat.id}-heading`}>
                  {cat.aliases.map((alias) => <span key={alias} id={alias} className="anchor-alias" aria-hidden="true" />)}
                  <header className="plan-group-head">
                    <div>
                      <div className="plan-group-title">
                        <span className="plan-group-index" aria-hidden="true">{cat.index}</span>
                        <h2 className="display h-md" id={`${cat.id}-heading`}>{cat.label}</h2>
                      </div>
                      <p className="plan-group-desc">{cat.blurb}</p>
                    </div>
                    <span className="plan-group-count">{plans.length} packages</span>
                  </header>
                  <div className="plan-grid">
                    {plans.map((plan) => <PlanCard plan={plan} key={plan.id} />)}
                  </div>
                  {cat.note && <p className="hint plan-group-note">{cat.note}</p>}
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="compare-section" id="compare" aria-labelledby="compare-title">
        <div className="wrap">
          <div className="compare-head">
            <div>
              <span className="kicker">Side by side</span>
              <h2 className="display h-xl" id="compare-title">Compare <i>plans.</i></h2>
              <p className="lede">
                Same prices, same inclusions — laid out for a quick scan. Choose a service to see its packages side by side.
              </p>
            </div>
            <div className="compare-switch" role="group" aria-label="Choose a service to compare">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={compareTab === cat.id ? "true" : "false"}
                  onClick={() => setCompareTab(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="compare-shell">
            <div className="compare-toolbar">
              <span className="compare-caption">
                {compareCategory.label} · {comparePlans.length} packages
              </span>
              <div className="compare-arrows">
                <button type="button" className="compare-arrow" aria-label="Scroll comparison left" onClick={() => nudgeCompare(-1)}>←</button>
                <button type="button" className="compare-arrow" aria-label="Scroll comparison right" onClick={() => nudgeCompare(1)}>→</button>
              </div>
            </div>

            <div
              className="compare-scroll"
              ref={compareRef}
              tabIndex={0}
              role="region"
              aria-label={`${compareCategory.label} package comparison`}
            >
              <table
                className="compare-table"
                style={{ "--plan-count": comparePlans.length }}
              >
                <caption className="sr-only">{compareCategory.label} package comparison</caption>
                <thead>
                  <tr>
                    <th scope="col" className="compare-feature-head">Compare features</th>
                    {comparePlans.map((plan) => (
                      <th scope="col" className={`compare-plan${plan.badge ? " is-featured" : ""}`} key={plan.id}>
                        {plan.badge && <span className="compare-flag">{plan.badge}</span>}
                        <span className="compare-plan-name">{plan.name}</span>
                        <span className="compare-plan-price">
                          <b>{formatPrice(plan.price)}</b>
                          <small>{plan.unit}</small>
                        </span>
                        <BookingLink className={`btn btn-sm ${plan.badge ? "btn-ember" : "btn-ghost"}`} to="/booking">
                          Book<span className="sr-only"> {plan.name}</span>
                        </BookingLink>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([label, key]) => (
                    <tr key={key}>
                      <th scope="row">{label}</th>
                      {comparePlans.map((plan) => (
                        <td className={plan.badge ? "is-featured" : undefined} key={plan.id}>
                          {renderCompareValue(plan.compare[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="hint compare-swipe">Swipe or use the arrows to see every plan →</p>
          <p className="hint compare-footnote">
            All prices in Ghana cedis (GH₵) and match the cards above. Extra hours and add-ons are charged only with your agreement.
          </p>
        </div>
      </section>

      <section className="pricing-extras" aria-labelledby="extras-title">
        <div className="wrap pricing-extras-grid">
          <div>
            <span className="kicker">Good to know</span>
            <h2 className="display h-xl" id="extras-title">Extras, <i>without surprises.</i></h2>
            <p className="lede">
              The published rate is the starting point. Anything extra is agreed with you before the clock runs — never added quietly.
            </p>
          </div>
          <div className="pricing-extras-list">
            <details open>
              <summary>Add-ons &amp; extra time</summary>
              <div className="body">
                <ul className="pricing-extra-list">
                  <li><span>Extra hours — video &amp; photoshoot</span><b>GH₵350 / hour</b></li>
                  <li><span>Extra hours — Advanced Streaming</span><b>GH₵1,500 / hour</b></li>
                  <li><span>Animation customizations</span><b>GH₵200 / hour</b></li>
                </ul>
                <p>Nothing is added without your agreement first.</p>
              </div>
            </details>
            <details>
              <summary>Booking conditions (to be confirmed)</summary>
              <div className="body">
                <ul>
                  <li>Requests are not confirmations — every date is confirmed in writing.</li>
                  <li>Deposits, cancellation windows and rescheduling fees: <span className="tbd">TBC</span>.</li>
                  <li>Set-up / wrap buffers, access times and house rules: <span className="tbd">TBC</span>.</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-panel">
            <div>
              <h2 className="display h-xl">A room for <i>the next one.</i></h2>
              <p>Tell us the date, the craft and the shape of your idea. We reply with availability and next steps.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <BookingLink className="btn btn-solid" to="/booking">Request a booking</BookingLink>
              <Link className="btn btn-light" to="/contact">Ask for a quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

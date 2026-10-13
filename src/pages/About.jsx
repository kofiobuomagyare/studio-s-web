import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks.js";

export default function About() {
  usePageMeta("About — Studio S | Studio of Stories", "Who Studio S is: story, vision, mission, values and what makes our rooms different.");
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / About</p>
        <span className="kicker">About Studio S</span>
        <h1 className="display h-giant">We built the rooms <i>we wished existed.</i></h1>
        <p className="lede">Calm, well-kept spaces where a first-time podcaster and a seasoned crew both feel taken seriously.</p>
      </div></div>
      <section className="section"><div className="wrap two-col">
        <div className="prose">
          <h2 className="h-lg display">Our story</h2>
          <p>Studio S began with a simple frustration: good ideas were being squeezed into rooms that fought them — noisy corners for podcasts, flat light for portraits, rushed turnarounds for edits. So we set out to build a small house with the right bones: quiet walls, honest light, reliable power, fast internet, and people who actually enjoy production days.</p>
          <p>Today Studio S hosts podcasts, photoshoots, video, sound and animation work. Some clients rent a room and run it themselves; others hand us the whole story from first shot to final cut.</p>
          <blockquote className="story">“A studio should <i>disappear</i> — so the story can appear.”</blockquote>
        </div>
        <div className="img-stack">
          <img className="main" src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop" alt="Studio S working space with desks and warm light" loading="lazy" />
          <img className="float" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="Two creators reviewing work together" loading="lazy" />
        </div>
      </div></section>
      <section className="section" style={{ background: "var(--fig-2)", color: "#F3EDDF", borderRadius: 28, margin: "0 var(--pad)" }}>
        <div className="wrap two-col">
          <div>
            <span className="kicker" style={{ color: "#E8FF47" }}>Vision &amp; mission</span>
            <h2 className="display h-xl">Vision</h2>
            <p className="lede" style={{ color: "#CFC6B4" }}>To be the address creators name first when the work matters — a distinctive creative destination, not a commodity rental.</p>
            <h2 className="display h-xl">Mission</h2>
            <p className="lede" style={{ color: "#CFC6B4" }}>To give every project the right room, the right tools and unhurried support — from first enquiry to final delivery.</p>
          </div>
          <div>
            <h3 className="display h-md">Creative philosophy</h3>
            <ul className="checklist" style={{ color: "#EDE6D5" }}>
              <li>Story first, gear second — equipment serves the idea.</li>
              <li>Calm sets make brave work — we protect the atmosphere.</li>
              <li>Transparency over surprises — rates and terms in plain view.</li>
              <li>Craft is hospitality — clean rooms, clear comms, on-time days.</li>
            </ul>
            <div className="rule" style={{ background: "rgba(255,255,255,.15)" }}></div>
            <p className="hint" style={{ color: "#A99E88" }}>History, client logos and awards will be added here when confirmed by the studio. Nothing is invented on this page.</p>
          </div>
        </div>
      </section>
      <section className="section"><div className="wrap">
        <span className="kicker">Values</span>
        <h2 className="display h-lg">What we <i>refuse to compromise.</i></h2>
        <div className="values">
          {[["Attention to detail", "Cables dressed, backdrops steamed, levels checked before you arrive — the invisible work that makes shoot days feel easy."], ["Originality", "No template looks. We help each project find its own light, framing and rhythm."], ["Professionalism", "Clear quotes, confirmed call-times, honest turnaround estimates. If we can't do it well, we say so early."], ["Welcome", "First-timers get the same patience as regulars — walkthroughs, setup help, unhurried questions."], ["Care for sound & image", "Quiet rooms and honest monitoring, because audiences forgive many things except bad audio."], ["Fair dealing", "Published shapes, no hidden extras. Extra hours and add-ons agreed before the clock runs."]].map(([h, p]) => (
            <div className="value" key={h}><h3>{h}</h3><p className="mut">{p}</p></div>
          ))}
        </div>
        <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-ember" to="/spaces">See the rooms</Link>
          <Link className="btn btn-ghost" to="/booking">Plan a visit via booking</Link>
        </div>
      </div></section>
    </>
  );
}

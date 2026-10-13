import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { usePageMeta } from "../hooks.js";

const TABS = [["all", "All"], ["studios", "Studio rental"], ["visual", "Video & photoshoot"], ["audio", "Audio production"], ["streaming", "Live streaming"], ["post", "Post-production"]];

function Row({ option, sub, unit, price, note, includes, bookLabel = "Book" }) {
  return (
    <tr>
      <td data-l="Option"><b>{option}</b>{sub && (<><br /><span className="mut">{sub}</span></>)}</td>
      <td data-l="Unit">{unit}</td>
      <td data-l="Price"><b className="amt">{price}</b>{note && (<><br /><span className="mut">{note}</span></>)}</td>
      <td data-l="Includes">{includes}</td>
      <td><BookingLink to="/booking">{bookLabel} →</BookingLink></td>
    </tr>
  );
}

export default function RateCard() {
  usePageMeta("Rate Card — Studio S | Transparent pricing", "Studio S rate card: official studio rental and production packages with prices in Ghana cedis. Filter by category.");
  const [tab, setTab] = useState("all");
  const show = (name) => tab === "all" || tab === name;
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 80);
      return () => clearTimeout(t);
    }
  }, [hash]);
  const visibleCount = ["studios", "visual", "audio", "streaming", "post"].filter((n) => show(n)).length;
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Rate Card</p>
        <span className="kicker">Transparent by design</span>
        <h1 className="display h-giant">One rate card, <i>no riddles.</i></h1>
        <p className="lede">Every price below comes from the official Studio S 2025 packages brochure, in Ghana cedis (GH₵). Pick a category, compare packages, then request your date — submitting a request never auto-confirms a booking.</p>
        <div className="tabs" role="tablist" aria-label="Filter pricing categories">
          {TABS.map(([name, label]) => (
            <button key={name} className="tab" role="tab" aria-selected={tab === name ? "true" : "false"} onClick={() => setTab(name)}>{label}</button>
          ))}
        </div>
        <p className="hint" role="status">{visibleCount} {visibleCount === 1 ? "category" : "categories"} · units shown per row · submitting a request never auto-confirms a booking</p>
      </div></div>
      <section className="section" style={{ paddingTop: 10 }}><div className="wrap">
        {show("studios") && (
          <div id="hourly">
            <table className="rate-table"><caption id="sessions">Studio rental</caption>
              <thead><tr><th>Option</th><th>Unit</th><th>Price</th><th>Includes</th><th></th></tr></thead>
              <tbody>
                <Row option="Hourly Studio Rental" sub="Bring your own gear" unit="up to 2 hours" price="GH₵700" includes="Bare studio space with basic set-up and minimal equipment" />
                <Row option="Full-Day Studio Rental" sub="Maximum flexibility" unit="8 hours" price="GH₵2,800" includes="Full studio access with custom setups, equipment and tools, tech support of up to 3 personnel" />
              </tbody>
            </table>
            <p className="hint">Freelancers: the sound-treated studio is open for podcasting, video recording, photography and content creation — professional lighting, microphones and cameras available.</p>
          </div>
        )}
        {show("visual") && (
          <div id="visual"><span id="photo" /><span id="video" />
            <table className="rate-table"><caption>Video &amp; photoshoot packages</caption>
              <thead><tr><th>Option</th><th>Unit</th><th>Price</th><th>Includes</th><th></th></tr></thead>
              <tbody>
                <Row option="Starter Package" sub="Short promos, product shots, social content" unit="1 hour" price="GH₵350" includes="Studio space with basic lighting, plain or simple-themed backdrops, basic cameras and tripods" />
                <Row option="Super-Saver Package" sub="Short promos, product shots, social content" unit="2 hours" price="GH₵600" includes="Studio space with basic lighting, plain or simple-themed backdrops, basic cameras and tripods" />
                <Row option="Standard Package" sub="Flat rate for up to 4 hours" unit="4 hours" price="GH₵1,150" includes="Everything in the Starter package, plus soft boxes and ring lights, more backdrops and customizable sets, priority scheduling and a dedicated studio assistant" />
                <Row option="Premium Package" sub="Music videos, short films, large-scale shoots" unit="full day · 8 hours" price="GH₵3,200" includes="Full studio access with professional cameras, gimbals and advanced gear, multiple set changes or green screen, standby technical crew" />
              </tbody>
            </table>
            <p className="hint">GH₵350 for each additional hour on the Starter, Super-Saver and Standard packages.</p>
          </div>
        )}
        {show("audio") && (
          <div id="audio"><span id="podcast" /><span id="sound" />
            <table className="rate-table"><caption>Audio production packages</caption>
              <thead><tr><th>Option</th><th>Unit</th><th>Price</th><th>Includes</th><th></th></tr></thead>
              <tbody>
                <Row option="Podcasting Package" sub="Debates, discussions, interviews" unit="up to 2 hours" price="GH₵500" includes="Soundproof recording booth, microphones, headphones and mixers, basic editing software for live adjustments" />
                <Row option="Voiceover Recording Package" sub="Long-form or timed reads" unit="1 hour" price="GH₵400" includes="Soundproof booth, condenser microphone, teleprompter, pop filters and acoustic treatment, raw-file import with minimal edits, on-site technician" />
                <Row option="Music Session Package" sub="Engineer assistance if required" unit="up to 3 hours" price="GH₵1,200" includes="Multi-track recording capabilities, MIDI keyboards available" />
              </tbody>
            </table>
            <p className="hint">Choose your set-up: roundtable for debates, independent recording corner, casual twin-lounge interview, or green screen — your setting, your way.</p>
          </div>
        )}
        {show("streaming") && (
          <div id="streaming">
            <table className="rate-table"><caption>Live streaming &amp; virtual production</caption>
              <thead><tr><th>Option</th><th>Unit</th><th>Price</th><th>Includes</th><th></th></tr></thead>
              <tbody>
                <Row option="Basic Streaming Service" unit="1 hour" price="GH₵3,000" includes="Streaming setup (camera, encoder, lighting), platform integration such as YouTube and Twitch, 3-person technical team" />
                <Row option="Advanced Streaming Service" unit="3 hours" price="GH₵8,000" note="+ GH₵1,500 each extra hour" includes="Streaming setup (camera, encoder, lighting), platform integration, 4-person technical team, advanced edits, colour grading and multi-track audio mixing" />
              </tbody>
            </table>
          </div>
        )}
        {show("post") && (
          <div id="post"><span id="animation" /><span id="projects" />
            <table className="rate-table"><caption>Post-production services</caption>
              <thead><tr><th>Option</th><th>Unit</th><th>Price</th><th>Includes</th><th></th></tr></thead>
              <tbody>
                <Row option="Basic Editing Package" unit="up to 2 hours" price="GH₵700" includes="Trimming, colour correction and audio balancing, export in standard formats (MP4, WAV), technical consultation" />
                <Row option="Full Post-Production Package" unit="up to 5 hours" price="GH₵1,800" includes="Everything in the Basic package, advanced edits (transitions, effects, sound design), colour grading and multi-track audio mixing" />
                <Row option="Animation & Motion Graphics Package" sub="With a motion graphics artist" unit="per project" price="GH₵2,500" note="+ GH₵200/hr customizations" includes="Custom animated logos, lower thirds and explainer videos" />
              </tbody>
            </table>
          </div>
        )}
        {tab === "all" && (
          <>
            <h2 className="display h-md">Add-ons &amp; extra time</h2>
            <details open><summary>What costs extra?</summary><div className="body"><p>Extra hours on video/photoshoot packages are GH₵350 each; on Advanced Streaming GH₵1,500 each; animation customizations GH₵200 per hour. Nothing is added without your agreement first.</p></div></details>
            <details><summary>Booking conditions (to be confirmed)</summary><div className="body"><ul><li>Requests are not confirmations — every date is confirmed in writing.</li><li>Deposits, cancellation windows and rescheduling fees: <span className="tbd">TBC</span>.</li><li>Set-up / wrap buffers, access times and house rules: <span className="tbd">TBC</span>.</li></ul></div></details>
          </>
        )}
        <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <BookingLink className="btn btn-ember">Request a booking</BookingLink>
          <Link className="btn btn-ghost" to="/contact">Ask for a quote</Link>
        </div>
      </div></section>
    </>
  );
}

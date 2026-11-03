import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { usePageMeta } from "../hooks.js";

export default function Services() {
  usePageMeta("Services — Studio S | Podcast, Photo, Video, Sound, Animation", "Studio S services: podcast production, photoshoots, video, sound and animation — what each includes and where to check rates.");
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Services</p>
        <span className="kicker">Five crafts, one crew</span>
        <h1 className="display h-giant">Choose your <i>craft.</i></h1>
        <p className="lede">Each service can be room-only, assisted, or fully produced. Package names, inclusions and prices below come straight from the studio&apos;s official packages brochure, in Ghana cedis.</p>
      </div></div>
      <section className="section"><div className="wrap">
        <article id="podcast" className="split" style={{ marginBottom: 56 }}>
          <div className="img-stack"><img className="main" src="/images/studio/audio-production.jpg" alt="Studio S audio production set-up from the official rate card" width="845" height="1200" loading="lazy" decoding="async" /></div>
          <div className="copy"><span className="kicker">01 — Audio &amp; video</span><h2 className="display h-lg">Podcast production</h2>
            <p>Conversations recorded properly: quiet treated room, multi-mic capture, optional multi-camera video, then clean edits, mixes and captioned cuts for distribution.</p>
            <div className="tag-row"><span className="tag">Room + engineer</span><span className="tag">Video option</span><span className="tag">Edit &amp; mix</span></div>
            <div className="cond"><b>Official package:</b> <span className="mut">Podcasting Package — <b>GH₵500</b> for up to 2 hours (soundproof booth, microphones, live-adjust mix).</span> <Link to="/rate-card#podcast">Check podcast rates</Link></div>
            <p><BookingLink className="btn btn-ember btn-sm">Book podcast time</BookingLink></p></div>
        </article>
        <article id="photoshoot" className="split flip" style={{ marginBottom: 56 }}>
          <div className="copy"><span className="kicker">02 — Still image</span><h2 className="display h-lg">Photoshoots</h2>
            <p>Portraits, fashion stories, product and editorial sets in daylight with backdrop options and styling space. Bring your photographer or book studio support.</p>
            <div className="tag-row"><span className="tag">Daylight studio</span><span className="tag">Backdrop wall</span><span className="tag">Styling corner</span></div>
            <div className="cond"><b>Official packages (from GH₵350):</b> <span className="mut">Starter 1 hr · Super-Saver 2 hrs (GH₵600) · Standard 4 hrs (GH₵1,150) · Premium full-day (GH₵3,200).</span> <Link to="/rate-card#photo">Check photo rates</Link></div>
            <p><BookingLink className="btn btn-ember btn-sm">Book photo studio</BookingLink></p></div>
          <div className="img-stack"><img className="main" src="/images/studio/video-photoshoot.jpg" alt="Studio S video and photoshoot set-up from the official rate card" width="845" height="1200" loading="lazy" decoding="async" /></div>
        </article>
        <article id="video" className="split" style={{ marginBottom: 56 }}>
          <div className="img-stack"><img className="main" src="/images/studio/video-photoshoot.jpg" alt="Studio S video and photoshoot set-up from the official rate card" width="845" height="1200" loading="lazy" decoding="async" /></div>
          <div className="copy"><span className="kicker">03 — Moving image</span><h2 className="display h-lg">Video production</h2>
            <p>Interviews, brand films, live sessions and social cuts. Pre-light options, directed shoot days and a considered edit — colour, sound and titles finished with care.</p>
            <div className="tag-row"><span className="tag">Interview setup</span><span className="tag">Brand film</span><span className="tag">Edit &amp; grade</span></div>
            <div className="cond"><b>Official packages (from GH₵350):</b> <span className="mut">Starter 1 hr · Super-Saver 2 hrs (GH₵600) · Standard 4 hrs (GH₵1,150) · Premium full-day (GH₵3,200), plus streaming from GH₵3,000.</span> <Link to="/rate-card#video">Check video rates</Link></div>
            <p><BookingLink className="btn btn-ember btn-sm">Scope a video</BookingLink></p></div>
        </article>
        <div className="two-col">
          <article id="sound" className="card">
            <img src="/images/studio/audio-production.jpg" alt="Studio S audio production set-up from the official rate card" width="845" height="1200" style={{ borderRadius: 12, aspectRatio: "16/9", objectFit: "cover", width: "100%" }} loading="lazy" decoding="async" />
            <span className="kicker">04 — Sound</span>
            <h2 className="display h-md" style={{ margin: "10px 0" }}>Sound production</h2>
            <p className="mut">Voice records, music tracking support, mixing guidance and podcast mastering. Quiet monitoring, patient takes.</p>
            <p><b>Voiceover GH₵400/hr</b> <span className="mut">· Music session GH₵1,200 / 3 hrs.</span> <Link to="/rate-card#sound">Sound rates</Link> · <BookingLink to="/booking">Book</BookingLink></p>
          </article>
          <article id="animation" className="card">
            <img src="/images/studio/post-production.jpg" alt="Studio S post-production set-up from the official rate card" width="844" height="1200" style={{ borderRadius: 12, aspectRatio: "16/9", objectFit: "cover", width: "100%" }} loading="lazy" decoding="async" />
            <span className="kicker">05 — Motion design</span>
            <h2 className="display h-md" style={{ margin: "10px 0" }}>Animation</h2>
            <p className="mut">Titles, lyric visuals, explainers and short animated stories — scoped from boards to final render, quoted per brief.</p>
            <p><b>GH₵2,500*</b> <span className="mut">· GH₵200/hr customizations.</span> <Link to="/rate-card#animation">Animation rates</Link> · <BookingLink to="/booking">Book</BookingLink></p>
          </article>
        </div>
        <p className="hint" style={{ marginTop: 18 }}>Four recording set-ups (roundtable, independent corner, casual interview, green screen) and full package details live on the rate card.</p>
      </div></section>
    </>
  );
}

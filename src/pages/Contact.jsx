import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { STUDIO_S_CONFIG } from "../config.js";
import { usePageMeta } from "../hooks.js";

export default function Contact() {
  usePageMeta("Contact — Studio S", "Contact Studio S: enquiries, location, socials and booking shortcut.");
  const [formError, setFormError] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const nameRef = useRef(null);
  const projectRef = useRef(null);

  const handleEnquiry = (e) => {
    e.preventDefault();
    const honeypot = e.currentTarget.querySelector(".hp-field input")?.value;
    if (honeypot) {
      setFormError("Something about that submission looked automated — please email us directly instead.");
      return;
    }
    const name = nameRef.current?.value?.trim() || "";
    const project = projectRef.current?.value?.trim() || "";
    const finalSubject = subject === "Other" ? customSubject.trim() : subject;
    if (!finalSubject) {
      setFormError("Please choose a subject for your enquiry.");
      return;
    }
    setFormError("");
    const body = `Name: ${name}\n\n${project}`;
    const mailto = `mailto:${STUDIO_S_CONFIG.email}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const hasLocation = Boolean(STUDIO_S_CONFIG.studioAddress);

  const SUBJECT_OPTIONS = [
    "General enquiry",
    "Booking a studio session",
    "Podcast production",
    "Photography / photoshoot",
    "Video production",
    "Sound design",
    "Animation & motion graphics",
    "Pricing & packages",
    "Studio tour / visit",
    "Other (specify)",
  ];

  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Contact</p>
        <span className="kicker">Say hello</span>
        <h1 className="display h-giant">Talk to <i>a human.</i></h1>
        <p className="lede">Fastest route to a date is the booking form. For everything else — quotes, visits, odd ideas — reach us here.</p>
      </div></div>

      <section className="section"><div className="wrap contact-grid">
        <div className="card contact-form-card contact-form-full">
          <h2 className="display h-md">Send an enquiry</h2>
          <p className="mut">We reply within one business day. Tell us what you&apos;re making and we&apos;ll come back with availability and next steps.</p>
          <form className="contact-form" onSubmit={handleEnquiry} noValidate>
            <div className="form-field">
              <label className="fl" htmlFor="subject">Subject <span className="req" aria-hidden="true">*</span></label>
              <select
                className="fl"
                id="subject"
                required
                aria-required="true"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="" disabled>Choose a topic…</option>
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {subject === "Other (specify)" && (
                <input
                  className="fl"
                  type="text"
                  required
                  aria-required="true"
                  placeholder="e.g. Partnership idea, press enquiry…"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  style={{ marginTop: 8 }}
                />
              )}
            </div>
            <div className="form-field">
              <label className="fl" htmlFor="n">Your name <span className="req" aria-hidden="true">*</span></label>
              <input className="fl" id="n" ref={nameRef} required aria-required="true" autoComplete="name" placeholder="e.g. Theodosia Okoh" />
            </div>
            <div className="form-field">
              <label className="fl" htmlFor="m">Tell us about your project <span className="req" aria-hidden="true">*</span></label>
              <textarea className="fl" id="m" ref={projectRef} rows={5} required aria-required="true" placeholder="What are you making, when, and for whom? e.g. A 6-episode podcast series, recording Saturdays in March." />
            </div>
            <span className="hp-field" aria-hidden="true">
              <label>Company (leave blank)<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
            </span>
            {formError && <p className="form-error" role="alert">{formError}</p>}
            <div className="form-actions">
              <button className="btn btn-solid" type="submit">Send your enquiry</button>
              <p className="hint">This opens your email app with your message pre-filled. For a confirmed date, use the booking form instead.</p>
            </div>
          </form>
        </div>

        <div className="card contact-info-card">
          <section className="contact-block">
            <h2 className="display h-md">Enquiries</h2>
            <p className="mut">We reply within one business day. Tell us what you&apos;re making and we&apos;ll come back with availability and next steps.</p>
            <p><b>Email:</b> <a href={`mailto:${STUDIO_S_CONFIG.email}`}>{STUDIO_S_CONFIG.email}</a></p>
            <p><b>Phone:</b> <a href="tel:+233302810641">{STUDIO_S_CONFIG.phone}</a></p>
            <p><b>Hours:</b> <span className="mut">visits by appointment, confirmed at booking.</span></p>
          </section>

          <div className="rule" />

          <section className="contact-block">
            <h3 className="display h-md">Follow</h3>
            <p>
              <a href={STUDIO_S_CONFIG.instagramUrl} target="_blank" rel="noopener">Instagram — @studio_s.gh</a>
              {" · "}
               <a href={STUDIO_S_CONFIG.tiktokUrl} target="_blank" rel="noopener">TikTok — @studio.sgh</a>
              {" · "}
              {/*<span className="mut">YouTube (link TBC)</span>*/}
            </p>
            <p style={{ marginTop: 12 }}>
              <BookingLink className="btn btn-ember">Request a Booking</BookingLink>
            </p>
          </section>
        </div>

        <div className="card contact-visit-card">
          <section className="contact-block">
            <h2 className="display h-md">Visit</h2>
            <p><b>Location:</b> {STUDIO_S_CONFIG.studioAddress}</p>
            <p className="mut">Visits are by appointment, confirmed at booking. Detailed directions, parking and transport notes will be added here.</p>
            <div className="map-frame">
              {hasLocation ? (
                <iframe
                  title={`Google Maps preview of ${STUDIO_S_CONFIG.studioAddress}`}
                  src={`https://www.google.com/maps?q=${STUDIO_S_CONFIG.studioCoords.lat},${STUDIO_S_CONFIG.studioCoords.lng}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                >
                </iframe>
              ) : (
                <p className="map-fallback">Map unavailable — studio location details are being confirmed.</p>
              )}
            </div>
            <p className="hint" style={{ marginTop: 10 }}>
              <a href="https://www.google.com/maps/dir//Smartline+Publishers+Ltd,+Tema/@5.6352684,-0.1214246,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xfdf846e1c754ecb:0x71f0dcdabf4bbe65!2m2!1d-0.0995895!2d5.6370483?entry=ttu" target="_blank" rel="noopener">Get directions</a>
              {" · "}
              <a href="https://www.google.com/maps/search/?api=1&query=Smartline+Publishers+Ltd+Tema+Ghana" target="_blank" rel="noopener">View larger map</a>
            </p>
          </section>
        </div>

      </div>
    </section>
    </>
  );
}

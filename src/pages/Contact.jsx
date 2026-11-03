import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { STUDIO_S_CONFIG } from "../config.js";
import { usePageMeta } from "../hooks.js";

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

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  customSubject: "",
  project: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  usePageMeta(
    "Contact — Studio S",
    "Contact Studio S in Tema: enquiries, location, socials and a direct route to request a studio date."
  );
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [mailtoHref, setMailtoHref] = useState(`mailto:${STUDIO_S_CONFIG.email}`);
  const [mapLoaded, setMapLoaded] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const customSubjectRef = useRef(null);
  const projectRef = useRef(null);
  const fieldRefs = {
    name: nameRef,
    email: emailRef,
    subject: subjectRef,
    customSubject: customSubjectRef,
    project: projectRef,
  };

  const update = (field) => (event) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (formError) setFormError("");
  };

  const validate = () => {
    const next = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const project = values.project.trim();
    const customSubject = values.customSubject.trim();

    if (!name) next.name = "Please add your name so we know who we are replying to.";
    if (!email) next.email = "Please add an email address so we can reply.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "That email address does not look complete — please check it.";
    if (!values.subject) next.subject = "Please choose the subject that fits best.";
    if (values.subject === "Other (specify)" && !customSubject) {
      next.customSubject = "Please add a short subject line for your enquiry.";
    }
    if (!project) next.project = "Please tell us a little about what you are making.";

    return { next, name, email, project, customSubject };
  };

  const handleEnquiry = (event) => {
    event.preventDefault();
    const honeypot = event.currentTarget.querySelector(".hp-field input")?.value;
    if (honeypot) {
      setFormError("Something about that submission looked automated — please email us directly instead.");
      return;
    }

    const { next, name, email, project, customSubject } = validate();
    const firstError = Object.keys(next)[0];
    if (firstError) {
      setErrors(next);
      setFormError("Please check the highlighted fields before sending.");
      fieldRefs[firstError]?.current?.focus();
      return;
    }

    const finalSubject = values.subject === "Other (specify)" ? customSubject : values.subject;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Project:",
      project,
      "",
      "Sent from the Studio S contact page.",
    ].join("\n");
    const mailto = `mailto:${STUDIO_S_CONFIG.email}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;

    setErrors({});
    setFormError("");
    setMailtoHref(mailto);
    setSent(true);
    window.location.href = mailto;
  };

  const resetForm = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setFormError("");
    setSent(false);
    setMailtoHref(`mailto:${STUDIO_S_CONFIG.email}`);
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined);

  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Contact</p>
        <span className="kicker">Say hello</span>
        <h1 className="display h-giant">Talk to <i>a human.</i></h1>
        <p className="lede">The fastest route to a date is the booking request. For everything else — quotes, visits, odd ideas — reach us here.</p>
      </div></div>

      <section className="section"><div className="wrap contact-grid">
        <div className="card contact-form-card contact-form-full">
          <h2 className="display h-md">Send an enquiry</h2>
          <p className="mut">We reply within one business day. Tell us what you&apos;re making and we&apos;ll come back with availability and next steps.</p>

          {sent ? (
            <div className="form-success" role="status" aria-live="polite">
              <span className="form-success-icon" aria-hidden="true">✓</span>
              <div>
                <h3 className="display">Your email app should now be open.</h3>
                <p>
                  Your message is ready to send to <b>{STUDIO_S_CONFIG.email}</b>.
                  If nothing opened, use the direct link below — your enquiry is not sent until you press send in your email app.
                </p>
                <div className="form-success-actions">
                  <a className="btn btn-ember" href={mailtoHref}>Open the email again</a>
                  <a className="btn btn-ghost" href={`mailto:${STUDIO_S_CONFIG.email}`}>Email us directly</a>
                  <button className="text-link" type="button" onClick={resetForm}>Write another enquiry</button>
                </div>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleEnquiry} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label className="fl" htmlFor="n">Your name <span className="req" aria-hidden="true">*</span></label>
                  <input
                    className={`fl${errors.name ? " is-invalid" : ""}`}
                    id="n"
                    ref={nameRef}
                    value={values.name}
                    onChange={update("name")}
                    required
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={describedBy("name")}
                    autoComplete="name"
                    placeholder="e.g. Theodosia Okoh"
                  />
                  {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
                </div>

                <div className="form-field">
                  <label className="fl" htmlFor="email">Email address <span className="req" aria-hidden="true">*</span></label>
                  <input
                    className={`fl${errors.email ? " is-invalid" : ""}`}
                    id="email"
                    ref={emailRef}
                    type="email"
                    inputMode="email"
                    value={values.email}
                    onChange={update("email")}
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={describedBy("email")}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
                </div>
              </div>

              <div className="form-field">
                <label className="fl" htmlFor="subject">Subject <span className="req" aria-hidden="true">*</span></label>
                <select
                  className={`fl${errors.subject ? " is-invalid" : ""}`}
                  id="subject"
                  ref={subjectRef}
                  required
                  aria-required="true"
                  aria-invalid={errors.subject ? "true" : "false"}
                  aria-describedby={describedBy("subject")}
                  value={values.subject}
                  onChange={update("subject")}
                >
                  <option value="" disabled>Choose a topic…</option>
                  {SUBJECT_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.subject && <p className="field-error" id="subject-error">{errors.subject}</p>}
              </div>

              {values.subject === "Other (specify)" && (
                <div className="form-field">
                  <label className="fl" htmlFor="custom-subject">Your subject line <span className="req" aria-hidden="true">*</span></label>
                  <input
                    className={`fl${errors.customSubject ? " is-invalid" : ""}`}
                    id="custom-subject"
                    ref={customSubjectRef}
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={errors.customSubject ? "true" : "false"}
                    aria-describedby={describedBy("customSubject")}
                    placeholder="e.g. Partnership idea, press enquiry…"
                    value={values.customSubject}
                    onChange={update("customSubject")}
                  />
                  {errors.customSubject && <p className="field-error" id="customSubject-error">{errors.customSubject}</p>}
                </div>
              )}

              <div className="form-field">
                <label className="fl" htmlFor="m">Tell us about your project <span className="req" aria-hidden="true">*</span></label>
                <textarea
                  className={`fl${errors.project ? " is-invalid" : ""}`}
                  id="m"
                  ref={projectRef}
                  rows={5}
                  value={values.project}
                  onChange={update("project")}
                  required
                  aria-required="true"
                  aria-invalid={errors.project ? "true" : "false"}
                  aria-describedby={describedBy("project")}
                  placeholder="What are you making, when, and for whom? e.g. A 6-episode podcast series, recording Saturdays in March."
                />
                {errors.project && <p className="field-error" id="project-error">{errors.project}</p>}
              </div>

              <span className="hp-field" aria-hidden="true">
                <label>Company (leave blank)<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
              </span>

              {formError && <p className="form-error" role="alert">{formError}</p>}

              <div className="form-actions">
                <button className="btn btn-solid" type="submit">Send your enquiry</button>
                <p className="hint">
                  This opens your email app with your message pre-filled. For a confirmed date, use the{" "}
                  <BookingLink to="/booking">booking request</BookingLink> instead.
                </p>
                <p className="form-privacy">
                  We use your details only to answer your enquiry. Read our{" "}
                  <Link to="/privacy">privacy policy</Link>.
                </p>
              </div>
            </form>
          )}
        </div>

        <div className="card contact-info-card">
          <section className="contact-block">
            <h2 className="display h-md">Enquiries</h2>
            <p className="mut">We reply within one business day. Tell us what you&apos;re making and we&apos;ll come back with availability and next steps.</p>
            <p><b>Email:</b> <a href={`mailto:${STUDIO_S_CONFIG.email}`}>{STUDIO_S_CONFIG.email}</a></p>
            <p><b>Phone:</b> <a href={`tel:${STUDIO_S_CONFIG.phone.replace(/[^\d+]/g, "")}`}>{STUDIO_S_CONFIG.phone}</a></p>
            <p><b>Hours:</b> <span className="mut">visits by appointment, confirmed at booking.</span></p>
          </section>

          <div className="rule" />

          <section className="contact-block">
            <h3 className="display h-md">Follow</h3>
            <p>
              <a href={STUDIO_S_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram — @studio_s.gh</a>
              {" · "}
              <a href={STUDIO_S_CONFIG.tiktokUrl} target="_blank" rel="noopener noreferrer">TikTok — @studio.sgh</a>
            </p>
            <p className="contact-shortcut">
              <BookingLink className="btn btn-ember">Request a Booking</BookingLink>
            </p>
          </section>
        </div>

        <div className="card contact-visit-card" id="visit">
          <section className="contact-block">
            <h2 className="display h-md">Visit</h2>
            <p><b>Location:</b> {STUDIO_S_CONFIG.studioAddress}</p>
            <p className="mut">Visits are by appointment, confirmed at booking. Tell us your access needs and we will plan around them.</p>
            <div className="map-frame">
              {!STUDIO_S_CONFIG.studioAddress ? (
                <p className="map-fallback">Map unavailable — please use the directions link below.</p>
              ) : mapLoaded ? (
                <iframe
                  title={`Google Maps preview of ${STUDIO_S_CONFIG.studioAddress}`}
                  src={`https://www.google.com/maps?q=${STUDIO_S_CONFIG.studioCoords.lat},${STUDIO_S_CONFIG.studioCoords.lng}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="map-consent">
                  <span className="map-consent-icon" aria-hidden="true">◎</span>
                  <p>Google Maps loads only when you choose. Loading it shares technical information with Google.</p>
                  <button className="btn btn-ghost btn-sm" type="button" onClick={() => setMapLoaded(true)}>
                    Load interactive map
                  </button>
                </div>
              )}
            </div>
            <p className="hint map-links">
              <a href="https://www.google.com/maps/dir//Smartline+Publishers+Ltd,+Tema/@5.6352684,-0.1214246,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xfdf846e1c754ecb:0x71f0dcdabf4bbe65!2m2!1d-0.0995895!2d5.6370483?entry=ttu" target="_blank" rel="noopener noreferrer">Get directions</a>
              {" · "}
              <a href="https://www.google.com/maps/search/?api=1&query=Smartline+Publishers+Ltd+Tema+Ghana" target="_blank" rel="noopener noreferrer">View larger map</a>
            </p>
          </section>
        </div>
      </div>
    </section>
    </>
  );
}

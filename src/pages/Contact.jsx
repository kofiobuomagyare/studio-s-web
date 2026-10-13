import { Link } from "react-router-dom";
import { BookingLink } from "../components/Layout.jsx";
import { STUDIO_S_CONFIG } from "../config.js";
import { usePageMeta } from "../hooks.js";

export default function Contact() {
  usePageMeta("Contact — Studio S", "Contact Studio S: enquiries, location, socials and booking shortcut.");
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner">
        <p className="crumb"><Link to="/">Home</Link> / Contact</p>
        <span className="kicker">Say hello</span>
        <h1 className="display h-giant">Talk to <i>a human.</i></h1>
        <p className="lede">Fastest route to a date is the booking form. For everything else — quotes, visits, odd ideas — reach us here.</p>
      </div></div>
      <section className="section"><div className="wrap contact-grid">
        <div className="card">
          <h2 className="display h-md">Enquiries</h2>
          <p className="mut">Email is best. Include date, craft and headcount and we&apos;ll reply faster.</p>
          <p><b>Email:</b> <a href={`mailto:${STUDIO_S_CONFIG.email}`}>{STUDIO_S_CONFIG.email}</a></p>
          <p><b>Phone:</b> <a href="tel:+233302810641">{STUDIO_S_CONFIG.phone}</a></p>
          <p><b>Hours:</b> <span className="mut">visits by appointment, confirmed at booking.</span></p>
          <div className="rule"></div>
          <h3>Follow</h3>
          <p><a href={STUDIO_S_CONFIG.instagramUrl} target="_blank" rel="noopener">Instagram — @studio_s.gh</a> · <span className="mut">TikTok (link TBC)</span> · <span className="mut">YouTube (link TBC)</span></p>
          <p><BookingLink className="btn btn-ember">Request a Booking</BookingLink></p>
        </div>
        <div className="card" id="visit">
          <h2 className="display h-md">Visit</h2>
          <p><b>Location:</b> Studio S, Smartline Publishers Ltd, Tema, Ghana</p>
          <p className="mut">Visits are by appointment, confirmed at booking. Detailed directions, parking and transport notes will be added here.</p>
          <div className="map-frame">
            <iframe
              title="Google Map showing Smartline Publishers Ltd, Tema — home of Studio S"
              src="https://www.google.com/maps?q=5.6370483,-0.0995895&hl=en&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="hint"><a href="https://www.google.com/maps/dir//Smartline+Publishers+Ltd,+Tema/@5.6352684,-0.1214246,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xfdf846e1c754ecb:0x71f0dcdabf4bbe65!2m2!1d-0.0995895!2d5.6370483?entry=ttu" target="_blank" rel="noopener">Get directions</a> · <a href="https://www.google.com/maps/search/?api=1&query=Smartline+Publishers+Ltd+Tema+Ghana" target="_blank" rel="noopener">View larger map</a></p>
          <form action={`mailto:${STUDIO_S_CONFIG.email}`} method="get" encType="text/plain">
            <label className="fl" htmlFor="n">Your name</label>
            <input className="fl" id="n" name="subject" required autoComplete="name" placeholder="Adaeze O." />
            <label className="fl" htmlFor="m">What are you making?</label>
            <textarea className="fl" id="m" name="body" rows={4} required placeholder="Podcast, 3 hosts, hoping for Saturday afternoon…" />
            <p style={{ marginTop: 12 }}><button className="btn btn-solid" type="submit">Compose email enquiry</button></p>
            <p className="hint">This opens your email app — for a confirmed date, use the booking form instead.</p>
          </form>
        </div>
      </div></section>
    </>
  );
}

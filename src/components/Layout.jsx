import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { STUDIO_S_CONFIG } from "../config.js";
import { trackBookingClick } from "../analytics.js";
import studioLogo from "../assets/studio-s-logo.svg";

export function BookingLink({ children, className, to = "/booking" }) {
  // Internal fallback route exists; external form opens in new tab.
  const external = STUDIO_S_CONFIG.bookingFormUrl;
  const isPlaceholder = external.includes("PLACEHOLDER");
  if (!isPlaceholder) {
    return (
      <a className={className} href={external} target="_blank" rel="noopener" onClick={trackBookingClick}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} to={to} onClick={trackBookingClick}>
      {children}
    </Link>
  );
}

const LINKS = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Spaces", "/spaces"],
  ["Gallery", "/gallery"],
  ["Rate Card", "/rate-card"],
  ["Booking", "/booking"],
  ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  return (
    <header className="site-head">
      <div className="head-pill">
          <Link className="brand" to="/" aria-label="Studio S — home">
            <img src={studioLogo} alt="" className="brand-logo" aria-hidden="true" />
            <b>Studio S</b>
          </Link>
          <nav className="nav" aria-label="Primary">
            {LINKS.map(([label, to]) => (
              <NavLink key={to} to={to} end={to === "/"} aria-current={undefined}>
                {label}
              </NavLink>
            ))}
          </nav>
          <BookingLink className="btn btn-solid btn-sm">Request a Booking</BookingLink>
          <button
            className="menu-btn"
            aria-expanded={open ? "true" : "false"}
            aria-controls="mnav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      <nav
        className={`mobile-nav${open ? " open" : ""}`}
        id="mnav"
        aria-label="Mobile"
        onClick={() => setOpen(false)}
      >
        {LINKS.map(([label, to]) => (
          <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link to="/" className="brand brand-foot" aria-label="Studio S — home">
              <img src={studioLogo} alt="" className="foot-logo" aria-hidden="true" />
              <b>Studio S</b>
            </Link>
            <p style={{ color: "#A99E88", fontSize: 14 }}>
              Studio of Stories — rooms &amp; production for podcasts, photoshoots, video, sound and animation.
            </p>
            <p>
              <BookingLink className="" to="/booking">
                <strong style={{ color: "#fff" }}>Request a Booking</strong>
              </BookingLink>
            </p>
          </div>
          <div>
            <b>Visit</b>
            <Link to="/spaces">Studio spaces</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/services">Services</Link>
            <Link to="/rate-card">Rate card</Link>
            <Link to="/booking">Booking</Link>
          </div>
          <div>
            <b>Studio</b>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/contact#visit">Location</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
          <div>
            <b>Follow</b>
            <a href={STUDIO_S_CONFIG.instagramUrl} target="_blank" rel="noopener">Instagram</a>
            <Link to="/contact">TikTok (link TBC)</Link>
            <Link to="/contact">YouTube (link TBC)</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} Studio S — Studio of Stories. All rights reserved.</span>
          <span>Prices &amp; availability confirmed on request.</span>
        </div>
      </div>
      <div className="foot-mark" aria-hidden="true">Studio&nbsp;S</div>
    </footer>
  );
}

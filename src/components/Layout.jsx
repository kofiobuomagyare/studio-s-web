import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { STUDIO_S_CONFIG } from "../config.js";
import { trackBookingClick } from "../analytics.js";
import studioLogo from "../assets/studio-s-logo.svg";

/* Primary booking journeys start on the explanatory /booking page. The
   official Google Form is linked explicitly where a direct hand-off makes
   sense, so visitors always understand that a request is not a confirmation. */
export function BookingLink({ children, className, to = "/booking", onClick, ...rest }) {
  return (
    <Link
      className={className}
      to={to}
      {...rest}
      onClick={(event) => {
        trackBookingClick(event);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

export function BookingFormLink({ children, className, onClick, ...rest }) {
  return (
    <a
      className={className}
      href={STUDIO_S_CONFIG.bookingFormUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      onClick={(event) => {
        trackBookingClick(event);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

export function telHref(phone = STUDIO_S_CONFIG.phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
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
  const menuButtonRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-head">
      <div className="head-pill">
        <Link className="brand" to="/" aria-label="Studio S — home">
          <img
            src={studioLogo}
            alt=""
            className="brand-logo"
            width="34"
            height="34"
            aria-hidden="true"
          />
          <b>Studio S</b>
        </Link>
        <nav className="nav" aria-label="Primary">
          {LINKS.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === "/"} aria-current={undefined}>
              {label}
            </NavLink>
          ))}
        </nav>
        <BookingLink className="btn btn-solid btn-sm head-book" aria-label="Request a booking">
          <span className="book-long">Request a Booking</span>
          <span className="book-short" aria-hidden="true">Book</span>
        </BookingLink>
        <button
          ref={menuButtonRef}
          className="menu-btn"
          type="button"
          aria-expanded={open ? "true" : "false"}
          aria-controls="mnav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <nav
        className={`mobile-nav${open ? " open" : ""}`}
        id="mnav"
        aria-label="Mobile"
        aria-hidden={open ? undefined : "true"}
        onClick={() => setOpen(false)}
      >
        {LINKS.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <div className="mobile-cta">
          <BookingLink className="btn btn-ember" onClick={() => setOpen(false)}>
            Request a Booking
          </BookingLink>
        </div>
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
            <Link
              to="/"
              className="brand brand-foot"
              aria-label="Studio S — home"
            >
              <img
                src={studioLogo}
                alt=""
                className="foot-logo"
                width="52"
                height="52"
                aria-hidden="true"
              />
              <b>Studio S</b>
            </Link>
            <p className="foot-blurb">
              Studio of Stories — rooms &amp; production for podcasts,
              photoshoots, video, sound and animation.
            </p>
            <p className="foot-book">
              <BookingLink className="foot-cta" to="/booking">
                Request a Booking <span aria-hidden="true">↗</span>
              </BookingLink>
            </p>
          </div>
          <nav aria-label="Explore">
            <b>Explore</b>
            <Link to="/spaces">Studio spaces</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/services">Services</Link>
            <Link to="/rate-card">Rate card</Link>
            <Link to="/booking">Booking</Link>
          </nav>
          <nav aria-label="Studio">
            <b>Studio</b>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/contact#visit">Location</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </nav>
          <div className="foot-contact">
            <b>Visit</b>
            <address className="foot-nap">
              <span>{STUDIO_S_CONFIG.studioAddress}</span>
              <a href={telHref()}>{STUDIO_S_CONFIG.phone}</a>
              <a href={`mailto:${STUDIO_S_CONFIG.email}`}>{STUDIO_S_CONFIG.email}</a>
            </address>
            <div className="foot-social">
              <a
                href={STUDIO_S_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <span aria-hidden="true">↗</span>
              </a>
              <a
                href={STUDIO_S_CONFIG.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            © {year} Studio S — Studio of Stories. All rights reserved.
          </span>
          <span>Prices &amp; availability confirmed on request.</span>
        </div>
      </div>
      <div className="foot-mark" aria-hidden="true">
        Studio&nbsp;S
      </div>
    </footer>
  );
}

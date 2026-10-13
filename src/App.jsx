import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Header } from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Spaces from "./pages/Spaces.jsx";
import RateCard from "./pages/RateCard.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/rate-card" element={<RateCard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function ImageFade() {
  const { pathname } = useLocation();
  useEffect(() => {
    const imgs = [...document.querySelectorAll("main img:not(.hero-slide)")];
    const mark = (img) => img.classList.add("loaded");
    imgs.forEach((img) => {
      img.classList.add("img-fade");
      if (img.complete && img.naturalWidth > 0) mark(img);
      else {
        img.addEventListener("load", () => mark(img), { once: true });
        img.addEventListener("error", () => mark(img), { once: true });
      }
    });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="page-hero"><div className="page-hero-inner">
      <span className="kicker">Nothing here</span>
      <h1 className="display h-giant">That story <i>isn&apos;t written yet.</i></h1>
      <p className="lede">The page you asked for doesn&apos;t exist. Start back at the beginning.</p>
      <p><Link className="btn btn-ember" to="/">Back home</Link></p>
    </div></div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollToTop />
      <ImageFade />
      <Header />
      <main id="main">
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

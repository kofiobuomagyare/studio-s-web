# Studio S — Studio of Stories (Website)

Marketing + booking website for **Studio S (Studio of Stories)**, Smartline Publishers Ltd, Tema, Ghana —
a creative studio offering podcast, photoshoot, video, sound, animation, live-streaming and studio-rental packages.

Built with **React 19 + Vite + react-router-dom**. No backend: booking requests go through the official Google Form.

## Quick start

```bash
npm install
npm run dev      # local dev server with HMR
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Routes

| Path        | Page     | Purpose |
| ----------- | -------- | ------- |
| `/`         | Home     | Hero showcase, services, spaces, pricing preview, booking steps |
| `/about`    | About    | Story, vision, mission, values |
| `/services` | Services | The five crafts + package references |
| `/spaces`   | Spaces   | Sound & podcast room, daylight studio, creative lounge |
| `/rate-card`| Rate Card| Full package tables with category filter tabs |
| `/booking`  | Booking  | 5-step process + official Google Form link |
| `/contact`  | Contact  | Email, phone, Google Maps embed, enquiry form |

Unknown paths render a branded 404 page. The app uses `BrowserRouter`, so production
hosting needs an SPA fallback (serve `index.html` for unknown paths).

## Project structure

```
src/
  App.jsx               # Router, scroll restoration, page transitions, image fades
  config.js             # ★ All real-world links & contact details (edit here)
  hooks.js              # usePageMeta — per-page title + meta description
  index.css             # Full design system + motion layer (tokens, layout, pages)
  assets/studio-s-logo.svg  # Official Studio S badge (also used as favicon)
  components/
    Layout.jsx          # Header/nav, mobile menu, footer, BookingLink, watermark
    Reveal.jsx          # Scroll-triggered reveals (stagger via `delay` prop)
    motion.jsx          # Magnetic, ParticleField, VelocityMarquee, useMediaMotion…
  pages/                # Home, About, Services, Spaces, RateCard, Booking, Contact
public/
  favicon.svg           # Studio S badge (browser tab icon)
```

## Site configuration (`src/config.js`)

Single source of truth for live details — update these, rebuild, done:

```js
bookingFormUrl  // Official Google Form — every "Request a Booking" CTA opens it in a new tab
email           // studios@smartlinepublishers.com (also powers the Contact mailto form)
phone           // 0302 810 641
instagramUrl    // https://instagram.com/studio_s.gh
```

## Content sources & ground rules

- **Prices, packages, inclusions, extra-hour fees** come from the official Studio S 2025
  packages brochure (14 priced items, Ghana cedis). Never invent rates.
- **Contact details + location** (email, phone, Instagram handle, Tema address, map pin
  at 5.6370483, −0.0995895) come from the studio's own materials.
- Anything not yet confirmed uses a clearly-marked `TBC` pill so it can be filled in later.
  Still outstanding: deposit/cancellation terms, studio dimensions, TikTok/YouTube URLs,
  parking/transport notes.

## Design system

- **Type:** Fraunces (display serif) + Space Grotesk (body), loaded from Google Fonts.
- **Palette (CSS vars):** `--paper` / `--card` bone, `--ink` espresso, `--ember` signal orange.
- **Motion:** GPU-friendly transforms/opacity only; page transitions, staggered entrances,
  magnetic CTAs, canvas dust, velocity marquee. Everything degrades to a static,
  fully usable site under `prefers-reduced-motion`, and pointer effects run only on
  fine-pointer devices. No Three.js — deliberately avoided for load-time cost.
- **Accessibility:** skip link, semantic landmarks, labelled controls, visible focus,
  keyboard-operable galleries/menus, `overflow-x:clip` mobile guards.

## Going production

- **Hosting:** any static host works (`dist/`). `vercel.json` ships SPA rewrites plus
  security headers (HSTS, nosniff, SAMEORIGIN framing, referrer/permissions policies,
  CSP). HTTPS + HTTP→HTTPS redirect come from the host — Vercel enforces both by
  default. On other hosts (e.g. Netlify), replicate the headers there.
- **Domain checklist:** replace `https://www.example.com` in `public/sitemap.xml` and
  `public/robots.txt` with the production domain; the runtime canonical + OG tags
  derive from `window.location` automatically. For full link-unfurl support on
  scrapers that don't run JavaScript, add prerendering (e.g. `vite-plugin-prerender`).
- **Analytics (optional, off by default):** set a `VITE_PLAUSIBLE_DOMAIN` env var at build
  time (plus optional `VITE_PLAUSIBLE_SRC` for self-hosted Plausible). The consent
  banner then appears on first visit; tracking scripts load only after explicit
  **Accept**, pageviews fire per route, and booking-CTA clicks are recorded as
  `Booking CTA` events. Declining stores nothing but the refusal, locally.
- **Legal:** `/privacy` and `/terms` are written for this studio's actual data flows
  (Google Form bookings, email enquiries, no accounts) but are **not a substitute
  for legal counsel** — have them reviewed before launch.
- **Forms:** the enquiry form is `mailto:`-based (no backend, no user data stored).
  Required fields use native validation; a honeypot field blocks obvious bots.
  When a backend exists, re-validate there and consider rate limiting/CAPTCHA.
- **Secrets:** none in the codebase (verified by grep for keys/tokens/passwords).
  Google Fonts, Unsplash, Google Maps/Forms embeds need no keys.

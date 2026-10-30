# Studio S — Studio of Stories (Website)

Marketing + booking website for **Studio S (Studio of Stories)**, Smartline Publishers Ltd, Tema, Ghana —
a creative studio offering podcast, photoshoot, video, sound, animation, live-streaming and studio-rental packages.

Built with **React 19 + Vite + react-router-dom**. Booking requests go through the
official Google Form; Instagram gallery synchronization uses Vercel server functions.

## Quick start

```bash
npm install
npm run dev      # local dev server with HMR
npm run build    # production build into dist/
npm test         # feed normalization and duplicate-post checks
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
| `/gallery` | Gallery | Curated Studio S image archive and connected Instagram posts |
| `/contact`  | Contact  | Email, phone, Google Maps embed, enquiry form |

Unknown paths render a branded 404 page. The app uses `BrowserRouter`, so production
hosting needs an SPA fallback (serve `index.html` for unknown paths).

## Project structure

```
src/
  App.jsx               # Router, scroll restoration, page transitions, image fades
  config.js             # ★ All real-world links & contact details (edit here)
  instagramArchive.js   # Selected supplied Studio S image archive
  hooks.js              # usePageMeta — per-page title + meta description
  index.css             # Full design system + motion layer (tokens, layout, pages)
  assets/studio-s-logo.svg  # Official Studio S badge (also used as favicon)
  components/
    Layout.jsx          # Header/nav, mobile menu, footer, BookingLink, watermark
    InstagramGallery.jsx # Instagram feed, archive fallback, responsive lightbox
    Reveal.jsx          # Scroll-triggered reveals (stagger via `delay` prop)
    motion.jsx          # Magnetic, ParticleField, VelocityMarquee, useMediaMotion…
  pages/                # Home, Gallery, About, Services, Spaces, RateCard, Booking, Contact
api/
  instagram-feed.js     # Server-side feed read + refresh
  instagram-sync.js     # Authenticated scheduled sync endpoint
server/
  instagram.js          # Graph API, deduplication, and Blob persistence
  instagram.test.js     # feed normalization and deduplication tests
public/
  favicon.svg           # Studio S badge (browser tab icon)
  images/gallery/       # Selected supplied Pa Gya! 10 brand photos
```

## Site configuration (`src/config.js`)

Single source of truth for live details — update these, rebuild, done:

```js
bookingFormUrl  // Official Google Form — every "Request a Booking" CTA opens it in a new tab
email           // studios@smartlinepublishers.com (also powers the Contact mailto form)
phone           // 0302 810 641
instagramUrl    // https://instagram.com/studio_s.gh
```

## Instagram gallery synchronization

The gallery reads the Instagram Professional account through the official Instagram
Graph API on Vercel server functions; access tokens are never sent to the browser.
Until account credentials are available, it displays the selected Pa Gya! 10 images
from the supplied brand archive (`public/images/gallery/`) instead; these are
clearly presented without fabricated Instagram captions or post dates.
Create a **public Vercel Blob store** connected to this Vercel project to retain the
post snapshot, then configure these server-only environment variables in the Vercel
project (Production and Preview as appropriate):

- `INSTAGRAM_USER_ID` — the Instagram Professional account ID for `@studio_s.gh`.
- `INSTAGRAM_ACCESS_TOKEN` — a valid Graph API access token with the permissions
  required to read the account's media (typically `instagram_basic`,
  `pages_show_list`, and `pages_read_engagement` for the Facebook Login flow).
  The Instagram account must be Professional and connected to the authorized Page.
- `BLOB_READ_WRITE_TOKEN` — supplied when the Blob store is connected. Vercel OIDC
  credentials (`BLOB_STORE_ID` and `VERCEL_OIDC_TOKEN`) are also supported.
- `CRON_SECRET` — a long, random value used to protect the scheduled sync endpoint.
- `INSTAGRAM_GRAPH_API_VERSION` — optional; defaults to `v26.0`.

The first request imports up to the latest 500 available posts. Later syncs merge
media by Instagram ID, retain posts already saved, and refresh recent posts every
five minutes when the gallery is requested. Vercel Cron also runs a daily sync at
08:15 UTC. Failed refreshes leave the last saved feed available and show a notice.
The Meta Instagram Graph API currently does not provide a webhook event for newly
published media, so the supported scheduled/on-demand sync is used instead of
claiming a real-time post webhook. Keep the access token valid and rotate it when
Meta requires renewal.

The Blob feed contains only public Instagram post metadata and image URLs. Never
put access tokens, app secrets, or other credentials in `VITE_` variables or in
the public Blob snapshot. Local front-end development can build without credentials;
to exercise the API functions locally, use `vercel dev` with the server environment
variables and a connected Blob store.

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

- **Hosting:** any static host works for the core site (`dist/`). Live Instagram
  synchronization requires Vercel server functions and Blob; other hosts need
  equivalent API and scheduled-job services. `vercel.json` ships SPA rewrites,
  the daily sync schedule, and security headers (HSTS, nosniff, SAMEORIGIN framing,
  referrer/permissions policies, CSP). HTTPS + HTTP→HTTPS redirect come from the
  host — Vercel enforces both by default. On other hosts (e.g. Netlify), replicate
  the headers there.
- **Domain checklist:** `public/sitemap.xml` and `public/robots.txt` point at
  `https://studio-s-web.vercel.app` — update both if the domain ever changes.
  The runtime canonical + OG tags derive from `window.location` automatically. For full link-unfurl support on
  scrapers that don't run JavaScript, add prerendering (e.g. `vite-plugin-prerender`).
- **Analytics (live in production):** set `VITE_PLAUSIBLE_DOMAIN=studio-s-web.vercel.app`
  in your host's environment settings (Vercel → Project Settings → Environment
  Variables) — all `.env*` files are git-ignored and never committed, so the repo
  alone won't enable tracking. Copy `.env.example` to `.env.local` to test locally.
  The consent banner appears on first visit; tracking scripts load only after explicit
  **Accept**, pageviews fire per route, and booking-CTA clicks are recorded as
  `Booking CTA` events. The choice persists in a `studio-s-consent` cookie
  (`Secure`, `SameSite=Lax`, host-only, `Path=/`, 180 days). Declining stores
  nothing but the refusal. Plausible itself is cookieless; also add the domain in
  your Plausible dashboard or events won't be received.
- **Legal:** `/privacy` and `/terms` are written for this studio's actual data flows
  (Google Form bookings, email enquiries, no accounts) but are **not a substitute
  for legal counsel** — have them reviewed before launch.
- **Forms:** the enquiry form is `mailto:`-based (no form backend, no user data stored).
  Required fields use native validation; a honeypot field blocks obvious bots.
  If form submissions move to a backend, re-validate there and consider rate limiting/CAPTCHA.
- **Secrets:** none in the codebase (verified by grep for keys/tokens/passwords).
  Google Fonts, Unsplash, Google Maps/Forms embeds need no keys.

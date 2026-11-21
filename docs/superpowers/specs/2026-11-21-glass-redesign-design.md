# Immobilien Garten — glass redesign (multi-page)

Date: 2026-11-21 · Branch: `redesign/glass`

## Why

Portfolio piece meant to impress the client: a modern, premium, "3D + glassmorphism" site. The
centrepiece is a realistic scroll-scrubbed video of one villa that walks through every service
the company offers. Everything else should feel like the same product.

## Goals

- Home = cinematic 4K-sourced scroll video with 10 stops (arrival + 9 services), glass captions
  with prices, glass rail to jump between stops.
- The rest of the site split into dedicated pages (owner decision), all in the same visual system.
- Every service has its own page, including two new ones: **Pavaje** and **Gazon artificial**.
- Smooth: scrubbing never stutters (seek only when the decoder is free, eased progress,
  per-frame snapping), reveal animations, 3D tilt cards, no layout jank.
- Content stays editable in the existing admin (data/*.json via `/api/admin/*`).

## Non-goals / anti-goals

- No admin redesign; admin pages and APIs untouched.
- No new backend, no CMS migration, no new paid services.
- Not a heavier site on phones: mobile must not download the 1440p video.
- Must not lose SEO: old URLs keep working, every page keeps its metadata.

## Approaches considered

1. **Restyle in place** (keep all sections on the home page). Rejected by the owner — wants
   separate pages.
2. **Procedural three.js 3D scene** as the hero. Built as a mockup, rejected: looked fake.
3. **Chosen:** realistic AI video hero (Higgsfield, upscaled to 4K) + glass/depth design system
   applied across separate pages.

## Visual system (decided, see mockups look-v4/v5)

- Dark deep-green base `#07140d`, ink `#f3f8f1`, amber accent `#f5b83d` (ink `#1a1204`),
  leaf `#8fe0a6`. Soft radial green/amber glows behind content.
- Fonts unchanged: Archivo (headings, 900 weight, tight tracking), Space Grotesk (body).
- Glass: `rgba(255,255,255,.09)` + 1px white/20 border + `backdrop-filter: blur(22px)
  saturate(160%)` + deep shadow + inner top highlight. Radius 24–28px.
- Logo sits on a white pill (logo is dark green on white).
- Motion: reveal on scroll (fade + 40px rise), 3D tilt + cursor shine on cards, count-up stats,
  all disabled under `prefers-reduced-motion`.

## Sitemap

| Page | URL | Content |
|---|---|---|
| Acasă | `/` | Scroll video (10 stops) → slim strip of links to the pages → quote CTA |
| Servicii & Prețuri | `/servicii` | Bento of 9 service tiles w/ price + **price estimator** (service + quantity → range from `priceMin`/`priceMax`) |
| Service pages ×9 | `/servicii/<slug>` | Looping clip of that service from the video, glass price card, features, process timeline, FAQ, CTA. New: `pavaje`, `gazon-artificial` |
| Produse | `/produse` | Existing products tab content, restyled (products only; services moved to `/servicii`) |
| Lucrări | `/portofoliu` | Before/after slider (from `beforeAfter`), projects (from lucrari API) with filters + existing fullscreen viewer |
| Despre noi | `/despre` (new) | Stats, why us, reviews |
| Întrebări frecvente | `/intrebari-frecvente` (new) | All FAQs grouped (general + per service) |
| Contact | `/contact` | Glass quote form (existing Resend API), click-to-call, WhatsApp, coverage map from `coveringAreas` |
| Blog | `/blog`, articles | Glass cards; articles on a calmer, readable surface |
| Cookies, 404 | | Restyled only |

Nav: Acasă · Servicii · Lucrări · Despre · Blog · Contact + phone pill. Footer: all pages incl.
Produse, FAQ, cookies.

## Video assets

- Master: 4K Topaz upscale (3840×2160, 30 s, 24 fps) — kept outside the repo.
- Home: `public/video/story-1440.mp4` (≈28 MB, H.264, GOP 8, no B-frames) for desktop,
  `public/video/story-720.mp4` (≈18 MB → aim ≤12 MB) for phones/save-data, HD poster JPG.
  Video loads after first paint; poster shown until ready; progress bar.
- Service pages: short muted loops cut from the master per segment (1080p, ≤3 MB each) +
  poster stills.
- Segment cut times: 0, 2.96, 6, 9, 11.79, 14.79, 17.83, 20.71, 23.63, 26.54.

## Data

- Prices read from `services` in site-content (admin-editable). **Pavaje** has no price
  ("Ofertă personalizată"): defined in code as a price-less service so the existing persistent
  data on Railway needs no migration; estimator skips it.
- Before/after, lucrări, covering areas: unchanged sources.
- Service page copy (features/process/FAQ) stays in each page file as today.

## Redirects / SEO

- Old home anchors are gone; `/produse` stays (products). Service list moves to `/servicii`
  (previously only a layout) — add `servicii/page.tsx`.
- Keep per-page metadata; add metadata for new pages; update StructuredData + sitemap if present.

## Builder's calls (mine, flag if wrong)

- Products kept as their own page rather than deleted.
- Chatbot, WhatsApp button, cookie consent, analytics kept; restyled to glass.
- Copy needing client confirmation: "ofertă în 24h", "7 zile din 7 / Luni–Duminică", project
  descriptions beyond the first.
- No test suite exists; verification = `next build` + browser checks (desktop + mobile width,
  scroll smoothness metrics, no console errors, all pages 200).

## Addendum (2026-11-22, owner requests)

- Logo: dark-theme variant `public/logo-light.png` (grey → light ink, greens brightened) replaces the white pill.
- Coverage map: real OpenStreetMap (Leaflet) recoloured to the palette via CSS filter, amber/leaf pins from `src/lib/areas.ts`, dashed 14 km coverage circle; scroll-wheel zoom off. OSM attribution kept.
- Admin restyled to the dark glass theme and extended: **Video principal** (desktop/mobile video + poster upload, reset), **Pagini servicii** (intro, price note, features, steps, FAQ, SEO per service, reset), **Întrebări frecvente** (general FAQ). Stored in site-content.json (`storyVideo`, `serviceContent`, `generalFaq`), merged over code defaults (`src/lib/contentMerge.ts`). Home, /servicii, service pages and FAQ render dynamically so edits show immediately. The unused hero-carousel tab was removed (data kept).
- Uploaded files are streamed with HTTP Range support; videos ≤ 80 MB (MP4/WebM). Story video URLs only accept same-site paths.

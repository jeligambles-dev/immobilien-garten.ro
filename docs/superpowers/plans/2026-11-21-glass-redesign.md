# Glass Redesign (multi-page) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public site of immobilien-garten.ro as a dark glassmorphism multi-page site whose home page is a scroll-scrubbed 4K-sourced story video through all 9 services.

**Architecture:** Shared design tokens + small glass/motion primitives in `src/components/ui/`, a dependency-free service catalog in `src/lib/` (unit-tested with `node --test`), and one page per section. Prices and other admin content still come from `/api/admin/*` (data/*.json); admin is untouched. Mockups to match: `look-v5.html` (home + sections) — copy kept in `docs/superpowers/mockups/`.

**Tech Stack:** Next.js 16 (app router), React 19, Tailwind 4 (`@theme` in globals.css), lucide-react, ffmpeg (asset encoding), Node 25 built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-21-glass-redesign-design.md`

## Global Constraints

- Colors: bg `#07140d`, ink `#f3f8f1`, muted `rgba(243,248,241,.75)`, accent `#f5b83d`, accent-ink `#1a1204`, leaf `#8fe0a6`.
- Glass: `background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.2); backdrop-filter: blur(22px) saturate(160%); box-shadow: 0 30px 80px -20px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.25); border-radius: 24px`.
- Fonts unchanged: Archivo (`--font-heading`, headings weight 900, letter-spacing -.02em), Space Grotesk (`--font-body`).
- Phone `0747 469 681` (`tel:0747469681`). Logo `/logo1.png` always on a white pill.
- All copy Romanian with diacritics (ș ț ă î â).
- `prefers-reduced-motion: reduce` disables tilt, parallax, reveal transitions and count-ups (content shown in final state).
- Do not modify anything under `src/app/admin`, `src/app/api`, `src/lib/auth.ts`, `src/lib/paths.ts`, `data/*.json`.
- Every existing public URL must still return 200 (`/`, `/produse`, `/portofoliu`, `/contact`, `/blog`, 4 blog articles, 7 service pages, `/politica-cookies`).
- Video seeks: only when `!video.seeking && readyState >= 2`; time snapped to 1/24 s.
- Verification for UI tasks = `npm run build` passes + the page checked in a browser at 1440×900 and 390×844 with no console errors.

## Review Focus

1. Admin renamed/deleted a price row in site-content → that service shows "Ofertă personalizată" and the estimator hides it; no crash. (Task 2 test `priceFor falls back when row missing`.)
2. Estimator input empty, `0`, negative, `abc`, or comma decimal `12,5` → no `NaN` rendered; `12,5` works as 12.5. (Task 2 tests on `parseQty` / `estimateRange`.)
3. Phone or `navigator.connection.saveData` → only `story-720.mp4` is requested, never the 1440p file. (Task 4 browser check via network log.)
4. Video 404 / slow network → poster stays, captions + rail still follow scroll, no repeating console errors. (Task 4 check with the video path temporarily renamed.)
5. Old URLs and `/produse` still 200 after nav/sitemap changes. (Task 13 curl loop.)

---

### Task 1: Design tokens, UI primitives, shell (Navbar, Footer, floating widgets)

**Files:**
- Modify: `src/app/globals.css` (tokens above in `@theme`, `body` dark bg, `.glass` utility, reveal/tilt keyframes, reduced-motion block)
- Create: `src/components/ui/Glass.tsx`, `src/components/ui/Reveal.tsx`, `src/components/ui/TiltCard.tsx`, `src/components/ui/SectionHead.tsx`, `src/components/ui/CountUp.tsx`
- Modify: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/WhatsAppButton.tsx`, `src/components/BackToTop.tsx`, `src/components/CookieConsent.tsx`, `src/components/Chatbot.tsx` (styling only)
- Copy: mockups `look-v4.html`, `look-v5.html` → `docs/superpowers/mockups/`

**Interfaces — Produces:**
- `Glass({as?, className?, children})` — element with `.glass`.
- `Reveal({delay?: number, className?, children})` — client; IntersectionObserver (threshold .15) adds `in` once.
- `TiltCard({className?, children, max?: number = 10})` — client; rotateX/Y ±max deg + `--mx/--my` shine vars; no-op under reduced motion.
- `SectionHead({eyebrow, title: ReactNode, lead?, align?: 'left'|'center', aside?: ReactNode})` — eyebrow with leading 28px line, h2 `clamp(34px,4.4vw,60px)`, `<em>` in amber.
- `CountUp({to: number, suffix?: string, ms?: number = 1400})` — client, ease-out cubic, starts when visible.
- Navbar links (exact): Acasă `/`, Servicii `/servicii`, Lucrări `/portofoliu`, Despre `/despre`, Blog `/blog`, Contact `/contact`; amber pill `☎ 0747 469 681`. Floating glass bar `top:14px`, `width:min(1160px, 100% - 24px)`, radius 999px; mobile: glass sheet menu.
- Footer columns: brand (logo pill + one line) · Servicii (9 links from Task 2 `SERVICES`) · Companie (Lucrări, Produse `/produse`, Despre, Întrebări frecvente `/intrebari-frecvente`, Blog, Contact) · Contact (phone, email, Facebook, Instagram — keep existing URLs) · legal row with cookies link.

- [ ] **Step 1:** Add tokens/utilities to `globals.css`; set `body{background:var(--color-bg);color:var(--color-ink)}`.
- [ ] **Step 2:** Create the 5 primitives with the signatures above.
- [ ] **Step 3:** Restyle Navbar + Footer + floating widgets to glass (Footer may hard-code the service list until Task 2 lands, then switch to `SERVICES`).
- [ ] **Step 4:** Run `npm run build` → Expected: success. Open `/` and `/contact` at 1440 and 390 widths: glass nav visible over content, mobile menu opens/closes, no console errors.
- [ ] **Step 5:** Commit `feat: glass design tokens, primitives and site shell`.

### Task 2: Service catalog + price estimator logic (tested)

**Files:**
- Create: `src/lib/services.ts`, `src/lib/estimate.ts`, `src/lib/scrub.ts`
- Create: `tests/services.test.ts`, `tests/estimate.test.ts`, `tests/scrub.test.ts`
- Modify: `package.json` (add `"test": "node --test tests/"`), `tsconfig.json` (add `"exclude": ["node_modules", "tests"]`)

Libs must have **no imports** (tests import them via relative `../src/lib/x.ts`).

**Interfaces — Produces:**
```ts
// services.ts
export type ServiceSlug = 'pavaje'|'tuns-gazon'|'scarificare'|'gazon-rulou'|'gazon-artificial'|'gard-viu'|'toaletare-pomi'|'plantari'|'irigatii';
export interface ServiceDef { slug: ServiceSlug; title: string; eyebrow: string; blurb: string; dataId: string | null; segmentStart: number; still: string; clip: string; poster: string }
export const SERVICES: ServiceDef[];            // video order, see table
export const STORY_STARTS: number[];            // [0, 2.96, 6, 9, 11.79, 14.79, 17.83, 20.71, 23.63, 26.54]
export interface PriceRow { id: string; title: string; price: string; priceMin?: number; priceMax?: number; unit?: string }
export interface ServicePrice { label: string; min: number | null; max: number | null; unit: string | null }
export function priceFor(def: ServiceDef, rows: PriceRow[] | undefined): ServicePrice;
// estimate.ts
export function parseQty(raw: string): number | null;               // accepts "12,5" and "12.5"; null if not finite or <= 0
export function estimateRange(min: number | null, max: number | null, qty: number | null): { low: number; high: number } | null; // rounded to whole lei
export function formatLei(n: number): string;                       // ro-RO grouping: 1250 → "1.250 lei"
// scrub.ts
export function segmentAt(t: number, starts: number[]): number;     // index of last start <= t
export function snapToFrame(t: number, fps: number): number;
export function easeStep(cur: number, target: number, dtFrames: number, k?: number): number; // cur + (target-cur)*(1-(1-k)^dt), snaps when |diff|<1e-5
```

Catalog (order, slug, title, eyebrow, dataId, segmentStart; `still=/img/services/<slug>.webp`, `clip=/video/services/<slug>.mp4`, `poster=/img/services/<slug>-poster.webp`); blurbs = the `d` strings from look-v3/v4:

| slug | title | eyebrow | dataId | start |
|---|---|---|---|---|
| pavaje | Pavaje & alei | Amenajare curte | null | 2.96 |
| tuns-gazon | Tuns gazon | Întreținere | 1 | 6 |
| scarificare | Scarificare & aerisire | Regenerare | 2 | 9 |
| gazon-rulou | Gazon rulou | Gazon nou | 6 | 11.79 |
| gazon-artificial | Gazon artificial | Tot anul verde | 7 | 14.79 |
| gard-viu | Tuns gard viu | Tuns drept | 4 | 17.83 |
| toaletare-pomi | Toaletare pomi | Pomi & arbuști | 3 | 20.71 |
| plantari | Plantări profesionale | Peisagistică | 5 | 23.63 |
| irigatii | Sisteme de irigații | Automatizare | 8 | 26.54 |

`priceFor`: row with `id === dataId` → `label` = `"de la " + row.price` with leading "De la " stripped once (e.g. "de la 0.50 lei/mp"), min/max/unit from row; otherwise `{label:'Ofertă personalizată', min:null, max:null, unit:null}`.

- [ ] **Step 1: Write failing tests**
```ts
// tests/services.test.ts
test('9 services in video order', () => assert.deepEqual(SERVICES.map(s=>s.slug), ['pavaje','tuns-gazon','scarificare','gazon-rulou','gazon-artificial','gard-viu','toaletare-pomi','plantari','irigatii']));
test('priceFor uses row by id', () => assert.deepEqual(priceFor(SERVICES[1], [{id:'1',title:'Tuns Gazon',price:'De la 0.50 lei/mp',priceMin:0.5,priceMax:1.5,unit:'mp'}]), {label:'de la 0.50 lei/mp',min:0.5,max:1.5,unit:'mp'}));
test('priceFor falls back when row missing', () => assert.equal(priceFor(SERVICES[1], []).label, 'Ofertă personalizată'));
test('pavaje never priced', () => assert.equal(priceFor(SERVICES[0], [{id:'1',title:'x',price:'1'}]).min, null));
// tests/estimate.test.ts
test('parseQty', () => { assert.equal(parseQty('12,5'),12.5); assert.equal(parseQty('120'),120); for (const b of ['', '0', '-3', 'abc']) assert.equal(parseQty(b), null); });
test('estimateRange', () => { assert.deepEqual(estimateRange(0.5,1.5,200),{low:100,high:300}); assert.equal(estimateRange(null,null,200),null); assert.equal(estimateRange(1,2,null),null); });
test('formatLei', () => assert.equal(formatLei(1250).replace(/\s/g,' '), '1.250 lei'));
// tests/scrub.test.ts
test('segmentAt', () => { assert.equal(segmentAt(0,STORY_STARTS),0); assert.equal(segmentAt(6.01,STORY_STARTS),2); assert.equal(segmentAt(29.9,STORY_STARTS),9); });
test('snapToFrame', () => assert.equal(snapToFrame(1.02,24), 1));
test('easeStep converges and snaps', () => { let c=0; for(let i=0;i<400;i++) c=easeStep(c,1,1); assert.equal(c,1); });
```
- [ ] **Step 2:** `npm test` → Expected: FAIL (modules missing).
- [ ] **Step 3:** Implement the three libs per interfaces.
- [ ] **Step 4:** `npm test` → Expected: all pass. `npm run build` → success.
- [ ] **Step 5:** Commit `feat: service catalog, price estimator and scrub helpers`.

### Task 3: Video + image assets

**Files:**
- Create: `scripts/encode-assets.sh` (args: path to 4K master, path to stills dir)
- Create: `public/video/story-1440.mp4`, `public/video/story-720.mp4`, `public/img/story-poster.webp`, `public/video/services/<slug>.mp4` ×9, `public/img/services/<slug>.webp` ×9, `public/img/services/<slug>-poster.webp` ×9

Sources (outside repo): master `…/scratchpad/garten/story4k/story-4k.mp4`; stills `…/garten/.superpowers/brainstorm/11851-1795221884/content/st-02.jpg … st-10.jpg` (st-02 = pavaje … st-10 = irigații, same order as the table).

Encodings (all `-an -pix_fmt yuv420p -movflags +faststart`, libx264 `-preset slow -tune film -bf 0`):
- story-1440: `scale=2560:1440:flags=lanczos`, `-crf 28 -g 8`.
- story-720: `scale=1280:720`, `-crf 28 -g 6` (target ≤ 12 MB).
- service clip: `-ss <start+0.15> -t <segment length − 0.3>` (next start, or 30.0 for irigații), `scale=1920:1080`, `-crf 26 -g 48` (normal playback, looped), target ≤ 3 MB each.
- posters: frame at `start+0.5` → webp q80 2560 wide (story) / 1920 wide (service). Stills → webp q80 1600 wide.

- [ ] **Step 1:** Write the script; run it.
- [ ] **Step 2:** Verify: `ls -lh public/video public/video/services` → story-1440 ≤ 30 MB, story-720 ≤ 12 MB, each clip ≤ 3 MB; `ffprobe` each clip shows 1920×1080 and duration ≈ segment length.
- [ ] **Step 3:** Commit `chore: encoded story video, service clips and stills`.

### Task 4: Home page — scroll story + link strip

**Files:**
- Create: `src/components/home/ScrollStory.tsx` (client), `src/components/home/HomeLinks.tsx`
- Modify: `src/app/page.tsx` (replace all current sections)

**Interfaces:** Consumes `SERVICES`, `STORY_STARTS`, `priceFor`, `segmentAt`, `snapToFrame`, `easeStep`; prices fetched client-side from `/api/admin/content` (`services` field).

Behaviour (port of mockup look-v4 script, exact values):
- Track height `1100vh`, sticky 100vh pin, fixed stage, shade gradients as mockup.
- Source pick: 720 if `min(screen.w,screen.h)*dpr < 900 || innerWidth < 760 || connection.saveData`, else 1440. Fetch after `load` event via streamed reader into a Blob URL with a 3px amber progress bar; poster `/img/story-poster.webp` until `loadeddata`.
- rAF loop: `cur = easeStep(cur, target, dt, .1)`; `t = snapToFrame(cur*(30-.05), 24)`; seek only when free (Global Constraints). Hero card opacity `max(0, 1 - t/1.6)` and `pointer-events:none` after 1.2s.
- Caption = glass card (number, eyebrow, h3, blurb, price pill, `Detalii →` link to `/servicii/<slug>`); rail of 10 dots (first = "Sosire") jumping to `start+.4`.
- Pointer parallax eased in the same loop (±20px x, ±12px y); off under reduced motion and on touch devices.
- Hero card copy exactly as look-v4 (badge "Timișoara & împrejurimi", h1 "Grădina ta, / cartea noastră / de vizită.", CTAs Sună acum / Vezi lucrările → `/portofoliu`).
- `HomeLinks`: 4 glass link cards → Servicii & prețuri, Lucrări, Despre noi, Contact (each one line + arrow), then amber CTA band "Pregătit să-ți transformi grădina?" with phone + `/contact`.

- [ ] **Step 1:** Implement components; replace `page.tsx` (keep its `metadata`).
- [ ] **Step 2:** `npm run build` → success.
- [ ] **Step 3:** Browser 1440×900: scroll whole track programmatically (300 steps × 33 ms) and record `seeking→seeked` latencies → Expected p95 < 30 ms, final `currentTime` ≥ 29.9, last caption "Sisteme de irigații". Screenshot at 24% matches mockup (Tuns gazon caption).
- [ ] **Step 4:** Browser 390×844: network log shows `story-720.mp4` only. Temporarily rename the video file → poster stays, captions still change, ≤1 console error; restore file.
- [ ] **Step 5:** Commit `feat: home scroll story with 4K-sourced video`.

### Task 5: `/servicii` — bento + price estimator

**Files:**
- Create: `src/app/servicii/page.tsx` (server, metadata title "Servicii & Prețuri"), `src/components/services/ServiceBento.tsx` (client), `src/components/services/PriceEstimator.tsx` (client)

**Interfaces:** Consumes `SERVICES`, `priceFor`, `parseQty`, `estimateRange`, `formatLei`, `TiltCard`, `Reveal`, `SectionHead`.
- Bento: 4-col grid, rows 260px; pavaje `span 2×2`, gazon-rulou / toaletare-pomi / irigatii `span 2` wide, rest 1×1, final amber CTA tile "Evaluare gratuită la tine acasă" → `/contact` (16 cells). Image `object-position: center 70%`. 2 cols < 980px, 1 col < 560px. Tile → `/servicii/<slug>`.
- Estimator glass panel: select (priced services only), quantity input with unit suffix (mp/ml/buc), result "Estimare: {low} – {high}" via `formatLei`, small note "Preț orientativ. Oferta finală după evaluarea gratuită." and CTA `/contact?serviciu=<slug>`. Invalid qty → result hidden.

- [ ] **Step 1:** Implement. - [ ] **Step 2:** build. - [ ] **Step 3:** Browser: type `200` with Tuns gazon → "100 lei – 300 lei" (formatLei form); type `abc` → no result, no NaN; 390px width single column. - [ ] **Step 4:** Commit `feat: services page with bento and price estimator`.

### Task 6: Service pages ×9 (content module + new Pavaje, Gazon artificial)

**Files:**
- Create: `src/lib/serviceContent.ts` — `export const SERVICE_CONTENT: Record<ServiceSlug, {intro: string; features: string[]; process: {step: string; desc: string}[]; faq: {q: string; a: string}[]; metaTitle: string; metaDescription: string}>` — move existing copy verbatim out of the 7 page files; write new copy for `pavaje` and `gazon-artificial` in the same shape (4 features min, 4 process steps, 3 FAQs).
- Modify: `src/components/ServicePage.tsx` → props `{slug: ServiceSlug}`; header = full-bleed looping muted `clip` with `poster` (`autoPlay muted loop playsInline preload="metadata"`, static poster under reduced motion / saveData), glass title card with eyebrow + h1 + intro + live price pill (`priceFor` from `/api/admin/content`); then features grid, process timeline (numbered glass steps with connecting line), FAQ accordion, CTA band, "Alte servicii" row (3 other services).
- Modify: the 7 `src/app/servicii/*/page.tsx` → `<ServicePage slug="…"/>` + metadata from content.
- Create: `src/app/servicii/pavaje/page.tsx`, `src/app/servicii/gazon-artificial/page.tsx`.

- [ ] **Step 1:** Add `tests/serviceContent.test.ts`: every slug in `SERVICES` has content with ≥4 features, 4 process steps, ≥3 faq. Run → FAIL.
- [ ] **Step 2:** Implement content module → test PASS.
- [ ] **Step 3:** Rewrite ServicePage and the 9 pages. build → success.
- [ ] **Step 4:** Browser: `/servicii/pavaje` and `/servicii/tuns-gazon` — clip plays, price pill "Ofertă personalizată" / "de la 0.50 lei/mp".
- [ ] **Step 5:** Commit `feat: glass service pages, add pavaje and gazon artificial`.

### Task 7: `/produse` — products only

**Files:** Modify `src/app/produse/page.tsx` (drop the Servicii tab and its array; keep the 6 products; glass cards with icon, title, desc, "Preț la cerere" pill, CTA "Cere ofertă" → `/contact?produs=<title>`; header links to `/servicii` "Cauți servicii? Vezi prețurile →"). Update metadata title to "Produse".

- [ ] **Step 1:** Implement. - [ ] **Step 2:** build + browser at both widths. - [ ] **Step 3:** Commit `feat: products page restyle`.

### Task 8: `/portofoliu` — before/after + projects

**Files:** Modify `src/components/BeforeAfter.tsx` (pointer-drag clip-path slider + tabs, as mockup; data from `/api/admin/content` `beforeAfter`), `src/app/portofoliu/page.tsx` (SectionHead, BeforeAfter on top, then existing filter chips + project grid restyled as glass cards; keep the existing selected/photoIdx/fullscreen viewer logic, restyle its modal to glass).
Delete `src/components/LucrariCarousel.tsx`, `src/components/HeroCarousel.tsx` if unused after Task 4 (grep first).

- [ ] **Step 1:** Implement. - [ ] **Step 2:** build. - [ ] **Step 3:** Browser: drag slider changes split (`--p`), tab switch swaps images, project opens viewer, fullscreen still works, touch drag works at 390px without blocking vertical scroll (`touch-action: pan-y`). - [ ] **Step 4:** Commit `feat: portfolio with before/after slider`.

### Task 9: `/despre` (new)

**Files:** Create `src/app/despre/page.tsx` (metadata "Despre noi"); Modify `src/components/Testimonials.tsx` (glass cards, 3 existing reviews moved here from old home).
Sections: intro (SectionHead "Despre noi" + 2 short paragraphs from existing home/why-us copy), 4 stats with `CountUp` (50+ grădini transformate · 24h ofertă de preț · 2–5 zile până la start · 100% echipamente proprii), 3 "De ce noi" cards (existing `strengths` copy), Testimonials, CTA band.

- [ ] **Step 1:** Implement. - [ ] **Step 2:** build + browser. - [ ] **Step 3:** Commit `feat: about page`.

### Task 10: `/intrebari-frecvente` (new)

**Files:** Create `src/lib/faq.ts` (`export const GENERAL_FAQ: {q: string; a: string}[]` — the 6 old home FAQs verbatim), `src/app/intrebari-frecvente/page.tsx` (metadata "Întrebări frecvente"; general group, then one group per service from `SERVICE_CONTENT[slug].faq` titled with `SERVICES` title + link; glass `<details>` accordion; FAQPage JSON-LD script for all Q&As).

- [ ] **Step 1:** Implement. - [ ] **Step 2:** build; browser: 10 groups render; JSON-LD parses (`JSON.parse` of the script tag in console). - [ ] **Step 3:** Commit `feat: FAQ page`.

### Task 11: `/contact` + coverage map

**Files:** Modify `src/app/contact/page.tsx` (glass form keeping the existing `/api/contact` request body exactly; prefill service select from `?serviciu=` / `?produs=`; click-to-call + WhatsApp + email cards), `src/components/ServiceArea.tsx` (SVG radius map as mockup: rings, amber ring draws on reveal, Timișoara centre pill, area pills from `coveringAreas`; positions: Timișoara 50/50, Dumbrăvița 58/30, Ghiroda 74/40, Giroc 58/72, Moșnița 75/66, Săcălaz 22/40, Sânmihaiu Român 26/72, unknown names placed evenly on the 130px ring).

- [ ] **Step 1:** Read the current form submit code and keep its payload. - [ ] **Step 2:** Implement. - [ ] **Step 3:** build; browser: `/contact?serviciu=pavaje` preselects Pavaje; submit with empty fields shows validation, no request sent. Do not send a real email. - [ ] **Step 4:** Commit `feat: contact page and coverage map`.

### Task 12: Blog, cookies, 404

**Files:** Modify `src/app/blog/page.tsx` (glass cards with image, date, read time), `src/components/BlogArticle.tsx` (reading surface: max-width 720px, background `rgba(255,255,255,.04)`, no backdrop blur behind text, body 18px/1.75), `src/app/politica-cookies/page.tsx`, `src/app/not-found.tsx` (glass, links home/servicii).

- [ ] **Step 1:** Implement. - [ ] **Step 2:** build + browser on one article at 390px (no horizontal scroll). - [ ] **Step 3:** Commit `feat: blog, cookies and 404 restyle`.

### Task 13: SEO, cleanup, final verification

**Files:** Modify `src/app/sitemap.ts` (add `/servicii`, `/servicii/pavaje`, `/servicii/gazon-artificial`, `/despre`, `/intrebari-frecvente`), `src/components/StructuredData.tsx` (service list from `SERVICES`), delete components no longer imported (grep each).

- [ ] **Step 1:** Implement. - [ ] **Step 2:** `npm test` and `npm run build` → pass.
- [ ] **Step 3:** `npm start` then curl every URL (all listed in Global Constraints + 5 new) → Expected all `200`; `/sitemap.xml` lists the new URLs.
- [ ] **Step 4:** Browser pass over every page at 1440 and 390: no console errors, no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`).
- [ ] **Step 5:** Commit `chore: sitemap, structured data, remove unused components`.

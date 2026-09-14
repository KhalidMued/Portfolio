# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Khalid Mudathir's personal portfolio — a single-page React app positioned around:

> **I build the apps people use — and understand everything it runs on.**

The site deliberately shows two sides of one engineer: **Developer** and
**Network & Security Engineer**, not two separate personas. Every major
section (Skills, Works/Projects) is split into a Dev side and a Security
side; Experience entries and Credentials carry category badges; a shared
color system ties it all together (see `src/constants/categories.js`).

## Stack

- React 18 + Vite, Tailwind CSS (JIT, dark mode via a `.dark` class on `<html>`)
- Framer Motion for animation
- React Three Fiber / drei / Three.js for the hero's 3D desk model, the
  contact section's earth, and the background starfield
- `react-icons` (Simple Icons `si` set + Font Awesome 6 `fa6` set) for all
  tech/skill/credential icons — no raster image assets for these anymore
- Contact form posts to `/api/contact`, a Cloudflare Worker
  (`worker/index.js`) that sends through Resend; React Toastify for
  notifications
- Deployed to Cloudflare Workers via bare `npx wrangler deploy` — see
  `wrangler.jsonc`. **`https://khalidmued.com` is the primary URL** and
  the one `index.html`'s `canonical` / `og:url` point at.
  `https://portfolio.khalidmued.com` is a working alternate serving the
  same Worker, and `https://portfolio.khalid-mued.workers.dev` still
  answers as well. All three serve identical content and all of them
  declare the apex as canonical, so search engines treat khalidmued.com
  as the real address — **don't add a redirect between them**, and if you
  change the canonical host, change it in all four tags in `index.html`
  (`canonical`, `og:url`, `og:image`, `twitter:image`).
- The hostnames are Cloudflare **Custom Domains configured in the
  dashboard**, deliberately not declared as `routes` in `wrangler.jsonc`:
  a deploy reconciles the route list, so declaring a subset risks
  detaching a hostname nobody remembered to write down.

## Commands

- `npm run dev` — dev server (usually `http://localhost:5173`)
- `npm run dev:worker` — `wrangler dev` on `:8787`, serving `dist/` **and**
  the contact Worker. Vite proxies `/api` there, so run it alongside
  `npm run dev` if you're touching the contact form — or just use `:8787`
  on its own, which is the closest thing to production.
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint
- `npm run icons` — regenerates the favicon / touch-icon set in `public/`
  from `public/logo.svg` (`favicon.ico`, `favicon-32.png`,
  `apple-touch-icon.png` + the `-precomposed` alias, `icon-192/512.png`).
  Run after changing the logo. Output is committed and deterministic.
  **Every one of those filenames matters**: the SPA fallback answers any
  path that isn't a real asset with `index.html`, so a missing icon file
  is served as a 200 page of HTML rather than a 404 — which is exactly
  why iOS had no usable icon before these existed. The same trap caught
  `robots.txt`. If you add an icon `<link>`, add the file.
- `npm run og:card` — regenerates `public/og-card.png`, the 1200x630
  link-preview image, from `scripts/generate-og-card.mjs`. The output is
  committed, so only run this when the card design changes. It's
  deterministic (the starfield is seeded), so an unchanged design
  regenerates byte-identically instead of producing binary churn. Fonts
  are fetched from Google Fonts into `.cache/og-fonts/` on first run.

No test suite exists yet.

The Worker needs `RESEND_API_KEY`. In production it's a Worker secret
(`npx wrangler secret put RESEND_API_KEY`); locally it goes in `.dev.vars`
(gitignored — copy `.dev.vars.example`). Without it the endpoint answers
500 and logs why, rather than failing silently.

## Architecture notes

- **Content lives in `src/constants/index.js`** — hero copy, about
  paragraphs, `services`, `technologyGroups` (4 tabs: Development / Network
  & Security / Infrastructure & Systems / AI & Engineering Tools),
  `experiences`, `credentials`, `devProjects` / `securityProjects`, `stats`.
  Update content here, not by hand-editing JSX.
- **`src/constants/categories.js`** defines the shared accent palette:
  `CATEGORY.dev` (violet `#915eff`), `.security` (teal `#00cea8`), `.infra`
  (amber `#f5a623`), `.ai` (pink `#ec4899`). Reuse these instead of
  inventing new colors — this is what keeps the "two sides" visually
  consistent across Tech, Experience, Works, Credentials, and Highlights.
- **`src/components/covers/ProjectCovers.jsx`** — abstract inline-SVG
  "cover art" for project cards (topology / architecture / dashboard /
  incident / lab / ztna) since there are no real project screenshots yet.
  Tinted via the project's category color.
- **`.glass-card` (in `src/index.css`)** — the theme-aware frosted-glass
  surface used by the About "Two Sides" cards. It needs something colorful
  behind it to actually read as glass (see the blurred blob `div`s in
  `About.jsx`) — `backdrop-filter: blur` over a flat background is
  invisible.
- **Theme system**: CSS custom properties on `:root` (light) and `.dark`
  (dark) in `src/index.css`, consumed via Tailwind's
  `rgb(var(--color-x) / <alpha-value>)` pattern (see `tailwind.config.js`).
  When you need a theme-aware color in an inline `style` (not a Tailwind
  class), reference the same vars directly, e.g.
  `style={{ color: 'rgb(var(--color-heading))' }}`.
- **`react-vertical-timeline-component` gotcha**: its own stylesheet
  (`.vertical-timeline-element-icon svg`) absolutely-positions and centers
  a **direct** `<svg>` child of the `icon` prop (a `left:50%;
  margin-left:-12px`-style hack). Do NOT wrap the icon in a flex-centering
  `<div>` — that double-centers it and pushes it toward the edge of the
  circle. Pass the icon element directly (see `Experience.jsx`).
- **Framer Motion gotcha — `viewport.amount` and tall sections**:
  `SectionWrapper` triggers every section's entrance with
  `whileInView`. Its `viewport.amount` must stay `"some"` (threshold 0)
  and never go back to a fraction like `0.25`. `amount` is a fraction of
  **the element's own height**, so `0.25` means "a quarter of this
  section must be on screen at once" — unsatisfiable the moment a section
  exceeds four viewport heights. On a phone the About section stacks to
  ~3585px, needing 896px visible against a usable Safari viewport of
  ~750px, so the observer never fired and the entire section stayed at
  its `hidden` variant: a screen and a half of blank space between Hero
  and Experience on every iPhone, while desktop looked perfect. If the
  entrance timing needs tuning, change the `margin` (rootMargin), never
  `amount`.
- **Framer Motion gotcha**: a child `motion.div` using
  `variants={fadeIn(...)}` only animates in correctly if its animation
  state actually propagates from an ancestor using **string**
  `initial`/`animate` labels (e.g. the `SectionWrapper` HOC's
  `initial="hidden" whileInView="show"`). If you interpose a parent
  `motion.div` that sets `initial`/`animate` as **literal objects**
  (common for a `key`-based remount on tab switch), that breaks the
  propagation chain and the children stay stuck at `opacity: 0`. Either
  give the child its own explicit `initial`/`animate` objects (what
  `Tech.jsx` and `Works.jsx` do now), or don't interpose an object-based
  `initial`/`animate` above it.

## Working with this repo

- Prefer editing `src/constants/index.js` for copy changes.
- After any UI change, actually run it (`npm run dev`, verify in a
  browser — dark mode, light mode, and a narrow/mobile width) before
  calling it done. This project has repeatedly had bugs that were
  invisible in code review (Framer Motion propagation, timeline icon
  centering, 3D model overlapping content) and only showed up on screen.

## IMPORTANT — do not open pull requests unasked

Khalid reviews changes himself before they become a PR. **Never run
`gh pr create` (or otherwise open a PR) unless he has explicitly asked for
it in that exchange.** The normal loop is: make the change → verify it →
tell him what changed and let him look → wait. He will say when he wants a
PR opened. The same caution applies to pushing: don't push a branch he
hasn't asked you to push. Committing locally is fine and expected.

## IMPORTANT — keep the docs current

**`STATUS.md` and `LEDGER.md` must be kept up to date.** After any
non-trivial change (a feature, a fix, a content update, a design
decision), update `STATUS.md` to reflect the current state and append a
dated entry to `LEDGER.md`. This is so a session that gets disconnected
or hits a context/usage limit can resume cleanly from these files instead
of re-deriving everything from scratch. Do this without being asked again
— it's a standing instruction from the project owner.

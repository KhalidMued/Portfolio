# Ledger

A dated, append-only log of work done on this project. Add a new entry
(don't rewrite old ones) whenever something non-trivial changes. See
`STATUS.md` for the current-state summary and `CLAUDE.md` for architecture
notes and gotchas.

## 2026-09-13

**Full content + UI/UX redesign** repositioning the site around "Developer
× Network & Security Engineer" (previously dev-only).

- Rewrote `src/constants/index.js` with real content (hero copy, about
  paragraphs, 6 services, 4 skill-category groups, 3 experience entries, 3
  credentials, dev/security project lists, "by the numbers" stats) sourced
  from Khalid's CV, drafted with ChatGPT and approved by Khalid as a working
  draft ("modify some if you think it will be much better").
- Added `src/constants/categories.js` — the shared Dev/Security/Infra/AI
  color system.
- Installed `react-icons`; replaced all tech/skill/credential icons with it
  (Simple Icons + Font Awesome 6 sets, tree-shaken via named imports).
- Rewrote `Hero.jsx`, `About.jsx`, `Tech.jsx` (categorized tabs replacing
  the old 3D "ball" icon grid), `Experience.jsx` (category badges),
  `Works.jsx` (Developer/Security tabs, HASM as a large featured card,
  custom SVG cover art), `Contact.jsx` (added an intro blurb above the
  form).
- Added `Credentials.jsx` (degree + certs strip) and `Highlights.jsx` ("By
  the Numbers" stats section, replacing the empty testimonials/Feedbacks
  section — deleted `Feedbacks.jsx`).
- Added `src/components/covers/ProjectCovers.jsx` — abstract SVG project
  cover art (no real project screenshots exist yet).
- Added the `.glass-card` CSS utility (`src/index.css`) — not used yet at
  this point in the session, applied later to the About section.
- Deleted now-unused template assets: `Ball.jsx` / `BallCanvas` (the old 3D
  tech-icon balls), old placeholder images (`carrent.png`, `qrgen.png`,
  `web.png`, `backend.png`, `mobile.png`, company logo PNGs, tech PNGs).
- Updated `index.html` SEO/OG/Twitter meta and `<title>` to the new
  positioning.
- Bug fixes found during this pass (not explicitly requested, found via
  live QA in the browser): the Works section had no anchor `id` so the
  "Work" nav link never actually scrolled to it (now
  `SectionWrapper(Works, "work")`); a `card-img_hover` CSS class was
  referenced but didn't exist anywhere (replaced with real
  opacity/group-hover Tailwind classes); a Framer Motion bug where
  tab-switch content (Skills categories, Works tabs) stayed stuck at
  `opacity: 0` because an intermediate `motion.div` with object-literal
  `initial`/`animate` broke variant-label propagation to its children —
  fixed by giving those children their own explicit `initial`/`animate`.
- Verified in dark mode, light mode, ~820px, and ~390px widths via
  claude-in-chrome (local dev server + an injected same-origin iframe
  technique, since the actual browser window would not resize in this
  environment).
- Flagged to Khalid, not changed: `Contact.jsx`'s `to_email` doesn't match
  his real account email — **he said keep it as is**.

**Hero iteration** (live feedback after the redesign above):

1. Removed the long "I work across software development..." paragraph,
   kept only the tagline.
2. Fixed the 3D computer model visually overlapping/hiding the CTA
   buttons — confined the canvas to a right-hand lane
   (`min(58%, calc(100% - 600px))`) so it couldn't share horizontal space
   with the text column, plus `z-10` on the text as a safety net.
3. Per Khalid: removed the 4 CTA buttons entirely, and re-centered the
   hero as text-on-top / 3D-computer-as-full-bleed-centered-focal-point
   instead of side-by-side. Deleted the now-dead `setWorkTab`/
   `onWorkTabChange` pub-sub (`src/utils/workTab.js`) that only existed to
   let the removed buttons preset the Works section's active tab.
4. Per Khalid: tightened the top padding and inter-line gaps in the hero
   text block so there's visible clearance between the rotating tagline
   and the 3D model's top edge (they were touching).

**About section iteration**:

- Centered the "Two Sides, One Engineer" eyebrow + its two cards
  (previously left-aligned like the rest of the section).
- Added the `.glass-card` CSS (frosted, theme-aware `backdrop-filter:
  blur`) and applied it to the two "Two Sides" cards, replacing the flat
  tinted-box style.
- Added three blurred color blobs (violet/teal/pink, from `CATEGORY`)
  behind the cards — needed for the glass to have anything to visibly
  refract, and addresses Khalid's "too purply, add some fun" note (scoped
  to this section only, not site-wide).

**Experience section iteration**:

- Fixed a real bug: the timeline icon was rendering outside its circle.
  Root cause: `react-vertical-timeline-component`'s own CSS
  (`.vertical-timeline-element-icon svg`) absolutely-positions/centers a
  *direct* `<svg>` child of the `icon` prop; wrapping the icon in an
  additional flex-centering `<div>` (carried over from the old `<img>`-
  based approach used for company logos) caused double-centering that
  pushed the icon toward the circle's edge. Fix: pass the icon component
  directly, with no wrapper div.
- Per Khalid: changed the icon circle's background from the loud category
  accent color (teal/amber) to a neutral theme color
  (`rgb(var(--color-tertiary))`), with the icon itself recolored to
  `rgb(var(--color-heading))` for contrast.

**Docs**: added `CLAUDE.md`, `STATUS.md`, `LEDGER.md` at Khalid's request,
as a standing instruction to keep these current after every change so a
disconnected/context-limited session can resume cleanly.

**About section iteration (card sizing)**:

- Fixed the two "Two Sides" cards being visibly different sizes: switched
  their container from `flex flex-wrap` to a `grid grid-cols-1 sm:grid-cols-2`
  with `items-stretch`, and simplified `SideColumn` to `h-full` instead of
  `flex-1 min-w/max-w` — grid guarantees identical column width and
  row-stretched height instead of leaving it to content-driven flex sizing.
- Fixed the 6 service cards below it being different sizes depending on
  description length: gave the card's inner box a fixed `h-[250px]` (was
  `min-h-[220px]`) and added `line-clamp-3` to the description paragraph so
  longer copy truncates with an ellipsis instead of growing the card. Verified
  the native Tailwind 3.3 `line-clamp` utility renders correctly (no plugin
  needed) and confirmed the ellipsis shows up in both themes.
- Khalid flagged that `line-clamp-3` was cutting off real content on several
  cards (some descriptions run ~150 chars, needing ~4-5 lines at this card
  width). Bumped the card to `h-[300px]` and the clamp to `line-clamp-6`
  (tall enough that none of the current 6 descriptions truncate; the clamp
  is now just a safety net for future, much-longer copy). Verified all 6
  show full text and remain identical size in both dark and light mode.

**Credentials section**: added a title ("Recognition" eyebrow +
"Certificates & Achievements." heading) above the credential pills — it
previously rendered as an untitled strip between Experience and Skills.
Uses the same `sectionSubText`/`sectionHeadText` pattern as every other
section for consistency.

**Works section — Developer tab layout**: per Khalid, all 3 Developer
projects (HASM, Homelab Control Center, Rasheeg AI Assistant) now render
as wide horizontal cards — previously only HASM (the one flagged
`featured: true`) got that treatment; the other two sat in the small
vertical-card grid. Refactored `ProjectCard` in `Works.jsx` to take a
`horizontal` prop separate from `featured`: `featured` now only controls
whether the "Featured" badge pill shows, `horizontal` controls the
layout. The Developer tab passes `horizontal` to every card; the
Security tab kept the old mixed behavior at this point (see next entry —
changed again a moment later).

**Works section — Security tab layout too**: Khalid asked for the same
treatment on the Network & Security tab. Since both tabs now always want
every card horizontal, removed the now-dead mixed-layout branch entirely
instead of just toggling it on for both: `ProjectCard` no longer has a
`horizontal` prop or a vertical/grid code path at all — it only renders
the wide horizontal layout. `Works` now just maps every project in the
active tab through `ProjectCard`, no `featured`/`rest` split for layout
purposes (`featured` is still read by `ProjectCard` itself, only to draw
the "Featured" badge on HASM). If a compact grid card style is ever
wanted again, it needs to be reintroduced from scratch — it's not lurking
unused anywhere.

**Global starfield background**: Khalid wanted the animated stars
background (previously scoped to just the Contact section, via a
`position: absolute` div sized to Contact's own box) to appear behind the
whole page, except the hero (the section with the moving 3D computer).
Changed `StarsCanvas`'s wrapper (`src/components/canvas/Stars.jsx`) from
`absolute` to `fixed`, and moved it out of Contact's local wrapper to
render once near the top of `App.jsx`, as a sibling of `Navbar`/`Hero`/
etc. — removed the now-unnecessary `<div className='relative z-0'>`
wrapper that used to exist just to give it a sized ancestor.
No conditional logic was needed to exclude Hero: because the star layer
sits at `z-[-1]` and Hero's own `.bg-hero-pattern` wrapper has a fully
opaque background (image in dark mode, gradient in light mode) that
paints at the normal in-flow stacking step (above any negative z-index
sibling in the same context — the same mechanism `.page-depth::before`
already relied on), Hero's backdrop simply covers the stars wherever it
sits, on every scroll position. Verified: stars animate visibly behind
About/Experience/Skills/etc. in both themes, and are completely absent
behind Hero in both themes.

**Starfield speed**: Khalid found the rotation too fast. Slowed the
`useFrame` rotation increments in `Stars.jsx` from `delta / 10` (x) and
`delta / 15` (y) to `delta / 40` and `delta / 60` — a 4x slowdown, calm
drift instead of a fast spin.

**Light theme full repaint**: Khalid said he didn't like the light mode
color scheme as a whole and wanted it more premium, with colors that
"match and blend correctly." Diagnosed the actual problem: every
"neutral" token in the light theme (`--color-primary`, `--color-secondary`,
`--color-black-100/200`, `--color-heading`, `--color-hero-subtext`) was
lavender/violet-tinted (`#f4f4fb`, `#eceafc`, `#e4e1f5`, `#1a1730`,
`#4a4762`, `#4b4470`), and several hardcoded shadow/border colors in
`index.css` reused that same violet-navy (`rgba(26,23,48,x)`) — so the
whole page read as washed in one color rather than a clean neutral canvas
with the brand accents (`CATEGORY`'s violet/teal/amber/pink) standing out
on top of it.

Fix, all in `src/index.css` unless noted:
- `:root` tokens repainted to a true neutral cool-gray scale: primary
  `#f8f9fb`, secondary `#5a606a`, black-100 `#f0f1f4`, black-200
  `#e7e9ed`, heading/white-100 `#0f1218` (ink, not violet-navy),
  hero-subtext `#3a3f49`. `--color-tertiary` (`#ffffff`) was already
  neutral, left as-is.
- Every hardcoded `rgba(26, 23, 48, x)` shadow/border tint (navbar
  border, glass-card shadow, surface-elevate shadow/border, black-gradient
  shadow) switched to `rgba(15, 18, 24, x)` — same technique (a
  colored-not-pure-black shadow), now tinted toward the new neutral ink
  instead of violet.
- `.black-gradient`'s light-mode gradient stop `#f4f2fb` → `#f1f2f4`.
- `.page-depth::before`'s ambient wash: was a single violet glow
  (`rgba(145,94,255,.1/.08)`); changed to a much more restrained two-tone
  violet+teal glow (`.06`/`.05` opacity) — the same Dev/Security accent
  pair used everywhere else, so the one deliberate splash of color on the
  page ties back to the site's actual color system instead of introducing
  an unrelated lavender wash.
- Hero's light-mode background gradient (`.bg-hero-pattern`) and its
  bottom hand-off (`.hero-transition`'s second radial-gradient) both
  updated from the old lavender two-stop (`#efe9fb`/`#f8f6fd`) to a
  neutral cool-gray two-stop (`#eef0f4`/`#f8f9fb`) so there's still no
  seam where Hero's own background meets the page's new `--color-primary`
  (the two tones are deliberately close, per the existing "SAME tone, no
  seam" comment already in that CSS). `.hero-transition`'s ambient violet
  glow (a deliberately branded accent in that one transition zone, not a
  "neutral" token) was left as a violet glow, just slightly restrained
  (`.12/.06` → `.10/.05` opacity).
- `Experience.jsx`'s light-mode `contentStyle` hardcode (`color: '#1a1730'`,
  shadow `rgba(26,23,48,.15)`) updated to match (`#0f1218`,
  `rgba(15,18,24,.12)`).

Deliberately did NOT touch `CATEGORY`'s accent colors (violet `#915eff`,
teal `#00cea8`, amber `#f5a623`, pink `#ec4899`) — those are shared
between light and dark mode via plain JS/inline styles, dark mode wasn't
part of this complaint, and the whole point of the fix is that those
colors should now read as intentional color against a clean neutral
canvas rather than being just another tinted element among many.

Verified by scrolling the entire page in light mode: Hero, About (bio +
Two Sides cards + 6 service cards), Experience timeline, Skills, Works
(both tabs), Highlights, Contact — all read as a cohesive neutral-with-
accent design now, no more pervasive lavender wash.

**Light theme, round 2 — warmer + Hero unified with the page**: Khalid
still didn't love the neutral cool-gray result and asked for two more
things: (1) Hero should be "the same color as the remaining page," and
(2) the whole thing should be "a bit warmer," with cards "more warm than
the remaining of the page."

- Repainted `:root` again, shifting the entire cool-gray scale to a warm
  one: primary `#f7f5f1`, secondary `#6b645c`, tertiary (cards) `#fffbf4`,
  black-100/200 `#f1ede7`/`#e8e3db`, heading/white-100 `#1a1612`,
  hero-subtext `#4a443d`. Cards (`tertiary`) are deliberately both
  *brighter and warmer* than the page (`primary`) — that contrast is what
  makes them read as raised surfaces, on top of the existing box-shadow.
  Updated every hardcoded ink shadow/border (`rgba(15,18,24,x)` →
  `rgba(26,22,18,x)`) and `.black-gradient`'s gradient stops to match, plus
  `Experience.jsx`'s hardcoded light-mode card color/shadow.
- Made `.bg-hero-pattern`'s own background a flat `background-color:
  rgb(var(--color-primary))` (previously its own two-stop gradient,
  distinct from the page) — Hero is no longer a visually separate "zone."
  The starfield image overlay and its contrast scrim are unchanged, just
  the plain color underneath them.
- Found and fixed a real, visible seam while checking this: with
  `.page-depth::before`'s wash still `position: absolute` (sized to the
  *entire scrollable page*, not the viewport), its percentage-based
  gradient stops (`18%`, `45%`) were fixed pixel positions on the full
  page that happened to land almost exactly at the Hero/About boundary —
  producing a visible cooler-toned band right at the seam. Diagnosed by
  toggling `.page-depth::before { display: none }` via injected CSS in
  the live page and confirming the band disappeared. Fixed by switching
  it to `position: fixed` (viewport-relative, like the starfield
  background) so its two glows always sit near the current viewport's
  corners instead of anchoring to an arbitrary point in a potentially
  very tall page.
- That fix alone didn't fully close the seam — `.hero-transition` (a
  dedicated DOM element for the old "premium hero → About hand-off,"
  overlaying its own ambient violet glow on Hero's last ~170-210px) was
  layering an *additional* violet glow on top of the now-viewport-fixed
  page-depth wash, and its glow stopped exactly at Hero's bottom edge —
  still a visible edge, just softer. Verified by disabling `.hero-transition`
  the same way and confirming the seam vanished completely. Since Hero's
  background no longer has a distinct tone to "hand off" from (see above),
  `.hero-transition` had no remaining purpose — removed it entirely: the
  CSS rule from `index.css` and its `<div className="hero-transition" />`
  from `App.jsx`.
- Verified in both themes: light mode now has zero visible seam scrolling
  from Hero into About (checked via a pixel-region zoom screenshot at the
  boundary, before and after each fix), and dark mode is byte-for-byte
  unaffected (`.hero-transition` only ever existed for light mode; removing
  it changes nothing there).

**Contact Earth model clipped on the sides**: Khalid noticed the moving
Earth (in `Earth.jsx`, Contact section) wasn't showing as a full circle —
clipped horizontally. Root cause: the Contact layout's Earth canvas
container is width-constrained but stretches to match the contact form's
(tall) height, especially at `xl:` widths where the two sit side-by-side —
giving the canvas a *narrow/tall* aspect ratio. With a fixed vertical FOV
(45°) and the model's `scale={2.5}`, the object's radius exceeded what
was visible *horizontally* at that aspect ratio, even though it fit fine
vertically — hence "cut off on the sides" specifically. Confirmed via
`getBoundingClientRect()` on the actual canvas element to get its real
pixel aspect ratio, then the math checked out. Fix: reduced `scale` from
`2.5` to `1.8` in `Earth.jsx` — camera/FOV/position left untouched. Now
fits with comfortable margin on all sides at both the `xl` two-column
layout (narrowest aspect ratio, worst case) and the stacked mobile layout
(checked via the injected-iframe technique).

**Hero background vs page background mismatch (both themes)**: Khalid
reported the hero read as a different background colour from the rest of
the page, in light AND dark. Rather than guess at hex values, measured the
real thing: fetched `herobg.png`, decoded it with `createImageBitmap`, drew
it into a 2D canvas (once raw, once with `ctx.filter` set to the exact CSS
filter chain light mode uses — canvas 2D accepts the same filter syntax, so
the readback is what the browser actually paints) and sampled pixels. That
gave three findings:

1. **Dark mode's field colour was never wrong** — the image's dominant
   colour is exactly `rgb(5,8,22)` = `#050816` = `--color-primary`. What
   looked like a colour mismatch was the *art*: the image is ~50% faint
   violet line work, so its average tone sits a touch lighter than the
   flat page colour, and it was cut off dead straight at the hero's bottom
   edge. Confirmed by injecting `background-image: none` into the live page
   — the seam vanished. Fixed by giving dark mode the same masked
   `::before` layer light mode already had (fades out by 75% of the hero's
   height) instead of painting the image on the element's own background.
   It had to move to `::before` because a `background-image` on the element
   itself can't be masked without also masking the hero's content.
2. **Light mode's field colour genuinely was wrong**: inverting `#050816`
   and rotating it 180deg lands on `#f5f6f6`, a *cool* near-white, against
   the page's *warm* `#f7f5f1`. Grid-searched `sepia`/`brightness`/
   `contrast` combinations against the measured target and landed on
   `invert(1) hue-rotate(180deg) saturate(1.3) sepia(0.15) contrast(0.93)`
   → `#f6f5f2`, within ~1/255 per channel of `--color-primary`, with the
   line art still comfortably violet (checked by running sample art pixels
   through both the old and new chains).
3. **The hero's opaque background was hiding the global ambient layers.**
   Every other section shows the viewport-fixed `.page-depth::before` wash
   through it; the hero's opaque base blocked it, so the two never quite
   matched even with the colours right. Fixed by making `.bg-hero-pattern`
   transparent — but only in light mode. Dark mode keeps an opaque base on
   purpose: that's the mechanism that keeps the global starfield out of the
   hero (Khalid asked for stars everywhere *except* the hero), and dark
   mode has no wash to block anyway (`.dark .page-depth::before` is
   `content: none`), so nothing is lost.

Also dropped the now-dead `bg-cover bg-no-repeat bg-center` classes from
the hero wrapper in `App.jsx` — the element no longer carries a background
image, those live on `::before` now. Verified both themes at the boundary
with pixel-region zoom screenshots: no step in either.

**Hero scroll indicator overlapping the 3D desk**: Khalid asked to move
the scroll-down indicator "down a tiny bit" so it stops overlapping the
computer. Moving alone couldn't fix it: the desk occupies the bottom of
the hero and leaves a clear band of only ~7% of the hero's height (~57px
on an 847px-tall viewport), while the indicator needed 104px (64px tall
plus a 40px `bottom-10` offset). So it also had to shrink to fit the band:
`w-[35px] h-[64px]` → `w-[26px] h-[36px]`, `border-4` → `border-[3px]`,
dot `w-3 h-3` → `w-1.5 h-1.5`, travel `[0,24,0]` → `[0,12,0]`, offset
`xs:bottom-10` → `xs:bottom-2`. Total footprint 44px, which still clears
the desk on viewports down to roughly 650px tall. Mobile's `bottom-32`
was left alone (the model sits differently there and it wasn't colliding).

Tooling note for future sessions: the `computer` tool's `zoom` action
changes Chrome's **page zoom**, and Chrome persists zoom per origin — so
after using it once on `localhost:5173`, every later screenshot of that
origin came back cropped/rescaled (dpr 2, viewport reported as 960x423
instead of 1920x847), which made visual measurement useless and cost a lot
of back-and-forth. Two things that fixed it: prefer plain `screenshot`
over `zoom`, and if the zoom is already stuck, serve the dev server on a
different origin (`npm run dev -- --host 127.0.0.1`, then browse
`http://127.0.0.1:5173`) to get a fresh origin at 100% zoom.

**Hero scroll indicator: dead click area + bigger oval wheel**: Khalid
reported the scroll-down button only responded along its top edge, and
asked for the moving dot inside it to be larger and oval.

The click bug was NOT in the button. Probed it with
`document.elementFromPoint` across the pill: the top ~5% hit the anchor,
everything below hit `span.hash-span`. That's the invisible scroll-anchor
offset spacer `SectionWrapper` renders for every section
(`margin-top:-100px; padding-bottom:100px`) — a ~124px-tall box pulled up
100px into the *previous* section. Because every SectionWrapper section is
`relative z-0` (its own stacking context, painted above earlier siblings),
that spacer sat on top of the last ~100px of whatever preceded it. The
hero's indicator lives in exactly that band, so all but its top sliver was
dead. Note this was a pre-existing, site-wide dead zone — the bottom
~100px of every section — that only became obvious once the indicator was
moved down in PR #9.

Fixed at the root: `pointer-events: none` on `.hash-span` in `index.css`.
It's an empty spacer; it should never be a hit-test target. Verified with
a 15-point probe grid across the pill (was 1/5 clickable, now 15/15) and
by actually clicking the pill's lower half — the URL went to `#about`.

Also, per the request: the dot is now `w-[5px] h-[9px]` (a vertical
capsule rather than a 6px circle) with travel retuned to `[0, 11, 0]` for
the 22px inner track, and `mb-1` dropped. And the anchor got `block p-2`,
which grows the tap target from 26x36 to 42x52 without moving the pill —
the wrapper offset went `xs:bottom-2` → `xs:bottom-0` to compensate, so
the pill still sits 8px above the hero's bottom edge exactly as before.

## 2026-09-14

**The last of the Hero/About seam (light mode, left side only)**: Khalid
spotted what the previous two seam fixes had missed and diagnosed it
himself — *"on the right section of the page there is a light green-ish
color that breaks the color difference with the top section, but its not
on the left side, that's why on the left side I see a line of color
difference"*. That asymmetry was the whole clue.

The culprit was `.bg-hero-pattern::after`, the hero's contrast scrim:
`radial-gradient(circle at 22% 38%, rgba(255,251,244,0.75),
rgba(255,251,244,0) 60%)`. Two properties of it combined:

- Its centre sits at **22% across**, so it's bright on the left and has
  already faded to zero by the right-hand side of the page.
- Unlike the `::before` starfield layer, it carried **no mask**, so it was
  still painting at full local strength on the hero's very last pixel row
  and then stopped dead — the section below has no equivalent layer.

So the hero's bottom-left was ~0.5 alpha of warm ivory over the page
colour and the section below it was the bare page colour: a hard step. On
the right the scrim was already at zero, so both sides matched and no line
appeared — which also explains why the teal half of `.page-depth`'s
ambient wash (Khalid's "light green-ish color") seemed to be "fixing" that
side. It wasn't; there was simply nothing to fix there.

Confirmed before changing anything by injecting
`.bg-hero-pattern::after { content: none !important }` into the live page
— the left-hand line vanished.

Fix: moved the `mask-image` / `-webkit-mask-image`
(`linear-gradient(to bottom, black 0%, black 55%, transparent 75%)`) out
of the `::before`-only block and up into the shared
`.bg-hero-pattern::before, .bg-hero-pattern::after` rule, so **both**
decorative hero layers dissolve well before the hero's bottom edge. Added
a comment there stating the invariant, since this is the third seam caused
by the same class of mistake: anything painted in the hero that survives
to its last pixel row will read as a horizontal seam, because the next
section has no counterpart layer.

Verified at the boundary in light mode (hero bottom parked at 400px and
again at 260px into the viewport — no step on the left) and in dark mode
(where `::after` is `content: none` anyway). `npx eslint src --ext js,jsx`
clean, `npm run build` green.

**Navbar logo wrapped onto two lines**: at anything under ~1000px the
logo rendered as "Khalid|  Developer ×" / "Security" — two lines, with the
pipe glued straight onto "Khalid" and no gap.

Two causes in the same element. The `<p>` was `display:flex`, holding a
bare text node (`Khalid &nbsp;`) plus a `<span>` (` | &nbsp; Developer ×
Security `). Flex made each an anonymous flex item, and flex items have
their leading/trailing collapsible whitespace trimmed — so the space
before the `|` disappeared while the `&nbsp;` after it survived, which is
the lopsided "Khalid|  Developer" spacing. Separately, the span was the
only thing in the bar that could shrink, so once the logo + five nav links
+ theme toggle stopped fitting, it wrapped internally rather than the bar
overflowing.

Measured the real widths in the page before changing anything: nav content
row is `max-w-7xl` (1280px) inside `sm:px-16` (128px of padding), the logo
`<Link>` is 318px with the full text and 104px without it, and the nav
links + toggle are 549px at `gap-10` / 485px at `gap-6`.

Fix, in `Navbar.jsx`:
- Logo is now three spans in a `flex items-center gap-2 whitespace-nowrap`
  paragraph, so spacing is symmetric and it can never wrap. The pipe got
  `text-secondary font-normal` so it reads as a separator rather than part
  of the name.
- The `| Developer × Security` suffix is `hidden lg:inline` — shown from
  1024px, where it fits with 80px of clearance.
- Desktop nav row moved `sm:` → `md:` and the mobile block `sm:hidden` →
  `md:hidden`, and the link list is now `gap-6 xl:gap-10`. This closes a
  **pre-existing** overflow band (640–~690px, where the five links simply
  did not fit) that the wrapping logo had been absorbing.

Verified by loading the site into a same-origin iframe and sweeping its
width — media queries evaluate against the iframe's width, so this checks
real breakpoint behaviour without resizing the browser window. Across
320 / 360 / 420 / 500 / 600 / 640 / 700 / 767 / 768 / 800 / 860 / 900 /
960 / 1000 / 1024 / 1100 / 1280 / 1440 / 1920: logo is one line at every
width, no nav overflow and no document overflow at any width, hamburger
below 768 and the desktop row at/above it, suffix present at/above 1024.
Also eyeballed in dark mode. `npx eslint src --ext js,jsx` clean,
`npm run build` green.

One tradeoff to be aware of: Khalid's own browser viewport is ~960 CSS px
(200% Windows display scaling on a 1920px screen), which is below the
1024 cutoff — so on *his* screen the logo now reads just "Khalid". Forcing
the suffix on at 960px was measured too: it fits, but leaves only 16px
between the logo and the "About" link, which is why the cutoff is 1024
rather than something lower.

**Light-mode starfield was almost invisible**: Khalid — *"now the
background start motion on the dark mode is perfect keep it as it. but on
the light mode, its almost unvisible fix that"*.

`Stars.jsx` was theme-aware for colour only (`#915eff` light / `#f272c8`
dark) and drew both at `size={0.002}`. That size is the real problem, not
the colour: at sub-pixel size a *bright* dot on a dark field still reads
as a glowing point, but the same dot on a near-white page gets averaged
into the background and disappears. Contrast was never the issue —
`#915eff` on the `#f7f5f1` page is already ~3.9:1.

Light mode now gets a deeper violet (`#6d28d9`), a 1.75x larger point
(`0.0035`) and `opacity 0.9`. Dark mode's branch is byte-equivalent to
before: same `#f272c8`, same `0.002`, and the newly-explicit `opacity 1`
is exactly what `PointMaterial` defaulted to.

Verified by capturing the same background region (Work Experience, plain
backdrop) at native resolution with the old values and the new ones: the
"before" frame has perhaps three perceptible dots in a 600x300 region,
the "after" frame reads as an actual starfield. Dark mode re-checked
after the change and is unchanged. `npx eslint src --ext js,jsx` clean,
`npm run build` green.

Worth knowing for next time: the light starfield now reads slightly
bolder than the dark one rather than matching its delicacy. That was a
deliberate bias toward "clearly visible" given the complaint — if it
looks too busy, drop `size` to `0.003` and `opacity` to `0.75` rather
than touching the colour.

**Light-mode starfield, second pass** — Khalid on the first pass: *"make
it match the dark mode delicacy, less busy and its too purpuly try to
have so diversity in color like the one on the dark mode it seems like
actual stars in the outer space"*.

The first pass had only made the dots bigger and deeper, which fixed
visibility but left a field of ~1700 identical violet dots at identical
weight — uniform, and the only hue on the page. Dark mode doesn't look
like that because a bright dot on a dark field varies naturally with
sub-pixel coverage; it reads as depth for free.

So light mode now carries *per-point* colour: `Points` gets a `colors`
buffer attribute (drei's `PointsBuffer` attaches it as `attributes-color`)
and `PointMaterial` gets `vertexColors`, with `color` left white so it
acts as a neutral multiplier. Each point draws from a weighted palette —
44% warm ink `#2f2a24`, then 14% each of `#6d28d9` / `#0d9488` /
`#b45309` / `#be185d` (deepened dev / security / infra / AI accents; the
CATEGORY values themselves are tuned for dark surfaces and wash out on
the warm page). The ink is deliberately the plain majority: it plays the
role "white" plays in a real starfield, with the tinted ones sprinkled
through.

Brightness is bimodal rather than a smooth ramp: ~40% of points sit crisp
(0–12% faded toward the page colour) and ~60% sit back at 35–65% faded.
That is what answers both "less busy" and "more delicate" at once — about
40% fewer prominent dots than the flat field, with the faint majority
providing depth instead of evenly-spaced confetti.

Dark mode's branch is untouched: `#f272c8`, `size 0.002`, `vertexColors`
false.

Three things worth remembering, all now commented in the file:

1. **Don't fade with `THREE.Color.lerp`.** `THREE.Color` holds
   linear-light values once colour management converts the hex, and
   lerping there toward a near-white background collapses almost
   immediately — a 50% linear mix is visually ~75% of the way to white.
   The first attempt at this did exactly that and made the whole field
   disappear. Mixing the gamma-encoded bytes and re-parsing the hex keeps
   `fade` meaning what it looks like it means.
2. **The material needs a `key` on the theme.** `vertexColors` is a
   shader-define; flipping it on a live material needs a recompile.
3. **The positions were being regenerated every render.** `random.inSphere`
   ran in the render body, so a theme toggle visibly reshuffled every
   star — and would have unpaired the colours from the positions. Both
   arrays are `useMemo`'d now.

Verification note, honestly: this pass could NOT be checked with the
browser tools. The Chrome window holding the automation tab was in the
background, so `requestAnimationFrame` never fires and React Three Fiber
never renders or even sizes its canvases (they sit at the 300x150
default, `document.visibilityState === "hidden"`). Every screenshot taken
during this pass was a stale or blank frame — proven by setting every
star to full strength and still screenshotting an empty page. The values
were reasoned from the first pass's known-good baseline instead, and
**Khalid confirmed the result by eye** before this was committed.
`npx eslint src --ext js,jsx` clean, `npm run build` green.

**PR #10 merged.** Squashed onto `main` as `abe5b62` — hero scroll-button
hitbox, hero/About seam, navbar logo, and both light-mode starfield
passes, plus the `CLAUDE.md` no-unasked-PRs instruction. Local branch
`fix/hero-scroll-indicator-hitbox` deleted; `main` pulled and clean.

Process note for next time: that branch ended up carrying six commits
across four unrelated fixes, because the review pass kept landing on the
branch that started as just the scroll-indicator fix. The repo's rhythm
is one PR per change — cut a fresh branch off `origin/main` per topic.

**Branch cleanup.** Deleted six merged branches — remote
`fix/hero-scroll-indicator-hitbox`, `cleanup/safe-tidy`,
`fix/remove-redirects-loop`; local `cleanup/safe-tidy`,
`feature/audit-cleanup`, `fix/hero-scroll-indicator`. `main` is now the
only branch on either side.

Each was verified merged before deleting, which is less obvious than it
sounds in a squash-merge repo: `git log origin/main..<branch>` shows
commits for *every* branch here, merged or not, because the squash lands
under a different SHA. `git cherry -v main <branch>` marks a commit `-`
when an equivalent patch is already in `main`, which cleared five of
them. #10's own branch read all `+` (six commits squashed into one), so
the tree was compared instead — `git diff --stat
origin/fix/hero-scroll-indicator-hitbox main` was empty, proving the
squash captured everything. One commit on `fix/hero-scroll-indicator`
read `+` as well (the CLAUDE.md no-unasked-PRs instruction); confirmed
present in `main:CLAUDE.md` before deleting.

**Contact form was dead; replaced EmailJS with a Cloudflare Worker +
Resend.** Khalid: *"lets find why the contact form is not working also if
there is a better tech way to do it the emailjs i'm open for it"*, and he
reported an error toast on submit.

Diagnosis, by probing the EmailJS REST API from the page with one
credential swapped out at a time — each of those fails validation before
anything is delivered, so nothing was sent:

| Probe | Result |
| --- | --- |
| real key + real service + bogus template | `400 The template ID not found` |
| real key + bogus service + real template | `400 The service ID not found` |
| bogus key + real service + real template | `400 The Public Key is invalid` |

The bogus-template case getting *past* the key and service checks proved
both were valid, so the credentials in the bundle were fine. With his
go-ahead, one real send gave the actual answer:

    HTTP 412 — Gmail_API: Invalid grant. Please reconnect your Gmail account

The EmailJS service's Gmail OAuth refresh token had been revoked. Nothing
in the repo was wrong. Reconnecting Gmail in the dashboard would have
fixed it for a while and then broken again the same way, which is why he
chose to move off it.

**What replaced it** (`worker/index.js`, wired up in `wrangler.jsonc`):
`POST /api/contact` on the site's own origin. The Resend API key is a
Worker secret, so nothing about mail delivery is in the client bundle any
more. The Worker re-validates every field (the form's `maxLength` values
are a suggestion, not a limit), caps the body at 16 kB, checks the
honeypot, rate-limits per IP, and returns a generic message on failure
while logging the real upstream error server-side.

Config details worth remembering:

- `not_found_handling: "single-page-application"` would have answered
  `/api/contact` with `index.html` and the Worker would never have run.
  `assets.run_worker_first: ["/api/*"]` is what routes API paths to the
  Worker while page requests still go straight to the asset server.
- The rate limiter's `namespace_id` is a per-Worker label, not an account
  resource — there's nothing to create in the dashboard for it.
- The honeypot is *sent* to the Worker rather than short-circuited in the
  browser, so the decision lives in the one place a visitor can't edit.
  A flagged submission gets a plain `200` and no mail, so a bot learns
  nothing from the response.
- `CONTACT_TO_EMAIL` had to change from the old `khalid.mued@gmail.com` to
  `khalidmueddev@gmail.com`: Resend only delivers to the address its own
  account is registered under until a sending domain is verified. Khalid
  had previously said to leave the old address alone, so this is a
  deliberate reversal with a reason, not a re-fix of settled ground.

Verified against `wrangler dev` on `:8787` (which serves the built site
and the Worker together, so it's the closest thing to production):
`wrangler deploy --dry-run` shows all four bindings resolving; wrong
method → 405; empty / partial / non-JSON / array bodies → 400; bad email
→ 400; over-length field → 400; 20 kB body → 413; honeypot filled → 200
with no Resend call (confirmed against the request log); sixth request in
a minute → 429. A valid submission with a deliberately dummy key returns
`502 {"error":"Something went wrong. Please try again."}` to the client
while the log holds the real `401 API key is invalid` — exactly the split
that was wanted. Driven through the actual form in the browser too: the
Worker's message reached the toast and the button reset.

Not verified: a successful send. That needs a real Resend key, which only
Khalid can create. `npx eslint src worker --ext js,jsx` clean,
`npm run build` green.

Also found along the way: **`khalidmued.com` has no DNS records** — the
zone exists but the apex has no A/AAAA/CNAME and `www` doesn't exist, so
the `canonical` and `og:url` in `index.html` point at a host that doesn't
resolve. Left alone, recorded in STATUS.md.


**Contact form destination: `khalidmueddev@gmail.com`**, and
`RESEND_API_KEY` is set as a Worker secret (Khalid set it; it is not in
the repo). The destination has to be the address the Resend account
itself is registered under for as long as the shared
`onboarding@resend.dev` sender is in use — Resend rejects any other
recipient with a 403. Khalid first asked for `khalid.mued@gmail.com` (the
old EmailJS destination), then mentioned the Resend account is registered
under `khalidmueddev@gmail.com`, which made the first choice
undeliverable; given the options he chose to point the endpoint at the
Resend address. Verifying a sending domain in Resend is what would free
this to be any address.

Worth noting these are genuinely two mailboxes: Gmail ignores dots, so
`khalid.mued@gmail.com` is the same inbox as `khalidmued@gmail.com`, but
the `dev` suffix makes the Resend account a separate account.

**End-to-end verified with a real key.** Khalid put his Resend key in a
local `.dev.vars` and two real sends went through `wrangler dev`: a direct
POST to `/api/contact` returned `200 {"ok":true}` with a clean log, and a
submission driven through the actual form UI produced the success toast,
reset the button and cleared all three fields. That closes the one path
that had never been exercised.

Two operational notes from that session. First, `.dev.vars` must be
`RESEND_API_KEY=re_...` — it was saved as the bare key with no variable
name, which wrangler treats as a variable named after the key with an
empty value. Second, and the reason that key needs rotating: an
inspection command written to print only the variable name and the
value's length printed the whole line instead, precisely because the file
had no `=` in it. Don't `cat`, `awk` or `grep` a secrets file on the
assumption it is well-formed — check its shape first, or don't read it.

**Deployed, and PR #12 opened.** `npx wrangler deploy` put the Worker
live at https://portfolio.khalid-mued.workers.dev (version
`0e1f9e83-bd19-4504-b0ba-b32083604fea`). `wrangler secret list` confirms
`RESEND_API_KEY` is present on the deployed Worker. Note this deployed
from the feature branch, so production ran ahead of `main` until #12
merged.

Verified against production, not just locally: `/api/contact` actually
reaches the Worker rather than being swallowed by the SPA fallback — bad
email returns 400, a filled honeypot returns 200 with no send, and GET
returns 405. Then a real submission through the live form produced the
success toast, reset the button and cleared the fields. That is the
`run_worker_first` routing proving itself in the only environment where
it matters.

Outstanding: rotate the Resend API key (see STATUS.md). Also still true —
`khalidmued.com` has no DNS records, so the canonical/og URLs in
`index.html` point at a host that doesn't resolve while the site actually
lives on the workers.dev subdomain.

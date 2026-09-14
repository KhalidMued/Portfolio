# Status

Last updated: 2026-09-14

## Where things stand

The portfolio has been fully repositioned around "Developer × Network &
Security Engineer" — real content from Khalid's CV (drafted with ChatGPT,
approved by Khalid) has replaced all of the original template placeholder
content, and the UI was redesigned section-by-section to make the two-sided
positioning obvious, then iteratively polished based on Khalid's visual
feedback while looking at the live site.

**We are currently paused mid-review**, going section by section through the
live site for visual/UX feedback. Sections reviewed and fixed so far: Hero,
About ("Two Sides" block + the 6 service cards), Experience (timeline
icons), Navbar (logo wrap / responsive breakpoints). Nothing is known to be
broken right now. The next step is whichever section Khalid raises next —
Skills, Works, Highlights, Contact and Credentials haven't had a dedicated
feedback pass yet.

## Content status

Real content is in place (see `src/constants/index.js`), but Khalid said
after the initial content pass: *"we'll work and finalize the core
information about me"* — so treat current copy (bio, experience bullets,
project descriptions) as **populated but not necessarily final**. Don't
assume it's locked in.

Known gaps:
- No project GitHub/live links yet. `ProjectCard` in `Works.jsx` supports an
  optional `source_code_Link` (shows a hover GitHub icon only if present) —
  currently omitted for every project. Ask Khalid for links when he's ready.
- Contact form destination is `CONTACT_TO_EMAIL` in `wrangler.jsonc` =
  `khalidmueddev@gmail.com`, which is the address Khalid's Resend account
  is registered under. **It has to stay that** while the shared
  `onboarding@resend.dev` sender is in use: Resend rejects any other
  recipient with a 403. Khalid initially asked for `khalid.mued@gmail.com`
  (the old EmailJS destination, and a different mailbox — Gmail ignores
  dots, so that one is the same as `khalidmued@gmail.com`, but the `dev`
  suffix makes the Resend account a separate account); he chose to point
  at the Resend address instead once the constraint was clear. Verifying a
  sending domain in Resend is what frees this to be any address.
- `RESEND_API_KEY` has been set as a Worker secret by Khalid. It is NOT in
  the repo and never should be.
- Feedbacks/testimonials were intentionally replaced with a "By the Numbers"
  stats section (`Highlights.jsx`) since there were no real testimonials.
  `testimonials` is still exported (empty array) from constants in case real
  quotes show up later.

## Design system in place

- Two-sided color system: `CATEGORY.dev` (violet), `.security` (teal),
  `.infra` (amber), `.ai` (pink) — defined in `src/constants/categories.js`,
  used everywhere (Tech tabs, Experience badges, Works tabs, Credentials,
  Highlights, About callout). Reuse this palette rather than inventing new
  colors for future sections.
- `.glass-card` utility (in `src/index.css`) — frosted glass card style,
  theme-aware, currently used only by the About "Two Sides" cards.
- Light theme is a warm neutral scale (page bg `#f7f5f1`, warm-ivory cards
  `#fffbf4` — deliberately brighter and warmer than the page — warm ink
  text `#1a1612`) — NOT lavender-tinted, and no longer the cool-gray of the
  first pass either. Any new hardcoded light-mode color should stay in that
  warm neutral family; let `CATEGORY`'s
  violet/teal/amber/pink be the only color, used on purpose (badges,
  buttons, category-tinted borders/glows), not baked into "neutral" tokens.
- Custom inline-SVG project cover art
  (`src/components/covers/ProjectCovers.jsx`) standing in for real
  screenshots.
- react-icons (`si` + `fa6` sets) for all tech/skill/credential icons — the
  old 3D "tech ball" icons (`Ball.jsx`, `BallCanvas`) were removed entirely
  since they don't scale to this many skills across categories.

## Fixes made during the review pass (see LEDGER.md for full detail)

1. Hero: removed the long intro paragraph, kept only the tagline.
2. Hero: fixed the 3D computer model overlapping the CTA buttons — then the
   buttons were removed entirely per Khalid's request, and the computer was
   centered as the hero's main visual instead.
3. Hero: added breathing room between the rotating tagline and the 3D
   model's top edge.
4. About: centered the "Two Sides, One Engineer" block, restyled its two
   cards as frosted glass with colorful blurred accents behind them
   (addresses Khalid's "too purply, add some fun" feedback — scoped to this
   section only, not site-wide yet).
5. Experience: fixed a real bug where the timeline icon rendered outside
   its circle (a flex-centering wrapper was double-centering against the
   timeline library's own CSS hack for direct `<svg>` children — see
   `CLAUDE.md`). Also changed the icon circle from a category accent color
   to a neutral theme-matched color per Khalid's request.
6. Also fixed along the way (found during QA, not explicitly requested): a
   Framer Motion variant-propagation bug that left Skills-tab and Works-tab
   content stuck invisible after switching tabs; a missing anchor id that
   made the "Work" nav link not actually scroll anywhere.
7. About: the two "Two Sides" cards and the 6 service cards below them now
   have fixed, uniform sizes regardless of content length (grid with
   `items-stretch` for the two-sides pair; fixed height on the six service
   cards) — they were previously sized by their own content and ended up
   visibly mismatched. First pass used `h-[250px]` + `line-clamp-3`, but
   that clipped some descriptions — bumped to `h-[300px]` +
   `line-clamp-6` (effectively a safety net, not engaged by current copy)
   so every card shows its full text while staying the same size.
8. Credentials: added a "Recognition / Certificates & Achievements." title
   above the credential pills (it previously had no heading at all).
9. Works: all projects in both tabs (3 Developer, 4 Network & Security) now
   use the wide horizontal card layout that only HASM used to have as the
   "featured" card. `ProjectCard` was simplified back to a single layout
   (the vertical-card / grid path is gone entirely, not just unused) — the
   small vertical-card grid mode no longer exists anywhere on the site.
   `featured` still exists purely to show the "Featured" badge on HASM.
10. Global starfield: the `StarsCanvas` background (previously only behind
    Contact) now renders once, `position: fixed`, behind the whole page —
    visible behind every section while scrolling, but invisible behind Hero
    because Hero's own opaque background naturally paints over it (no
    conditional/viewport logic needed). Its rotation speed was also slowed
    4x (`delta/10,15` → `delta/40,60`) per Khalid's "calm smooth wave" note.
11. Light theme repaint: Khalid didn't like the overall light-mode color —
    the "neutral" tokens (page bg, muted text, panels, shadows) all carried
    a lavender/violet tint (`#f4f4fb`, `#eceafc`, `#1a1730`, etc.), so
    literally everything read as purple-washed instead of a neutral canvas
    with purposeful accent color. Repainted the light theme in
    `src/index.css` (`:root` tokens) and a few hardcoded hex values in
    `Experience.jsx` to a true neutral cool-gray scale, and switched every
    shadow/border tint from the old violet-navy to a matching neutral ink.
    The `CATEGORY` accent colors (violet/teal/amber/pink) were deliberately
    left untouched — they're what should read as color now, popping
    against a clean neutral backdrop instead of competing with an
    already-tinted one. Also restyled `.page-depth`'s ambient wash from a
    single violet glow to a much more subtle two-tone violet+teal glow
    (the same Dev/Security accent pair used everywhere).
12. Light theme warmed up + Hero fully unified with the rest of the page
    (a follow-up to #11 — Khalid still didn't like the cool-gray result
    and wanted Hero to match the rest of the page too): the whole palette
    shifted from cool-gray to warm-gray (`#f7f5f1` page, `#fffbf4`
    warm-ivory cards — cards deliberately brighter+warmer than the page,
    `#1a1612` warm ink text). Hero's own background is now a flat
    `rgb(var(--color-primary))` (no separate gradient/tone at all), and the
    `.hero-transition` element was removed entirely — its ambient violet
    glow was creating a visible seam right at the Hero/About boundary once
    `.page-depth`'s wash was also switched from `position:absolute`
    (anchored to the whole page's height, so its gradient stops could land
    anywhere) to `position:fixed` (viewport-relative, no more arbitrary
    seams). Hero now reads as fully continuous with the rest of the page.

13. Contact's Earth model was clipped on the sides (not a full circle) —
    the canvas container's aspect ratio at `xl:` widths is narrow/tall
    (stretches to match the tall contact form), and the model's fixed
    scale exceeded the horizontally-visible extent at that aspect even
    though it fit vertically. Reduced `Earth.jsx`'s `scale` from `2.5` to
    `1.8`; fits with margin now at both the `xl` two-column layout and
    the stacked mobile layout.
14. Hero background no longer mismatches the page in either theme. Two
    separate causes, both measured rather than eyeballed (decoded the PNG
    into a canvas and read the pixels back): (a) light mode's inverted
    field landed on a COOL `#f5f6f6` against the page's warm `#f7f5f1`,
    fixed by adding `sepia(0.15)` to the filter chain; (b) the starfield
    art cut off at the hero's bottom as a hard seam in dark mode, fixed by
    moving the dark-mode image onto the same masked `::before` layer light
    mode already used. The hero is also transparent now in light mode so
    the viewport-fixed ambient wash runs continuously through it; dark
    mode keeps an opaque base (that's what keeps the starfield out of the
    hero, as requested) and needs no wash-matching since its image field
    is exactly `--color-primary`.
15. Hero scroll indicator no longer sits on top of the 3D desk. The desk
    leaves only a narrow clear band at the very bottom of the hero (~7% of
    the hero's height, so ~57px on an 847px-tall viewport), which is less
    than the old indicator needed (64px tall + a 40px offset). Moved it
    down (`xs:bottom-10` → `xs:bottom-2`) and sized it to fit that band
    (`35x64` → `26x36`, thinner border, smaller dot, shorter travel) — 44px
    total, so it still clears on viewports down to ~650px tall. Mobile's
    offset (`bottom-32`) is untouched.
16. Hero scroll indicator was only clickable along its top few pixels —
    caused by `.hash-span`, the invisible scroll-anchor offset spacer that
    every `SectionWrapper` section renders. It's ~124px tall and pulled up
    100px into the PREVIOUS section, and since each section is `relative
    z-0` it painted above the hero and swallowed clicks in that band.
    Fixed at the root with `pointer-events: none` on `.hash-span`, which
    also clears the same dead zone in the bottom ~100px of every other
    section. The indicator also got a 42x52 tap target (padding on the
    anchor, offset compensated so it doesn't move) and a bigger oval
    "wheel" (`w-[5px] h-[9px]`).
17. Hero/About seam, final cause (light mode, LEFT side only). The hero's
    contrast scrim `.bg-hero-pattern::after` is a radial gradient centred
    at 22% across and had no mask, so it painted at full strength right up
    to the hero's last pixel row on the left and stopped dead there. On
    the right it had already faded to zero, so that side matched — which
    is exactly the asymmetry Khalid described. Fixed by moving the
    `mask-image` from the `::before`-only rule up into the shared
    `::before, ::after` rule so both decorative layers fade out by 75% of
    the hero's height. **Invariant to remember** (three seams have now
    come from breaking it): anything painted inside the hero that reaches
    its bottom edge will read as a horizontal line, because the section
    below has no counterpart layer.
18. Navbar logo wrapped onto two lines ("Khalid|  Developer ×" /
    "Security") with the pipe glued to "Khalid". The `<p>` was
    `display:flex` with `&nbsp;`-based spacing, so the separator spacing
    collapsed and the suffix span wrapped internally whenever the bar ran
    out of room. Rewritten as three spans with `gap-2` +
    `whitespace-nowrap`; the "| Developer × Security" suffix now shows
    only from `lg` (1024px) up, where it measurably fits. Also moved the
    desktop nav row from `sm:` to `md:` (so the hamburger now covers
    640–767px) and made the link gap `gap-6 xl:gap-10` — that closes a
    **pre-existing** overflow band the wrapping had been masking.
    Measured across 320–1920px: one line everywhere, no overflow
    anywhere. Tradeoff worth knowing: at Khalid's own ~960px CSS viewport
    (200% Windows scaling on a 1920px screen) the logo now reads just
    "Khalid" — forcing the suffix on at that width leaves only 16px
    between the logo and "About", which is why the cutoff is 1024.
19. Global starfield was almost invisible in light mode. Both themes were
    drawing the same `size={0.002}` points, and at that size a bright dot
    on a dark field reads as a glowing point while the same dot on a
    near-white page averages away to nothing. Fixed in two passes — the
    first just made it visible (one deeper violet at `0.0035`), which
    Khalid then called too busy, too purply, and less delicate than dark
    mode. **Current state**: light mode draws *per-point* colours through
    a `color` buffer attribute + `vertexColors`, from a weighted palette
    (44% warm ink `#2f2a24`, then 14% each of deepened dev violet,
    security teal, infra amber and AI pink) with a bimodal brightness
    split — ~40% crisp "near" stars, ~60% faded 35–65% toward the page
    colour as background texture. **Dark mode is untouched** — Khalid
    called it perfect, and its branch keeps `#f272c8` / `0.002` /
    `vertexColors` off. Two gotchas live in that file's comments:
    `THREE.Color.lerp` mixes in *linear* space (a 50% mix toward a
    near-white bg is already ~75% of the way there, which collapses every
    faded star — mix the gamma-encoded bytes instead), and the material
    carries a `key` on the theme because `vertexColors` is a
    shader-define that needs a recompile to flip.

## Git state

Everything through the review pass is **merged**. `main` is at `abe5b62`,
the squash of PR #10 (hero scroll button, hero seam, navbar logo, both
light-mode starfield passes):
https://github.com/KhalidMued/Portfolio/pull/10 — working tree clean, no
local branch ahead of `origin/main`. The main redesign before that was
PR #7, squashed as `3abded2`.

**Deployment**: the site runs on Cloudflare Workers, deployed with a bare
`npx wrangler deploy` (no flags — `wrangler.jsonc` carries everything).
PR #12 is merged, so `main` and production match.

Three hostnames answer, all serving the identical build from the same
Worker:

| Hostname | Role |
| --- | --- |
| `https://khalidmued.com` | **primary / canonical** |
| `https://portfolio.khalidmued.com` | alternate, kept working on purpose |
| `https://portfolio.khalid-mued.workers.dev` | Cloudflare's default |

There is deliberately **no redirect** between them. Canonicalisation is
done with the `canonical` / `og:url` tags in `index.html`, which point at
the apex from every hostname — verified by fetching all three and
comparing. `www.khalidmued.com` has no DNS records and is intentionally
left that way.

The hostnames are Cloudflare Custom Domains managed **in the dashboard**,
not declared as `routes` in `wrangler.jsonc`. That's deliberate: a deploy
reconciles the Worker's route list, so declaring a partial list risks
silently detaching a hostname that isn't in the file.

Khalid's workflow for this repo is one PR per change, squash-merged into
`main` (every commit on `main` is a `(#N)` squash). So: branch off an
up-to-date `origin/main` and commit there — don't commit straight to
`main`, and don't keep reusing a branch whose PR has already been merged
(its history goes stale against the squashed commit). PR #10 drifted from
"one PR per change" — it started as just the scroll-indicator fix and the
review pass kept landing on the same branch until it carried six commits.
Start a fresh branch per topic rather than letting that happen again.

Branches are clean as of 2026-09-14: `main` is the only branch locally
and on the remote. Six stale ones (`cleanup/safe-tidy`,
`feature/audit-cleanup`, `fix/hero-scroll-indicator`,
`fix/remove-redirects-loop`, `fix/hero-scroll-indicator-hitbox`) were
deleted after confirming every one was already in `main`. Note the check
that matters here: because this repo squash-merges, `git log
origin/main..<branch>` always looks like unmerged work. Use `git cherry
-v main <branch>` (a `-` means the patch is already in `main`), and for a
squashed branch whose commits all read `+`, compare the trees instead —
`git diff --stat <branch> main` came back empty for #10's branch, which
is what proved the squash had captured everything.

**Stop at the commit.** Khalid verifies the change himself first, then
asks for the PR. Do not run `gh pr create`, and do not push a branch,
unless he asked for it in that exchange — see CLAUDE.md.

## Open / not yet addressed

- **Contact form is live and fully verified**, locally and in production
  (see the deployment note under "Git state"). Nothing outstanding on it
  except the key rotation below.
- **Rotate `RESEND_API_KEY`.** The key was printed into a session
  transcript: `.dev.vars` had been saved as the bare key with no
  `RESEND_API_KEY=` prefix, and an inspection command meant to show only
  the variable name and value length printed the whole line instead.
  Rotate in the Resend dashboard, update `.dev.vars`, re-run
  `npx wrangler secret put RESEND_API_KEY`, and redeploy. No code change.
- **The OG card is live** at https://khalidmued.com/og-card.png (200,
  `image/png`, byte-identical to `public/og-card.png`) and the live HTML
  carries the tags. Remaining step is Khalid's: LinkedIn, X and Facebook
  cache previews hard and may already hold the old imageless result, so
  force a re-scrape in LinkedIn's Post Inspector and X's Card Validator
  rather than trusting what a first paste shows.
- **Resend is still on the shared `onboarding@resend.dev` sender.** Now
  that `khalidmued.com` resolves, verifying it in Resend would allow
  sending from that domain, lift the "delivery only to the Resend
  account's own address" restriction on `CONTACT_TO_EMAIL`, and stop the
  contact mail riding a shared sender's reputation.
- Broader "too purply" feedback — only addressed in the About section so
  far. Khalid may want more color variety elsewhere (Hero, Navbar, Works,
  etc.) — ask before doing a wider recolor.
- No GitHub/live links on any project card yet.
- Content (bio/experience/projects) still pending final sign-off from
  Khalid per his "we'll finalize the core information" comment.
- No automated tests exist. Verification has been manual, in-browser
  (via the `claude-in-chrome` tools + a local dev server), each time a
  change is made.
- Browser-tooling note: screenshots come back blank/cropped whenever the
  Chrome window holding the automation tab isn't the foreground window
  (`document.visibilityState === "hidden"`). Ask Khalid to bring the
  `localhost:5173` tab to the front. `javascript_tool` still works on a
  hidden tab, but **timers are throttled** there — use synchronous
  measurement (set a size, force reflow by reading `offsetWidth`, then
  measure), not `setTimeout`. For responsive checks without resizing the
  window, load the site into a same-origin `<iframe>` and vary its width:
  media queries evaluate against the iframe's own width.

## How to resume if this session is lost

1. Read this file and `LEDGER.md` in full.
2. Read `CLAUDE.md` for architecture/gotchas.
3. Run `npm run dev`, open the site, and ask Khalid what he wants to look
   at / fix next — don't assume prior turns' context carries over.

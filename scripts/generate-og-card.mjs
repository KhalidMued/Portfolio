/**
 * Generates public/og-card.png — the 1200x630 image link-preview crawlers show
 * when the site is pasted into LinkedIn, X, Slack, WhatsApp or iMessage.
 *
 * Why a PNG and not the logo: `og:image` used to point at /logo.svg, which
 * serves fine but every one of those crawlers ignores SVG, so the preview
 * rendered with no image at all. They want a raster image, and they lay it out
 * as a wide 1.91:1 card — a square logo would be letterboxed even as a PNG.
 *
 * Run with `npm run og:card` after changing anything here. The output is
 * committed, so this only needs running when the card itself changes.
 *
 * Fonts are downloaded from Google Fonts into .cache/og-fonts/ (gitignored) on
 * first run — the site loads Poppins the same way, and the card has to match.
 */
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FONT_DIR = resolve(ROOT, '.cache/og-fonts');
const OUT = resolve(ROOT, 'public/og-card.png');

const WEIGHTS = [400, 500, 600, 800, 900];

/* Google Fonts serves woff2 to modern browsers and plain TTF to old ones.
   @napi-rs/canvas wants the TTF, hence the deliberately ancient User-Agent. */
async function ensureFonts() {
  mkdirSync(FONT_DIR, { recursive: true });
  const missing = WEIGHTS.filter((w) => !existsSync(`${FONT_DIR}/Poppins-${w}.ttf`));
  if (missing.length === 0) return;

  console.log(`fetching Poppins ${missing.join(', ')} from Google Fonts…`);
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Poppins:wght@${WEIGHTS.join(';')}`,
    { headers: { 'User-Agent': 'Mozilla/4.0' } }
  ).then((r) => r.text());

  for (const block of css.split('@font-face').slice(1)) {
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
    const url = block.match(/url\((https:[^)]+)\)/)?.[1];
    if (!weight || !url || !missing.includes(Number(weight))) continue;
    const bytes = new Uint8Array(await fetch(url).then((r) => r.arrayBuffer()));
    writeFileSync(`${FONT_DIR}/Poppins-${weight}.ttf`, bytes);
  }

  const stillMissing = WEIGHTS.filter((w) => !existsSync(`${FONT_DIR}/Poppins-${w}.ttf`));
  if (stillMissing.length) {
    throw new Error(`could not fetch Poppins weights: ${stillMissing.join(', ')}`);
  }
}

await ensureFonts();
for (const w of WEIGHTS) {
  GlobalFonts.registerFromPath(`${FONT_DIR}/Poppins-${w}.ttf`, `Poppins${w}`);
}
const font = (weight, size) => `${size}px Poppins${weight}`;

/* Pulled from src/constants/categories.js and the .dark block of src/index.css
   so the card can't drift from the site's palette without someone noticing. */
const C = {
  bg: '#050816',
  dev: '#915eff',
  sec: '#00cea8',
  infra: '#f5a623',
  ai: '#ec4899',
  head: '#ffffff',
  sub: '#dfd9ff',
  muted: '#aaa6c3',
};

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const x = canvas.getContext('2d');

const roundRect = (px, py, w, h, r) => {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
};

/* ---------- background ---------- */
x.fillStyle = C.bg;
x.fillRect(0, 0, W, H);

const glow = (cx, cy, r, color, alpha) => {
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
  g.addColorStop(1, color + '00');
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
};
glow(120, 80, 620, C.dev, 0.30);
glow(1120, 560, 600, C.sec, 0.17);
glow(660, 320, 460, C.ai, 0.07);

/* ---------- starfield, echoing the one behind the live site ---------- */
/* Seeded so regenerating the card doesn't reshuffle every star and produce a
   pointless binary diff. */
let seed = 20260914;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const starTints = [C.head, C.head, C.head, C.dev, C.sec, C.ai];
for (let i = 0; i < 260; i++) {
  const sx = rand() * W, sy = rand() * H;
  const r = rand() < 0.12 ? 1.8 : rand() * 1.1 + 0.4;
  x.globalAlpha = 0.12 + rand() * 0.55;
  x.fillStyle = starTints[Math.floor(rand() * starTints.length)];
  x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill();
}
x.globalAlpha = 1;

/* ---------- concentric arcs, echoing the hero's line art ---------- */
x.save();
x.translate(1010, 315);
for (let i = 0; i < 26; i++) {
  const r = 90 + i * 13;
  const g = x.createLinearGradient(-r, -r, r, r);
  g.addColorStop(0, C.dev);
  g.addColorStop(1, C.sec);
  x.strokeStyle = g;
  x.globalAlpha = 0.32 * (1 - (i / 25) * 0.72);
  x.lineWidth = 1.4;
  x.beginPath();
  x.arc(0, 0, r, Math.PI * 0.62, Math.PI * 1.72);
  x.stroke();
}
x.globalAlpha = 1;
x.restore();

/*
 * Topology nodes over the arcs — the "network" half of the positioning, said
 * visually. Positions are absolute and deliberately confined to the right of
 * x=840 and above y=470, the region no text occupies: the tagline runs to
 * ~690px and the chip row starts at y=524. Move one left or down and it lands
 * on a word.
 */
const nodes = [
  [886, 128], [1012, 74], [1128, 186],
  [958, 246], [1094, 330], [872, 322],
  [1016, 428], [1146, 424],
];
x.lineWidth = 1.2;
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const d = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1]);
    if (d > 190) continue;
    const g = x.createLinearGradient(nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1]);
    g.addColorStop(0, C.dev);
    g.addColorStop(1, C.sec);
    x.strokeStyle = g;
    x.globalAlpha = 0.38;
    x.beginPath();
    x.moveTo(nodes[i][0], nodes[i][1]);
    x.lineTo(nodes[j][0], nodes[j][1]);
    x.stroke();
  }
}
for (const [px, py] of nodes) {
  x.globalAlpha = 0.20;
  x.fillStyle = C.sec;
  x.beginPath(); x.arc(px, py, 12, 0, Math.PI * 2); x.fill();
  x.globalAlpha = 0.9;
  x.fillStyle = C.head;
  x.beginPath(); x.arc(px, py, 3.4, 0, Math.PI * 2); x.fill();
}
x.globalAlpha = 1;

/* ---------- vignette, so the corners don't compete with the text ---------- */
const vig = x.createRadialGradient(520, 300, 220, 520, 300, 860);
vig.addColorStop(0, '#05081600');
vig.addColorStop(1, '#050816cc');
x.fillStyle = vig;
x.fillRect(0, 0, W, H);

/* ---------- top accent bar: the two sides, before a word is read ---------- */
const bar = x.createLinearGradient(0, 0, W, 0);
bar.addColorStop(0, C.dev);
bar.addColorStop(0.5, C.sec);
bar.addColorStop(1, C.infra);
x.fillStyle = bar;
x.fillRect(0, 0, W, 6);

/* ---------- monogram badge ---------- */
const badge = x.createLinearGradient(80, 64, 138, 122);
badge.addColorStop(0, C.dev);
badge.addColorStop(1, C.sec);
roundRect(80, 64, 58, 58, 16);
x.fillStyle = badge;
x.fill();
x.fillStyle = C.bg;
x.font = font(900, 34);
x.textAlign = 'center';
x.textBaseline = 'middle';
x.fillText('K', 109, 95);
x.textAlign = 'left';
x.textBaseline = 'alphabetic';

x.fillStyle = C.muted;
x.font = font(600, 21);
x.fillText('khalidmued.com', 156, 101);

/* ---------- name ---------- */
x.save();
x.shadowColor = C.dev + 'aa';
x.shadowBlur = 38;
x.fillStyle = C.head;
x.font = font(900, 82);
x.fillText('Khalid Mohamed', 80, 258);
x.restore();

/* ---------- role line: two colours, two sides ---------- */
let rx = 80;
x.font = font(800, 33);
x.fillStyle = C.dev;
x.fillText('Developer.', rx, 310);
rx += x.measureText('Developer.').width + 20;
x.fillStyle = C.sec;
x.fillText('Network & Security Engineer.', rx, 310);

/* ---------- divider ---------- */
const dg = x.createLinearGradient(80, 0, 680, 0);
dg.addColorStop(0, C.dev);
dg.addColorStop(0.55, C.sec);
dg.addColorStop(1, C.sec + '00');
x.fillStyle = dg;
x.fillRect(80, 344, 600, 2);

/* ---------- tagline ---------- */
x.fillStyle = C.sub;
x.font = font(500, 31);
x.fillText('I build the apps people use —', 80, 404);
x.fillText('and the infrastructure they depend on.', 80, 450);

/* ---------- category chips, in the site's own accent palette ---------- */
const chips = [
  ['Development', C.dev],
  ['Network & Security', C.sec],
  ['Infrastructure', C.infra],
  ['AI & Automation', C.ai],
];
let cx = 80;
x.font = font(600, 19);
for (const [label, color] of chips) {
  const w = x.measureText(label).width + 52;
  roundRect(cx, 524, w, 44, 22);
  x.fillStyle = color + '1f';
  x.fill();
  x.lineWidth = 1.2;
  x.strokeStyle = color + '59';
  x.stroke();
  x.beginPath();
  x.arc(cx + 22, 546, 5, 0, Math.PI * 2);
  x.fillStyle = color;
  x.fill();
  x.fillStyle = color;
  x.fillText(label, cx + 36, 553);
  cx += w + 14;
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, canvas.toBuffer('image/png'));
const kb = (readFileSync(OUT).length / 1024).toFixed(0);
console.log(`wrote public/og-card.png — ${W}x${H}, ${kb} kB`);

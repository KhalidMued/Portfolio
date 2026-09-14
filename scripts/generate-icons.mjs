/**
 * Generates the favicon / touch-icon set in public/ from public/logo.svg.
 *
 * Why this exists: the site used to declare exactly one icon —
 * `<link rel="icon" type="image/svg+xml" href="/logo.svg">` — and nothing
 * else. iOS Safari asks for /apple-touch-icon.png first and /favicon.ico
 * second, and because `not_found_handling: "single-page-application"` answers
 * every unmatched path with index.html, both of those returned a page of HTML
 * with a 200 rather than a 404. iOS therefore had no usable icon at all, and
 * it is historically unreliable with SVG-only favicons, so the one icon that
 * was declared didn't rescue it.
 *
 * Run with `npm run icons` after changing logo.svg. Output is committed.
 *
 *   favicon.ico          16 + 32 + 48, PNG-compressed entries
 *   favicon-32.png       transparent
 *   apple-touch-icon.png 180x180, OPAQUE — iOS composites transparency onto
 *                        an unpredictable background, so the ground is painted
 *                        explicitly, and the mark is inset because iOS rounds
 *                        the corners and crops
 *   icon-192.png         opaque, for the web manifest
 *   icon-512.png         opaque, for the web manifest
 */
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = resolve(ROOT, 'public');

/* Matches --color-primary in the .dark block of src/index.css. */
const GROUND = '#050816';

const source = await loadImage(readFileSync(resolve(PUBLIC, 'logo.svg')));

/**
 * @param size      output square, in px
 * @param padRatio  breathing room per side, as a fraction of `size`
 * @param ground    opaque background, or null to keep transparency
 */
const render = (size, padRatio, ground) => {
  const canvas = createCanvas(size, size);
  const x = canvas.getContext('2d');

  if (ground) {
    x.fillStyle = ground;
    x.fillRect(0, 0, size, size);
  }

  const box = size - size * padRatio * 2;
  const scale = Math.min(box / source.width, box / source.height);
  const w = source.width * scale;
  const h = source.height * scale;
  x.drawImage(source, (size - w) / 2, (size - h) / 2, w, h);

  return canvas.toBuffer('image/png');
};

/**
 * Minimal ICO container around PNG payloads. The format is a 6-byte header,
 * then one 16-byte directory entry per image, then the image data — and since
 * Windows Vista the data may be a PNG rather than a BMP, which every browser
 * that still reads .ico understands. A 256px image is encoded as 0 in the
 * single width/height bytes; nothing here is that large, but the rule is why
 * those fields are one byte each.
 */
const buildIco = (pngs) => {
  const HEADER = 6;
  const ENTRY = 16;
  const header = new Uint8Array(HEADER + ENTRY * pngs.length);
  const view = new DataView(header.buffer);

  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // 1 = icon
  view.setUint16(4, pngs.length, true);

  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const at = HEADER + ENTRY * i;
    header[at] = size >= 256 ? 0 : size;
    header[at + 1] = size >= 256 ? 0 : size;
    header[at + 2] = 0; // palette size
    header[at + 3] = 0; // reserved
    view.setUint16(at + 4, 1, true); // colour planes
    view.setUint16(at + 6, 32, true); // bits per pixel
    view.setUint32(at + 8, data.length, true);
    view.setUint32(at + 12, offset, true);
    offset += data.length;
  });

  const out = new Uint8Array(offset);
  out.set(header, 0);
  let cursor = header.length;
  for (const { data } of pngs) {
    out.set(data, cursor);
    cursor += data.length;
  }
  return out;
};

const written = [];
const write = (name, bytes) => {
  writeFileSync(resolve(PUBLIC, name), bytes);
  written.push(`${name} (${(bytes.length / 1024).toFixed(1)} kB)`);
};

/* Browser tab icons keep their transparency — they sit on a tab strip whose
   colour the page doesn't control, and the mark reads on light and dark. */
write('favicon-32.png', render(32, 0.06, null));
write(
  'favicon.ico',
  buildIco([16, 32, 48].map((size) => ({ size, data: render(size, 0.06, null) })))
);

/* Touch and manifest icons are opaque: iOS and Android both place these on
   surfaces the page has no say over, and a transparent PNG gets composited
   onto whatever they choose. */
const touch = render(180, 0.14, GROUND);
write('apple-touch-icon.png', touch);
/* Older iOS probes the -precomposed name directly rather than reading the
   <link>. Same bytes: without the file, the SPA fallback answers that probe
   with index.html, which is the exact failure this script exists to end. */
write('apple-touch-icon-precomposed.png', touch);
write('icon-192.png', render(192, 0.14, GROUND));
write('icon-512.png', render(512, 0.14, GROUND));

console.log('wrote:\n  ' + written.join('\n  '));

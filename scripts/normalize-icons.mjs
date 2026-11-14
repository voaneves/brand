#!/usr/bin/env node
/**
 * normalize-icons.mjs  (Node >= 24, no dependencies)
 *
 * Normalizes the legacy icon-font SVGs into icons/svg/*.svg.
 *
 * Source glyphs have no viewBox and use y-up icon-font coordinates
 * (em 1024, ascent 960, descent -64). Output is a 1024x1024 viewBox,
 * 24x24 default size, single ink (currentColor), decorative (aria-hidden).
 *
 * Rules:
 *  - Each path's `d` is copied byte-identical; only a transform is added.
 *  - Y is flipped with  translate(tx ty) scale(s -s)  (y-up -> y-down).
 *  - Base placement is the font one: tx = (1024 - advanceWidth) / 2, ty = 960,
 *    s = 1 (advance unknown -> 1024 -> tx = 0).
 *  - The glyph bbox is parsed from the path numbers (absolute and relative
 *    commands; curve control points count, so it may slightly overestimate).
 *    If the font placement leaves the ink outside the 64-unit padding box
 *    [64, 960], i.e. clipped or off-center, the glyph is refit: scaled down
 *    uniformly only if needed to fit 896 units, then centered in 1024 on both
 *    axes (so >= 64 units of padding on every side).
 *  - Header comment `<!-- source: <set>, license: <license> -->` precedes <path>.
 *  - File names are kebab-case and keep the source base names.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = process.env.ICON_SRC ?? 'd:/GitHub/voaneves-intermediario/assets/svg';
const OUT = join(root, 'icons', 'svg');

const FA = ['Font Awesome 4 (subset)', 'SIL OFL 1.1 (font); listed as "Custom" in IcoMoon metadata'];
const ICOMOON = ['IcoMoon Free (subset)', 'GPL or CC BY 4.0'];
const MATERIAL = ['Material Icons (subset)', 'Apache-2.0'];

// name -> [set, license, advanceWidth|null]
const META = {
  adjust: [...FA, 878], blog: [...FA, 878], briefcase: [...FA, null],
  'calendar-check': [...FA, 951], 'cloud-download': [...FA, 1097], comments: [...FA, null],
  'envelope-open': [...FA, null], gamepad: [...MATERIAL, null], github: [...FA, 951],
  globe: [...FA, 878], 'graduation-cap': [...FA, 1317], home: [...FA, 951],
  linkedin: [...FA, 878], 'paper-plane': [...FA, 1025], refresh: [...FA, 878],
  translate: [...MATERIAL, null], user: [...FA, 731], whatsapp: [...ICOMOON, null],
  youtube: [...FA, 878],
};

const ARGS = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

function bbox(d) {
  const toks = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi);
  let i = 0, cmd = '', x = 0, y = 0, sx = 0, sy = 0;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const add = (px, py) => { x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py); };
  const num = () => parseFloat(toks[i++]);
  while (i < toks.length) {
    if (/[a-zA-Z]/.test(toks[i])) cmd = toks[i++];
    const up = cmd.toUpperCase(), rel = cmd !== up;
    if (up === 'Z') { x = sx; y = sy; continue; }
    const a = Array.from({ length: ARGS[up] }, num);
    const ox = rel ? x : 0, oy = rel ? y : 0;
    if (up === 'H') { x = a[0] + ox; }
    else if (up === 'V') { y = a[0] + oy; }
    else if (up === 'A') { x = a[5] + ox; y = a[6] + oy; }
    else {
      for (let k = 0; k < a.length - 2; k += 2) add(a[k] + ox, a[k + 1] + oy);
      x = a[a.length - 2] + ox; y = a[a.length - 1] + oy;
    }
    add(x, y);
    if (up === 'M') { sx = x; sy = y; cmd = rel ? 'l' : 'L'; }
  }
  return { x0, y0, x1, y1 };
}

const num = (n) => String(+n.toFixed(3));

mkdirSync(OUT, { recursive: true });
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.svg')).sort()) {
  const name = file.replace(/\.svg$/, '');
  const meta = META[name];
  if (!meta) throw new Error(`no license metadata for ${name}`);
  const [set, license, adv] = meta;
  const svg = readFileSync(join(SRC, file), 'utf8');
  const ds = [...svg.matchAll(/<path\b[^>]*?\sd="([^"]*)"/g)].map((m) => m[1]);
  if (!ds.length) throw new Error(`no path in ${file}`);
  const bb = ds.map(bbox).reduce((a, b) => ({
    x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0), x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1) }));

  // font placement: y' = 960 - y, x' = x + (1024 - adv)/2
  let s = 1, tx = adv && adv < 1024 ? (1024 - adv) / 2 : 0, ty = 960;
  const fx0 = tx + bb.x0, fx1 = tx + bb.x1, fy0 = ty - bb.y1, fy1 = ty - bb.y0;
  const ok = fx0 >= 64 && fx1 <= 960 && fy0 >= 64 && fy1 <= 960;
  if (!ok) {
    const w = bb.x1 - bb.x0, h = bb.y1 - bb.y0;
    s = Math.min(1, 896 / Math.max(w, h));
    tx = 512 - (s * (bb.x0 + bb.x1)) / 2;
    ty = 512 + (s * (bb.y0 + bb.y1)) / 2;
  }
  const tf = s === 1 ? `translate(${num(tx)} ${num(ty)}) scale(1 -1)` : `translate(${num(tx)} ${num(ty)}) scale(${num(s)} ${num(-s)})`;
  const paths = ds.map((d) => `<path transform="${tf}" d="${d}"/>`).join('');
  const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor" aria-hidden="true"><!-- source: ${set}, license: ${license} -->${paths}</svg>\n`;
  writeFileSync(join(OUT, file), out);
  console.log(`${name}: ${ok ? 'font placement' : 'refit s=' + num(s)}`);
}

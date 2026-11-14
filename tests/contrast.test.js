import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tokens from '../dist/tokens.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { pairs, banned } = JSON.parse(
  readFileSync(resolve(__dirname, 'contrast-pairs.json'), 'utf8'),
);

function parseHex(hex) {
  assert.match(hex, /^#[0-9a-f]{6}$/i, `Expected 6-digit hex color, got "${hex}"`);
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function relativeLuminance(hex) {
  const [r, g, b] = parseHex(hex).map((channel) => {
    const srgb = channel / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fgHex, bgHex) {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function colorFor(name, theme) {
  const entry = tokens[name];
  assert.ok(entry, `Missing token "${name}" in dist/tokens.js`);
  assert.ok(
    entry && typeof entry === 'object' && theme in entry,
    `Token "${name}" has no "${theme}" value`,
  );
  return entry[theme];
}

test('required color pairs meet WCAG 2.2 AA contrast minimums', () => {
  for (const pair of pairs) {
    for (const theme of pair.themes) {
      const fg = colorFor(pair.fg, theme);
      const bg = colorFor(pair.bg, theme);
      const ratio = contrastRatio(fg, bg);
      assert.ok(
        ratio >= pair.min,
        `[${theme}] ${pair.fg} (${fg}) on ${pair.bg} (${bg}) = ${ratio.toFixed(2)}:1 < ${pair.min}:1`,
      );
    }
  }
});

test('banned color pairs remain below 4.5:1 on Sinal', () => {
  for (const pair of banned) {
    for (const theme of pair.themes) {
      const fg = colorFor(pair.fg, theme);
      const bg = colorFor(pair.bg, theme);
      const ratio = contrastRatio(fg, bg);
      assert.ok(
        ratio < pair.max,
        `[${theme}] banned pair ${pair.fg} (${fg}) on ${pair.bg} (${bg}) = ${ratio.toFixed(2)}:1 >= ${pair.max}:1`,
      );
    }
  }
});

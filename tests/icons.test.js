import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXPECTED_ICONS = [
  'adjust',
  'blog',
  'briefcase',
  'calendar-check',
  'cloud-download',
  'comments',
  'envelope-open',
  'gamepad',
  'github',
  'globe',
  'graduation-cap',
  'home',
  'linkedin',
  'paper-plane',
  'refresh',
  'translate',
  'user',
  'whatsapp',
  'youtube',
];

const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

test('all 19 normalized SVGs exist with currentColor and viewBox 1024', async () => {
  const srcFiles = (await fs.readdir(path.join(ROOT, 'icons', 'svg')))
    .filter((f) => f.endsWith('.svg'))
    .map((f) => f.replace(/\.svg$/, ''))
    .sort();

  assert.deepEqual(srcFiles, EXPECTED_ICONS);

  for (const name of EXPECTED_ICONS) {
    const svg = await fs.readFile(path.join(ROOT, 'dist', 'icons', `${name}.svg`), 'utf8');
    assert.match(svg, /viewBox="0 0 1024 1024"/);
    assert.match(svg, /fill="currentColor"/);
  }
});

test('dist/icons/sprite.svg contains all 19 symbols', async () => {
  const sprite = await fs.readFile(path.join(ROOT, 'dist', 'icons', 'sprite.svg'), 'utf8');
  assert.match(sprite, /^<svg\b[^>]*>/);
  for (const name of EXPECTED_ICONS) {
    assert.match(sprite, new RegExp(`<symbol id="vn-icon-${name}" viewBox="0 0 1024 1024">`));
  }
});

test('app-icons suite and dist/logo variants exist with valid signatures', async () => {
  const ico = await fs.readFile(path.join(ROOT, 'dist', 'app-icons', 'favicon.ico'));
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);

  const favSvg = await fs.readFile(path.join(ROOT, 'dist', 'app-icons', 'favicon.svg'), 'utf8');
  assert.match(favSvg, /prefers-color-scheme:\s*dark/);

  for (const pngFile of [
    'apple-touch-icon.png',
    'icon-192.png',
    'icon-512.png',
    'maskable-512.png',
  ]) {
    const buf = await fs.readFile(path.join(ROOT, 'dist', 'app-icons', pngFile));
    assert.ok(buf.subarray(0, 8).equals(PNG_SIG), `${pngFile} should have PNG signature`);
  }

  for (const logoFile of [
    'mark.svg',
    'disc.svg',
    'wordmark.svg',
    'lockup-horizontal.svg',
    'lockup-stacked.svg',
    'signature.svg',
  ]) {
    const stat = await fs.stat(path.join(ROOT, 'dist', 'logo', logoFile));
    assert.ok(stat.size > 0, `${logoFile} should exist in dist/logo`);
  }
});

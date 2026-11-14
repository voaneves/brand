import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONTS_DIR = path.join(ROOT, 'fonts');
const WOFF2_MAGIC = Buffer.from('wOF2', 'ascii');

const EXPECTED_FONTS = [
  'fraunces-italic-display.woff2',
  'fraunces-roman.woff2',
  'schibsted-grotesk.woff2',
  'schibsted-grotesk-italic.woff2',
  'jetbrains-mono.woff2',
];

const EXPECTED_OFL = [
  'OFL-fraunces.txt',
  'OFL-schibsted-grotesk.txt',
  'OFL-jetbrains-mono.txt',
];

test('all 5 WOFF2 subsets exist with wOF2 magic bytes and shipped OFL notices', async () => {
  for (const file of EXPECTED_FONTS) {
    const buf = await fs.readFile(path.join(FONTS_DIR, file));
    assert.ok(buf.subarray(0, 4).equals(WOFF2_MAGIC), `${file} must start with wOF2`);
  }

  for (const ofl of EXPECTED_OFL) {
    const text = await fs.readFile(path.join(FONTS_DIR, ofl), 'utf8');
    assert.match(text, /SIL OPEN FONT LICENSE/i);
  }
});

test('critical preload fonts respect individual and combined byte budgets', async () => {
  const frauncesDisp = await fs.stat(path.join(FONTS_DIR, 'fraunces-italic-display.woff2'));
  const schibstedReg = await fs.stat(path.join(FONTS_DIR, 'schibsted-grotesk.woff2'));

  assert.ok(
    frauncesDisp.size <= 35840,
    `fraunces-italic-display.woff2 (${frauncesDisp.size} B) exceeds 35 KB ceiling`,
  );
  assert.ok(
    schibstedReg.size <= 35840,
    `schibsted-grotesk.woff2 (${schibstedReg.size} B) exceeds 35 KB ceiling`,
  );
  assert.ok(
    frauncesDisp.size + schibstedReg.size <= 61440,
    `combined preload (${frauncesDisp.size + schibstedReg.size} B) exceeds 60 KB budget`,
  );
});

test('dist/css/fonts.css declares all 5 @font-face subsets, swap, and fallback metrics', async () => {
  const css = await fs.readFile(path.join(ROOT, 'dist', 'css', 'fonts.css'), 'utf8');

  for (const file of EXPECTED_FONTS) {
    assert.ok(css.includes(`../../fonts/${file}`), `fonts.css missing ../../fonts/${file}`);
  }
  assert.match(css, /font-display:\s*swap/);
  assert.match(css, /Fraunces Fallback/);
  assert.match(css, /Schibsted Grotesk Fallback/);
});

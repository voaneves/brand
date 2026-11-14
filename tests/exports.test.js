import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkExports } from '../scripts/check-exports.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('all package.json exports, CSS layer isolation, Astro components and cursor budget pass', async () => {
  const summary = await checkExports();
  assert.ok(summary.exportTargets >= 15);
  assert.ok(summary.cursorGzipBytes <= 1536);
});

test('dist/board manifest lists all 14 chapters and component previews', async () => {
  const manifest = JSON.parse(
    await fs.readFile(path.join(ROOT, 'dist', 'board', 'index.json'), 'utf8'),
  );
  assert.equal(manifest.chapters.length, 14);
  assert.equal(manifest.previews.length, 7);
});

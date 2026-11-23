import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'dist', 'site');

test('gallery lists every preview, ships its assets and has no duplicate ids', async () => {
  const html = await fs.readFile(path.join(SITE, 'index.html'), 'utf8');
  const dirs = (await fs.readdir(path.join(ROOT, 'board', 'components'), { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  assert.ok(dirs.length >= 26);
  for (const name of dirs) {
    assert.ok(html.includes(`src="board/components/${name}/preview.html"`), `${name} missing from gallery`);
    await fs.access(path.join(SITE, 'board', 'components', name, 'preview.html'));
  }
  for (const rel of ['dist/css/all.css', 'dist/css/fonts.css', 'dist/js/theme.js', 'dist/js/drawer.js', 'fonts/schibsted-grotesk.woff2']) {
    await fs.access(path.join(SITE, rel));
  }
  assert.ok((html.match(/class="sw"/g) ?? []).length >= 25);
  const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'duplicate ids');
  assert.match(html, /<html lang="pt-BR">/);
});

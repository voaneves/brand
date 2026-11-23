import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CSS_DIR = path.join(ROOT, 'css', 'src', 'components');
const SPEC_DIR = path.join(ROOT, 'docs', 'components');
const PREVIEW_DIR = path.join(ROOT, 'board', 'components');

const read = (p) => fs.readFile(p, 'utf8');

test('every .vn-* block class in component CSS has a spec and a preview', async () => {
  const css = (await Promise.all((await fs.readdir(CSS_DIR)).filter((f) => f.endsWith('.css')).map((f) => read(path.join(CSS_DIR, f))))).join('\n');
  const blocks = [...new Set([...css.matchAll(/\.(vn-[a-z0-9]+(?:-[a-z0-9]+)*)(?![\w-])/g)].map((m) => m[1]))]
    .filter((name) => !name.includes('__'));
  assert.ok(blocks.length >= 30, `only ${blocks.length} block classes found`);

  const specs = await Promise.all(
    (await fs.readdir(SPEC_DIR)).filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md').map((f) => read(path.join(SPEC_DIR, f))),
  );
  const previews = [];
  for (const d of await fs.readdir(PREVIEW_DIR, { withFileTypes: true })) {
    if (d.isDirectory()) previews.push(await read(path.join(PREVIEW_DIR, d.name, 'preview.html')));
  }

  // Modifiers (.vn-btn--primary) are matched by their block; only block names are required.
  const modifierOf = (name) => name.split('--')[0];
  const names = [...new Set(blocks.map(modifierOf))];
  const missing = [];
  for (const name of names) {
    const specRe = new RegExp(`\\.${name}(?![\\w-])`);
    const previewRe = new RegExp(`(?:class|className)="[^"]*\\b${name}\\b(?![\\w-])`);
    if (!specs.some((s) => specRe.test(s))) missing.push(`${name}: no spec in docs/components`);
    if (!previews.some((p) => previewRe.test(p))) missing.push(`${name}: not used in any board/components preview`);
  }
  assert.deepEqual(missing, [], `\n${missing.join('\n')}`);
});

test('every component spec starts with a title and', async () => {
  for (const f of (await fs.readdir(SPEC_DIR)).filter((n) => n.endsWith('.md') && !n.startsWith('_') && n !== 'README.md')) {
    const text = await read(path.join(SPEC_DIR, f));
    assert.match(text, /^# /, `${f} has no title`);
    assert.match(text, /^## /m, `${f} has no sections`);
  }
});

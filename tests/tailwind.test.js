import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('tailwind theme maps only existing --vn-* properties and is exported', async () => {
  const theme = await fs.readFile(path.join(ROOT, 'dist', 'tailwind', 'theme.css'), 'utf8');
  const tokens = await fs.readFile(path.join(ROOT, 'dist', 'css', 'tokens.css'), 'utf8');
  assert.match(theme, /@theme inline \{/);
  assert.match(theme, /--color-signal: var\(--vn-signal\);/);
  assert.match(theme, /--font-display: var\(--vn-font-display\);/);
  assert.match(theme, /--text-h1--line-height: var\(--vn-type-h1-line-height\);/);
  const used = [...theme.matchAll(/var\(--vn-([a-z0-9-]+)\)/g)].map((m) => m[1]);
  assert.ok(used.length > 80);
  for (const name of used) assert.ok(tokens.includes(`--vn-${name}:`), `--vn-${name} not in tokens.css`);
  const pkg = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));
  assert.equal(pkg.exports['./tailwind/theme.css'], './dist/tailwind/theme.css');
});

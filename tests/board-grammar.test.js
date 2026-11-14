import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BOARD_NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/;
const VALID_COLOR = /^(#[0-9a-f]{3,8}|rgba?\([^)]+\)|oklch\([^)]+\))$/i;

test('token build produces all expected dist artifacts', () => {
  const outputs = [
    'dist/css/tokens.css',
    'dist/css/type.css',
    'dist/tokens.js',
    'dist/tokens.d.ts',
    'dist/tokens.json',
    'dist/board/tokens.json',
  ];
  for (const rel of outputs) {
    const full = resolve(ROOT, rel);
    const stat = statSync(full);
    assert.ok(stat.isFile() && stat.size > 0, `Expected non-empty file ${rel}`);
  }
});

test('dist/board/tokens.json matches Claude board grammar and caps', () => {
  const board = JSON.parse(readFileSync(resolve(ROOT, 'dist/board/tokens.json'), 'utf8'));

  assert.deepEqual(board.color?.themes, [{ id: 'light' }, { id: 'dark' }]);

  const listFamilies = ['color', 'spacing', 'radius', 'shadow', 'opacity', 'zIndex', 'motion'];
  const topKeys = Object.keys(board);
  assert.ok(topKeys.length <= 12, `Too many families (${topKeys.length} > 12)`);
  for (const fam of listFamilies) {
    assert.ok(Array.isArray(board[fam]?.tokens), `Family "${fam}" must have a tokens array`);
  }

  assert.ok(board.color.tokens.length <= 600, `Too many colors (${board.color.tokens.length} > 600)`);
  for (const token of board.color.tokens) {
    for (const theme of ['light', 'dark']) {
      const val = token.value?.[theme];
      assert.equal(typeof val, 'string', `Color "${token.name}.${theme}" must be a string`);
      assert.ok(!val.includes('var(') && !val.includes('color-mix('), `Color "${token.name}.${theme}" uses CSS function: ${val}`);
      assert.match(val, VALID_COLOR, `Color "${token.name}.${theme}" is not hex/rgb/oklch: ${val}`);
    }
  }

  const seen = new Set();
  for (const fam of listFamilies) {
    for (const token of board[fam].tokens) {
      assert.match(token.name, BOARD_NAME, `Token "${token.name}" in "${fam}" violates naming grammar`);
      assert.ok(!seen.has(token.name), `Duplicate board token name "${token.name}"`);
      seen.add(token.name);
    }
  }

  const groups = board.type?.groups;
  assert.ok(Array.isArray(groups), 'board.type.groups must be an array');
  assert.deepEqual(
    groups.map((g) => g.name),
    ['Display', 'Text', 'Label'],
  );
  const totalStyles = groups.reduce((sum, g) => sum + (g.styles?.length ?? 0), 0);
  assert.ok(totalStyles <= 80, `Too many type styles (${totalStyles} > 80)`);
  assert.equal(totalStyles, 19, 'Expected 19 type styles from spec-values.md');
});

test('component tokens never alias ref.* primitives directly', () => {
  const dir = resolve(ROOT, 'tokens/src/component');
  const files = readdirSync(dir).filter((f) => f.endsWith('.tokens.json'));
  assert.ok(files.length > 0, 'Expected component token files');

  function walk(node, file, path) {
    if (typeof node === 'string') {
      assert.ok(
        !/\{ref\./.test(node),
        `${file} (${path.join('.')}) directly aliases ref token: ${node}`,
      );
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, idx) => walk(item, file, [...path, String(idx)]));
      return;
    }
    if (node && typeof node === 'object') {
      for (const [key, val] of Object.entries(node)) {
        walk(val, file, [...path, key]);
      }
    }
  }

  for (const file of files) {
    const json = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    walk(json, file, []);
  }
});

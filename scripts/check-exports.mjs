import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function collectTargets(entry) {
  if (typeof entry === 'string') return [entry];
  if (entry && typeof entry === 'object') {
    return Object.values(entry).flatMap((v) => collectTargets(v));
  }
  return [];
}

export async function checkExports() {
  const pkg = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));
  const targets = collectTargets(pkg.exports);

  for (const target of targets) {
    if (target.includes('*')) {
      const starIdx = target.indexOf('*');
      const dirRel = target.slice(0, starIdx).replace(/\/$/, '');
      const suffix = target.slice(starIdx + 1);
      const dirAbs = path.join(ROOT, dirRel);
      const entries = (await fs.readdir(dirAbs, { withFileTypes: true }))
        .filter((e) => e.isFile() && (!suffix || e.name.endsWith(suffix)) && e.name !== 'README.md');
      if (entries.length === 0) {
        throw new Error(`Wildcard export ${target} matched no files in ${dirRel}`);
      }
      for (const file of entries) {
        const stat = await fs.stat(path.join(dirAbs, file.name));
        if (stat.size <= 0) {
          throw new Error(`Exported file ${dirRel}/${file.name} is empty`);
        }
      }
    } else {
      const abs = path.join(ROOT, target);
      const stat = await fs.stat(abs);
      if (stat.size <= 0) {
        throw new Error(`Exported file ${target} is empty`);
      }
    }
  }

  const componentsCss = await fs.readFile(path.join(ROOT, 'dist', 'css', 'components.css'), 'utf8');
  if (componentsCss.includes('--vn-ref-')) {
    throw new Error('dist/css/components.css contains direct --vn-ref-* primitive reference');
  }

  const cursorJs = await fs.readFile(path.join(ROOT, 'dist', 'js', 'cursor.js'));
  const cursorGz = zlib.gzipSync(cursorJs);
  if (cursorGz.length > 1536) {
    throw new Error(`dist/js/cursor.js gzip (${cursorGz.length} B) exceeds 1536 B ceiling`);
  }

  for (const rel of [
    'astro/Logo.astro',
    'astro/Icon.astro',
    'astro/Credit.astro',
    'dist/credit/credit.html',
  ]) {
    const stat = await fs.stat(path.join(ROOT, rel));
    if (stat.size <= 0) {
      throw new Error(`Required component artifact ${rel} is empty`);
    }
  }

  return { exportTargets: targets.length, cursorGzipBytes: cursorGz.length };
}

const isCli =
  process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  const result = await checkExports();
  console.log(
    `Verified ${result.exportTargets} export entries; cursor.js gzip = ${result.cursorGzipBytes} B.`,
  );
}

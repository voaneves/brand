import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BOARD_SRC = path.join(ROOT, 'board');
const BOARD_DIST = path.join(ROOT, 'dist', 'board');

export async function buildBoard() {
  await fs.mkdir(BOARD_DIST, { recursive: true });
  await fs.mkdir(path.join(BOARD_DIST, 'components'), { recursive: true });

  const entries = (await fs.readdir(BOARD_SRC)).sort();
  const chapters = [];

  for (const name of entries) {
    if (!name.endsWith('.md') || name === 'README.md') continue;
    const content = await fs.readFile(path.join(BOARD_SRC, name), 'utf8');
    await fs.writeFile(path.join(BOARD_DIST, name), content, 'utf8');
    const titleLine = content.split(/\r?\n/).find((l) => l.startsWith('# ')) || `# ${name}`;
    chapters.push({ file: name, title: titleLine.replace(/^#\s+/, '').trim() });
  }

  const componentsSrc = path.join(BOARD_SRC, 'components');
  const previews = [];
  const componentDirs = (await fs.readdir(componentsSrc, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const comp of componentDirs) {
    const destDir = path.join(BOARD_DIST, 'components', comp);
    await fs.mkdir(destDir, { recursive: true });
    const compFiles = await fs.readdir(path.join(componentsSrc, comp));
    for (const f of compFiles) {
      await fs.copyFile(path.join(componentsSrc, comp, f), path.join(destDir, f));
      if (f === 'preview.html') {
        previews.push({ component: comp, path: `components/${comp}/preview.html` });
      }
    }
  }

  const tokensJsonPath = path.join(BOARD_DIST, 'tokens.json');
  try {
    await fs.access(tokensJsonPath);
  } catch {
    throw new Error('dist/board/tokens.json is missing; run build:tokens first');
  }

  const manifest = {
    name: '@voaneves/brand',
    chapters,
    previews,
    tokens: 'tokens.json',
  };

  await fs.writeFile(
    path.join(BOARD_DIST, 'index.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );

  return manifest;
}

const isCli =
  process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  const result = await buildBoard();
  console.log(`Built board with ${result.chapters.length} chapters and ${result.previews.length} previews.`);
}

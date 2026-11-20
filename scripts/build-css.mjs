import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CSS_SRC = path.join(ROOT, 'css', 'src');
const DIST_CSS = path.join(ROOT, 'dist', 'css');
const JS_SRC = path.join(ROOT, 'js', 'src');
const DIST_JS = path.join(ROOT, 'dist', 'js');
const DIST_CREDIT = path.join(ROOT, 'dist', 'credit');

const CREDIT_HTML = `<!-- @voaneves/brand credit snippet -->
<a href="https://voaneves.com/?utm_source=client&amp;utm_medium=credit" rel="noopener" class="vn-credit" style="display:inline-flex;align-items:center;gap:8px;font:500 11px/1.45 'JetBrains Mono',monospace;letter-spacing:0.12em;text-transform:uppercase;color:inherit;text-decoration:none;">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" aria-hidden="true">
    <path fill="currentColor" fill-rule="evenodd" d="M0 256a256 256 0 1 0 512 0a256 256 0 1 0-512 0ZM142 148L214 148L250 244L286 148L358 148L277 364L223 364Z"/>
    <circle cx="340" cy="337" r="27" fill="#f50000"/>
  </svg>
  <span>Feito por <strong>voaneves</strong></span>
</a>
`;

export async function buildCss() {
  await fs.mkdir(DIST_CSS, { recursive: true });
  await fs.mkdir(DIST_JS, { recursive: true });
  await fs.mkdir(DIST_CREDIT, { recursive: true });

  const resetCss = await fs.readFile(path.join(CSS_SRC, 'reset.css'), 'utf8');
  const typeCss = await fs.readFile(path.join(DIST_CSS, 'type.css'), 'utf8');
  const baseCss = await fs.readFile(path.join(CSS_SRC, 'base.css'), 'utf8');
  // components.css first, then the other component files in name order.
  const compDir = path.join(CSS_SRC, 'components');
  const compFiles = (await fs.readdir(compDir)).filter((f) => f.endsWith('.css')).sort();
  compFiles.sort((a, b) => Number(b === 'components.css') - Number(a === 'components.css'));
  const componentsCss = `${(
    await Promise.all(compFiles.map((f) => fs.readFile(path.join(compDir, f), 'utf8')))
  ).map((c) => c.trim()).join('\n\n')}\n`;

  if (componentsCss.includes('--vn-ref-')) {
    throw new Error('components.css must not reference --vn-ref-* primitive tokens directly');
  }

  const combinedBase = [resetCss.trim(), typeCss.trim(), baseCss.trim(), ''].join('\n\n');
  await fs.writeFile(path.join(DIST_CSS, 'base.css'), combinedBase, 'utf8');
  await fs.writeFile(path.join(DIST_CSS, 'components.css'), componentsCss, 'utf8');

  const allCss = [
    '@layer vn.reset, vn.tokens, vn.base, vn.type, vn.components, vn.utilities;',
    '@import "./fonts.css";',
    '@import "./tokens.css";',
    '@import "./base.css";',
    '@import "./components.css";',
    '',
  ].join('\n');
  await fs.writeFile(path.join(DIST_CSS, 'all.css'), allCss, 'utf8');

  const jsFiles = (await fs.readdir(JS_SRC)).filter((f) => f.endsWith('.js')).sort();
  for (const file of jsFiles) {
    await fs.copyFile(path.join(JS_SRC, file), path.join(DIST_JS, file));
  }

  await fs.writeFile(path.join(DIST_CREDIT, 'credit.html'), CREDIT_HTML, 'utf8');

  return { jsFiles };
}

const isCli =
  process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  const result = await buildCss();
  console.log(`Built CSS layers, credit snippet, and ${result.jsFiles.length} JS modules.`);
}

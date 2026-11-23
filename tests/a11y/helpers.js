import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const COMPONENTS_DIR = path.join(ROOT, 'board', 'components');
export const AXE_PATH = require.resolve('axe-core/axe.min.js');
const AXE_SOURCE = fs.readFileSync(AXE_PATH, 'utf8');

export const previewNames = () =>
  fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(COMPONENTS_DIR, d.name, 'preview.html')))
    .map((d) => d.name)
    .sort();

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
let origin = '';

/** Serve the repo over HTTP (ES module imports in previews do not work from file://). */
export async function startServer() {
  const server = http.createServer((req, res) => {
    const file = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  return server;
}

export const previewUrl = (name, hash = '') => `${origin}/board/components/${name}/preview.html${hash}`;

/** Launch the system Chrome (preinstalled on GitHub runners); override with CHROME_PATH. */
export async function launch() {
  const executablePath = process.env.CHROME_PATH;
  return chromium.launch(executablePath ? { executablePath } : { channel: 'chrome' });
}

export async function newPage(browser, { colorScheme = 'light', reducedMotion = 'no-preference', viewport } = {}) {
  const context = await browser.newContext({
    colorScheme,
    reducedMotion,
    viewport: viewport ?? { width: 1024, height: 768 },
  });
  const page = await context.newPage();
  return page;
}

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** Run axe (WCAG 2.2 AA rules) on the current page and return the violations. */
export async function runAxe(page) {
  await page.evaluate(AXE_SOURCE);
  const results = await page.evaluate(
    (tags) => window.axe.run(document, { runOnly: { type: 'tag', values: tags } }),
    TAGS,
  );
  return results.violations;
}

export const formatViolations = (violations) =>
  violations
    .map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n` +
        v.nodes.map((n) => `  ${n.target.join(' ')}  ${n.failureSummary?.split('\n')[1] ?? ''}`).join('\n'),
    )
    .join('\n');

// Builds dist/site: a static gallery (no framework) that mirrors the repo layout so previews work unchanged.
//   dist/site/index.html          tokens, type specimen and every component preview
//   dist/site/dist/{css,js,logo}  built package files the previews import
//   dist/site/fonts, board/components   fonts and preview sources
// Deployed to GitHub Pages by .github/workflows/gallery.yml. Run after build:board: npm run build:gallery
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'dist', 'site');
const REPO = 'https://github.com/voaneves/brand';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const SPEC_ALIASES = { NavBar: 'navbar' };
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(from, to, filter = () => true) {
  await fs.mkdir(to, { recursive: true });
  for (const entry of await fs.readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst, filter);
    else if (filter(src)) await fs.copyFile(src, dst);
  }
}

export async function buildGallery() {
  await fs.rm(SITE, { recursive: true, force: true });
  await copyDir(path.join(ROOT, 'dist', 'css'), path.join(SITE, 'dist', 'css'));
  await copyDir(path.join(ROOT, 'dist', 'js'), path.join(SITE, 'dist', 'js'));
  await copyDir(path.join(ROOT, 'dist', 'logo'), path.join(SITE, 'dist', 'logo'));
  await copyDir(path.join(ROOT, 'fonts'), path.join(SITE, 'fonts'), (f) => f.endsWith('.woff2'));
  await copyDir(path.join(ROOT, 'board', 'components'), path.join(SITE, 'board', 'components'));

  const tokens = JSON.parse(await fs.readFile(path.join(ROOT, 'dist', 'board', 'tokens.json'), 'utf8'));
  const pkg = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));
  const all = tokens.color.tokens;
  const start = all.findIndex((t) => t.name === 'ink');
  const colors = all.slice(start).filter((t) => /^#/.test(t.value.light) && /^#/.test(t.value.dark));

  const swatches = colors
    .map((t) => {
      const l = t.value.light;
      const d = t.value.dark;
      return `<li class="sw"><span class="sw__chip" aria-hidden="true"><span style="background:${l}"></span><span style="background:${d}"></span></span><code>--vn-${esc(t.name)}</code><span class="sw__v">${l}${l === d ? '' : ` / ${d}`}</span></li>`;
    })
    .join('\n');

  const typeStyles = tokens.type.groups.flatMap((g) => g.styles);
  const specimen = typeStyles
    .map(
      (s) =>
        `<div class="spec"><span class="spec__meta">${esc(s.name)} · ${esc(s.fontSize)} · ${esc(s.fontWeight)}</span><p class="vn-type-${esc(s.name)}" ${s.name === 'hero' || s.name === 'display' ? 'style="overflow-wrap:anywhere"' : ''}>${s.name === 'code' ? 'const sinal = "#f50000"' : s.name === 'price' ? 'R$ 1.500' : s.name === 'hero' ? 'Sinal.' : s.name === 'display' ? 'Fale comigo' : 'Signal, not noise'}</p></div>`,
    )
    .join('\n');

  const dirs = (await fs.readdir(path.join(ROOT, 'board', 'components'), { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  const cards = [];
  for (const name of dirs) {
    const spec = SPEC_ALIASES[name] ?? kebab(name);
    const hasSpec = await exists(path.join(ROOT, 'docs', 'components', `${spec}.md`));
    cards.push(`<article class="card">
  <header><h3>${esc(name)}</h3><p><a href="board/components/${name}/preview.html">Abrir preview</a>${hasSpec ? ` · <a href="${REPO}/blob/main/docs/components/${spec}.md">Especificação</a>` : ''}</p></header>
  <iframe title="Preview de ${esc(name)}" src="board/components/${name}/preview.html" loading="lazy" height="260"></iframe>
</article>`);
  }

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>VOANEVES. brand gallery</title>
<meta name="description" content="Tokens, tipografia e componentes do design system VOANEVES, com previews em tema claro e escuro.">
<link rel="icon" href="dist/logo/mark.svg" type="image/svg+xml">
<link rel="preload" href="fonts/schibsted-grotesk.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="dist/css/all.css">
<style>
  .g-head { position: sticky; top: 0; z-index: var(--vn-z-nav); background: var(--vn-surface); border-bottom: 1px solid var(--vn-line); }
  .g-head__in { display: flex; align-items: center; justify-content: space-between; gap: var(--vn-space-4); min-height: 72px; flex-wrap: wrap; }
  .g-brand { display: inline-flex; align-items: center; gap: var(--vn-space-3); color: var(--vn-text); text-decoration: none; }
  .g-brand img { width: 32px; height: 32px; }
  .m-dark { display: none; }
  html[data-theme="dark"] .m-light { display: none; }
  html[data-theme="dark"] .m-dark { display: inline; }
  .g-nav { display: flex; gap: var(--vn-space-5); flex-wrap: wrap; }
  .g-nav a { display: inline-flex; align-items: center; min-height: 44px; color: var(--vn-text); }
  .g-main h1 { margin-block: var(--vn-space-9) var(--vn-space-3); }
  .g-main h2 { margin-block: var(--vn-space-10) var(--vn-space-5); }
  .g-main section { scroll-margin-top: 88px; }
  .lead { max-width: var(--vn-layout-measure); color: var(--vn-text-muted); }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--vn-space-4); list-style: none; padding: 0; margin: 0; }
  .sw { display: grid; gap: var(--vn-space-1); }
  .sw__chip { display: grid; grid-template-columns: 1fr 1fr; height: 56px; border: 1px solid var(--vn-line-strong); border-radius: var(--vn-radius-sm); overflow: hidden; }
  .sw__chip span { display: grid; place-items: center; font-family: var(--vn-font-mono); font-size: 12px; }
  .sw code, .sw__v { font-family: var(--vn-font-mono); font-size: 12px; overflow-wrap: anywhere; }
  .sw__v { color: var(--vn-text-muted); }
  .spec { padding-block: var(--vn-space-3); border-bottom: 1px solid var(--vn-line); }
  .spec p { margin: 0; overflow-wrap: anywhere; }
  .spec__meta { display: block; margin-block-end: var(--vn-space-1); font-family: var(--vn-font-mono); font-size: 12px; color: var(--vn-text-muted); }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr)); gap: var(--vn-space-5); }
  .card { border: 1px solid var(--vn-line-strong); border-radius: var(--vn-radius-lg); background: var(--vn-surface-raised); overflow: hidden; }
  .card header { display: flex; justify-content: space-between; align-items: baseline; gap: var(--vn-space-3); flex-wrap: wrap; padding: var(--vn-space-3) var(--vn-space-4); border-bottom: 1px solid var(--vn-line); }
  .card h3 { margin: 0; font-size: 18px; }
  .card p { margin: 0; font-size: 14px; }
  .card a, .lead a { color: var(--vn-signal-ink); text-decoration: underline; text-underline-offset: 3px; }
  .card iframe { display: block; width: 100%; border: 0; background: var(--vn-surface); }
  .g-foot { margin-block: var(--vn-space-12) var(--vn-space-8); color: var(--vn-text-muted); }
</style>
</head>
<body>
<a class="vn-skip-link" href="#main">Pular para o conteúdo</a>
<header class="g-head">
  <div class="vn-container g-head__in">
    <a class="g-brand vn-type-wordmark" href="#main"><img class="m-light" src="dist/logo/mark.svg" alt="" width="32" height="32"><img class="m-dark" src="dist/logo/mark-reverse.svg" alt="" width="32" height="32">VOANEVES.</a>
    <nav class="g-nav" aria-label="Seções"><a href="#cores">Cores</a><a href="#tipografia">Tipografia</a><a href="#componentes">Componentes</a><a href="${REPO}">GitHub</a></nav>
    <button class="vn-btn vn-btn--secondary vn-btn--sm" type="button" id="theme" aria-pressed="false">Tema escuro</button>
  </div>
</header>
<main id="main" class="vn-container g-main">
  <h1 class="vn-type-h1">Brand gallery</h1>
  <p class="lead vn-type-lead">Tokens, tipografia e ${dirs.length} componentes de <code>@voaneves/brand</code> ${esc(pkg.version)}, na versão publicada do repositório. Alterne o tema acima; os previews acompanham. <a href="${REPO}">Código e documentação</a>.</p>

  <section id="cores" aria-labelledby="h-cores">
    <h2 class="vn-type-h2" id="h-cores">Cores</h2>
    <p class="lead">Cada amostra mostra claro (esquerda) e escuro (direita). Valores semânticos, prontos como <code>--vn-*</code>.</p>
    <ul class="grid">
${swatches}
    </ul>
  </section>

  <section id="tipografia" aria-labelledby="h-tipo">
    <h2 class="vn-type-h2" id="h-tipo">Tipografia</h2>
    <p class="lead">Fraunces para títulos, Schibsted Grotesk para texto e JetBrains Mono para rótulos e código.</p>
${specimen}
  </section>

  <section id="componentes" aria-labelledby="h-comp">
    <h2 class="vn-type-h2" id="h-comp">Componentes</h2>
    <div class="cards">
${cards.join('\n')}
    </div>
  </section>

  <p class="g-foot vn-type-caption">Código MIT, fontes OFL. Logo e wordmark: todos os direitos reservados.</p>
</main>
<script type="module">
  import { initTheme, setTheme } from './dist/js/theme.js';
  const btn = document.getElementById('theme');
  const frames = [...document.querySelectorAll('iframe')];
  const apply = (mode) => {
    setTheme(mode);
    btn.setAttribute('aria-pressed', String(mode === 'dark'));
    btn.textContent = mode === 'dark' ? 'Tema claro' : 'Tema escuro';
    for (const f of frames) if (f.contentDocument) f.contentDocument.documentElement.dataset.theme = mode;
  };
  const mode = initTheme();
  btn.setAttribute('aria-pressed', String(mode === 'dark'));
  btn.textContent = mode === 'dark' ? 'Tema claro' : 'Tema escuro';
  btn.addEventListener('click', () => apply(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  for (const f of frames) f.addEventListener('load', () => { f.contentDocument.documentElement.dataset.theme = document.documentElement.dataset.theme; });
</script>
</body>
</html>
`;
  await fs.writeFile(path.join(SITE, 'index.html'), html, 'utf8');
  await fs.writeFile(path.join(SITE, '.nojekyll'), '', 'utf8');
  return { previews: dirs.length, colors: colors.length };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  const r = await buildGallery();
  console.log(`Built gallery with ${r.colors} colors and ${r.previews} previews in dist/site.`);
}

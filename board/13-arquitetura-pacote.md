# 13 — Arquitetura do Pacote

`@voaneves/brand` é publicado no npm com zero dependências de runtime e compatível com Astro `>= 7` (peer dependency opcional).

## Subpath Exports

| Import | Conteúdo |
|---|---|
| `@voaneves/brand/css/all.css` | Camada completa (`fonts` + `tokens` + `base` + `components`) |
| `@voaneves/brand/css/tokens.css` | Custom properties em `@layer vn.tokens` |
| `@voaneves/brand/css/fonts.css` | Faces `.woff2` e fallbacks métricos |
| `@voaneves/brand/css/base.css` | Reset, base, tipografia e utilitários |
| `@voaneves/brand/css/components.css` | Componentes `.vn-*` isolados |
| `@voaneves/brand/tailwind/theme.css` | Tema Tailwind v4 (`@theme inline`) gerado dos tokens |
| `@voaneves/brand/tokens.json` | Valores resolvidos nos dois temas |
| `@voaneves/brand/tokens` | Objeto JS tipado + `.d.ts` |
| `@voaneves/brand/js/*` | Módulos ES (`cursor`, `magnetic`, `reveal`, `theme`, `marquee`, `journey`, `tooltip`, `drawer`) |
| `@voaneves/brand/astro/*` | Componentes fonte `Logo.astro`, `Icon.astro`, `Credit.astro` |
| `@voaneves/brand/icons/*` | 19 SVGs e `sprite.svg` |
| `@voaneves/brand/logo/*` | Variantes canônicas do Conceito B |
| `@voaneves/brand/app-icons/*` | Favicon SVG/ICO e ícones PWA |
| `@voaneves/brand/credit` | Snippet HTML independente |

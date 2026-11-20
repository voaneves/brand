# scripts

Build and check scripts, run through npm scripts.

| Script | npm | Output |
|---|---|---|
| `build-tokens.mjs` | `build:tokens` | `dist/css/tokens.css`, `type.css`, `tokens.js/.d.ts/.json`, board grammar |
| `build-fonts.mjs` | `build:fonts` | subset woff2 and `dist/css/fonts.css` |
| `build-icons.mjs` / `normalize-icons.mjs` | `build:icons` / `normalize:icons` | `dist/icons`, `sprite.svg`, logos, app icons |
| `build-css.mjs` | `build:css` | `dist/css/{base,components,all}.css`, `dist/js/*`, credit snippet |
| `build-tailwind.mjs` | `build:tailwind` | `dist/tailwind/theme.css` (Tailwind v4 `@theme inline`) |
| `build-board.mjs` | `build:board` | `dist/board/` chapters, previews, manifest |
| `build-gallery.mjs` | `build:gallery` | `dist/site/` static gallery for GitHub Pages |
| `check-exports.mjs` | `check:exports` | verifies every `exports` target, layer isolation and the cursor budget |
| `build-templates.py` | (manual) | `templates/*.docx, .pptx, .xlsx` (python-docx, python-pptx, openpyxl, pillow) |

`npm run build` runs the Node scripts in order. `dist/` is ignored by git and rebuilt in CI.

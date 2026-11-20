# Victor Neves brand

Brand identity and design system for Victor Neves: the single source for voaneves.com and other projects. Tokens, CSS, JS, fonts, icons, logo and docs live here and ship as one npm package.

**Status:** pre-1.0, milestone M0 (scaffold). Nothing is published yet. See [PLAN.md](PLAN.md).

Wordmark: **VOANEVES.** with the full stop in Sinal.

## Palette

| Name | Hex | Use |
|---|---|---|
| Tinta | `#0a0a0a` | Ink, dark ground |
| Creme | `#f4ead4` | Paper, light ground |
| Sinal | `#f50000` | Accent (`#ff3838` on dark; `#b80000` as signal-ink). Text on Sinal is always ink. |

## Type

- **Fraunces**: display and editorial headings
- **Schibsted Grotesk**: body and UI text
- **JetBrains Mono**: code, labels and the wordmark

## Folder map

- `tokens/src/`: DTCG token sources (single source of truth)
- `css/src/`: reset, base and `.vn-*` component CSS
- `js/src/`: vanilla ES modules (cursor, reveal, theme, ...)
- `astro/`: Astro components shipped as source
- `fonts/`: font sources and subsetted woff2 files
- `icons/`: normalized SVG icons
- `logo/`: mark, wordmark and lockups
- `app-icons/`: favicon, touch and PWA icons
- `motifs/`: decorative SVG waves
- `board/`: sources for the visual board
- `docs/`: decisions (ADRs), component specs, checklists, [README spec](docs/readme-spec.md)
- `scripts/`: build scripts
- `tests/`: contrast, board, icon and font tests

## Use

Planned: `npm i @voaneves/brand`, then import `@voaneves/brand/css/all.css`.

## Use with Claude Code

This repo is also a Claude Code plugin marketplace. The `voaneves-design-system` plugin gives Claude the tokens, type scale, logo rules and accessibility checks for building in this brand.

```
/plugin marketplace add voaneves/brand
/plugin install voaneves-design-system@voaneves
```

## Links

- [PLAN.md](PLAN.md)
- [docs/decisions/](docs/decisions/)
- [docs/readme-spec.md](docs/readme-spec.md): README layout rules for VOANEVES project repos
- Visual board: https://claude.ai/artifact/AhRNUHwhFocY2hyB45j3Mr (private until shared)

## Licensing

Code: MIT. Fonts: SIL OFL 1.1. Logo, wordmark, motifs and photos: all rights reserved. Details in [LICENSES.md](LICENSES.md).

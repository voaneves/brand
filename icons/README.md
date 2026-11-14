# icons

Normalized SVG icons (`icons/svg/`) and their licenses (`LICENSES.md`).

- Style: solid glyphs, single ink via `currentColor`. Set color with CSS `color`.
- Format: `viewBox="0 0 1024 1024"`, default 24x24, `aria-hidden="true"` (decorative; label the parent control).
- Sizes: 16, 20 or 24 px, always inside a 44 px touch target.
- Arrows are text (`→`), not icons.
- Source paths are kept byte-identical; the script only adds a transform that flips the y-up icon-font coordinates and centers each glyph with at least 64 units of padding.
- Regenerate with `node scripts/normalize-icons.mjs` (or `npm run build:icons`). Set `ICON_SRC` to override the legacy source folder.

# board

Sources for the visual board: one short chapter per topic plus an interactive preview per component.

- `01-marca.md` to `14-performance.md`: brand, essence, color, type, space, motion, icons, components, interaction patterns, voice, accessibility, governance, package architecture and performance (Portuguese).
- `components/<Name>/preview.html`: standalone page that loads `dist/css/all.css`; used by the accessibility tests (`npm run test:a11y`) and the gallery.
- `npm run build:board` copies chapters and previews to `dist/board/` with an `index.json` manifest; `npm run build:gallery` turns them into the static site published at https://voaneves.github.io/brand/.

Chapters must match the tokens (`tests/board-grammar.test.js`); when they disagree, fix the chapter.

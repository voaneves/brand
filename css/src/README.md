# css/src

Source CSS, built into `dist/css/` by `npm run build:css` (cascade layers `vn.reset, vn.tokens, vn.base, vn.type, vn.components, vn.utilities`).

- `reset.css`, `base.css`: reset, document defaults, focus ring, `.vn-container`, `.vn-section`, `.vn-measure`, `.vn-skip-link`.
- `components/*.css`: `.vn-*` components, concatenated into `dist/css/components.css` (`components.css` first, then `forms`, `feedback`, `structure`, `navigation`, `content`).
- Tokens and type utilities are generated from `tokens/src` (`dist/css/tokens.css`, `type.css`); do not hand-edit them.

Rules: components consume `--vn-*` semantic and component tokens only (never `--vn-ref-*`, enforced by the build); states use ARIA/native attributes; every block needs a spec and a preview (`tests/components-coverage.test.js`). See `docs/governance/naming.md`.

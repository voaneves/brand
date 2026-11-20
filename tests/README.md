# tests

- `npm test`: contrast pairs, board grammar, icons, fonts, exports, Tailwind theme (no browser needed).
- `npm run test:a11y`: axe-core (WCAG 2.2 A/AA rules) over every `board/components/*/preview.html` in light and dark, a 390px mobile pass (no horizontal scroll), focus-state checks (Tab through every control: outline >= 2px and contrast), plus keyboard checks (tabs, modal, tooltip, drawer) and a reduced-motion check. Needs Chrome (`CHROME_PATH` to override) and a prior `npm run build`. Runs as the `a11y` job in CI.

# Accessibility checklist (WCAG 2.2 AA)

Use for every new component, pattern or page. Items marked with a test are enforced automatically; the rest are review items.

## Color and contrast

- [ ] Text meets 4.5:1 (normal) or 3:1 (large text, UI components, chart marks) in light and dark. Pairs live in `tests/contrast-pairs.json` and `.github/contrast/contrast.config.json`. *Tests: `tests/contrast.test.js`, the `contrast` workflow, axe `color-contrast`.*
- [ ] No white text on Sinal `#f50000`; text on Sinal is ink. *Test: banned pairs in `contrast.test.js`.*
- [ ] Meaning never depends on color alone (errors have text, charts have labels, active states have a non-color cue).

## Keyboard and focus

- [ ] Everything works with the keyboard; tab order follows the visual order. *Tests: `tests/a11y/keyboard.test.js` (tabs, modal, tooltip, drawer, switch, accordion), `toast.test.js`.*
- [ ] Visible focus: 2px `--vn-focus` outline, offset 4px (2px on inputs, `--vn-focus-on-signal` on Sinal). *Test: `tests/a11y/states.test.js` tabs through every control and checks outline and contrast.*
- [ ] Overlays (modal, drawer) trap focus, close on `Esc` and return focus to the trigger. *Tests: modal and drawer in `keyboard.test.js`.*
- [ ] Hover-revealed content is dismissible (`Esc`), hoverable and persistent (tooltip, WCAG 1.4.13). *Test: tooltip.*
- [ ] Touch targets are at least 44px (40px minimum for buttons; `.vn-icon-btn` 44px).

## Structure and semantics

- [ ] One `<main>`, a `.vn-skip-link`, headings without skipped levels, distinct `aria-label` on each `<nav>`. *Test: axe rules over every preview (light and dark).*
- [ ] Real controls: `<button>` for actions, `<a href>` for navigation, native `<dialog>`, `<details>`, `<select>`, `<progress>` before custom widgets.
- [ ] Forms: visible labels, `aria-describedby` for hints and errors, `aria-invalid="true"` on errors. See `docs/patterns/forms.md`.
- [ ] `<html lang="pt-BR">` or `"en"`; mixed-language passages use `lang`.

## Motion

- [ ] Verified with `prefers-reduced-motion: reduce`: duration tokens become 1ms, cursor off, marquee and skeleton static. *Tests: reduced-motion checks in `keyboard.test.js`.*
- [ ] No auto-moving content longer than 5 seconds without a way to pause (marquee is decorative only; see `docs/components/marquee.md`).

## Reflow and responsive

- [ ] No horizontal page scroll at 390px wide; wide tables scroll inside their own region. *Test: mobile pass in `states.test.js`.*

## Running the checks

```bash
npm run build && npm test && npm run test:a11y
```

`test:a11y` needs Chrome (`CHROME_PATH` to override) and runs in CI as the `a11y` job. Manual screen-reader passes (NVDA, VoiceOver) are not automated.

# js/src

Vanilla ES modules with no dependencies, copied to `dist/js/` and exported as `@voaneves/brand/js/<name>`.

| Module | Export | Purpose |
|---|---|---|
| `theme.js` | `initTheme`, `setTheme`, `toggleTheme` | `data-theme` with `localStorage` (`vn-theme`) and system preference |
| `drawer.js` | `initDrawer` | Accessible drawer: focus trap, `Esc`, inert page, focus return |
| `toast.js` | `createToaster` | Toast queue in a live region, max 2, pauses on hover and focus |
| `tooltip.js` | `initTooltip` | `Esc` dismisses tooltips (WCAG 1.4.13) |
| `cursor.js` | `initCursor` | Custom cursor (fine pointers only; at most 1.5 KB gzip) |
| `magnetic.js` | `initMagnetic` | Magnetic pull on `[data-magnetic]` |
| `reveal.js` | `initReveal` | Scroll reveal with `IntersectionObserver` |
| `marquee.js` | `initMarquee` | Continuous marquee, paused on hover and focus |
| `journey.js` | `initJourney` | Writes `--vn-journey-progress` on `[data-journey]` |

`init*` attaches to existing markup and returns a cleanup function; `create*` returns an object. All motion modules do nothing under `prefers-reduced-motion`. Keyboard behavior is tested in `tests/a11y/`.

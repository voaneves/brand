# Token reference

Values from `tokens/src` (built to `@voaneves/brand/css/tokens.css`). Format: light / dark.

## Reference colors

ink-900 `#1a1a1a`, ink-925 `#141414`, ink-950 `#0a0a0a`, ink-1000 `#000000`, white `#ffffff`, cream-100 `#f4ead4`, cream-200 `#efe4c5`, cream-300 `#e8dec5`, sand-500 `#a69c86`, sand-600 `#8a8170`, sand-700 `#7a705c`, sand-800 `#5c5446`, red-400 `#ff5a5a`, red-450 `#ff3838`, red-500 `#ff2a2a`, red-600 `#f50000`, red-800 `#b80000`.

## Semantic colors

| CSS property | Light | Dark | Usage |
|---|---|---|---|
| `--vn-ink` | `#0a0a0a` | same | Logo black, inverse bands |
| `--vn-ink-soft` | `#1a1a1a` | same | Raised dark surfaces |
| `--vn-cream` | `#f4ead4` | same | Paper ground |
| `--vn-cream-soft` | `#efe4c5` | same | Alternate band |
| `--vn-signal` | `#f50000` | `#ff3838` | Fills, dots, focus; text 24px+ on light only |
| `--vn-signal-2` | `#ff2a2a` | `#ff5a5a` | CTA dot and glow only |
| `--vn-signal-ink` | `#b80000` | `#ff5a5a` | Small red text |
| `--vn-surface` | `#f4ead4` | `#0a0a0a` | Page ground |
| `--vn-surface-soft` | `#efe4c5` | `#141414` | Bands, cards |
| `--vn-surface-raised` | `#ffffff` | `#1a1a1a` | Inputs, popovers |
| `--vn-surface-inverse` | `#0a0a0a` | `#000000` | Inverse chapters |
| `--vn-surface-signal` | `#f50000` | `#ff3838` | Contact band, signal button |
| `--vn-text` | `#0a0a0a` | `#e8dec5` | Text on surface |
| `--vn-text-muted` | `#5c5446` | `#a69c86` | Captions, meta |
| `--vn-text-on-inverse` | `#f4ead4` | `#e8dec5` | Text on inverse |
| `--vn-text-muted-on-inverse` | `#a69c86` | `#a69c86` | Meta on inverse |
| `--vn-text-on-signal` | `#0a0a0a` | `#0a0a0a` | Text on Sinal |
| `--vn-line` | `rgba(10,10,10,.12)` | `rgba(232,222,197,.12)` | Decorative hairlines |
| `--vn-line-strong` | `#7a705c` | `#8a8170` | Borders, outlines (3:1) |
| `--vn-line-on-dark` | `rgba(255,255,255,.14)` | same | Hairlines on inverse |
| `--vn-focus` | signal | signal | 2px ring, offset 4px |
| `--vn-focus-on-signal` | `#0a0a0a` | same | Ring on Sinal |

Charts: `--vn-viz-1` signal, `--vn-viz-2` text, `--vn-viz-3` line-strong, `--vn-viz-grid` line.

## Shadow

| Token | Light | Dark |
|---|---|---|
| `--vn-shadow-pop` | `0 12px 30px -10px rgba(0,0,0,.25)` | same, alpha .6 |
| `--vn-shadow-lift` | `0 12px 24px -8px rgba(0,0,0,.4)` | same, alpha .7 |
| `--vn-shadow-media` | `0 30px 60px -10px rgba(0,0,0,.4)` | same, alpha .7 |
| `--vn-shadow-drawer` | `-20px 0 60px -10px rgba(0,0,0,.4)` | same, alpha .7 |
| `--vn-shadow-signal` | `0 6px 18px -4px rgba(245,0,0,.55)` | `0 6px 18px -4px rgba(255,56,56,.45)` |
| `--vn-shadow-dot` | `0 0 8px rgba(255,42,42,.6)` | `0 0 8px rgba(255,90,90,.6)` |

## Opacity and z-index

Opacity: disabled .45, link-rest .75, glass .7, scrim .6. z-index: raised 2, nav 50, drawer 200, cursor-media 9997, cursor-label 9998, cursor 9999.

## Type styles

Custom properties per style: `--vn-type-<style>-size|line-height|weight|tracking|family|style|transform|opsz`. Styles: hero, display, numeral, h1 to h4, quote, lead, body, body-strong, body-sm, caption, label, tag, micro, wordmark, price, code. See SKILL.md for sizes; numeral is 104 / .9 / 900 italic / -.04em; tag 12 / .2em / 500; micro 11 / .12em / 500; wordmark 12 / .1em / 700; price 20 / 28 / 600 mono. Families: `--vn-font-display` (Fraunces, Georgia, serif), `--vn-font-text` ("Schibsted Grotesk", Arial, sans-serif), `--vn-font-mono` ("JetBrains Mono", monospace).

## Layout

`--vn-layout-pad-x-min` 20px, `-pad-x-max` 64px, `-pad-y-min` 60px, `-pad-y-max` 140px, gutters 16/24/32, `-container-max` 1500px, `-measure` 640px, `-touch-min` 44px.

## Motion

`--vn-ease-out`, `--vn-ease-spring`, `--vn-ease-in-out`; `--vn-dur-press|hover|cursor|line|unveil|page`; `--vn-stagger-line` 80ms; `--vn-scale-press` .94.

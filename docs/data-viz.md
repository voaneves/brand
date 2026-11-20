# Data visualization

Charts follow the brand rule: signal, not noise. One highlighted series in Sinal, the rest in neutrals. Tokens are `--vn-viz-*` (see `tokens/src/sys/color.tokens.json`); both themes are defined, and chart marks are contrast-checked at 3:1 against `surface` (WCAG 1.4.11) in `tests/contrast-pairs.json` and the CI gate.

## Categorical (up to 3 series)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--vn-viz-1` | `#f50000` | `#ff3838` | The series that matters |
| `--vn-viz-2` | `#0a0a0a` | `#e8dec5` | Main comparison |
| `--vn-viz-3` | `#7a705c` | `#8a8170` | Context, benchmark |
| `--vn-viz-grid` | ink 12% | cream 12% | Gridlines, axes |

Rules: three series at most per chart. For more, use small multiples or highlight one series and mute the rest to `--vn-viz-3`. Never rely on color alone: label lines directly, and vary marker shape or dash for series 2 and 3.

## Sequential (one measure, low to high)

Creme mixed toward Tinta in five steps. Higher number = more emphasis in both themes (the ramp reverses in dark, so the highest step is always the strongest against the ground).

| Token | Light | Dark | Contrast on surface (L / D) |
|---|---|---|---|
| `--vn-viz-seq-1` | `#d8cfbc` | `#0a0a0a` | fill only (1.29 / 1.00) |
| `--vn-viz-seq-2` | `#a9a293` | `#42403a` | fill only (2.12 / 1.91) |
| `--vn-viz-seq-3` | `#7a766b` | `#7a766b` | 3.79 / 4.37 |
| `--vn-viz-seq-4` | `#42403a` | `#a9a293` | 8.67 / 7.80 |
| `--vn-viz-seq-5` | `#0a0a0a` | `#d8cfbc` | 16.56 / 12.80 |

Steps 1 and 2 are tints for fills (heatmap low values, bands) and must be paired with a border, value label or the legend; steps 3 to 5 are safe as standalone marks (3:1 or better). Use Sinal (`--vn-viz-1`) on top of a sequential ramp to call out a single value.

## Diverging (above / below a midpoint)

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `--vn-viz-div-neg-2` | `#f50000` | `#ff3838` | Strong negative |
| `--vn-viz-div-neg-1` | `#f4756a` | `#9d2626` | Mild negative (fill) |
| `--vn-viz-div-mid` | `#efe4c5` | `#141414` | Midpoint |
| `--vn-viz-div-pos-1` | `#7f7a6f` | `#797468` | Mild positive |
| `--vn-viz-div-pos-2` | `#0a0a0a` | `#e8dec5` | Strong positive |

Red marks the negative side, ink the positive. Always label the midpoint and state the unit. Colorblind note: the pair differs in lightness as well as hue (red vs near-black), so it survives red-green deficiency; still add +/- signs or direct labels for values near the midpoint.

## Chart anatomy

- Ground: `--vn-surface` or `--vn-surface-soft`; chart text `--vn-text` (axes) and `--vn-text-muted` (ticks, captions) in JetBrains Mono at `label`/`micro` size; titles in Fraunces.
- Gridlines: `--vn-viz-grid`, 1px, horizontal only unless needed. No box around the plot, no 3D, no gradients, no shadows.
- Lines 2px, bars with 4px to 6px radius at the top only, points 8px.
- Numbers use tabular figures; thousands separators by language (see voice-and-tone.md).
- Legend: prefer direct labels at line ends; otherwise a legend above the plot, left-aligned.
- Motion: draw-in under 800ms with `--vn-ease-out`; none under `prefers-reduced-motion`.
- Every chart has a text summary or data table for screen readers.

## Using it

```css
.bar { fill: var(--vn-viz-2); }
.bar--highlight { fill: var(--vn-viz-1); }
.heat-4 { fill: var(--vn-viz-seq-4); }
```

Tailwind v4 (with `@voaneves/brand/tailwind/theme.css`): `fill-viz-1`, `bg-viz-seq-3`, `text-viz-div-neg-2`.

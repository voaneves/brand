---
name: voaneves-design-system
description: Use when building UI, web pages, components, docs, slides, spreadsheets, READMEs, charts or any visual asset in the VOANEVES / Victor Neves brand (Tinta, Creme, Sinal red; Fraunces, Schibsted Grotesk, JetBrains Mono). Gives exact tokens, contrast-safe color pairs, type scale, logo usage rules, motion and accessibility requirements.
---

# VOANEVES design system

Source of truth: https://github.com/voaneves/brand (npm `@voaneves/brand`). Tokens live in `tokens/src` (DTCG). Never invent values; use the ones below or read `@voaneves/brand/tokens.json`.

## Principles

- **Signal, not noise** ("Sinal, não ruído."). One clear signal per view; the rest is silence.
- Two grounds, one accent: Tinta (ink) and Creme (paper), with Sinal red used sparingly: one signal button per view, dots, the wordmark full stop, focus rings.
- Three type families only. No other hues, no decorative gradients, no registered mark or TM next to the name.
- Accessibility is a constraint, not a polish pass (WCAG 2.2 AA).

## Color (light / dark)

Wordmark: **VOANEVES.** with the full stop in Sinal. Core palette:

| Token | Light | Dark | Role |
|---|---|---|---|
| `ink` Tinta | `#0a0a0a` | `#0a0a0a` | Ink, text on Creme |
| `cream` Creme | `#f4ead4` | `#f4ead4` | Paper ground |
| `signal` Sinal | `#f50000` | `#ff3838` | Fills, dots, focus, full stop |
| `signal-ink` | `#b80000` | `#ff5a5a` | Small red text (links, errors) |
| `surface` | `#f4ead4` | `#0a0a0a` | Page ground |
| `surface-soft` | `#efe4c5` | `#141414` | Bands, cards |
| `surface-raised` | `#ffffff` | `#1a1a1a` | Inputs, popovers |
| `surface-inverse` | `#0a0a0a` | `#000000` | Inverse chapters |
| `text` | `#0a0a0a` | `#e8dec5` | Body text |
| `text-muted` | `#5c5446` | `#a69c86` | Captions, meta |
| `text-on-signal` | `#0a0a0a` | `#0a0a0a` | Any text on Sinal, never white |
| `line-strong` | `#7a705c` | `#8a8170` | Input borders, meaningful outlines |

Full table (alphas, shadows, viz, button states) in [references/tokens.md](references/tokens.md).

### Verified contrast (WCAG)

| Foreground on background | Ratio | Use |
|---|---|---|
| Tinta on Creme | 16.56 | Body text |
| Tinta on Creme-soft | 15.63 | Text on cards |
| Muted `#5c5446` on Creme | 6.25 | Captions |
| Muted on Creme-soft / white | 5.89 / 7.47 | Captions |
| signal-ink `#b80000` on Creme | 5.78 | Small red text, links |
| signal-ink on Creme-soft / white | 5.46 / 6.91 | Small red text |
| Tinta on Sinal `#f50000` | 4.60 | All text on red |
| Sinal `#f50000` on Creme | 3.60 | Large text (24px+), fills only |
| Dark text `#e8dec5` on Tinta | 14.79 | Dark-mode body |
| Dark muted `#a69c86` on Tinta | 7.28 | Dark-mode captions |
| Dark signal `#ff3838` on Tinta | 5.54 | Red text on dark |
| `#ff5a5a` on `#141414` | 6.02 | Red text on dark bands |
| `#7a705c` on Creme | 4.09 | Borders and UI only (3:1), never text |

Rules: white text on Sinal is forbidden (4.30). Sinal on Creme only for text 24px and up. Verify new pairs with `npx dtcg-contrast check <fg> <bg>`.

## Typography

- **Fraunces**: display and headings. **Schibsted Grotesk**: body and UI. **JetBrains Mono**: code, labels, the wordmark.
- Scale is √2 from an 18px body. Desktop sizes (fluid `clamp` in CSS):

| Style | Size / line | Weight | Face |
|---|---|---|---|
| hero | 208 / .88 | 900 italic | Fraunces, opsz 144 |
| display | 144 / .9 | 900 italic | Fraunces |
| h1 | 72 / .95 | 900 italic | Fraunces |
| h2 | 52 / 1.0 | 800 | Fraunces, opsz 96 |
| h3 | 36 / 1.1 | 700 | Fraunces, opsz 48 |
| h4 | 26 / 1.2 | 600 | Fraunces, opsz 32 |
| quote | 26 / 1.3 | 400 italic | Fraunces |
| lead | 22 / 32 | 400 | Schibsted Grotesk |
| body | 18 / 28 | 400 | Schibsted Grotesk |
| body-sm | 16 / 24 | 400 | Schibsted Grotesk |
| caption | 14 / 20 | 400 | Schibsted Grotesk |
| label | 12 / 16, .15em | 600, uppercase | JetBrains Mono |
| code | 14 / 22 | 400 | JetBrains Mono |

Labels and tags are uppercase mono with wide tracking. Prices and numbers use tabular figures. Fonts ship as woff2 in `@voaneves/brand/fonts/*` (OFL).

## Spacing, radius, layout

- 8px base, 4px half-step: 4, 8, 12, 16, 24, 32, 40, 48, 64 (beat), 80, 96, 128 (breath), 160, 256 (pause).
- Radius: xs 6, sm 12, md 14 (inputs), lg 20, xl 24 (cards), 2xl 28 (hero/media), pill 999 (buttons, chips), round 50%.
- Container max 1500px, text measure 640px, touch target at least 44px (40px minimum for buttons).

## Logo

Mark: ink disc with an incised italic V and a Sinal dot. Files in `@voaneves/brand/logo/*`: `mark`, `wordmark`, `lockup-horizontal`, `lockup-stacked`, `signature`, each in standard, `-reverse` (white disc on dark) and `-mono` (`currentColor`).

- Clear space: 0.25 of the disc diameter on every side.
- Minimum size: 16px app icon, 24px editorial mark and horizontal lockup; print 8mm disc, 18mm lockup width.
- Light surface: ink disc + `#f50000` dot. Dark surface: reverse. One-color surfaces: mono.
- Don't: recolor, stretch or rotate; add shadows, outlines or effects; put the standard mark on busy imagery or on Sinal; redraw it by hand; add a registered mark or TM.
- The logo is all rights reserved (see LICENSES.md); use only for VOANEVES work.

## Iconography

Solid glyphs, single ink via `currentColor`, 16/20/24px inside a 44px target, `aria-hidden="true"` (label the parent control). Arrows are text (`→`), not icons. Icons: `@voaneves/brand/icons/*`.

## Motion

- Easing: out `cubic-bezier(.22,.61,.36,1)` (default), spring `(.34,1.56,.64,1)` (CTA release), in-out `(.65,0,.35,1)`.
- Durations: press 120ms, hover 250ms, cursor 450ms, line reveal 800ms (stagger 80ms), unveil 1200ms, page 250ms. Press scale .94.
- Under `prefers-reduced-motion: reduce` every `--vn-dur-*` becomes 1ms, the cursor is disabled and marquees are static. Never make meaning depend on motion.

## Accessibility checklist

- Contrast 4.5:1 normal text, 3:1 large text and UI; no white on Sinal.
- Visible focus: 2px solid `--vn-focus`, offset 4px (inputs 2px); ink ring on Sinal.
- Targets at least 44px (`.vn-icon-btn`), 40px minimum elsewhere.
- One `<main>`, a `.vn-skip-link`, no skipped heading levels, real `<button>` for actions.
- Declare `<html lang="pt-BR">` or `"en"`. Test with reduced motion on.

## Consuming it

```bash
npm i @voaneves/brand
```

```css
@import "@voaneves/brand/css/all.css"; /* tokens, fonts, base, components */
```

Also `css/tokens.css`, `css/fonts.css`, `css/base.css`, `css/components.css`, JS modules in `@voaneves/brand/js/*` (cursor, reveal, theme, magnetic, marquee) and Astro components in `@voaneves/brand/astro/*`.

- Custom properties are prefixed `--vn-`: `--vn-signal`, `--vn-surface`, `--vn-text`, `--vn-text-muted`, `--vn-font-display`, `--vn-space-5`, `--vn-radius-xl`, `--vn-dur-hover`, `--vn-type-h2-size`. Colors use `light-dark()`; force a theme with `data-theme="light|dark"` on a root element.
- Components use the `.vn-*` namespace (`.vn-btn--primary`, `.vn-chip`, `.vn-field`, `.vn-navbar`, `.vn-service-card`, `.vn-stat-card`, `.vn-status-pill`). See [references/components.md](references/components.md).
- Tailwind v4: also `@import "@voaneves/brand/tailwind/theme.css"` after `all.css`; utilities are `bg-surface`, `text-text-muted`, `text-signal-ink`, `font-display`, `text-h2`, `rounded-xl`, `shadow-pop`, `ease-out`. The default Tailwind palette is removed.
- Reference tokens, never hard-code hex in components. Outside the web, use the hex values above.

## Writing (voice and tone)

Direct, concrete, honest, warm. Lead with the point; concrete verbs, no superlatives (enterprise, comprehensive, turnkey); never invent numbers; sentence case headings and buttons; one call to action written as a verb; no exclamation marks in UI; pt-BR primary with a direct EN mirror. Fixed line: "Engenheiro mecânico que virou designer e desenvolvedor." UI patterns (empty, error, loading) and PT/EN examples: https://github.com/voaneves/brand/blob/main/docs/voice-and-tone.md

## READMEs

Project READMEs follow the README spec: centered hero with logo, one tagline, at most 2 CTAs, one hire line, at most 4 badges, one divider, no emoji in headings, tables up to 4 columns, contact section and footer. Full rules: https://github.com/voaneves/brand/blob/main/docs/readme-spec.md

## Document templates

Brand templates live in `templates/` of the repo (https://github.com/voaneves/brand/tree/main/templates): `voaneves-document.docx`, `voaneves-presentation.pptx`, `voaneves-sheet.xlsx`. They reference fonts by name, so install Fraunces, Schibsted Grotesk and JetBrains Mono first. When generating Word, PowerPoint or Excel files, reproduce their styles: Fraunces headings, Schibsted Grotesk body, JetBrains Mono code, Tinta/Creme/Sinal palette, logo per the rules above.

# Logo — Concept B (Sinal)

The canonical mark for **voaneves** is **Concept B — Sinal**, a geometric disc monogram combining an incised italic `V` cut at a `3:8` slope with an accented signal dot (`#f50000`).

## Construction Geometry

- **Canvas (`viewBox`):** `0 0 512 512` (primary disc `D = 512`).
- **Outer Disc:** Centered at `(256, 256)` with radius `r = 256`, rendered via even-odd compound path (`M0 256a256 256 0 1 0 512 0a256 256 0 1 0-512 0Z`).
- **Cutout `V`:** Vertices `(142, 148) -> (214, 148) -> (250, 244) -> (286, 148) -> (358, 148) -> (277, 364) -> (223, 364)Z`, yielding outer diagonal slope `dx / dy = 81 / 216 = 3:8`.
- **Signal Dot:** Solid circle at `cx="340" cy="337" r="27"` in brand red (`#f50000` in standard/reverse variants; inherits monochrome ink in mono variant).

## Clear Space & Minimum Sizes

- **Clear space:** Maintain a minimum exclusion zone of `0.25D` (`128` units on the `512` grid) around all sides of the disc and lockups.
- **Minimum size:**
  - **Digital (UI / favicons):** `16px` for app icons (`disc`), `24px` minimum for editorial mark and `lockup-horizontal`.
  - **Print:** `8mm` minimum diameter for the disc mark; `18mm` minimum width for horizontal lockups.

## Color Variants

- **Standard (Light surface):** Ink `#0a0a0a` disc + signal dot `#f50000`.
- **Reverse (Dark surface):** White `#ffffff` disc + signal dot `#f50000`.
- **Monochrome (`mono`):** Uses `currentColor` for single-color embossing, stamps, or constrained surfaces.

## Canonical Asset Inventory (`logo/`)

- `logo/mark.svg`, `logo/mark-reverse.svg`, `logo/mark-mono.svg` — Primary disc mark variants.
- `logo/disc.svg`, `logo/disc-reverse.svg`, `logo/disc-mono.svg` — Package export aliases (`@voaneves/brand/logo/disc*.svg`) identical to `mark*.svg`.
- `logo/wordmark.svg`, `logo/wordmark-reverse.svg`, `logo/wordmark-mono.svg` — Typographic wordmark variants.
- `logo/lockup-horizontal.svg`, `logo/lockup-horizontal-reverse.svg`, `logo/lockup-horizontal-mono.svg` — Horizontal disc + wordmark lockups.
- `logo/lockup-stacked.svg` — Vertical stacked lockup.
- `logo/signature.svg` — Compact editorial colophon signature.

## Auxiliary Brand Motifs (`motifs/`)

- `motifs/services_wave.svg` — Section wave divider for service cards.
- `motifs/timeline_wave.svg` — Section wave divider for career timeline.

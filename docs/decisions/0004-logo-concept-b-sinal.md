# 0004. Logo Concept B (Sinal) adoption

- Status: Accepted
- Date: 2026-11-14

## Context

The original identity relied on a raster bitmap (`logo.webp`, 3500 px) created in GIMP, featuring seven speed stripes on the left arm of a V within a dark disc. The edge had a hand-drawn wobble, the stripe notches were irregular, and the asset was difficult to scale down to small digital viewports (sub-24 px favicons and UI badges) without severe blurring.

In PLAN v2 (Decision 4), full creative freedom was granted to redesign the mark as a clean vector master, dropping the strict pixel-diff constraint. ADR 0002 removed the registered trademark symbol (®) and defined the studio wordmark as "VOANEVES." with a Sinal red full stop (`#f50000`), connecting directly to the core brand essence: "Sinal, não ruído." ("Signal, not noise."). ADR 0002 established that three vector concepts would be explored in M0 and one chosen.

Three vector concepts were constructed on an 8-unit grid (viewBox 512):
- **Concept A (Evolução)**: Regularized 6-row speed-stripe V in a circular disc.
- **Concept B (Sinal)**: A bold V with 3:8 slant and a circular Sinal red full stop (`#f50000`, r = 27) resting on the baseline within a circular disc (r = 256).
- **Concept C (Monograma)**: A monoline "VN." monogram with dimension line on a chamfered square tile.
- **Option D (Legacy direct trace)**: A faithful potrace trace preserving the hand-drawn wobble and irregular notches was also evaluated.

## Decision

Adopt **Concept B (Sinal)** as the canonical brand mark (`M0e = B`).

### Rationale

1. **Conceptual alignment ("Sinal, não ruído.")**: Removing all seven speed stripes is the boldest embodiment of the brand essence. One clear signal; the rest is silence.
2. **Symbiosis with the wordmark**: The circular Sinal full stop mirrors the period in `VOANEVES.` (ADR 0002). The symbol becomes the initial letter plus that exact punctuation mark, unifying mark and wordmark into a single graphic signature.
3. **Multi-scale vector legibility**:
   - At 16 px to 24 px, Concept A's fine speed stripes (16-unit gaps) blur into grey optical vibration.
   - Concept C's technical dimension line disappears below 32 px, and the monoline strokes lose authority.
   - Concept B's heavy silhouette (arm thickness 72, flat bottom 54) remains crisp at 16 px. The Sinal dot functions as an accent from 24 px upwards.
4. **Architecture compatibility**: Concept B preserves the circular disc (r = 256), maintaining compatibility with existing brand layout rules (site nav, mobile headers, favicon, and the `@voaneves/brand/credit` component). Concept C's chamfered square tile conflicted with these rules.
5. **Rejection of Option D**: Keeping the raster wobble and irregular notches impaired SVG rendering precision across device pixel grids without aesthetic benefit.
6. **Multi-variant versatility**:
   - Standard: Tinta disc (`#0a0a0a`), Creme V (`#f4ead4`), Sinal dot (`#f50000`).
   - Reverse: Creme disc (`#f4ead4`), Tinta V (`#0a0a0a`), Sinal dot (`#f50000`).
   - Mono / Single-ink: The Sinal dot is punched out as a transparent circular hole (`fill-rule="evenodd"`), allowing single-color reproduction on dark, light, or pure Sinal (`#f50000`) backgrounds.

### Construction Geometry (viewBox 0 0 512 512)

- **Disc**: True circle, r = 256, center (256, 256).
- **V Glyph**: Bounding box x 142 to 358, y 148 to 364 (216 × 216). Outer and inner edges at 3:8 slope (20.56° off vertical), preserving the angle from the legacy mark. Arm thickness 72, inner counter ends 96 units below the top. Flat bottom width 54 at baseline y = 364.
- **Sinal Dot**: Center (340, 337), radius r = 27 (diameter 54, equal to the flat bottom width). Base of dot rests on baseline y = 364, with 22 units clearance to the right arm.
- **Group (V + Dot)**: Spans x 142 to 367, optically centered on the disc.
- **Clear Space**: 0.25 D (128 units on all sides). Minimum size: 16 px disc.

## Consequences

- Vector assets from `logo/concepts/b-sinal/` are promoted to canonical paths in `logo/` (`mark.svg`, `mark-reverse.svg`, `mark-mono.svg`, wordmarks, and lockups).
- Concept assets in `logo/concepts/` and comparison sheet `logo/concepts/index.html` remain in the repository as design history, with Concept B flagged as accepted.
- Visual board source `board/01-marca.md` is populated with Concept B specifications.
- The 3:8 angle, 54-unit baseline measure, and disc geometry are locked; altering them constitutes a major identity change requiring a new ADR.

# README spec

How every public VOANEVES project README is laid out, so repos read as one family. Distilled from the dtcg-contrast UX review. This brand repo keeps its own README in design-doc tone, but project repos that use the brand follow this spec.

## Hero (centered `<div align="center">`)
1. Language switcher only if the repo has two READMEs: plain text, no flag emoji, `lang` on the other-language link.
2. Project logo via `<picture>` (dark/light) or `<img>` (single theme-safe mark), `width="112" height="112"`, descriptive alt. Each product keeps its own standalone, unique logo (custom mark, mascot, or emblem — do not force a uniform VOANEVES logo frame onto products) so the repository is self-contained.
3. `<h1>` project name, one bold tagline, optional `<sub>` subtitle.
4. At most 2 CTA buttons (`<a><picture><source dark><img light height="40" alt=…></picture></a>`): usually the live demo / landing page plus one action (install, run, open notebook).
5. One hire line: `<p><sub>Need something like this? <a href="https://voaneves.com/en/#contact"><strong>Let's talk →</strong></a></sub></p>` (PT: `Precisa de algo assim? … https://voaneves.com/#contato … Vamos conversar →`).
6. At most 4 badges, only ones that are always correct (no download counters on new packages).
7. One-line text nav to the sections (no `<details>` table of contents).
8. Exactly one divider (`assets/brand/rule-*.svg`) between hero and first section.

## Body
9. First section opens with ONE plain-language sentence saying what the project does for a person.
10. No emoji in `##`/`###` headings (✅ ❌ ⚠️ inside tables are fine).
11. Keep the repo's substance: screenshots, GIFs, results, metrics, usage, credits. Rewrite only for clarity; never invent results or numbers.
12. Tables: ≤ 4 columns so they fit at 390px; stack wide grids as `###` subsections.
13. No overclaims ("enterprise", "comprehensive", "turnkey").
14. Code blocks: lines ≤ 80 chars where possible.
15. Course/bootcamp work: say so honestly in one line (e.g. "Built for the Santander Bootcamp 2023").

## Footer
16. `## Contact` (PT: `## Contato`) with the two CTA buttons (hire + voaneves.com), then `LinkedIn · E-mail` text links.
17. Footer: author mark (`assets/brand/mark-duo.svg`, visible on light and dark, no `<picture>`), license line, "↑ Back to top".

## Mechanics
- Public repos use absolute `https://raw.githubusercontent.com/voaneves/<repo>/<default-branch>/…` URLs for all images; private repos use relative `./…` paths so GitHub renders images while private.
- Preserve line endings: `git diff --stat` shows only intended lines.
- Do not translate single-language repos; keep the README's existing language.

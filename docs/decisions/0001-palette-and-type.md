# 0001. Palette and type families

- Status: Accepted
- Date: 2026-11-14

## Context

The previous identity carried many hues and several type families, which diluted the message ("Sinal, não ruído.") and made contrast hard to guarantee.

## Decision

Three colors only:

- Tinta `#0a0a0a`: ink and dark ground.
- Creme `#f4ead4`: paper and light ground.
- Sinal `#f50000`: the single accent. On dark grounds it lifts to `#ff3838`; as text or borders on light grounds it is `signal-ink` `#b80000`.

Dropped: the decorative hues orange `#ff6b35`, pink `#ff5d9e`, blue `#6ba9ff` and yellow `#f3c043` (2.37, 2.40, 2.01 and 1.41:1 on Creme), plus maroon `#2a0e0e`, the green status dot `#22c55e`, `#c41a1a`, `#d81f1f` (4.25:1 on Creme), `#191d2b` (old manifest) and `#da532c` (old tile color). Reasons: they added noise, had no role in the system and could not all pass the contrast matrix. Text on Sinal is always ink; white and Creme on Sinal stay below 4.5:1 and are banned.

Three type families:

- Fraunces: display and editorial headings.
- Schibsted Grotesk: body and UI text.
- JetBrains Mono: labels, prices, code and the wordmark.

## Consequences

- Fewer tokens, simpler theming, contrast enforced by tests.
- Changing a family or color is a major change (see ADR 0003) and needs a new ADR.

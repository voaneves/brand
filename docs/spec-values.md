# Spec values (from plan v1, still in force)

PLAN.md v2 references these tables but no longer reproduces them. They are the source for `tokens/src`.

## Semantic colors (light / dark)

`{x}` = alias.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `ink` | #0a0a0a | #0a0a0a | Tinta: logo black, inverse bands, text on Creme |
| `ink-soft` | #1a1a1a | #1a1a1a | Raised dark surfaces |
| `cream` | #f4ead4 | #f4ead4 | Creme: paper ground |
| `cream-soft` | #efe4c5 | #efe4c5 | Alternate band, cards on Creme |
| `signal` | #f50000 | #ff3838 | Fills, wordmark full stop, dots, focus ring; text ≥24px only on light grounds (3.60:1); small text OK on Tinta (4.60) and dark grounds (5.54) |
| `signal-2` | #ff2a2a | #ff5a5a | CTA dot & glow only |
| `signal-ink` | #b80000 | #ff5a5a | Small red text (links, errors, section numbers) on surface/soft/raised |
| `surface` | {cream} | {ink} | Page ground |
| `surface-soft` | {cream-soft} | #141414 | Alternate band, cards |
| `surface-raised` | #ffffff | {ink-soft} | Inputs, dropdowns, popovers |
| `surface-inverse` | {ink} | #000000 | Inverse chapters |
| `surface-signal` | {signal} | {signal} | Contact band, signal button |
| `text` | {ink} | #e8dec5 | All text on surface/soft/raised |
| `text-muted` | #5c5446 | #a69c86 | Captions, meta |
| `text-on-inverse` | {cream} | #e8dec5 | Text on inverse |
| `text-muted-on-inverse` | #a69c86 | #a69c86 | Meta on inverse |
| `text-on-signal` | {ink} | {ink} | Every size of text on Sinal, never white |
| `line` | rgba(10,10,10,.12) | rgba(232,222,197,.12) | Decorative hairlines |
| `line-strong` | #7a705c | #8a8170 | Input borders, meaningful outlines (≥3:1) |
| `line-on-dark` | rgba(255,255,255,.14) | rgba(255,255,255,.14) | Hairlines on inverse |
| `focus` | {signal} | {signal} | 2px solid ring, offset 4px (inputs 2px) |
| `focus-on-signal` | {ink} | {ink} | Focus ring on Sinal |
| `viz-1` / `viz-2` / `viz-3` / `viz-grid` | {signal} / {text} / {line-strong} / {line} | same | Charts |

## Type ladder (√2 from 18px body)

Families: display = Fraunces; text = Schibsted Grotesk; mono = JetBrains Mono.

| Group | Style | Size | LH | Weight | Tracking | opsz | Fluid | Sample |
|---|---|---|---|---|---|---|---|---|
| Display | `hero` | 208 | .88 | 900 italic | −.03em | 144 | clamp(5.5rem,13vw,13rem) | VICTOR NEVES |
| Display | `display` | 144 | .9 | 900 italic | −.03em | 144 | clamp(4rem,10vw,9rem) | FALECOMIGO! |
| Display | `numeral` | 104 | .9 | 900 italic | −.04em | 144 | clamp(4rem,8vw,6.5rem) | 40+ |
| Display | `h1` | 72 | .95 | 900 italic | −.025em | 144 | clamp(2.75rem,6vw,4.5rem) | Vamos fazer algo grande? |
| Display | `h2` | 52 | 1.0 | 800 | −.02em | 96 | clamp(2.25rem,4.5vw,3.25rem) | Serviços sob medida pro seu negócio |
| Display | `h3` | 36 | 1.1 | 700 | −.015em | 48 | clamp(1.625rem,2.6vw,2.25rem) | Dashboards & BI |
| Display | `h4` | 26 | 1.2 | 600 | −.01em | 32 | — | Manutenção de site |
| Display | `quote` | 26 | 1.3 | 400 italic | −.005em | 36 | — | "Problema bem resolvido tem assinatura." |
| Text | `lead` | 22 | 32px | 400 | −.005em | — | clamp(1.125rem,1.6vw,1.375rem) | Engenheiro mecânico que virou designer e desenvolvedor. |
| Text | `body` | 18 | 28px | 400 | 0 | — | clamp(1rem,1.2vw,1.125rem) | Faço sites, apps e dashboards para pequenas e médias empresas. |
| Text | `body-strong` | 18 | 28px | 600 | 0 | — | — | A partir de R$ 800, com domínio e hospedagem. |
| Text | `body-sm` | 16 | 24px | 400 | 0 | — | — | Respondo em até 1 dia útil. |
| Text | `caption` | 14 | 20px | 400 | .005em | — | — | Foto: Palmas, TO — 2024 |
| Label | `label` | 12 | 16px | 600 | .15em | — | — | AGENDAR REUNIÃO |
| Label | `tag` | 12 | 16px | 500 | .2em | — | — | 01 — QUEM SOU |
| Label | `micro` | 11 | 16px | 500 | .12em | — | — | FIG. 02 — DASHBOARD SEBRAE |
| Label | `wordmark` | 12 | 16px | 700 | .1em | — | — | VOANEVES. |
| Label | `price` | 20 | 28px | 600 | −.01em | — | — | R$ 1.500 (tabular) |
| Label | `code` | 14 | 22px | 400 | 0 | — | — | const sinal = '#f50000' |

Labels are uppercase except `price` and `code`.

## Spacing (8px base, 4px half-step)

space-1 4 · space-2 8 · space-3 12 · space-4 16 · space-5 24 · space-6 32 · space-7 40 · space-8 48 · space-9 64 (**beat**) · space-10 80 · space-11 96 · space-12 128 (**breath**) · space-13 160 · space-14 256 (**pause**).

Layout: pad-x 20→64px, pad-y 60→140px, gutter-sm 16, gutter-md 24, gutter-lg 32, container-max 1500px, measure 640px, touch-min 44px.

## Radius

xs 6 · sm 12 · md 14 (inputs) · lg 20 · xl 24 (cards) · 2xl 28 (hero/media) · pill 999px · round 50%.

## Shadow (light / dark)

| Token | Light | Dark |
|---|---|---|
| `shadow-pop` | 0 12px 30px -10px rgba(0,0,0,.25) | 0 12px 30px -10px rgba(0,0,0,.6) |
| `shadow-lift` | 0 12px 24px -8px rgba(0,0,0,.4) | 0 12px 24px -8px rgba(0,0,0,.7) |
| `shadow-media` | 0 30px 60px -10px rgba(0,0,0,.4) | 0 30px 60px -10px rgba(0,0,0,.7) |
| `shadow-drawer` | -20px 0 60px -10px rgba(0,0,0,.4) | -20px 0 60px -10px rgba(0,0,0,.7) |
| `shadow-signal` | 0 6px 18px -4px rgba(245,0,0,.55) | 0 6px 18px -4px rgba(255,56,56,.45) |
| `shadow-dot` | 0 0 8px rgba(255,42,42,.6) | 0 0 8px rgba(255,90,90,.6) |

## Opacity and z-index

Opacity: disabled .45 · link-rest .75 · glass .7 · scrim .6.
z-index: raised 2 · nav 50 · drawer 200 · cursor-media 9997 · cursor-label 9998 · cursor 9999.

## Button states (resolves the B1 example)

- **signal** (one per view): bg `surface-signal`, fg `text-on-signal` (ink), ink dot. Hover: bg `ink`, fg `cream`.
- **primary**: bg `ink`, fg `cream`, `signal-2` dot with `shadow-dot`. Hover: bg `signal`, fg `ink` (4.60:1), translateY −1px.
- **secondary**: transparent, 1.5px `text` border, fg `text`.
- **ghost**: text + →, underline on hover.
- Sizes: sm 32 · md 40 (padding 0 18px 0 22px) · lg 48 · xl 56. All radius pill, `label` style.
- Active: scale .94. Focus: 2px `focus`, offset 4px. Disabled: opacity .45.

# 04 — Tipografia

Três famílias cobrem toda a escala do sistema, entregues como subsets `.woff2` com `font-display: swap`.

## Famílias

| Família | Papel | Pesos / Variáveis | Fallback Métrico |
|---|---|---|---|
| **Fraunces** | Display itálico e títulos editoriais | Itálico `700–900` (`opsz 144`), Romano `400–900` | `Fraunces Fallback` (`Georgia`) |
| **Schibsted Grotesk** | Corpo, UI e navegação | Regular e itálico `400–700` | `Schibsted Grotesk Fallback` (`Arial`) |
| **JetBrains Mono** | Rótulos, métricas, preços, código e wordmark | `400–700` | `monospace` |

## Escala Tipográfica (`.vn-type-*`)

- **Display / Hero:** `Fraunces` itálico peso `900`, tracking `-0.03em`, altura de linha compacta (`0.88–0.90`).
- **Títulos (`h1`–`h4`):** Transição de Fraunces editorial para Schibsted Grotesk estrutural em subtítulos.
- **Labels & Tags:** `JetBrains Mono` em caixa alta com tracking amplo (`0.12em–0.2em`).

## Orçamento de Carregamento

- `fraunces-italic-display.woff2` + `schibsted-grotesk.woff2` combinados devem permanecer **<= 60 KB** para preload crítico.

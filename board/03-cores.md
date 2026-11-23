# 03 — Cores

A paleta opera com adaptação nativa via `light-dark()` e atributo `data-theme="light" | "dark"`.

## Tokens Semânticos Principais

| Token | Papel | Modo Claro | Modo Escuro |
|---|---|---|---|
| `--vn-surface` | Superfície base | `#f4ead4` | `#0a0a0a` |
| `--vn-surface-soft` | Superfície secundária | `#efe4c5` | `#141414` |
| `--vn-surface-raised` | Superfície elevada | `#ffffff` | `#1a1a1a` |
| `--vn-surface-inverse` | Bloco invertido | `#0a0a0a` | `#000000` |
| `--vn-surface-signal` | Destaque de ação | `#f50000` | `#ff3838` |
| `--vn-text` | Texto primário | `#0a0a0a` | `#e8dec5` |
| `--vn-text-muted` | Texto secundário | `#5c5446` | `#a69c86` |
| `--vn-text-on-signal` | Texto sobre sinal | `#0a0a0a` | `#0a0a0a` |
| `--vn-signal-ink` | Sinal acessível em texto | `#b80000` | `#ff5a5a` |

## Regras de Contraste

- Texto corrido deve atingir no mínimo **4.5:1** (`WCAG 2.2 AA`).
- Branco (`#ffffff`) sobre vermelho sinal (`#f50000`) é **proibido** para texto por ficar abaixo de 4.5:1; utilize `--vn-text-on-signal` (`#0a0a0a`).

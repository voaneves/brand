# 03 — Cores

A paleta opera com adaptação nativa via `light-dark()` e atributo `data-theme="light" | "dark"`.

## Tokens Semânticos Principais

| Token | Papel | Modo Claro | Modo Escuro |
|---|---|---|---|
| `--vn-surface` | Superfície base | `#fff8f8` | `#0a0a0a` |
| `--vn-surface-soft` | Superfície secundária | `#f7eded` | `#121111` |
| `--vn-surface-raised` | Superfície elevada | `#ffffff` | `#161616` |
| `--vn-surface-inverse` | Bloco invertido | `#0a0a0a` | `#050505` |
| `--vn-surface-signal` | Destaque de ação | `#f50000` | `#ff3838` |
| `--vn-text` | Texto primário | `#0a0a0a` | `#f5ecec` |
| `--vn-text-muted` | Texto secundário | sand-800 | sand-500 |
| `--vn-text-on-signal` | Texto sobre sinal | `#0a0a0a` | `#0a0a0a` |
| `--vn-signal-ink` | Sinal acessível em texto | red-800 | red-400 |

## Regras de Contraste

- Texto corrido deve atingir no mínimo **4.5:1** (`WCAG 2.2 AA`).
- Branco (`#ffffff`) sobre vermelho sinal (`#f50000`) é **proibido** para texto por ficar abaixo de 4.5:1; utilize `--vn-text-on-signal` (`#0a0a0a`).

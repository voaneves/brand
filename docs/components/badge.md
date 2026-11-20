# Badge (`.vn-badge`)

Rótulo curto de estado ou categoria (não interativo). Para disponibilidade com pulso, use `.vn-status-pill`.

## Variantes

| Classe | Visual |
|---|---|
| `.vn-badge` | Contorno `--vn-line-strong`, texto `--vn-text` |
| `--solid` | Fundo `--vn-surface-inverse`, texto `--vn-text-on-inverse`, contorno `--vn-line-strong` |
| `--signal` | Fundo `--vn-surface-signal`, texto `--vn-text-on-signal` (tinta, nunca branco) |

Tipografia `micro` em mono maiúscula. No máximo um `--signal` por tela. O significado vem do texto ("Rascunho", "Publicado", "Novo"), nunca só da cor.

## Teclado e movimento

Não focável; sem animação.

## Contraste

Tinta sobre Sinal 4.60:1 (claro) e 5.54:1 (escuro); `--vn-text-on-inverse` sobre `--vn-surface-inverse` >= 4.5:1.

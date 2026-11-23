# Alert (`.vn-alert`)

Mensagem persistente dentro da página (resultado de ação, aviso, erro). Não bloqueia a navegação.

## Anatomia

- `.vn-alert` (`role="status"` para informação; `role="alert"` para erro): fundo `--vn-surface-soft`, faixa lateral de `4px`.
- `.vn-alert__title`, `.vn-alert__body`, `.vn-alert__close` opcional (`.vn-icon-btn` com `aria-label`).

## Variantes

| Variante | Faixa | Título | Uso |
|---|---|---|---|
| padrão | `--vn-text` | `--vn-text` | Informação, sucesso, aviso |
| `--error` | `--vn-signal` | `--vn-signal-ink` | Falha ou bloqueio |

O sistema não tem verde nem âmbar: o significado vem do texto do título ("Mensagem enviada", "Atenção", "Não foi possível enviar"), nunca só da cor.

## Teclado e leitor de tela

Não recebe foco ao aparecer, exceto erro de envio de formulário (mover o foco ao alerta com `tabindex="-1"`). `.vn-alert__close` é alcançável por `Tab`; `Enter`/`Espaço` fecha.

## Movimento

Sem animação própria.

## Contraste

`--vn-text` e `--vn-signal-ink` sobre `--vn-surface-soft` >= 4.5:1; faixa `--vn-signal` >= 3:1.

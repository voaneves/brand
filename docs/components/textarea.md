# Textarea (`textarea.vn-field__input`)

Texto de várias linhas. Mesma anatomia e tokens do campo (`.vn-field`).

## Anatomia

- `.vn-field` > `label.vn-field__label` (+ `.vn-field__required` com `aria-hidden`) > `.vn-field__hint` > `textarea.vn-field__input` > `.vn-field__error`.
- Altura mínima `120px`, `resize: vertical`, entrelinha de `body-sm`.

## Estados

| Estado | Visual |
|---|---|
| Repouso | Borda `--vn-field-border`, fundo `--vn-surface-raised` |
| Hover | Borda `--vn-text` |
| Foco (`:focus-visible`) | Contorno `2px` `--vn-focus`, offset `2px` |
| Inválido | `aria-invalid="true"`: borda `2px` `--vn-signal-ink`; erro com `aria-describedby` |
| Desativado | Opacidade `--vn-opacity-disabled` |
| Placeholder | `--vn-text-muted`; nunca substitui o rótulo |

## Teclado

`Tab` entra e sai; `Enter` quebra linha (não envia o formulário). Contadores de caracteres só quando há limite real, anunciados com `aria-live="polite"` ao se aproximar do limite.

## Contraste

`--vn-text-muted` (placeholder) sobre `--vn-surface-raised` >= 4.5:1; erro `--vn-signal-ink` >= 4.5:1.

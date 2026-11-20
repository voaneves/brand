# Checkbox (`.vn-check`)

Caixa de seleção nativa (`<input type="checkbox">`) estilizada, com rótulo clicável e alvo de toque de `44px`.

## Anatomia

- `label.vn-check`: contêiner (altura mínima `--vn-layout-touch-min`).
- `input.vn-check__input`: caixa `24px`, borda `--vn-field-border`, raio `--vn-radius-xs`.
- `span.vn-check__label`: texto em `body-sm`.
- Grupo: `fieldset.vn-fieldset` com `legend` (estilo label em mono).

## Estados

| Estado | Visual |
|---|---|
| Repouso | Fundo `--vn-surface-raised`, borda `--vn-field-border` |
| Hover | Borda `--vn-text` |
| Marcado | Fundo `--vn-text`, marca em `--vn-surface` |
| Indeterminado | Igual a marcado, com traço (definir via `input.indeterminate = true`) |
| Foco (`:focus-visible`) | Contorno `2px` `--vn-focus`, offset `2px` |
| Inválido | `aria-invalid="true"`: borda `2px` `--vn-signal-ink`; mensagem em `.vn-field__error` ligada por `aria-describedby` |
| Desativado | Opacidade `--vn-opacity-disabled`, cursor `not-allowed` |

## Teclado

`Tab` entra e sai; `Espaço` alterna. O rótulo clicável usa `<label>` (nunca `div`).

## Movimento

Troca de cor em `--vn-dur-hover`; sob `prefers-reduced-motion` vira `1ms`.

## Contraste

Borda `--vn-field-border` sobre `--vn-surface-raised` >= 3:1; marca `--vn-surface` sobre `--vn-text` >= 3:1; erro `--vn-signal-ink` >= 4.5:1. Pares em `tests/contrast-pairs.json`.

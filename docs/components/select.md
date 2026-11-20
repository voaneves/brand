# Select (`.vn-select`)

Lista suspensa nativa (`<select>`) com seta própria. A lista aberta é do navegador: acessível por padrão em teclado e leitores de tela.

## Anatomia

- `.vn-field` > `label.vn-field__label` + `.vn-select` > `select.vn-field__input` + `.vn-field__hint` / `.vn-field__error`.
- Seta (`::after`) em `--vn-text`, sem ponteiro; altura mínima `--vn-button-height-lg`.

## Estados

| Estado | Visual |
|---|---|
| Repouso | Borda `--vn-field-border`, fundo `--vn-surface-raised` |
| Hover | Borda `--vn-text` |
| Foco (`:focus-visible`) | Contorno `2px` `--vn-focus`, offset `2px` |
| Inválido | `aria-invalid="true"`: borda `2px` `--vn-signal-ink` + `.vn-field__error` |
| Desativado | Opacidade `--vn-opacity-disabled` |

## Teclado

`Tab` foca; `Espaço`, `Enter` ou `Alt+Seta` abre; setas escolhem; `Esc` fecha sem alterar.

## Regras

- Primeira opção vazia com texto de instrução ("Escolha uma faixa") quando o campo é obrigatório.
- Use `select` para 6 ou mais opções; abaixo disso, radio.

## Contraste

Texto `--vn-text` e `--vn-text-muted` sobre `--vn-surface-raised` >= 4.5:1; borda >= 3:1.

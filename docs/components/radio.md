# Radio (`.vn-check`, `type="radio"`)

Seleção única entre opções visíveis. Usa a mesma estrutura do checkbox; o marcador é um ponto Sinal.

## Anatomia

- `fieldset.vn-fieldset` + `legend`: obrigatório para dar nome ao grupo.
- `label.vn-check` > `input.vn-check__input[type=radio]` + `span.vn-check__label`, todos com o mesmo `name`.

## Estados

| Estado | Visual |
|---|---|
| Repouso | Círculo `24px`, borda `--vn-field-border` |
| Hover | Borda `--vn-text` |
| Marcado | Borda `2px` `--vn-text` e ponto `--vn-signal` (o ponto do wordmark) |
| Foco (`:focus-visible`) | Contorno `2px` `--vn-focus`, offset `2px` |
| Inválido | `aria-invalid="true"` no grupo (ou nos inputs): borda `--vn-signal-ink` |
| Desativado | Opacidade `--vn-opacity-disabled` |

## Teclado

`Tab` entra no grupo (item marcado, ou o primeiro); setas movem e marcam; `Espaço` marca o item focado. Esse comportamento é nativo quando os inputs compartilham `name`.

## Quando usar

2 a 5 opções mutuamente exclusivas. Acima disso, use `select`. Uma opção pré-marcada apenas quando há padrão seguro.

## Contraste

Ponto `--vn-signal` sobre `--vn-surface-raised` >= 3:1 (claro e escuro); borda >= 3:1.

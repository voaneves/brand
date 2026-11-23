# Switch (`.vn-switch`)

Liga ou desliga uma opção com efeito imediato (sem botão de enviar). Para escolhas enviadas em formulário, use checkbox.

## Anatomia

- `label.vn-switch` > `input.vn-switch__input[type=checkbox][role=switch]` + texto do rótulo.
- Trilho `44x24px` e botão deslizante; ligado: fundo `--vn-text` e botão `--vn-surface`; desligado: borda `--vn-field-border`. A posição do botão também indica o estado.
- Alvo de toque `44px` (`--vn-layout-touch-min`).

## Estados

Foco `:focus-visible` `2px` `--vn-focus`, offset `2px`; desativado: opacidade `--vn-opacity-disabled`.

## Teclado

`Tab` foca; `Espaço` alterna (testado em `tests/a11y`). O texto do rótulo descreve a opção, não a ação ("Receber novidades por e-mail").

## Movimento

Deslize e cor em `--vn-dur-hover`; `1ms` sob `prefers-reduced-motion`.

## Contraste

Borda e botão `--vn-field-border` sobre `--vn-surface-raised` >= 3:1.

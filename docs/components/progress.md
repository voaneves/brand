# Progress (`.vn-progress`)

Progresso de uma tarefa com duração conhecida, sobre o elemento nativo `<progress>`.

## Anatomia

- `progress.vn-progress[value][max]` com altura `8px`, trilho `--vn-line`, preenchimento `--vn-signal`.
- Sempre com `<label for>` ou `aria-label`; mostre também o valor em texto ("60%") e use o texto interno como alternativa.
- Sem `value` o elemento fica indeterminado: use apenas quando o tempo é desconhecido e explique em texto ("Gerando relatório…").

## Teclado

Não focável (informativo). Atualizações importantes são anunciadas em uma região `role="status"` separada, não a cada 1%.

## Movimento

Largura em `--vn-dur-hover`; `1ms` sob `prefers-reduced-motion`.

## Contraste

Preenchimento `--vn-signal` sobre o trilho >= 3:1.

# Table (`.vn-table`)

Dados tabulares reais (nunca para layout). Cabeçalho em mono, números em mono com algarismos tabulares.

## Anatomia

- `.vn-table-wrap` (`role="region"`, `aria-labelledby` na legenda, `tabindex="0"`): rolagem horizontal em telas estreitas.
- `table.vn-table` > `caption` + `thead` (`th scope="col"`) + `tbody` (`th scope="row"` na primeira célula quando identifica a linha).
- `.vn-table__num`: alinha à direita, `--vn-type-code-family`, `tabular-nums`.
- Ordenação: `th[aria-sort="ascending|descending|none"]` com `button` dentro; seta `↑`/`↓` no estado ativo.

## Visual

Cabeçalho em `--vn-surface-soft` com linha `--vn-line-strong`; linhas separadas por `--vn-line`; hover da linha em `--vn-surface-soft`.

## Teclado

`Tab` alcança a região rolável e os botões de ordenação; `Enter`/`Espaço` ordena e a mudança é refletida em `aria-sort`. Linhas não são interativas por padrão; se forem, a ação fica em um link ou botão na primeira célula.

## Regras

Sempre com `caption`; no máximo 6 colunas em 390px (senão rolagem); unidade no cabeçalho ("Receita (R$)").

## Contraste

`--vn-text` sobre `--vn-surface` e `--vn-surface-soft` >= 4.5:1; linha do cabeçalho `--vn-line-strong` >= 3:1.

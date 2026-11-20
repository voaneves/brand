# Accordion (`.vn-accordion`)

Seções recolhíveis sobre o elemento nativo `<details>`: funciona sem JavaScript e com teclado por padrão.

## Anatomia

- `.vn-accordion` > `details.vn-accordion__item` > `summary.vn-accordion__summary` + `.vn-accordion__panel`.
- Resumo com altura mínima `56px`, sinal `+`/`−` à direita (CSS), linhas `--vn-line-strong`.
- Vários itens podem ficar abertos; para exclusividade use o atributo `name` em todos os `details` (agrupa).
- Para perguntas frequentes e detalhes opcionais; nunca para conteúdo essencial.

## Teclado

`Tab` foca o resumo; `Enter` e `Espaço` abrem e fecham (testado em `tests/a11y`); foco `2px` `--vn-focus`.

## Movimento

Sem animação (abertura imediata), por compatibilidade do `<details>`.

## Contraste

`--vn-text` sobre `--vn-surface` >= 4.5:1; linhas >= 3:1.

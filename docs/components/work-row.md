# Work row (`.vn-work-row`)

Linha de portfólio: título e descrição à esquerda, metadado ou seta à direita. A linha inferior vira Sinal no hover.

## Anatomia

- `.vn-work-row` (grade `1fr auto`, espaçamento vertical `--vn-space-5`, borda `--vn-line`).
- Conteúdo recomendado: `h3` (ou link) com o nome do projeto, `p` curto e, à direita, um `.vn-chip` ou texto `tag`.
- Para linha inteira clicável, o link fica no título e usa `::after` com `inset: 0` (um único alvo e um único foco).

## Estados

Hover: borda inferior `--vn-signal` em `--vn-dur-hover` (indicador decorativo; o foco do link segue `--vn-focus`, `2px`).

## Teclado e movimento

`Tab` alcança o link do título. Sob `prefers-reduced-motion` a troca de cor é imediata.

## Contraste

Texto `--vn-text` e `--vn-text-muted` sobre `--vn-surface` >= 4.5:1; linha `--vn-signal` >= 3:1.

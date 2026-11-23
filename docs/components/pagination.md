# Pagination (`.vn-pagination`)

Navegação entre páginas de uma lista longa. Links reais (`href`), funciona sem JavaScript e a URL é compartilhável.

## Anatomia

- `nav[aria-label="Paginação"]` > `ul.vn-pagination` > `li` > `a`.
- Anterior/Próxima com `rel="prev"` / `rel="next"` e `aria-label` completo ("Página anterior"); números com `aria-label="Página N"`.
- Página atual: `a[aria-current="page"]`, pílula `--vn-surface-inverse` com texto `--vn-text-on-inverse`.
- Reticências: `li.vn-pagination__gap[aria-hidden="true"]`.
- Primeiro, último, atual e vizinhos; números em mono com algarismos tabulares.
- Itens indisponíveis (primeira página sem "Anterior"): `aria-disabled="true"` (opacidade `--vn-opacity-disabled`).

## Estados e teclado

`Tab` percorre os links, `Enter` navega. Alvo mínimo `44px` (`--vn-layout-touch-min`); hover com borda `--vn-line-strong`; foco `2px` `--vn-focus`. Anunciar o total com `role="status"` ("12 projetos").

## Movimento

Hover em `--vn-dur-hover`; sob `prefers-reduced-motion` vira `1ms`.

## Contraste

`--vn-text` sobre `--vn-surface` >= 4.5:1; atual `--vn-text-on-inverse` sobre `--vn-surface-inverse` >= 4.5:1.

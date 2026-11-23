# Empty state (`.vn-empty`)

Estado vazio: título, uma frase e uma ação. Padrão em [patterns/states.md](../patterns/states.md).

## Anatomia

- `section.vn-empty[aria-labelledby]` com borda tracejada `--vn-line-strong`, raio `--vn-radius-xl`, largura máxima `--vn-layout-measure`.
- `.vn-empty__title` (estilo h4, Fraunces), `.vn-empty__body` (`--vn-text-muted`), `.vn-empty__actions` (botões; uma ação primária).
- Distinga primeiro uso, sem resultados e concluído (textos em `patterns/states.md`).

## Teclado

Os botões seguem `Button`. Nenhum foco automático ao aparecer.

## Movimento

Sem animação.

## Contraste

`--vn-text-muted` sobre `--vn-surface` >= 4.5:1; borda tracejada >= 3:1.

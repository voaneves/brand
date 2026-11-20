# Skeleton (`.vn-skeleton`)

Marcador de posição enquanto o conteúdo carrega, com as dimensões do layout final para evitar salto. Padrão em [patterns/states.md](../patterns/states.md).

## Anatomia

- `.vn-skeleton` + `--text` (linha de `1.2em`), `--block` (`120px`, raio `--vn-radius-lg`), `--circle` (`48px`).
- Fundo `--vn-surface-soft`; brilho de `--vn-line` que passa 3 vezes (1600ms, `--vn-ease-in-out`) e para.
- Sempre `aria-hidden="true"`; a região recebe `aria-busy="true"` e um texto `role="status"` ("Carregando projetos…"). Remover `aria-busy` quando o conteúdo chegar.

## Teclado

Não focável.

## Movimento

Sob `prefers-reduced-motion` não há animação nem brilho (testado em `tests/a11y`).

## Contraste

Decorativo; o texto de status `--vn-text` sobre `--vn-surface` >= 4.5:1.

# Nome (`.vn-bloco`)

Uma ou duas frases: o que é, quando usar e quando não usar (com o componente alternativo).

## Anatomia

- `.vn-bloco`: contêiner, elemento HTML recomendado e atributos obrigatórios.
- `.vn-bloco__elemento`: cada parte, com os tokens que consome (`--vn-...`).
- Variantes: `.vn-bloco--variante` e o que muda.

## Estados

| Estado | Visual |
|---|---|
| Repouso | |
| Hover | |
| Foco (`:focus-visible`) | Contorno `2px` `--vn-focus` |
| Ativo / selecionado | |
| Inválido / erro | |
| Desativado | Opacidade `--vn-opacity-disabled` |

## Teclado

Tabela ou lista de teclas (`Tab`, setas, `Enter`, `Espaço`, `Esc`), ordem de foco e onde o foco vai ao abrir e ao fechar. Padrão ARIA seguido (link para o APG quando houver).

## Movimento

Quais propriedades animam, com qual token (`--vn-dur-*`, `--vn-ease-*`) e o que acontece sob `prefers-reduced-motion`.

## Contraste

Pares texto/fundo e UI/fundo usados, com o mínimo (4.5:1 texto, 3:1 UI) e onde estão testados (`tests/contrast-pairs.json`).

## Notas

Limites conhecidos, conteúdo de exemplo (sem números inventados) e links para o padrão em `docs/patterns/`.

---

Checklist para entregar: spec (este arquivo) · CSS em `css/src/components/` · preview em `board/components/<Nome>/preview.html` · linha no capítulo 08 do board · contraste testado · `npm run test:a11y` verde · entrada em `docs/components/README.md`.

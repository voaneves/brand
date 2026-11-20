# Timeline item (`.vn-timeline-item`)

Item de linha do tempo (carreira, histórico). Uma lista de itens com linha vertical e ponto Sinal.

## Anatomia

- `ol` (ou `ul`) de `li.vn-timeline-item`; cada item com data em `tag` mono (`<time datetime>`), título e descrição.
- Linha vertical `--vn-line` à esquerda; ponto `8px` em `--vn-signal` (pseudo-elemento decorativo).
- A ordem é cronológica reversa (mais recente primeiro); a lista usa `ol` para anunciar a sequência.

## Teclado e movimento

Não interativo. O módulo `journey.js` pode expor `--vn-journey-progress` para animar a linha; sob `prefers-reduced-motion` nada se anima.

## Contraste

`--vn-text` e `--vn-text-muted` sobre `--vn-surface` >= 4.5:1; ponto e linha são decorativos.

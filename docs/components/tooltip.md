# Tooltip (`.vn-tooltip`)

Texto curto de apoio a um controle (nome de botão de ícone, atalho). Nunca guarda informação essencial nem elementos interativos.

## Anatomia

- `.vn-tooltip` envolve o gatilho e `.vn-tooltip__content` (`role="tooltip"`, `id`).
- O gatilho aponta para o conteúdo com `aria-describedby` (ou usa `aria-label` igual ao texto).
- Superfície `--vn-surface-inverse`, texto `--vn-text-on-inverse` em `caption`, raio `--vn-radius-sm`, largura máxima `240px`, `z-index` `--vn-z-nav`.

## Comportamento (WCAG 1.4.13)

- Aparece ao `:hover` e ao `:focus-within` do wrapper; permanece enquanto o ponteiro estiver sobre o conteúdo.
- Dispensável: `Esc` esconde sem mover o foco (módulo `@voaneves/brand/js/tooltip.js`, `initTooltip()`); volta quando o ponteiro ou o foco saem e retornam.
- Em telas de toque não há tooltip: o rótulo precisa estar visível ou no `aria-label`.

## Teclado

O gatilho é alcançado por `Tab` e mostra o tooltip ao receber foco; o tooltip em si não é focável.

## Movimento

Opacidade e deslocamento de `4px` em `--vn-dur-hover`; sob `prefers-reduced-motion` a duração é `1ms`.

## Contraste

`--vn-text-on-inverse` sobre `--vn-surface-inverse` >= 4.5:1.

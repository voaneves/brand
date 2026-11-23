# Marquee (`.vn-marquee`)

Faixa horizontal contínua para texto decorativo (tecnologias, clientes). Use `initMarquee()` de `@voaneves/brand/js/marquee.js`.

## Anatomia

- `.vn-marquee[data-marquee]` (opcional `data-marquee-speed` em px/s, padrão 48) > `.vn-marquee__track` com o conteúdo repetido duas vezes (a segunda metade com `aria-hidden="true"`).
- Bordas `--vn-line` acima e abaixo; `overflow: hidden`.

## Comportamento e acessibilidade

- Pausa com o ponteiro sobre a faixa ou com foco dentro dela; não anima sob `prefers-reduced-motion` (fica estática).
- Conteúdo apenas decorativo ou repetido em outro lugar da página. Movimento automático por mais de 5 s exige mecanismo de pausa (WCAG 2.2.2): hoje a pausa é só por hover e foco, então não coloque informação essencial na faixa nem links que só ela contenha.

## Teclado

A faixa não é focável; links dentro dela só se estiverem na metade visível para leitores de tela.

## Contraste

Texto `--vn-text` sobre `--vn-surface` >= 4.5:1.

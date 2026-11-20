# Cursor (`.vn-cursor`)

Cursor customizado de desktop: ponto Sinal e lente seguindo o ponteiro, com rótulo e mídia opcionais. Aprimoramento visual; nunca a única indicação de nada. Use `initCursor()` de `@voaneves/brand/js/cursor.js` (<= 1.5 KB gzip, verificado em teste).

## Anatomia

- `.vn-cursor[aria-hidden="true"]` fixo, `pointer-events: none`, `z-index` `--vn-cursor-z` > `.vn-cursor__dot` (`8px`), `.vn-cursor__lens` (`56px`, `44px` sobre Sinal), `.vn-cursor__label` e `.vn-cursor__media`.
- Gatilhos: `[data-cursor-label="Ver"]` mostra o rótulo; `[data-surface="signal"]` muda a lente para tinta.
- Suavização exponencial (`--vn-cursor-tau-dot` 30 ms, `-lens` 90 ms, `-label` 150 ms).

## Regras

- Desligado em ponteiros grossos (`pointer: coarse`) e sob `prefers-reduced-motion`: o cursor do sistema permanece.
- O cursor nativo não é escondido por padrão; esconda-o apenas se o cursor custom estiver ativo e mantenha o foco de teclado visível.
- Nunca para ocultar ou substituir foco, rótulos ou estados.

## Contraste

Ponto `--vn-signal` e lente `--vn-line-strong` sobre as superfícies >= 3:1; sobre Sinal a lente usa `--vn-ink`.

# 09 — Padrões de Interação

Módulos ES independentes sem dependências externas em `dist/js/*.js`.

## Módulos Disponíveis

- `cursor.js` (`initCursor`): Cursor customizado por suavização exponencial (`tauDot: 30ms`, `tauLens: 90ms`), desativado em ponteiros grossos e movimento reduzido; <= `1.5 KB` gzip.
- `magnetic.js` (`initMagnetic`): Atração magnética sutil em elementos `[data-magnetic]`.
- `reveal.js` (`initReveal`): Revelação progressiva em scroll via `IntersectionObserver`.
- `theme.js` (`initTheme`, `setTheme`, `toggleTheme`): Sincronização entre `localStorage` (`vn-theme`), preferência do sistema e `data-theme`.
- `marquee.js` (`initMarquee`): Faixa contínua pausável via ponteiro ou foco de teclado.
- `toast.js` (`createToaster`): Fila de toasts em região `aria-live`, máximo 2 visíveis, pausa ao passar o mouse ou focar.
- `drawer.js` (`initDrawer`): Gaveta modal com foco preso, `Esc`, página `inert` e retorno de foco.
- `tooltip.js` (`initTooltip`): `Esc` dispensa tooltips abertos (WCAG 1.4.13) até o ponteiro ou o foco saírem.
- `journey.js` (`initJourney`): Exposição da variável `--vn-journey-progress` (`0..1`) conforme scroll.

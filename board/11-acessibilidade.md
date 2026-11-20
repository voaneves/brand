# 11 — Acessibilidade

Conformidade estrutural com **WCAG 2.2 AA** desde os tokens até a entrega HTML.

## Garantias do Sistema

- **Contraste automatizado:** `tests/contrast.test.js` valida pares de texto, superfícies inversas, sinal e foco no CI.
- **Alvos de toque:** Botões `.vn-icon-btn` e `.vn-btn--md`+ respeitam `>= 40px` (`44px` para botões de ícone).
- **Foco visível:** Contorno de `2px` com offset de `4px` em `--vn-focus` (alternando para `--vn-focus-on-signal` sobre fundo vermelho).
- **Navegação por teclado:** `.vn-skip-link` (visível ao receber foco) e estado `aria-invalid="true"` nos campos. `drawer.js` fecha a gaveta com `Escape`, prende o foco, torna o restante da página `inert` e devolve o foco ao botão. `tooltip.js` dispensa tooltips com `Escape`. Teclado de abas, modal e gaveta é testado em `tests/a11y/` (`npm run test:a11y`).
- **Prefers Reduced Motion:** Anula durações e desativa animações contínuas automaticamente.

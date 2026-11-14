# 11 — Acessibilidade

Conformidade estrutural com **WCAG 2.2 AA** desde os tokens até a entrega HTML.

## Garantias do Sistema

- **Contraste automatizado:** `tests/contrast.test.js` valida pares de texto, superfícies inversas, sinal e foco no CI.
- **Alvos de toque:** Botões `.vn-icon-btn` e `.vn-btn--md`+ respeitam `>= 40px` (`44px` para botões de ícone).
- **Foco visível:** Contorno de `2px` com offset de `4px` em `--vn-focus` (alternando para `--vn-focus-on-signal` sobre fundo vermelho).
- **Navegação por teclado:** `.vn-skip-link`, fechamento de gaveta por `Escape` e estados `aria-invalid` / `aria-expanded` explícitos.
- **Prefers Reduced Motion:** Anula durações e desativa animações contínuas automaticamente.

# Checklist de Acessibilidade (WCAG 2.2 AA)

- [ ] **Contraste:** Todo par texto/superfície validado por `tests/contrast.test.js` (`>= 4.5:1` texto normal, `>= 3:1` texto grande/UI). Nenhum texto branco sobre `#f50000`.
- [ ] **Foco visível:** Navegação integral via `Tab` com contorno de `2px` / offset `4px` desobstruído.
- [ ] **Alvos de toque:** Elementos interativos respeitam altura/área mínima >= `40px` (`44px` para `.vn-icon-btn`).
- [ ] **Semântica e Landmarks:** Um `<main>`, skip-link `.vn-skip-link`, cabeçalhos hierárquicos sem saltos e botões reais (`<button>`) para ações.
- [ ] **Movimento reduzido:** Verificado com `prefers-reduced-motion: reduce` ativo (sem scroll suave forçado, cursor desativado, marquee estático).
- [ ] **Idioma:** Atributo `<html lang="pt-BR">` ou `"en"` declarado corretamente.

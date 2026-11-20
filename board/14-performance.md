# 14 — Performance

Orçamentos verificados em teste automatizado para garantir carregamento instantâneo sem regressões visuais.

## Orçamentos Verificados

- **Preload tipográfico crítico:** `fraunces-italic-display.woff2` (`<= 35 KB`) + `schibsted-grotesk.woff2` (`<= 35 KB`), soma total **<= 60 KB**.
- **Cursor interativo (`dist/js/cursor.js`):** <= **1.5 KB** compactado com gzip (`<= 1536 B`).
- **Sprite único de ícones:** `dist/icons/sprite.svg` reúne todos os 19 glifos em requisição única cacheável.
- **CSS em camadas explícitas:** `@layer vn.reset, vn.tokens, vn.base, vn.type, vn.components, vn.utilities` elimina disputas de especificidade sem bloat de seletores.

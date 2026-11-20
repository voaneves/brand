# NavBar (`.vn-navbar`) & Drawer (`.vn-drawer`)

Barra de navegação superior fixa com fundo translúcido e gaveta lateral móvel em superfície inversa.

## Anatomia

- `.vn-navbar` / `.vn-navbar__inner` / `.vn-navbar__brand` / `.vn-navbar__nav` / `.vn-navbar__actions`
- `.vn-drawer` / `.vn-drawer__link` (altura fixa `--vn-drawer-link-height` de `56px`)

## Gaveta acessível (`@voaneves/brand/js/drawer.js`)

```html
<button data-drawer-open aria-controls="drawer" aria-expanded="false">Menu</button>
<aside class="vn-drawer" id="drawer" aria-label="Menu" hidden>
  <button class="vn-icon-btn" data-drawer-close data-drawer-autofocus aria-label="Fechar menu">×</button>
  <nav aria-label="Menu móvel">...</nav>
</aside>
<script type="module">import { initDrawer } from '@voaneves/brand/js/drawer.js'; initDrawer();</script>
```

- Abre pelo botão `[data-drawer-open]`: foco vai para `[data-drawer-autofocus]` (ou o primeiro focável), `aria-expanded="true"` e o resto da página fica `inert`.
- `Tab` e `Shift+Tab` circulam apenas dentro da gaveta; `Esc`, `[data-drawer-close]` ou um link interno (`href="#..."`) fecham; o foco volta ao botão que abriu.
- A gaveta fica fora de `.vn-navbar` (o `backdrop-filter` da barra vira o bloco de contenção de elementos `position: fixed`).
- `.vn-navbar__menu` aparece e os links da barra somem abaixo de `720px`.
- Movimento: entrada por `translateX` em `--vn-drawer-duration` (`450ms`); sob `prefers-reduced-motion` a transição vira `1ms`.

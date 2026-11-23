# astro

Astro components shipped as source (`@voaneves/brand/astro/*`). Astro >= 7 is an optional peer dependency.

| Component | Props | Notes |
|---|---|---|
| `Logo.astro` | `variant` (`mark`, `disc`, `wordmark`, `lockup-horizontal`, `lockup-stacked`, `signature`), `tone` (`default`, `reverse`, `mono`), `label`, `class` | Inline SVG. `reverse` uses the Creme disc on dark grounds; `mono` follows `currentColor` |
| `Icon.astro` | `name`, `size` (24), `label`, `spriteHref`, `class` | References `icons/sprite.svg`. Without `label` it is `aria-hidden`; with `label` it is `role="img"` |
| `Credit.astro` | `variant` (`inline`, `stack`), `lang` (`pt-BR`, `en`), `utmSource`, `class` | The "Feito por voaneves" colophon (`.vn-credit`) |

```astro
---
import Logo from '@voaneves/brand/astro/Logo.astro';
import Icon from '@voaneves/brand/astro/Icon.astro';
---
<Logo variant="lockup-horizontal" />
<button aria-label="Open GitHub"><Icon name="github" /></button>
```

There are no navbar or drawer components: use the `.vn-navbar` / `.vn-drawer` markup and `initDrawer()` (see `docs/components/navbar.md`).

# Pattern: navigation

Wayfinding with the brand components. Principle: signal, not noise. Few destinations, clear labels, one highlighted action.

## Navbar (`.vn-navbar`, `.vn-drawer`)

- Contents: wordmark or lockup at the left (links to home), at most 5 destination links, one signal or primary action at the right ("Falar comigo"), theme toggle optional.
- Labels are nouns or short verbs in sentence case; the current page gets `aria-current="page"` and a visible marker (underline, not color alone).
- Landmarks: `<header>` with `<nav aria-label="Principal">`; a `.vn-skip-link` ("Pular para o conteúdo") is the first focusable element; one `<main>`.
- Small screens: collapse links into `.vn-drawer` opened by a button with `aria-expanded` and `aria-controls`; the button label is "Menu"; links are 56px tall (`--vn-drawer-link-height`); focus returns to the button on close; `initDrawer()` from `@voaneves/brand/js/drawer.js` provides `Esc`, a focus trap, inert background and focus return.
- Sticky header is allowed; it must not cover focused elements (use `scroll-padding-top`).
- Spec: [../components/navbar.md](../components/navbar.md).

## Breadcrumb

For hierarchies of 3 or more levels (docs, case studies). Not on the home page or flat sites.

```html
<nav aria-label="Trilha">
  <ol class="vn-breadcrumb">
    <li><a href="/">Início</a></li>
    <li><a href="/projetos/">Projetos</a></li>
    <li><span aria-current="page">Design system</span></li>
  </ol>
</nav>
```

- Style with the `label` or `caption` type; separator `/` drawn by CSS (`li + li::before`), so it is not read aloud.
- Current page is text, not a link. Links use `--vn-signal-ink` only if they appear in running text; in the trail use `--vn-text-muted` with underline on hover and focus.
- On narrow screens show only the parent level ("← Projetos") to avoid wrapping.
- Spec: [../components/breadcrumb.md](../components/breadcrumb.md).

## Pagination

Use for long lists where users need to return to a position (archives, search results). Prefer "Carregar mais" when order does not matter, and never infinite scroll for content people must reach the footer past.

```html
<nav aria-label="Paginação">
  <ul class="vn-pagination">
    <li><a href="?p=1" rel="prev">Anterior</a></li>
    <li><a href="?p=1">1</a></li>
    <li><a href="?p=2" aria-current="page">2</a></li>
    <li><a href="?p=3">3</a></li>
    <li><a href="?p=3" rel="next">Próxima</a></li>
  </ul>
</nav>
```

- Targets at least 44px (`--vn-layout-touch-min`); numbers in mono with tabular figures; current page has `aria-current="page"` and a filled `--vn-surface-inverse` pill.
- Show first, last, current and its neighbors; ellipsis is text with `aria-hidden`.
- Real links (`href`), so it works without JavaScript and the URL is shareable. Announce results count with `role="status"` ("12 projetos").
- Spec: [../components/pagination.md](../components/pagination.md).

## Footer

- Landmark `<footer>`; three groups at most: navigation (same destinations as the navbar plus legal), contact (e-mail, LinkedIn, GitHub) and the credit.
- Ground: `--vn-surface-inverse`; text `--vn-text-on-inverse`, meta `--vn-text-muted-on-inverse`; hairlines `--vn-line-on-dark`.
- The client-project credit is the `.vn-credit` snippet ("Feito por voaneves") at the bottom, discreet; own pages show the wordmark `VOANEVES.` and the year.
- Links are text links with visible underline on hover and a 44px target; icons (GitHub, LinkedIn) always carry an accessible name.
- Spec: [../components/footer.md](../components/footer.md).
- Include the hire line from the README spec on own project pages: "Precisa de algo assim? Vamos conversar →".

## Links, buttons and focus

- A link goes somewhere (`<a>`); a button does something (`<button>`). Do not style one as the other without reason.
- External links open in the same tab unless the user would lose work; when they open a new tab, say so in the accessible name and add `rel="noopener"`.
- Focus ring: 2px `--vn-focus`, offset 4px (inputs 2px); on Sinal surfaces `--vn-focus-on-signal`.
- Keep link text meaningful out of context ("Ver o estudo de caso", not "Clique aqui").

## Checklist

- [ ] Skip link first; one `<main>`; each `<nav>` has a distinct `aria-label`.
- [ ] Current location marked with `aria-current` and a non-color cue.
- [ ] Everything works with keyboard only; drawer and dialogs return focus.
- [ ] Targets at least 44px; no horizontal scroll at 390px.
- [ ] Labels checked against the voice guide.

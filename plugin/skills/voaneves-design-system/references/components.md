# Components

Namespaced `.vn-*`, styled by `css/components.css`. Specs live in `docs/components/` of the repo. Always compose with tokens.

## Button `.vn-btn`

Pill, label type. Variants `--primary`, `--secondary`, `--signal`, `--ghost`; sizes `--sm` 32, `--md` 40, `--lg` 48, `--xl` 56.

- **signal** (one per view): bg `--vn-surface-signal`, fg ink, ink dot. Hover: bg ink, fg cream.
- **primary**: bg ink, fg cream, `--vn-signal-2` dot with `--vn-shadow-dot`. Hover: bg signal, fg ink, translateY -1px.
- **secondary**: transparent, 1.5px `--vn-text` border.
- **ghost**: text with arrow, underline on hover.
- Active: scale .94. Focus: 2px `--vn-focus`, offset 4px. Disabled: opacity .45.
- Optional `.vn-btn__dot` 8px indicator.

## Other components

- `.vn-chip` (32px pill), `.vn-icon-btn` (44px), `.vn-field` (border `--vn-line-strong`, invalid border `--vn-signal-ink`), `.vn-navbar`, `.vn-drawer`, `.vn-status-pill` (8px signal dot, pulse 3x 1600ms), `.vn-service-card`, `.vn-stat-card`, `.vn-timeline-item`, `.vn-work-row`, `.vn-marquee`, `.vn-credit`, `.vn-cursor` (custom cursor, disabled under reduced motion).
## States and content

- `.vn-skeleton` (`--text|--block|--circle`, aria-hidden, shimmer 3x then stops; region `aria-busy`); `.vn-empty` (`__title/__body/__actions`); `.vn-badge` (`--solid|--signal`, text carries meaning); `label.vn-switch > input.vn-switch__input[role=switch]`; `progress.vn-progress` (always labelled); `.vn-accordion > details.vn-accordion__item > summary.vn-accordion__summary + .vn-accordion__panel`.

## Navigation

- Drawer: `button[data-drawer-open][aria-controls]` + `aside.vn-drawer[hidden]` outside the navbar; `initDrawer()` from `@voaneves/brand/js/drawer.js` gives Esc, focus trap, inert page, focus return.

- `nav > ol.vn-breadcrumb > li > a` (current: `span[aria-current=page]`); `nav > ul.vn-pagination > li > a` (current `aria-current=page`, `.vn-pagination__gap` for the ellipsis, real links); `footer.vn-footer > .vn-footer__inner` with `.vn-footer__title`, `.vn-footer__list`, `.vn-footer__link`, `.vn-footer__meta`.

## Form controls

- `.vn-field` + `.vn-field__label`, `.vn-field__input` (input, `textarea.vn-field__input`), `.vn-field__hint`, `.vn-field__error`, `.vn-field__required`. Invalid: `aria-invalid="true"` (2px `--vn-signal-ink` border) + `aria-describedby` to the error.
- `.vn-select > select.vn-field__input` (native select, custom chevron).
- `.vn-check > input.vn-check__input[type=checkbox|radio] + .vn-check__label`; group with `fieldset.vn-fieldset > legend`. Radio dot is Sinal.
- Focus ring on controls: 2px, offset 2px. Disabled: opacity .45.

## Feedback

- `.vn-alert` (`role=status`) with `.vn-alert__title/__body/__close`; `--error` uses a Sinal rule and signal-ink title (`role=alert`). No green or amber: meaning comes from the title text.
- `.vn-toast` inside `.vn-toast-region[aria-live=polite]`: inverse surface, one action max, 6 s, pause on hover/focus, never for errors. `createToaster()` from `@voaneves/brand/js/toast.js` handles the region, max 2 visible plus a queue, and the pausing.

## Structure

- `.vn-table-wrap[role=region][tabindex=0] > table.vn-table` with `caption`, `th scope`, `.vn-table__num`, sortable `th[aria-sort] > button`.
- `.vn-tabs__list[role=tablist] > .vn-tabs__tab[role=tab]` + `.vn-tabs__panel[role=tabpanel]`; arrows/Home/End, roving tabindex, selected indicator in Sinal.
- `dialog.vn-modal` opened with `showModal()`; `form[method=dialog].vn-modal__actions`; autofocus the safe action.
- `.vn-tooltip > trigger + .vn-tooltip__content[role=tooltip]` with `aria-describedby`; `initTooltip()` from `@voaneves/brand/js/tooltip.js` makes `Esc` dismiss it.
- Always: focus-visible, 44px targets, reduced motion handled by `--vn-dur-*`.

- Full specs: https://github.com/voaneves/brand/tree/main/docs/components

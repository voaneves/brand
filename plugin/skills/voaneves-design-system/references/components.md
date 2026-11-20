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
- Full specs: https://github.com/voaneves/brand/tree/main/docs/components

# docs/components

Component spec cards. Each card lists anatomy, tokens, states, keyboard behavior, motion and contrast. Interactive previews live in `board/components/<Name>/preview.html`.

| Group | Components |
|---|---|
| Actions and navigation | [button](button.md), [navbar](navbar.md), [breadcrumb](breadcrumb.md), [pagination](pagination.md), [footer](footer.md) |
| Form controls | [field](field.md), [textarea](textarea.md), [select](select.md), [checkbox](checkbox.md), [radio](radio.md), [switch](switch.md) |
| Feedback | [alert](alert.md), [toast](toast.md), [status-pill](status-pill.md), [badge](badge.md), [progress](progress.md), [skeleton](skeleton.md), [empty-state](empty-state.md) |
| Structure | [table](table.md), [tabs](tabs.md), [modal](modal.md), [tooltip](tooltip.md), [accordion](accordion.md) |
| Content | [service-card](service-card.md), [stat-card](stat-card.md), [credit](credit.md) |

Rules: consume semantic and component tokens only (never `--vn-ref-*`), focus ring `2px` `--vn-focus`, touch target at least `44px`, all motion uses `--vn-dur-*` (becomes `1ms` under `prefers-reduced-motion`).

# Pattern: empty, error and loading states

Every view has three non-happy states. Design them on purpose: say what is happening, then the next step. Microcopy follows [voice-and-tone.md](../voice-and-tone.md): direct, calm, no exclamation marks, no blame.

Components: [skeleton](../components/skeleton.md), [empty-state](../components/empty-state.md), [progress](../components/progress.md), [alert](../components/alert.md).

## Empty

A list, table or dashboard with nothing to show yet.

- Structure: a short title, one sentence of explanation, one action. Left-aligned inside the container; no illustration required (the mark may sit above at 24px or larger, in standard or mono form).
- Distinguish first-use ("nothing yet") from no-results ("nothing matches") and from cleared ("all done").

| Case | Title (PT / EN) | Next step |
|---|---|---|
| First use | Nenhum projeto ainda. / No projects yet. | Criar o primeiro projeto / Create the first project |
| No results | Nada encontrado para "dashboards". / Nothing found for "dashboards". | Limpar filtros / Clear filters |
| Completed | Tudo em dia. / All caught up. | none |

## Error

Choose the surface by scope.

| Scope | Component | Behavior |
|---|---|---|
| One field | `.vn-field__error` | See [forms.md](forms.md) |
| One action (save failed) | `.vn-alert--error` (`role="alert"`) | Keep the user's data; offer retry |
| Passive background failure | `.vn-alert` neutral or toast | Do not interrupt |
| Whole page (404, 500, offline) | Page-level block | Title, cause in one line, one way out |

Page-level pattern: `h1` in Fraunces (`h2` size), one sentence, a primary button ("Voltar ao início") and, for 5xx, a retry. Never show stack traces or raw codes as the message; put the code in `micro` mono below ("Erro 404").

| Case | PT | EN |
|---|---|---|
| 404 | Página não encontrada. O endereço pode ter mudado. | Page not found. The address may have changed. |
| 500 | Algo deu errado do nosso lado. Tente de novo em instantes. | Something went wrong on our side. Try again in a moment. |
| Offline | Sem conexão. Suas alterações serão enviadas quando voltar. | No connection. Your changes will be sent when it returns. |
| Permission | Você não tem acesso a esta página. | You do not have access to this page. |

## Loading

- Under 1 s: show nothing. 1 to 4 s: a skeleton or an inline status. Over 4 s: a status plus what is happening, and progress if it is known.
- Skeleton: blocks in `--vn-surface-soft` with the final layout's dimensions to avoid layout shift. Do not animate infinitely; if a shimmer is used it stops under `prefers-reduced-motion` and after 3 iterations like `.vn-status-pill`.
- Button action: keep the button, set `aria-disabled="true"`, label becomes the gerund ("Enviando…").
- Announce changes with `aria-busy="true"` on the region while loading and `role="status"` for the text; remove `aria-busy` when content arrives.
- Never block the whole page with a spinner when part of the content can render.

| Case | PT | EN |
|---|---|---|
| Inline | Carregando projetos… | Loading projects… |
| Long task | Gerando relatório. Isso leva cerca de 30 segundos. | Building the report. This takes about 30 seconds. |
| Saved | Salvo. | Saved. |

## Checklist

- [ ] Each state names the situation and the next step in one or two lines.
- [ ] No state relies on color alone; errors have text.
- [ ] Focus is managed (moved to the error summary or the first invalid field; kept on the triggering button during loading).
- [ ] Layout does not shift when content replaces a skeleton.
- [ ] Copy checked in PT and EN against the voice guide.

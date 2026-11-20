# Tabs (`.vn-tabs`)

Alterna painéis no mesmo contexto. Não use para navegação entre páginas (use links).

## Anatomia

- `.vn-tabs__list` (`role="tablist"`, `aria-label`) com botões `.vn-tabs__tab` (`role="tab"`, `aria-selected`, `aria-controls`).
- `.vn-tabs__panel` (`role="tabpanel"`, `aria-labelledby`, `tabindex="0"`, `hidden` quando inativo).

## Estados

| Estado | Visual |
|---|---|
| Repouso | Texto `--vn-text-muted`, alvo de `44px` |
| Hover | Texto `--vn-text` |
| Selecionada | Texto `--vn-text`, linha inferior `3px` `--vn-signal` |
| Foco (`:focus-visible`) | Contorno `2px` `--vn-focus`, offset interno |

## Teclado (padrão ARIA, ativação automática)

`Tab` entra na aba selecionada (as demais têm `tabindex="-1"`); `←`/`→` movem e ativam, com volta ao fim/início; `Home`/`End` vão à primeira/última; `Tab` seguinte vai ao painel.

## Movimento

Troca de cor e linha em `--vn-dur-hover`; sem animação de painel. Sob `prefers-reduced-motion` a duração é `1ms`.

## Regras

2 a 6 abas com rótulos curtos; a primeira vem selecionada; a lista rola na horizontal em telas estreitas.

## Contraste

`--vn-text-muted` sobre `--vn-surface` >= 4.5:1; indicador `--vn-signal` >= 3:1.

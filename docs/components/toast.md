# Toast (`.vn-toast`)

Confirmação rápida e não bloqueante ("Projeto excluído. Desfazer"). Não usar para erros que exigem ação nem para informação crítica.

## Anatomia

- `.vn-toast-region`: contêiner fixo (canto inferior esquerdo), `role="status"` e `aria-live="polite"`, `z-index` `--vn-z-drawer`.
- `.vn-toast`: superfície `--vn-surface-inverse`, texto `--vn-text-on-inverse`, raio `--vn-radius-lg`, sombra `--vn-shadow-lift`.
- `.vn-toast__message` e `.vn-toast__action` (no máximo uma ação, texto verbo).

## Comportamento

- Some após 6 s (mais se houver ação); pausa ao passar o mouse ou receber foco.
- Erros não usam toast: use `.vn-alert--error`.
- No máximo 2 toasts empilhados.
- A região deve existir no DOM antes da mensagem para o leitor de tela anunciar.

## Teclado

`Tab` alcança a ação enquanto o toast está visível; `Enter`/`Espaço` aciona. O foco não é movido automaticamente.

## Movimento

Entra com opacidade e `translateY(8px)` em `--vn-dur-hover`; sob `prefers-reduced-motion` a duração é `1ms`.

## Contraste

`--vn-text-on-inverse` sobre `--vn-surface-inverse` >= 4.5:1; foco `--vn-signal` sobre inverso >= 3:1.

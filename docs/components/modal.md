# Modal (`.vn-modal`)

Diálogo que exige decisão ou entrada antes de continuar. Usa o elemento nativo `<dialog>` aberto com `showModal()`: o navegador cuida de foco preso, `Esc`, camada superior (`top layer`) e `inert` no resto da página.

## Anatomia

- `dialog.vn-modal` com `aria-labelledby` (título) e `aria-describedby` (corpo).
- `.vn-modal__title` (estilo h3), `.vn-modal__body`, `form[method=dialog].vn-modal__actions` com os botões.
- Fundo: `::backdrop` em `--vn-ink` a `--vn-opacity-scrim`. Superfície `--vn-surface-raised`, raio `--vn-radius-xl`, sombra `--vn-shadow-media`, largura máxima `560px`.

## Uso

```js
document.querySelector('#open').addEventListener('click', () => dlg.showModal());
```

Botões dentro de `form[method=dialog]` fecham o diálogo; `dlg.returnValue` traz o `value` do botão.

## Teclado

Ao abrir, o foco vai ao elemento com `autofocus` (a ação segura, "Cancelar", em confirmações destrutivas) ou ao primeiro focável; `Tab` circula só dentro do diálogo; `Esc` fecha; ao fechar, o foco volta ao botão que abriu. O fundo da página não rola (`body:has(.vn-modal[open])`).

## Movimento

Entrada com opacidade e `translateY(12px)` em `--vn-dur-hover`; sob `prefers-reduced-motion` a duração é `1ms`.

## Regras

Título que diz a ação ("Excluir este projeto?"); botões com verbo e objeto; no máximo uma ação primária; não empilhar modais; não usar para mensagens informativas (use alert ou toast).

## Contraste

`--vn-text` sobre `--vn-surface-raised` >= 4.5:1; botões seguem as regras de `Button`.

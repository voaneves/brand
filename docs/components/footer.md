# Footer (`.vn-footer`)

Rodapé em superfície inversa com até três grupos: navegação, contato e chamada. Padrão de uso em [patterns/navigation.md](../patterns/navigation.md).

## Anatomia

- `footer.vn-footer` > `.vn-container` > `.vn-footer__inner` (grade `auto-fit`, mínimo `200px`) e `.vn-footer__meta`.
- Grupos com `h2.vn-footer__title` (estilo label, `--vn-text-muted-on-inverse`) e `ul.vn-footer__list` > `a.vn-footer__link` (alvo `44px`, sublinhado no hover).
- Navegação dentro de `nav[aria-label="Rodapé"]` (rótulo distinto do menu principal).
- Chamada: texto curto e um botão `.vn-btn--signal` (um sinal por tela; em páginas que já têm um, use `--primary`).
- `.vn-footer__meta`: linha `--vn-line-on-dark`, texto `micro` em mono (wordmark e ano, ou o crédito `.vn-credit` em projetos de clientes).

## Estados e teclado

`Tab` na ordem visual; foco `--vn-focus` (sinal) visível sobre o fundo inverso. Ícones sociais sempre com nome acessível.

## Movimento

Sem animação.

## Contraste

`--vn-text-on-inverse` e `--vn-text-muted-on-inverse` sobre `--vn-surface-inverse` >= 4.5:1; foco sobre inverso >= 3:1.

# Contribuindo

`@voaneves/brand` é a fonte única de tokens, CSS, JS, ícones, logo e documentação da marca VOANEVES. Mudanças pequenas e bem verificadas entram mais rápido do que mudanças grandes.

## Ambiente

- Node.js 24 (`.nvmrc`) e npm.
- `npm ci`, depois `npm run build` (tokens, fontes, ícones, CSS, tema Tailwind, board, galeria).
- `npm test` roda contraste, board, fontes, ícones, exports, Tailwind, galeria e cobertura de componentes.
- `npm run test:a11y` roda axe, teclado, foco, 390px e movimento reduzido nos previews (precisa do Chrome; `CHROME_PATH` para apontar outro).

## Onde mexer

| Quero | Edite | Depois |
|---|---|---|
| Token | `tokens/src/{ref,sys,component}` (DTCG) | `npm run build`; novo par de cor entra em `tests/contrast-pairs.json` e `.github/contrast/contrast.config.json` |
| Componente | `css/src/components/*.css` | Spec em `docs/components/<nome>.md` (modelo: `_template.md`), preview em `board/components/<Nome>/preview.html`, capítulo 08 do board |
| Comportamento (JS) | `js/src/<nome>.js` | Teste em `tests/a11y/`, linha no capítulo 09 do board e em `docs/components` |
| Ícone | `icons/` e `scripts/build-icons.mjs` | Licença em `icons/LICENSES.md` |
| Logo | Só com ADR | Veja `docs/03-logo.md` |
| Padrão de uso | `docs/patterns/` | Voz conforme `docs/voice-and-tone.md` |

Convenções de nomes: [docs/governance/naming.md](docs/governance/naming.md). Remoções e renomeações: [docs/governance/deprecation.md](docs/governance/deprecation.md).

## Regras que não mudam

- Componentes consomem tokens `sys` e `component`; nunca `--vn-ref-*`.
- Nenhum valor de cor, tamanho ou duração fora dos tokens. Nenhum texto branco sobre Sinal.
- Todo componente interativo especifica teclado, foco visível (`2px`), alvo de `44px` e movimento reduzido, e passa em `npm run test:a11y`.
- Não invente números, métricas ou textos de cliente nos exemplos.
- Decisões de marca ou arquitetura viram ADR em `docs/decisions/` (modelo `0000-template.md`).

## Commits e PRs

- [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `perf:`, `test:`, `ci:`, `chore:`). O release-please gera versão e changelog a partir deles; o título do PR segue o mesmo formato.
- Um assunto por commit. `feat` para adição compatível (MINOR), `fix` para correção (PATCH), `feat!` ou rodapé `BREAKING CHANGE:` para quebra (MAJOR, ver ADR 0003).
- Preencha a lista do PR (`.github/pull_request_template.md`). Se for uma proposta de marca, use o modelo de issue "Proposta de Mudança de Marca".

## Licenças

Código MIT; fontes OFL; logo, wordmark, motivos e fotos com todos os direitos reservados (`LICENSES.md`). Ao contribuir você concorda que o código segue a MIT.

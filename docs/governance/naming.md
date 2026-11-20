# Convenções de nomes

## Tokens

- Três camadas: `ref` (primitivos, privados), `sys` (papéis semânticos) e `component` (por componente). Componentes só usam `sys` e `component`.
- CSS: `--vn-<papel>[-<variação>]`, sempre minúsculas com hífen. A categoria `color` é omitida (`--vn-signal`, não `--vn-color-signal`). Primitivos: `--vn-ref-<família>-<passo>` (`--vn-ref-red-600`).
- Papéis de cor descrevem uso, não aparência: `surface`, `text`, `line`, `signal`, `focus`. O sufixo `-on-<fundo>` indica o fundo (`text-on-signal`); `-soft`, `-raised`, `-inverse` indicam nível.
- Escalas: espaço numerado `--vn-space-1..14` (e apelidos `beat`, `breath`, `pause`), raio por tamanho (`xs` a `2xl`, `pill`, `round`), tipografia por estilo (`--vn-type-<estilo>-<propriedade>`).
- Tokens de componente: `--vn-<componente>-<parte>-<propriedade>[-<estado>]` (`--vn-button-primary-bg-hover`).
- Valores de dados: `--vn-viz-*` (`seq`, `div`).

## Classes CSS

- Prefixo `vn-`; BEM enxuto: `.vn-bloco`, `.vn-bloco__elemento`, `.vn-bloco--modificador`. Um nível de elemento (`__a__b` não existe).
- Estados por atributo ARIA ou nativo, não por classe: `[aria-invalid="true"]`, `[aria-selected="true"]`, `[aria-current="page"]`, `[hidden]`, `[open]`, `:disabled`.
- Utilitários de tipografia: `.vn-type-<estilo>`; layout: `.vn-container`, `.vn-measure`, `.vn-section`.
- Todo bloco `.vn-*` tem spec e preview (garantido por `tests/components-coverage.test.js`).

## JavaScript

- Arquivos `js/src/<nome>.js` em minúsculas; um assunto por módulo, sem dependências.
- `init<Nome>(...)` liga comportamento a marcação existente e devolve a função de limpeza; `create<Nome>(...)` devolve um objeto com métodos (`createToaster`).
- Atributos de gancho: `data-<componente>-<ação>` (`data-drawer-open`, `data-marquee`, `data-cursor-label`).

## Arquivos e documentação

- Specs: `docs/components/<nome-em-kebab>.md`; previews: `board/components/<NomePascal>/preview.html`; padrões: `docs/patterns/<tema>.md`; ADRs: `docs/decisions/NNNN-<assunto>.md`.
- Ícones: `kebab-case.svg`; logo: `<tipo>[-<variante>].svg` (`mark-reverse.svg`).
- Commits: Conventional Commits em inglês ou português, escopo curto (`feat(drawer): ...`).

## Texto

Termos do sistema em inglês nos nomes de código (`signal`, `surface`); textos de interface e docs em pt-BR com espelho em inglês quando público (ver `docs/voice-and-tone.md`). "Sinal" (Sinal, não ruído) é o nome da cor em prosa; `signal` é o nome do token.

# Breadcrumb (`.vn-breadcrumb`)

Trilha de localização para hierarquias de 3 ou mais níveis. Padrão de uso em [patterns/navigation.md](../patterns/navigation.md).

## Anatomia

- `nav[aria-label="Trilha"]` > `ol.vn-breadcrumb` > `li` com `a` (níveis anteriores) e `span[aria-current="page"]` (página atual, sem link).
- Separador `/` desenhado por CSS (`li + li::before`) com texto alternativo vazio, para não ser lido.
- Tipografia `caption`; links em `--vn-text-muted`, hover com sublinhado e `--vn-text`; página atual em `--vn-text`.

## Estados e teclado

`Tab` percorre os links; foco visível `2px` `--vn-focus`; alvo de toque de `44px` de altura. Quebra em várias linhas quando necessário.

## Movimento

Sem animação.

## Contraste

`--vn-text-muted` e `--vn-text` sobre `--vn-surface` >= 4.5:1 (claro e escuro).

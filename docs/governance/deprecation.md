# Política de depreciação

Complementa o semver do ADR 0003 e o capítulo 12 do board: nada some sem aviso, e a remoção só acontece em MAJOR.

## O que é público

Tokens `sys` e `component` (`--vn-*`), classes `.vn-*`, exports JS (`init*`, `create*`), caminhos em `exports` do `package.json`, ícones, arquivos de logo e o contrato de marcação dos componentes (atributos `data-*`, papéis ARIA). Tokens `ref` são privados e podem mudar em MINOR.

## Ciclo

1. **Anúncio (MINOR):** o item continua funcionando e passa a ser marcado como depreciado, com substituto indicado.
   - Token: `"$deprecated": true` e `$description` com "Use `--vn-novo`" (DTCG).
   - Classe ou atributo: nota "Depreciado" no spec do componente e linha no `CHANGELOG`.
   - JS: `console.warn` uma vez por página, com o nome do substituto.
   - O alias antigo continua gerado a partir do novo (ex.: `--vn-antigo: var(--vn-novo)`).
2. **Carência:** no mínimo 2 versões MINOR e 90 dias, o que for maior.
3. **Remoção (MAJOR):** só na próxima versão MAJOR, listada em "BREAKING CHANGES". Um ADR registra a decisão quando afeta a marca.

## Exceções

- **Segurança ou acessibilidade:** pode corrigir comportamento em PATCH mesmo que mude a aparência, desde que o contrato de marcação continue válido (ex.: cor que não atinge o contraste).
- **Valores de token** (cores, tamanhos) podem mudar em MINOR se os pares de contraste continuarem passando; renomear ou remover não pode.

## Como comunicar

Mensagem de commit `feat(escopo): depreca X em favor de Y`, entrada no `CHANGELOG` (seção "Novidades"), nota no spec e, se houver consumidores conhecidos (voaneves.com), issue com prazo.

# 01. Marca

Documentação da marca oficial e do símbolo vetorial adotado para o sistema de identidade visual de Victor Neves / VOANEVES.

## Arquitetura de Marca

| Camada | Nome | Função | Aplicação |
|---|---|---|---|
| Master brand | **Victor Neves** | A pessoa: autoria, confiança, consultoria | H1 do site, LinkedIn, bio, assinatura |
| Signature / studio mark | **VOANEVES.** | Assinatura comercial e chancela | Cabeçalho de propostas, faturas, nav, favicon |
| Produtos próprios | Vote Play, MIDFLOW | Marcas endossadas ("por Victor Neves") | Rodapés de produto e READMEs |
| Projetos de clientes | PARU, BIP Kids, CAATO | Marcas independentes | Crédito discreto no rodapé (`.vn-credit`) |

Essência: **"Sinal, não ruído."**

## Símbolo Oficial: Conceito B (Sinal)

Adotado formalmente pelo **ADR 0004** (`M0e = B`), substituindo a matriz raster legada do GIMP.

O símbolo é composto pelo primeiro glifo do nome (`V`) na inclinação característica de 3:8 acompanhado do ponto final em **Sinal** (`#f50000`) assentado na linha de base. É o exato ponto final do wordmark `VOANEVES.` convertido em símbolo gráfico.

### Geometria e Construção

- **ViewBox**: `0 0 512 512` (grade base de 8 unidades).
- **Disco**: Círculo puro, raio $r = 256$, centro em `(256, 256)`.
- **Glifo V**:
  - Limites: $x \in [142, 358]$, $y \in [148, 364]$ (dimensões $216 \times 216$).
  - Inclinação dos braços: Proporção 3:8 ($20{,}56^\circ$ em relação à vertical).
  - Espessura do braço: 72 unidades.
  - Vão interno (counter): termina 96 unidades abaixo do topo.
  - Base reta inferior: largura de 54 unidades em $y = 364$.
- **Ponto Sinal**:
  - Centro em `(340, 337)`, raio $r = 27$ (diâmetro 54 unidades, coincidente com a largura da base do V).
  - Ponto mais baixo tangencia a linha de base em $y = 364$.
  - Folga livre de aproximadamente 22 unidades em relação à borda do braço direito.
- **Grupo Combinado (V + Ponto)**:
  - Limites: $x \in [142, 367]$, perfeitamente balanceado no centro óptico do disco.

### Área de Proteção e Escala

- **Área de não interferência (Clear Space)**: $0{,}25 \times D$ (128 unidades no viewBox de 512).
- **Tamanho mínimo em tela**:
  - 16 px de diâmetro para o disco. O glifo V permanece legível.
  - O ponto Sinal atua como acento distintivo a partir de 24 px.

## Arquivos Canônicos (`logo/`)

| Arquivo | Descrição | Paleta / Elementos |
|---|---|---|
| `logo/mark.svg` | Símbolo padrão | Disco Tinta (`#0a0a0a`), V Creme (`#f4ead4`), ponto Sinal (`#f50000`) |
| `logo/mark-reverse.svg` | Símbolo reverso | Disco Creme (`#f4ead4`), V Tinta (`#0a0a0a`), ponto Sinal (`#f50000`) |
| `logo/mark-mono.svg` | Símbolo monocromático | Disco Tinta (`#0a0a0a`), V vazado, ponto vazado via `fill-rule="evenodd"` |
| `logo/wordmark.svg` | Wordmark oficial | "VOANEVES." em JetBrains Mono Bold (700), ponto em Sinal (`#f50000`) |
| `logo/wordmark-reverse.svg` | Wordmark reverso | Texto em Creme (`#f4ead4`), ponto em Sinal (`#f50000`) |
| `logo/wordmark-mono.svg` | Wordmark monocromático | Texto e ponto em cor única uniforme (`#0a0a0a` ou `#f4ead4`) |
| `logo/lockup-horizontal.svg` | Lockup horizontal | Símbolo + wordmark alinhados na horizontal |
| `logo/lockup-stacked.svg` | Lockup empilhado | Símbolo sobreposto centralizado ao wordmark |
| `logo/signature.svg` | Assinatura compacta | Variante otimizada para cabeçalhos e assinaturas |

## Histórico de Conceitos Explorados (M0)

1. **Conceito A (Evolução)**: Listras de velocidade regularizadas (6 listras). Descartado por vibração óptica abaixo de 24 px e apego a ruído decorativo.
2. **Conceito B (Sinal)**: **Selecionado.** Síntese máxima, identidade direta com o wordmark, legibilidade impecável em pequenas escalas.
3. **Conceito C (Monograma)**: Monograma "VN." sobre ladrilho chanfrado com linha de cota. Descartado por ruptura da geometria do disco e perda de detalhes finos em baixa resolução.

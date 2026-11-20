# 06 — Movimento

O sistema de movimento privilegia resposta tátil imediata em micro-interações e desaceleração suave em revelações.

## Curvas e Durações

| Token | Valor | Aplicação |
|---|---|---|
| `--vn-ease-out` | `cubic-bezier(0.22,0.61,0.36,1)` | Hover, elevação, entrada |
| `--vn-ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | Pressão e retorno magnético |
| `--vn-ease-in-out` | `cubic-bezier(0.65,0,0.35,1)` | Transições contínuas |
| `--vn-dur-press` | `120ms` | Escala ativa (`0.94`) |
| `--vn-dur-hover` | `250ms` | Estados de botão e cartão |
| `--vn-dur-cursor` | `450ms` | Gaveta e rastreamento |
| `--vn-dur-line` | `800ms` | Traços e divisórias |
| `--vn-dur-unveil` | `1200ms` | Revelação editorial |
| `--vn-dur-page` | `250ms` | Transição entre documentos |

## Movimento Reduzido

Sob `@media (prefers-reduced-motion: reduce)`, todos os `--vn-dur-*` são colapsados para `1ms` e os módulos JS (`cursor`, `magnetic`, `marquee`, `reveal`) evitam loops de animação.

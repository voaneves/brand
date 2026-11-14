# 08 — Componentes

Todos os componentes utilizam prefixo `.vn-*` em `@layer vn.components` e consomem estritamente tokens semânticos e de componente (nunca `--vn-ref-*`).

## Primitivos e Blocos

- **Botões (`.vn-btn`):** Variantes `--primary`, `--secondary`, `--signal`, `--ghost`; tamanhos `--sm`, `--md`, `--lg`, `--xl`; indicador `.vn-btn__dot`.
- **Botão de Ícone (`.vn-icon-btn`):** Alvo circular mínimo `44x44px`.
- **Chips & Status (`.vn-chip`, `.vn-status-pill`):** Rótulos compactos em mono; pulso finito de `3` iterações no indicador de disponibilidade.
- **Navegação (`.vn-navbar`, `.vn-drawer`):** Cabeçalho fixo translúcido com menu lateral acessível em superfície inversa.
- **Conteúdo (`.vn-service-card`, `.vn-stat-card`, `.vn-work-row`, `.vn-timeline-item`):** Estruturas de portfólio, métricas e carreira.
- **Formulário (`.vn-field`):** Campos acessíveis com estado inválido destacado em `--vn-signal-ink`.
- **Colofão (`.vn-credit`):** Assinatura compacta "Feito por voaneves".

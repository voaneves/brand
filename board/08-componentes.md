# 08 — Componentes

Todos os componentes utilizam prefixo `.vn-*` em `@layer vn.components` e consomem estritamente tokens semânticos e de componente (nunca `--vn-ref-*`).

## Primitivos e Blocos

- **Botões (`.vn-btn`):** Variantes `--primary`, `--secondary`, `--signal`, `--ghost`; tamanhos `--sm`, `--md`, `--lg`, `--xl`; indicador `.vn-btn__dot`.
- **Botão de Ícone (`.vn-icon-btn`):** Alvo circular mínimo `44x44px`.
- **Chips & Status (`.vn-chip`, `.vn-status-pill`):** Rótulos compactos em mono; pulso finito de `3` iterações no indicador de disponibilidade.
- **Navegação (`.vn-breadcrumb`, `.vn-pagination`, `.vn-footer`):** Trilha, paginação com links reais e rodapé em superfície inversa.
- **Navegação (`.vn-navbar`, `.vn-drawer`):** Cabeçalho fixo translúcido com menu lateral acessível em superfície inversa.
- **Conteúdo (`.vn-service-card`, `.vn-stat-card`, `.vn-work-row`, `.vn-timeline-item`):** Estruturas de portfólio, métricas e carreira.
- **Formulário (`.vn-field`, `.vn-select`, `.vn-check`, `.vn-fieldset`):** Campo, textarea, select nativo, checkbox e radio com estado inválido em `--vn-signal-ink`, foco de `2px` e alvo mínimo de `44px`.
- **Feedback (`.vn-alert`, `.vn-toast`):** Alerta persistente (neutro ou `--error`) e toast transitório com região `aria-live`.
- **Estados e conteúdo (`.vn-skeleton`, `.vn-empty`, `.vn-badge`, `.vn-progress`, `.vn-switch`, `.vn-accordion`):** Carregamento, vazio, rótulos, progresso nativo, interruptor `role="switch"` e `<details>` estilizado.
- **Estrutura (`.vn-table`, `.vn-tabs`, `.vn-modal`, `.vn-tooltip`):** Tabela com cabeçalho mono, abas ARIA, diálogo nativo `<dialog>` e tooltip dispensável por `Esc`.
- **Colofão (`.vn-credit`):** Assinatura compacta "Feito por voaneves".

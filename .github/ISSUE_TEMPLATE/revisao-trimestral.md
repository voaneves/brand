---
name: Revisão Trimestral da Marca
about: Auditoria periódica de tokens, contraste, fontes, dependências e ADRs.
title: "chore(brand): revisão trimestral QX/YYYY"
labels: ["governance"]
---

## Escopo da Revisão

- [ ] Executar `npm run build && npm test` na branch `main`
- [ ] Conferir orçamentos em `fonts/*.woff2` (<= 60 KB preload) e `dist/js/cursor.js` (<= 1.5 KB gz)
- [ ] Auditar dependências via Dependabot / `npm audit`
- [ ] Revisar ADRs abertos ou obsoletos em `docs/decisions/`
- [ ] Conferir sincronia com sites consumidores (`voaneves/site`)

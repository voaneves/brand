# 12 — Governança

A evolução do sistema de design é regida por versionamento semântico estrito (ADR 0003) e revisão em repositório.

## Política Semver (`@voaneves/brand`)

- **MAJOR:** Remoção ou renomeação de token semântico/de componente, classe `.vn-*`, export JS, caminho em `exports`, ícone ou alteração de família tipográfica.
- **MINOR:** Adição de tokens, componentes, ícones, exports ou atualização compatível de valores que preservam o contraste.
- **PATCH:** Correções de especificação, documentação ou build interno.

## Fluxo de Mudanças

1. Propostas arquiteturais são registradas em `docs/decisions/NNNN-*.md`.
2. Commits seguem **Conventional Commits** (`feat:`, `fix:`, `perf:`, `docs:`).
3. Releases são automatizadas por `release-please` com notas em português brasileiro e publicação via OIDC com provenance.

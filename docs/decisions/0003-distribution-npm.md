# 0003. Distribution through npm

- Status: Accepted
- Date: 2026-11-14

## Context

Consumers need anonymous installs, semver ranges and good Dependabot support. Git dependencies skip build steps under `npm ci --ignore-scripts`; GitHub Packages needs a token even for public packages.

## Decision

Publish `@voaneves/brand` publicly on npm using trusted publishing (OIDC) with provenance, automated by release-please from Conventional Commits.

Semver policy:

- MAJOR: remove or rename a semantic or component token, CSS class, JS export, `exports` path or icon; change a token type or font family; raise minimum Node or Astro.
- MINOR: add tokens, components, icons or exports; intentional value change of a semantic token that still passes the contrast matrix; rename of a private `--vn-ref-*` primitive.
- PATCH: fixes to match spec, docs or build internals.

Deprecated tokens stay one minor release, then are removed at the next major.

## Consequences

- Requires an npm account or org `voaneves` and a trusted-publisher setup (manual, before M1).
- Fallback if npm is not viable: committed `dist/` plus a git tag dependency.

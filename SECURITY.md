# Security Policy / Política de Segurança

## Supported Versions

Security fixes apply only to the current `1.x` release line of `@voaneves/brand` on `main` (and the published gallery at `https://voaneves.github.io/brand/`).

| Version | Supported |
| :--- | :--- |
| `1.x` (`main`) | :white_check_mark: |
| `< 1.0` | :x: |

## Reporting a Vulnerability

**Please do not open a public issue** for security vulnerabilities.

Send a private report by email to **victorneves478@gmail.com** with the subject:

```text
[SECURITY] brand: <short summary>
```

Include as much detail as possible:

- the affected package export, script, Astro component, or workflow file;
- step-by-step reproduction instructions or a minimal proof of concept;
- the security impact you see (for example DOM XSS in JS helpers/Astro components, supply-chain or OIDC release workflow risk, or SVG/HTML injection);
- Node.js or browser version when relevant.

## What to Expect

- Receipt acknowledged within **7 days**.
- Initial assessment (reproducibility and severity) within **14 days**.
- Notification when a fix or advisory is published (with credit if desired).

This is a personal open-source project without a dedicated security team: the timelines above are good-faith targets, not a contractual SLA. There is no bug bounty program.

## Scope

**In scope:** `@voaneves/brand` package source and exports (`css/`, `js/`, `astro/`, `tokens/`, `icons/`, `scripts/`), the static gallery (`https://voaneves.github.io/brand/`), and GitHub Actions build/release workflows (`release.yml` OIDC trusted publishing).

**Out of scope:**

- vulnerabilities in third-party infrastructure (GitHub, GitHub Pages, npm registry), which should be reported to their respective vendors;
- denial-of-service (DoS/DDoS) or social engineering;
- automated scanner output without a concrete, reproducible security impact.

Please allow reasonable time for remediation before any public disclosure.

---

## Resumo em português

Apenas a linha atual `1.x` de `@voaneves/brand` na branch `main` (e a galeria em `https://voaneves.github.io/brand/`) recebe correções de segurança.

**Não abra issue pública.** Envie um relato privado para **victorneves478@gmail.com** com o assunto `[SECURITY] brand: <resumo>`, informando o export, script, componente Astro ou workflow afetado, passos para reproduzir e impacto. Retorno inicial em até **7 dias** e avaliação em até **14 dias**, sem bug bounty. Infraestrutura de terceiros (GitHub, npm), DoS, engenharia social e alertas automáticos sem impacto comprovado estão fora do escopo.

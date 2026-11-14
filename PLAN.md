# Victor Neves: Brand, Design System, Site & GitOps. Plan v2 (for review)

> **Status:** v2, approved 2026-11-14 with the decisions below. Execution in progress (M0).
> **Scope:** brand identity (A), design system (B), the brand package (C), the Astro site (D), GitOps CI/CD on Cloudflare modeled on midflow (E), roadmap (F), risks (G).
> **Language:** English for the docs, pt-BR for every copy sample. The color names stay pt-BR: **Tinta, Creme, Sinal**.
> **Fact check, 2026-11-14:** Astro 7.4.12 · Wrangler 4.162 · Style Dictionary 5.8 · @lhci/cli 0.16.1 · Playwright 1.65.1 · @axe-core/playwright 4.14 · release-please 17.11 · html-validate 11.21. Midflow runs Node 24. Astro 7 needs Node ≥ 22.23.4.

## Executive summary

1. **The brand:** *Victor Neves* is the master brand (a person). **VOANEVES®** is his signature and studio mark. Client projects stay independent and carry a small "Projeto por Victor Neves" credit. Own products (Vote Play, MIDFLOW) are endorsed, not branded.
2. **The design system:** three colors (Tinta, Creme, Sinal) and three families (Fraunces, Schibsted Grotesk, JetBrains Mono). Tokens come in three tiers: `--vn-ref-*` (primitive), `--vn-*` (semantic) and `--vn-{component}-*` (component). The source is **DTCG JSON**. **Style Dictionary v5** builds CSS, TS/JSON and the Claude board's `tokens.json` in one step.
3. **The package:** **`@voaneves/brand` on npm**, public, published with OIDC trusted publishing and provenance. Releases run through **release-please** and follow strict token semver. Consumers get bumps from Dependabot.
4. **The site:** Astro 7, fully static, with no framework runtime. The work happens in place in `voaneves-intermediario` on branch `astro`. Routes are pt-BR at `/` and EN at `/en/`. Case studies come from content collections seeded from `portfolio-data.json`. The service worker is **dropped** and replaced by a kill switch, because hashed assets now solve cache-busting.
5. **Hosting:** **Cloudflare Pages through direct upload from GitHub Actions with Wrangler**, as in midflow. The domain cuts over from GitHub Pages to Pages after a test period on a `beta.` host.
6. **GitOps "like midflow":** the same conventions (Portuguese workflow names, `permissions: {}`, SHA-pinned actions, a reusable `ci.yml`, a guard step, smoke tests, 4-hourly uptime issues, Dependabot on America/Araguaina time) **plus** what a site needs. That means per-PR previews with the URL posted on the PR, Lighthouse CI asserting 100 ×4, axe, lychee, html-validate, budgets, gitleaks, dependency-review, CodeQL, rulesets, CODEOWNERS and a semantic PR title check. Production deploys go to a candidate first, then promote, with automatic rollback.
7. **Roadmap:** M0 → M6, about 4–6 focused weeks. **The adoption gate stays from v1:** Astro replaces the current site only if the static build *and* the real Cloudflare preview score 100 in all four Lighthouse categories (median of 5 runs, mobile and desktop).

## Decisions (answered 2026-11-14)

| # | Answer | Effect on the plan |
|---|---|---|
| 1 | **Cloudflare Pages** | As planned. |
| 2 | Delegated → **npm public `@voaneves/brand`** | [MANUAL] create the `voaneves` npm account before M1. Fallback: committed `dist/` + git tag dependency. |
| 3 | **Migrate in place** on branch `astro`, rename to `voaneves/site` after cutover | **Plus a legacy archive for the portfolio:** tag the current intermediario (`legacy-v4`) before migrating; keep `voaneves.github.io` as the archived v3. Both get a "Legado" entry (screenshots + link) on the new site. Hosting for them decided at M4. |
| 4 | **Full creative freedom on the logo** (made in GIMP; a rebrand is allowed) | The pixel-diff rule is dropped. M0 explores 3 vector mark concepts that evolve the speed-stripe V; you pick one. |
| 5 | No contact form at launch | As planned. |
| 6 | MTE, Dashboards, CAATO (+ PARU, BIP Kids with consent) | As planned. |
| 7 | EN: home, 404, privacy at launch; drop ES | As planned. |
| 8 | **No manual approval** for production | As planned. |
| 9 | OK, data to be confirmed | Placeholders stay marked until you provide: e-mail, phone, city, languages, IBM entry. Blocks M3 only. |
| 10 | **VOANEVES is not registered** | **Drop ®** everywhere. The red accent of the wordmark becomes a Sinal full stop: `VOANEVES.` (ties to "Sinal, não ruído."). No ™. |
| 11 | Project sites under `voaneves.com/<repo>/` are not needed | They fall back to `voaneves.github.io/<repo>/`; cheap `_redirects` kept for old links. |
| 12 | Cloudflare Web Analytics | As planned. |

### Original questions (kept for reference)

| # | Decision | My recommendation |
|---|---|---|
| 1 | Hosting product: **Cloudflare Pages** (matches midflow, bip-kids and vote-play), or **Workers static assets** (what Cloudflare now recommends for *new* projects) | **Pages.** It matches your other repos, gives simpler branch-alias previews and needs no Worker code. The exit path is documented in G. |
| 2 | Brand package registry: npm public, GitHub Packages, or a git tag dependency | **npm public `@voaneves/brand`.** You would need to create the npm user or org `voaneves`. |
| 3 | Site repo | **Migrate `voaneves-intermediario` in place** on branch `astro`, then rename it `voaneves/site` after cutover (GitHub keeps redirects). |
| 4 | Logo vector master: v1 said "never traced". The package needs an SVG. | **Allow a faithful vector master**, accepted only if a pixel diff against `logo.webp` stays ≤ 0.5%. Also decide whether to keep the hand-drawn wobble of the disc edge (I recommend keeping it, see A8). |
| 5 | Contact form at launch | **No.** Launch with WhatsApp, Koalendar and e-mail links. A Pages Function + Turnstile form can come later (D11). |
| 6 | Case studies to publish | MTE, Dashboards/BI and CAATO, **plus PARU and BIP Kids if those clients agree.** They are recent, live and the strongest proof. |
| 7 | EN scope at launch | Home, 404 and privacy in EN. Case studies in EN at M6. **Drop the ES Google-Translate link.** |
| 8 | Manual approval for production deploys | **None for the site.** Rollback takes seconds and PR checks are the gate. Midflow requires one; you can keep one if you prefer. |
| 9 | Data reconciliation before M3: canonical e-mail, real phone, city (Palmas or Dianópolis), 5 or 6 languages, the IBM timeline entry | Needs your answers. The plan assumes **5 languages** (the CV) until you confirm. |
| 10 | ® or ™ for VOANEVES (needs an INPI check) | Keep ® only if it is registered. Otherwise use ™. |
| 11 | GitHub Pages project sites currently served under `voaneves.com/<repo>/` (paru-site, bip-kids) | After cutover they go back to `voaneves.github.io/<repo>/` behind 302→301 redirects, or move to their own Pages projects later. |
| 12 | Analytics | **Cloudflare Web Analytics** (no cookies, no banner), loaded after `load`. Drop it if LHCI ever drops below 100. |

## Changes from v1

| v1 | v2 | Why |
|---|---|---|
| `tokens/tokens.json` in the artifact list format was the source of truth | **DTCG** source in `tokens/src/**`. The board's `tokens.json` is **generated**. | DTCG is the build-tool standard, and the board format cannot hold aliases across tiers or motion tokens. |
| Flat token names (`--surface`) | Code uses `--vn-` prefixed tiers. The board keeps the unprefixed names (1:1 mapping). | Avoids clashes in consumers (Tailwind apps). The published board stays stable. |
| Logo "never redrawn or traced" | Vector master allowed, verified by pixel diff | You need SVG for favicon, print and the package. Nothing is redrawn by eye. |
| Status dot pulses forever | It pulses 3 times and then rests | WCAG 2.2.2 (Pause, Stop, Hide) |
| Marquee loops | It loops **with a visible pause button** and stops when focus is inside | WCAG 2.2.2 |
| Masked line reveal "CSS scroll-driven first" | Time-based keyframes triggered by one shared IntersectionObserver. **The hero is never hidden.** | A scrubbed reveal reverses when you scroll back up. Your P7/P8 history showed hidden hero text costs LCP. |
| "6 idiomas" stat | "5 idiomas" until you confirm | `portfolio-data.json` needs_review |
| Component CSS implied to live in the site | Shared component CSS ships in `@voaneves/brand` (`css/components.css`, `.vn-*` classes). Page layouts stay in the site. | The same CSS powers the site, the Claude board previews (`bundle.css`) and React consumers. |
| Service worker not decided | **Dropped**, plus a kill-switch worker at the 2 old registration URLs | Hashed `/_astro/*` with `immutable` replaces it. The SW was a source of stale HTML. Lighthouse has had no PWA category since v12. |
| Hosting not covered | Cloudflare Pages + GitOps | Your request |
| ES via Google Translate | Removed. Hand-written EN only. | Quality, SEO (hreflang) and CSP |
| Journey carousel: drag only | Drag **plus** prev/next buttons and arrow keys | WCAG 2.5.7 (Dragging Movements) |

Everything else in v1 stays: the essence, values, voice, palette, contrast table, type ladder, spacing, grid, motion easings, cursor concept, reference-site verdicts and budgets.

---

## Table of contents

- **A. Brand identity:** A1 Architecture · A2 Personas · A3 Messaging · A4 Elevator pitches · A5 Glossary & formats · A6 Bilingual strategy · A7 Voice (v1 kept) · A8 Logo construction · A9 Photography · A10 Governance
- **B. Design system:** B1 Token architecture · B2 Source & build · B3 Color · B4 Type · B5 Space/shape/motion tokens · B6 Component spec cards · B7 Motion spec · B8 Cursor state machine · B9 Dark theme · B10 Accessibility test plan · B11 Content & i18n rules
- **C. Brand package distribution:** C1 Repo tree · C2 Exports · C3 Registry · C4 Semver · C5 Release · C6 Consumers · C7 Board sync · C8 Licenses
- **D. Site architecture:** D1 Repo · D2 Config · D3 Routes · D4 Components ↔ DS · D5 Islands & JS · D6 Fonts · D7 Images · D8 CSS · D9 Service worker · D10 SEO · D11 Analytics & forms · D12 Migration & parity
- **E. GitOps CI/CD:** E1 Principles · E2 Workflow inventory · E3 Site `ci.yml` · E4 Site `preview.yml` · E5 Site `deploy.yml` · E6 Ops workflows · E7 Brand workflows · E8 Repo governance · E9 Cloudflare setup · E10 `_headers`/`_redirects` · E11 Domain cutover · E12 DR & rollback · E13 Runbook
- **F. Roadmap:** M0–M6
- **G. Risks & open decisions**

---

# A. Brand identity

## A1. Brand architecture

| Layer | Name | Role | Where it appears | Visual rule |
|---|---|---|---|---|
| Master brand | **Victor Neves** | The person: trust, authorship | Site H1, LinkedIn, talks, e-mail signature | Full system |
| Signature / studio mark | **VOANEVES®** (from the handle `voaneves`) | Commercial signature: proposals, invoices, nav wordmark | Proposal header, invoice, nav, footer, favicon (disc) | Full system |
| Client work | PARU, BIP Kids (ADARSE14), CAATO, Boas Obras, Mota & Godinho | **Independent.** The client owns the brand. | Their sites | Client's own system. Footer **Credit** only: "Projeto por Victor Neves". |
| Own products | Vote Play, MIDFLOW | **Endorsed** ("por Victor Neves") | Product footer and README | Product keeps its own palette and type. It may use `@voaneves/brand/credit` and the disc only in the credit. |
| Experiments | SnakeAI, fitness-dashboard, `/lab` | Personal | GitHub, `/lab` (future) | Free. Never on the home page. |

The rules:
- In copy, the person always speaks ("eu", "comigo"). VOANEVES never speaks; it is a seal.
- Never write "VOANEVES Studio" or "Agência VOANEVES". It is one person, and calling it an agency breaks the *Proximidade* value.
- Credit component spec (for consumers): `Projeto por Victor Neves ↗` in the consumer's own body font. The 16px disc is optional. It links to `https://voaneves.com/?ref=<repo>`.

## A2. Audience personas

| | **P1. Marta, dona de negócio local** | **P2. Rafael, gestor de programa/instituição** | **P3. Lia, recrutadora/tech lead** |
|---|---|---|---|
| Context | Clinic, shop or service in Palmas/TO. 2–15 people. Lives on WhatsApp and Instagram. | SEBRAE-like body, association, city hall, NGO, mid-size firm. Needs reporting and processes. | Hiring for data, dev or product roles. Remote, hybrid or national. Often reads EN. |
| Job to be done | "Quando preciso aparecer bem online, quero alguém confiável com preço claro, pra não perder cliente pro concorrente." | "Quando tenho dados espalhados e metas atrasadas, quero painéis e processos claros, pra decidir rápido e prestar contas." | "When screening, I want proof of shipped work and range, so I can shortlist in 2 minutes." |
| Needs to see | Prices ("a partir de R$ 800"), deadlines, real examples, WhatsApp button, "atende Palmas e remoto" | Method (AS-IS → TO-BE, BPMN, OKR), institutional names (SEBRAE, Coca-Cola FEMSA), numbers (+76%, +32%), proposal/meeting path | Case studies with role and outcome, stack, GitHub, CV PDF, languages, awards (1º lugar entre 11.434) |
| Fears | Being overcharged, being abandoned after launch | Vendor risk, no documentation | Fluff, inflated titles |
| Primary CTA | Chamar no WhatsApp | Agendar reunião | Baixar CV / View case studies |
| Sections that serve them | Serviços, Projetos, FAQ, Contato | Números, Jornada, Projetos (BI), Contato | `/en/`, Jornada, Projetos, footer links |

Design consequence: home order is Hero (who + availability) → Quem sou → Números → Jornada → Projetos → Serviços → Perguntas → Contato. P1 scrolls to prices; P2 and P3 stop at the numbers and the journey.

## A3. Messaging hierarchy

| Level | pt-BR | EN |
|---|---|---|
| Essence (internal) | Sinal, não ruído. | Signal, not noise. |
| Tagline | Design, dados e código, sem ruído. | Design, data and code, minus the noise. |
| Value proposition | Engenheiro mecânico que virou designer e desenvolvedor: faço sites, apps e dashboards que resolvem um problema de verdade, com preço claro e prazo combinado. | Mechanical engineer turned designer and developer: I build sites, apps and dashboards that solve a real problem, with clear prices and agreed deadlines. |
| Pillar 1, Clareza | Preço na mesa desde o começo. Site a partir de R$ 800. | Prices up front. |
| Pillar 2, Ofício | Medido, testado, rápido: nota 100 no Lighthouse é requisito, não meta. | Measured, tested, fast. |
| Pillar 3, Proximidade | Você fala direto comigo, no WhatsApp. | You talk to me directly. |

**Proof points.** These are real and come only from `portfolio-data.json`; each needs a source line in the content file.

| Proof | Value | Source |
|---|---|---|
| Experience | 8+ anos | stats |
| Projects | 40+ projetos | stats |
| Companies | 11 empresas | stats |
| Productivity uplift for small businesses, cycle 1 (SEBRAE ALI) | +76% | impactMetrics |
| Avg client revenue | +22% | impactMetrics |
| Quarterly goal completion | +32% | impactMetrics |
| Power BI dashboards delivered | 40+ | impactMetrics |
| Processes refined (BPMN 2.0) | 50+ | impactMetrics |
| AI workshops (4h) | 13+ | impactMetrics |
| Facebook reach (MTE) | +236% | impactMetrics |
| Unplanned stops, DMAIC (Coca-Cola FEMSA) | −4,5% | impactMetrics |
| Santander Bootcamp 2025, Back-End Python | 1º lugar entre 11.434 | awards |
| Santander Bootcamp 2023, Ciência de Dados | 1º lugar entre 17.600 | awards |
| English | C2 (EF SET 84/100) | languages |

Rules: proof points are numbers, never adjectives. One number per card. Never round up: "+76%", not "quase 80%".

## A4. Elevator pitches

- **pt-BR (≈20 s):** "Sou o Victor, engenheiro mecânico que virou designer e desenvolvedor. Faço sites, apps e dashboards pra pequenas e médias empresas, aqui de Palmas pro Brasil. Já entreguei mais de 40 painéis em Power BI e ajudei MPEs a subir a produtividade em 76% no primeiro ciclo. Preço claro, conversa direta no WhatsApp."
- **pt-BR (1 line, bios):** "Design, dados e código, sem ruído. Sites, apps e dashboards a partir de R$ 800."
- **EN (≈20 s):** "I'm Victor, a mechanical engineer turned designer and developer based in Tocantins, Brazil. I build sites, apps and data dashboards, 40+ Power BI dashboards so far, and I've helped small businesses lift productivity 76% in a single cycle. I work in Portuguese, English and Spanish."

## A5. Writing glossary & formats

| Prefer | Avoid | Note |
|---|---|---|
| site | website, página web | The service name becomes "Criação de site" |
| app | aplicativo (in labels) | "aplicativo" is fine in running text |
| dashboard / painel | relatório interativo | "painel" in body text, "Dashboards & BI" as the service name |
| reunião | call, meeting | |
| proposta | orçamento sem compromisso | |
| eu, comigo, você | nós, nossa equipe, conosco, prezado | One person, informal "você" |
| MPE, pequena e média empresa | PME/SMB (mixed) | |
| "Transformação Digital" (service name only) | "transformação digital" as a vague claim | |

**Banned:** soluções inovadoras, disruptivo, sinergia, alavancar (in UI copy), guru/ninja/expert, "clique aqui", "!!!", emoji in UI, "entre em contato conosco", "Lorem ipsum" on preview URLs.

**Formats in pt-BR.** Implement them with `Intl` in `src/i18n/format.ts`.

| Kind | Format | Example | Implementation |
|---|---|---|---|
| Currency | `R$` + NBSP, thousands `.`, no cents when whole | R$ 1.500 · a partir de R$ 800 · R$ 90/h | `Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0})` |
| Integer | `.` thousands | 11.434 | `Intl.NumberFormat('pt-BR')` |
| Decimal | `,` | 4,5% | |
| Percent | no space, explicit sign for change | +76% · −4,5% | true minus sign U+2212 |
| Date, long | d mmm. aaaa | 14 nov. 2026 | `{day:'numeric',month:'short',year:'numeric'}` |
| Month/year | mmm. aaaa | out. 2024 | |
| Range | en dash, no spaces | 2019–2022 | |
| Time | 9h · 14h30 | | |
| Phone | (63) 9 XXXX-XXXX | placeholder only in previews | |
| Ordinal | 1º lugar | | |
| EN | "from R$ 800" (the currency stays BRL) | Nov 14, 2026 | `en` locale |

## A6. Bilingual strategy

- **pt-BR is the source.** EN is written by hand (Victor is C2) and reviewed in the PR. No machine translation is published.
- Routes: pt-BR at `/` and EN at `/en/`. Slugs are localized (`/projetos/caato/` ↔ `/en/projects/caato/`). Each page declares its counterpart in a route map, which feeds hreflang, the switcher and the sitemap.
- Missing EN means no EN page and no hreflang for that page. The switcher then links to `/en/` with the text "This page is in Portuguese only".
- No automatic redirect by `Accept-Language`: it is bad for crawlers and surprises users. The language switch is an explicit link (`<a hreflang="en" lang="en">English</a>`).
- ES is dropped. The Google-Translate proxy links are removed: they break CSP, privacy and hreflang.

## A7. Voice & tone

v1 A2 is kept unchanged: the do/don't table, verb-first CTAs, "você", owned errors.

## A8. Logo construction notes (from `logo.webp`, 3500 px)

What I measured on the master:
- **Disc:** black (#020202 → token Tinta), D = image width. The edge is **not a true circle**: it has a slight hand-drawn wobble. Decision 4: keep the wobble in the vector master (it is part of the mark's character), and never "fix" it to a geometric circle.
- **V:** the bounding box spans about 22%–78% of D horizontally and 27%–80% vertically, so it sits optically a little low and to the right of center.
  - The right arm is one solid stroke, about 21° off vertical.
  - The left arm is **7 horizontal speed stripes**, stepped, each with a small notch, slanted parallel to the right arm. Stripe height is about 4.7% of D and the gaps about 1.8% of D.
  - The 5th stripe merges with the base of the right arm.
- **Vector master workflow:**
  1. Trace at 3500 px with potrace.
  2. Snap stripe edges to horizontal and arm edges to the measured angle.
  3. Keep the disc contour as traced.
  4. Render at 1024 px and diff against `logo.webp`. Accept at ≤ 0.5% differing pixels with a threshold of 16/255.
  5. Record the numbers in `docs/03-logo.md` with a construction diagram.
- **Clear space and minimums:** as in v1 (0.25D; disc ≥ 24px; below 24px use the hand-hinted favicon PNGs).
- **Files:** `logo/disc.svg`, `disc-reverse.svg` (white disc, black V, for Tinta), `wordmark.svg` (VOANEVES® set in JetBrains Mono 700 and outlined), `lockup-horizontal.svg`, `lockup-stacked.svg`, `signature.svg`, plus PNG fallbacks at 48/96/192/512.

## A9. Photography shot list

| # | Shot | Use | Spec |
|---|---|---|---|
| 1 | Hero portrait, 3/4, eye contact, warm key light, plain background for cut-out | Hero, OG | RAW, ≥ 4000 px long side, 4:5 and 1:1 crops, cut-out PNG on transparent |
| 2 | Working: hands on keyboard, BPMN on a whiteboard | Quem sou, case studies | Color + B&W variants |
| 3 | Teaching a workshop (needs the participants' consent) | Jornada (SEBRAE) | Wide + detail |
| 4 | Palmas context: golden-hour cerrado light, Praça dos Girassóis | Footer band, About | Landscape 16:9 |
| 5 | Detail: notebook sketch, dashboard on screen | Case studies | Macro, shallow depth of field |
| 6 | Case-study screenshots | Project rows, pages | Flat screenshots on Creme, 14px radius, **no fake device mockups**, 2× density |

Rules: no stock photos, and never anyone in a photo without consent. Write the alt text at capture time and store it in the content collection. Grade warm and high-contrast, and never use Sinal as a color cast.

## A10. Brand governance

- **Owner and approver:** Victor (sole). Agents propose, Victor merges.
- **How changes happen:** every change is a PR to `voaneves/brand`. Identity-level changes (logo, palette, type families, essence) need an **ADR** in `docs/decisions/NNNN-title.md` (context, options, decision, consequences) and the PR label `brand:identity`.
- **Versioning:** follows the package semver (C4). The brand book shows "Versão 1.3.0 — 14 nov. 2026".
- **Cadence:** a quarterly review issue (template `revisao-trimestral.md`) covering the contrast report, unused tokens, open ADRs and photo freshness.
- **Board sync:** the Claude board is republished within the same day as a release (C7).

---

# B. Design system

## B1. Token architecture (3 tiers)

| Tier | Purpose | DTCG path | CSS name | Example | Who may use it |
|---|---|---|---|---|---|
| **Primitive (ref)** | Raw palette and scales, no meaning | `ref.color.red.600` | `--vn-ref-red-600` | `#f50000` | Only semantic tokens. **Never components or consumers.** |
| **Semantic (sys)** | Role or intent, theme-aware | `color.signal` | `--vn-signal` | `light-dark({ref.red.600}, {ref.red.450})` | Components, consumers, site CSS |
| **Component** | One part, property and state of one component | `button.signal.bg.hover` | `--vn-button-signal-bg-hover` | `{color.signal-ink}` | Only that component's CSS |

**Naming grammar:** `--vn-[ref-]{category|component}-{variant?}-{part?}-{property}-{state?}`, all lowercase kebab-case.
- States, in order: `hover`, `active`, `focus`, `disabled`, `selected`, `invalid`.
- Sizes: `sm`, `md`, `lg`, `xl`.
- The board drops the `vn-` prefix (`--vn-surface` ↔ board `surface`).

**Primitive palette** (all values from v1, now given steps):

| Ref | Hex | Ref | Hex |
|---|---|---|---|
| `ink-1000` | #000000 | `cream-100` | #f4ead4 |
| `ink-950` (Tinta) | #0a0a0a | `cream-200` | #efe4c5 |
| `ink-925` | #141414 | `cream-300` | #e8dec5 |
| `ink-900` | #1a1a1a | `sand-500` | #a69c86 |
| `white` | #ffffff | `sand-600` | #8a8170 |
| `red-400` | #ff5a5a | `sand-700` | #7a705c |
| `red-450` | #ff3838 | `sand-800` | #5c5446 |
| `red-500` | #ff2a2a | `red-600` (Sinal) | #f50000 |
| `red-800` | #b80000 | | |

The semantic layer is exactly v1's B2 table (surface, surface-soft, surface-raised, surface-inverse, surface-signal, text, text-muted, text-on-inverse, text-muted-on-inverse, text-on-signal, signal, signal-2, signal-ink, line, line-strong, line-on-dark, focus, focus-on-signal, viz-1…grid), now aliasing refs.

Component token examples:

```css
--vn-button-signal-bg: var(--vn-surface-signal);
--vn-button-signal-fg: var(--vn-text-on-signal);
--vn-button-primary-bg: var(--vn-ref-ink-950);
--vn-button-primary-bg-hover: var(--vn-signal);
--vn-button-primary-fg-hover: var(--vn-ref-ink-950);
--vn-button-radius: var(--vn-radius-pill);
--vn-button-height-md: 40px;
--vn-field-border: var(--vn-line-strong);
--vn-field-border-invalid: var(--vn-signal-ink);
--vn-cursor-dot-size: 8px;
--vn-cursor-lens-size: 56px;
```

## B2. Source format & single build step

**Decision:** **DTCG** (`$value`, `$type`, `$description`) is the only hand-edited source. **Style Dictionary 5** (native DTCG, transitive aliases) runs with 3 custom formats in one command, `npm run build:tokens`:

| Output | Format | Consumer |
|---|---|---|
| `dist/css/tokens.css` | Custom `css/vn-light-dark` (below) | Site and consumers |
| `dist/tokens.js` + `dist/tokens.d.ts` | `javascript/es6` + `typescript/es6-declarations`, resolved values | TS consumers, OG image generator |
| `dist/tokens.json` | Nested, resolved, both themes | Tools |
| `dist/board/tokens.json` | Custom `claude/board-list` | Claude board |

How the `css/vn-light-dark` format emits colors: one declaration per semantic color, using `light-dark()`. The theme is chosen by `color-scheme`.

```css
@layer vn.tokens {
  :root { color-scheme: light dark;
    --vn-ref-red-600: #f50000; /* … */
    --vn-surface: light-dark(var(--vn-ref-cream-100), var(--vn-ref-ink-950));
    --vn-signal:  light-dark(var(--vn-ref-red-600), var(--vn-ref-red-450));
  }
  :root[data-theme="light"] { color-scheme: light; }
  :root[data-theme="dark"]  { color-scheme: dark; }
}
```

How the `claude/board-list` format writes the board file. It follows the artifact grammar: `color.themes` = `[{id:"light"},{id:"dark"}]`, `color.tokens` = a **flat list** `{name, value:{light, dark}, usage}`.
- Aliases are written as `"{name}"` **only to tokens that exist on the board**. Refs are flattened to hex because the board shows semantic tokens plus the palette.
- `type` = `{fonts, families, groups[{name, family, styles[]}]}`, with groups Display, Text and Label from B4.
- `spacing`, `radius`, `shadow`, `opacity`, `zIndex`, `motion` become list families (the board has no motion view, so it shows as a plain section).

A unit test validates the output against the grammar: names match `^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$`, colors are hex/rgb/oklch only (no `color-mix`/`var`), limits are ≤600 colors, ≤12 families and ≤80 type styles, and there are no duplicate names across families.

## B3. Color

v1 B2 and B10 are kept in full: the values, the 60/30/10 share, the retired list and the contrast table. Additions:
- **The contrast matrix is a test** (`tests/contrast.test.js`). It reads `tests/contrast-pairs.json`, for example `{"fg":"text-muted","bg":"surface-soft","min":4.5,"themes":["light","dark"]}`, and fails CI below the minimum. The pairs cover every row of v1 B10, plus `focus` against every surface (≥ 3:1) and `line-strong` against every surface (≥ 3:1).
- **Banned pairs are tested too.** White and Creme on Sinal must stay *below* 4.5, so nobody "fixes" them into use by accident.

## B4. Typography

v1 B3 is kept: families, ladder, the 20 styles and Schibsted Grotesk. Token form: `--vn-font-display`, `--vn-font-text`, `--vn-font-mono`, and per style `--vn-type-h1-size` with `clamp()`, plus `-leading`, `-tracking` and `-weight`. A `.vn-type-h1` class is generated for each style (the board also generates these).
- Fraunces axes: `opsz` follows size automatically (`font-optical-sizing: auto`). The hero is pinned with `font-variation-settings: 'opsz' 144`.
- Numbers use `font-variant-numeric: tabular-nums` in price, stat and code.
- Long pt-BR words: `hyphens: auto` on body and lead text (with `lang` set). Display styles use `hyphens: manual` with `&shy;` hints authored in content plus `overflow-wrap: break-word`. Test strings: *Desenvolvimento*, *Transformação*, *Responsabilidade*, *Prototipagem* at 320 px.

## B5. Space, shape, elevation & motion tokens

v1 B4 and B5 values are kept. Token names:
- Space: `--vn-space-1…14` (4 → 256) and aliases `--vn-beat` (64), `--vn-breath` (128), `--vn-pause` (256).
- Radius: `--vn-radius-xs…2xl|pill|round`. Shadow: `--vn-shadow-pop|lift|media|drawer|signal|dot`. Plus `--vn-opacity-*` and `--vn-z-*`.
- Motion:

| Token | Value |
|---|---|
| `--vn-ease-out` | `cubic-bezier(.22,.61,.36,1)` |
| `--vn-ease-spring` | `cubic-bezier(.34,1.56,.64,1)` |
| `--vn-ease-in-out` | `cubic-bezier(.65,0,.35,1)` |
| `--vn-dur-press` | `120ms` |
| `--vn-dur-hover` | `250ms` |
| `--vn-dur-cursor` | `450ms` |
| `--vn-dur-line` | `800ms` |
| `--vn-stagger-line` | `80ms` |
| `--vn-dur-unveil` | `1200ms` |
| `--vn-dur-page` | `250ms` |

Reduced motion: under `@media (prefers-reduced-motion: reduce)` every `--vn-dur-*` becomes `1ms` (not 0, so `animationend` still fires), and the patterns in B7 switch to their static fallbacks.

## B6. Component spec cards

Every card uses the same schema: **API** (Astro props; the same names become `data-` attributes and `.vn-` modifier classes for non-Astro consumers) · **Anatomy** · **Variants/sizes** · **States** · **A11y** · **Responsive** · **Content & edge cases** · **Do / Don't**. Shared component CSS lives in `@voaneves/brand/css/components.css`. Astro wrappers live in the site under `src/components/ds/`.

States common to every interactive component:
- default · hover (`@media (hover:hover)` only) · active (scale .96, 120ms) · focus-visible (2px `--vn-focus` ring, offset 4px; on Sinal `--vn-focus-on-signal`) · disabled (opacity .45, `aria-disabled`, still focusable when it carries a tooltip reason).
- Every target is ≥ 44×44 CSS px, or 24×24 with spacing for inline text links (2.5.8).

**1. Logo** · `<Logo variant="disc|wordmark|horizontal|stacked|signature" size={24..160} ground="cream|ink|signal|auto" />`
- Anatomy: disc, optional wordmark, optional ®.
- States: none (`role="img"`).
- A11y: `aria-label="Victor Neves — página inicial"` when it is a link, `alt=""` when next to visible text.
- Responsive: horizontal → wordmark only under 360 px in the nav.
- Don't: recolor it, add effects (see v1 misuse list).

**2. Button** · `<Button variant="signal|primary|secondary|ghost" size="sm|md|lg|xl" href? type="button|submit" icon? iconPosition="start|end" loading? disabled? external?>`
- Anatomy: container, label, optional leading dot (primary), optional trailing arrow (ghost/external).
- Sizes: 32/40/48/56 high. sm extends its hit area to 44 with `::after{inset:-6px}`.
- States: common states plus `loading` (`aria-busy="true"`; the label stays; the dot pulses 3×).
- A11y: renders `<a>` when `href` is set, otherwise `<button>`. `external` adds `target=_blank rel="noopener"` and visually hidden text "(abre em nova aba)". Never a `div`.
- Responsive: full width under 480 px only in Contato and the Drawer.
- Content: verb first, ≤ 3 words + an optional →. Wraps to at most 2 lines and is never truncated.
- Do: **one** signal button per viewport. Don't: white text on Sinal; two primaries side by side.

**3. IconButton** · `<IconButton icon label pressed? expanded? controls?>`
- 44×44 circle with a 1px currentColor border.
- A11y: `aria-label` is required (TS-enforced). Toggles use `aria-pressed`; menus use `aria-expanded` and `aria-controls`.
- Don't: use it without a tooltip when the icon is ambiguous.

**4. Field** (Input, Textarea, Select) · `<Field name label type hint? error? required? autocomplete? options?>`
- Anatomy: label (always visible), control, hint, error message with icon.
- States: default, hover, focus, filled, invalid (`:user-invalid`, plus the `error` prop), disabled.
- A11y: `<label for>`; hint and error linked by `aria-describedby`; `aria-invalid` only after interaction; `autocomplete` tokens such as `name`, `email` and `tel`; required marked "(obrigatório)" in text, not by an asterisk alone.
- Content: errors follow v1's voice ("Faltou o e-mail. Sem ele não consigo te responder."). Placeholders never replace labels.
- Edge cases: 320 px width, long labels wrap, 400% zoom.
- Exists for the future contact form (D11). It is built in M5 only if the form is approved.

**5. StatusPill** · `<StatusPill status="available|busy" label>`
- Anatomy: Sinal dot (8px) plus a mono `label`.
- The dot pulses 3× on load and then stays still.
- A11y: text carries the meaning (never color alone). `role` is none, as plain text.
- Content: "DISPONÍVEL PARA NOVOS PROJETOS" / "AGENDA CHEIA ATÉ DEZ." Under 360 px: "DISPONÍVEL".

**6. Chip** · `<Chip as="span|a|button" selected?>`
- Pill, 32 high, mono label.
- Static by default. As a filter it uses `aria-pressed`.
- Edge case: a group wraps; it never scrolls horizontally.

**7. SectionTag** · `<SectionTag index="03" label="Jornada" as="p">`
- Renders "03 — JORNADA" in mono `tag`.
- It is *not* a heading. The section's `<h2>` follows it, and `aria-hidden` is set on the index number.

**8. ServiceCard** · `<ServiceCard n title blurb priceFrom unit="from|hour" cta href featured?>`
- Anatomy: number, title (h3), one line, price (`price` style), ghost CTA.
- Variants: default and featured (inverse).
- Layout: container queries; below 360 px of container width the price moves under the title. Subgrid rows align title, line and price across cards.
- A11y: the whole card is **not** a link. Only the CTA is, with `aria-describedby` pointing to the title.
- Content: blurb ≤ 90 characters; price always shown; "sob consulta" is banned.

**9. StatCard** · `<StatCard value suffix label tone="cream|ink|signal" tilt?>`
- Anatomy: numeral (Fraunces `numeral`) plus a label.
- The tilt is ±2deg max, applied only ≥ 768 px, and contained so it causes no overflow.
- A11y: the number and label sit in one text node order ("40+ projetos completados"). There is no count-up animation (it would read badly to screen readers and cause layout shift).

**10. ProjectRow** · `<ProjectRow slug name type year summary image href>`
- Anatomy: index, name, type and year in mono, a chevron that is always visible, and a hover preview (cursor media state).
- A11y: one `<a>` per row with a name such as "CAATO — Website, 2022". The preview is `aria-hidden`.
- Responsive: under 768 px it shows an inline 16:10 thumbnail instead of the hover preview.
- Edge cases: a missing image shows a Creme-soft placeholder with the initials; a long name wraps to 2 lines.

**11. Testimonial** · `<Testimonial quote author role org? photo?>`
- `<figure><blockquote>…</blockquote><figcaption>`.
- Quote ≤ 140 characters. Placeholder quotes are marked "[exemplo]" and **blocked from production** by a build check.

**12. FAQ** · `<FAQ items={[{q,a}]}>`
- Native `<details name="faq">` (exclusive accordion). Height animates with `interpolate-size: allow-keywords` as progressive enhancement.
- A11y: the summary is a real `<summary>`; the + icon rotates and is `aria-hidden`.
- Content: 4 questions of 2 sentences each (to-do 4.4).

**13. DataChart** · `<DataChart kind="bar" series data unit caption>`
- Rendered as SVG at build time, with no JS.
- Colors: viz-1 Sinal highlights one series, viz-2 is the rest.
- A11y: `<figure>` with a `<figcaption>` and a visually hidden `<table>` of the data. The SVG is `aria-hidden`.
- Max 3 series. Numbers use tabular mono and are labeled directly (no legend).

**14. NavBar** · `<NavBar items current locale>`
- Modes: Creme glass, Tinta, Sinal (follows `data-ground` under it).
- Anatomy: wordmark, links, LanguageSwitch, ThemeToggle, CTA "Conversar".
- A11y: `<nav aria-label="Principal">` with `aria-current="page|location"`. Hover roll (B7) uses `content: attr(data-text) / ""` so screen readers do not read it twice.
- Sticky positioning: `scroll-padding-top: calc(var(--vn-nav-h) + 16px)` keeps focused targets from being hidden (2.4.11).
- Under 900 px it collapses to wordmark, menu IconButton and Drawer.

**15. Drawer** · `<Drawer id label>`
- Native `<dialog>` opened with `showModal()` (inert background, Esc to close, focus returns to the opener).
- Opens with `@starting-style` (translate 100% → 0, 450ms out).
- Links ≥ 56 high; the CTA is Sinal at full width.

**16. LanguageSwitch** · `<LanguageSwitch current alternates>`
- A plain link ("English" / "Português") with `hreflang` and `lang`. Not a menu: there are only 2 languages.

**17. ThemeToggle** · `<ThemeToggle>`
- A `popover` menu of 3 radio items (Sistema/Claro/Escuro), using `role="menuitemradio"` and `aria-checked`.
- Persisted in `localStorage['vn-theme']`; applied before first paint by an inline head script.
- The switch is wrapped in `startViewTransition` (250ms cross-fade, skipped under reduced motion).

**18. Footer** · links, social icons (each with a name), a **Credit** of its own build ("Feito à mão em Palmas, TO"), the © year, privacy, and the last-deploy short SHA (from `PUBLIC_GIT_SHA`).

**19. Credit** (exported to consumers) · `<Credit project? lang="pt|en">`
- "Projeto por Victor Neves ↗", 12–14 px, inherits color, link with `rel="author"`.

**20. SkipLink** · first focusable element, "Pular para o conteúdo". Visible on focus, ink pill.

**21. Marquee** · `<Marquee items speed=60 />` (speed in px/s)
- Content is duplicated once, with the duplicate `aria-hidden` and `inert`.
- A **pause button** (IconButton "Pausar animação" / "Retomar") sits at the end. It also pauses on hover and when focus is inside.
- Reduced motion: static and wrapping.

**22. Journey** (timeline carousel) · `<Journey items>`
- `scroll-snap` list (`<ol>`); cards are focusable `<li tabindex=0>` with a peek of the next card.
- Prev/next IconButtons (2.5.7), arrow keys while focus is inside, a 3-dot position indicator (`aria-hidden`), and drag-to-scroll as a bonus for fine pointers.
- 5–6 highlights, with "Ver jornada completa" opening a `<details>`.

**23. Media** (image window) · `<Media src alt ratio radius="md|2xl" reveal? caption?>`
- `<figure>`, Astro `<Picture>` (AVIF/WebP), optional `figcaption` in the micro style ("FIG. 02 — …").
- `reveal` turns on the clip unveil (B7).
- Width and height are always set; `loading="lazy"` except for the LCP image.

**24. Cursor** · see B8. **25. Icon** · `<Icon name size="16|20|24|32" label?>`
- Sprite `<use href="/_astro/sprite.[hash].svg#name">`. `aria-hidden` unless `label` is set.

## B7. Motion spec

Five signature patterns (v1) plus micro-interactions. Everything animates only `transform`, `opacity`, `clip-path` or `scale`/`translate`.

| Pattern | Trigger | Keyframes / timeline | Reduced motion |
|---|---|---|---|
| **Scroll progress** | Page scroll | `.vn-progress{transform-origin:0 50%;animation:vn-grow linear both;animation-timeline:scroll(root block)}` `@keyframes vn-grow{from{scale:0 1}to{scale:1 1}}`. Only inside `@supports (animation-timeline: scroll())`. | Hidden |
| **Masked line reveal** | Shared IntersectionObserver (threshold .2, rootMargin `0px 0px -10% 0px`) adds `.is-in` once | `.vn-reveal .vn-line{overflow:clip}` `.vn-line>span{translate:0 105%}` `.is-in .vn-line>span{animation:vn-rise var(--vn-dur-line) var(--vn-ease-out) calc(var(--i)*var(--vn-stagger-line)) both}` `@keyframes vn-rise{from{translate:0 105%}to{translate:0 0}}`. Lines are authored spans (no JS splitting). | Hidden state never applied |
| **Image unveil** | Same observer | Window: `clip-path: inset(12% 8% round var(--vn-radius-2xl))` → `inset(0 round …)`, 1200ms in-out. Inner `<img>` scale 1.12 → 1, same timing. | Static, unclipped |
| **Parallax** | View timeline | `animation:vn-par linear both;animation-timeline:view();animation-range:cover` `@keyframes vn-par{from{translate:0 -4%}to{translate:0 4%}}` on the inner image (≤ 8% total). Only inside `@supports`. | Off |
| **Magnetic CTA** | pointermove within the button box + 24 px | `translate = clamp(-6px, d·0.25, 6px)` per axis via rAF; on leave, back to 0 over 450ms spring. Only with `(hover:hover) and (pointer:fine)`. | Off |
| Marquee | Auto | `@keyframes vn-marquee{to{translate:-50% 0}}`, duration = width / 60 px/s, linear, infinite, `animation-play-state` tied to the pause button. | Static |
| Hover text roll (nav) | :hover / :focus-visible | Label and `::after` copy move `translate:0 -100%`, 250ms out | Color change only |
| Status pulse | Load | `box-shadow` ring 0 → 10px, opacity 1 → 0, 1.6s, **3 iterations** | Static dot |
| Press | :active | `scale:.96` 120ms out | Same (no motion sickness risk) |
| Page transition | Cross-document navigation | `@view-transition{navigation:auto}` with a 250ms root fade. `view-transition-name: project-<slug>` morphs the ProjectRow thumbnail into the case-study hero. | `navigation:none` |

Hard rules:
- **No animation on hero text or the LCP image** (it stays visible at first paint).
- Reveal hiding applies only under `html.js` (set by the inline script) **and** `(prefers-reduced-motion: no-preference)`. Without JS, everything is visible.

## B8. Cursor "Sinal" as a state machine

Active only when `(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)`; otherwise the state is **OFF** and the module does not even attach listeners. Main states are exclusive. `pressed` and `onSignal` are orthogonal modifiers.

| From | Event | Guard | To | Effect |
|---|---|---|---|---|
| OFF | media query becomes true | | HIDDEN | Attach listeners |
| any | media query becomes false | | OFF | Detach, remove DOM |
| HIDDEN | pointermove | | IDLE | Fade in 150ms, snap to the pointer |
| IDLE/LINK/LABEL/MEDIA | pointerover target | `a,button,[data-cursor]` | LINK | Lens 56px, difference blend, spring 250ms |
| any visible | pointerover | `[data-cursor-label]` | LABEL | Ink pill with the label text, which rises masked |
| any visible | pointerover | `[data-cursor-media]` | MEDIA | 320×220 preview, 14px radius |
| any visible | pointerover | `input,textarea,select,[contenteditable]` | TEXT | Follower hidden, native I-beam |
| LINK/LABEL/MEDIA/TEXT | pointerout to non-target | | IDLE | Reverse |
| any visible | pointerdown / pointerup | | (same) + `pressed` | scale .85 for 120ms / back |
| any visible | target or ancestor has `[data-ground="signal"]` | | (same) + `onSignal` | Dot turns ink; lens becomes a 44px ink ring (no difference blend) |
| any visible | keydown Tab | | HIDDEN | Never covers a focus ring (2.4.11) |
| any visible | pointerleave document / window blur / visibilitychange hidden | | HIDDEN | Fade out 150ms |
| any visible | scrollend | | (re-evaluate) | `elementFromPoint` under the last pointer position |

Physics: frame-rate-independent easing, `p += (t − p)·(1 − e^(−dt/τ))`, with τ = 30ms for the dot, 90ms for the lens and 150ms for the label (about 450ms to settle). The rAF loop **stops** once every |Δ| < 0.1 px and restarts on the next event.

DOM and a11y:
- One `<div class="vn-cursor" aria-hidden="true">` with `pointer-events:none`, position `fixed`, z 9999.
- Never `cursor:none`. Labels repeat visible text.
- The ≤ 1.5 KB gz budget is checked by the budget script.

## B9. Dark theme rules

1. Three modes: system (default), light, dark. Tokens switch through `light-dark()`; nothing else is theme-specific in components.
2. The dark ground is Tinta #0a0a0a; the inverse chapters go to #000. Text is #e8dec5, never pure white (avoids halation).
3. Sinal lifts to #ff3838 on dark grounds. **The Sinal contact band stays #f50000 with ink text in both themes.**
4. Shadows: double the alpha, or prefer a 1px `line` border on raised surfaces.
5. Logo: reversed via `filter: invert(1)` only in dark mode, with a 4px Creme gap around it. Photos are unchanged; screenshots get a 1px `line` border.
6. `<meta name="theme-color">` comes in two copies with `media` (#f4ead4 / #0a0a0a). The theme script also updates it on manual override.
7. Charts: viz-2 takes the `text` color of the theme; the grid uses `line`.
8. Every axe and Lighthouse run happens in **both** schemes (E3).

## B10. Accessibility test plan (WCAG 2.2 AA)

| Layer | Tool / method | Where | Gate |
|---|---|---|---|
| Token contrast | `tests/contrast.test.js` | brand CI | Blocking |
| Automated, per route × light/dark × 390/1366 | `@axe-core/playwright`, tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice` | site CI `e2e-a11y` | 0 violations, blocking |
| Target size | Playwright: every `a, button, [role=button], summary, input` ≥ 44×44, or ≥ 24 with 24px spacing for inline links (2.5.8) | site CI | Blocking |
| Focus not obscured (2.4.11) | Playwright tabs through every focusable element and asserts its rect does not intersect the sticky nav or the cursor | site CI | Blocking |
| Reflow (1.4.10) | No horizontal scroll at 320, 375, 414 and 768, nor at 1280 with 400% zoom emulation | site CI | Blocking |
| Text spacing (1.4.12) | Inject the 1.5 line-height / 0.12em letter-spacing stylesheet; assert no clipped text (scrollHeight vs clientHeight) | site CI | Blocking |
| Reduced motion | `reducedMotion: 'reduce'`; assert no running animations other than none-duration ones (`document.getAnimations()`) | site CI | Blocking |
| Pause/stop (2.2.2) | Marquee pause button toggles `animation-play-state` | site CI | Blocking |
| Dragging (2.5.7) | Journey is operable through buttons and keys | site CI | Blocking |
| Lighthouse a11y | LHCI = 100 | site CI | Blocking |
| Manual, per release (M3, M5, M6) | Keyboard-only pass; NVDA + Firefox (Windows); VoiceOver + Safari iOS; TalkBack + Chrome; 200% text zoom; Windows High Contrast (`forced-colors`) | Checklist `docs/a11y-checklist.md` | Revisor signs off |
| Consistent help (3.2.6) | Contact links in the same place (footer) on every page | Review | |

## B11. Content & i18n rules

- UI strings live in `src/i18n/ui.ts` as `as const` objects with keys mirrored between pt-BR and en. A unit test fails if the key sets differ.
- Content entries carry `pt` and an optional `en`. A Zod schema enforces lengths: service blurb ≤ 90, testimonial ≤ 140, project summary ≤ 120, meta description 120–155.
- `lang` is set on `<html>` and on inline foreign phrases.
- Numbers, dates and currency only through `src/i18n/format.ts`, never hand-typed.
- Alt text is required by the schema (an empty string is allowed only with `decorative: true`).

---

# C. Brand package distribution

## C1. `voaneves/brand` repo tree

```
brand/
├─ .github/
│  ├─ workflows/ ci.yml · release.yml · pr-title.yml
│  ├─ dependabot.yml · CODEOWNERS · pull_request_template.md
│  ├─ ISSUE_TEMPLATE/ mudanca-de-marca.yml · revisao-trimestral.md
│  └─ rulesets/main.json                 # applied via gh api (E8)
├─ tokens/src/                            # DTCG, hand-edited (single source)
│  ├─ ref/color.tokens.json · ref/space.tokens.json · ref/type.tokens.json
│  ├─ sys/color.tokens.json (light/dark via $extensions.vn.dark) · sys/type.tokens.json · sys/motion.tokens.json · sys/elevation.tokens.json
│  └─ component/button.tokens.json · field.tokens.json · cursor.tokens.json · …
├─ css/src/ reset.css · base.css · components/*.css   # .vn-* classes, @layer vn.components
├─ js/src/ cursor.js · magnetic.js · reveal.js · theme.js · marquee.js · journey.js   # vanilla ES modules, no deps
├─ astro/ Logo.astro · Icon.astro · Credit.astro      # shipped as source
├─ fonts/
│  ├─ source/ (variable TTFs from google/fonts, plus OFL.txt each)   # not published
│  └─ (generated) fraunces-italic-display.woff2 · fraunces-roman.woff2 · schibsted-grotesk.woff2 · schibsted-grotesk-italic.woff2 · jetbrains-mono.woff2
├─ icons/svg/*.svg (normalized, viewBox 0 0 24 24, currentColor) · icons/LICENSES.md
├─ logo/ disc.svg · disc-reverse.svg · wordmark.svg · lockup-*.svg · signature.svg · png/
├─ app-icons/ favicon.svg · favicon.ico · apple-touch-icon.png · icon-192.png · icon-512.png · maskable-512.png
├─ motifs/ services_wave.svg · timeline_wave.svg
├─ board/                                  # Claude board sources (C7)
│  ├─ README.md · 01-marca.md … 14-performance.md
│  └─ components/<Comp>/preview.html · README.md · Cover/preview.html
├─ docs/ decisions/0001-*.md · 03-logo.md · components/<comp>.md (spec cards B6) · a11y-checklist.md
├─ scripts/ build-tokens.mjs · build-fonts.mjs · build-icons.mjs · build-board.mjs · check-exports.mjs
├─ tests/ contrast.test.js · contrast-pairs.json · board-grammar.test.js · icons.test.js · fonts.test.js
├─ dist/                                   # gitignored; built in CI and on publish
├─ package.json · release-please-config.json · .release-please-manifest.json
├─ CHANGELOG.md · LICENSE (MIT) · LICENSES.md · README.md
```

`npm run build` = `build:tokens` (Style Dictionary) + `build:css` (concatenate the layers through Lightning CSS, minified copy too) + `build:icons` (SVGO + sprite) + `build:board`. `build:fonts` runs only when `fonts/source` changes. Its outputs are committed so you can review the diff, and CI checks that regenerating them produces identical bytes.

**Font subsetting** uses the `subset-font` npm package (HarfBuzz; no Python in CI):
- unicode-range `U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2082, U+20AC, U+2122, U+2190-2193, U+2212, U+FEFF`. This includes →, ↓, ® and the ₂ in TiO₂.
- The Fraunces italic *display* file is instanced to `wght 700–900`, `opsz 72–144`. Target ≤ 30 KB.
- Schibsted roman is kept at `wght 400–700`. Target ≤ 30 KB.

## C2. Exports (`package.json`)

```json
{
  "name": "@voaneves/brand",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "sideEffects": ["**/*.css"],
  "files": ["dist", "fonts/*.woff2", "astro", "LICENSES.md"],
  "exports": {
    "./css/tokens.css": "./dist/css/tokens.css",
    "./css/fonts.css": "./dist/css/fonts.css",
    "./css/base.css": "./dist/css/base.css",
    "./css/components.css": "./dist/css/components.css",
    "./css/all.css": "./dist/css/all.css",
    "./tokens": { "types": "./dist/tokens.d.ts", "default": "./dist/tokens.js" },
    "./tokens.json": "./dist/tokens.json",
    "./js/*": "./dist/js/*.js",
    "./fonts/*": "./fonts/*",
    "./icons/*": "./dist/icons/*",
    "./logo/*": "./dist/logo/*",
    "./app-icons/*": "./dist/app-icons/*",
    "./astro/*": "./astro/*",
    "./credit": "./dist/credit/credit.html",
    "./package.json": "./package.json"
  },
  "peerDependencies": { "astro": ">=7" },
  "peerDependenciesMeta": { "astro": { "optional": true } },
  "engines": { "node": ">=24" },
  "publishConfig": { "access": "public", "provenance": true }
}
```

`fonts.css` declares `@font-face` with relative `url(../../fonts/…)`. Vite rewrites these paths and hashes the files in the site build. Each face declares a metric-matched fallback face (`size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`, computed with `@capsizecss/metrics`) for local Georgia/Arial plus Liberation/DejaVu.

## C3. Registry decision: npm public

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| Git dependency `github:voaneves/brand#v1.2.0` | No registry | `npm ci --ignore-scripts` skips `prepare`, so dist would have to be committed; slow installs; weak Dependabot support | ✗ |
| GitHub Packages | Same host | **Needs an auth token to install even public packages**, so every consumer's CI needs `packages:read` cross-repo | ✗ |
| **npm public** | Anonymous install, semver ranges, first-class Dependabot, **trusted publishing via OIDC (no stored token) and provenance attestations** | One-time npm account setup | **✓** |

[MANUAL] setup:
1. Create the npm account or org `voaneves` with 2FA.
2. First publish of `1.0.0` from your machine, or reserve the name with `0.0.0`.
3. On npmjs.com → package → Settings → Trusted publishing: GitHub Actions, `voaneves/brand`, workflow `release.yml`, environment `npm`.
4. Set "Require 2FA and disallow tokens".

Trusted publishing needs npm CLI ≥ 11.5 (included with Node 24).

## C4. Semver policy

| Change | Bump |
|---|---|
| Remove or rename any semantic or component token, CSS class, JS export, `exports` path or icon name; change a token's `$type`; change a font family; raise the minimum Node or Astro version | **MAJOR** |
| Add tokens, components, icons or exports; **intentional value change** of a semantic token that still passes the contrast matrix (marked "visual" in the changelog) | **MINOR** |
| Fix a value to match the spec, docs, board content or build internals | **PATCH** |
| Primitive (`--vn-ref-*`) rename | **MINOR**, because refs are documented as private. A lint test (`check-exports`) fails if `css/components.css` uses `--vn-ref-*` directly. |

Deprecations: a token stays one minor release with `$deprecated: "use --vn-x"`. The CSS emits both and a build warning, and the token is removed at the next major.

## C5. Release automation: release-please

Chosen over changesets because it is a single package, Conventional Commits are already your habit (and are enforced on PR titles, E8), there are no extra files per PR, and it produces a release PR with CHANGELOG plus tag `v1.2.0` plus a GitHub Release.

- `release-please-config.json`: `release-type: node`, `bump-minor-pre-major: false`, `changelog-sections` mapping `feat → Novidades`, `fix → Correções`, `perf → Desempenho`, `docs → Documentação`, `refactor/build/ci/chore` hidden.
- Flow: merge PRs → release-please keeps the release PR updated → merging it creates the tag and Release → the same workflow builds, publishes to npm with provenance, and attaches `board-tokens.json`, `board.zip` and `brand-assets.zip` to the Release.

## C6. Consumers

- Install: `npm i @voaneves/brand@^1`.
- Site usage: `@import "@voaneves/brand/css/tokens.css" layer(vn.tokens);` and so on. Icons come through `@voaneves/brand/astro/Icon.astro`.
- Dependabot in each consumer (`npm`, weekly on Monday 06:00 America/Araguaina) with a dedicated group:

```yaml
groups:
  brand:
    patterns: ["@voaneves/brand"]
    update-types: ["major", "minor", "patch"]
  minor-and-patch:
    exclude-patterns: ["@voaneves/brand"]
    update-types: ["minor", "patch"]
```

- A brand bump PR gets a preview deploy and Lighthouse automatically, so visual changes are reviewed on a real URL. For an immediate bump, use "Check for updates" in the Dependabot UI; no cross-repo PAT is needed.
- Other repos (vote-play, midflow, paru-site): only `Credit`, and optionally the fonts. Nothing forces the palette on them.

## C7. Claude board sync (honest)

- The board lives at https://claude.ai/artifact/AhRNUHwhFocY2hyB45j3Mr. **CI cannot publish to claude.ai; only Claude, acting for you in a session, can.**
- What CI does:
  1. `npm run build:board` assembles `dist/board/` in the artifact file table: `README.md`, section `*.md`, `tokens.json`, `components/<Comp>/preview.html` + `README.md`, `components/bundle.css` (= `components.css`), `fonts/*.woff2`, `assets/Logo/*`, `assets/Icons/*`, `assets/Motifs/*`.
  2. Previews are static HTML that use the real `.vn-*` classes. Interactive demos (Cursor, Marquee) embed their module inline.
  3. The test `board-grammar.test.js` validates the file table rules (paths, names, size caps).
  4. `board.zip` is attached to each Release.
- [MANUAL, about 5 min per release] In Claude Code: "Republicar o board a partir de voaneves/brand vX.Y.Z". Claude downloads `board.zip`, runs a diff against the live board (`Artifact read`) and republishes. The manifest `lastChange.via` = `"Claude Code · voaneves/brand@vX.Y.Z"` (deliberately **not** prefixed "CI", so the board does not show the "may be overwritten" banner).
- The brand book README says: "Board version = package version". Drift shows as a version mismatch.

## C8. Licenses

| Asset | License | Obligation |
|---|---|---|
| Code (CSS, JS, scripts, Astro) | **MIT** | Keep the notice |
| Fraunces, Schibsted Grotesk, JetBrains Mono | **SIL OFL 1.1** | Ship `OFL.txt` per family. A modified subset counts as a "Modified Version": **do not reuse the Reserved Font Name** if the family declares one. Fraunces and Schibsted declare none on Google Fonts; verify in each OFL.txt. Rename `font-family` internally to `"VN Fraunces"` only if required. |
| Icons from Font Awesome 4 glyphs | Icons CC BY 4.0 (FA Free) / font OFL | Attribution in `icons/LICENSES.md` |
| Iconic | **CC BY-SA 3.0** | Attribution **and share-alike** for those SVGs. Mark them in the file header; replace them by M5 if share-alike is unwanted. |
| Zondicons | CC BY 4.0 | Attribution |
| Logo, wordmark, photos, motifs | **All rights reserved** (not MIT) | Stated in `LICENSES.md`: "Marcas e fotografias: todos os direitos reservados; uso apenas com autorização." |

---

# D. Site architecture (Astro)

## D1. Repo decision

**Migrate `voaneves-intermediario` in place on branch `astro`**, rather than a new repo:
- It keeps the issues and history, the GitHub Pages staging for parity comparison, and the improvement-plan context.
- Before starting, tag the legacy state `v4-legacy` (rollback reference).
- The Astro skeleton replaces the root; legacy sources move to `legacy/` until M3 is done and are then deleted.
- After cutover, rename the repo to `voaneves/site` (decision 3). GitHub redirects git URLs, and Pages for the repo is disabled.

## D2. Config

- Toolchain: Astro **7.4.x** (pinned `~7.4.12`), Node 24 in CI (`engines: {"node": ">=24"}`, `.nvmrc` = `24`; the local machine runs 26, which is fine). npm with lockfile v3, `npm ci --ignore-scripts`, and an `allowScripts` list for esbuild, sharp and workerd as in midflow.
- Integrations: `@astrojs/sitemap`, `@astrojs/mdx`. No UI framework integration.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { routeAlternates } from './src/i18n/routes.mjs';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://voaneves.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: { defaultLocale: 'pt-br', locales: ['pt-br', 'en'], routing: { prefixDefaultLocale: false } },
  image: { layout: 'constrained', responsiveStyles: true },
  prefetch: false,                 // Speculation Rules added manually for /projetos/*
  security: { csp: { algorithm: 'SHA-256',
    directives: ["default-src 'self'", "img-src 'self' data:", "font-src 'self'",
      "connect-src 'self' https://cloudflareinsights.com", "manifest-src 'self'", "frame-src 'none'"],
    scriptDirective: { resources: ["'self'", 'https://static.cloudflareinsights.com'] } } },
  integrations: [mdx(), sitemap({ serialize: (item) => ({ ...item, links: routeAlternates(item.url) }) })],
});
```

Notes:
- Astro's `security.csp` (stable since Astro 6) emits a `<meta http-equiv>` CSP with hashes of every inline and bundled script and style. Meta CSP cannot carry `frame-ancestors` or `report-to`, so those go in `_headers` (E10); the browser enforces both policies. Astro CSP does not support `<ClientRouter/>`, which we don't use: page transitions are native cross-document (B7).
- The sitemap integration's own `i18n` option assumes the same slugs per locale. Ours are localized, so `serialize` adds the `xhtml:link` alternates from our route map.

## D3. Page map & routes

| Route (pt-BR) | EN route | Source | Notes |
|---|---|---|---|
| `/` | `/en/` | `src/pages/index.astro`, data collections | Sections below |
| `/projetos/[slug]/` | `/en/projects/[slug]/` | `projects` collection (MDX) | Case studies, `getStaticPaths` |
| `/privacidade/` | `/en/privacy/` | MDX | LGPD notice: no cookies, Cloudflare analytics without personal data, contact channels |
| `/404.html` | (one page, bilingual body) | `src/pages/404.astro` | "Essa página saiu do mapa. Volta pro início?" Pages serves `404.html` with status 404 |
| `/og/[...slug].png` | | Build-time endpoint (Satori + sharp) | 1200×630 per page; Satori needs TTF/OTF, so the static Fraunces TTF is a devDependency |
| `/assets/cv-pt.pdf` | | `public/` | **Path kept** (it is in the old sitemap) |
| `/servicos/` | | **Not at launch** | Revisit after analytics show service-level interest |

Home sections, with new ids and the old ids kept as anchors (`<span id="who">`) for one year:

| # | Tag | id | Content source |
|---|---|---|---|
| — | Hero | `inicio` | `person.headline`, StatusPill, CTAs "Agendar reunião →" / "Ver projetos ↓" |
| 01 | QUEM SOU | `quem-sou` | bio (trimmed 30%), expertise chips |
| 02 | NÚMEROS | `numeros` | `stats` + 3 `impactMetrics` |
| 03 | JORNADA | `jornada` | `experience` (6 highlights + full list) |
| 04 | PROJETOS | `projetos` | `projects` + testimonials (when real) |
| 05 | SERVIÇOS | `servicos` | `services` (8) |
| 06 | PERGUNTAS | `perguntas` | FAQ (4) |
| 07 | CONTATO | `contato` | WhatsApp, Koalendar, e-mail; Sinal band |

Content collections (`src/content.config.ts`, content layer):
- `projects`: `glob('src/content/projects/**/*.mdx')`, schema `{slug, name, type{pt,en}, year, client, role, stack[], metrics[{value,label{pt,en}}], cover: image(), coverAlt{pt,en}, summary{pt,en}, links[], permission: boolean}`. `permission: false` blocks the build in production.
- `services`, `stats`, `experience`, `awards`: `file('src/data/*.json')`.
- One-time importer: `scripts/import-portfolio.mjs` splits `portfolio-data.json` (kept out of git) into these files and **drops** needs_review flags, contacts and LinkedIn status.
- Contacts live in `src/config/site.ts` after decision 9.

Case studies: each one is Problem → Approach → Result (metrics) → Stack → Credits, ≤ 600 words, 3–5 Media figures. The project template uses BreadcrumbList, `<article>`, and "Próximo projeto →".

## D4. Components ↔ design system

| Site component | DS spec | Package asset |
|---|---|---|
| `ds/Button.astro`, `IconButton`, `Chip`, `StatusPill`, `SectionTag`, `Field` | B6 #2–7 | `components.css` |
| `ds/ServiceCard`, `StatCard`, `ProjectRow`, `Testimonial`, `FAQ`, `DataChart`, `Media` | B6 #8–13, 23 | `components.css` |
| `ds/NavBar`, `Drawer`, `LanguageSwitch`, `ThemeToggle`, `Footer`, `SkipLink` | B6 #14–20 | `components.css`, `js/theme.js` |
| `ds/Marquee`, `Journey`, `Cursor` | B6 #21–22, B8 | `js/marquee.js`, `journey.js`, `cursor.js` |
| `Logo`, `Icon`, `Credit` | B6 #1, 25, 19 | `astro/*.astro` (re-exported) |
| `sections/Hero.astro … Contact.astro`, `layouts/Base.astro`, `layouts/CaseStudy.astro` | page layout | site-only CSS (`@layer site`) |

## D5. Islands & JS budget

These are vanilla modules in Astro `<script>` tags; Vite bundles them, they are deferred, and there is no framework runtime.

| Island | Loads | Budget (gz) | Notes |
|---|---|---|---|
| Theme init (inline, head) | Blocking, inline | ≤ 0.5 KB | Sets `data-theme`, `html.js`, theme-color; CSP-hashed |
| Theme toggle | Module, deferred | ≤ 1 KB | `popover`, `startViewTransition` |
| Drawer | Module, under 900 px only (`matchMedia`, dynamic import) | ≤ 1 KB | `<dialog>` |
| Reveal observer | Module | ≤ 0.8 KB | Shared IntersectionObserver |
| Cursor | Dynamic import when fine pointer, hover and motion allowed | ≤ 1.5 KB | B8 |
| Magnetic | Same condition, lazy | ≤ 0.6 KB | |
| Journey | When `#jornada` is near the viewport | ≤ 1 KB | Buttons and keys |
| Marquee pause | Module | ≤ 0.4 KB | |
| CF Web Analytics beacon | Injected after `load` + `requestIdleCallback` | 3rd-party, not ours | D11 |
| **Total first-load (ours)** | | **≤ 8 KB** (v1 budget 20) | |

## D6. Font strategy

- Files come from `@voaneves/brand/fonts` (C1 subsets); Vite hashes them to `/_astro/`.
- **Preload exactly 2** (from v1): `fraunces-italic-display.woff2` (hero) and `schibsted-grotesk.woff2`, each `<link rel="preload" as="font" type="font/woff2" crossorigin>`. Pages turns these into **Early Hints** (103) automatically.
- `font-display: swap` with metric-matched fallbacks (CLS 0). JetBrains Mono and Fraunces roman are not preloaded.
- Budget: ≤ 60 KB for the two preloads.
- Rejected: Astro's built-in fonts API. Our files are already subset and versioned in the brand package, and an extra abstraction gains nothing.

## D7. Image pipeline

- `astro:assets` with sharp. Sources are 2× originals in `src/assets/`.
- `<Picture formats={['avif','webp']} widths={[390, 780, 1200, 1600]} sizes="…">`.
- **LCP hero:** `loading="eager" fetchpriority="high"`, plus `<link rel="preload" as="image" imagesrcset imagesizes type="image/avif">`. ≤ 60 KB AVIF at 780w.
- Everything else is `loading="lazy" decoding="async"` with explicit width and height.
- Client logos (third-party marks) are WebP from the legacy site, shown in grayscale via CSS.
- The OG image is a build-time PNG per page.

## D8. CSS & critical CSS

- Order: `@layer vn.reset, vn.tokens, vn.base, vn.components, site;`.
- `build.inlineStylesheets: 'always'`: each page inlines its own CSS, so there are no render-blocking requests. The legacy `critical` npm step and the 48 KB inline blob go away. Budget: ≤ 14 KB gz inline per page (`check:budget`). If the home page goes over, switch to `'auto'` and measure both in LHCI during M2.
- No Tailwind, so there is no utility runtime. Component CSS is scoped through `.vn-*` classes and Astro `<style>` for sections.
- `content-visibility: auto; contain-intrinsic-size: auto 800px` on below-the-fold sections.

## D9. Service worker: drop it, and ship a kill switch

Why drop it:
1. Hashed `/_astro/*` with `immutable` plus HTML at `max-age=0, must-revalidate` already gives perfect cache-busting.
2. A SW risks stale HTML and adds JS.
3. Lighthouse no longer scores PWA.
4. Offline use is not a need for a portfolio.

The kill switch: old visitors have workers registered at `/worker.min.js` (scope `/`) and `/voaneves-intermediario/worker.min.js`. Ship `public/worker.min.js` and a rewrite of the second path to it (E10):

```js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
})()));
```

Serve it with `Cache-Control: no-cache`, keep it 6 months, then delete it. Keep `manifest.webmanifest` and the icons (installability is harmless, and theme-color is used).

## D10. SEO

- `<title>` = "{Página} — Victor Neves" (home: "Victor Neves — design, dados e código"). Meta description 120–155 characters, canonical absolute URL, `og:*` and `twitter:card=summary_large_image` with the generated OG image.
- `hreflang` pt-BR / en / x-default (→ pt-BR) from the route map, only when the counterpart exists.
- JSON-LD (built from content, never hand-written):
  - Home: `Person` (name, alternateName "voaneves", jobTitle, image, `sameAs` LinkedIn/GitHub/YouTube, address Palmas/TO/BR, knowsLanguage pt/en/es/ko/de, alumniOf UNICAMP).
  - `ProfessionalService` (name "Victor Neves — design, dados e código", areaServed BR, `hasOfferCatalog` with the 8 services and `priceSpecification.minPrice` in BRL as already public).
  - `WebSite` with `inLanguage`.
  - Case studies: `CreativeWork` + `BreadcrumbList`.
- `robots.txt`: `Allow: /` plus the sitemap URL. Keep Cloudflare's "managed robots.txt" **off**: its injected directives can fail Lighthouse's robots audit, and the AI-crawler policy is decided in our own file.
- `pages.dev` and preview hosts get `X-Robots-Tag: noindex` (E10).

## D11. Analytics & forms

- **Analytics:** Cloudflare Web Analytics with the manual snippet (token in `PUBLIC_CF_BEACON_TOKEN`; the beacon token is public, not a secret). It is injected after `load` + idle so there is no third-party request before load. No cookies, so no banner. Fallback: zone HTTP analytics (zero JS). Turn off the Pages auto-inject toggle so CSP stays deterministic.
- **Contact form options:**

| Option | Cost / complexity | LH risk | Spam | Recommendation |
|---|---|---|---|---|
| A. Links only: WhatsApp, Koalendar (new tab), `mailto:` | None | None | None | **Launch with this** |
| B. Pages Function `functions/api/contato.ts` + Turnstile (script loaded on first focus of the form) + e-mail through a provider HTTP API (Resend, or Cloudflare Email Service if enabled on the account) | Medium: secrets `TURNSTILE_SECRET_KEY`, `EMAIL_API_KEY` via `wrangler pages secret put`; rate limit | Low if Turnstile loads lazily | Good | M6, if leads ask for it |
| C. Third-party form SaaS | Low | 3rd-party JS and cookies | Varies | ✗ |

## D12. Migration phases & parity checklist

Phases: **P0** tag `v4-legacy` and freeze the content → **P1** Astro skeleton plus CI (M2) → **P2** section-by-section parity (M3) → **P3** beta host → **P4** cutover (M4) → **P5** polish (M5) → **P6** case studies and EN (M6).

Parity checklist (`docs/MIGRACAO.md`, ticked in PRs):

- [ ] All 8 sections present with the same or improved copy, and the content traces to collections
- [ ] Every outbound link works (WhatsApp, Koalendar, LinkedIn, GitHub, YouTube, CV PDF)
- [ ] Old anchors `#home #who #work #expertise #timeline #portfolio #services #contact` still land on the right section
- [ ] Nav, drawer (new on mobile), theme (now 3 modes), language (EN replaces translate links)
- [ ] Cursor, magnetic, marquee, journey drag, project previews (now pages)
- [ ] Favicons, manifest, theme-color, OG image, `robots.txt`, sitemap (old URLs `/timeline`, `/loading.html`, `/games.html`, `/blog*` removed and redirected, E10)
- [ ] `/assets/cv-pt.pdf` same path
- [ ] Lighthouse 100 ×4 mobile and desktop; axe 0 in both themes
- [ ] Konami/Mario egg: decide to keep it (footer hint), move it to `/lab`, or drop it (to-do X.3)

Rollback before cutover: production DNS is untouched (GitHub Pages). After cutover: E12.

---

# E. GitOps CI/CD on Cloudflare ("like midflow")

## E1. Principles (midflow conventions, plus the fixes)

**Kept from midflow:**
- Workflow `name:` values in Portuguese.
- `permissions: {}` at the top, each job declaring its own least privilege.
- Every action **SHA-pinned with a version comment**.
- `actions/checkout` with `persist-credentials: false`.
- A reusable `ci.yml` (`workflow_call` with input `ref`), called by `deploy.yml`.
- Concurrency `ci-<pr|run>` with cancel; `deploy` without cancel.
- `environment: production`; a guard step when `CLOUDFLARE_API_TOKEN` is missing.
- Wrangler from Actions (direct upload); a smoke test.
- `uptime.yml` every 4 h, opening, commenting and closing "🚨 Fora do ar".
- Dependabot weekly on Monday 06:00 America/Araguaina, grouped, with `chore(deps)` / `chore(ci)`.
- `npm ci --ignore-scripts` with `allowScripts`; Node 24; `engines`; `docs/GITOPS_RUNBOOK.md` using [MANUAL]/[AUTO] tags.

**Added (midflow's gaps that matter for a site):**
- Per-PR preview deployments with the URL commented on the PR.
- Lighthouse CI (static build, preview and production lanes).
- axe through Playwright; lychee; html-validate; a budget script.
- gitleaks, dependency-review and CodeQL.
- A ruleset with required checks, CODEOWNERS, a PR template, and a semantic PR title check.
- A candidate→promote deploy with automatic rollback.
- A weekly audit (external links, production Lighthouse, Cloudflare settings drift).
- **A runbook kept in sync by a test**: `tests/runbook.test.mjs` asserts that every workflow file and cron schedule appears in the runbook inventory table. This fixes midflow's drift (runbook said 15 min, code says 4 h).

**Commit convention:** squash-merge only; the **PR title** is the commit and is validated as Conventional Commits by `pr-title.yml`. No local commitlint or husky (no install hooks, consistent with `--ignore-scripts`).

## E2. Workflow inventory

**Site (`voaneves-intermediario` → `voaneves/site`):**

| File | name | Triggers | Jobs | Secrets / vars |
|---|---|---|---|---|
| `ci.yml` | CI | `pull_request`, `workflow_call(ref)`, `workflow_dispatch` | `check` · `e2e-a11y` (needs check) · `lighthouse` (needs check; matrix mobile/desktop) · `seguranca` (gitleaks + dependency-review on PR) | none |
| `preview.yml` | Prévia (PR) | `pull_request` [opened, synchronize, reopened, closed] | `build` (no secrets) → `publicar` (env `preview`) → `lighthouse-previa` (no secrets) · `limpar` on closed | env `preview`: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`; vars `CF_PAGES_PROJECT` |
| `deploy.yml` | Deploy (site no Cloudflare Pages) | `push: main`, `workflow_dispatch` | `checks` (uses ci.yml) → `deploy` (env `production`: build → candidate → verify → promote → smoke → auto-rollback) → `lighthouse-producao` | env `production`: same secrets; vars `SITE_URL`, `CF_PAGES_PROJECT`, `PUBLIC_CF_BEACON_TOKEN` |
| `uptime.yml` | Monitoramento (uptime) | cron `0 */4 * * *`, dispatch | `check` | env `ops`: var `SITE_URL` |
| `auditoria.yml` | Auditoria semanal | cron `0 9 * * 1` (06:00 Araguaina), dispatch | `links-externos` (lychee) · `lighthouse-producao` · `cloudflare-drift` · opens or closes the issue "🔎 Auditoria semanal" | env `ops`: `CLOUDFLARE_AUDIT_TOKEN` (read-only), `CLOUDFLARE_ZONE_ID` |
| `pr-title.yml` | Título do PR | `pull_request_target` [opened, edited, synchronize] | `validar` (amannn/action-semantic-pull-request; never checks out PR code) | `GITHUB_TOKEN` (`pull-requests: read`) |
| CodeQL | (default setup in Settings) | push, PR, weekly | javascript-typescript, actions | none |
| `dependabot.yml` | | weekly Monday 06:00 America/Araguaina | npm (groups `brand`, `minor-and-patch`), github-actions (group `actions`) | |

**Brand (`voaneves/brand`):**

| File | name | Triggers | Jobs | Secrets / vars |
|---|---|---|---|---|
| `ci.yml` | CI | `pull_request`, `workflow_call(ref)`, `workflow_dispatch` | `check`: lint (oxlint + stylelint) → build → `node --test` (contrast, board grammar, icons, fonts, exports) → fonts byte-reproducibility → `publint` + `attw --pack` → `npm pack --dry-run` · `seguranca`: gitleaks + dependency-review | none |
| `release.yml` | Release | `push: main` | `release-please` (contents/PR write) → `publicar` (if released; env `npm`; `id-token: write`; uses ci.yml first) → upload of Release assets | **No npm token** (OIDC). `GITHUB_TOKEN` only. |
| `pr-title.yml` | Título do PR | as in the site | `validar` | |
| CodeQL default setup, `dependabot.yml` | | | | |

## E3. Site `ci.yml` (complete skeleton)

```yaml
# Verifica PRs e chamadas reutilizáveis: lint + astro check + testes + build + orçamento + HTML + links internos,
# acessibilidade (Playwright + axe, temas claro/escuro) e Lighthouse CI (100 nas 4 categorias, mediana de 5).
name: CI

on:
  workflow_call:
    inputs:
      ref:
        description: 'Commit/branch/tag a testar (vazio = padrão do evento)'
        type: string
        required: false
        default: ''
  pull_request:
  workflow_dispatch:

# Nenhuma permissão no nível do workflow; cada job declara a sua (menor privilégio).
permissions: {}

concurrency:
  group: ci-${{ github.event.pull_request.number || github.run_id }}
  cancel-in-progress: true

jobs:
  check:
    name: Qualidade (lint, tipos, testes, build, orçamento)
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@<sha> # v7.0.1
        with:
          ref: ${{ inputs.ref }}
          persist-credentials: false
      - uses: actions/setup-node@<sha> # v7.1.0
        with:
          node-version: 24
          cache: npm
      - run: npm ci --ignore-scripts
      - run: npm run lint              # oxlint + prettier --check
      - run: npm run check             # astro check (tipos .astro/.ts)
      - run: npm test                  # node --test: i18n, conteúdo, _redirects, _headers, runbook
      - name: Build
        env:
          PUBLIC_SITE_URL: https://voaneves.com
          PUBLIC_GIT_SHA: ${{ github.sha }}
        run: npm run build
      - run: npm run check:budget      # budget.json: HTML, CSS inline, JS por ilha, fontes, imagem LCP
      - run: npm run check:html        # html-validate "dist/**/*.html"
      - name: Links internos (lychee, offline)
        uses: lycheeverse/lychee-action@<sha> # v2.x
        with:
          args: --offline --no-progress --include-fragments --root-dir "${{ github.workspace }}/dist" "dist/**/*.html"
          fail: true
      - uses: actions/upload-artifact@<sha> # v7.0.2
        with:
          name: dist
          path: dist/
          retention-days: 3

  e2e-a11y:
    name: Acessibilidade (Playwright + axe)
    needs: check
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@<sha> # v7.0.1
        with:
          ref: ${{ inputs.ref }}
          persist-credentials: false
      - uses: actions/setup-node@<sha> # v7.1.0
        with:
          node-version: 24
          cache: npm
      - run: npm ci --ignore-scripts
      - uses: actions/download-artifact@<sha> # v7.x
        with:
          name: dist
          path: dist/
      - name: Cache dos navegadores do Playwright
        id: pw
        uses: actions/cache@<sha> # v4.3.0
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
      - name: Instalar Chromium
        run: |
          if [ "${{ steps.pw.outputs.cache-hit }}" = "true" ]; then npx playwright install-deps chromium
          else npx playwright install --with-deps chromium; fi
      # playwright.config.ts sobe `wrangler pages dev dist --port 8788` (aplica _headers e _redirects).
      - name: Testes de acessibilidade, alvo, foco, reflow, movimento, redirects
        run: npm run e2e
      - name: Relatório do Playwright
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@<sha> # v7.0.2
        with:
          name: playwright-report
          path: |
            playwright-report/
            test-results/
          retention-days: 7
          if-no-files-found: ignore

  lighthouse:
    name: Lighthouse (${{ matrix.form }})
    needs: check
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    permissions:
      contents: read
    strategy:
      fail-fast: false
      matrix:
        form: [mobile, desktop]
    steps:
      - uses: actions/checkout@<sha> # v7.0.1
        with:
          ref: ${{ inputs.ref }}
          persist-credentials: false
      - uses: actions/setup-node@<sha> # v7.1.0
        with:
          node-version: 24
          cache: npm
      - run: npm ci --ignore-scripts
      - uses: actions/download-artifact@<sha> # v7.x
        with:
          name: dist
          path: dist/
      - name: LHCI (estático, 5 execuções, mediana, 100 ×4)
        env:
          LHCI_FORM: ${{ matrix.form }}
        run: npx lhci autorun --config=lighthouserc.cjs
      - uses: actions/upload-artifact@<sha> # v7.0.2
        if: ${{ !cancelled() }}
        with:
          name: lhci-${{ matrix.form }}
          path: .lighthouseci/
          retention-days: 14

  seguranca:
    name: Segurança (segredos e dependências)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@<sha> # v7.0.1
        with:
          ref: ${{ inputs.ref }}
          fetch-depth: 0
          persist-credentials: false
      - name: gitleaks
        uses: gitleaks/gitleaks-action@<sha> # v2.x
        env:
          GITHUB_TOKEN: ${{ github.token }}
      - name: Revisão de dependências
        if: github.event_name == 'pull_request'
        uses: actions/dependency-review-action@<sha> # v4.x
        with:
          fail-on-severity: moderate
          deny-licenses: GPL-3.0, AGPL-3.0
```

`lighthouserc.cjs` (static lane):

```js
const form = process.env.LHCI_FORM ?? 'mobile';
module.exports = { ci: {
  collect: {
    startServerCommand: 'npx wrangler pages dev dist --port 8788',
    startServerReadyPattern: 'Ready on',
    url: ['http://localhost:8788/', 'http://localhost:8788/en/',
          'http://localhost:8788/projetos/mte/', 'http://localhost:8788/privacidade/'],
    numberOfRuns: 5,
    settings: form === 'desktop' ? { preset: 'desktop' } : {},
  },
  assert: { assertions: {
    'categories:performance':    ['error', { minScore: 1, aggregationMethod: 'median-run' }],
    'categories:accessibility':  ['error', { minScore: 1, aggregationMethod: 'median-run' }],
    'categories:best-practices': ['error', { minScore: 1, aggregationMethod: 'median-run' }],
    'categories:seo':            ['error', { minScore: 1, aggregationMethod: 'median-run' }],
    'largest-contentful-paint':  ['error', { maxNumericValue: form === 'desktop' ? 800 : 1200, aggregationMethod: 'median-run' }],
    'cumulative-layout-shift':   ['error', { maxNumericValue: 0.01 }],
    'total-blocking-time':       ['error', { maxNumericValue: 50 }],
  } },
  upload: { target: 'filesystem', outputDir: '.lighthouseci' },
} };
```

- The 404 page is excluded from Lighthouse, because `http-status-code` would fail SEO by design. It is covered by axe.
- `budget.json` is **our own schema**, read by `scripts/check-budget.mjs`. Lighthouse 12 removed LightWallet budgets, so `budgetsFile` is not used. Values are v1's: HTML ≤ 35 KB gz, inline CSS ≤ 14, JS first-load ≤ 20 (target 8), per island ≤ 10, preload fonts ≤ 60, LCP image ≤ 60, first-load total ≤ 500 KB, third-party at load = 0.

## E4. Site `preview.yml`

```yaml
# Publica cada PR em https://pr-<n>.<projeto>.pages.dev, comenta a URL no PR e roda Lighthouse na prévia.
# PR code never runs in the job that holds the Cloudflare token (artifact handoff).
name: Prévia (PR)
on:
  pull_request:
    types: [opened, synchronize, reopened, closed]
permissions: {}
concurrency:
  group: previa-${{ github.event.pull_request.number }}
  cancel-in-progress: true
jobs:
  build:
    if: github.event.action != 'closed' && github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-24.04
    permissions: { contents: read }
    steps:
      - checkout (persist-credentials: false) · setup-node 24 · npm ci --ignore-scripts
      - run: npm run build   # PUBLIC_SITE_URL=https://voaneves.com (canonical stays production)
      - upload-artifact dist-previa
  publicar:
    needs: build
    runs-on: ubuntu-24.04
    environment: preview
    permissions: { contents: read, pull-requests: write, deployments: write }
    outputs: { url: ${{ steps.deploy.outputs.alias }} }
    steps:
      - download-artifact dist-previa → dist/     # no checkout: nothing from the PR is executed
      - name: Conferir credenciais do Cloudflare   # same guard as midflow (ready=true|false)
      - name: Publicar prévia
        id: deploy
        if: steps.cf.outputs.ready == 'true'
        env: { CLOUDFLARE_API_TOKEN: …, CLOUDFLARE_ACCOUNT_ID: …, WRANGLER_OUTPUT_FILE_DIRECTORY: ${{ runner.temp }}/wr }
        run: |
          npx --yes wrangler@4.162.0 pages deploy dist --project-name="${{ vars.CF_PAGES_PROJECT }}" \
            --branch="pr-${{ github.event.pull_request.number }}" --commit-hash="${{ github.event.pull_request.head.sha }}"
          jq -r 'select(.type=="pages-deploy-detailed") | "url=\(.url)\nalias=\(.alias)"' "$RUNNER_TEMP"/wr/*.json >> "$GITHUB_OUTPUT"
      - name: Comentar a URL no PR (comentário fixo, editado a cada push)
        env: { GH_TOKEN: ${{ github.token }} }
        run: gh pr comment ${{ github.event.pull_request.number }} -R ${{ github.repository }} --edit-last --create-if-none --body "…Prévia: ${{ steps.deploy.outputs.alias }} (commit ${{ github.event.pull_request.head.sha }})…"
  lighthouse-previa:
    needs: publicar
    runs-on: ubuntu-24.04
    permissions: { contents: read }
    steps:
      - checkout · setup-node · npm ci --ignore-scripts
      - run: npx lhci autorun --config=lighthouserc.preview.cjs   # URL = needs.publicar.outputs.url
        # perf/a11y/BP = 100 (median of 5); SEO: skip 'is-crawlable' (previews are noindex) and 'canonical' (points to production)
  limpar:
    if: github.event.action == 'closed'
    environment: preview
    # Lists the deployments of the pr-<n> alias via the API and deletes them (DELETE …/deployments/{id}?force=true)
```

The preview lane is what proves the **real** headers (CSP, HSTS, Early Hints) and the CDN still score 100. The static lane proves SEO, and the production lane (E5) proves everything with no skipped audits.

## E5. Site `deploy.yml` (complete skeleton)

```yaml
# Um push na main publica o site:
#   1. checks  → lint, tipos, testes, build, orçamento, a11y, Lighthouse (via ci.yml)
#   2. deploy  → build único → publica candidato (branch "candidato") → smoke no candidato →
#                promove (mesmo dist, branch main = produção) → smoke em produção → rollback automático se falhar
#   3. lighthouse-producao → 100 ×4 sem auditorias ignoradas; abre issue se cair (não reverte sozinho)
#
# GitHub → Settings → Environments → "production": branch policy = main only; no required reviewer (decision 8).
# Secrets (environment "production"):
#   CLOUDFLARE_API_TOKEN   token "Account › Cloudflare Pages › Edit" (nothing else)
#   CLOUDFLARE_ACCOUNT_ID  Cloudflare account ID
# Variables: CF_PAGES_PROJECT (voaneves), SITE_URL (https://voaneves.com), PUBLIC_CF_BEACON_TOKEN (public)
# Without CLOUDFLARE_API_TOKEN the publish steps are skipped (with a warning); build and budget still run.
name: Deploy (site no Cloudflare Pages)

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions: {}

concurrency:
  group: deploy
  cancel-in-progress: false

jobs:
  checks:
    name: CI
    permissions:
      contents: read
    uses: ./.github/workflows/ci.yml
    with:
      ref: ${{ github.sha }}

  deploy:
    needs: checks
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    environment:
      name: production
      url: ${{ vars.SITE_URL }}
    permissions:
      contents: read
    outputs:
      ready: ${{ steps.cf.outputs.ready }}
    env:
      PROJECT: ${{ vars.CF_PAGES_PROJECT || 'voaneves' }}
      SITE_URL: ${{ vars.SITE_URL || 'https://voaneves.com' }}
      CF_API: https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID }}/pages/projects/${{ vars.CF_PAGES_PROJECT || 'voaneves' }}
    steps:
      - uses: actions/checkout@<sha> # v7.0.1
        with:
          persist-credentials: false
      - uses: actions/setup-node@<sha> # v7.1.0
        with:
          node-version: 24
          cache: npm
      - run: npm ci --ignore-scripts
      - name: Build
        env:
          PUBLIC_SITE_URL: ${{ env.SITE_URL }}
          PUBLIC_GIT_SHA: ${{ github.sha }}
          PUBLIC_CF_BEACON_TOKEN: ${{ vars.PUBLIC_CF_BEACON_TOKEN }}
        run: npm run build
      - run: npm run check:budget

      - name: Conferir credenciais do Cloudflare
        id: cf
        env:
          TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        run: |
          if [ -z "$TOKEN" ]; then
            echo "::warning::CLOUDFLARE_API_TOKEN não configurado — site não publicado."
            echo "ready=false" >> "$GITHUB_OUTPUT"
          else
            echo "ready=true" >> "$GITHUB_OUTPUT"
          fi

      - name: Guardar o deploy de produção atual (alvo de rollback)
        id: prev
        if: steps.cf.outputs.ready == 'true'
        env:
          TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        run: |
          id=$(curl -fsS -H "Authorization: Bearer $TOKEN" "$CF_API/deployments?env=production&per_page=1" | jq -r '.result[0].id // empty')
          echo "id=$id" >> "$GITHUB_OUTPUT"

      - name: Publicar candidato
        id: cand
        if: steps.cf.outputs.ready == 'true'
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          WRANGLER_OUTPUT_FILE_DIRECTORY: ${{ runner.temp }}/wr-cand
        run: |
          npx wrangler pages deploy dist --project-name="$PROJECT" --branch=candidato --commit-hash="$GITHUB_SHA"
          jq -r 'select(.type=="pages-deploy-detailed") | "url=\(.url)"' "$RUNNER_TEMP"/wr-cand/*.json >> "$GITHUB_OUTPUT"

      - name: Smoke no candidato
        if: steps.cf.outputs.ready == 'true'
        run: bash scripts/ci/smoke.sh "${{ steps.cand.outputs.url }}" candidate

      - name: Promover para produção
        id: prod
        if: steps.cf.outputs.ready == 'true'
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        # Assets are deduplicated by hash, so this upload is near-instant.
        run: npx wrangler pages deploy dist --project-name="$PROJECT" --branch=main --commit-hash="$GITHUB_SHA" --commit-message="$(git log -1 --pretty=%s)"

      - name: Smoke em produção
        id: smoke
        if: steps.cf.outputs.ready == 'true'
        run: |
          sleep 5
          bash scripts/ci/smoke.sh "$SITE_URL" production

      - name: Rollback automático
        if: failure() && steps.prod.outcome == 'success' && steps.prev.outputs.id != ''
        env:
          TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        run: |
          curl -fsS -X POST -H "Authorization: Bearer $TOKEN" "$CF_API/deployments/${{ steps.prev.outputs.id }}/rollback"
          echo "::error::Smoke falhou; produção revertida para ${{ steps.prev.outputs.id }}. Ver docs/GITOPS_RUNBOOK.md §Rollback."

  lighthouse-producao:
    needs: deploy
    if: needs.deploy.outputs.ready == 'true'
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    permissions:
      contents: read
      issues: write
    steps:
      - uses: actions/checkout@<sha> # v7.0.1
        with:
          persist-credentials: false
      - uses: actions/setup-node@<sha> # v7.1.0
        with:
          node-version: 24
          cache: npm
      - run: npm ci --ignore-scripts
      - name: LHCI em produção (100 ×4, sem auditorias ignoradas)
        id: lh
        continue-on-error: true
        run: npx lhci autorun --config=lighthouserc.prod.cjs
      - name: Abrir/atualizar issue se < 100
        if: steps.lh.outcome == 'failure'
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          gh label create lighthouse --color FBCA04 2>/dev/null || true
          gh issue create --label lighthouse --title "📉 Lighthouse < 100 em produção ($GITHUB_SHA)" \
            --body "Execução: $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
          exit 1
```

`scripts/ci/smoke.sh <url> <mode>` checks:
1. `GET /` returns 200 and contains `VOANEVES`.
2. `GET /en/` returns 200 with `lang="en"`.
3. `GET /nao-existe/` returns **404**.
4. `GET /voaneves-intermediario/` returns **301** with `Location: /`.
5. `GET /worker.min.js` returns 200 with `no-cache`.
6. Response headers include `strict-transport-security`, `content-security-policy` and `x-content-type-options`.
7. One `/_astro/*.css|js` asset has `immutable`.
8. In production mode only, `https://www.voaneves.com/x?y=1` returns 301 to `https://voaneves.com/x?y=1`.

As in midflow, a 403 from Cloudflare (Bot Fight Mode) is reported as a notice, not a failure, and the runbook explains it.

## E6. Ops workflows (site)

- **`uptime.yml`** "Monitoramento (uptime)": a copy of midflow's structure (cron `0 */4 * * *`, env `ops`, issue "🚨 Fora do ar" with label `incident`, comments throttled to one per hour, auto-close). `scripts/ci/uptime-check.sh` probes `SITE_URL` (200 plus the "VOANEVES" marker), the `www` 301, `/en/` 200, and certificate expiry > 14 days (`openssl s_client`). It has no Supabase, so no keep-alive.
- **`auditoria.yml`** "Auditoria semanal": Monday 09:00 UTC. It runs:
  1. lychee over the production sitemap, external links included, with `--accept 200,206,429` and retries.
  2. LHCI on production, mobile and desktop.
  3. **Cloudflare drift**: `scripts/ops/cf-audit.sh` GETs the zone settings, DNS records, rulesets and Pages project config with a **read-only** token and diffs them against `ops/cloudflare-expected.json`.

  It opens or updates the issue "🔎 Auditoria semanal" (label `audit`) on any failure and closes it when everything is green.

## E7. Brand workflows

- `ci.yml`: the same skeleton as E3's `check`, with steps `lint` → `build` → `test` → `check:fonts` (regenerate and `git diff --exit-code fonts/`) → `check:board` → `npx publint` → `npx @arethetypeswrong/cli --pack` → `npm pack --dry-run`, plus `seguranca`.
- `release.yml`:

```yaml
name: Release
on: { push: { branches: [main] } }
permissions: {}
concurrency: { group: release, cancel-in-progress: false }
jobs:
  release-please:
    runs-on: ubuntu-24.04
    permissions: { contents: write, pull-requests: write }
    outputs: { released: ${{ steps.rp.outputs.release_created }}, tag: ${{ steps.rp.outputs.tag_name }} }
    steps:
      - id: rp
        uses: googleapis/release-please-action@<sha> # v4.x
        with: { config-file: release-please-config.json, manifest-file: .release-please-manifest.json }
  checks:
    needs: release-please
    if: needs.release-please.outputs.released == 'true'
    permissions: { contents: read }
    uses: ./.github/workflows/ci.yml
    with: { ref: ${{ needs.release-please.outputs.tag }} }
  publicar:
    needs: [release-please, checks]
    runs-on: ubuntu-24.04
    environment: npm
    permissions: { contents: write, id-token: write }   # id-token: npm trusted publishing (OIDC)
    steps:
      - checkout (ref: tag, persist-credentials: false) · setup-node 24 (registry-url https://registry.npmjs.org) · npm ci --ignore-scripts
      - run: npm run build
      - run: npm publish --provenance --access public
      - name: Anexar artefatos do board à Release
        env: { GH_TOKEN: ${{ github.token }} }
        run: |
          (cd dist/board && zip -qr ../../board.zip .)
          gh release upload "${{ needs.release-please.outputs.tag }}" board.zip dist/board/tokens.json#board-tokens.json brand-assets.zip
```

## E8. Repo governance (both repos)

- **Ruleset `main`** (stored in `.github/rulesets/main.json`, applied with `gh api -X POST repos/voaneves/<repo>/rulesets --input .github/rulesets/main.json` and documented in the runbook):
  - Require a PR (0 approvals: a solo maintainer cannot approve his own PRs) and conversation resolution.
  - Required status checks, site: `Qualidade (lint, tipos, testes, build, orçamento)`, `Acessibilidade (Playwright + axe)`, `Lighthouse (mobile)`, `Lighthouse (desktop)`, `Segurança (segredos e dependências)`, `validar`, `publicar` (preview), `CodeQL`. Brand: `check`, `seguranca`, `validar`, `CodeQL`.
  - Require branches to be up to date; squash merge only; linear history; block force pushes and deletion.
  - Bypass: repository admin, **pull-request only** (break-glass, logged).
- **CODEOWNERS:** `* @voaneves`. Also `/.github/ @voaneves` and `/public/_headers @voaneves` as explicit sensitive paths.
- **PR template** (`pull_request_template.md`, pt-BR): O quê / Por quê / Como testar / Prévia (auto) / Checklist (Lighthouse 100, axe 0, EN atualizado, copy segue glossário, screenshots claro/escuro, CHANGELOG via título convencional).
- **Semantic PR title:** types `feat|fix|perf|docs|refactor|build|ci|chore|revert|test`, scopes free, `!` for breaking.
- **Dependabot:** E2/C6. **CodeQL:** default setup (no YAML to maintain; languages JS/TS plus Actions).

## E9. Cloudflare setup

**Pages via direct upload from Actions (like midflow), not Cloudflare's Git integration:**
- The CI gates (LHCI, axe) run **before** anything is published.
- The candidate→promote flow and the rollback live in versioned YAML.
- It matches midflow, bip-kids and vote-play.
- Git integration would build on Cloudflare's runners and skip our gates.

`wrangler.jsonc` (site root):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "voaneves",
  "pages_build_output_dir": "./dist",
  "compatibility_date": "2026-11-01"
}
```

Once this file exists, the dashboard shows these fields read-only, so the config lives in git.

[MANUAL] one-time:
1. `npx wrangler pages project create voaneves --production-branch=main`.
2. Create API token **"gh-actions-pages-voaneves"** with **Account › Cloudflare Pages › Edit** only, scoped to your account, with no zone permissions and a 1-year TTL logged in the runbook. DNS changes are done by hand once (E11), so CI needs no DNS permission.
3. Create a read-only audit token: Zone › Zone Settings Read, Zone › DNS Read, Zone › Config Rules/Single Redirect Read, Account › Cloudflare Pages Read.
4. GitHub environments `preview`, `production`, `ops` with these secrets and variables. `preview` allows all branches; `production` allows `main` only.
5. Turn off Pages "Web Analytics auto-inject"; create the Web Analytics site and copy the beacon token into `PUBLIC_CF_BEACON_TOKEN`.

Zone settings for voaneves.com (documented in the runbook and checked by `cf-audit.sh`):

| Setting | Value | Why |
|---|---|---|
| SSL/TLS mode | Full (strict) | Pages has a valid certificate |
| Always Use HTTPS / Automatic HTTPS Rewrites | On / On | |
| Minimum TLS / TLS 1.3 | 1.2 / On | |
| HSTS (zone) | **Off.** Sent from `_headers` instead | Single source in git |
| HTTP/3 (QUIC), 0-RTT | On, On | Static GETs only |
| Early Hints | On | Pages derives `Link` from preloads |
| Brotli | Automatic (no toggle) | |
| Rocket Loader | **Off** | Rewrites scripts: breaks CSP hashes and costs about 130 ms (seen in the 2026-07 PSI) |
| Auto Minify | Off / gone (Cloudflare retired it in 2024) | Would break hashes |
| Email Obfuscation | **Off** | Injects `email-decode.min.js`, which breaks CSP and adds an unlabelled link (old audit A2) |
| Mirage, Zaraz, Cloudflare Fonts, Always Online | Off | 3rd-party rewriting |
| Bot Fight Mode | Off (or a WAF skip for `/` from GitHub runners) | Smoke and uptime got 403s in midflow |
| Managed robots.txt / AI Crawl Control | Off (policy lives in our `robots.txt`) | Lighthouse robots audit |
| Speed Brain (speculation) | Off. We ship our own Speculation Rules for `/projetos/*` | Determinism |

**IaC decision: no Terraform.** One zone, ~10 settings, one Pages project. Terraform state, provider churn and an extra secret cost more than they save. Instead: runbook tables plus `ops/cloudflare-expected.json` plus the weekly read-only drift check (E6). Revisit if a second zone or Workers routes appear.

## E10. `public/_headers` & `public/_redirects`

```
# _headers — Cloudflare Pages
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/worker.min.js
  Cache-Control: no-cache

/assets/cv-pt.pdf
  Cache-Control: public, max-age=86400

https://voaneves.pages.dev/*
  X-Robots-Tag: noindex

https://beta.voaneves.com/*
  X-Robots-Tag: noindex
```

- HTML keeps the Pages default `Cache-Control: public, max-age=0, must-revalidate` (ETag revalidation), so `/*` deliberately **does not** set Cache-Control. Pages joins duplicate headers with a comma, so setting it there would corrupt the `/_astro/*` value.
- The full script/style CSP (with hashes) is the Astro meta tag (D2); the header adds what meta cannot carry.
- Add `preload` to HSTS and submit to the preload list only at M5, after 30 days without problems.
- Preview deployments get `X-Robots-Tag: noindex` from Pages automatically; verify this in M2.

```
# _redirects — first match wins
/voaneves-intermediario/worker.min.js  /worker.min.js  200
/voaneves-intermediario/*              /:splat         301
/timeline                              /#jornada       301
/timeline.html                         /#jornada       301
/loading.html                          /               301
/games.html                            /               301
/project/*                             /projetos/:splat 301
/cv                                    /assets/cv-pt.pdf 302
/paru-site/*   https://voaneves.github.io/paru-site/:splat  302
/bip-kids/*    https://voaneves.github.io/bip-kids/:splat   302
```

- `/blog*` (2022 sitemap) already returns 404 on the old site: it stays 404 and leaves the sitemap.
- The project-site redirects start as **302** and become 301 after 30 days, once the target URLs are confirmed. The full list comes from the inventory in E11 step T-7.
- A unit test parses `_redirects` and `_headers` (rule count < 100 headers / 2,100 redirects; no loops; the destination exists in `dist` for internal targets). Playwright asserts each rule through `wrangler pages dev`.

## E11. Custom domain cutover (voaneves.com, www)

Context: the domain was bought at Cloudflare Registrar, so the zone is already on Cloudflare nameservers. Today apex and `www` point to GitHub Pages (A `185.199.108–111.153`, AAAA `2606:50c0:8000–8003::153`, or CNAME `voaneves.github.io`), serving the `voaneves.github.io` repo. The intermediario repo is served at `/voaneves-intermediario/`, **and every other Pages-enabled repo is served under `voaneves.com/<repo>/`**.

| When | Step | Owner |
|---|---|---|
| T-7d | **Inventory:** `gh api users/voaneves/repos --paginate -q '.[] \| select(.has_pages) \| .name'` → complete the `_redirects` project list. Export the zone (DNS → Export, BIND file kept outside git). Record proxied vs DNS-only per record. Note MX/TXT (e-mail, verification), which **must not be touched**. | auxiliar + [MANUAL] |
| T-7d | Add custom domain **`beta.voaneves.com`** to the Pages project (Cloudflare creates the CNAME). Run the full LHCI production config and the smoke test against it. Keep it noindex. | executor |
| T-1d | If apex/www are **DNS-only**: lower TTL to 60 s. If **proxied**: TTL is irrelevant, because the edge switches instantly. Confirm `main` is green, and that the kill-switch worker and redirects pass on beta. | [MANUAL] |
| T0 (off-peak, for example Sunday 08:00 BRT) | 1. GitHub → `voaneves.github.io` → Settings → Pages: **remove the custom domain** and delete the `CNAME` file. This stops GitHub redirecting `*.github.io` to voaneves.com, so project sites live again at `voaneves.github.io/<repo>/`. 2. Cloudflare → Pages → voaneves → Custom domains → **Add `voaneves.com`**. Accept the replacement of the A/AAAA records with a CNAME to `voaneves.pages.dev` (flattened at the apex). 3. DNS: `www` = `AAAA 100::` proxied. Rules → **Single Redirect** "www → apex": `http.host eq "www.voaneves.com"` → `concat("https://voaneves.com", http.request.uri.path)`, 301, preserve query string. 4. Run `deploy.yml` via `workflow_dispatch` (re-smoke). | [MANUAL] + executor |
| T+1h | Smoke and uptime green; `curl -I` apex/www/http; check that the old intermediario URL redirects; Search Console: verify the property and submit the new sitemap. | revisor |
| T+24h | PSI on production, 100 ×4 for mobile and desktop; screenshot it into the runbook. | auxiliar |
| T+14d | Replace `voaneves.github.io` with a tiny page (meta refresh and canonical to voaneves.com) to avoid duplicate content; **disable Pages** on `voaneves-intermediario`; remove `beta.` (or keep it for a while). Rename the repo to `voaneves/site` (decision 3). | executor + [MANUAL] |
| T+30d | 302 → 301 for project redirects; HSTS `preload`. | executor |

**Cutover rollback (RTO ≤ 15 min):**
1. Pages → Custom domains → remove `voaneves.com`.
2. Restore the A/AAAA records from the exported zone.
3. Re-add the custom domain on `voaneves.github.io`.

GitHub serves immediately when the records are proxied (the edge certificate covers it). In DNS-only mode its certificate may take up to about 1 h, so prefer proxied during the window.

## E12. DR & rollback

| Failure | Detection | Action | RTO |
|---|---|---|---|
| Bad deploy (functional) | Smoke test in `deploy.yml` | **Automatic** rollback to the previous production deployment (API) | ~1 min |
| Bad deploy (visual or content) | You, the uptime marker, or a Lighthouse issue | Pages → Deployments → previous → **Rollback** (dashboard, 1 click), *then* `git revert` the PR so git matches production | ≤ 5 min |
| Lighthouse < 100 in production | `lighthouse-producao` or the weekly audit opens an issue | Fix forward through a PR; roll back if it is a regression | days (no outage) |
| Cloudflare token leaked | gitleaks, or Cloudflare notification | Roll the token in Cloudflare, update both environments, review the Pages deployment log | 15 min |
| Cloudflare Pages outage | Uptime issue | Fallback: re-enable GitHub Pages on `voaneves.github.io` with a static `dist` push (documented script `scripts/ops/fallback-gh-pages.sh`) and the DNS restore from E11 | ≤ 30 min |
| Repo loss | | Git is distributed (local clone); Pages keeps every deployment | — |

There is no data tier, so RPO is 0 (git is the state). DR drill: twice a year, roll back production to the previous deployment and forward again, and log it in the runbook.

## E13. `docs/GITOPS_RUNBOOK.md` (outline, pt-BR, midflow format)

1. Visão geral (diagram: PR → CI → Prévia → main → candidato → produção).
2. Inventário de workflows, **tested against `.github/workflows`**.
3. Ambientes e segredos (preview, production, ops; token scopes and creation dates).
4. Cloudflare: projeto Pages, configurações da zona (E9 table), DNS, regra www.
5. Deploy, rollback (auto/manual), fallback to GitHub Pages.
6. Monitoramento: uptime and weekly audit, the 403 note.
7. Rotação de segredos (yearly; how to roll the token).
8. Cutover log (E11, kept as history).
9. DR drill log.
10. Comandos rápidos (`npm run dev|build|e2e|lhci`, `wrangler pages deployment list`).

---

# F. Roadmap

Roles (from CLAUDE.md): **planejador** (Opus) writes plans, ADRs and phase breakdowns · **executor** (Sonnet) writes code, edits and commands · **revisor** (Sonnet) reviews logic, security and infra · **auxiliar** (Haiku) does searches, inventories, contrast and link checks, and summaries. **[MANUAL]** marks what only you can do (accounts, tokens, DNS clicks, merges).

| Milestone | Scope | Depends on | Acceptance criteria | Roles | Est. |
|---|---|---|---|---|---|
| **M0. Brand repo + board** | `voaneves/brand` scaffolded (C1 tree, README, LICENSES, ADR-0001 "palette & type"); board sources in `board/`; logo vector master (A8); decisions 1–12 answered | You answer the decisions | Repo public; board republished from `board/` and identical to v1 content plus architecture/personas/messaging sections; logo pixel diff ≤ 0.5%; data reconciliation (decision 9) recorded | planejador (ADR), executor (scaffold, trace), auxiliar (logo measurements, license audit), [MANUAL] decisions | 2–3 d |
| **M1. Tokens package v1.0.0** | DTCG sources, Style Dictionary build, fonts subset, icons normalized plus sprite, `components.css` for B6 #1–13, 19–20, tests, CI, release-please, npm trusted publishing | M0 | `npm i @voaneves/brand@1.0.0` works anonymously with provenance shown on npm; contrast matrix green; board grammar test green; publint/attw clean; board republished from `board.zip` | executor, revisor (exports, semver, workflows), auxiliar (contrast report), [MANUAL] npm account | 3–4 d |
| **M2. Astro skeleton + CI + previews (adoption gate)** | Branch `astro`; layouts, tokens, fonts, Hero + one section; `wrangler.jsonc`; Pages project; ci/preview/deploy (deploy targets `voaneves.pages.dev` only); Playwright, axe, LHCI, lychee, html-validate, budgets; ruleset; runbook v1 | M1 | **Gate:** LHCI static *and* preview = 100 ×4 (median 5, mobile + desktop); axe 0 in both themes; JS ≤ 8 KB; preview URL commented on the PR. **If the gate fails after 2 iterations, stop and report** (fallback: keep the vanilla build plus the same GitOps) | executor, revisor (CSP, headers, workflow permissions), auxiliar (LHCI variance analysis) | 3–4 d |
| **M3. Parity migration** | All sections, collections from `portfolio-data.json`, redirects, kill switch, 404, privacy, JSON-LD, sitemap, OG images; `beta.voaneves.com` | M2 | D12 checklist ticked; smoke test green on beta; prod-config LHCI on beta = 100 ×4; manual a11y pass (B10) signed off | executor, revisor, auxiliar (copy vs glossary, link inventory) | 4–5 d |
| **M4. DNS cutover** | E11 T-7 → T+14 | M3 | voaneves.com served by Pages; www 301; old paths redirect; project sites reachable; uptime green 7 days; PSI 100 ×4 recorded | executor (steps), revisor (checklist), auxiliar (inventory, post-checks), [MANUAL] GitHub/Cloudflare clicks | 1 d + 14 d watch |
| **M5. Polish: motion, cursor, details** | B7 patterns, B8 cursor, magnetic, Journey, Marquee pause, view transitions, ThemeToggle 3-mode, HSTS preload, iconography license cleanup (replace CC BY-SA icons if wanted) | M4 (or parallel after M3 on a branch) | Reduced-motion parity test green; cursor ≤ 1.5 KB; LHCI still 100 ×4; manual pass on iOS Safari and Android Chrome; AWWWARDS self-score sheet filled | executor (high effort for cursor), revisor | 3–4 d |
| **M6. Case studies + EN** | 3–5 case studies (decision 6), EN home/privacy/404 then case studies, hreflang, optional contact form (D11 B) | M3 (content), M5 (transitions) | Every case study has metrics with sources and `permission: true`; i18n key-parity test green; hreflang validated; LHCI 100 on new routes | planejador (case-study outline), executor, auxiliar (EN proofreading pass), [MANUAL] client permissions and EN review | 4–6 d |

Dependency graph: `M0 → M1 → M2 → M3 → M4`, with `M3 → M5` and `M3 → M6` (M5 and M6 can run in parallel on separate branches after M3; M6's transitions rebase on M5).

---

# G. Risks & open decisions

| # | Risk / open decision | Likelihood / impact | Recommendation |
|---|---|---|---|
| 1 | **Lighthouse Performance 100 is noisy on GitHub runners** (shared CPU) and flakes CI | High / Medium | Median of 5 runs; assert performance on the **static lane** with the runner's CPU benchmark logged; if `benchmarkIndex` < 1000, retry once (`continue-on-error` plus re-run step). Never relax the 100. |
| 2 | Previews are noindex and canonical points to production, so preview SEO can never be 100 | Certain / Low | Split lanes: static (SEO 100), preview (perf/a11y/BP 100, SEO with 2 documented skips), production (no skips). |
| 3 | Cloudflare recommends Workers over Pages for new projects; Pages could stagnate | Medium / Medium | Stay on Pages now (decision 1). Exit path: Workers static assets supports `_headers`/`_redirects`, preview URLs and custom domains on Cloudflare zones; the migration is a `wrangler.jsonc` change (`assets.directory`, `not_found_handling: "404-page"`) plus deploy commands. Re-evaluate yearly. |
| 4 | Moving the custom domain breaks `voaneves.com/<repo>/` project sites (paru-site, bip-kids…) | **High if missed** / High | E11 T-7 inventory, the T0 CNAME removal on `voaneves.github.io`, and `_redirects` to `voaneves.github.io/<repo>/`. |
| 5 | Old service workers keep serving stale caches | Medium / Medium | Kill-switch worker at both registration URLs, `no-cache`, kept 6 months, smoke-tested. |
| 6 | The CF beacon or Turnstile drags LHCI below 100 | Low / Medium | Beacon loaded after `load` + idle; Turnstile only on form focus; drop either if LHCI fails. |
| 7 | Astro CSP meta plus `inlineStylesheets: 'always'` produces large hash lists or edge cases | Low / Low | Covered by the CSP test in Playwright (no console CSP violations); fall back to `'auto'`. |
| 8 | Variable font subsetting changes metrics, so CLS appears | Low / Medium | CLS ≤ 0.01 asserted; fallbacks computed from the *subset* files. |
| 9 | Icon licenses: Iconic is CC BY-SA 3.0 (share-alike) | Certain / Low | Attribute now; replace those icons in M5 if share-alike on derivatives is unwanted. |
| 10 | The ® symbol without an INPI registration | Unknown / Legal | Decision 10: verify, or switch to ™. |
| 11 | Content truthfulness (5 vs 6 languages, IBM entry, placeholder phone) | Certain / High for credibility | Decision 9 blocks M3. |
| 12 | Client permission for case studies (PARU, ADARSE14, CAATO) | Medium / Medium | The `permission: true` schema gate blocks the build. |
| 13 | A Cloudflare dashboard change (Rocket Loader, Email Obfuscation) silently breaks CSP | Medium / High | Weekly drift check, CSP-violation test against production in the weekly audit. |
| 14 | npm account or scope `voaneves` unavailable | Low / Medium | Fallback name `@victorneves/brand`, or an unscoped `voaneves-brand`; nothing else changes. |
| 15 | Solo-maintainer ruleset: 0 approvals means checks are the only gate | Certain / Low | Accepted. Required checks plus admin bypass only through a PR (logged). |
| 16 | The Claude board drifts from the package | Medium / Low | Board version = package version in its README; republish is part of the release checklist (C7). |
| 17 | Konami/Mario easter egg, `/lab`, WebGL | Open | Keep it out of launch; revisit after M6. |
| 18 | Node 26 is now LTS while midflow uses 24 | Low | Stay on 24 like midflow; bump every repo together in one coordinated PR set. |

*End of plan v2.*

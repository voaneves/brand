# Voice and tone / Voz e tom

Writing guidelines for everything signed VOANEVES: site, docs, READMEs, proposals, UI text, social posts. Extends [board/10-voz-e-tom.md](../board/10-voz-e-tom.md). Positioning facts live in [perfil-tecnico.md](perfil-tecnico.md); change them there first.

Escrita para tudo que leva a marca VOANEVES: site, docs, READMEs, propostas, textos de interface, redes. Estende o capítulo 10 do board. Fatos de posicionamento ficam em `perfil-tecnico.md`.

## Essence / Essência

**Signal, not noise. / Sinal, não ruído.** Say the one thing that matters, in the fewest words that stay clear. The writing does what the design does: one accent, a lot of silence.

## Voice (constant) / Voz (constante)

| Trait | Means | Does not mean |
|---|---|---|
| Direct | Lead with the point or the answer | Curt or cold |
| Concrete | Numbers, deliveries, names, dates | Jargon, buzzwords |
| Honest | State scope, price and limits plainly | Overpromising, hedging every line |
| Warm | First person, plain words, a human sign-off | Slang, emojis in headings, forced humor |

| Traço | Quer dizer | Não quer dizer |
|---|---|---|
| Direto | Começar pelo ponto ou pela resposta | Seco ou frio |
| Concreto | Números, entregas, nomes, datas | Jargão, palavras da moda |
| Honesto | Escopo, preço e limites às claras | Prometer demais, hesitar em toda frase |
| Caloroso | Primeira pessoa, palavras simples, despedida humana | Gíria, emoji em título, humor forçado |

## Tone (adapts) / Tom (se adapta)

| Moment | Tone | Example (PT) | Example (EN) |
|---|---|---|---|
| Hero, pitch | Confident, short | Vamos fazer algo grande? | Shall we build something big? |
| Services, pricing | Plain, specific | A partir de R$ 800, com domínio e hospedagem. | From R$ 800, domain and hosting included. |
| Contact, reply promise | Warm, committed | Respondo em até 1 dia útil. | I reply within 1 business day. |
| Technical docs | Precise, neutral | Use `--vn-signal` para preenchimentos e foco. | Use `--vn-signal` for fills and focus. |
| Errors | Calm, helpful | Não foi possível enviar. Tente de novo em instantes. | Could not send. Try again in a moment. |
| Success | Brief, no fanfare | Mensagem enviada. | Message sent. |

Sample lines above come from the existing type specimens (`spec-values.md`) or follow their register; reuse them rather than rewriting.

## Rules / Regras

1. **Lead with the point.** First sentence says what this is or what to do. / A primeira frase diz o que é ou o que fazer.
2. **Concrete verbs, no superlatives.** "Faço sites, apps e dashboards" beats "soluções inovadoras". Avoid: enterprise, comprehensive, turnkey, world-class, soluções completas.
3. **Short paragraphs, one idea each.** Aim for 20 words per sentence or fewer; measure 640px.
4. **Never invent numbers or results.** Every metric has a source and a date.
5. **Say who it is for.** "Para pequenas e médias empresas" is a better filter than "para todos".
6. **Active voice, first person singular** for Victor's work ("Faço", "I build"); "we" only when a team is real.
7. **Positioning sentence is fixed:** "Engenheiro mecânico que virou designer e desenvolvedor." Keep it verbatim.
8. **Sentence case** for headings and buttons. Uppercase only through the label style (CSS), never typed in caps.
9. **Calls to action are verbs:** Agendar reunião, Ver projetos, Falar comigo. One signal button per view.
10. **No emoji in headings.** Symbols such as → are fine inside text.

## Language / Idioma

- Primary: pt-BR. English mirrors it directly, same structure and length; it is not a free rewrite.
- Keep established technical terms in English inside PT text (deploy, dashboard, design system); do not force translations.
- Pages declare `lang="pt-BR"` or `lang="en"`; mixed passages use `lang` on the element.
- Hire line: PT "Precisa de algo assim? Vamos conversar →"; EN "Need something like this? Let's talk →".

## Formats / Formatos

- **Dates:** ISO in data (`2026-11-19`); in prose PT "19 de novembro de 2026", EN "19 November 2026".
- **Money:** `R$ 1.500` (PT, tabular figures), `R$ 1,500` in EN text. Always state what is included.
- **Numbers:** thousands separator by language; use the `numeral` style for big figures.
- **Names:** Victor Neves on first use, VOANEVES. as the brand. Never add a registered or trademark mark.
- **Punctuation:** no exclamation marks in UI; at most one per page in marketing. The full stop in the wordmark is part of the brand, not a sentence end.

## UI text patterns / Textos de interface

| Pattern | Rule | PT | EN |
|---|---|---|---|
| Empty state | Say what is missing and the next step | Nenhum projeto ainda. Crie o primeiro. | No projects yet. Create the first one. |
| Error | What happened, then what to do; never blame the user | O e-mail parece incompleto. Confira e tente de novo. | That email looks incomplete. Check it and try again. |
| Loading | Name the action, no cute copy | Enviando… | Sending… |
| Confirm | Verb and object on the button | Excluir projeto | Delete project |
| Form hint | Before the field, not as placeholder only | Respondo em até 1 dia útil. | I reply within 1 business day. |
| Link text | Describes the target | Ver o estudo de caso | Read the case study |

## Checklist before publishing

- [ ] First sentence carries the point.
- [ ] No superlative or buzzword; every claim has a number, name or date.
- [ ] PT and EN say the same thing.
- [ ] Headings in sentence case, no emoji.
- [ ] One call to action, written as a verb.

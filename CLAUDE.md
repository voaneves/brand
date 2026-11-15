## Agentes

Use quantos agentes forem necessários para executar uma tarefa, e rode em paralelo o que for independente. Os agentes ficam em .claude/agents/ (cópia de ~/.claude/agents/):

| Agente | Modelo / esforço | Papel |
|---|---|---|
| planejador | Opus, médio | Planos, decisões (ADRs), divisão do trabalho em subtarefas pequenas |
| executor | Sonnet, médio (alto só em subtarefa difícil) | Código, edições e comandos, uma subtarefa por vez. Só faz commit quando pedido, nunca mencionando Claude |
| revisor | Sonnet, médio | Revisão somente leitura de lógica, segurança e infraestrutura, achados por severidade |
| auxiliar | Haiku | Buscas, leitura e resumos, somente leitura |

Fable e Mythos não estão no plano: não use.

Nunca mencionar Claude/IA em commits, PRs ou arquivos (sem Co-Authored-By).

Perguntas simples e mudanças de uma linha dispensam agentes.

Nunca fazer commit ou push sem autorização explícita do usuário.

**One-liner PowerShell 7.6 (`pwsh`) obrigatório ao final:** Sempre encerrar respostas que criem ou alterem arquivos com um único comando one-liner para PowerShell 7.6 (encadeado com `&&`) que muda para a pasta do projeto (`Set-Location`), adiciona os arquivos (`git add -A`), faz o commit em Conventional Commits sem citar IA/Claude/Gemini e sem `Co-Authored-By` (`git commit -m "..."`), e faz o push (`git push`).
Exemplo: `Set-Location D:\GitHub\brand && git add -A && git commit -m "fix(icons): descrição" && git push`

## Fluxo

1. auxiliar levanta o contexto, em paralelo quando possível.
2. planejador transforma o contexto em plano com subtarefas pequenas e critérios de aceite.
3. Mostrar o plano ao usuário quando ele pedir revisão antes de executar.
4. executor faz as subtarefas; as independentes rodam em paralelo, cada uma em seus próprios arquivos.
5. revisor revisa mudanças de lógica, segurança ou infraestrutura antes do commit.
6. Commit pequeno por subtarefa, em Conventional Commits, só com autorização.

## Este repositório

Marca e design system de Victor Neves (voaneves.com). Plano em PLAN.md, valores em docs/spec-values.md, decisões em docs/decisions/.

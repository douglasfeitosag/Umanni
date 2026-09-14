# Estado vigente

Atualizado: 2026-09-14. Projeto: `/Users/douglas/Projects/Umanni`. O vault é a subpasta `umanni-vault/` do repositório; registros da conversa foram preservados aqui. Use este índice para distinguir estado atual de propostas históricas.

## Decidido

Umanni; o prazo original de 11/09/2026 passou e não deve ser apresentado como cumprido. Ruby 4+/Rails 8+, React/Inertia, TypeScript, Tailwind, PostgreSQL, autenticação Rails nativa, Solid Queue/Cable. RSpec, Vitest/React Testing Library e Playwright. MVC organizado por funcionalidade e serviços para orquestrações. Docker Compose local, sem hospedagem contratada. CI com runner no Mac. Documentação pública. Idiomas conforme D-012 e a correção posterior de Douglas: interface em português, código/testes/README públicos em inglês. Douglas autorizou merges da frente visual por agente somente após validação completa, duas revisões independentes no mesmo HEAD, threads resolvidas e `review-ledger` bem-sucedido.

Branding: reprodução avaliativa da identidade pública da Umanni, sem autorização expressa e com aviso não oficial. Site principal prevalece sobre o blog editorial. Somente assinatura horizontal/símbolo azul, Montserrat dominante, Roboto em utilidades, paleta adaptada quando necessário para WCAG AA, Heroicons e tema claro. O tema escuro não integra a entrega por falta de evidência pública suficiente. Layout, estados e cinco composições estáticas estão fechados em `specs/001-branding/`.

## Entrega documental e versão

Spec Kit 1.0.6 inicializado localmente para Codex. Constituição, README, protocolo, índices e specs/planos/tarefas documentais estão no vault. A entrega visual estática foi implementada, validada, revisada e integrada pelos PRs 3–5 e 8; o protótipo navegável foi integrado pelo PR 6 e a governança de revisão automática pelo PR 7. O milestone `0.1.0` reúne os PRs 1–8 e a preparação da release; a issue 9 permanece no milestone `Backlog`. A preparação foi integrada pelo PR #10; a tag anotada `v0.1.0` e a GitHub Release estão publicadas no commit `87e8c51894faa5794e9759b9caa5df4871d350e7`, e o milestone `0.1.0` está fechado (estado relido em 2026-09-14). Ainda não existe aplicação Rails, Docker Compose, CI de aplicação ou runner de produção.

## Planejamento de branding

Briefing, pesquisa, spec, plano, contratos, tarefas e critérios preparados na branch `codex/001-branding` e publicados no PR #2, com label `documentation` e Douglas como responsável. A revisão Luna high sob a mesma conta publicou oito achados; após discussão e correção, todos foram confirmados. Como o GitHub não oferece `Request changes`/`Approve` da própria conta autora, a governança adotou `review-ledger` obrigatório, labels de estado e resolução exclusiva das threads pela revisora. Os comentários existentes com `\\n` literal foram corrigidos pela API. Douglas mesclou o PR #2 em 2026-09-14; `main` passou a `b374118`, com árvore equivalente ao HEAD aprovado `5674d91`. Nenhum asset ou componente foi criado. O prazo original de 11/09/2026 passou; não o apresentar como cumprido.

## Protótipo visual navegável

A feature 005 foi integrada na `main` pelo PR 6, merge commit `0cd4c4142be8833401a5721c5e7cc637ea40b161`, depois de duas revisões finais Luna high no mesmo HEAD e gate bem-sucedido. O protótipo em `branding/prototype/` usa somente HTML/CSS/ES modules, dados fictícios reiniciáveis e os assets/licenças já preservados; não implementa autenticação, persistência, upload, fila ou regras de produção. A matriz nativa passou em 1440×1024 e 390×844, os 28 testes centrais passaram com 100% de linhas/funções e 92,12% de ramos, e oito PNGs finais foram inspecionados.

## Próxima tarefa

PROMPT-COND-006: planejamento da fundação em `codex/008-foundation-plan`, feature `specs/008-foundation-plan/`, versão-alvo `0.2.0` (milestone 3), base imutável `v0.1.0`. Spec, pesquisa, contratos, plano e tarefas preparados; revisão independente será vinculada ao HEAD do PR. Somente depois de `review-ledger=success`, `spec-reviewed` e todas as threads resolvidas pela revisora será entregue prompt autossuficiente à executora. O estado final do aceite é verificado no PR, não pressuposto por este arquivo. Nenhuma aplicação implementada nesta sessão; sem merge, tag ou release autorizados. Ver [[COND-006-FOUNDATION-PLAN]].

## Pendências e momento de resolução

- Proteção de `main`: configurada e relida pela API em 2026-09-14 com PR obrigatório, zero aprovações nativas, `review-ledger` obrigatório e estrito por SHA, conversas resolvidas, aplicação a administradores e bloqueio de force-push/exclusão. Labels `review-pending`, `changes-requested`, `spec-reviewed` e `code-reviewed` existem. Checks de entrega, automação do ledger e runner isolado ainda permanecem pendentes; o status manual do ledger não deve ser apresentado como workflow automatizado.
- Antes da estrutura de aplicação: versões compatíveis fixadas, Vite/gerenciador de pacotes, contratos Inertia, policy de cobertura e configuração do ambiente de testes; escolher skills/plugins estritamente úteis, conforme a etapa posterior ao branding.
- Antes dos fluxos de usuário: cadastro/ativação/senha inicial, importação CSV/XLSX (colunas, duplicidade, erros, limites e repetição), avatar, último administrador e matriz de autorização. Ver 05-LEITURA-DO-TESTE.
- Antes de instalar runner: runtime/isolamento, recursos, isolamento por PR e proteção da máquina em repositório público. Runner permanece no Mac.
- Antes da submissão: reconciliar modelos realmente usados no README, verificar todos os requisitos, confirmar instruções adicionais do avaliador e testar Compose do zero.

Essas pendências não foram resolvidas silenciosamente; bloqueiam os prompts que dependem delas. O plano detalhado de cada entrega deve incluí-las.

## Reorganização do vault

Entrega 002: notas, prompts, relatórios, specs e configuração Obsidian em umanni-vault; constituição canônica CONSTITUICAO.md. A branch `codex/002-organize-vault` foi integrada por Douglas na `main` pelo PR #1, commit `a98885f`. Ver [[EXEC-002-ORGANIZE-VAULT]] e [[PROMPT-COND-002-RETOMADA]].

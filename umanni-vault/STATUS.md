# Estado vigente

Atualizado: 2026-09-15. Projeto: `/Users/douglas/Projects/Umanni`. O vault é a subpasta `umanni-vault/` do repositório; registros da conversa foram preservados aqui. Use este índice para distinguir estado atual de propostas históricas.

## Decidido

Umanni; o prazo original de 11/09/2026 passou e não deve ser apresentado como cumprido. Ruby 4+/Rails 8+, React/Inertia, TypeScript, Tailwind, PostgreSQL, autenticação Rails nativa, Solid Queue/Cable. RSpec, Vitest/React Testing Library e Playwright. MVC organizado por funcionalidade e serviços para orquestrações. Docker Compose local, sem hospedagem contratada. CI com runner no Mac. Documentação pública. Idiomas conforme D-012 e a correção posterior de Douglas: interface em português, código/testes/README públicos em inglês. Douglas autorizou merges da frente visual por agente somente após validação completa, duas revisões independentes no mesmo HEAD, threads resolvidas e `review-ledger` bem-sucedido.

Branding: reprodução avaliativa da identidade pública da Umanni, sem autorização expressa e com aviso não oficial. Site principal prevalece sobre o blog editorial. Somente assinatura horizontal/símbolo azul, Montserrat dominante, Roboto em utilidades, paleta adaptada quando necessário para WCAG AA, Heroicons e tema claro. O tema escuro não integra a entrega por falta de evidência pública suficiente. Layout, estados e cinco composições estáticas estão fechados em `specs/001-branding/`.

## Entrega documental e versão

Spec Kit 1.0.6 inicializado localmente para Codex. Constituição, README, protocolo, índices e specs/planos/tarefas documentais estão no vault. A entrega visual estática foi implementada, validada, revisada e integrada pelos PRs 3–5 e 8; o protótipo navegável foi integrado pelo PR 6 e a governança de revisão automática pelo PR 7. O milestone `0.1.0` reúne os PRs 1–8 e a preparação da release; a issue 9 permanece no milestone `Backlog`. A preparação foi integrada pelo PR #10; a tag anotada `v0.1.0` e a GitHub Release estão publicadas no commit `87e8c51894faa5794e9759b9caa5df4871d350e7`, e o milestone `0.1.0` está fechado (estado relido em 2026-09-14). Na base 0.1.0 não existia aplicação Rails. A execução 009 abaixo acrescenta a fundação; CI automático e runner continuam fora do escopo.

## Planejamento de branding

Briefing, pesquisa, spec, plano, contratos, tarefas e critérios preparados na branch `codex/001-branding` e publicados no PR #2, com label `documentation` e Douglas como responsável. A revisão Luna high sob a mesma conta publicou oito achados; após discussão e correção, todos foram confirmados. Como o GitHub não oferece `Request changes`/`Approve` da própria conta autora, a governança adotou `review-ledger` obrigatório, labels de estado e resolução exclusiva das threads pela revisora. Os comentários existentes com `\\n` literal foram corrigidos pela API. Douglas mesclou o PR #2 em 2026-09-14; `main` passou a `b374118`, com árvore equivalente ao HEAD aprovado `5674d91`. Nenhum asset ou componente foi criado. O prazo original de 11/09/2026 passou; não o apresentar como cumprido.

## Protótipo visual navegável

A feature 005 foi integrada na `main` pelo PR 6, merge commit `0cd4c4142be8833401a5721c5e7cc637ea40b161`, depois de duas revisões finais Luna high no mesmo HEAD e gate bem-sucedido. O protótipo em `branding/prototype/` usa somente HTML/CSS/ES modules, dados fictícios reiniciáveis e os assets/licenças já preservados; não implementa autenticação, persistência, upload, fila ou regras de produção. A matriz nativa passou em 1440×1024 e 390×844, os 28 testes centrais passaram com 100% de linhas/funções e 92,12% de ramos, e oito PNGs finais foram inspecionados.

## Fundação 0.2.0 — execução e revisão

O planejamento PROMPT-COND-006 foi aceito no PR #11, HEAD d1f3a3a349ed4a7610c4da7b170d4d2976c56691, e já estava integrado quando o gate inicial da execução foi conferido. O checkbox histórico do plano não foi alterado para presumir aceite.

A execução PROMPT-EXEC-009 está em `codex/009-foundation-app`, [PR #12](https://github.com/douglasfeitosag/Umanni/pull/12), milestone0.2.0, Douglas responsável. Página Rails–Inertia em português, PostgreSQL, testes e Docker/Compose implementados. Douglas autorizou json2.21.2 após conflito transitivo; regressão de sessão corrigida. Clean-room do commit90f07ad passou bin/check, imagem final e banco; smoke dev identificou hostname Vite403, corrigido com allowlist focalizada e HMR comprovado em cópia temporária. O SHA1cbbf83 passou novamente todos os perfis e recebeu foundation-checks=success; imagem final também comprovou ausência de ferramentas herdadas e caches. O HEAD e75ab48 também passou todos os gates; a revisora independente encontrou um matcher E2E permissivo. Asserções exatas e prova RED/GREEN foram aplicadas; novo HEAD aguarda revalidação e nova revisão na mesma thread. Convocação configurada Luna high; autodescrição da revisora GPT-5/variante não exposta. Ver [[EXEC-009-FOUNDATION-APP]]. Sem aceite final, merge ou release.

## Pendências e momento de resolução

- Proteção de `main`: configurada e relida pela API em 2026-09-14 com PR obrigatório, zero aprovações nativas, `review-ledger` obrigatório e estrito por SHA, conversas resolvidas, aplicação a administradores e bloqueio de force-push/exclusão. Labels `review-pending`, `changes-requested`, `spec-reviewed` e `code-reviewed` existem. foundation-checks foi adicionado como obrigatório na execução009, preservando as demais proteções; automação do ledger e runner isolado permanecem pendentes; o status manual do ledger não deve ser apresentado como workflow automatizado.
- Antes da estrutura de aplicação: versões compatíveis fixadas, Vite/gerenciador de pacotes, contratos Inertia, policy de cobertura e configuração do ambiente de testes; escolher skills/plugins estritamente úteis, conforme a etapa posterior ao branding.
- Antes dos fluxos de usuário: cadastro/ativação/senha inicial, importação CSV/XLSX (colunas, duplicidade, erros, limites e repetição), avatar, último administrador e matriz de autorização. Ver 05-LEITURA-DO-TESTE.
- Antes de instalar runner: runtime/isolamento, recursos, isolamento por PR e proteção da máquina em repositório público. Runner permanece no Mac.
- Antes da submissão: reconciliar modelos realmente usados no README, verificar todos os requisitos, confirmar instruções adicionais do avaliador e testar Compose do zero.

Essas pendências não foram resolvidas silenciosamente; bloqueiam os prompts que dependem delas. O plano detalhado de cada entrega deve incluí-las.

## Reorganização do vault

Entrega 002: notas, prompts, relatórios, specs e configuração Obsidian em umanni-vault; constituição canônica CONSTITUICAO.md. A branch `codex/002-organize-vault` foi integrada por Douglas na `main` pelo PR #1, commit `a98885f`. Ver [[EXEC-002-ORGANIZE-VAULT]] e [[PROMPT-COND-002-RETOMADA]].

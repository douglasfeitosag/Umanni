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

## Fundação 0.2.0 — integrada e publicada

O planejamento PROMPT-COND-006 foi aceito no PR #11, HEAD d1f3a3a349ed4a7610c4da7b170d4d2976c56691, e já estava integrado quando o gate inicial da execução foi conferido. O checkbox histórico do plano não foi alterado para presumir aceite.

A execução PROMPT-EXEC-009 entregou a fundação em `codex/009-foundation-app`, [PR #12](https://github.com/douglasfeitosag/Umanni/pull/12), integrado por Douglas em `main` no commit `665da839ab2efdd08c94664f842d9d17fcf3023c`. O HEAD final revisado `988282f8b9212e1f018cbbd327758d7d2aefce80` e o merge têm a mesma árvore, `706043ac58cfaa15f2f0f2170e6c12042d4f9a86`. Página Rails–Inertia em português, PostgreSQL, testes e Docker/Compose foram implementados. Douglas autorizou json 2.21.2 após conflito transitivo. A validação limpa passou 9 exemplos RSpec, 2 testes Vitest, 12 cenários Playwright, Ruby 7/7 e TypeScript 1/1; imagem final sem root, ferramentas de teste ou caches e perfil dev com HMR foram comprovados em Linux arm64.

A revisão independente encontrou FOUNDATION-REVIEW-001, corrigido em `b66492faafaab7815a1a16e401a0ce18cbb45b33`; o HEAD documental final do PR #12 recebeu novamente `foundation-checks=success`, `review-ledger=success` e `code-reviewed`, com a única thread resolvida pela revisora. Convocação configurada Luna high/contexto novo; autodescrição da revisora GPT-5/variante não exposta. Ver [[EXEC-009-FOUNDATION-APP]].

O fechamento documental foi integrado pelo [PR #13](https://github.com/douglasfeitosag/Umanni/pull/13), com HEAD final revisado `f56971eca6b5e280e2f20cf0ccaae2dce3254a37`, `foundation-checks=success`, `review-ledger=success`, `code-reviewed` e 8/8 threads resolvidas pela revisora. O merge `b5fc0ed5d9014e9841a82e0c19f634684db71182` é o alvo da tag anotada `v0.2.0` e da [GitHub Release final](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.2.0), publicada em 2026-09-15. O milestone 0.2.0 está fechado com PRs #11–#13; a issue #9 continua aberta no Backlog. Ver [[EXEC-010-FOUNDATION-RELEASE]].

A reconciliação documental posterior foi integrada pelo [PR #14](https://github.com/douglasfeitosag/Umanni/pull/14) no commit `bc9626e7a1ef9ce53375e0eb0d579e7831f0e7e0`. A tag `v0.2.1` e a [GitHub Release final 0.2.1](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.2.1) apontam para esse commit e foram publicadas em 2026-09-15. Essa release corrige estado documental; não amplia a fundação funcional descrita acima.

## Planejamento de identidade e acesso 0.3.0

O roadmap 012 foi integrado pelo PR #15 em `4265a46a7ca5ba8e6c1af68dd3b412a7cbf536b8`. A entrega documental 013 nasceu dessa base na branch `codex/013-identity-access` e foi integrada pelo [PR #16](https://github.com/douglasfeitosag/Umanni/pull/16) no commit `29103fbefb129a24f4a021be5115b7fe5ca8438a`, vinculada ao milestone aberto `0.3.0`, com escopo exclusivo de identidade e acesso. A spec detalha cadastro regular, sessão/redirecionamento por papel, perfil próprio, autorização server-side, CRUD administrativo, proteção concorrente do último administrador, avatar, bootstrap local e dashboard total/por papel via Solid Cable.

D-019–D-026 permanecem fechadas. A spec 013 acrescenta D-027–D-031 somente para fechar política de senha, unicidade de e-mail, protocolo de invalidação das métricas, concorrência do último administrador e serialização do bootstrap, cada uma comparando três cenários. A revisora independente `gpt-5.6-luna` high aceitou o planejamento no HEAD `74ef24610333751723e4613e88852613244b043a` depois de sete achados corrigidos e resolvidos.

A execução está em andamento na branch `codex/013-identity-access-app`, criada da base integrada exata. Cadastro, sessão, perfil, CRUD administrativo, invariante concorrente do último administrador, Active Storage, bootstrap, métricas/Cable e interface responsiva foram implementados por ciclos RED/GREEN. Douglas autorizou a expansão mínima da allowlist para o `Dockerfile`, exclusivamente para empacotar channels, queries, services e tasks indispensáveis, e depois autorizou a inclusão no `.dockerignore` dos três assets existentes necessários ao Vite (logo horizontal, Montserrat e Roboto). O gate limpo no HEAD `8d2de607` passou: Ruby 92,48% de linhas, TypeScript 100% de linhas, lint/Brakeman sem achados e 54/54 Playwright nos seis perfis; imagem de entrega non-root e sem ferramentas/fontes de teste também foi validada. A documentação final ainda exige a repetição do gate no novo HEAD, seguida de PR e revisão Luna high. Nenhum merge, tag ou release 0.3.0 está autorizado.

## Pendências e momento de resolução

- A spec 013 de identidade/acesso para 0.3.0 foi integrada pelo PR #16 e sua execução está em validação antes de novo PR; importação CSV/XLSX permanece para 0.4.0; CI/runner, extras e issue #9 preservam destino Backlog.
- Proteção de `main`: configurada e relida pela API em 2026-09-14 com PR obrigatório, zero aprovações nativas, `review-ledger` obrigatório e estrito por SHA, conversas resolvidas, aplicação a administradores e bloqueio de force-push/exclusão. Labels `review-pending`, `changes-requested`, `spec-reviewed` e `code-reviewed` existem. foundation-checks foi adicionado como obrigatório na execução009, preservando as demais proteções; automação do ledger e runner isolado permanecem pendentes; o status manual do ledger não deve ser apresentado como workflow automatizado.
- A fundação fixou versões compatíveis, Vite/npm, contratos Inertia, política de cobertura e ambientes de teste; qualquer ampliação futura desses contratos exige nova especificação e evidência própria.
- Antes dos fluxos de usuário: cadastro/ativação/senha inicial, importação CSV/XLSX (colunas, duplicidade, erros, limites e repetição), avatar, último administrador e matriz de autorização. Ver 05-LEITURA-DO-TESTE.
- Antes de instalar runner: runtime/isolamento, recursos, isolamento por PR e proteção da máquina em repositório público. Runner permanece no Mac.
- Antes da submissão: reconciliar modelos realmente usados no README, verificar todos os requisitos, confirmar instruções adicionais do avaliador e testar Compose do zero.

Essas pendências não foram resolvidas silenciosamente; bloqueiam os prompts que dependem delas. O plano detalhado de cada entrega deve incluí-las.

## Reorganização do vault

Entrega 002: notas, prompts, relatórios, specs e configuração Obsidian em umanni-vault; constituição canônica CONSTITUICAO.md. A branch `codex/002-organize-vault` foi integrada por Douglas na `main` pelo PR #1, commit `a98885f`. Ver [[EXEC-002-ORGANIZE-VAULT]] e [[PROMPT-COND-002-RETOMADA]].

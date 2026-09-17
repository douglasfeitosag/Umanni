# Estado vigente

Atualizado: 2026-09-17. Projeto: `/Users/douglas/Projects/Umanni`. O vault é a subpasta `umanni-vault/` do repositório; registros da conversa foram preservados aqui. Use este índice para distinguir estado atual de propostas históricas.

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

A execução foi integrada pelo PR #17 no merge `0df73fe060b5a4b3fd9942955f405f620ae1962b`. Cadastro, sessão, perfil, CRUD administrativo, invariante concorrente do último administrador, Active Storage, bootstrap, métricas/Cable e interface responsiva foram implementados por ciclos RED/GREEN. O HEAD revisado `6ed242d457eef18bc784e530a0a28b4bc40dbde4` recebeu `foundation-checks` e `review-ledger` de sucesso, com threads resolvidas; o gate Compose registrou Ruby 92,48% de linhas, Vitest 14/14 e Playwright 60/60 nos seis perfis. A preparação 014 foi integrada no merge `8ce98edfb0ae40188d192b93671a7f44c1d9ccb4`; a tag anotada `v0.3.0`, a Release final e o milestone fechado apontam para esse mesmo merge. Correções posteriores preservaram o escopo e os SHAs/evidências estão nos EXEC-013 e EXEC-014.

## Hardening de entrega local 0.3.1 — integrado e publicado

O planejamento 016 foi integrado pelo PR #22. A implementação foi aceita no HEAD `6f92fba8ca3cdb6f1d196f87f558214b8175d430` e integrada pelo [PR #23](https://github.com/douglasfeitosag/Umanni/pull/23) no merge `5c11f3ef51e6d1bcb2dc64fbf521cca775d58114`. Startup prepara banco/schema antes do servidor, `/ready` verifica conexão e migrations sem substituir `/up`, e respostas 5xx HTML/Inertia usam fallback genérico acessível. `bin/check` passou com 64 RSpec, 15 Vitest e 60 Playwright; `bin/check-delivery` passou o gate isolado e 18 cenários production-like. Issues #18 e #19 estão fechadas.

A spec 017 governou a publicação. Seu planejamento foi aceito no HEAD `2701c3f5ab874506a22b1d680a012458788c03cf` depois da correção R-017-001; o preparo final foi aceito no HEAD `1d2ae5ccf1fd8771a2d70bcceb47ebefb0f1edf6` e integrado pelo PR #24 em `59a05d8e616291f10195f44a130321a0aa5d42db`. A tag anotada `v0.3.1` (objeto `7bcc6cb678804efc9f3272998725ccad2f6bd43b`) e a Release final apontam para esse merge. O milestone 0.3.1 está fechado com zero itens abertos.

## Importação de usuários 0.4.0 — integrada e publicada

A entrega documental 019 foi integrada pelo PR #26 e a execução pelo [PR #27](https://github.com/douglasfeitosag/Umanni/pull/27) no merge `c093b8d4c52c695e9e1e951538f044f070b2d0ef`. Ela implementa exclusivamente a importação administrativa CSV/XLSX assíncrona, progresso persistido/ao vivo e configuração local, única e concorrente-segura da senha inicial para contas importadas sem credencial. Em 2026-09-16, Douglas autorizou pontualmente a tela administrativa já existente de edição e os testes Playwright correspondentes, exclusivamente para completar essa configuração de senha; nenhuma outra exclusão de escopo foi alterada.

O candidato fixou `solid_queue 1.7.0` e `roo 3.0.0`, usa as tabelas Solid Queue como migrations do banco `primary`, a fila única `imports`, processo `worker` dedicado e Active Storage em `/rails/storage` compartilhado entre web/worker. O lote, attachment e job são confirmados ou revertidos na mesma transação; o relatório seguro por linha, a retomada idempotente, a invalidação privada via Cable e a agregação de métricas por blocos estão cobertos por testes. Após quinze achados em três rodadas de revisão, o HEAD de código `4be48638f8d899d95456b08dffb7561b6ebd59b8` passou `bin/check` com 92 RSpec, 23 Vitest e 66 Playwright, e `bin/check-delivery` confirmou 18/18 cenários production-like. O fechamento documental foi revisado, o PR #27 foi integrado e a transição serial foi concluída no PR #28; a tag anotada e a Release 0.4.0 permanecem no merge `eb73edcbab8777ec9bbf13d80d7bfc4c5cd476eb`. Ver [[EXEC-019-USER-IMPORT]] e [[EXEC-020-RELEASE-0-4-0]].

## Prontidão de avaliação local 1.0.0 — candidata em revisão

A entrega 022 partiu do merge do PR #29 e abriu o [PR #30](https://github.com/douglasfeitosag/Umanni/pull/30), milestone 1.0.0. O planejamento foi revisado pela Luna/high, com R-022-001 a R-022-008 resolvidos exclusivamente pela revisora, `review-ledger=success` e `spec-reviewed` no SHA `582a287`. A execução corrigiu o README para o fluxo completo de avaliação local, preservou `.env` privado, criou o guia local ignorado somente por `.git/info/exclude` e encontrou/corrigiu o bloqueio real de bootstrap no delivery por opt-in explícito. No HEAD `582a287`, a repetição limpa do gate publicado passou 66/66 e `bin/check-delivery` passou 18/18; a primeira execução registrou uma única flutuação WebKit móvel antes da repetição, preservada no [[EXEC-021-EVALUATION-READINESS]]. Em 17 de setembro de 2026, Douglas redirecionou esta finalização para 1.0.0. A candidata ainda requer revisão final independente do HEAD final, integração autorizada, tag anotada `v1.0.0`, Release pública e fechamento do milestone vazio; nenhum desses passos está concluído nesta atualização.

## Pendências e momento de resolução

- A spec 013, a execução e o fechamento formal 014 foram concluídos e publicados como 0.3.0. A reconciliação pós-publicação foi integrada pelo PR #21 em `a3b53ee00e5009d7d52485c22171acb3d41329d5`; ela não alterou o alvo imutável de `v0.3.0`.
- O ciclo 0.3.1, limitado às regressões #18 e #19, está concluído e publicado. A reconciliação pós-publicação registra o estado sem alterar o alvo imutável da tag. Ver [[EXEC-016-DELIVERY-HARDENING]] e [[EXEC-017-RELEASE-0-3-1]].
- A versão 0.4.0 foi publicada: a tag anotada e a Release apontam para `eb73edcbab8777ec9bbf13d80d7bfc4c5cd476eb`, e o milestone está fechado. CI/runner, extras e issue #9 preservam destino Backlog.
- Proteção de `main`: configurada e relida pela API em 2026-09-14 com PR obrigatório, zero aprovações nativas, `review-ledger` obrigatório e estrito por SHA, conversas resolvidas, aplicação a administradores e bloqueio de force-push/exclusão. Labels `review-pending`, `changes-requested`, `spec-reviewed` e `code-reviewed` existem. foundation-checks foi adicionado como obrigatório na execução009, preservando as demais proteções; automação do ledger e runner isolado permanecem pendentes; o status manual do ledger não deve ser apresentado como workflow automatizado.
- A fundação fixou versões compatíveis, Vite/npm, contratos Inertia, política de cobertura e ambientes de teste; qualquer ampliação futura desses contratos exige nova especificação e evidência própria.
- Registro histórico pré-integração 019: publicar o HEAD documental final no PR #27, obter revisão independente Luna/high, `review-ledger=success`, `code-reviewed` e zero threads abertas. Essa condição foi resolvida antes da integração do PR #27; os demais fluxos de identidade/acesso já pertencem à 0.3.0 publicada.
- Antes de instalar runner: runtime/isolamento, recursos, isolamento por PR e proteção da máquina em repositório público. Runner permanece no Mac.
- Antes da submissão: reconciliar modelos realmente usados no README, verificar todos os requisitos, confirmar instruções adicionais do avaliador e testar Compose do zero.

Essas pendências não foram resolvidas silenciosamente; bloqueiam os prompts que dependem delas. O plano detalhado de cada entrega deve incluí-las.

## Reorganização do vault

Entrega 002: notas, prompts, relatórios, specs e configuração Obsidian em umanni-vault; constituição canônica CONSTITUICAO.md. A branch `codex/002-organize-vault` foi integrada por Douglas na `main` pelo PR #1, commit `a98885f`. Ver [[EXEC-002-ORGANIZE-VAULT]] e [[PROMPT-COND-002-RETOMADA]].

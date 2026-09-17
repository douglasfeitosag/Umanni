# Tarefas: estabilização da importação e das telas de erro

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [contratos](contracts/) e [quickstart.md](quickstart.md)
**Versão-alvo**: candidata `1.1.0` (milestone 9)
**Regra de execução**: cada patch tem PR e revisão próprios contra a candidata; nenhuma tarefa autoriza merge, tag ou Release.

## Fase 1 — Governança e revisão do planejamento

- [X] T001 Validar `umanni-vault/specs/024-import-error-stabilization/spec.md` contra o pedido, a versão-alvo `1.1.0` e as quatro falhas observadas.
- [X] T002 [P] Validar `umanni-vault/specs/024-import-error-stabilization/plan.md` e `research.md` contra a Constituição, a separação em quatro patches e as condições de parada.
- [X] T003 [P] Validar `umanni-vault/specs/024-import-error-stabilization/contracts/upload-validation.md`, `contracts/error-surface.md`, `data-model.md` e `quickstart.md` para status, destinos e ausência de vazamento.
- [X] T004 Abrir/publicar a PR documental #33 da branch `codex/024-import-error-stabilization`, aplicar label `documentation`, atribuir Douglas e vincular ao milestone 9.
- [ ] T005 Obter revisão independente de spec, plano e tarefas no HEAD exato da PR documental; resolver achados somente nas threads da revisora e obter `review-ledger=success`, `spec-reviewed` e zero threads abertas.

**Checkpoint**: nenhum patch de código começa antes de T005.

## Fase 2 — Preparação comum dos patches

- [ ] T006 Criar as branches `codex/025-import-layout-spacing`, `codex/026-import-upload-validation` e `codex/027-error-return-home` a partir de `f4afda9ebce52380fce952429c624c607e982ad9` conforme `umanni-vault/specs/024-import-error-stabilization/plan.md`.
- [ ] T007 Após a integração autorizada e revalidação do HEAD de 027 na candidata, criar `codex/028-authorization-error-view` a partir desse HEAD e registrar a dependência em sua PR e no `umanni-vault/EXEC-024-IMPORT-ERROR-STABILIZATION.md`.
- [ ] T008 [P] Preparar o roteiro RED/GREEN de P1 em `umanni-vault/specs/024-import-error-stabilization/quickstart.md` sem executar mudanças fora de `codex/025-import-layout-spacing`.
- [ ] T009 [P] Preparar o roteiro RED/GREEN de P2 em `umanni-vault/specs/024-import-error-stabilization/contracts/upload-validation.md` sem executar mudanças fora de `codex/026-import-upload-validation`.
- [ ] T010 [P] Preparar o roteiro RED/GREEN de P3/P4 em `umanni-vault/specs/024-import-error-stabilization/contracts/error-surface.md` sem executar mudanças fora das branches correspondentes.

## Fase 3 — US1: espaçamento da importação (P2) — patch 025

**Objetivo**: corrigir a leitura do formulário e do histórico sem alterar os demais campos globais.

**Teste independente**: 320 px, 1440×1024 e fonte 200% exibem dica, ação e histórico em sequência sem sobreposição ou rolagem horizontal.

- [ ] T011 [P] [US1] Adicionar RED de estrutura/associação acessível da dica, ação e histórico em `app/frontend/pages/Admin/UserImports/Index.test.tsx`.
- [ ] T012 [P] [US1] Adicionar cenário visual responsivo de 1440×1024, 320 px e fonte ampliada em `spec/e2e/user_imports.spec.ts` para `app/frontend/pages/Admin/UserImports/Index.tsx`.
- [ ] T013 [US1] Executar os testes de T011–T012 no HEAD pré-correção e registrar a falha esperada em `umanni-vault/EXEC-025-IMPORT-LAYOUT-SPACING.md`.
- [ ] T014 [US1] Reagrupar a composição de `app/frontend/pages/Admin/UserImports/Index.tsx` para tornar a região de upload e o histórico semanticamente espaçados.
- [ ] T015 [US1] Adicionar regras específicas de espaçamento positivo em `app/frontend/styles/application.css`, sem modificar o comportamento de `.avatar-field .field-hint`.
- [ ] T016 [US1] Executar GREEN em `app/frontend/pages/Admin/UserImports/Index.test.tsx` e `spec/e2e/user_imports.spec.ts`; conferir 320 px e 200% de fonte conforme `quickstart.md`.
- [ ] T017 [US1] Registrar escopo, RED/GREEN e resultados reais em `umanni-vault/EXEC-025-IMPORT-LAYOUT-SPACING.md`.

## Fase 4 — US2: upload ausente e falhas previstas (P1) — patch 026

**Objetivo**: impedir a página de erro para ausência de arquivo e manter exceções inesperadas no fallback seguro.

**Teste independente**: sem arquivo, o cliente não faz POST; POST direto sem parâmetros retorna 422 com `errors.sourceFile` e cria zero lote/job.

- [ ] T018 [P] [US2] Adicionar RED para submissão sem `source_file`, erro local, `aria-invalid`, associação de mensagem e foco em `app/frontend/pages/Admin/UserImports/Index.test.tsx`.
- [ ] T019 [P] [US2] Adicionar RED para `POST /admin/user_imports` sem `user_import` e sem `source_file`, verificando 422, `errors.sourceFile`, zero `UserImport` e zero `SolidQueue::Job` em `spec/requests/user_imports_spec.rb`.
- [ ] T020 [P] [US2] Adicionar cenário E2E que clica sem arquivo e confirma ausência de POST/página segura em `spec/e2e/user_imports.spec.ts`.
- [ ] T021 [US2] Executar os RED de T018–T020 no HEAD pré-correção e registrar a falha esperada em `umanni-vault/EXEC-026-IMPORT-UPLOAD-VALIDATION.md`.
- [ ] T022 [US2] Implementar guarda de submissão e limpeza/substituição segura do erro local em `app/frontend/pages/Admin/UserImports/Index.tsx`, usando a mensagem localizada e foco no input.
- [ ] T023 [US2] Implementar extração defensiva e resposta 422 para upload ausente em `app/controllers/admin/user_imports_controller.rb`, preservando o contrato de arquivo/preflight existente.
- [ ] T024 [US2] Delimitar o resgate de falhas previstas de enfileiramento em `app/controllers/admin/user_imports_controller.rb` para alerta de formulário sem capturar exceções inesperadas.
- [ ] T025 [US2] Executar GREEN focado e confirmar que a exceção não classificada ainda usa a superfície 5xx de `spec/integration/delivery_errors_spec.rb`.
- [ ] T026 [US2] Registrar escopo, RED/GREEN, status e invariantes de persistência em `umanni-vault/EXEC-026-IMPORT-UPLOAD-VALIDATION.md`.

## Fase 5 — US3: retorno contextual da página segura (P1) — patch 027

**Objetivo**: enviar admin, regular e visitante ao início seguro correto sem acessar a sessão no fallback de emergência.

**Teste independente**: o link é `/admin/dashboard`, `/profile` ou `/sign-in` conforme contrato, sem replay.

- [ ] T027 [P] [US3] Adicionar RED de destinos admin, regular e visitante no componente em `app/frontend/pages/Errors/Show.test.tsx`.
- [ ] T028 [P] [US3] Adicionar RED de props de retorno para origem `/admin/*`, `/profile` e pública, sem cookie/sessão no fallback, em `spec/integration/delivery_errors_spec.rb`.
- [ ] T029 [P] [US3] Adicionar cenário de navegação segura sem replay em `spec/delivery/delivery_errors.spec.ts`.
- [ ] T030 [US3] Executar os RED de T027–T029 e registrar a falha esperada em `umanni-vault/EXEC-027-ERROR-RETURN-HOME.md`.
- [ ] T031 [US3] Definir/propagar somente destinos permitidos a partir do escopo da rota de origem em `app/services/delivery_exceptions_app.rb`, preservando `safe_html_env` sem cookies/sessão.
- [ ] T032 [US3] Consumir `returnPath` em `app/frontend/pages/Errors/Show.tsx` e manter a página sem layout autenticado e sem ação de repetição.
- [ ] T033 [US3] Executar GREEN focado de RSpec, Vitest e Playwright; confirmar que o HTML de emergência não contém cookie, token ou sentinela em `spec/integration/delivery_errors_spec.rb`.
- [ ] T034 [US3] Registrar escopo, RED/GREEN e confirmação de isolamento em `umanni-vault/EXEC-027-ERROR-RETURN-HOME.md`.

## Fase 6 — US4: superfície 403 Umanni (P1) — patch 028, depende de US3

**Objetivo**: trocar a página nativa de negação por uma resposta 403 segura, acessível e coerente em HTML/Inertia.

**Teste independente**: regular autenticado recebe 403 seguro para rota admin existente/inexistente, sem conteúdo técnico ou alteração persistente.

- [ ] T035 [P] [US4] Adicionar RED de resposta HTML/Inertia 403, status e indistinguibilidade em `spec/requests/security_spec.rb`.
- [ ] T036 [P] [US4] Adicionar RED do contrato 403 Inertia/HTML sem sentinelas técnicas em `spec/integration/delivery_errors_spec.rb`.
- [ ] T037 [P] [US4] Adicionar cenário Playwright de navegação regular para rota admin negada em `spec/delivery/delivery_errors.spec.ts` ou `spec/e2e/identity.spec.ts`.
- [ ] T038 [US4] Executar os RED de T035–T037 contra o HEAD da candidata que contém 027 revisado e integrado com autorização, registrando a falha esperada em `umanni-vault/EXEC-028-AUTHORIZATION-ERROR-VIEW.md`.
- [ ] T039 [US4] Substituir a resposta crua de `app/controllers/admin/base_controller.rb` por renderização/serialização 403 segura, preservando a regra `UserPolicy` no servidor.
- [ ] T040 [US4] Estender o contrato mínimo em `app/services/delivery_exceptions_app.rb` e `app/controllers/errors_controller.rb` somente para 403 HTML/Inertia, mantendo o fallback 5xx isolado.
- [ ] T041 [US4] Ajustar `app/frontend/pages/Errors/Show.tsx` e seu teste para comunicar acesso indisponível de forma neutra, sem revelar recurso ou razão interna.
- [ ] T042 [US4] Executar GREEN focado e confirmar 403, `X-Inertia` quando aplicável, HTML em português, ausência de detalhes e zero mutações.
- [ ] T043 [US4] Registrar escopo, RED/GREEN e invariantes de autorização em `umanni-vault/EXEC-028-AUTHORIZATION-ERROR-VIEW.md`.

## Fase 7 — Evidência, revisão e integração controlada

- [ ] T044 [P] Executar `git diff --check <base> HEAD` e os testes focados do patch 025, registrando resultados em `umanni-vault/EXEC-025-IMPORT-LAYOUT-SPACING.md`.
- [ ] T045 [P] Executar `git diff --check <base> HEAD` e os testes focados do patch 026, registrando resultados em `umanni-vault/EXEC-026-IMPORT-UPLOAD-VALIDATION.md`.
- [ ] T046 [P] Executar `git diff --check <base> HEAD` e os testes focados do patch 027, registrando resultados em `umanni-vault/EXEC-027-ERROR-RETURN-HOME.md`.
- [ ] T047 Executar `git diff --check <base> HEAD`, os testes focados e `bin/check` aplicável do patch 028 em `umanni-vault/EXEC-028-AUTHORIZATION-ERROR-VIEW.md`.
- [ ] T048 Abrir/publicar cada PR de patch com label coerente, Douglas como responsável, milestone 9 e base candidata; não criar PR combinada em `umanni-vault/EXEC-024-IMPORT-ERROR-STABILIZATION.md`.
- [ ] T049 Iniciar automaticamente revisora independente `gpt-5.6-luna`/high para cada patch concluído, entregar spec/plano/tarefas/evidências/HEAD exato e registrar o despacho em seus EXECs.
- [ ] T050 Resolver achados somente nas threads originais, executar checks afetados e obter `review-ledger=success`, `code-reviewed` e zero threads para cada HEAD de patch.
- [ ] T051 Após integrações explicitamente autorizadas na candidata, executar os quatro cenários de `quickstart.md`, `bin/check`, `git diff --check` e nova revisão independente do HEAD combinado.
- [ ] T052 Atualizar `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md` e `umanni-vault/EXEC-024-IMPORT-ERROR-STABILIZATION.md` apenas com resultados observados; parar para a autorização explícita de Douglas antes de merge final, tag `v1.1.0`, Release ou fechamento do milestone.

## Dependências e paralelismo

- T001–T005 bloqueiam todo código.
- P1 (T011–T017), P2 (T018–T026) e P3 (T027–T034) são independentes entre si e podem ser executados em paralelo após T005.
- P4 (T035–T043) começa somente depois de P3 revisado ser integrado autorizadamente à candidata e seu HEAD ser revalidado, pois usa seu contrato de retorno.
- T044–T050 podem avançar por patch; T051–T052 exigem todos os patches e autorização humana de integração.

## Estratégia mínima

O primeiro incremento recomendado é P2: elimina a página de erro durante o envio sem arquivo e testa o contrato de borda no cliente e no servidor. P1 e P3 podem seguir em paralelo; P4 fecha a superfície 403 depois que o contrato de erro estiver estabilizado.

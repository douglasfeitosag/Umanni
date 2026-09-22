# Tarefas: estabilização da importação e das telas de erro

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [contratos](contracts/) e [quickstart.md](quickstart.md)
**Versão-alvo**: candidata `1.1.0` (milestone 9)
**Regra de execução**: cada patch tem PR e revisão próprios contra a candidata; nenhuma tarefa autoriza merge, tag ou Release.

## Fase 1 — Governança e revisão do planejamento

- [X] T001 Validar `umanni-vault/specs/024-import-error-stabilization/spec.md` contra o pedido, a versão-alvo `1.1.0` e as quatro falhas observadas.
- [X] T002 [P] Validar `umanni-vault/specs/024-import-error-stabilization/plan.md` e `research.md` contra a Constituição, a ordem dos patches e as condições de parada.
- [X] T003 [P] Validar `umanni-vault/specs/024-import-error-stabilization/contracts/upload-validation.md`, `contracts/error-surface.md`, `data-model.md` e `quickstart.md` para status, destinos, ARIA e ausência de vazamento.
- [X] T004 Abrir/publicar a PR documental #33 da branch `codex/024-import-error-stabilization`, aplicar label `documentation`, atribuir Douglas e vincular ao milestone 9.
- [X] T005 Responder aos achados R-024-001 a R-024-005 na PR #33, publicar o HEAD documental corretivo e obter `review-ledger=success`, `spec-reviewed` e zero threads abertas.

**Checkpoint**: nenhum patch de código começa antes de T005.

## Fase 2 — US1: espaçamento da importação (P2) — patch 025

**Objetivo**: corrigir a leitura do formulário e do histórico sem alterar campos globais.

**Teste independente**: 320 px, 1440×1024 e fonte 200% exibem dica, ação e histórico em sequência sem sobreposição ou rolagem horizontal.

- [X] T006 [US1] Criar `codex/025-import-layout-spacing` a partir de `f4afda9ebce52380fce952429c624c607e982ad9`, abrir PR contra a candidata e registrar a base em `umanni-vault/EXEC-025-IMPORT-LAYOUT-SPACING.md`.
- [X] T007 [P] [US1] Adicionar RED de estrutura/associação da dica, ação e histórico em `app/frontend/pages/Admin/UserImports/Index.test.tsx`.
- [X] T008 [P] [US1] Adicionar RED visual de 1440×1024, 320 px e fonte ampliada em `spec/e2e/user_imports.spec.ts` para `app/frontend/pages/Admin/UserImports/Index.tsx`.
- [X] T009 [US1] Executar os testes de T007–T008 no HEAD pré-correção e registrar a falha esperada em `umanni-vault/EXEC-025-IMPORT-LAYOUT-SPACING.md`.
- [X] T010 [US1] Reagrupar a composição de `app/frontend/pages/Admin/UserImports/Index.tsx` para separar semanticamente a região de upload e o histórico.
- [X] T011 [US1] Adicionar regras específicas de espaçamento positivo em `app/frontend/styles/application.css`, sem modificar `.avatar-field .field-hint`.
- [X] T012 [US1] Executar GREEN focado de `app/frontend/pages/Admin/UserImports/Index.test.tsx` e `spec/e2e/user_imports.spec.ts`.
- [X] T013 [US1] Refatorar nomes, duplicação, semântica e testes de `app/frontend/pages/Admin/UserImports/Index.tsx` e `app/frontend/pages/Admin/UserImports/Index.test.tsx` após o GREEN; registrar resultado no EXEC.
- [X] T014 [US1] Executar `git diff --check <base> HEAD`, publicar evidência no EXEC e obter revisão independente Luna/high do HEAD do patch 025.

## Fase 3 — US2: upload ausente e falhas previstas (P1) — patch 026, depende de US1

**Objetivo**: impedir a página de erro para ausência de arquivo e manter exceções inesperadas no fallback seguro.

**Teste independente**: sem arquivo, o cliente não faz POST; POST direto sem parâmetros e `UserImports::Enqueue::Failed` retornam 422; erro `ActiveRecord`/não classificado continua 500 seguro.

- [X] T015 [US2] Após 025 ser integrado autorizadamente e o HEAD da candidata revalidado, criar `codex/026-import-upload-validation` a partir desse HEAD e registrar a base em `umanni-vault/EXEC-026-IMPORT-UPLOAD-VALIDATION.md`.
- [X] T016 [P] [US2] Adicionar RED de guarda local sem `source_file`, foco, `aria-invalid`, `#source-file-error` e `aria-describedby="source-file-hint source-file-error"` em `app/frontend/pages/Admin/UserImports/Index.test.tsx`.
- [X] T017 [P] [US2] Adicionar RED para `POST /admin/user_imports` sem `user_import`/`source_file` e para `UserImports::Enqueue::Failed`, verificando 422, `errors.sourceFile` e zero `UserImport`/`SolidQueue::Job` em `spec/requests/user_imports_spec.rb`.
- [X] T018 [P] [US2] Adicionar teste de integração do endpoint que injeta `ActiveRecord::ConnectionNotEstablished` ou exceção não classificada e comprova 500 seguro, sem 422, em `spec/integration/delivery_errors_spec.rb` e `spec/requests/user_imports_spec.rb`.
- [X] T019 [P] [US2] Adicionar cenário E2E que clica sem arquivo e confirma ausência de POST/página segura em `spec/e2e/user_imports.spec.ts`.
- [X] T020 [US2] Executar os RED de T016–T019 e registrar as falhas esperadas em `umanni-vault/EXEC-026-IMPORT-UPLOAD-VALIDATION.md`.
- [X] T021 [US2] Implementar guarda local, ids/associação ARIA e foco em `app/frontend/pages/Admin/UserImports/Index.tsx`.
- [X] T022 [US2] Implementar extração defensiva de upload e resposta 422 para ausência de arquivo em `app/controllers/admin/user_imports_controller.rb`.
- [X] T023 [US2] Restringir em `app/controllers/admin/user_imports_controller.rb` o resgate recuperável exclusivamente a `UserImports::Enqueue::Failed`, deixando classes `ActiveRecord` e exceções não classificadas no fallback 5xx.
- [X] T024 [US2] Executar GREEN dos testes focados, comprovando os dois contratos 422 e o caminho 500 seguro do endpoint.
- [X] T025 [US2] Refatorar nomes, duplicação, contratos ARIA e testes em `app/frontend/pages/Admin/UserImports/Index.tsx`, `app/controllers/admin/user_imports_controller.rb` e specs; registrar resultado no EXEC.
- [X] T026 [US2] Executar `git diff --check <base> HEAD`, publicar evidência no EXEC e obter revisão independente Luna/high do HEAD do patch 026.

## Fase 4 — US3: retorno contextual da página segura (P1) — patch 027

**Objetivo**: enviar pessoas ao início seguro correto sem acessar a sessão no fallback de emergência.

**Teste independente**: a origem administrativa, de perfil e pública produz, respectivamente, `/admin/dashboard`, `/profile` e `/sign-in`, sem replay.

- [X] T027 [US3] Criar `codex/027-error-return-home` a partir de `f4afda9ebce52380fce952429c624c607e982ad9`, abrir PR contra a candidata e registrar a base em `umanni-vault/EXEC-027-ERROR-RETURN-HOME.md`.
- [X] T028 [P] [US3] Adicionar RED de destinos administrativos, perfil e público no componente em `app/frontend/pages/Errors/Show.test.tsx`.
- [X] T029 [P] [US3] Adicionar RED de props de retorno por origem `/admin/*`, `/profile` e pública, sem cookie/sessão no fallback, em `spec/integration/delivery_errors_spec.rb`.
- [X] T030 [P] [US3] Adicionar cenário Playwright de navegação segura sem replay em `spec/delivery/delivery_errors.spec.ts`.
- [X] T031 [US3] Executar os RED de T028–T030 e registrar as falhas esperadas em `umanni-vault/EXEC-027-ERROR-RETURN-HOME.md`.
- [X] T032 [US3] Definir/propagar destinos permitidos a partir da rota de origem em `app/services/delivery_exceptions_app.rb`, preservando `safe_html_env` sem cookies/sessão.
- [X] T033 [US3] Consumir `returnPath` em `app/frontend/pages/Errors/Show.tsx` sem layout autenticado e sem ação de repetição.
- [X] T034 [US3] Executar GREEN de RSpec, Vitest e Playwright, comprovando que o fallback não contém cookie, token ou sentinela.
- [X] T035 [US3] Refatorar nomes, classificação de rota, contrato de props e testes em `app/services/delivery_exceptions_app.rb` e `app/frontend/pages/Errors/Show.tsx`; registrar resultado no EXEC.
- [X] T036 [US3] Executar `git diff --check <base> HEAD`, publicar evidência no EXEC e obter revisão independente Luna/high do HEAD do patch 027.

## Fase 5 — US4: superfície 403 Umanni (P1) — patch 028, depende de US3

**Objetivo**: trocar a página nativa de negação por 403 seguro, acessível e coerente para rota administrativa casada ou não casada solicitada por pessoa regular.

**Teste independente**: regular autenticado recebe a mesma resposta 403 segura para `/admin/dashboard` e `/admin/not-a-real-route`, em HTML/Inertia; admin recebe 404 para a rota inexistente.

- [X] T037 [US4] Após 027 ser integrado autorizadamente e o HEAD da candidata revalidado, criar `codex/028-authorization-error-view` a partir desse HEAD e registrar a base em `umanni-vault/EXEC-028-AUTHORIZATION-ERROR-VIEW.md`.
- [X] T038 [P] [US4] Adicionar RED de respostas reais HTML/Inertia 403 para rota administrativa casada/não casada e 404 para admin na não casada em `spec/requests/security_spec.rb`.
- [X] T039 [P] [US4] Adicionar RED do contrato 403 Inertia/HTML sem sentinelas técnicas e sem conteúdo nativo em `spec/integration/delivery_errors_spec.rb`.
- [X] T040 [P] [US4] Adicionar cenário Playwright de pessoa regular em rota admin casada/não casada em `spec/delivery/delivery_errors.spec.ts` ou `spec/e2e/identity.spec.ts`.
- [X] T041 [US4] Executar os RED de T038–T040 contra o HEAD da candidata com 027 integrado e registrar as falhas esperadas em `umanni-vault/EXEC-028-AUTHORIZATION-ERROR-VIEW.md`.
- [X] T042 [US4] Substituir a resposta crua de `app/controllers/admin/base_controller.rb` por renderização/serialização 403 segura, preservando `UserPolicy` como autoridade.
- [X] T043 [US4] Adicionar rota catch-all administrativa em `config/routes.rb` e controlador administrativo de ausência em `app/controllers/admin/unmatched_routes_controller.rb`: regular recebe 403 seguro pelo guard, admin recebe 404.
- [X] T044 [US4] Estender somente o contrato necessário em `app/services/delivery_exceptions_app.rb`, `app/controllers/errors_controller.rb` e `app/frontend/pages/Errors/Show.tsx` para HTML/Inertia 403, mantendo o fallback 5xx isolado.
- [X] T045 [US4] Executar GREEN focado e confirmar status, `X-Inertia` quando aplicável, HTML em português, ausência de detalhes, indistinguibilidade para regular e zero mutações.
- [X] T046 [US4] Refatorar nomes, fluxo de autorização, catch-all e testes em `app/controllers/admin/base_controller.rb`, `app/controllers/admin/unmatched_routes_controller.rb` e specs; registrar resultado no EXEC.
- [X] T047 [US4] Executar `git diff --check <base> HEAD`, publicar evidência no EXEC e obter revisão independente Luna/high do HEAD do patch 028.

## Fase 6 — Integração e lançamento controlado

- [X] T048 Integrar somente os patches já aceitos e explicitamente autorizados à candidata, revalidando cada HEAD e iniciando nova revisão quando a integração mudar o HEAD em `umanni-vault/EXEC-024-IMPORT-ERROR-STABILIZATION.md`.
- [X] T049 Executar os cenários de `umanni-vault/specs/024-import-error-stabilization/quickstart.md`, `bin/check`, `bin/check-delivery` e `git diff --check` no HEAD combinado da candidata.
- [X] T050 Atualizar `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md` e `umanni-vault/EXEC-024-IMPORT-ERROR-STABILIZATION.md` somente com resultados observados e iniciar revisão final independente Luna/high do HEAD combinado.
- [X] T051 Após `review-ledger=success`, `code-reviewed`, zero threads e autorização explícita de lançamento, integrar a candidata em `main`, verificar igualdade de árvore/HEAD e criar a tag anotada `v1.1.0` em `umanni-vault/releases/1.1.0.md`.
- [X] T052 Publicar a GitHub Release `v1.1.0`, conferir tag/target/Release, fechar o milestone 9 apenas sem itens abertos e registrar a auditoria em `umanni-vault/STATUS.md`.

## Dependências e paralelismo

- T001–T005 bloqueiam todo código.
- US1 (T006–T014) e US3 (T027–T036) podem iniciar em paralelo; usam superfícies de arquivos distintas.
- US2 (T015–T026) começa somente depois da integração autorizada de US1 na candidata, pois compartilha `UserImports/Index` e seu teste.
- US4 (T037–T047) começa somente depois da integração autorizada de US3 na candidata, pois compartilha a superfície de erro.
- T048–T052 exigem os quatro patches aceitos e os gates do HEAD combinado.

## Estratégia mínima

US1 elimina a sobreposição; US3 pode avançar junto. US2 e US4 são deliberadamente seriais para impedir conflitos e regressões sobre as mesmas superfícies. Todo patch só avança a gates/revisão depois de refatoração explícita pós-GREEN.

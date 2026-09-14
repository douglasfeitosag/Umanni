# Tarefas — fundação mínima 0.2.0

Entrada: [spec](spec.md), [plano](plan.md), [pesquisa](research.md), [dados](data-model.md), contratos e quickstart neste diretório. As caixas abertas representam trabalho futuro, **não realizado nesta sessão documental**. Todas as tarefas T001–T019 pertencem ao milestone **0.2.0**; itens B001–B007 ao **Backlog**. Execução depende de revisão independente aceita, prompt posterior e sessão da executora aberta por Douglas.

## Fase 1 — Setup / destino 0.2.0

- [ ] T001 Verificar base v0.1.0, SHA do planejamento aceito, review-ledger success, spec-reviewed e zero threads abertas; registrar referências em `umanni-vault/EXEC-009-FOUNDATION-APP.md`; criar `codex/009-foundation-app` a partir do planejamento aceito. FR008.
- [ ] T002 Preparar runtime isolado, gerar Rails em pasta temporária e revisar inventário antes de copiar arquivos de boot na raiz; preservar `README.md`, `AGENTS.md`, `.specify/`, `branding/` e `umanni-vault/`; fixar `Gemfile`, `package.json`, `.ruby-version`, `.node-version`, `.npmrc` conforme research.md. FR004/007.
- [ ] T003 Resolver e congelar `Gemfile.lock`/`package-lock.json`, registrar plataformas e instalação frozen/ci, sem trocar versões; divergência bloqueia trabalho dependente em `umanni-vault/EXEC-009-FOUNDATION-APP.md`. FR004.

## Fase 2 — Harness / destino 0.2.0

- [ ] T004 Preparar `spec/spec_helper.rb`, `spec/rails_helper.rb`, `.rspec`, `.simplecov`, `vitest.config.ts`, `app/frontend/test/setup.ts` para testes focalizados, instrumentação antes de boot e política integral de quality.md; não gerar testes vazios para passar. FR005/006.

## Fase 3 — US1 / destino 0.2.0

Objetivo: página real verificável sem fluxo de usuários. Teste independente: BDD01–04.

- [ ] T005 [US1] Escrever primeiro testes BDD01–04 em `spec/requests/foundation_spec.rb` e `app/frontend/pages/Foundation/Show.test.tsx`; comprovar RED pela ausência da resposta/página, não por dependência quebrada. Props obrigatórias: `app: { name: "Umanni", version: "0.2.0" }`, `errors: {}`; strings não nulas. FR001/002/005.
- [ ] T006 [US1] Implementar somente `app/controllers/foundation_controller.rb`, rotas em `config/routes.rb`, layout em `app/views/layouts/application.html.erb`, `app/frontend/pages/Foundation/Show.tsx`, `app/frontend/types/foundation.ts`, entrypoint e stylesheet; manter CSRF e props permitidas, configurar digest em `config/initializers/inertia_rails.rb`, Vite em `vite.config.ts`/`config/vite.json`; obter GREEN e refatorar. FR001/002.
- [ ] T007 [US1] Criar testes de navegador BDD01–03 em `spec/e2e/foundation.spec.ts` antes de ajustes finais de integração; comprovar HTML inicial, visita Link, recarregamento por mismatch, título, aviso, seis projetos e ausência de erros de console em `playwright.config.ts`; registrar RED/GREEN relevante. FR001/002/005.

## Fase 4 — US2 / destino 0.2.0

Objetivo: qualidade e isolamento comprovados. Teste independente: BDD05–07.

- [ ] T008 [US2] Escrever RED de conexão/isolamento em `spec/integration/database_isolation_spec.rb`: current_database distinto por processo e diferente do desenvolvimento, marcador TEMPORARY de mesmo nome em conexões isoladas; não criar migration de domínio. FR003/005.
- [ ] T009 [US2] Configurar primary PostgreSQL em `config/database.yml`, banco test sem fallback ao desenvolvimento, pools/sufixos exatos de data-model.md e preparo seguro em `lib/tasks/verification.rake`; schema/seed vazios em `db/schema.rb`/`db/seeds.rb`; obter GREEN com dois processos. FR003.
- [ ] T010 [US2] Implementar consolidação verificável em `lib/tasks/coverage.rake` e `.simplecov`, run IDs/manifest de dois resultados, threshold Ruby90%, Vitest linhas90% e include de arquivos não importados em `vitest.config.ts`; comprovar BDD06–07 removendo um resultado e acrescentando arquivos sem cobertura em cópia temporária; registrar provas no EXEC. FR006.
- [ ] T011 [US2] Configurar `tsconfig.json` strict, `eslint.config.js`, `.rubocop.yml` e Brakeman; criar `bin/check` com propagação de falhas, preparo seguro, suites/build/browser e códigos de saída; provar falha por teste/tipo/lint controlados no EXEC. FR005/006.

## Fase 5 — US3 / destino 0.2.0

Objetivo: clean-room e entrega auditável. Teste independente: BDD08–09.

- [ ] T012 [US3] Criar `Dockerfile`, `compose.yaml`, `.dockerignore`, `.env.example` e ajustes dirigidos em `.gitignore` conforme environment.md; stages tooling/build/production, digests fixados, dev/vite/verify/web/db, usuário não root, Thruster/Puma e readiness; nenhuma chave embutida. FR004/007.
- [ ] T013 [US3] Executar BDD08 em cópia limpa do SHA, executar `bin/check` via tooling, build/run da imagem final, verificar /up, página/assets/404, db:prepare e non-root; registrar comandos, versões, arquitetura, contagens e cobertura em `umanni-vault/EXEC-009-FOUNDATION-APP.md`. FR003/005/006/007.
- [ ] T014 [US3] Atualizar `README.md` em inglês com build/seed(no-op)/run/check comprovados, configuração local e IA efetivamente usada; atualizar `umanni-vault/STATUS.md` e EXEC sem chamar a fundação de gestão de usuários concluída. FR008.
- [ ] T015 [US3] Publicar commits coesos/PR no milestone0.2.0 com label e Douglas responsável; confirmar SHA testado, publicar foundation-checks e preservar/provar proteção conforme `contracts/quality.md`; registrar BDD09 e metadados no PR/EXEC. FR008.

## Fase 6 — Revisão / destino 0.2.0

- [ ] T016 Iniciar automaticamente revisora Luna high em contexto novo com PR/HEAD, `spec.md`, `plan.md`, `tasks.md` e EXEC; somente a revisora publica findings/ledger/labels e resolve threads; registrar identidade/modelo no PR. FR008.
- [ ] T017 Responder cada achado na mesma thread com tag EXECUTORA, corrigir somente escopo autorizado, atualizar `umanni-vault/EXEC-009-FOUNDATION-APP.md`, publicar novo HEAD e solicitar nova revisão; nenhum sucesso herdado. FR008.
- [ ] T018 Confirmar foundation-checks/review-ledger success no HEAD, code-reviewed, zero threads pendentes, metadados corretos e diff restrito; entregar relatório a Douglas em `umanni-vault/EXEC-009-FOUNDATION-APP.md` e parar antes de integrar. FR008.
- [ ] T019 Após execução/revisão, a condutora prepara tarefa futura de fechamento em `umanni-vault/PROMPT-COND-007-FOUNDATION-CLOSURE.md`, com itens restantes do milestone; merge/tag/release requerem autorização específica posterior. Não fechar0.2.0 com o PR documental. FR008.

## Backlog — não executar por este prompt

- [ ] B001 [Backlog] Resolver cadastro/convite/senha inicial e e-mail antes de criar spec de autenticação Rails nativa; destino documental futuro `umanni-vault/05-LEITURA-DO-TESTE.md`, RF01/02.
- [ ] B002 [Backlog] Resolver autorização, último administrador, autoalteração de papel e avatar antes de spec de usuários; referência `umanni-vault/05-LEITURA-DO-TESTE.md`, RF04/05/08/09.
- [ ] B003 [Backlog] Resolver contrato CSV/XLSX, limites, duplicação, atomicidade/repetição/erros; planejar Solid Queue/Cable e bancos próprios antes de código; referência `umanni-vault/08-ARQUITETURA-PROPOSTA.md`, RF03/06/07.
- [ ] B004 [Backlog] Planejar CI automático, automação do ledger e isolamento do runner no Mac em nova spec sob `umanni-vault/specs/`; não criar workflow executável/runner agora.
- [ ] B005 [Backlog] Planejar SSR, deploy Kamal efetivo e profiling ZJIT só se selecionados; referência `umanni-vault/05-LEITURA-DO-TESTE.md`.
- [ ] B006 [Backlog] Manter issue9 de polimento de slogan fora desta entrega; arquivo relacionado `branding/prototype/`, sem alteração autorizada.
- [ ] B007 [Backlog] Especificar interfaces funcionais e integração da identidade visual nas telas futuras sob `umanni-vault/specs/`, sem migrar protótipo/simulações em0.2.0.

## Dependências e paralelismo

T001→T002→T003→T004→US1(T005–07)→US2(T008–11)→US3(T012–15)→T016–19. T007 pode escrever cenário antes de Compose, mas validação GREEN final depende de T012. T008 RED precede configuração T009; a conexão inicial pode exigir subir PostgreSQL provisório isolado com a imagem fixada, sem depender da entrega Compose final.

O primeiro incremento útil é US1; a versão exige também US2/US3. Não há tarefas marcadas P: o repositório inicial compartilha configurações/locks e a execução serial reduz conflitos. Dentro da validação, RSpec/Vitest/Playwright usam dois workers conforme contrato. Separação futura possível após T004: escrever request specs e testes de componente em arquivos distintos; não implica abrir executoras automaticamente nem dispensa revisão.

## Rastreabilidade

FR001→T005–07; FR002→T005–07; FR003→T008/09/13; FR004→T002/03/12; FR005→T004/05/07/08/11/13; FR006→T004/10/11/13; FR007→T002/12/13; FR008→T001/14–19. SC001→T005–07/12/13; SC002→T008–11/13; SC003→T015–18; SC004→T001/02/14/18.

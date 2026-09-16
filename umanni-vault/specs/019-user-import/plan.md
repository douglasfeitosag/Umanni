# Plano 019 — Importação de usuários 0.4.0

**Spec**: [spec.md](spec.md)

**Pesquisa**: [research.md](research.md)

**Modelo**: [data-model.md](data-model.md)

**Branch documental**: `codex/019-user-import`

**Branch futura de execução**: `codex/019-user-import-app`

**Versão-alvo**: milestone `0.4.0` #7

**Base**: `origin/main` / `9d3191f6013fc400b6f5181bdb577cb5728537ec`

## Estratégia

Executar em fatias verticais TDD, mantendo uma rota completa mínima em cada etapa: contrato de entrada, persistência do lote, consumo real pelo worker, resultado por linha, progresso autorizado e interface. A feature não começa antes do aceite deste planejamento no HEAD exato.

## Arquitetura mínima

- `Admin::UserImportsController`: index/show/create, autorização e respostas Inertia; não processa usuários.
- `UserImport` e `UserImportRow`: estado persistido, invariantes e relatório.
- `UserImports::CsvReader` e `UserImports::XlsxReader`: adaptam os formatos ao mesmo enumerador de linhas normalizadas.
- `UserImports::Preflight`: valida formato/cabeçalhos/limites com leitura limitada antes do enqueue.
- `UserImports::Processor`: coordena resultados, criação idempotente, blocos e contadores; não conhece request/sessão.
- `ProcessUserImportJob`: recebe ID, controla repetição e chama o processador.
- `UserImportChannel`: stream por lote com autorização administrativa; payload somente de invalidação.
- páginas React/Inertia `Admin/UserImports/Index` e `Show`, formulário de upload e hook de invalidação/reload.
- ação no CRUD administrativo para definir senha inicial apenas em usuário sem credencial.
- Solid Queue 1.7.0 em processo Compose separado; Roo 3.0.0 somente no leitor XLSX.

Não criar camada genérica de importação, event bus, repository, API paralela ou abstração de storage.

## Sequência TDD

1. **Gate e dependências**: revalidar PR/HEAD da spec, milestone, base e locks. Em cópia temporária, repetir resolução das gems e inventariar o gerador `solid_queue:install` antes de incorporar a superfície mínima.
2. **Preflight RED/GREEN**: requests e leitores para autorização, bytes, MIME/assinatura, encoding, planilha, cabeçalhos, 10.000 linhas e conteúdo malicioso; nenhuma persistência/job na rejeição.
3. **Lote e enqueue RED/GREEN**: migrations/modelos/constraints/attachment, create autorizado e enqueue depois do commit na fila `imports`.
4. **Processamento RED/GREEN**: linhas válidas/invalidas, defaults, todas as duplicatas internas, corrida externa, conta sem senha, resultados e contadores.
5. **Repetição RED/GREEN**: lock por lote, skip de resultado terminal, falha entre blocos, retry automático limitado e terminal `failed`.
6. **Senha inicial RED/GREEN**: ação administrativa apenas para `password_digest` ausente, confirmação/política, segredo filtrado e login neutro antes/depois.
7. **Progresso RED/GREEN**: canal autorizado, invalidação after-commit, partial reload coalescido, reconexão e revogação de admin/sessão.
8. **Interface RED/GREEN**: upload, histórico/detalhe/relatório paginado, estados e erros em português, teclado/mobile/200%/reduced motion.
9. **Operação RED/GREEN**: instalar/configurar Solid Queue, worker dev/delivery, Dockerfile/Compose/startup, prova de restart e ausência de artefatos na imagem.
10. **Gates finais**: `bin/check`, `bin/check-delivery` ampliado ou gate específico de importação, cobertura, auditoria, docs/EXEC, commits/push/PR e revisão Luna/high.

## Estratégia de testes

- **RSpec model/service/job**: invariantes, readers, preflight, processor, retry, concorrência e senha inicial.
- **RSpec request/channel**: autorização, props exatas, upload, nenhum enqueue em rollback, detalhe/paginação e assinatura.
- **Vitest/RTL**: formulário, erros, estados, progresso acessível, coalescing/reconnect e relatório.
- **Playwright**: CSV/XLSX reais, admin/regular/visitante, progresso com worker real, reload, senha inicial e breakpoints.
- **Compose**: projeto e volumes efêmeros, banco novo, imagens sem cache quando exigido, web/worker separados, restart no meio do lote, cleanup por trap.
- **Segurança**: arquivo disfarçado/malformado, fórmula, XSS, path/filename, CSRF, ID/canal forjado, mass assignment, corrida de e-mail e logs sem conteúdo sensível.

Fixtures devem ser mínimas, sintéticas e versionadas somente em `spec/fixtures/files/`. Para provar 10.001 linhas, preferir geração determinística no teste sem armazenar arquivo grande.

## Arquivos permitidos para a futura execução

- `Gemfile`, `Gemfile.lock`;
- `app/controllers/admin/user_imports_controller.rb` e ajuste mínimo relacionado em `admin/users_controller.rb`;
- `app/models/user_import.rb`, `app/models/user_import_row.rb` e ajuste mínimo em `user.rb`;
- `app/jobs/**`, `app/services/user_imports/**`, `app/channels/user_import_channel.rb` e conexão Cable somente se necessária para revogação vigente;
- `app/frontend/pages/Admin/UserImports/**`, hooks/componentes/tipos diretamente necessários e estilos da feature;
- `config/routes.rb`, environments/initializers estritamente ligados a Active Job/Solid Queue, `config/queue.yml` e arquivos de schema/migration gerados necessários;
- `db/migrate/**`, `db/schema.rb` e schema da fila se a instalação comprovadamente o exigir;
- `bin/jobs`, `bin/check`, `bin/check-delivery` ou novo gate `bin/check-imports`;
- `Dockerfile`, `.dockerignore`, `compose.yaml` e overlays de teste necessários ao worker;
- specs/tests/fixtures diretamente rastreados aos BDDs;
- `README.md`, `umanni-vault/STATUS.md`, `MEMORIA-PROJETO.md` e `EXEC-019-USER-IMPORT.md`.

Alteração fora da lista ou refatoração não necessária exige parada. Não alterar branding/prototype, specs aceitas, workflows, runner, deploy/Kamal/SSR/ZJIT, dados reais ou a issue #9.

## Commits previstos

1. `Add import preflight and persisted batches`
2. `Process import rows idempotently with Solid Queue`
3. `Add secure initial password setup for imported users`
4. `Stream authorized import progress`
5. `Build the user import interface`
6. `Verify local import delivery and document evidence`

Os cortes podem ser menores se preservarem RED/GREEN e revisão; não juntar correções sem relação.

## Critérios de conclusão da execução

- todos os US1–US6 e NFR-001–NFR-008 aprovados;
- `solid_queue 1.7.0` e `roo 3.0.0` fixados e presentes somente onde necessários;
- web e worker reproduzíveis em Compose, com restart comprovado;
- Ruby e TypeScript >=90% de linhas, sem diluir escopo;
- README em inglês e documentação/EXEC em português refletem apenas resultados reais;
- PR de execução no milestone 0.4.0, label coerente e Douglas responsável;
- revisão independente Luna/high no HEAD exato, ledger/checks verdes e zero threads abertas;
- parada antes de merge, tag, Release ou fechamento do milestone.

## Parada

Aplicar integralmente a condição de parada da spec. Falha de dependência, gate, worker, parser, autorização, idempotência, segurança ou teste obrigatório mantém a entrega pendente; não substituir por alegação manual.

# Dados da fundação — 0.2.0

## Representação transitória

`FoundationPageProps` contém somente `app: { name: "Umanni", version: "0.2.0" }` e `errors: {}` (prop padrão do adaptador). `app` é obrigatório, `name` e `version` são strings não nulas e têm os literais indicados. Não enviar versões internas de Ruby, credenciais, hostname, ambiente, usuários, sessão ou estado do banco ao navegador. O aviso de escopo é texto da página, não uma regra de negócio configurável.

O envelope Inertia também contém `component`, `url` e `version` (digest dos assets, distinto de app.version), além dos campos obrigatórios gerados pelo adaptador. Esses campos de protocolo não são entidades de domínio. Contrato: [rails-inertia.md](contracts/rails-inertia.md).

## Persistência

Somente conexão primary PostgreSQL em 0.2.0. Bancos: `umanni_development`, `umanni_test`, `umanni_test2`, `umanni_e2e` e `umanni_production`. `TEST_ENV_NUMBER` vazio designa o primeiro processo RSpec; `2` designa o segundo. O servidor E2E usa `RAILS_ENV=test` com URL exclusiva para `umanni_e2e`. Não executar suites concorrentes no mesmo par de bancos; projetos Compose distintos isolam execuções simultâneas.

Não criar `User`, `Session`, `Import`, tabelas temporárias permanentes de demonstração ou seed de administrador. `db/schema.rb` pode conter apenas metadados Rails; `db/seeds.rb` não cria dados. Testes de isolamento usam tabela TEMPORARY por conexão e rollback, sem migration de domínio. O hook `spec/support/worker_database_probe.rb`, carregado por `spec/rails_helper.rb`, executa before(:suite) em **cada processo**, independentemente dos arquivos de specs atribuídos. Ele confere `current_database()` e usa tabela TEMPORARY de mesmo nome nos dois processos, grava um marcador exclusivo do worker e comprova leitura do próprio marcador na mesma conexão. Grava observação JSON por run ID/worker com TEST_ENV_NUMBER, nome do banco, marcador esperado/observado e conclusão. O agregador exige exatamente duas observações válidas do mesmo run ID/SHA: worker1 (TEST_ENV_NUMBER vazio) em umanni_test e worker2 (TEST_ENV_NUMBER=2) em umanni_test2. Banco de desenvolvimento, worker ausente/duplicado, identidade divergente ou marcador incorreto fazem falhar. A spec de integração valida a conexão local; a prova de ambos os workers depende do hook e da consolidação, não da distribuição desse arquivo.

Bancos e schemas de Solid Queue/Cable/Cache ficam no Backlog com sua futura integração. Não substituir PostgreSQL por SQLite em testes. Pool por processo de 5 conexões; Puma 1 worker e até 3 threads no incremento, dois processos RSpec. Parâmetros são locais, não promessa de capacidade produtiva.

## Evidência

Cada execução tem SHA, data, versões efetivas, códigos de saída, contagens de testes, arquivos incluídos/excluídos na cobertura e percentuais Ruby/TS separados. Resultados de cada processo devem ter identificador exclusivo e ser descartados do conjunto seguinte. Nenhum dado de outros projetos entra nos relatórios públicos.

# Dados da fundação — 0.2.0

## Representação transitória

`FoundationPageProps` contém somente `app: { name: "Umanni", version: "0.2.0" }` e `errors: {}` (prop padrão do adaptador). `app` é obrigatório, `name` e `version` são strings não nulas e têm os literais indicados. Não enviar versões internas de Ruby, credenciais, hostname, ambiente, usuários, sessão ou estado do banco ao navegador. O aviso de escopo é texto da página, não uma regra de negócio configurável.

O envelope Inertia também contém `component`, `url` e `version` (digest dos assets, distinto de app.version), além dos campos obrigatórios gerados pelo adaptador. Esses campos de protocolo não são entidades de domínio. Contrato: [rails-inertia.md](contracts/rails-inertia.md).

## Persistência

Somente conexão primary PostgreSQL em 0.2.0. Bancos: `umanni_development`, `umanni_test`, `umanni_test2`, `umanni_e2e` e `umanni_production`. `TEST_ENV_NUMBER` vazio designa o primeiro processo RSpec; `2` designa o segundo. O servidor E2E usa `RAILS_ENV=test` com URL exclusiva para `umanni_e2e`. Não executar suites concorrentes no mesmo par de bancos; projetos Compose distintos isolam execuções simultâneas.

Não criar `User`, `Session`, `Import`, tabelas temporárias permanentes de demonstração ou seed de administrador. `db/schema.rb` pode conter apenas metadados Rails; `db/seeds.rb` não cria dados. Testes de isolamento usam tabela TEMPORARY por conexão e rollback, sem migration de domínio. Teste deve registrar `current_database()` em cada processo e comprovar nomes diferentes do desenvolvimento; usar marcador temporário de mesmo nome nos dois processos para verificar isolamento.

Bancos e schemas de Solid Queue/Cable/Cache ficam no Backlog com sua futura integração. Não substituir PostgreSQL por SQLite em testes. Pool por processo de 5 conexões; Puma 1 worker e até 3 threads no incremento, dois processos RSpec. Parâmetros são locais, não promessa de capacidade produtiva.

## Evidência

Cada execução tem SHA, data, versões efetivas, códigos de saída, contagens de testes, arquivos incluídos/excluídos na cobertura e percentuais Ruby/TS separados. Resultados de cada processo devem ter identificador exclusivo e ser descartados do conjunto seguinte. Nenhum dado de outros projetos entra nos relatórios públicos.

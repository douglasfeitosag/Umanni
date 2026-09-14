# Guia de validação — planejamento e futura execução

## Hoje: comandos existentes, sem aplicação

Na raiz `/Users/douglas/Projects/Umanni`:

```sh
git status --short --branch
git rev-parse 'v0.1.0^{commit}'
gh release view v0.1.0 --json tagName,url,publishedAt
gh issue view 9 --json title,state,milestone
SPECIFY_FEATURE_DIRECTORY=/Users/douglas/Projects/Umanni/umanni-vault/specs/008-foundation-plan SPECIFY_FEATURE=008-foundation-plan .specify/scripts/bash/check-prerequisites.sh --json --require-spec --require-tasks --include-tasks
git diff --check
```

Esperado: base87e8c51894faa5794e9759b9caa5df4871d350e7; issue9 no Backlog; artefatos completos e nenhum whitespace inválido. Nenhum comando de teste de aplicação existe em v0.1.0.

## Depois do aceite: sequência da executora

Os comandos abaixo são uma **receita futura**, não evidência de execução. CLIs Rails/Bundler/npm/Compose são reais; `bin/check`, tarefas de cobertura e arquivos Compose serão criados pelas tarefas e deverão ser comprovados no EXEC. Se uma opção do CLI fixado não existir, parar e devolver a incompatibilidade; não improvisar geração irrestrita.

1. Ler os gates e preparar runtime isolado Ruby/Node conforme research/environment. Verificar help do Rails fixado; o gerador trabalha em pasta temporária nova, não na raiz governada:

```sh
gem install bundler -v 4.0.20 --no-document
gem install rails -v 8.1.3.1 --no-document
rails _8.1.3.1_ new --help
rails _8.1.3.1_ new /tmp/umanni-foundation-stage/umanni --name=Umanni --database=postgresql --skip-bundle --skip-git --skip-ci --skip-javascript --skip-hotwire --skip-asset-pipeline --skip-test --skip-solid --skip-active-job --skip-action-cable --skip-action-mailer --skip-kamal --skip-action-mailbox --skip-action-text --skip-active-storage
```

Executar somente dentro do ambiente isolado; diretório deve estar ausente e ser exclusivo da execução. Confirmar nome/flags com help e revisar inventário antes de copiar. Instalação do gerador é inicial; manifestos finais e locks devem refletir integralmente a matriz.

2. Adicionar dependências exatas em Gemfile/package.json; gerar Gemfile.lock/package-lock.json com o runtime-alvo. Com locks criados, validar resolução congelada:

```sh
bundle _4.0.20_ lock --add-platform aarch64-linux x86_64-linux
bundle _4.0.20_ install
npm install --package-lock-only
BUNDLE_FROZEN=true bundle _4.0.20_ install
npm ci
bundle exec rails generate rspec:install
```

Preparar harness e seguir RED/GREEN das tarefas. Não gerar autenticação, models de usuários ou Inertia examples. O frontend é integração manual especificada.

3. Após criar Dockerfile, Compose e bin/check, executar da raiz do checkout:

```sh
docker compose -p umanni-foundation --profile test config --quiet
docker compose -p umanni-foundation --profile test build verify
docker compose -p umanni-foundation up -d --wait db
docker compose -p umanni-foundation --profile test run --rm verify bin/check
```

O wrapper prepara exclusivamente umanni_test/test2/e2e, limpa só resultados próprios, executa as verificações de quality.md e devolve código não zero se qualquer gate falhar. Comandos internos esperados (após implementação):

```sh
RAILS_ENV=test bundle exec rails zeitwerk:check
RAILS_ENV=test bundle exec parallel_rspec -n 2 spec/requests spec/integration
RAILS_ENV=test bundle exec rake coverage:verify
npm exec tsc -- --noEmit
npm exec eslint -- app/frontend --max-warnings=0
bundle exec rubocop
bundle exec brakeman --no-pager
npm exec vitest -- run --coverage --maxWorkers=2
RAILS_ENV=test bundle exec vite build
npm exec playwright -- test --workers=2
```

Playwright instala browsers no tooling durante build, usa seis projetos e inicia Rails test dedicado na porta3101 com assets compilados; não reutiliza servidor existente. RSpec inclui pelo menos dois arquivos para particionar e comprova os dois bancos. `coverage:verify` será criada e testada contra ausência de resultado.

4. Configurar somente variáveis locais de delivery no .env ignorado, preparar `umanni_production` e testar imagem final sem development server:

```sh
docker compose -p umanni-foundation --profile delivery build web
docker compose -p umanni-foundation --profile delivery run --rm web bin/rails db:prepare
docker compose -p umanni-foundation --profile delivery up -d --wait web
curl --fail http://127.0.0.1:3030/up
curl --fail http://127.0.0.1:3030/
```

A configuração do serviço web deve fornecer DATABASE_URL de umanni_production e SECRET_KEY_BASE local. O primeiro curl valida boot; o segundo e a inspeção no navegador validam página/assets. Verificar também 404 e ausência de stacktrace na imagem final. Repetir de cópia limpa do SHA em projeto Compose exclusivo, conforme environment.md, antes do aceite.

5. Registrar versões, locks, comandos/saídas, RED/GREEN, cobertura e provas negativas em `umanni-vault/EXEC-009-FOUNDATION-APP.md`; publicar commit/PR e iniciar revisora Luna high independente. Aplicar gates manuais conforme quality.md. Não fazer merge/tag/release.

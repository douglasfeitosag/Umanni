# EXEC-022 — Credenciais Rails 1.1.0

**Papel**: executora. **Modelo**: Codex/GPT-5 (variante exata não exposta). **Data**: 2026-09-17. **Branch**: `codex/023-credentials-config-app`. **Base de planejamento**: `9e4744adea9deac7637b7b95d633aced7921c0a5`. **Spec**: `specs/023-credentials-config/`.

## Escopo executado

Somente a migração do segredo de aplicação `SECRET_KEY_BASE` para Rails Credentials, o encaminhamento runtime de `RAILS_MASTER_KEY`, documentação e auditoria correspondente. URLs de banco, seus perfis e gates de isolamento foram preservados. Não foram adicionados secret manager, CI, deploy, mudanças de banco/autenticação nem alteração de `v1.0.0`.

## RED

O Ruby 4.0.6 não existe no host (`rbenv: version ruby-4.0.6 is not installed`), então a execução ocorreu no container tooling. Depois de preparar o banco isolado, o comando abaixo falhou como esperado no HEAD de planejamento, com 6 falhas: produção não configurava credentials, o ciphertext não existia, Compose ainda injetava `SECRET_KEY_BASE`, e um plaintext era aceito.

```sh
docker compose --project-name umanni-credentials-red --profile test run --rm -e VERIFICATION_SHA=$(git rev-parse HEAD) verify bundle exec rspec --format documentation spec/config/credentials_spec.rb
```

O primeiro disparo também evidenciou os pré-requisitos do gate: `VERIFICATION_SHA` é obrigatório e o banco `umanni_test` precisa ser preparado. Ambos foram fornecidos sem alterar o contrato de produção.

## GREEN e comportamento de runtime

O ciphertext foi criado por Rails com uma chave privada local ignorada; nenhum valor de chave ou segredo foi impresso ou registrado. O teste focado passou:

```sh
docker compose --project-name umanni-credentials-red --profile test build verify
docker compose --project-name umanni-credentials-red --profile test run --rm -e VERIFICATION_SHA=$(git rev-parse HEAD) verify bundle exec rspec --format documentation spec/config/credentials_spec.rb
# 7 examples, 0 failures
```

O build do perfil delivery ocorreu sem `RAILS_MASTER_KEY` e passou. A auditoria do final image confirmou `config/credentials.yml.enc` presente e a ausência de `config/master.key`, `.env`, `spec`, `Dockerfile`, `compose.yaml` e caches. Com a chave privada exportada apenas para o processo Compose, `web` e `worker` ficaram saudáveis; `/ready` respondeu `ready` e `/up` respondeu 200 na porta isolada 3131. A porta 3030 estava ocupada por recurso externo e não foi interrompida.

Sem `RAILS_MASTER_KEY`, o `web` encerrou com status 1; o log seguro foi:

```text
delivery.startup.credentials_missing: supply RAILS_MASTER_KEY
```

## Próximos gates

`bin/check` passou no container tooling sem `RAILS_MASTER_KEY`: 100 exemplos RSpec, 23 testes Vitest, 66 cenários Playwright, RuboCop e Brakeman sem achados. O gate `bin/check-delivery` passou com os 18 cenários production-like, incluindo web/worker, storage, restart, readiness, falhas seguras, banco indisponível e auditoria de imagem. O segundo gate foi acompanhado até `exit_code: 0`.

Ainda pendentes neste registro: verificações finais de segredo/diff/documentação, commit/publicação do candidato e revisão independente Luna/high do HEAD exato. Não houve merge, tag, Release ou fechamento de milestone.

## Higiene final do candidato

`git diff --cached --check` passou. `config/credentials.yml.enc` está no índice Git; `config/master.key` e `.env` não estão, e ambos continuam ignorados. A busca staged não encontrou uma atribuição plaintext de `SECRET_KEY_BASE`; as ocorrências restantes são a variável dummy exclusivamente no Dockerfile, testes/documentação que descrevem a proibição e referências históricas. Os arquivos referenciados no vault (`EXEC-022` e `releases/1.1.0.md`) existem. O commit, a publicação e a revisão exata ainda são etapas posteriores.

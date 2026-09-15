# Execução 009 — fundação mínima da aplicação

## Retomada autorizada em 2026-09-15

Douglas concordou com fixar `json 2.21.2`, atualizar o lock e continuar a validação, mantendo o restante da matriz. Esta decisão resolve a pergunta B-009-01 abaixo; os registros de bloqueio permanecem como histórico. A restrição será examinada na revisão independente da implementação. Execução retomada, ainda sem aceite final.

## Identificação e estado

- Pedido: Douglas, PROMPT-EXEC-009, originado em PROMPT-COND-006.
- Papel: executora. Modelo realmente utilizado: GPT-6; variante exata não exposta. Não atribuir Terra high a esta sessão.
- Versão-alvo: 0.2.0, milestone 3. Estado: execução retomada após restrição JSON autorizada, validação em andamento, sem aceite final.
- Base publicada: `v0.1.0`, `87e8c51894faa5794e9759b9caa5df4871d350e7`.
- Planejamento: PR #11, HEAD aprovado `d1f3a3a349ed4a7610c4da7b170d4d2976c56691`.
- Branch: `codex/009-foundation-app`, criada diretamente desse HEAD. PR de implementação ainda não criado.

## Gate inicial observado

Checkout canônico confirmado com origin `https://github.com/douglasfeitosag/Umanni.git` e árvore inicialmente limpa. A main local estava em `f9a817cc6972c2438230f12d7dafedf0abc2d5b0`. A tag publicada apontava para a base esperada; o commit aprovado existia localmente; a branch de execução não existia localmente nem no remoto.

Consulta GitHub confirmou PR #11 já integrado, HEAD ainda igual ao aprovado, label `spec-reviewed`, milestone 3/0.2.0 e `review-ledger=success` no SHA aprovado. As três threads estavam resolvidas, sem próxima página. Nenhum merge foi executado nesta sessão. O checkbox histórico de revisão não foi alterado.

`git fetch origin` inicialmente falhou (255) por proteção de `.git/FETCH_HEAD`; repetição autorizada fora do sandbox terminou em 0. As primeiras consultas `gh` falharam por rede restrita (1); repetidas fora do sandbox, terminaram em 0. Isso não foi falha do gate de revisão.

`git switch -c codex/009-foundation-app d1f3a3a349ed4a7610c4da7b170d4d2976c56691`: 0.

Pré-requisitos Spec Kit com `SPECIFY_FEATURE_DIRECTORY` absoluto, `SPECIFY_FEATURE=008-foundation-plan`, `--require-spec --require-tasks --include-tasks`: 0. Link simbólico da constituição preservado.

## Bootstrap e inventário

Docker Engine 29.4.2 e Compose 5.1.3 observados. Runtime isolado: Linux aarch64, Ruby 4.0.6, Node 24.21.0, npm 11.19.0, Bundler 4.0.20; comandos de versão terminaram em 0. Nenhum runtime global do Mac foi modificado.

Pull Ruby no digest aprovado: 0. Build temporário `umanni-exec009-bootstrap`, com imagens Ruby/Node por digest e instalação exata de Bundler/Rails: 0. O help de `rails _8.1.3.1_ new` confirmou as flags da receita (0). Geração ocorreu em diretório temporário novo com todas as flags de quickstart (0), nunca na raiz do checkout.

Inventário copiado: arquivos convencionais de boot em `app/controllers`, `app/models`, layout, `config`, `bin/rails`, `bin/rake`, `bin/thrust`, `bin/docker-entrypoint`, `Rakefile`, `config.ru`, `.ruby-version`, `db/seeds.rb` e páginas genéricas Rails em `public`. As páginas genéricas são necessárias ao contrato de erros da imagem final. Não copiados: chaves/credentials, README gerado, PWA, ícones, helpers vazios, pipeline de assets concorrente, CI ou ferramentas adicionais geradas. Nenhuma alteração em branding/AGENTS/.specify.

Manifestos diretos foram escritos com a matriz exata. Removido bootstrap de Bootsnap porque essa dependência não é necessária ao boot mínimo; não foram adicionados jbuilder, debug, web-console, bundler-audit ou rubocop-rails-omakase. As gems internas do metapacote Rails não significam ativação dos frameworks excluídos.

## Instalação e locks observados

`bundle _4.0.20_ lock --add-platform aarch64-linux x86_64-linux arm64-darwin`, `bundle install` e repetição com `BUNDLE_FROZEN=true`: 0. Foram instaladas 96 gems. `npm install --package-lock-only` e `npm ci`: 0, 273 pacotes instalados, auditoria npm sem vulnerabilidades naquela execução. Engines/peers estritos permaneceram habilitados. npm avisou sobre o postinstall de esbuild; o build Vite executou posteriormente sem ignorar engines ou peers.

`Gemfile.lock` registra plataformas Linux arm64/amd64 e Darwin, incluindo variantes de gems nativas resolvidas pelo Bundler. **Somente Linux aarch64 foi executado.** As dependências diretas seguem a matriz. A resolução escolheu a dependência transitiva `json 3.0.2`, que instalou corretamente, mas falhou na integração com ActiveSupport 8.1.3.1. Instalação congelada bem-sucedida não comprova compatibilidade funcional.

## RED/GREEN e comandos executados

Todos os comandos de aplicação abaixo foram executados no ambiente isolado descrito acima, com o checkout montado em `/app`; após criação do container fixo, via `docker exec umanni-exec009`. Os SHAs nos relatórios identificam a base Git; **a árvore continha alterações locais, e estes resultados não são validação de um commit limpo**.

| Comando/cenário | Saída | Resultado observado |
| --- | --- | --- |
| `bundle exec rails generate rspec:install` | 0 | Harness criado; aviso inicial de vite.json ausente, depois configurado |
| `npm exec vitest -- run app/frontend/pages/Foundation/Show.test.tsx` antes do conteúdo | 1 | RED: h1 Umanni ausente no módulo importável que retornava null |
| Mesmo comando após conteúdo/props | 0 | GREEN: 1 teste |
| `bundle exec rspec spec/requests/foundation_spec.rb` antes de GET / | 1 | RED: esperado 200, recebido 404 |
| `bundle exec vite build` + request spec após implementação | 0 | GREEN: build real e 1 exemplo |
| Request spec das props antes de configuração Inertia | 1 | RED: errors ausente e version nil |
| Request spec do CSRF antes de habilitá-lo em test | 1 | RED: allow_forgery_protection false |
| Request specs após CSRF e versão/props | 0 | 6 exemplos, sem falhas; health, 404, mismatch 409, HTML e props |
| Vitest antes de Link | 1 | RED: link Recarregar página ausente |
| Vitest após Link | 0 | GREEN: 2 testes |
| RSpec isolamento com TEST_ENV_NUMBER=2 antes de sufixo | 1 | RED: esperado umanni_test2, recebido umanni_test |
| `bundle exec rake verification:prepare` | 0 | Preparou somente umanni_test, umanni_test2, umanni_e2e |
| `bundle exec parallel_rspec -n 2 spec/requests spec/integration` | 0 | 2 processos, 7 exemplos; probes abaixo |
| Primeira `rake coverage:verify` | 1 | Implementação do agregador exigia tracked_files mesmo quando todos já constavam em coverage; corrigida a união das listas |
| `bundle exec rake coverage:verify` após correção | 0 | 7/7 linhas Ruby, 100%; dois resultados e probes válidos |
| Primeiro Playwright Chromium desktop | 1 | RED integração: título HTML existia, h1 não; cliente não lia JSON do formato antigo |
| Playwright seis projetos, dois workers | 1 | 12 falhas; conflito de chdir do digest por requisição e erro de JSON ao reler sessão |
| Playwright Chromium desktop após digest calculado no boot | 1 | Página aparece; visita Link retorna 500 por incompatibilidade JSON |
| `npm exec tsc -- --noEmit` inicial | 2 | Configuração incluía tipos Node sem pacote; escopo ajustado para frontend/E2E, sem nova dependência |
| `npm exec tsc -- --noEmit` após ajuste | 0 | Checagem estrita do frontend e E2E passou |
| `npm exec eslint -- app/frontend spec/e2e '*.config.ts' --max-warnings=0` | 0 | Sem achados |
| `bundle exec rubocop -a --format simple` | 1 | 39 correções e um achado restante; ajuste de STDOUT para $stdout aplicado, ainda sem rechecagem final |
| `docker compose -p umanni-foundation --profile test config --quiet` | 0 | Somente sintaxe/modelo Compose validados; nenhum build final alegado |
| Reprodução mínima ActiveSupport::JSON.decode | 1 | Incompatibilidade confirmada sem navegador, controller ou banco |
| Request spec de duas visitas consecutivas | 1 | Regressão persistida: segunda visita falha no mesmo JSON.parse |

## Decisões de integração dentro da matriz

- CSR manual, sem @inertiajs/vite e sem SSR. O adaptador Rails agora usa `use_script_element_for_initial_page=true`, formato esperado pelo cliente Inertia 3. Props explícitas app/errors.
- CSRF permanece ativo também no ambiente de teste. Cookie/token foram observados em resposta real; não publicados neste relatório.
- O digest Vite Ruby passa a ser calculado no boot, evitando `Dir.chdir` concorrente a cada requisição. O Dockerfile provisório prevê salvá-lo durante o build para a imagem final sem fontes frontend; essa imagem ainda não foi validada.
- A configuração TypeScript cobre código frontend e E2E. Configurações das ferramentas são lidas pelas próprias ferramentas e lintadas; não foi adicionada @types/node fora da matriz.
- bin/check, Dockerfile e Compose foram escritos, mas ainda estão em desenvolvimento. Não usar sua presença como prova de execução completa ou segurança do empacotamento.

## Observações dos dois workers

Run ID `11111111-1111-4111-8111-111111111111`, base SHA `d1f3a3a349ed4a7610c4da7b170d4d2976c56691`, árvore de trabalho com alterações da executora:

| Worker | TEST_ENV_NUMBER | Banco | Marcador esperado e observado | Resultado |
| --- | --- | --- | --- | --- |
| 1 | vazio | umanni_test | `11111111-1111-4111-8111-111111111111:1:4c257b604dcd5a7f455f944e` | success=true, 6 exemplos |
| 2 | 2 | umanni_test2 | `11111111-1111-4111-8111-111111111111:2:efe60d2a6b88dd9f701cd274` | success=true, 1 exemplo |

Probes em before(:suite), uma tabela TEMPORARY de mesmo nome em cada conexão, transação e ON COMMIT DROP. A consolidação exigiu identidades, nomes e marcadores corretos. Esta execução não dependeu de qual worker recebeu o arquivo de isolamento. Provas negativas e proteção contra todas as formas de evidência inválida ainda precisam de execução.

## Cobertura e limites de evidência

Ruby: 100%, 7/7 linhas nesta execução parcial. Arquivos: ApplicationController (2), FoundationController (3), ApplicationRecord (2). Escopo configurado: app/**/*.rb e lib/**/*.rb, sem exclusão individual; .rake é orquestração fora do glob de Ruby, conforme contrato. Nenhuma cobertura de navegador ou protótipo foi somada.

TypeScript: os dois testes passaram, mas a execução com cobertura e seus denominadores ainda não ocorreram. Ramos Ruby, funções/statements/branches TS, arquivos não exercitados e provas negativas dos limites continuam pendentes. Não há aceite SC002 nem foundation-checks.

## Bloqueio B-009-01 — Rails 8.1.3.1 e JSON 3.0.2

Reprodução mínima no ambiente instalado:

```sh
docker exec umanni-exec009 bundle exec ruby -ractive_support/json -e 'puts "Ruby #{RUBY_VERSION}; ActiveSupport #{Gem.loaded_specs.fetch("activesupport").version}; JSON #{JSON::VERSION}"; ActiveSupport::JSON.decode("{}")'
```

Código de saída 1. Resultado: `ArgumentError: wrong number of arguments (given 2, expected 1)`.

Evidências do código efetivamente instalado:

- `activesupport-8.1.3.1/lib/active_support/json/decoding.rb:25`: chama `::JSON.parse(json, options)` com dois argumentos posicionais.
- `json-3.0.2/lib/json/common.rb:296`: define `parse(source, on_load: nil, object_class: nil, array_class: nil, **options)`.
- A leitura do cookie da sessão passa por ActiveSupport::JSON.decode e provoca 500 na segunda navegação.
- `spec/requests/foundation_spec.rb`, cenário `keeps the Rails session readable across consecutive browser visits`, reproduz o defeito com duas requisições na mesma sessão (1 exemplo, 1 falha).
- A inspeção somente leitura do pacote publicado `json 2.21.2` encontrou `def parse(source, opts = nil)`. Isso fundamenta uma proposta de restrição, **não comprova sua instalação/integração**, que não foi executada.

Origem da parada: PROMPT-EXEC-009, seção Quando parar: “Conflito de versões ou contratos”; spec.md/Condição de parada e plan.md/Fases também exigem retorno de incompatibilidade à condutora. A autorização de acesso total eliminou solicitações de sandbox, mas não altera a matriz/condições do pedido.

### Pergunta concreta e proposta à condutora

**A condutora aprova acrescentar uma restrição explícita para `json = 2.21.2`, mantendo Ruby 4.0.6/Rails 8.1.3.1 e o restante da matriz, atualizar o planejamento e submetê-lo à revisão necessária antes de retomar a execução?**

Recomendação: validar e fixar essa dependência transitiva compatível com a API usada por Rails; depois regenerar o lock e repetir instalação congelada, regressão de sessão, matriz E2E e gates completos. Alternativa exige revisar a versão de Rails, ampliando o impacto. Não usar monkey patch, remover sessão/CSRF, ignorar o teste ou atualizar versões silenciosamente.

## Histórico: tarefas e artefatos no ponto de parada

T001/T002 concluídas. T003 produziu locks e instalações, mas sua compatibilidade está bloqueada; T004 harness preparado. T005/T006/T008/T009 têm implementação/evidência parcial. T007 falha pela incompatibilidade. T010–T012 têm código provisório, sem provas finais. T013–T018 não concluídas. T019 pertence à condutora. B001–B007 não executadas.

Arquivos adicionados/alterados: manifestos/locks e arquivos de versão; boot Rails em app/controllers, app/models, app/views, config, bin, db e public; frontend/contrato/testes em app/frontend; RSpec e E2E em spec; quality configs e lib/tasks; Dockerfile/compose/.dockerignore/.env.example; .gitignore, README, STATUS e este EXEC. Branding/protótipo, AGENTS, constituição e revisão histórica do planejamento foram preservados.

A árvore permanece com alterações locais da executora, sem commit/push/PR de implementação. HEAD Git continua d1f3a3a; não confundir com código já publicado. Nenhum foundation-checks ou review-ledger de implementação foi publicado. Nenhuma proteção alterada. Revisora Luna high ainda não iniciada porque a implementação não atingiu a etapa final; nenhuma autoria/revisão foi inventada.

Imagem final, execução completa de bin/check, Brakeman, clean-room, provas negativas dos gates e SC001–004/BDD01–09 cumulativos não estão satisfeitos. Dockerfile/Compose são rascunhos locais sujeitos à continuidade e revisão. Nenhum merge, fechamento de PR, auto-merge, tag ou release nesta sessão.

No ponto de parada, os containers temporários `umanni-exec009` e `umanni-exec009-db` foram parados (0); nenhum recurso de outro projeto foi tocado. O banco temporário usava tmpfs e deve ser preparado novamente na retomada. O container de ferramentas e a imagem bootstrap ficam disponíveis para retomada. O diagnóstico temporário que continha cookies foi removido, sem copiar cookies para documentos públicos. `git diff --check` e a comparação de branding/AGENTS/constituição terminaram em 0.

## Validação após retomada

- `bundle lock --update json` e `BUNDLE_FROZEN=true bundle install`: 0; lock agora contém json 2.21.2, 96 gems.
- Reprodução mínima ActiveSupport::JSON.decode e request specs: 0; regressão da segunda visita corrigida sem monkey patch.
- Playwright seis projetos/dois workers: 0, 12/12 cenários passaram.
- CSP: teste focalizado inicialmente falhou por header ausente (1); após política local com nonce Rails, passou (0). O nonce é passado ao bootstrap Inertia para estilos da barra de progresso. HMR só permitido em development.
- Estes resultados ainda correspondem à árvore local, sem alegação de clean-room no SHA Git.

## Gates locais completos e provas negativas

`docker exec -e TEST_DATABASE_URL=…/umanni_test umanni-exec009 bin/check`: **0**, run `7ef3e9c4-3c88-4563-9739-eef7acb6aba3`, árvore local baseada em d1f3a3a. Passaram: dependências, preparo dos três bancos, Zeitwerk, RSpec (9 exemplos/2 processos), agregação, tsc, ESLint, RuboCop, Brakeman (0 erros/0 warnings), Vitest (2 testes), build e Playwright (12 cenários). CSP ativa no navegador, sem erros de console.

Cobertura Ruby: **7/7 linhas, 100%**; ApplicationController 2/2, FoundationController 3/3, ApplicationRecord 2/2. Ramos: denominador zero, não aplicável. TypeScript: **1/1 linha executável, 100%**, Show.tsx; funções 1/1, statements 1/1. O retorno JSX é uma expressão executável no relatório V8. foundation.ts contém somente tipos, denominador zero. Ramos TS: zero, não aplicável (o valor percentual emitido pela ferramenta não é evidência de branches executados). Esta fundação pequena não comprova cobertura de funcionalidades futuras.

Exclusões Ruby: somente o escopo app/**/*.rb e lib/**/*.rb; tarefas .rake ficam fora conforme contrato. Config/bin/spec/migrations/dependências não integram denominador. Exclusões TS: declarações, testes, __tests__, frontend/test e entrypoints, exatamente conforme quality.md. O entrypoint contém somente bootstrap/resolução e recebe nonce do helper Rails; é exercitado no navegador. Protótipo/E2E não somados.

Provas executadas em cópia temporária independente dentro do container de ferramentas, com fontes e dependências próprias. Baseline completo **0**, restauração seguida de bin/check completo **0**. Primeira tentativa usando symlink de node_modules foi descartada porque npm ls recusou a árvore; a cópia real passou antes de qualquer mutação. Nenhuma dessas falhas iniciais foi contada como prova de gate.

| Mutação deliberada | Comando | Saída observada | Motivo comprovado |
| --- | --- | --- | --- |
| Remover .resultset.json do worker 2 | coverage:verify | 1 | Resultado obrigatório ausente |
| Remover isolation.json do worker 2 | coverage:verify | 1 | Observação obrigatória ausente |
| Marcar failure_count=1 no resultado do worker | coverage:verify | 1 | Worker não terminou com sucesso |
| Adicionar lib/uncovered_probe.rb não exercitado | bin/check | 2 | 9/49 linhas, 18,36%, menor que 90% |
| Adicionar TS não importado | bin/check | 1 | 1/42 linhas, 2,38%, menor que 90% |
| Adicionar spec com expect(1).to eq(2) | bin/check | 1 | Falha real de asserção no RSpec |
| Atribuir número a string TS | bin/check | 2 | TS2322 |
| Declarar variável não usada | bin/check | 1 | @typescript-eslint/no-unused-vars |

A URL de teste com query `database=umanni_production` também foi recusada (1), antes de preparo destrutivo. A configuração rejeita query/fragment e esquemas diferentes de PostgreSQL para evitar sobrescrita do nome aprovado.

## Empacotamento e proteção — progresso

Build da imagem production: 0. db:prepare na imagem final: 0, criou exclusivamente umanni_production. Primeiro boot final: 1, pois Thruster sobrescrevia PORT com seu TARGET_PORT padrão e disputava a porta 3000 com Puma. Corrigido Dockerfile para THRUSTER_HTTP_PORT=3000 e THRUSTER_TARGET_PORT=3001 conforme README da gem instalada. Revalidação em andamento.

Proteção de main relida antes/depois por API. PATCH alterou somente required_status_checks, adicionando foundation-checks a review-ledger e mantendo strict=true. Comparação estrutural confirmou todos os demais campos preservados: enforce_admins, required_conversation_resolution, revisões obsoletas descartadas, zero aprovações nativas, force-push/exclusão proibidos. Código de saída 0. São statuses manuais; nenhum workflow/runner foi criado.

Build production corrigido: **0**, imagem `sha256:527b604427dd49832df6a2bc82fb36436e3033414c26e2635bf211494f1506e3`. Compose delivery saudável: **0**. Imagem final: UID 1000, aarch64-linux; verificações de ausência de Node/npm/gcc/make/browsers, gems de teste, .env/.git/master.key, frontend fonte/spec/vault/branding: **0**. Rails runner: banco umanni_production, SELECT 1 = 1 (**0**). Smoke Playwright da imagem final em desktop/mobile: **0**, HTML/props/versão, Link Inertia, JS/CSS 200, sem @vite/client ou erro de console; /up 200 e rota desconhecida 404 genérica. PNGs desktop/mobile inspecionados; layout legível sem overflow. O frontend do Dockerfile também foi fixado no digest efetivamente usado pelo builder.

Este resultado de imagem ainda precede a cópia limpa do commit final. A imagem tooling foi construída com as versões aprovadas e browsers (0); a próxima validação parte do SHA com fontes incorporadas, sem bind mount.

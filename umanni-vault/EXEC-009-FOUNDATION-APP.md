# Execução 009 — fundação mínima da aplicação

## Resultado e identificação

- Pedido: Douglas, **PROMPT-EXEC-009**, origem PROMPT-COND-006. Destinatários: condutora e Douglas.
- Papel: executora. Modelo realmente utilizado: **GPT-6; variante exata não exposta**. Não atribuir Terra high a esta sessão.
- Versão-alvo: **0.2.0**, [milestone 3](https://github.com/douglasfeitosag/Umanni/milestone/3), ainda aberto.
- Branch: `codex/009-foundation-app`. [PR #12](https://github.com/douglasfeitosag/Umanni/pull/12), base main, label enhancement, Douglas responsável.
- Base imutável: v0.1.0, `87e8c51894faa5794e9759b9caa5df4871d350e7`.
- Planejamento aceito: [PR #11](https://github.com/douglasfeitosag/Umanni/pull/11), SHA `d1f3a3a349ed4a7610c4da7b170d4d2976c56691`. Branch de execução nasceu diretamente desse SHA.
- Commits de implementação: `0738bd2` (aplicação/gates) e `90f07adc9256fb1baa1486138f71484ad8598d8b` (empacotamento/evidências). Este relatório acrescenta a correção focalizada do hostname Vite e consolida os resultados.
- Estado: fundação implementada e validada localmente; revalidação do HEAD com correção Vite e revisão independente pendentes. **Sem aceite final ou autorização de integração.**

GET `/` apresenta a página técnica Rails–Inertia/React em português, versão 0.2.0 e aviso explícito de indisponibilidade de cadastro, login e gestão de usuários. `/up`, 404, PostgreSQL primary, assets compilados, isolamento, cobertura por linguagem e Compose estão implementados. Nenhum fluxo de usuário, importação, job, Redis, e-mail, SSR, deploy, profiling, CI automático ou runner foi criado.

## Gate inicial e preservação

Checkout canônico/origin confirmados e árvore inicialmente limpa. Main local estava em f9a817cc6972c2438230f12d7dafedf0abc2d5b0. Tag v0.1.0 correspondia à base, commit aprovado disponível e branch de execução inexistente. API confirmou PR #11 já integrado, mesmo HEAD aprovado, spec-reviewed, review-ledger=success e três threads resolvidas, sem paginação restante. Não foi feito merge nesta sessão.

Comandos de gate, criação da branch e check-prerequisites do Spec Kit: **0**. As primeiras tentativas de fetch/gh falharam por restrições anteriores de sandbox/rede (255/1); as repetições autorizadas passaram. A sessão passou posteriormente a full access/approval never, sem alterar runtimes globais. O checkbox histórico de revisão do planejamento e o link simbólico da constituição foram preservados.

Comparação com v0.1.0 confirmou branding, AGENTS e constituição intactos (0). Issue #9 relida: OPEN, milestone Backlog. Não houve alteração do protótipo nem soma da cobertura dele.

## Ambiente, geração e locks

Docker Engine 29.4.2, Compose 5.1.3; **Linux aarch64 no Mac**. Ruby 4.0.6, Rails 8.1.3.1, Bundler 4.0.20, Node 24.21.0, npm 11.19.0, PostgreSQL 18.6 e demais dependências diretas conforme research.md. Imagens Ruby/Node/PostgreSQL fixadas nos digests aprovados; frontend Dockerfile também fixado no digest efetivamente observado no build. amd64 consta dos manifestos, mas **não foi executado**.

Gerador Rails instalado com versão exata, help conferido, geração em pasta temporária nova com todas as flags do quickstart (0). Nunca executado rails new . --force. Inventário revisado antes da cópia: boot Rails, controllers/models-base/layout, config, binários Rails/rake/thrust/entrypoint, Rakefile/config.ru, schema/seeds vazios e páginas genéricas public. Não copiados README gerado, credentials/chaves, PWA/ícones, CI, Kamal ou frameworks excluídos. Bootsnap não foi adicionado. Gems internas do metapacote Rails não significam ativação de jobs/mail/storage/cable.

`bundle _4.0.20_ lock --add-platform aarch64-linux x86_64-linux arm64-darwin`, bundle install e BUNDLE_FROZEN=true: **0**. Gemfile.lock inclui variantes Linux arm64/amd64/Darwin; tooling tem 96 gems, bundle production tem 74. npm lock e npm ci: **0**, 273 pacotes, engines/peers estritos, auditoria sem vulnerabilidades nessa instalação. Nenhum latest ou @inertiajs/vite. npm emitiu aviso de postinstall esbuild, mas builds reais passaram sem relaxar engines/peers.

### B-009-01 resolvido por autorização de Douglas

A primeira resolução escolheu json 3.0.2. ActiveSupport 8.1.3.1 chama `JSON.parse(json, options)`; JSON 3 exige keywords, causando ArgumentError e HTTP 500 ao reler o cookie na segunda visita. Reprodução mínima com ActiveSupport::JSON.decode e request spec de duas visitas falharam (1). O trabalho dependente foi interrompido conforme a condição de parada do prompt.

Douglas concordou explicitamente em fixar **json = 2.21.2**, atualizar o lock e continuar, sem mudar as versões centrais. Essa versão mantém `parse(source, opts = nil)`. `bundle lock --update json`, instalação frozen, reprodução e regressão de sessão passaram (0). Não foi usado monkey patch nem removida proteção de sessão/CSRF. Decisão registrada também em research.md e sujeita à revisão independente.

## RED/GREEN observado

A tabela conserva a sequência de desenvolvimento anterior à validação completa. Esses testes iniciais rodaram sobre árvore com alterações locais, não representam validação limpa de d1f3a3a.

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


Resultados posteriores que superam as pendências históricas da tabela:

- CSP: RED por header ausente (1); política local e nonce Rails/Inertia implementados; GREEN (0).
- Sessão após pin JSON: GREEN (0); seis projetos Playwright: **12/12**, saída 0.
- RuboCop final: 28 arquivos, zero offenses (0). Brakeman: zero erros/warnings (0).
- Primeiro boot production falhou por disputa de porta Thruster/Puma (1). Corrigido THRUSTER_HTTP_PORT=3000 e THRUSTER_TARGET_PORT=3001 conforme gem instalada; boot saudável (0).
- Smoke dev após clean-room revelou 403: hostname interno `vite` recusado. Permitido somente esse hostname em server.allowedHosts. Na cópia temporária, assets 200, página/Link corretos, console sem erros e alteração/restauração do título via HMR sem reload. Alterações experimentais foram removidas; cópia voltou a diff limpo.

## Arquitetura testada e decisões

CSR manual, componente Foundation/Show, props exatas app/name/version e errors vazio. use_script_element_for_initial_page=true compatibiliza o HTML do adaptador Rails com o cliente Inertia 3. Digest Vite calculado no boot evita Dir.chdir concorrente; no build production é gravado em config/vite-digest, disponível sem fontes frontend. Request specs exercitam HTML, protocolo Inertia, 409/mismatch, sessão, CSRF, health e 404. Não existe endpoint mutante artificial.

CSP mantém helpers Rails, nonce novo por resposta e assets locais; localhost:3036/HMR somente em development. Entrypoint só faz bootstrap/resolução e fornece nonce ao Inertia. Vite usa origem localhost:3036 e hostname interno vite explicitamente permitido. Código/tipos/testes/README/commits em inglês; interface/relatório em português.

Primary PostgreSQL, pools/sufixos explícitos: development, test, test2, e2e e production separados. Test não herda DATABASE_URL. bin/check recusa ambiente incorreto, variável genérica DATABASE_URL, worker externo e URL de teste insegura; config rejeita query/fragment para impedir override do nome do banco. verification:prepare cria/prepara somente os três bancos de teste. Schema vazio, seed no-op, nenhuma migration de negócio.

Docker: tooling contém deps/testes/browsers; build compila assets sem banco/segredo; production contém Ruby/libs de runtime, gems production e assets. UID 1000, Thruster/Puma single process/3 threads. Compose publica apenas loopback, DB sem porta no host, volume PostgreSQL18 em /var/lib/postgresql. Sem HOME/socket/credenciais GitHub montados. Perfis dev e delivery testados separadamente na porta3030. .env local ignorado, modo600, secret aleatório não registrado em logs/documentos.

## Validação limpa do commit 90f07ad

Cópia Git destacada do SHA completo `90f07adc9256fb1baa1486138f71484ad8598d8b`, projeto exclusivo **umanni-exec009-90f07ad**, volume novo, VERIFICATION_SHA exportado antes do build. verify usa fontes incorporadas à imagem, sem bind mount. Os comandos seguintes terminaram em **0**:

1. Compose --profile test --profile delivery config --quiet e build verify web.
2. Compose up -d --wait db.
3. Compose --profile test run --rm verify bin/check.
4. Compose --profile delivery run --rm web bin/rails db:prepare.
5. Compose --profile delivery up -d --wait web.
6. curl --fail em http://127.0.0.1:3030/up e /.
7. Smoke de navegador da imagem final em desktop/mobile: título/lang/h1/aviso/props/versão, Link Inertia, JS/CSS 200, nenhum @vite/client/erro de console, /up 200 e rota inexistente 404 genérica sem stacktrace.
8. Inventário runtime: UID1000/aarch64-linux; sem Node/npm/gcc/make/browsers, ferramentas de teste, .git/.env/master.key, spec, fontes frontend, vault ou branding. Rails runner confirmou umanni_production e SELECT 1 = 1.
9. Build dos serviços dev/vite e db:prepare de development. O smoke de dev encontrou o problema de hostname descrito acima; portanto esse SHA recebeu foundation-checks=failure até a correção/revalidação, apesar do pipeline test/delivery verde.

bin/check passou dependências, preparo, Zeitwerk, RSpec paralelo, consolidação, TypeScript, ESLint, RuboCop, Brakeman, Vitest coverage, build Vite e Playwright. **9 exemplos RSpec, 2 testes Vitest, 12 cenários Playwright** (Chromium/Firefox/WebKit × desktop1440×1024/mobile390×844). Dois workers; servidor E2E dedicado, reuseExistingServer=false.

Imagem production limpa: `sha256:ca1306c59e5f65a095a5e082475baaba68a60606890185638712576b51b06c7a`. Digest de assets observado: `301778bccd2a2174fa5aef1dc320785e87388c3d`. Screenshots desktop/mobile inspecionados: página legível sem overflow. Nenhum teste amd64 alegado.

### Dois workers — evidência do hook before(:suite)

Run `a90b2be4-7c1b-4f01-bcf9-c01d061cd946`, SHA 90f07adc9256fb1baa1486138f71484ad8598d8b:

| Worker | TEST_ENV_NUMBER | Banco | Marcador esperado = observado | Resultado |
| --- | --- | --- | --- | --- |
| 1 | vazio | umanni_test | a90b2be4-7c1b-4f01-bcf9-c01d061cd946:1:d8be1e62ff895fe5fed7380b | success=true, 8 exemplos |
| 2 | 2 | umanni_test2 | a90b2be4-7c1b-4f01-bcf9-c01d061cd946:2:19d01ae15713c2a6e90660e1 | success=true, 1 exemplo |

Ambos executaram o hook independentemente da distribuição do arquivo de isolamento. Tabela TEMPORARY de mesmo nome, marcador único por conexão, transação/ON COMMIT DROP. Agregador exige exatamente dois resultados/observações, identidades/SHA/marcadores/lista de arquivos e término bem-sucedido antes de SimpleCov.collate.

### Cobertura separada

| Linguagem/arquivo | Linhas cobertas/total | Percentual |
| --- | --- | --- |
| Ruby — ApplicationController | 2/2 | 100% |
| Ruby — FoundationController | 3/3 | 100% |
| Ruby — ApplicationRecord | 2/2 | 100% |
| **Ruby total** | **7/7** | **100%** |
| TSX — Show.tsx | 1/1 | 100% |
| TS — foundation.ts (somente tipos) | 0/0 | não aplicável |
| **TypeScript total** | **1/1** | **100%** |

V8 mede o retorno JSX como uma expressão executável. Funções TS1/1 e statements1/1. Ramos Ruby/TS: denominador zero, **não aplicável**, mesmo quando ferramenta imprime 100%. O limite é90% por linguagem, nunca soma/média das linguagens. O tamanho mínimo desta página não comprova features futuras.

Ruby inclui todos app/**/*.rb e lib/**/*.rb; arquivos não exercitados entram. Tarefas .rake ficam fora conforme quality.md; config/bin/spec/migrations/vendor não integram esse escopo. TS inclui frontend ts/tsx; exclui somente declarações, testes, __tests__, frontend/test e entrypoints. Nenhuma página ou módulo funcional excluído. Bootstrap é exercitado pelo navegador/build. Protótipo e E2E não somados.

## Provas negativas dos gates

Cópia temporária independente, baseline bin/check **0**, mutações individuais e restauração final bin/check **0**. Primeira tentativa com symlink node_modules falhou em npm ls e foi descartada; a prova usou cópia real e baseline válido.

| Mutação | Comando | Saída | Motivo |
| --- | --- | --- | --- |
| Remover .resultset.json do worker2 | coverage:verify | 1 | resultado obrigatório ausente |
| Remover isolation.json do worker2 | coverage:verify | 1 | observação obrigatória ausente |
| failure_count=1 no resultado do worker | coverage:verify | 1 | worker sem sucesso |
| Arquivo Ruby não exercitado | bin/check | 2 | 9/49 linhas,18,36%, abaixo90% |
| Arquivo TS não importado | bin/check | 1 | 1/42 linhas,2,38%, abaixo90% |
| expect(1).to eq(2) em spec | bin/check | 1 | falha real de asserção |
| Número atribuído a string | bin/check | 2 | TS2322 |
| Variável não usada | bin/check | 1 | ESLint no-unused-vars |
| URL de teste com query database=umanni_production | bin/check | 1 | override recusado antes do preparo |

Essas mutações não foram adicionadas à aplicação nem ao protótipo. Resultados separados por run ID evitam aproveitar worker de outra execução. Ausência de resultado não pode ser compensada por cobertura do outro processo.

## GitHub, revisão e tarefas

Proteção relida antes/depois via API: foundation-checks adicionado a review-ledger, strict=true; comparação estrutural confirmou todos os outros campos preservados, incluindo enforce_admins, conversas resolvidas e bloqueios de force-push/exclusão. São **statuses manuais por SHA**, sem workflow/runner. Primeiro SHA publicado recebeu failure pelo smoke dev; novo HEAD precisa de nova validação e nova revisão.

T001–T012 concluídas. T013 tem clean-room/test/delivery comprovados e correção dev a revalidar no novo HEAD. T014 documentação consolidada. T015 PR/metadados/proteção preparados, sucesso final pendente. T016–T018 aguardam revalidação/revisora independente Luna high, que será iniciada automaticamente com contexto novo. Nenhuma revisão/aceite atribuído antes de ocorrer. T019 pertence à condutora; B001–B007 não executadas.

Arquivos: manifestos/locks/versões, boot Rails/config/bin/db/public, frontend/contrato, specs/harness/E2E, quality configs/lib/tasks, Dockerfile/Compose/ignore/env example e README/STATUS/EXEC/research/tasks. Listagem exata no diff do PR. Branding/AGENTS/constituição/checkbox histórico preservados.

## Limitações e passagem

Ainda falta aceite independente e confirmação dos dois statuses no HEAD final, code-reviewed e todas as threads resolvidas pela revisora. Não declarar SC003/T018 satisfeitos enquanto isso não ocorrer. Evidências deste arquivo distinguem os SHAs testados; resultados de novos HEADs devem ser registrados no PR e confrontados com os statuses, sem herança de sucesso.

Somente Linux arm64 foi testado. /up verifica boot, não banco. Não há autenticação/autorização/importação/serviços futuros. Artefatos de teste temporários e recursos Compose têm nomes exclusivos e só esses recursos serão limpos. Nenhum dado de outro projeto foi publicado. Merge, fechamento de PR, auto-merge, tag, release e fechamento de0.2.0 não foram executados e não estão autorizados. A condutora recebe T019 após o aceite técnico; Douglas decide integração.

## Ampliação da inspeção da imagem

O pipeline limpo do HEAD 70e98e4 passou (0), mas a inspeção adicional de todas as gems da imagem base encontrou debug, minitest, power_assert, test-unit e typeprof herdadas de Ruby. O teste anterior verificava somente as gems carregadas pelo bundle e era insuficiente para essa parte do contrato. A asserção de inventário completo falhou (1); essas ferramentas foram removidas exclusivamente no stage production. foundation-checks desse HEAD recebeu failure até revalidação. Nenhuma versão central alterada.

A primeira remoção das gems herdadas falhou no build de 6ceb4e7 (1): elas ficam em /usr/local/lib/ruby/gems/4.0.0, não em GEM_HOME. Corrigido --install-dir explicitamente. Também foram removidos os caches de arquivos .gem (112 entradas observadas antes). Build corrigido **0**, inventário de todas as gems herdadas **0**, caches **0 entradas**, UID1000, boot saudável e smoke desktop/mobile **0**. Imagem local `sha256:91115f3af4c22191563854872dd9ab1d5d30b995d04187d6f8ff4983d21e28c5`. Próximo HEAD será validado em cópia limpa antes de foundation-checks=success.

# Contrato de qualidade e evidências — 0.2.0

## Cobertura

Mínimo obrigatório: **90% de linhas executáveis Ruby e 90% de linhas executáveis TypeScript/TSX**, separadamente. Não somar linguagens nem cobertura do protótipo, dependências ou testes. Cobertura de branches é medida e publicada, sem limite adicional neste incremento; denominador zero é “não aplicável”, nunca 100% inventado. Funções/statements TS também são informados, sem substituir linhas.

Ruby: SimpleCov inicia antes de carregar Rails. Instrumentar todos os `app/**/*.rb` e `lib/**/*.rb`, inclusive arquivos não carregados, com única exclusão explícita `lib/tasks/**/*.rake` (orquestração de ferramentas; validada por execução/checagens negativas). Classes-base geradas permanecem incluídas se possuem linhas executáveis. Config, bin, migrations, spec, vendor, gems e código visual estático não integram esse denominador. Nenhuma exclusão individual adicional sem justificativa revisada. Publicar lista de arquivos e contagem de linhas.

TS: Vitest com V8 inclui `app/frontend/**/*.{ts,tsx}`, inclusive páginas não importadas pelos testes. Excluir somente `**/*.d.ts`, `**/*.test.{ts,tsx}`, `**/*.spec.{ts,tsx}`, `**/__tests__/**`, `app/frontend/test/**` e `app/frontend/entrypoints/**`. Entrypoint contém apenas bootstrap/resolução de páginas; é verificado pelo navegador e build. Se receber lógica própria, incluí-la na medição ou extraí-la para módulo instrumentado. Não excluir páginas, componentes ou tipos com lógica executável para aumentar percentual. `allowExternal` não é necessário.

## Agregação e paralelismo

RSpec: dois processos `parallel_tests`, databases conforme data-model.md. Cada processo grava resultado identificado por run ID e TEST_ENV_NUMBER em pasta própria; iniciar conjunto de resultados vazio. A tarefa `coverage:verify` confere presença e término bem-sucedido dos **dois** processos, mesma revisão, lista de arquivos consistente e exatamente duas observações de isolamento produzidas pelo hook before(:suite) de data-model.md (umanni_test/worker1 e umanni_test2/worker2); só então usa a API `SimpleCov.collate` da versão fixada. Aplicar o limite no resultado unido, nunca na média dos percentuais. Falta de arquivo, timeout, JSON inválido, conjunto vazio ou processo com erro deve falhar; resultado parcial não pode passar pelo simples fato de existir um relatório.

Vitest: uma invocação, pool forks, dois workers. O coordenador do Vitest agrega V8 antes de aplicar threshold global de linhas 90. Não dividir em shards externos neste incremento. Playwright: dois workers, contexts independentes, servidor test dedicado e banco `umanni_e2e`; os fluxos são somente leitura. Chromium, Firefox e WebKit em desktop 1440×1024 e mobile 390×844, seis projetos. Não reutilizar servidor arbitrário (`reuseExistingServer: false`). Navegador não aumenta o percentual Ruby/TS: serve como gate complementar.

## Verificações exigidas

`bin/check` é um script **a criar e testar**, não um comando existente na base. Ele executa, em sequência e com saída não zero propagada: instalação congelada previamente preparada, Zeitwerk, RSpec paralelo e consolidação, TypeScript sem emit, ESLint sem warnings, RuboCop, Brakeman (warnings causam falha), Vitest com cobertura, build Vite e Playwright. O modo de teste usa assets compilados sem HMR. Não rodar todo o pipeline para cada ciclo RED; cada comportamento começa com teste focalizado que falha pela razão correta, recebe implementação mínima, passa e é refatorado antes da validação final.

Checagens negativas documentadas em cópia temporária do checkout: retirar um resultado Ruby ou observação de isolamento de qualquer worker deve falhar; adicionar arquivo Ruby/TS não exercitado suficiente para ficar abaixo de 90% deve falhar; erro de tipo, lint ou teste deve resultar em falha no comando agregador. Reverter somente a mudança temporária feita para essa prova. Essas provas validam o gate e não viram funcionalidades artificiais de produção.

## Gate de PR

Hoje `review-ledger` é um status manual obrigatório por SHA, não workflow automatizado. Antes de declarar a implementação pronta, adicionar também `foundation-checks` à lista de statuses obrigatórios de main, **preservando** review-ledger, strict, conversas resolvidas, proteção de administradores e bloqueios existentes. A executora publica `foundation-checks=success` apenas para o SHA cujas verificações locais e imagem final passaram, com resumo/evidência no PR. Antes dos testes, publica pending; falha real publica failure. Confirmar pela API que o status vale somente para aquele SHA e que um HEAD novo não herda sucesso. Não disparar código de PR público automaticamente no Mac.

A revisora separada Luna high controla review-ledger, labels e threads conforme PROTOCOL. A condutora/executora não resolve threads nem publica spec-reviewed/code-reviewed. Automação de CI e ledger, runner Mac e seu isolamento são Backlog; os dois statuses aqui são manuais e auditáveis, não evidência de CI automático. Se a proteção não puder ser configurada/verificada, a entrega fica bloqueada para integração.

## Fontes

[SimpleCov](https://github.com/simplecov-ruby/simplecov), [parallel_tests](https://github.com/grosser/parallel_tests), [Vitest coverage](https://vitest.dev/guide/coverage), [Playwright parallelism](https://playwright.dev/docs/test-parallel). Consultadas em 2026-09-14; os limites e denominadores são política proposta para este projeto.

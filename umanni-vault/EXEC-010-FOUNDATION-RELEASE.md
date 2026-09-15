# Execução 010 — fechamento e release da Foundation 0.2.0

## Identificação e estado

- Pedido: Douglas, em 2026-09-15: atualizar as branches locais e fazer a release da Foundation antes da próxima tarefa, se todos os gates estivessem corretos; depois autorizou preparar a branch/PR de fechamento.
- Papel desta sessão: condutora/autora do planejamento e, após aceite independente, responsável pela preparação documental.
- Modelo realmente exposto à sessão: GPT-5; variante exata não exposta. Não atribuir Sol/Terra a esta autoria.
- Versão-alvo: `0.2.0`, milestone GitHub 3.
- Branch: `codex/010-foundation-release`.
- Base: `main`/`origin/main` em `665da839ab2efdd08c94664f842d9d17fcf3023c`, merge do PR #12.
- Spec: `umanni-vault/specs/010-foundation-release/`.
- PR de preparação: [#13](https://github.com/douglasfeitosag/Umanni/pull/13), base `main`, label `documentation`, Douglas responsável, milestone 0.2.0.
- Commit inicial de planejamento: `13b5784` (`docs: plan foundation 0.2.0 release`).
- Estado atual: a primeira revisão independente do planejamento encontrou três lacunas fail-safe no quickstart e reclassificou o achado histórico do PR #12 como falso positivo. A correção documental está preparada para novo HEAD e nova revisão independente; o aceite não será herdado. Não existem tag/release `v0.2.0`; milestone 0.2.0 permanece aberto e inclui este PR em andamento.

## Resultado do gate inicial

Em 2026-09-15, `git fetch --prune origin` mostrou que `origin/main` havia avançado pelo merge do PR #12. A `main` local recebeu somente `git merge --ff-only origin/main`, passando de `f9a817c` para `665da83`. Os artefatos `public/vite-test/` existentes passaram a ser ignorados pela `.gitignore` integrada; o checkout versionado ficou limpo. Nenhuma branch de feature foi apagada ou recebeu merge/rebase.

Estado relido imediatamente antes do planejamento:

| Evidência | Resultado observado |
| --- | --- |
| `main`, `origin/main` e base da branch | `665da839ab2efdd08c94664f842d9d17fcf3023c` |
| PR #12 | `MERGED` em 2026-09-15T07:01:35Z |
| HEAD revisado do PR #12 | `988282f8b9212e1f018cbbd327758d7d2aefce80` |
| Árvore do merge e árvore revisada | ambas `706043ac58cfaa15f2f0f2170e6c12042d4f9a86` |
| Checks do HEAD revisado | `foundation-checks=pass`; `review-ledger=pass` |
| Metadados PR #12 | `code-reviewed`; Douglas responsável; milestone 0.2.0 |
| Threads do PR #12 | 1 total, 1 resolvida, sem próxima página |
| Milestone 0.2.0 | aberto; 0 itens abertos; 2 fechados |
| Issue #9 | aberta no milestone `Backlog` |
| Tag local/remota `v0.2.0` | ausente nas consultas realizadas |
| GitHub Release `v0.2.0` | `release not found` (saída 1 esperada) |

O conteúdo integrado da Foundation é tecnicamente elegível. A publicação imediata foi interrompida corretamente porque a principal não continha notas versionadas 0.2.0, changelog da versão nem o fechamento T019. Douglas autorizou esta preparação, não o merge futuro do PR.

## Planejamento criado

- `spec.md`: 3 histórias, 14 requisitos e 6 critérios mensuráveis.
- `plan.md`: oito gates constitucionais, fases, aceite e condições de parada.
- `research.md`: seis decisões, incluindo tag no merge da preparação e recuperação de publicação parcial.
- `data-model.md`: estados `verified` → `prepared` → `reviewed` → `merged` → `tagged` → `released` → `closed`.
- `contracts/release-lifecycle.md`: gates de preparação, revisão, integração, publicação e recuperação.
- `quickstart.md`: verificações antes e depois do merge, sem força/auto-merge.
- `tasks.md`: 19 tarefas; T001–T002 concluídas, T003 pronta.
- `checklists/requirements.md`: 17/17 itens atendidos em uma iteração.

## Validação local do planejamento

| Comando/verificação | Resultado |
| --- | --- |
| `setup-plan.sh --json` com feature directory absoluto | 0; spec/plan/diretório resolvidos corretamente |
| `setup-tasks.sh --json` com feature directory absoluto | 0; research, data model, contract, quickstart e template resolvidos |
| `check-prerequisites.sh --json --require-spec --require-tasks --include-tasks` | 0; todos os documentos obrigatórios encontrados |
| `git diff --check` | 0 |
| Busca de placeholders/clarificações | nenhum marcador não resolvido após substituir o identificador futuro por descoberta do PR via branch |
| Formato das tarefas | 19/19 linhas no formato exigido |
| Análise cruzada | 14/14 requisitos e 6/6 critérios cobertos; 19 tarefas mapeadas; 0 ambiguidades, duplicações ou violações constitucionais |

## Matriz T001–T019

| Tarefa | Estado | Evidência/destino |
| --- | --- | --- |
| T001 | concluída | gate inicial e tabela de SHAs/estado acima |
| T002 | concluída | Spec Kit, checklist, análise cruzada e diff sem erros |
| T003 | concluída | commit `13b5784`, branch remota e PR #13 com metadados obrigatórios |
| T004 | concluída na primeira rodada | revisora independente publicou quatro threads no HEAD `cabe5ce`; três achados acionáveis e um posteriormente reclassificado como falso positivo |
| T005 | em correção/revisão | quickstart corrigido e validado localmente; novo HEAD exige reconsideração e resolução exclusiva pela revisora |
| T006–T007 | bloqueadas por revisão | evidência de prontidão pós-aceite |
| T008–T013 | bloqueadas por revisão | registros públicos e validação documental |
| T014–T016 | bloqueadas pela preparação | revisão final e handoff de merge |
| T017–T019 | bloqueadas pelo merge de Douglas | publicação e evidência final |

## Revisão do planejamento — rodada corretiva no HEAD cabe5ce

Estado inicial relido em 2026-09-15 antes da edição: checkout limpo em `codex/010-foundation-release`; HEAD local e remoto `cabe5ce909ad76917a13975b31e0a66327fbad1a`; base `665da839ab2efdd08c94664f842d9d17fcf3023c`; PR #13 aberto, não draft, label `documentation`, Douglas responsável, milestone 3/0.2.0, label `changes-requested` e `review-ledger=failure` no HEAD exato. A consulta GraphQL retornou quatro threads, todas não resolvidas e sem página seguinte. Nenhuma revisora da rodada anterior permanecia ativa no contexto de agentes desta sessão; sua última revisão no GitHub estava publicada como `COMMENTED` no HEAD `cabe5ce`.

- `FOUNDATION-REVIEW-001`: a revisora reclassificou o achado como falso positivo. A condutora confirmou que `988282f8b9212e1f018cbbd327758d7d2aefce80` tem como pai direto `b66492faafaab7815a1a16e401a0ce18cbb45b33`; o delta contém somente README e documentos; ambos os SHAs têm `foundation-checks=success` e `review-ledger=success` próprios; `988282f` foi o HEAD final do PR #12 e sua árvore `706043ac58cfaa15f2f0f2170e6c12042d4f9a86` é igual à árvore integrada pelo merge `665da839ab2efdd08c94664f842d9d17fcf3023c`. A spec preserva corretamente `988282f` como HEAD final revisado.
- `FND-REL-002`: o quickstart agora consulta `refs/tags/v0.2.0` e `refs/tags/v0.2.0^{}` remotamente, exige exatamente o objeto da tag e o peeled target, compara o objeto remoto ao objeto anotado local e exige que o peeled target seja o `merge_sha`. A prova ocorre depois do push, antes da criação da GitHub Release, e se repete na verificação final.
- `FND-REL-003`: as duas verificações inseguras por `gh release view` foram substituídas por resposta HTTP estruturada. Somente 404 autenticado, com corpo interpretável e código de saída coerente, comprova ausência; 200 comprova existência e para; 401, 403, 429, 5xx, ausência de resposta, falha de autenticação/rede/cliente e qualquer estado inesperado param com erro explícito. O token não é passado em argumento nem impresso pelo snippet, e o stderr da consulta de release permanece visível.
- `FND-REL-004`: imediatamente após comprovar `HEAD == origin/main == merge_sha`, o gate usa diretamente o PR #13, identifica seu HEAD final sem seleção por lista, comprova MERGED/ancestralidade/ledger/checks obrigatórios/label final/threads, mantém o milestone aberto, enumera e valida exatamente os itens #11–#13, verifica os três PRs, issue #9 no Backlog, notas no `merge_sha`, ausência local/remota da tag, ausência da release somente por 404 e reconsulta `main` antes de qualquer mutação. O contador agregado `open_issues` não é usado como prova.

Validações não mutantes executadas sobre o quickstart corretivo:

| Verificação | Resultado observado |
| --- | --- |
| Sintaxe de todos os blocos `sh` | `sh -n`: 0 |
| Release ausente | fixture HTTP 404 coerente: aceita |
| Release existente | fixture HTTP 200 coerente: bloqueia |
| Erro operacional | resposta HTTP ausente: bloqueia |
| Autenticação/autorização/rate limit/servidor | fixtures 401/403/429/500: bloqueiam |
| Tag remota ausente | `ls-remote` simulado com saída 2 e vazio: aceita |
| Tag anotada remota | objeto e peeled target correto simulados: aceita |
| Tag remota divergente | peeled target divergente: bloqueia |
| Consulta remota inconclusiva | saída operacional 128: bloqueia |
| Gate de revisão | ledger pendente ou thread não resolvida: bloqueia |
| Gate do milestone | item #13 aberto: bloqueia |
| Estado público atual | tag remota ausente por `ls-remote --exit-code`; release ausente por HTTP 404 |
| Spec Kit — plano | `setup-plan.sh --json`: 0; plano existente preservado e feature/diretório absolutos resolvidos |
| Spec Kit — tarefas | `setup-tasks.sh --json`: 0; research, data model, contrato, quickstart e template resolvidos |
| Spec Kit | `check-prerequisites.sh --json --require-spec --require-tasks --include-tasks`: 0 com `SPECIFY_FEATURE_DIRECTORY` absoluto e `SPECIFY_FEATURE=010-foundation-release` |
| Análise cruzada | 14/14 requisitos, 6/6 critérios e 19 tarefas cobertos; zero ambiguidade, duplicação ou violação constitucional |
| Whitespace e escopo | `git diff --check`: 0; somente quickstart e este EXEC |

A nova revisão deve acontecer no HEAD remoto produzido por esta correção. O resultado final, os replies e as resoluções ficam registrados no PR para não criar um commit autorreferencial depois do aceite.

## Limites e parada

Nenhum arquivo de aplicação, lock, branding ou runtime foi alterado. Nenhuma tag, GitHub Release, alteração de milestone ou merge foi executado. O próximo gate é publicar somente o planejamento no PR e obter revisão independente no HEAD exato. Um achado, novo commit, divergência da principal, tag/release inesperada ou item aberto sem destino interrompe o trabalho dependente.

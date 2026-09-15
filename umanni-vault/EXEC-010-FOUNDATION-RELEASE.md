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
- Estado atual: o planejamento foi aceito no HEAD `5c961ba65b70adb391066085d5dcc8ef7a6e7ac2`, com `review-ledger=success`, `spec-reviewed` e as cinco threads resolvidas exclusivamente pela revisora. A prontidão foi reconsultada, os registros públicos foram preparados e validados sem mudar aplicação/runtime/branding. O novo HEAD documental ainda precisa de revisão final independente e não herda esse aceite de planejamento. Não existem tag/release `v0.2.0`; o milestone 0.2.0 permanece aberto e inclui este PR em andamento.

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
| T004 | concluída | revisora independente publicou cinco threads ao longo das rodadas, com ledger por HEAD |
| T005 | concluída | quatro correções aceitas e um falso positivo formalmente reclassificado; 5/5 threads resolvidas exclusivamente pela revisora no planejamento aceito `5c961ba` |
| T006 | concluída | mapa reproduzível dos PRs #11–#13, checks, árvores, milestone, issue #9 e refs abaixo |
| T007 | concluída | helpers reais e fixtures fail-safe executados sem mutações externas; resultados abaixo |
| T008–T012 | concluídas na preparação | release notes, changelog, prompt, status, ledger da Foundation e este EXEC atualizados sem prever fatos pós-merge |
| T013 | concluída antes da publicação do HEAD | validação documental, Spec Kit, snippets e escopo descritos abaixo; deve ser repetida no commit final |
| T014–T016 | pendentes no registro versionado | publicar o novo HEAD, obter revisão final e entregar o handoff; os resultados exatos devem ficar no PR/handoff para não criar um commit autorreferencial |
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

## Revisão do HEAD 310520e e FND-REL-005

A revisora independente foi convocada em contexto novo com configuração `gpt-5.6-luna`/`high`; seu runtime declarou GPT-5, variante exata não exposta. Ela reconfirmou o HEAD remoto `310520e3ceedf47c922aae80d72a34cde54bda53`, aceitou formalmente `FOUNDATION-REVIEW-001` como falso positivo, aceitou as correções `FND-REL-002`/`003`/`004` e resolveu exclusivamente essas quatro threads. Em seguida publicou [FND-REL-005](https://github.com/douglasfeitosag/Umanni/pull/13#discussion_r4014508091), `review-ledger=failure` no HEAD exato e manteve `changes-requested`; `spec-reviewed` não foi aplicado.

`FND-REL-005` identificou que `targetCommitish` era coletado, mas não comparado ao `merge_sha` antes do fechamento do milestone. A correção acrescenta `--target "$merge_sha"` à criação da release e exige executavelmente `targetCommitish == merge_sha` na validação imediatamente anterior ao fechamento. A mesma asserção é repetida na verificação final. Fixtures JSON com alvo igual e divergente confirmaram, respectivamente, aceite e bloqueio; sintaxe shell, `setup-plan`, `setup-tasks`, `check-prerequisites`, análise cruzada, `git diff --check` e escopo documental foram revalidados antes da publicação do novo HEAD.

## Aceite do planejamento — 5c961ba

Em 2026-09-15, a revisora independente reconsiderou `FND-REL-005` no HEAD remoto exato `5c961ba65b70adb391066085d5dcc8ef7a6e7ac2`, aceitou a correção e resolveu exclusivamente a quinta thread. A releitura posterior confirmou PR #13 aberto/não draft, base `665da839ab2efdd08c94664f842d9d17fcf3023c`, `documentation`, Douglas, milestone 3/0.2.0, `spec-reviewed`, `review-ledger=success` criado em `2026-09-15T10:28:24Z`, cinco threads resolvidas e nenhuma página adicional. A configuração solicitada à revisora foi `gpt-5.6-luna`/`high`; ela declarou runtime GPT-5, variante exata não exposta.

## T006 — mapa de prontidão observado

As consultas foram repetidas em 2026-09-15, após `git fetch --prune origin`, com checkout limpo e HEAD local/remoto do PR #13 exatamente iguais a `5c961ba65b70adb391066085d5dcc8ef7a6e7ac2`.

| Item | Estado e identificadores observados |
| --- | --- |
| PR #11 — planejamento | `MERGED` em `2026-09-14T22:38:37Z`; HEAD `d1f3a3a349ed4a7610c4da7b170d4d2976c56691`; merge `f9a817cc6972c2438230f12d7dafedf0abc2d5b0`; `review-ledger=success` em `2026-09-14T22:16:56Z`; `spec-reviewed`; Douglas; milestone 3; 3/3 threads resolvidas, sem próxima página. |
| PR #12 — implementação | `MERGED` em `2026-09-15T07:01:35Z`; HEAD `988282f8b9212e1f018cbbd327758d7d2aefce80`; merge `665da839ab2efdd08c94664f842d9d17fcf3023c`; árvore comum `706043ac58cfaa15f2f0f2170e6c12042d4f9a86`; `foundation-checks=success` em `2026-09-15T06:51:30Z`; `review-ledger=success` em `2026-09-15T06:52:04Z`; `code-reviewed`; Douglas; milestone 3; 1/1 thread resolvida, sem próxima página. |
| PR #13 — preparação | `OPEN`, não draft; criado em `2026-09-15T07:33:53Z`; HEAD/base `5c961ba65b70adb391066085d5dcc8ef7a6e7ac2`/`665da839ab2efdd08c94664f842d9d17fcf3023c`; `review-ledger=success`; `documentation` + `spec-reviewed`; Douglas; milestone 3; 5/5 threads resolvidas, sem próxima página. |
| Milestone 3 | `0.2.0`, aberto; enumeração autoritativa: PR #11 fechado, PR #12 fechado e PR #13 aberto. O contador agregado informou zero abertos, mas não foi usado como prova porque diverge da enumeração do PR #13. O estado esperado nesta preparação é o PR #13 aberto até o merge de Douglas. |
| Issue #9 | `OPEN`, criada em `2026-09-14T20:09:07Z`, atualizada em `2026-09-14T21:17:30Z`, milestone 2 `Backlog`. |
| Refs | `origin/main=665da839ab2efdd08c94664f842d9d17fcf3023c`; `origin/codex/009-foundation-app=988282f8b9212e1f018cbbd327758d7d2aefce80`; `HEAD=origin/codex/010-foundation-release=5c961ba65b70adb391066085d5dcc8ef7a6e7ac2` antes da preparação. |
| Publicação | tag local ausente; consulta remota `git ls-remote --exit-code` retornou 2 com resultado vazio; consulta autenticada da release retornou HTTP 404, corpo `status=404` e saída 1. |

Nenhum item do milestone está sem decisão: #11/#12 estão integrados e #13 é a preparação deliberadamente aberta que deve ser mesclada somente por Douglas. A publicação continua bloqueada até esse merge e a reexecução integral do gate pós-merge.

## T007 — probes fail-safe sem mutação

Os três helpers do `quickstart.md` foram carregados e executados contra o estado real. `require_remote_tag_absent` aceitou somente saída 2/vazio; `require_release_absent` aceitou somente a resposta autenticada HTTP 404 coerente. `sh -n` aceitou a concatenação de todos os blocos shell.

Fixtures controladas observaram os seguintes resultados:

| Cenário | Resultado esperado/observado |
| --- | --- |
| Release HTTP 404 coerente | aceita / aceita (0) |
| Release HTTP 200 existente | bloqueia / bloqueou (1) |
| Resposta ausente | bloqueia / bloqueou (1) |
| HTTP 401, 403, 429 e 500 | bloqueiam / todos bloquearam (1) |
| Tag remota ausente, saída 2/vazio | aceita / aceita (0) |
| Consulta remota operacionalmente inconclusiva, saída 128 | bloqueia / bloqueou (1) |
| Tag anotada com objeto e peeled target esperados | aceita / aceita (0) |
| Peeled target divergente | bloqueia / bloqueou (1) |

Uma primeira tentativa do harness local usou `source` com process substitution, não carregou as funções neste ambiente e retornou 127; foi descartada sem inferir resultado do produto ou mutar arquivos. A repetição válida usou o mesmo texto dos helpers via `eval`, confirmou que as três funções existiam e produziu a matriz acima.

## T008–T013 — registros e validação documental

- `umanni-vault/releases/0.2.0.md`: notas finais em português com PRs #11–#13, escopo, evidência observada, limitações e issue #9 no Backlog.
- `CHANGELOG.md`: seção inglesa datada 0.2.0 adicionada sem reescrever a seção histórica 0.1.0.
- `umanni-vault/PROMPT-COND-007-FOUNDATION-CLOSURE.md`: handoff autocontido; não prevê SHA final, exige descobri-lo no PR e proíbe T017–T019 sem autorização explícita e merge de Douglas.
- `umanni-vault/STATUS.md` e `umanni-vault/specs/008-foundation-plan/tasks.md`: merge real do PR #12, preparação do PR #13 e T019 da execução anterior consolidados sem alegar publicação.
- Este EXEC separa evidência observada, resultados herdados por SHA e placeholders pós-merge.

Validações executadas antes dos commits:

| Verificação | Resultado observado |
| --- | --- |
| `setup-plan.sh --json` | 0; plano existente preservado e paths absolutos corretos |
| `setup-tasks.sh --json` | 0; diretório e documentos disponíveis corretos |
| `check-prerequisites.sh --json --require-spec --require-tasks --include-tasks` | 0 |
| Sintaxe de todos os blocos `sh` do quickstart | `sh -n`: 0 |
| Helpers reais e fixtures fail-safe | matriz acima; ausência pública real comprovada sem mutação |
| Estado Git inicial | branch/HEAD remoto exatos e checkout limpo antes da edição |
| Links Markdown locais dos nove documentos afetados | primeira chamada por `ruby` parou porque o rbenv local não tem Ruby 4.0.6; repetição explícita com `/usr/bin/ruby`, sob `set -eu`, resolveu todos os caminhos (0) |

O primeiro uso estrito do filtro de escopo revelou que a alternativa aceita para `specs/010-foundation-release/` terminava na barra e, portanto, rejeitava os próprios arquivos permitidos dentro do diretório. O regex foi corrigido de forma focalizada para `specs/010-foundation-release/.*`; ele continua recusando qualquer caminho fora da lista e será reexecutado no diff commitado. Nenhum arquivo adicional foi autorizado por essa correção.

Depois dos commits, o diff deve ser revalidado com `git diff --check origin/main...HEAD`, escopo estrito, presença/termos dos registros, refs/GitHub novamente consultados e HEAD local/remoto igual antes da revisão final.

## Placeholders pós-merge — não preenchidos por previsão

- HEAD final revisado do PR #13: obter de `headRefOid` depois do aceite final e confirmar novamente após o merge.
- Merge SHA do PR #13: indisponível enquanto o PR está aberto.
- Objeto/peeled target da tag `v0.2.0`: inexistentes antes da publicação autorizada.
- URL/data/alvo da GitHub Release: inexistentes antes da publicação autorizada.
- Fechamento do milestone 3: pendente até verificação de tag e release.

## Revisão final — rodada 1 no HEAD 7ceb043

A revisora independente foi iniciada automaticamente em contexto novo, com configuração solicitada `gpt-5.6-luna`/`high`; declarou runtime GPT-5, variante exata não exposta. Ela confirmou o HEAD remoto `7ceb043acf13f4429a29742bb9cb0c7aa0248e5f`, executou inspeções read-only do diff completo e do delta desde `5c961ba`, `git diff --check`, escopo, sintaxe dos seis blocos shell, links, evidência do PR #12, probes reais de tag/release, milestone, issue #9 e threads. Não publicou aceite.

Foram abertos três achados Sev2 em threads individuais: `FND-REL-006`, porque o gate não falhava executavelmente para checkout sujo; `FND-REL-007`, porque `foundation-checks=success` era exigido apenas indiretamente pela proteção corrente; e `FND-REL-008`, porque a verificação final imprimia milestone/issue #9 sem validar os estados nem a enumeração. A revisora publicou `review-ledger=failure`, removeu `spec-reviewed`/`review-pending`, aplicou `changes-requested` e manteve as três threads abertas.

Correção focalizada preparada para o novo HEAD:

- o gate exige checkout limpo antes de trocar de branch, depois do fast-forward, imediatamente antes da publicação e na verificação final;
- o status agregado precisa conter diretamente `review-ledger=success` e `foundation-checks=success` no `reviewed_head`, além de todos os contexts exigidos pela proteção;
- o retorno do PATCH de fechamento precisa comprovar milestone 3/0.2.0 fechado com `closed_at`; a verificação final repete essa prova, enumera exatamente #11–#13 fechados e confirma issue #9 aberta no Backlog.

O novo HEAD será validado, respondido nas três threads e devolvido à mesma revisora. Somente ela pode resolver os achados e publicar o ledger de sucesso.

Validação corretiva antes do commit: `git diff --check` e `sh -n` dos seis blocos passaram; fixtures aceitaram checkout limpo e bloquearam checkout sujo, aceitaram os dois statuses diretos e bloquearam a ausência de `foundation-checks`, aceitaram milestone fechado/itens #11–#13 fechados/issue #9 no Backlog e bloquearam milestone aberto, item #13 aberto e issue em destino divergente. `check-prerequisites.sh` com feature/diretório absolutos passou. Nenhuma fixture realizou mutação externa.

## Limites e parada

Nenhum arquivo de aplicação, lock, branding ou runtime foi alterado. Nenhuma tag, GitHub Release, alteração de milestone ou merge foi executado. O próximo gate é publicar os registros documentais no PR #13, invalidar o aceite do planejamento e obter revisão final independente no novo HEAD exato. Um achado, novo commit, divergência da principal, tag/release inesperada ou item aberto sem destino interrompe o trabalho dependente.

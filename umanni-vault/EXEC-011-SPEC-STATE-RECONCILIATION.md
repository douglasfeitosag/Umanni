# EXEC-011 — Reconciliação do estado dos specs

Data: 2026-09-15. Branch: `codex/011-spec-state-reconciliation`. Versão-alvo: `0.2.1`. Papel: condutora/autora. Runtime declarado: Codex baseado em GPT-5; variante exata não exposta.

## Baseline revalidado

- Checkout autoritativo limpo; `main` e `origin/main` em `b5fc0ed5d9014e9841a82e0c19f634684db71182`.
- Tag anotada `v0.1.0`: objeto `27bfdfe5c7f3d7c1a96b6797fb5779fce5f0ef79`, alvo `87e8c51894faa5794e9759b9caa5df4871d350e7`; release final publicada.
- Tag anotada `v0.2.0`: objeto `ea39aa30fae38ddf73cd42468aeb1acdcd01b880`, alvo `b5fc0ed5d9014e9841a82e0c19f634684db71182`; release final publicada.
- Milestone 0.1.0 fechado com PRs #1–#8/#10; milestone 0.2.0 fechado com PRs #11–#13; issue #9 aberta no Backlog.
- Milestone 4 `0.2.1` criado para este patch documental; nenhum item funcional do Backlog foi movido.
- PR #10: HEAD revisado `b3c559f2aa9e1b07b241deeac0ad5ddcaf674b53`, merge `87e8c51894faa5794e9759b9caa5df4871d350e7`, `review-ledger=success`, 10/10 threads resolvidas.
- PR #13: HEAD revisado `f56971eca6b5e280e2f20cf0ccaae2dce3254a37`, merge `b5fc0ed5d9014e9841a82e0c19f634684db71182`, `foundation-checks=success`, `review-ledger=success`, 8/8 threads resolvidas.

## Classificação inicial

- Specs 000 e 002: tarefas concluídas; narrativa histórica coerente, faltando somente um estado final inequívoco.
- Spec 001: estado/gate intermediários e T001–T031 desmarcadas apesar da conclusão comprovada no EXEC e PR #4.
- Spec 004: tarefas concluídas; status final não está explícito e referências a revisão pendente pertencem ao momento de autoria.
- Spec 005: T001–T022 concluídas, mas o campo de status ainda descreve planejamento pendente.
- Spec/EXEC 006: status, gate, T017–T019 e fechamento ainda pré-publicação; PR #10 contém o desfecho autoritativo.
- Spec 008: T001–T019 já reconciliadas; B001–B007 são Backlog intencional; checklist aberto é fotografia declarada do HEAD de planejamento. Apenas o campo de status está obsoleto.
- Spec/EXEC 010: status, T014–T019 e fechamento permanecem pré-publicação; PR #13 contém o desfecho autoritativo.
- README, AGENTS, STATUS e memória curta ainda contêm claims vigentes anteriores à publicação 0.2.0.

## Estado

Planejamento preparado. Nenhuma correção de estado foi executada antes da revisão independente. Merge, tag e release 0.2.1 não estão autorizados nesta etapa.

## Revisão independente do planejamento — rodada 1

A revisora confirmou o HEAD remoto `a636de7472bad3a74684d3fc534717f36e2bbb34` e abriu três achados bloqueantes no PR #14: `F-011-001` sobre a ordem impossível do quickstart em checkout limpo; `F-011-002` sobre allowlist aberta; e `F-011-003` sobre ambiguidade entre snapshots e ledgers. O `review-ledger` foi marcado como `failure` e o PR recebeu `changes-requested`.

As correções desta rodada separam validação pré-commit de validação final em HEAD limpo, enumeram todos os caminhos permitidos e definem `tasks.md` como ledger vivo, mantendo planos, quickstarts, prompts, checklists históricos e corpos de EXECs como snapshots com seções posteriores de fechamento. A revisora foi solicitada como `gpt-5.6-luna/high`; seu runtime não expôs identificador exato, portanto a variante não é declarada como confirmada.

## Aceite do planejamento

As correções foram publicadas em `2ee7c1737a670448455cd48cea090315cca46461`. A revisora confirmou F-011-001/002/003 nas threads originais e resolveu as três. Aceite `5209630887`; `review-ledger=success` no status `54194671912`; labels `documentation` e `spec-reviewed`; milestone 0.2.1 e Douglas responsável. Nenhuma reconciliação foi iniciada antes desse aceite.

## Reconciliação executada

- Entry points: README, AGENTS, STATUS e memória curta agora registram a Foundation 0.2.0 integrada e publicada.
- Specs 000 e 002 receberam estado final sem reescrita dos cenários históricos.
- Spec 001 recebeu estado final; o plano ganhou fechamento posterior; T001–T031 foram marcadas com base no EXEC e PR #4, preservando as descrições.
- Specs 004 e 005 receberam estado final com seus PRs/SHAs; requisitos históricos foram preservados.
- Spec 006 recebeu estado final; o plano e EXEC ganharam fechamento posterior; T017–T019 foram marcadas pela evidência final do PR #10.
- Spec 008 recebeu somente estado final; T001–T019 permaneceram concluídas, B001–B007 permaneceram abertas e o checklist histórico não mudou.
- Spec 010 recebeu estado final; T014–T019 foram marcadas e o EXEC ganhou fechamento posterior com a evidência do PR #13.

Nenhuma tarefa incompleta pertencente aos specs concluídos permaneceu aberta. Os sete itens B001–B007 e a issue #9 não foram executados porque são Backlog funcional explícito e exigem especificação própria.

## Validação pré-commit

- `git diff --check`: 0.
- Allowlist: os 25 caminhos do diff correspondem exatamente aos 19 arquivos existentes e seis arquivos novos enumerados no plano.
- Busca de claims vigentes obsoletos: zero resultado fora do padrão de busca documentado no próprio quickstart.
- Ledgers concluídos: zero tarefa `T*` aberta em 000/001/002/004/005/006/008/010; sete itens `B*` abertos no 008.
- Links Markdown locais: 25/25 arquivos alterados verificados, zero destino ausente.
- Releases 0.1.0/0.2.0: finais; milestones correspondentes fechados; milestone 0.2.1 aberto; issue #9 aberta no Backlog.
- Resultado agregado: `PRECOMMIT_RECONCILIATION_OK`.

T001–T012 concluídas. O próximo passo é publicar o HEAD candidato, executar o quickstart em checkout limpo e iniciar a revisão final independente. Nenhum merge, tag, release ou fechamento do milestone 0.2.1 foi executado.

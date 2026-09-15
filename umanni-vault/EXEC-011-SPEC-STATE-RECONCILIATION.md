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

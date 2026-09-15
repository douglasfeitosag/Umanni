# Tarefas 011 — Reconciliação do estado dos specs

Todas as tarefas pertencem à versão `0.2.1`. Backlog funcional existente permanece fora deste pacote.

## Planejamento e gate

- [x] T001 Revalidar checkout limpo, `main == origin/main == b5fc0ed5d9014e9841a82e0c19f634684db71182`, tags/releases 0.1.0 e 0.2.0, milestones e issue #9.
- [x] T002 Auditar todos os diretórios existentes em `umanni-vault/specs/` e classificar estado vigente, tarefas, Backlog e fotografias históricas.
- [x] T003 Criar spec, plano, tarefas, checklist, quickstart e EXEC inicial desta entrega.
- [ ] T004 Publicar o planejamento no PR documental com milestone 0.2.1, Douglas responsável e `review-pending`; obter revisão independente, resolver achados e exigir `review-ledger=success` + `spec-reviewed` no HEAD exato.

## Reconciliação

- [ ] T005 Atualizar `README.md`, `AGENTS.md`, `umanni-vault/STATUS.md` e `umanni-vault/MEMORIA-PROJETO.md` com o estado publicado de 0.2.0.
- [ ] T006 Confirmar os specs 000 e 002 como concluídos sem reescrever seus cenários históricos.
- [ ] T007 Reconciliar o estado do spec 001, acrescentar ao plano uma seção de desfecho e atualizar os checkboxes T001–T031 como ledger vivo, preservando suas descrições; citar PRs #2–#4 e `EXEC-001-BRANDING.md`.
- [ ] T008 Reconciliar o spec 004 com PRs #5/#8 e o spec 005 com PR #6, preservando requisitos históricos.
- [ ] T009 Reconciliar o estado do spec 006, acrescentar ao plano uma seção de desfecho, atualizar os checkboxes T017–T019 como ledger vivo e acrescentar `Fechamento posterior verificado` ao EXEC 006; preservar os corpos históricos e citar PR #10/release 0.1.0.
- [ ] T010 Atualizar somente o estado do spec 008; manter T001–T019 concluídas, B001–B007 abertas e checklist histórico intacto.
- [ ] T011 Reconciliar o estado do spec 010, atualizar os checkboxes T014–T019 como ledger vivo e acrescentar `Fechamento posterior verificado` ao EXEC 010; preservar os corpos históricos e citar PR #13/release 0.2.0.

## Validação e revisão final

- [ ] T012 Validar o working diff, links, claims, checkboxes, allowlist e `git diff --check`; registrar os resultados pré-commit no EXEC e commitá-los/publicá-los no HEAD candidato.
- [ ] T013 No checkout limpo do HEAD candidato, executar `quickstart.md`, confirmar `HEAD == origin/codex/011-spec-state-reconciliation`, publicar a evidência no PR sem criar commit autorreferencial, remover o aceite herdado e iniciar automaticamente revisão final Luna high em contexto separado.
- [ ] T014 Responder achados nas threads originais, corrigir somente o escopo e obter `review-ledger=success`, `code-reviewed` e zero threads abertas no HEAD final.
- [ ] T015 Entregar a Douglas o PR revisado e parar antes de merge, tag, release ou fechamento do milestone 0.2.1.

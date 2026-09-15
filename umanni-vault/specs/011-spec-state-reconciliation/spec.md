# Especificação 011 — Reconciliação do estado dos specs

**Branch**: `codex/011-spec-state-reconciliation`
**Criada em**: 2026-09-15
**Estado**: planejamento preparado para revisão independente
**Versão-alvo**: `0.2.1`

## Objetivo

Reconciliar os documentos de estado corrente com as entregas já comprovadas em Git e GitHub, sem reescrever a cronologia dos registros históricos e sem alterar aplicação, runtime ou branding. A entrega cobre todos os specs existentes, com atenção especial a 001, 006, 008 e 010, além dos entrypoints públicos e da memória curta.

## Cenários de aceite

### US1 — Consultar o estado real (P1)

**Dado** um spec já entregue, **quando** uma pessoa lê seu campo de estado e seu ledger de tarefas, **então** encontra o fechamento comprovado e a evidência externa correspondente, sem status intermediário apresentado como vigente.

### US2 — Preservar a cronologia (P1)

**Dado** um plano, checklist, quickstart, prompt ou EXEC escrito antes de uma integração, **quando** ele contém fatos verdadeiros daquele momento, **então** o texto permanece como fotografia histórica e qualquer desfecho posterior é acrescentado separadamente.

### US3 — Distinguir trabalho concluído de Backlog (P1)

**Dado** um checkbox aberto, **quando** ele é auditado, **então** ele só é marcado se houver evidência verificável de conclusão; itens B001–B007 da fundação e a issue #9 permanecem abertos no Backlog.

## Requisitos

- **FR-001**: revalidar `main`, `origin/main`, tags anotadas, releases, milestones, PRs, statuses e threads antes de editar claims dependentes.
- **FR-002**: atualizar os estados dos specs concluídos sem transformar condições originais de planejamento em alegações de execução retroativa.
- **FR-003**: marcar tarefas concluídas somente quando um EXEC, PR, commit, status ou comentário final comprovar o resultado.
- **FR-004**: preservar desmarcados os itens explicitamente destinados ao Backlog e os checklists que declaram ser fotografias do HEAD enviado.
- **FR-005**: reconciliar `README.md`, `AGENTS.md`, `STATUS.md` e `MEMORIA-PROJETO.md` com a Foundation 0.2.0 integrada e publicada.
- **FR-006**: acrescentar fechamentos pós-publicação aos EXECs 006 e 010, preservando as rodadas e limitações registradas antes da publicação.
- **FR-007**: não alterar tags ou releases 0.1.0/0.2.0, milestones fechados, aplicação, locks, runtime, testes, assets ou comportamento.
- **FR-008**: publicar a correção como patch documental 0.2.1 somente após revisão final do HEAD exato, merge autorizado por Douglas e nova autorização específica para tag/release.

## Critérios de sucesso

- **SC-001**: zero claim vigente afirma que 0.2.0 aguarda integração, tag, release ou fechamento de milestone.
- **SC-002**: T001–T031 do spec 001, T001–T019 do 006 e T001–T019 do 010 refletem a evidência GitHub; o ledger 008 continua com T001–T019 concluídas e B001–B007 no Backlog.
- **SC-003**: specs 000, 002, 004 e 005 também possuem estado final inequívoco ou são confirmados como já coerentes.
- **SC-004**: quickstarts, prompts e checklists históricos não são atualizados mecanicamente para simular que os fatos futuros já existiam no momento de sua autoria.
- **SC-005**: links locais, Markdown, whitespace e allowlist passam; o diff contém somente documentação autorizada.
- **SC-006**: PR final possui `review-ledger=success`, `code-reviewed`, zero threads não resolvidas, label `documentation`, milestone 0.2.1 e Douglas responsável.

## Fora do escopo

Implementar itens funcionais do Backlog, alterar código ou configuração da aplicação, refazer validações históricas, mover tags, reabrir releases encerradas, automatizar o ledger ou iniciar a próxima feature.

## Condição de parada

Parar diante de checkout sujo inesperado, divergência entre `main` local/remota, tag/release/milestone incompatível, evidência inconclusiva para um checkbox, arquivo funcional no diff, achado de revisão não resolvido ou falta de autorização para merge/publicação.

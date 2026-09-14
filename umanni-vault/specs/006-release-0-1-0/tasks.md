# Tarefas: Release 0.1.0 e gestão de versões

**Entrada**: artefatos em `umanni-vault/specs/006-release-0-1-0/`

**Versão-alvo**: `0.1.0`

**Testes**: entrega documental e de metadados; usar inspeções Git/GitHub reais e `git diff --check`, sem criar testes artificiais.

## Fase 1 — Preparação

- [x] T001 Confirmar checkout limpo em `codex/006-release-0-1-0`, base `0cd4c4142be8833401a5721c5e7cc637ea40b161`, ausência local/remota de `v0.1.0`, ausência de GitHub Release e inventário dos PRs 1–8; registrar em `umanni-vault/EXEC-006-RELEASE-0-1-0.md`.
- [x] T002 Validar os artefatos de planejamento em `umanni-vault/specs/006-release-0-1-0/` e publicar o PR de preparação com label `documentation` e Douglas como responsável, sem criar ou atribuir milestones antes da revisão; nesta entrega, registrar no EXEC o desvio já ocorrido no primeiro HEAD e não fazer nova mutação externa até T003.
- [x] T003 Obter revisão independente do planejamento no HEAD exato do PR, corrigir/confirmar todas as threads e exigir `review-ledger=success` + `spec-reviewed` antes de T004.

**Checkpoint**: nenhuma política, tag, release ou nova mutação de milestone ocorre antes do aceite do planejamento. Os milestones criados prematuramente no primeiro HEAD ficam congelados e serão tratados como desvio explícito, não como precedente do processo.

## Fase 2 — Fundação de versionamento

- [x] T004 [US2] Criar ou reconfirmar após o aceite os milestones GitHub `0.1.0` e `Backlog` pela API `/repos/douglasfeitosag/Umanni/milestones`, atribuir PRs 1–8 e o PR de preparação a `0.1.0`, a issue 9 a `Backlog`, e registrar IDs/estado/desvio inicial em `umanni-vault/EXEC-006-RELEASE-0-1-0.md`.
- [x] T005 [P] [US2] Registrar D-018 e SemVer/tag imutável/milestones em `umanni-vault/09-DOCUMENTACAO-E-PUBLICACAO.md`.
- [x] T006 [US2] Atualizar `umanni-vault/CONSTITUICAO.md` de 2.0.0 para 2.1.0 com novo princípio compatível de gestão de versões e histórico da emenda.
- [x] T007 [US2] Atualizar o ciclo, critérios de inclusão/adiamento e fechamento em `umanni-vault/PROTOCOL.md`.
- [x] T008 [US2] Acrescentar a regra operacional resumida para agentes em `AGENTS.md` e o aprendizado durável em `umanni-vault/MEMORIA-PROJETO.md`.

**Checkpoint**: qualquer tarefa nova pode ser classificada por versão ou backlog sem depender desta conversa.

## Fase 3 — História 1: marco público 0.1.0 (P1)

**Meta**: material público descreve com precisão o primeiro marco e suas limitações.

**Teste independente**: uma pessoa identifica incluídos/excluídos em menos de dois minutos e os links levam aos artefatos existentes.

- [x] T009 [P] [US1] Criar `CHANGELOG.md` em inglês com a entrada `0.1.0`, data, destaques e limitações.
- [x] T010 [P] [US1] Criar `umanni-vault/releases/0.1.0.md` em português com notas finais, PRs 1–8, validações e exclusões, sem alegar tag/release já publicada.
- [x] T011 [US1] Atualizar `README.md` em inglês com versão atual planejada, link do changelog/release notes e fronteira pré-aplicação.
- [x] T012 [US1] Corrigir `umanni-vault/STATUS.md` para registrar o merge real do PR6, a preparação de `0.1.0`, o backlog da issue 9 e a próxima fase da aplicação sem claims obsoletos.

## Fase 4 — História 3: auditoria e publicação (P2)

**Meta**: cada transição de revisão, merge, tag e release possui evidência reproduzível.

**Teste independente**: comparar PR, gate, principal, tag, release e milestone e obter o mesmo commit de versão.

- [x] T013 [US3] Criar e preencher `umanni-vault/EXEC-006-RELEASE-0-1-0.md` com escopo, versões/modelos reais, arquivos, milestones, comandos/resultados, hashes, desvio inicial e uma matriz T001–T019 de estado/destino/evidência.
- [x] T014 [US3] Criar `umanni-vault/PROMPT-COND-006-FOUNDATION.md` autossuficiente para a próxima sessão, usando a tag imutável `v0.1.0` como base resolvível, URL determinística da release, pendências, versão-alvo/backlog e próxima ação; após a publicação, verificar esses identificadores e registrar os hashes reais no comentário final do PR.
- [x] T015 [US3] Executar integralmente `umanni-vault/specs/006-release-0-1-0/quickstart.md` até o checkpoint pré-publicação, validar links/textos/escopo e executar `git diff --check` + staging exato + `git diff --cached --check`.
- [ ] T016 [US3] Commitar e publicar a preparação, invalidar o aceite de spec, iniciar automaticamente a revisão final Luna high no HEAD exato, corrigir achados e obter `review-ledger=success` + `code-reviewed` com todas as threads resolvidas.
- [ ] T017 [US3] Mapear no EXEC T001–T016 como concluídas com evidência e T017 como pronta; depois reconfirmar principal, HEAD, milestone, gate e mergeabilidade, fazer o merge normal especificamente autorizado e atualizar o checkout local sem auto-merge ou bypass.
- [ ] T018 [US3] Capturar o commit de merge do PR, mapear T017 concluída no comentário final e exigir igualdade exata entre checkout, `origin/main` e esse SHA imediatamente antes da tag; qualquer avanço da principal exige parada e nova revisão.
- [ ] T019 [US3] Com T001–T018 concluídas e documentadas, criar/push da tag anotada `v0.1.0` no SHA capturado, publicar a release final `Umanni 0.1.0` com `umanni-vault/releases/0.1.0.md`, verificar alvo/estado/prompt, fechar milestone `0.1.0` e registrar a matriz final/evidência no comentário do PR.

## Dependências e ordem

T001 → T002 → T003 → T004. Após T004, T005 e T009/T010 podem ser preparados em paralelo, mas T006 depende de T005 para manter a decisão canônica e T007/T008 dependem de T006. T011/T012 dependem das notas/política consolidadas. T013/T014 reúnem o handoff; T015 → T016 → T017 → T018 → T019 são estritamente sequenciais.

## Condição de parada

Parar sem criar/mover tag se o HEAD/base mudar sem revisão, se `v0.1.0` ou a release aparecerem previamente, se houver item de `0.1.0` aberto sem decisão, tarefa sem estado/destino/evidência, thread bloqueante, ledger inválido ou conflito. A entrega só termina quando T001–T019 estiverem mapeadas, o prompt de passagem estiver versionado e verificado, tag anotada e release final existirem, apontarem ao commit integrado, milestone `0.1.0` estiver fechado, issue 9 permanecer em `Backlog` e a evidência estiver publicada no PR.

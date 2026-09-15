# EXEC-006 — Release 0.1.0 e gestão de versões

Data: 2026-09-14. Branch: `codex/006-release-0-1-0`. PR: #10. Base: `0cd4c4142be8833401a5721c5e7cc637ea40b161`. Versão-alvo: `0.1.0`.

## Resultado

Preparação documental e operacional do primeiro marco público: política de versões, milestones verificáveis, changelog, notas de release, estado corrigido e prompt da próxima fase. A tag e a GitHub Release somente serão publicadas depois da revisão final e do merge autorizado; a evidência externa final permanecerá no PR #10.

## Modelos e papéis reais

- Condução e execução documental: sessão Codex principal; o identificador preciso do modelo de serving não foi exposto nesta sessão, portanto não é inferido.
- Revisão independente do planejamento: `gpt-5.6-luna`, esforço `high`, contexto separado `/root/release_010_planning_review`.
- Revisão final da entrega: `gpt-5.6-luna`, esforço `high`, contexto separado `/root/release_010_final_review`.

## Escopo e arquivos

- Novos: `CHANGELOG.md`, `umanni-vault/releases/0.1.0.md`, `umanni-vault/PROMPT-COND-006-FOUNDATION.md`, este EXEC e os artefatos em `umanni-vault/specs/006-release-0-1-0/`.
- Atualizados: `README.md`, `AGENTS.md`, `umanni-vault/CONSTITUICAO.md`, `umanni-vault/PROTOCOL.md`, `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md` e `umanni-vault/09-DOCUMENTACAO-E-PUBLICACAO.md`.
- Metadados: milestone #1 `0.1.0`, milestone #2 `Backlog`, PRs 1–8 e PR #10 em `0.1.0`, issue #9 em `Backlog`.

## Baseline e desvio registrado

No início, `v0.1.0` não existia local ou remotamente e a API da release respondeu HTTP 404. Os PRs 1–8 estavam mesclados na principal. Os milestones #1 e #2 foram criados e atribuídos ainda no primeiro HEAD de planejamento, antes do aceite independente: isso contrariou o checkpoint definido durante a revisão. A mutação foi congelada, documentada e só reconfirmada após o aceite no HEAD `a89f3367cfef46386ab5017a9880a4ea39195700`; não constitui precedente.

## Revisão do planejamento

A revisora abriu sete achados no review `5203044951`. Seis foram corrigidos em `a3b3db7c6d135c3d828ede46699898964166fafe`; o fail-safe restante foi corrigido em `a89f3367cfef46386ab5017a9880a4ea39195700`. Todas as threads foram resolvidas pela própria revisora. Aceite: review `5203136523`; `review-ledger=success`: status `54154020605`; label `spec-reviewed` aplicada no HEAD exato.

## Inventário integrado de 0.1.0

| PR | Merge commit | Entrega |
| --- | --- | --- |
| #1 | `a98885ff7e9d5ddddcdd495ca665943ff5fac1e6` | Vault documental |
| #2 | `b374118f8793a2c86e9142400bfe5dc76f66f420` | Planejamento de branding |
| #3 | `f6a91c23a5b61b1572d1f78c195a9cd5248ea422` | Assets visuais verificados |
| #4 | `cba851bcc5a672c7e447fbe17f3f03428397b955` | Identidade estática e UI kit |
| #5 | `fd3913fe0a7d9d723c3290dad4005855ad320552` | Hub visual |
| #6 | `0cd4c4142be8833401a5721c5e7cc637ea40b161` | Protótipo navegável |
| #7 | `1a90b8b2714149279e9e85abad7c0cfc9daeca96` | Governança de revisão final automática |
| #8 | `0c163a579a0cd74e443f7b96e78a58a7d8af1eba` | Integração do hub |

## Evidência de execução

- Milestone #1 `0.1.0`: aberto durante a preparação, oito itens fechados e PR #10 atribuído.
- Milestone #2 `Backlog`: aberto, issue #9 aberta e atribuída.
- Release probe: falha esperada com HTTP 404; o quickstart aborta em sucesso inesperado e em qualquer erro não-404.
- `git diff --check`, staging exato e `git diff --cached --check` concluíram sem erro; links locais centrais, symlink da constituição, ausência da tag/release e destinos dos milestones foram confirmados.
- A revisão final abriu R-008 a R-010 no HEAD `72aba4df754d96016f77305baedd242a3abdc468`. As correções de precisão histórica, gates fail-safe e dispatch automático foram publicadas em `b959fa484e01bad4fdbc2a7c80b53de13988585d`; a revisora resolveu as três threads e publicou o aceite `5203267785`, com `review-ledger=success` no status `54155044650`.
- Merge, tag e publicação serão completados na matriz e no comentário final do PR sem reescrever a tag.

## Matriz T001–T019

| Tarefa | Estado | Destino/evidência |
| --- | --- | --- |
| T001 | concluída | Base, PRs e ausência de tag/release confirmados acima. |
| T002 | concluída com desvio | PR #10 publicado; mutação prematura registrada e congelada. |
| T003 | concluída | Review `5203136523`, status `54154020605`, threads resolvidas. |
| T004 | concluída | Milestones #1/#2 e atribuições reconfirmados após o aceite. |
| T005 | concluída | D-018 neste PR. |
| T006 | concluída | Constituição 2.1.0 neste PR. |
| T007 | concluída | Protocolo de versões neste PR. |
| T008 | concluída | Regra em AGENTS e memória curta neste PR. |
| T009 | concluída | `CHANGELOG.md`. |
| T010 | concluída | `releases/0.1.0.md`. |
| T011 | concluída | README atualizado. |
| T012 | concluída | STATUS reconciliado com PR6 e release. |
| T013 | concluída | Este EXEC; hashes externos finais serão publicados no PR. |
| T014 | concluída | Prompt da fundação usa `v0.1.0` e URL determinística. |
| T015 | concluída | Quickstart pré-publicação, links e diffs aprovados. |
| T016 | concluída | Review final `5203267785`, status `54155044650`, threads R-008–R-010 resolvidas. |
| T017 | pronta | Reconfirmar o gate no novo HEAD deste registro e executar o merge autorizado. |
| T018 | pendente | Igualdade do SHA integrado antes da tag. |
| T019 | pendente | Tag, release, milestone fechado e comentário final. |

## Limitações

Esta entrega não cria aplicação, automação de release, workflow, runner, pacote ou artefato binário. O `review-ledger` continua um status gerido por agentes, não um workflow automatizado. A issue #9 permanece em `Backlog`. A release 0.1.0 é pré-aplicação.

## Fechamento posterior verificado

Esta seção acrescenta o desfecho sem reescrever o snapshot pré-publicação acima. O PR #10 foi revalidado no HEAD final `b3c559f2aa9e1b07b241deeac0ad5ddcaf674b53`, com `review-ledger=success`, label `code-reviewed` e 10/10 threads resolvidas. O merge normal produziu `87e8c51894faa5794e9759b9caa5df4871d350e7`; checkout e `origin/main` eram iguais a esse SHA antes da publicação. A tag anotada `v0.1.0` possui objeto `27bfdfe5c7f3d7c1a96b6797fb5779fce5f0ef79` e aponta para o merge. A GitHub Release `Umanni 0.1.0` é final em <https://github.com/douglasfeitosag/Umanni/releases/tag/v0.1.0>; o milestone 0.1.0 está fechado e a issue #9 continua aberta no Backlog. O comentário final do PR registra T001–T019 concluídas.

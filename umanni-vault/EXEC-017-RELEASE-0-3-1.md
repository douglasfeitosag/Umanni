# EXEC-017 — fechamento e release 0.3.1

## Identificação

- Objetivo: preparar e executar o fechamento formal da 0.3.1 após a integração do PR #23.
- Base integrada inicial: `5c11f3ef51e6d1bcb2dc64fbf521cca775d58114`, merge do PR #23.
- HEAD revisado da implementação: `6f92fba8ca3cdb6f1d196f87f558214b8175d430`.
- Versão-alvo: milestone GitHub `0.3.1`.
- Branch de preparação: `codex/017-release-0-3-1`.

## Estado inicial observado

- PR #23 está `MERGED`; `foundation-checks` e `review-ledger` tiveram sucesso no HEAD revisado, e não havia threads abertas antes do merge.
- Issues #18 e #19 estão fechadas. Durante a revisão do preparo, o próprio PR #24 é o único item aberto listado no milestone 0.3.1.
- A tag e a Release `v0.3.1` estavam ausentes antes desta preparação.
- A revisão independente do planejamento encontrou R-017-001; o contrato e o corpo do PR passaram a distinguir o item de controle ainda aberto da exigência de lista completamente vazia após seu merge. A thread foi resolvida e o HEAD `2701c3f5ab874506a22b1d680a012458788c03cf` recebeu `review-ledger=success` e `spec-reviewed`.

Nenhuma tag, Release ou fechamento de milestone foi feito nesta etapa de preparação. Os fatos pós-publicação serão registrados somente depois de verificados.

## Preparação de registros públicos

- Notas versionadas: `umanni-vault/releases/0.3.1.md`.
- Histórico público: entrada 0.3.1 em `CHANGELOG.md`.
- Estado: README, STATUS e memória curta distinguem a integração do PR #23 da publicação ainda pendente.
- Limite: esta preparação não cria tag, Release nem fecha o milestone; o PR #24 precisa de revisão independente final e integração antes da transição serial.

## Publicação e encerramento verificados

- PR #24 integrado em `59a05d8e616291f10195f44a130321a0aa5d42db`; sua árvore é equivalente ao HEAD revisado `1d2ae5ccf1fd8771a2d70bcceb47ebefb0f1edf6`.
- `v0.3.1` é uma tag anotada: objeto `7bcc6cb678804efc9f3272998725ccad2f6bd43b`, com alvo local e remoto `59a05d8e616291f10195f44a130321a0aa5d42db`.
- A Release `Umanni 0.3.1` é pública, não draft/nem prerelease e possui `targetCommitish` igual ao merge: https://github.com/douglasfeitosag/Umanni/releases/tag/v0.3.1.
- O milestone 0.3.1 foi fechado com zero itens abertos em `2026-09-16T11:36:29Z`. O comentário `[CONDUTORA]` no PR #24 preserva os identificadores e a ordem da transição.

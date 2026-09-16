# Spec 014 — Release 0.3.0

## Objetivo

Publicar a versão final `0.3.0` a partir do merge já integrado da identidade e acesso, mantendo tag, Release e milestone verificavelmente coerentes.

## Escopo

Inclui somente registros de release, validações Git/GitHub, tag anotada, GitHub Release e encerramento do milestone `0.3.0`. Não inclui mudança de aplicação, dependências, importação, CI, runner ou itens da `0.3.1`.

## Requisitos funcionais

- FR-001: a preparação deve partir de `main` integrado no merge do PR #17 e registrar o SHA capturado.
- FR-002: antes de publicar, deve comprovar PR #17 merged, checks `foundation-checks` e `review-ledger` verdes no HEAD revisado, zero threads abertas e milestone sem itens abertos.
- FR-003: `v0.3.0` e sua GitHub Release devem estar ausentes antes da publicação.
- FR-004: as notas versionadas e o changelog devem descrever somente identidade/acesso entregue e exclusões reais.
- FR-005: a tag deve ser anotada, criada no SHA integrado capturado, enviada sem força e ter alvo remoto idêntico.
- FR-006: a GitHub Release final deve usar as notas versionadas, não ser draft/prerelease e apontar para o mesmo SHA.
- FR-007: o milestone só pode ser fechado após a verificação da tag e Release, sem itens abertos.
- FR-008: o relatório de encerramento deve preservar comandos, resultados, limites e identificadores reais.

## Cenários BDD

1. **US1** — Dado `main` integrado e o milestone 0.3.0 sem itens abertos, quando a prontidão é consultada, então o SHA, PR, checks, threads, notas e ausência de publicação concordam.
2. **US2** — Dado a prontidão confirmada, quando os registros públicos são preparados, então changelog, notas, STATUS e EXEC concordam sem alegar tag, Release ou milestone fechado antes do fato.
3. **US3** — Dado o preparo revisado e integrado, quando a publicação ocorre, então tag anotada, Release final, `main` local/remoto e milestone fechado resolvem para o SHA capturado.

## Critérios de aceite

- Planejamento e preparo documental recebem revisão independente no HEAD exato.
- Tag, Release e milestone são publicados/fechados uma única vez e conferidos por API e Git.
- Não há force push, movimento de tag ou alteração de aplicação.

## Condição de parada

Parar antes da transição dependente se `main` avançar, se tag/Release já existir, se checks/threads/milestone divergirem, se uma tag não for anotada ou apontar para outro SHA, ou se qualquer arquivo fora da allowlist documental entrar no diff.

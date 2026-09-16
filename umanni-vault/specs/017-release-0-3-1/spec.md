# Spec 017 — Release 0.3.1

## Objetivo

Publicar a versão final `0.3.1` a partir do hardening de entrega local já integrado pelo PR #23, mantendo tag, Release e milestone verificavelmente coerentes.

## Escopo

Inclui somente registros de release, validações Git/GitHub, tag anotada, GitHub Release, encerramento do milestone `0.3.1` e reconciliação pós-publicação. Não inclui mudança de aplicação, dependências, importação, CI, runner ou itens da `0.4.0`/`Backlog`.

## Requisitos funcionais

- FR-001: a preparação deve partir de `main` integrado no merge do PR #23 e registrar o SHA capturado.
- FR-002: antes de publicar, deve comprovar PR #23 merged, checks `foundation-checks` e `review-ledger` verdes no HEAD revisado, zero threads abertas e milestone sem itens abertos.
- FR-003: `v0.3.1` e sua GitHub Release devem estar ausentes antes da publicação.
- FR-004: as notas versionadas e o changelog devem descrever somente o hardening de startup, readiness, fallback 5xx e sua validação real.
- FR-005: a tag deve ser anotada, criada no SHA integrado do preparo documental, enviada sem força e ter alvo remoto idêntico.
- FR-006: a GitHub Release final deve usar as notas versionadas, não ser draft/prerelease e apontar para o mesmo SHA.
- FR-007: o milestone só pode ser fechado após a verificação da tag e Release, sem itens abertos.
- FR-008: um PR documental posterior deve registrar os fatos pós-publicação sem alterar o alvo imutável da versão.

## Cenários BDD

1. **US1** — Dado o PR #23 integrado e o milestone 0.3.1 sem itens abertos, quando a prontidão é consultada, então o SHA, checks, threads e ausência de tag/Release concordam.
2. **US2** — Dado a prontidão confirmada, quando os registros públicos são preparados, então changelog, notas, STATUS, memória e EXEC concordam sem alegar publicação antes do fato.
3. **US3** — Dado o preparo revisado e integrado, quando a publicação ocorre, então tag anotada, Release final e milestone fechado resolvem para o SHA capturado, nessa ordem.
4. **US4** — Dado a publicação verificada, quando a reconciliação é versionada, então ela registra os identificadores reais sem mover tag, editar Release ou reabrir escopo.

## Critérios de aceite

- Planejamento, preparo documental e reconciliação recebem revisão independente no HEAD exato.
- Tag, Release e milestone são publicados/fechados uma única vez e conferidos por API e Git.
- Não há force push, movimento de tag ou alteração de aplicação.

## Condição de parada

Parar antes da transição dependente se `main` avançar, se tag/Release já existir, se checks/threads/milestone divergirem, se uma tag não for anotada ou apontar para outro SHA, ou se qualquer arquivo fora da allowlist documental entrar no diff.

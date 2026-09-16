# Spec 020 — Release 0.4.0

## Objetivo

Publicar a versão final 0.4.0 a partir do merge do PR #27, mantendo tag, GitHub Release e milestone coerentes e auditáveis.

## Escopo

Inclui planejamento, registros públicos de release, validações Git/GitHub, tag anotada, Release, fechamento do milestone e reconciliação posterior. Não inclui alteração da aplicação, dependências, CI, runner, e-mail, recuperação de senha ou Backlog.

## Requisitos

- FR-001: a preparação parte do merge integrado do PR #27 e registra seus SHAs de implementação, revisão e merge.
- FR-002: antes da tag, comprova checks verdes, zero threads, ausência de tag/Release e nenhum item aberto no milestone após o merge do preparo.
- FR-003: notas, changelog, README, STATUS, memória e EXEC descrevem apenas importação CSV/XLSX, worker, progresso seguro e senha inicial.
- FR-004: tag anotada e Release pública apontam para o SHA integrado do preparo documental, sem força ou movimento.
- FR-005: milestone fecha somente após validar tag e Release; reconciliação posterior não altera o alvo imutável.

## BDD e aceite

1. Dado o PR #27 integrado e o preparo revisado, quando a prontidão é consultada, então SHA, checks, threads, itens do milestone e ausência de publicação concordam.
2. Dado o preparo integrado e milestone vazio, quando a publicação ocorre, então tag anotada, Release final e fechamento do milestone apontam para o mesmo SHA, nessa ordem.
3. Dado os fatos publicados, quando a reconciliação é versionada, então registra identificadores reais sem mover tag ou editar Release.

Aceite exige revisão independente no HEAD exato, tag anotada, Release não-draft/não-prerelease, milestone sem itens abertos e nenhuma alteração de aplicação.

## Condição de parada

Parar se main avançar, tag/Release já existir, checks/threads/milestone divergirem, qualquer item permanecer aberto, ou o diff exceder a allowlist documental.

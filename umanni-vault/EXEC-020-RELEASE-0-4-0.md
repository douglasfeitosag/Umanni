# EXEC-020 — fechamento e release 0.4.0

## Estado inicial

- Base integrada: `c093b8d4c52c695e9e1e951538f044f070b2d0ef`, merge do PR #27.
- Implementação revisada: `4be48638f8d899d95456b08dffb7561b6ebd59b8`; fechamento documental do PR #27: `e51cff8`.
- Planejamento 020 aceito no PR #28, HEAD `aac34f2`, com `review-ledger=success`, `spec-reviewed` e thread resolvida.
- Antes deste preparo, `v0.4.0` e a Release estavam ausentes; o milestone 0.4.0 não possuía itens abertos.

## Preparo

Este PR atualiza somente notas, changelog, estado, memória e registros de release. Não cria tag, Release ou fecha milestone. A transição serial posterior exige merge deste preparo, nova conferência de `main`, lista vazia do milestone, tag anotada, Release pública e só então fechamento.

## Publicação verificada

- PR #28 integrado em `eb73edcbab8777ec9bbf13d80d7bfc4c5cd476eb`.
- `v0.4.0` é tag anotada, objeto `93f8038f07403bfc5089238124f7ee5cbd9db60a`, com alvo remoto `eb73edcbab8777ec9bbf13d80d7bfc4c5cd476eb`.
- A Release pública [Umanni 0.4.0](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.4.0) não é draft/nem prerelease e aponta para o mesmo commit.
- O milestone 0.4.0 foi fechado em 2026-09-16 com zero itens abertos, depois da tag e da Release.

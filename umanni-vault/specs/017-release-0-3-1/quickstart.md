# Quickstart 017

Pré-publicação: consultar PR #23, `main`, milestone 0.3.1, `foundation-checks`, `review-ledger`, threads, `refs/tags/v0.3.1` e `GET /releases/tags/v0.3.1`.

Pós-merge: recapturar `origin/main`; criar `git tag -a v0.3.1 <merge-sha> -m 'Release 0.3.1'`; validar `git cat-file -t v0.3.1` = `tag` e `v0.3.1^{}` = `<merge-sha>`; push somente `refs/tags/v0.3.1`; criar a Release com as notas versionadas e `--target <merge-sha>`; consultar release/milestone e comparar todos os alvos.

Pós-publicação: abrir branch documental nova a partir de `origin/main`, atualizar apenas os registros previstos, revisar o HEAD exato e integrar sem tocar na tag, Release ou milestone.

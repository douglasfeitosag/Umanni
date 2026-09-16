# Quickstart 014

Pré-publicação: consultar PR #17, `main`, milestone 0.3.0, `foundation-checks`, `review-ledger`, threads, `refs/tags/v0.3.0` e `GET /releases/tags/v0.3.0`.

Pós-merge: recapturar `origin/main`; criar `git tag -a v0.3.0 <merge-sha> -m 'Release 0.3.0'`; validar `git cat-file -t v0.3.0` = `tag` e `v0.3.0^{}` = `<merge-sha>`; push somente `refs/tags/v0.3.0`; criar a Release com as notas versionadas e `--target <merge-sha>`; consultar release/milestone e comparar todos os alvos.

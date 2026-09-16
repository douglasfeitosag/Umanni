# Quickstart 017

Pré-publicação: consultar PR #23, `main`, `foundation-checks`, `review-ledger`, threads, `refs/tags/v0.3.1` e `GET /releases/tags/v0.3.1`. Listar separadamente todos os itens abertos do milestone 0.3.1: durante a revisão somente o PR de preparação pode aparecer; depois de seu merge, a lista deve estar vazia antes da tag.

Pós-merge: recapturar `origin/main`; criar `git tag -a v0.3.1 <merge-sha> -m 'Release 0.3.1'`; validar `git cat-file -t v0.3.1` = `tag` e `v0.3.1^{}` = `<merge-sha>`; push somente `refs/tags/v0.3.1`; criar a Release com as notas versionadas e `--target <merge-sha>`; consultar release/milestone e comparar todos os alvos.

Pós-publicação: abrir branch documental nova a partir de `origin/main`, atualizar apenas os registros previstos, revisar o HEAD exato e integrar sem tocar na tag, Release ou milestone.

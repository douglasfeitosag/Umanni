# Validação da release 0.1.0

Executar da raiz do repositório. Antes da integração, comandos de inspeção devem confirmar que `v0.1.0` e a release ainda não existem.

## Preparação documental

```sh
git status --short --branch
git diff --check
git diff --cached --check
rg -n "PR 6.*próxima|PR6.*pendente|review.*pending|release.*pending" README.md umanni-vault/STATUS.md umanni-vault/EXEC-006-RELEASE-0-1-0.md
gh pr list --state merged --limit 20 --json number,title,mergeCommit
gh api repos/douglasfeitosag/Umanni/milestones?state=all
git tag --list v0.1.0
gh release view v0.1.0
```

Esperado antes da publicação: diff sem erro; nenhuma afirmação obsoleta sobre o PR6; milestone `0.1.0` contém PRs 1–8 e o PR de preparação; issue 9 pertence a `Backlog`; tag/release inexistentes.

## Gate do PR

Confirmar no HEAD exato:

- duas revisões independentes, incluindo revisão final Luna high automática;
- todas as threads resolvidas pelos revisores;
- `review-ledger=success`;
- label final coerente e Douglas como responsável;
- principal/base inalterada e PR mesclável.

## Publicação pós-merge

Depois do merge normal autorizado, confirmar a principal e criar a tag anotada no commit de merge:

```sh
git switch main
git pull --ff-only origin main
git tag -a v0.1.0 "$(git rev-parse HEAD)" -m "Release 0.1.0"
git show --no-patch --format=fuller v0.1.0
git push origin refs/tags/v0.1.0
gh release create v0.1.0 --verify-tag --title "Umanni 0.1.0" --notes-file umanni-vault/releases/0.1.0.md
```

Não executar com `--force`, auto-merge ou bypass administrativo.

## Verificação final

```sh
git fetch origin main refs/tags/v0.1.0:refs/tags/v0.1.0
git rev-list -n 1 v0.1.0
git rev-parse origin/main
git cat-file -t v0.1.0
gh release view v0.1.0 --json name,tagName,isDraft,isPrerelease,targetCommitish,url
gh api repos/douglasfeitosag/Umanni/milestones?state=all
git status --short --branch
```

Esperado: objeto `tag`; tag e principal resolvem para o mesmo commit de merge; release `Umanni 0.1.0` final; milestone `0.1.0` fechado; checkout limpo. Registrar hashes, URL e resultado no comentário final do PR.

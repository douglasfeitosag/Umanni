# Validação 011 — reconciliação documental

Executar da raiz do repositório. Os comandos são somente de inspeção; nenhuma tag, release ou milestone é alterado.

```sh
set -eu
test -z "$(git status --porcelain)"
git fetch origin codex/011-spec-state-reconciliation
test "$(git rev-parse HEAD)" = "$(git rev-parse origin/codex/011-spec-state-reconciliation)"
git diff --check origin/main...HEAD
test "$(git rev-list -n 1 v0.1.0)" = "87e8c51894faa5794e9759b9caa5df4871d350e7"
test "$(git rev-list -n 1 v0.2.0)" = "b5fc0ed5d9014e9841a82e0c19f634684db71182"
test "$(git cat-file -t v0.1.0)" = tag
test "$(git cat-file -t v0.2.0)" = tag
```

Conferir pela API que as releases são finais, milestones 0.1.0/0.2.0 estão fechados, Backlog está aberto, issue #9 permanece nele e os PRs citados preservam seus HEADs, merges, statuses e threads.

Depois das correções, a busca abaixo não pode encontrar claims vigentes; ocorrências dentro de snapshots explicitamente rotulados são permitidas e precisam ser revisadas manualmente:

```sh
rg -n -i --glob '!**/011-spec-state-reconciliation/quickstart.md' 'awaiting Douglas.s integration|Ainda não há aplicação|0\.2\.0 ainda é planejamento|release preparation in progress|Rascunho para revisão|handoff pós-merge em revisão' README.md AGENTS.md umanni-vault/STATUS.md umanni-vault/MEMORIA-PROJETO.md umanni-vault/specs
```

Comparar `git diff --name-only origin/main...HEAD` com a allowlist exata enumerada em `plan.md`. Validar todos os links Markdown locais dos arquivos alterados. Qualquer caminho não listado — especialmente aplicação, lock, runtime, teste ou branding — bloqueia a entrega. A execução em checkout limpo ocorre depois do commit/push do HEAD candidato; resultados finais são publicados no PR para não criar um commit autorreferencial.

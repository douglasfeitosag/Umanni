# Plano 014 — Release 0.3.0

**Branch**: `codex/014-release-0-3-0`  
**Base**: merge integrado do PR #17 em `main`  
**Versão-alvo**: `0.3.0`

## Estratégia

1. Capturar e validar o merge integrado, os checks por SHA, as threads, o milestone e a ausência da publicação.
2. Revisar o planejamento em PR documental independente.
3. Preparar notas, changelog, STATUS, memória, EXEC e prompt de encerramento; validar e revisar o HEAD documental.
4. Integrar o preparo revisado, recapturar o merge e publicar a tag anotada, a Release final e o fechamento do milestone em ordem serial.

## Allowlist

`CHANGELOG.md`, `README.md`, `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md`, `umanni-vault/EXEC-014-RELEASE-0-3-0.md`, `umanni-vault/PROMPT-COND-008-RELEASE-0-3-0.md`, `umanni-vault/releases/0.3.0.md` e `umanni-vault/specs/014-release-0-3-0/`.

## Validação

Usar `git diff --check`, links Markdown, consultas `gh`/API, `git ls-remote`, inspeção de objeto de tag, comparação exata de SHA e árvore. O gate de aplicação é herdado somente do SHA `6ed242d` já validado; a preparação documental não o substitui.

## Gates constitucionais

Spec/plan/tasks precedem alterações; BDD cobre as transições; o escopo é documental; evidência usa identificadores reais; publicação depende de merge autorizado; documentos públicos não trazem segredos; revisão Luna high é independente; a tag só existe após igualdade comprovada no merge integrado.

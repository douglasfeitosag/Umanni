# Plano 020 — Release 0.4.0

**Branch**: `codex/020-release-0-4-0`

**Base**: `c093b8d4c52c695e9e1e951538f044f070b2d0ef` (merge do PR #27)
**Versão-alvo**: `0.4.0`

## Estratégia

1. Validar merge #27, `foundation-checks` e `review-ledger`, threads, milestone e ausência de `v0.4.0`/Release.
2. Revisar independentemente spec, plano e tarefas.
3. Preparar registros públicos e revisar o HEAD documental.
4. Integrar o preparo, recapturar `main`, exigir milestone vazio e publicar tag anotada, Release e fechamento em ordem serial.
5. Registrar reconciliação posterior sem mudar a publicação.

## Allowlist

`CHANGELOG.md`, `README.md`, `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md`, `umanni-vault/EXEC-020-RELEASE-0-4-0.md`, `umanni-vault/PROMPT-COND-010-RELEASE-0-4-0.md`, `umanni-vault/releases/0.4.0.md` e `umanni-vault/specs/020-release-0-4-0/`.

## Validação

Usar `git diff --check`, links Markdown, consultas GitHub, `git ls-remote`, inspeção do objeto de tag e igualdade exata de SHA. Os gates técnicos são herdados do HEAD de implementação `4be4863`; o preparo documental não os substitui.

## Recuperação

Tag local não enviada: validar objeto/alvo e enviar só a ref correta. Tag enviada sem Release: reconferir alvo e criar somente a Release. Release sem milestone fechado: validar tudo e fechar somente o milestone. Em divergência ou avanço de main: parar e escalar a Douglas.

# Plano 017 — Release 0.3.1

**Branch**: `codex/017-release-0-3-1`
**Base**: `5c11f3ef51e6d1bcb2dc64fbf521cca775d58114`, merge integrado do PR #23
**Versão-alvo**: `0.3.1`

## Estratégia

1. Capturar e validar o merge integrado, os checks por SHA, as threads, o milestone e a ausência da publicação.
2. Revisar o planejamento no HEAD documental exato.
3. Preparar notas, changelog, README, STATUS, memória, EXEC e prompt de encerramento; validar e revisar novamente o HEAD documental.
4. Integrar o preparo revisado, recapturar o merge e publicar a tag anotada, a Release final e o fechamento do milestone em ordem serial.
5. Registrar os fatos pós-publicação em um segundo PR documental revisado, sem alterar a publicação imutável.

## Allowlist

Preparação: `CHANGELOG.md`, `README.md`, `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md`, `umanni-vault/EXEC-017-RELEASE-0-3-1.md`, `umanni-vault/PROMPT-COND-009-RELEASE-0-3-1.md`, `umanni-vault/releases/0.3.1.md` e `umanni-vault/specs/017-release-0-3-1/`.

Reconciliação: somente os registros anteriores cujo estado pós-publicação precise ser atualizado; nenhuma alteração de aplicação, tag, Release ou milestone é feita pelo commit.

## Validação

Usar `git diff --check`, links Markdown, consultas `gh`/API, `git ls-remote`, inspeção de objeto de tag, comparação exata de SHA e árvore. Os gates de aplicação são herdados somente do HEAD `6f92fba8ca3cdb6f1d196f87f558214b8175d430` já validado; a preparação documental não os substitui.

## Recuperação de publicação parcial

| Estado observado | Ação permitida | Ação proibida |
| --- | --- | --- |
| Tag criada localmente, ainda não enviada | Confirmar objeto anotado e alvo; enviar somente a ref da tag correta. | Recriar, mover ou forçar a tag. |
| Tag enviada, Release ausente | Reconsultar o alvo remoto e criar somente a Release no mesmo SHA. | Apagar ou substituir a tag. |
| Release publicada, milestone aberto | Revalidar tag, `targetCommitish`, `main` e itens; fechar somente o milestone. | Editar a Release para mascarar divergência. |
| Tag/Release/alvo divergente ou `main` avançou | Parar e escalar a Douglas com os identificadores observados. | Qualquer publicação corretiva, força ou fechamento. |

## Gates constitucionais

Spec/plan/tasks precedem alterações; BDD cobre as transições; o escopo é documental; evidência usa identificadores reais; publicação depende de merge autorizado; documentos públicos não trazem segredos; revisão Luna high é independente; a tag só existe após igualdade comprovada no merge integrado.

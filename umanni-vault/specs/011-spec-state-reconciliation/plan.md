# Plano 011 — Reconciliação do estado dos specs

**Spec**: [spec.md](spec.md) | **Branch**: `codex/011-spec-state-reconciliation` | **Versão-alvo**: `0.2.1`

## Resumo

Executar um patch estritamente documental que separa três camadas: estado vigente, ledger de conclusão e fotografia histórica. A fonte para fatos pós-merge é Git/GitHub; documentos não substituem evidência externa. Nenhum item funcional aberto será implementado neste pacote.

## Gates constitucionais

- Spec, plano, tarefas, aceite e parada precedem as correções.
- O PR de planejamento recebe revisão independente antes da execução documental.
- O diff final recebe nova revisão Luna high em contexto separado e no HEAD exato.
- Douglas mantém controle exclusivo de merge; tag/release 0.2.1 exigem autorização posterior específica.
- Todo o trabalho pertence ao milestone 0.2.1; Backlog existente não é absorvido.

## Matriz de tratamento

| Grupo | Tratamento |
| --- | --- |
| Estado vigente | substituir claim obsoleto por resultado comprovado e referências exatas |
| Tarefas concluídas | marcar somente com evidência externa ou EXEC reproduzível |
| Backlog | manter aberto e com destino explícito |
| Fotografia histórica | preservar o corpo original; acrescentar seção de fechamento quando necessário |
| `tasks.md` | ledger vivo: atualizar checkbox com evidência posterior, sem reescrever a descrição |
| Evidência inconclusiva | não marcar; registrar bloqueio e parar a parte dependente |

## Fases

1. Revalidar árvore, refs e GitHub; inventariar todos os specs.
2. Publicar estes artefatos de planejamento e obter revisão independente.
3. Reconciliar entrypoints e memória curta.
4. Reconciliar specs 000, 001, 002, 004, 005, 006, 008 e 010, alterando apenas os arquivos classificados.
5. Acrescentar evidência pós-publicação aos EXECs 006 e 010 sem apagar seus snapshots.
6. Executar quickstart, revisar o diff e publicar o HEAD final.
7. Iniciar automaticamente revisão final Luna high, corrigir achados na mesma thread e entregar o PR a Douglas.
8. Após autorização específica de Douglas, acrescentar changelog e notas versionadas, revisar o novo HEAD, fazer o merge normal e somente então publicar a tag/release 0.2.1 e fechar o milestone.

## Arquivos candidatos

Novos: os artefatos deste diretório e `umanni-vault/EXEC-011-SPEC-STATE-RECONCILIATION.md`.

Existentes permitidos, sem expansão implícita:

- `CHANGELOG.md`
- `README.md`
- `AGENTS.md`
- `umanni-vault/STATUS.md`
- `umanni-vault/MEMORIA-PROJETO.md`
- `umanni-vault/EXEC-006-RELEASE-0-1-0.md`
- `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`
- `umanni-vault/specs/000-documentation/spec.md`
- `umanni-vault/specs/001-branding/spec.md`
- `umanni-vault/specs/001-branding/plan.md`
- `umanni-vault/specs/001-branding/tasks.md`
- `umanni-vault/specs/002-organize-vault/spec.md`
- `umanni-vault/specs/004-branding-hub/spec.md`
- `umanni-vault/specs/005-visual-prototype/spec.md`
- `umanni-vault/specs/006-release-0-1-0/spec.md`
- `umanni-vault/specs/006-release-0-1-0/plan.md`
- `umanni-vault/specs/006-release-0-1-0/tasks.md`
- `umanni-vault/specs/008-foundation-plan/spec.md`
- `umanni-vault/specs/010-foundation-release/spec.md`
- `umanni-vault/specs/010-foundation-release/tasks.md`

Os arquivos novos desta entrega também integram a allowlist: `umanni-vault/EXEC-011-SPEC-STATE-RECONCILIATION.md`, `umanni-vault/releases/0.2.1.md` e os cinco arquivos versionados sob `umanni-vault/specs/011-spec-state-reconciliation/`. Qualquer outro caminho bloqueia T012/T016.

## Validação

- igualdade entre checkout, `origin/main` e baseline esperado antes da branch;
- tag anotada e release final para 0.1.0 e 0.2.0;
- milestones 0.1.0/0.2.0 fechados e Backlog aberto com issue #9;
- estados, checks e threads dos PRs usados como evidência;
- busca negativa de claims vigentes obsoletos;
- validação de links Markdown locais;
- `git diff --check` e comparação de `git diff --name-only origin/main...HEAD` com a allowlist exata acima;
- confirmação de que nenhum arquivo funcional, lock, runtime ou branding mudou.

## Aceite e parada

Aceite conforme SC-001–SC-006. Parar antes de merge, tag ou release. Qualquer claim sem evidência permanece aberto e é devolvido a Douglas, não inferido.

Depois da autorização específica registrada por Douglas, a parada anterior ao merge deixa de bloquear somente as transições T017–T019. Um novo HEAD continua exigindo revisão independente completa; qualquer gate inválido interrompe antes do merge ou da publicação.

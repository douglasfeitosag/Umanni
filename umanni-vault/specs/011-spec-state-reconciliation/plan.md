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
| Fotografia histórica | preservar o texto original; acrescentar nota de fechamento quando necessário |
| Evidência inconclusiva | não marcar; registrar bloqueio e parar a parte dependente |

## Fases

1. Revalidar árvore, refs e GitHub; inventariar todos os specs.
2. Publicar estes artefatos de planejamento e obter revisão independente.
3. Reconciliar entrypoints e memória curta.
4. Reconciliar specs 000, 001, 002, 004, 005, 006, 008 e 010, alterando apenas os arquivos classificados.
5. Acrescentar evidência pós-publicação aos EXECs 006 e 010 sem apagar seus snapshots.
6. Executar quickstart, revisar o diff e publicar o HEAD final.
7. Iniciar automaticamente revisão final Luna high, corrigir achados na mesma thread e entregar o PR a Douglas.

## Arquivos candidatos

Novos: os artefatos deste diretório e `umanni-vault/EXEC-011-SPEC-STATE-RECONCILIATION.md`.

Existentes: `README.md`, `AGENTS.md`, `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md`, campos de estado e ledgers dos specs concluídos, `umanni-vault/EXEC-006-RELEASE-0-1-0.md` e `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`. Um arquivo candidato só entra no diff se a auditoria demonstrar correção necessária.

## Validação

- igualdade entre checkout, `origin/main` e baseline esperado antes da branch;
- tag anotada e release final para 0.1.0 e 0.2.0;
- milestones 0.1.0/0.2.0 fechados e Backlog aberto com issue #9;
- estados, checks e threads dos PRs usados como evidência;
- busca negativa de claims vigentes obsoletos;
- validação de links Markdown locais;
- `git diff --check` e allowlist estrita;
- confirmação de que nenhum arquivo funcional, lock, runtime ou branding mudou.

## Aceite e parada

Aceite conforme SC-001–SC-006. Parar antes de merge, tag ou release. Qualquer claim sem evidência permanece aberto e é devolvido a Douglas, não inferido.

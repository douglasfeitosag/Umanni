# Modelo de dados: gestão de versões

## Versão planejada

- **Identificador**: SemVer sem prefixo, por exemplo `0.1.0`.
- **Objetivo**: resumo do valor entregue.
- **Itens incluídos**: PRs/issues/specs que precisam estar concluídos.
- **Itens adiados**: referências com destino explícito (`Backlog` ou outra versão).
- **Estado**: `planned` → `reviewed` → `merged` → `tagged` → `released`.
- **Restrições**: não pode chegar a `tagged` com item incluído aberto ou gate inválido; não pode chegar a `released` sem tag remota verificável.

## Item de trabalho versionado

- **Referência**: número de issue/PR ou tarefa de spec.
- **Título**: descrição humana.
- **Destino**: uma versão SemVer ou `Backlog`.
- **Estado**: aberto, concluído ou adiado.
- **Evidência**: URL, commit ou checklist aplicável.
- **Regra**: todo item novo recebe destino antes da execução; mover de versão exige registro visível.

## Tag de release

- **Nome**: `v` + versão, por exemplo `v0.1.0`.
- **Tipo**: anotada.
- **Alvo**: commit integrado da principal.
- **Mensagem**: nome e resumo do marco.
- **Imutabilidade**: depois do push/publicação, não é movida nem substituída.

## Release publicada

- **Título**: `Umanni 0.1.0`.
- **Tag**: `v0.1.0`.
- **Estado**: final, não rascunho, não pré-release.
- **Notas**: destaques, incluídos, validação, limitações, links.
- **Evidência**: URL pública, data e alvo resolvido.

## Evidência de fechamento

- HEAD aprovado do PR de preparação.
- IDs das revisões finais e estado das threads.
- Status `review-ledger` no HEAD exato.
- Commit de merge na principal.
- Objeto da tag e commit efetivamente apontado.
- URL/estado da release e estado final do milestone.

## Transições inválidas

- `reviewed` → `tagged` sem merge: proibida.
- `merged` → `released` sem tag remota: proibida.
- `released` → alteração do alvo da tag: proibida.
- item aberto sem destino → execução: proibida pelo processo.
- falha de publicação → declarar versão concluída: proibida até retry bem-sucedido.

# Contrato de ciclo de release

## Planejamento

1. Toda feature, correção ou melhoria recebe `target_version` com SemVer ou `Backlog` explícito.
2. O conjunto da versão é enumerado antes da execução; inclusão posterior exige atualização do plano e reavaliação do escopo.
3. Item não concluído bloqueia o fechamento até terminar ou ser movido publicamente para outro destino.

## Preparação

1. Criar branch e PR específicos a partir da principal limpa.
2. Publicar e obter revisão independente da spec, plano e tarefas no HEAD exato antes de criar/atribuir milestones ou alterar a política vigente.
3. Depois de `spec-reviewed`, atualizar estado, changelog, notas e governança sem alegar tag/release ainda inexistentes.
4. Criar/reconfirmar o milestone da versão e atribuir todos os PRs/issues incluídos; manter itens sem compromisso no milestone `Backlog`.
5. Executar validação documental e conferir que não existe tag/release conflitante.
6. Obter revisão independente final no HEAD exato, resolver achados apenas pelos respectivos revisores e deixar `review-ledger=success` com label `code-reviewed` ou equivalente documental.

Na primeira execução de `0.1.0`, milestones foram criados e atribuídos antes do primeiro aceite por causa de uma inconsistência no planejamento inicial. O estado foi congelado após o achado R-001, deve ser registrado no EXEC e só pode ser reconfirmado — ou sofrer nova mutação — depois de `spec-reviewed`.

## Integração e publicação

1. Confirmar novamente HEAD, base atual, gate, threads, responsável, milestone e ausência de conflito.
2. Fazer somente o merge normal explicitamente autorizado.
3. Atualizar o checkout da principal e confirmar que o HEAD revisado é ancestral do commit de merge.
4. Capturar o SHA de merge no PR e exigir igualdade exata entre ele, o checkout e `origin/main`; qualquer avanço interrompe para nova revisão.
5. Conferir no EXEC que todas as tarefas anteriores estão concluídas com evidência e que somente a publicação permanece pronta.
6. Criar a tag anotada `vX.Y.Z` no SHA de merge confirmado e verificar localmente o objeto e o alvo.
7. Publicar a tag remota sem força.
8. Criar a GitHub Release final vinculada à tag existente, usando o arquivo de notas revisado.
9. Conferir que release e tag resolvem para o mesmo commit, validar o prompt de passagem e fechar o milestone da versão.
10. Registrar a matriz final e a evidência pós-publicação no comentário final do PR, pois elas ocorrem depois do commit imutável de preparação.

## Falhas e recuperação

- Principal avançou antes da tag: parar e obter nova verificação do commit que será marcado.
- Tag ou release já existe: parar; nunca sobrescrever ou mover.
- Push da tag falhou: não publicar release até confirmar a tag remota.
- Release falhou após push da tag: manter a tag imutável e repetir somente a publicação com as mesmas notas/alvo.
- Nota incorreta após publicação: correções editoriais que não mudam o conteúdo podem ser registradas; qualquer mudança de conteúdo entregue exige nova versão.

## SemVer durante `0.x`

- `0.MINOR.0`: novo conjunto planejado ou mudança de capacidade/contrato.
- `0.MINOR.PATCH`: correção compatível do conjunto já publicado.
- `1.0.0`: somente quando o produto e seu contrato público forem declarados estáveis por decisão explícita.

## Aceite de `0.1.0`

- Incluídos: PRs 1–8 e PR de preparação da release.
- Backlog: issue 9.
- Tag: `v0.1.0`, anotada, no merge da preparação.
- Release: `Umanni 0.1.0`, final.
- Sem anexos manuais; arquivos fonte gerados pelo GitHub e conteúdo marcado são a distribuição.

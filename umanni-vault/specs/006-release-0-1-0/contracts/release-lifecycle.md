# Contrato de ciclo de release

## Planejamento

1. Toda feature, correção ou melhoria recebe `target_version` com SemVer ou `Backlog` explícito.
2. O conjunto da versão é enumerado antes da execução; inclusão posterior exige atualização do plano e reavaliação do escopo.
3. Item não concluído bloqueia o fechamento até terminar ou ser movido publicamente para outro destino.

## Preparação

1. Criar branch e PR específicos a partir da principal limpa.
2. Atualizar estado, changelog, notas e governança sem alegar tag/release ainda inexistentes.
3. Atribuir ao milestone da versão todos os PRs/issues incluídos; manter itens sem compromisso no milestone `Backlog`.
4. Executar validação documental e conferir que não existe tag/release conflitante.
5. Obter revisão independente no HEAD exato, resolver achados apenas pelos respectivos revisores e deixar `review-ledger=success` com label `code-reviewed` ou equivalente documental.

## Integração e publicação

1. Confirmar novamente HEAD, base atual, gate, threads, responsável, milestone e ausência de conflito.
2. Fazer somente o merge normal explicitamente autorizado.
3. Atualizar o checkout da principal e confirmar que o HEAD revisado é ancestral do commit de merge.
4. Criar a tag anotada `vX.Y.Z` no commit de merge da principal e verificar localmente o objeto e o alvo.
5. Publicar a tag remota sem força.
6. Criar a GitHub Release final vinculada à tag existente, usando o arquivo de notas revisado.
7. Conferir que release e tag resolvem para o mesmo commit e fechar o milestone da versão.
8. Registrar a evidência pós-publicação no comentário final do PR, pois ela ocorre depois do commit imutável de preparação.

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

# Protocolo de entregas e revisão

Origem: PEDIDO-001, D-002, D-004, D-013. Relacionados: [[STATUS]], [AGENTS](../AGENTS.md), [[GLOSSARIO]].

## Ciclo

Pedido preservado → esclarecimento → spec → plano → tarefas → PR com label/responsável → revisão independente da spec → discussão/correções/revisão do novo HEAD → aceite da spec → prompt da executora → EXEC/atualização do PR → revisão independente da implementação → discussão/correções/revisão do novo HEAD → aguardando Douglas → merge verificado → encerramento.

Cada entrega tem um ID. Cada prompt e retorno identifica papel, autor/modelo, destinatário, pedido de origem, spec, commit base, branch, PR se existir e resposta anterior. A condutora não assume que uma mensagem privada substitui o registro no PR.

## Conteúdo obrigatório de um prompt de execução

Objetivo único; arquivos para ler; ações e arquivos permitidos; exclusões; dependências; passos em ordem; cenários e validações; condição de sucesso; quando parar; nome/caminho exato do EXEC; instruções para commit/push/abertura de PR compatíveis com a tarefa. Merge/fechamento continuam proibidos sem autorização de Douglas.

O EXEC descreve resultado real, alterações, hashes/PR, comandos e resultados, evidência RED/GREEN pertinente, limitações e achados. Se bloqueado, inclui pergunta concreta e proposta de resolução para a condutora, sem prosseguir na parte dependente.

## Achados e revisão

Havendo achados acionáveis, a revisora cria uma única revisão formal `Request changes`. Cada achado abre uma thread de review própria, na linha pertinente ou no arquivo quando não houver linha específica, com tag `[REVISORA]`, ID estável, severidade, localização, reprodução/evidência, impacto, correção proposta, papel/modelo e commit analisado. Comentário geral do PR não substitui uma thread de achado.

A resposta começa com `[CONDUTORA]` para planejamento ou `[EXECUTORA]` para implementação, permanece na mesma thread e vincula commit corretivo e validação. A revisora responde na thread com `[REVISORA]` e confirma corrigido, aceita a justificativa ou mantém o achado. Somente a revisora resolve a thread. Depois de resolver todas as threads bloqueantes contra o novo HEAD, a revisora submete `Approve`, encerrando o estado geral de mudanças solicitadas. Nenhum achado pode ficar sem decisão antes do aceite.

Sem consenso após resposta fundamentada e reconsideração explícita da revisora, a condutora interrompe o trabalho dependente e apresenta a Douglas: ponto controvertido, posição de cada papel, evidências, consequências das alternativas, recomendação de cada lado e pergunta decisória exata. A decisão de Douglas é registrada no comentário antes da continuidade.

Agentes podem criar e atualizar PRs automaticamente. Na criação, aplicam pelo menos um label coerente e atribuem Douglas, salvo indicação diferente. Merge, fechamento e auto-merge permanecem proibidos sem autorização explícita e específica.

`Request changes` e `Approve` exigem que a revisora use identidade GitHub distinta da autora do PR. Tags de papel sob o mesmo login registram colaboração, mas não contam como revisão formal nem liberam o gate.

Novos commits exigem verificar se as revisões continuam válidas. O futuro check obrigatório deve cobrir tanto conversas de review quanto achados em comentários gerais, associados ao HEAD revisado. Até esse mecanismo existir e ser testado, não afirmar bloqueio automático de merge. O PR documental pode existir para hospedar a revisão; o gate mínimo de CI, ledger e proteções precisa ser comprovado antes de apresentar uma implementação como pronta para merge.

## Passagem de sessão

A condutora atualiza STATUS, README se afetado e MEMORIA-PROJETO, e escreve um `PROMPT-COND-*` com próxima tarefa, base, leituras mínimas, decisões vigentes, pendências, retorno esperado e parada. Douglas abre a sessão adequada e cola o prompt. A aprovação técnica não equivale a merge realizado.

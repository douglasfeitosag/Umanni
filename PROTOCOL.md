# Protocolo de entregas e revisão

Origem: PEDIDO-001, D-002, D-004, D-013. Relacionados: [[STATUS]], [[AGENTS]], [[GLOSSARIO]].

## Ciclo

Pedido preservado → esclarecimento → spec → plano → tarefas → análise de consistência → prompt da executora → EXEC/PR → revisão e correções → aguardando Douglas → merge verificado → encerramento.

Cada entrega tem um ID. Cada prompt e retorno identifica papel, autor/modelo, destinatário, pedido de origem, spec, commit base, branch, PR se existir e resposta anterior. A condutora não assume que uma mensagem privada substitui o registro no PR.

## Conteúdo obrigatório de um prompt de execução

Objetivo único; arquivos para ler; ações e arquivos permitidos; exclusões; dependências; passos em ordem; cenários e validações; condição de sucesso; quando parar; nome/caminho exato do EXEC; instruções para commit/push/abertura de PR compatíveis com a tarefa. Merge/fechamento continuam proibidos sem autorização de Douglas.

O EXEC descreve resultado real, alterações, hashes/PR, comandos e resultados, evidência RED/GREEN pertinente, limitações e achados. Se bloqueado, inclui pergunta concreta e proposta de resolução para a condutora, sem prosseguir na parte dependente.

## Achados e revisão

Um comentário por achado: ID estável, severidade, localização, reprodução/evidência, impacto e correção proposta. A resposta vincula commit corretivo e validação. A condutora registra corrigido, não procedente com justificativa ou bloqueado. Nenhum achado pode ficar sem decisão antes do aceite.

Novos commits exigem verificar se as revisões continuam válidas. O futuro check obrigatório deve cobrir tanto conversas de review quanto achados em comentários gerais, associados ao HEAD revisado. Até esse mecanismo existir e ser testado, não afirmar bloqueio automático de merge. Antes do primeiro PR, preparar o plano do gate mínimo de CI e das proteções.

## Passagem de sessão

A condutora atualiza STATUS, README se afetado e MEMORIA-PROJETO, e escreve um `PROMPT-COND-*` com próxima tarefa, base, leituras mínimas, decisões vigentes, pendências, retorno esperado e parada. Douglas abre a sessão adequada e cola o prompt. A aprovação técnica não equivale a merge realizado.

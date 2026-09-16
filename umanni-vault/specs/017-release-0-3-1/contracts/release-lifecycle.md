# Contrato — ciclo de release 0.3.1

1. Durante a preparação: `main`, PR #23 e checks devem estar coerentes; issues de produto fechadas; o PR de preparação pode ser o único item aberto do milestone; tag e Release ausentes.
2. Planejamento: spec, plano e tarefas entram no PR antes dos demais registros e recebem revisão independente no HEAD exato.
3. Preparação: notas e evidências entram no mesmo PR após aceite do planejamento; nenhuma publicação ocorre antes de nova revisão e integração.
4. Publicação: capturar o merge da preparação, confirmar `HEAD == origin/main`, confirmar por listagem que nenhuma issue ou pull request do milestone permanece aberta, criar tag anotada sem força, verificar objeto/peeled target, criar Release com `--target` nesse SHA e confirmar `targetCommitish`.
5. Encerramento: fechar somente o milestone 0.3.1 após tag/Release válidas e zero itens abertos; registrar comentário final no PR.
6. Reconciliação: versionar os fatos pós-publicação em outro PR documental, com revisão exata, sem modificar a publicação.

Se qualquer comparação divergir, parar; nunca mover, apagar ou recriar tag.

# Contrato — ciclo de release 0.3.0

1. Antes da publicação: `main`, PR #17, milestone e checks devem estar coerentes; tag e Release ausentes.
2. Preparação: notas e evidências entram por PR revisado; nenhuma publicação ocorre antes de sua integração.
3. Publicação: capturar o merge da preparação, confirmar `HEAD == origin/main`, criar tag anotada sem força, verificar objeto/peeled target, criar Release com `--target` nesse SHA e confirmar `targetCommitish`.
4. Encerramento: fechar somente o milestone 0.3.0 após tag/Release válidas e zero itens abertos; registrar comentário final no PR.

Se qualquer comparação divergir, parar; nunca mover, apagar ou recriar tag.

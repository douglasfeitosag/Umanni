# Quickstart 016 — validação futura da entrega

Este roteiro pertence à futura execução e não deve ser executado pela branch documental.

1. Confirmar branch/PR, base, milestone 0.3.1, #18/#19, allowlist e aceite exato do planejamento.
2. Executar os testes focalizados RED antes de cada mudança e registrar a falha esperada no EXEC.
3. Rodar specs do entrypoint/readiness e requests HTML/Inertia após o GREEN.
4. Rodar Vitest/RTL da página de contingência e Playwright normal de regressão.
5. Executar o script Compose com projeto/volume isolados e depois o Playwright dedicado contra a imagem final em `RAILS_ENV=production`, usando somente o initializer/rota montado pelo overlay efêmero; confirmar cleanup e ausência do probe na imagem normal.
6. Executar `bin/check`, cobertura, inventário da imagem e `git diff --check origin/main...HEAD` no mesmo SHA.
7. Publicar branch/PR e iniciar revisora Luna high independente no HEAD remoto exato.

O gate Compose deve provar: banco ausente preparado antes do servidor, migration pendente concluída antes da escuta, conexão/migration falha mantendo indisponibilidade, readiness HTTP sem GET interno a `/up` e cadastro inválido 422. O gate production-like de erro deve provar HTML/Inertia 5xx seguros, sem modal, sem segredos, com logs próprios na allowlist exata e sem alterar 403/404/422.

Qualquer comando destrutivo deve apontar apenas para o nome explícito do projeto Compose efêmero criado pelo script; nunca usar o projeto ou volume padrão do checkout.

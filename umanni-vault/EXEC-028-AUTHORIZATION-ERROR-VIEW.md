# Execução 028 — superfície 403 administrativa

## Escopo e base

- Branch: `codex/028-authorization-error-view`.
- Base: `ed2c756c3258359117a9c7f89588b26a4b4f314d`, candidata após o patch 027.
- Escopo: 403 Umanni seguro em HTML/Inertia para pessoa regular, inclusive em rota administrativa não casada; 404 normal para administradora na rota não casada.

## RED, implementação e validação

- Foram adicionados exemplos de request para rota administrativa casada/não casada de pessoa regular e 404 para administradora. O runtime Ruby/pg local impede executar os exemplos de request; eles não são declarados como verdes.
- `DeliveryExceptionsApp.safe_error_response` centraliza a serialização segura já usada no fallback 5xx e permite o 403 sem shares de sessão. `Admin::BaseController` entrega essa resposta com destino `/profile` para pessoa regular.
- `Admin::UnmatchedRoutesController` com catch-all permite o guard de autorização antes do 404; administradora passa pelo guard e recebe o 404 normal.
- `ruby -c` para serviço, controllers e rotas, além de `git diff --check`, concluíram com sucesso.

## Pendente antes de revisão

- Executar request specs e E2E no runtime de banco válido, inclusive resposta HTML/Inertia sem conteúdo nativo ou detalhes técnicos.
- Obter revisão independente do HEAD exato.

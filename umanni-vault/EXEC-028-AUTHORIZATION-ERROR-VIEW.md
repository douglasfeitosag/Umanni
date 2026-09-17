# Execução 028 — superfície 403 administrativa

## Escopo e base

- Branch: `codex/028-authorization-error-view`.
- Base: `ed2c756c3258359117a9c7f89588b26a4b4f314d`, candidata após o patch 027.
- Escopo: 403 Umanni seguro em HTML/Inertia para pessoa regular, inclusive em rota administrativa não casada; 404 normal para administradora na rota não casada.

## RED, implementação e validação

- Foram adicionados exemplos de request para rota administrativa casada/não casada de pessoa regular e 404 para administradora.
- `DeliveryExceptionsApp.safe_error_response` centraliza a serialização segura já usada no fallback 5xx e permite o 403 sem shares de sessão. `Admin::BaseController` entrega essa resposta com destino `/profile` para pessoa regular.
- `Admin::UnmatchedRoutesController` com catch-all permite o guard de autorização antes do 404; administradora passa pelo guard e recebe o 404 normal.
- `ruby -c` para serviço, controllers e rotas, além de `git diff --check`, concluíram com sucesso.
- No tooling Docker, no HEAD `d808d4668b681f8e5d3c374400fb0ea3def4f1c3`, após `bundle exec vite build`, `bundle exec rspec spec/requests/security_spec.rb spec/integration/delivery_errors_spec.rb` passou com 14 exemplos no `umanni_test`; a comparação HTML normaliza somente o nonce CSP variável por requisição.
- `npm exec playwright -- test spec/e2e/identity.spec.ts --grep "safe 403" --workers=2` passou nos seis projetos, validando 403 e a tela segura nas rotas administrativa casada e não casada para pessoa regular.
- `bundle exec rubocop --format simple` passou com 99 arquivos inspecionados; `git diff --check` passou.

## Pendente antes de revisão

- Obter revisão independente do HEAD exato que incluir esta evidência.

# Execução 027 — retorno seguro da página de erro

## Escopo e base

- Branch: `codex/027-error-return-home`.
- Base: `f4afda9ebce52380fce952429c624c607e982ad9`, conforme o plano 024.
- Escopo: classificar a rota de origem sem reter sessão, cookie, query ou a URL falha e entregar somente `/admin/dashboard`, `/profile` ou `/sign-in`.

## RED observado

- `mise exec node@24.21.0 -- npm exec vitest -- run app/frontend/pages/Errors/Show.test.tsx --maxWorkers=2`: 4 falhas esperadas; o botão ainda apontava para `/` e ignorava o destino seguro solicitado.
- Os exemplos Rails e Playwright foram acrescentados. O RSpec não inicializou localmente porque o banco de teste PostgreSQL não está acessível pelo host; a saída encerrou antes dos exemplos. Não há evidência de GREEN desses cenários neste ambiente.

## GREEN e refatoração

- `mise exec node@24.21.0 -- npm exec vitest -- run app/frontend/pages/Errors/Show.test.tsx --maxWorkers=2`: 4 testes, sucesso.
- `mise exec node@24.21.0 -- npm exec eslint -- app/frontend/pages/Errors/Show.tsx app/frontend/pages/Errors/Show.test.tsx spec/delivery/delivery_errors.spec.ts --max-warnings=0`: sucesso.
- `mise exec ruby@4.0.6 -- ruby -c app/services/delivery_exceptions_app.rb` e `app/controllers/errors_controller.rb`: sucesso.
- `mise exec node@24.21.0 -- npm exec vite build`: sucesso.
- Refatoração pós-GREEN: a classificação ficou em `safe_return_path`, com allowlist de três destinos; a página recebe apenas `returnPath`, e a cópia sanitizada de ambiente continua sem cookie, autorização, query nem caminho original.

## Pendente antes de revisão

- Executar RSpec e Playwright em ambiente cujo banco `umanni_e2e` seja acessível e registrar os resultados.
- Executar `git diff --check <base> HEAD` depois do commit e obter revisão independente do HEAD exato.

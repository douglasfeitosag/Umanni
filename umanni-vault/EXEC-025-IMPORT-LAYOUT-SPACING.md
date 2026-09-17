# Execução 025 — espaçamento da importação

## Escopo e base

- Branch: `codex/025-import-layout-spacing`.
- Base técnica: `27a06e31ed902d56bc667e9810ec931d2ae40788`, a candidata após a integração do plano 024. O runtime permanece igual a `f4afda9ebce52380fce952429c624c607e982ad9`; a diferença é exclusivamente documental.
- Escopo: separar semanticamente upload e histórico e corrigir somente o espaçamento da dica do upload.

## RED observado

- `mise exec node@24.21.0 -- npm exec vitest -- run app/frontend/pages/Admin/UserImports/Index.test.tsx --maxWorkers=2`
  falhou como esperado: não havia região acessível chamada `Enviar arquivo para importação`.
- O cenário Playwright de 1440 px, 320 px e fonte de 200% foi incluído. Depois de expor temporariamente somente o banco de teste em uma porta local, os seis projetos chegaram a iniciar, mas o servidor Rails encerrou antes das asserções por falha nativa do driver `pg` (`Segmentation fault` em `PG::Connection#connect_start`) sob Ruby 4.0.6. Isso é uma limitação do runtime local, não evidência de aprovação visual nem falha atribuída ao aplicativo.

## GREEN e refatoração

- `mise exec node@24.21.0 -- npm exec vitest -- run app/frontend/pages/Admin/UserImports/Index.test.tsx --maxWorkers=2`: 4 testes, sucesso.
- `mise exec node@24.21.0 -- npm exec eslint -- app/frontend/pages/Admin/UserImports/Index.tsx app/frontend/pages/Admin/UserImports/Index.test.tsx spec/e2e/user_imports.spec.ts --max-warnings=0`: sucesso.
- `mise exec node@24.21.0 -- npm exec vite build`: sucesso.
- Refatoração pós-GREEN: a tela passou a declarar as regiões `import-upload` e `import-history`; a regra positiva de margem ficou limitada a `.import-upload .field-hint`, preservando a regra de avatar.

## Pendente antes de revisão

- `git diff --check 27a06e31ed902d56bc667e9810ec931d2ae40788 6b65b0d` concluiu sem saída.
- Em resposta a R-025-001, o E2E passou a preencher o histórico e compara `button.bottom <= history.top`, não somente os topos. Vitest e ESLint continuam verdes; o cenário Playwright permanece sem resultado de produto por falha nativa do runtime Ruby/pg descrita acima.
- Obter revisão independente do HEAD que contém este registro e o patch.

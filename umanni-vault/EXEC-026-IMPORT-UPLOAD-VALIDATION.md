# Execução 026 — validação do upload de importação

## Escopo e base

- Branch: `codex/026-import-upload-validation`.
- Base: `c918102455bcd686fc959c7c61a074b437f8fee7`, candidata após o patch 025.
- Escopo: impedir POST sem arquivo, associar o erro ao campo e permitir 422 somente para arquivo ausente, preflight ou `UserImports::Enqueue::Failed`.

## RED e GREEN observados

- O teste de componente para submissão sem arquivo falhou como esperado: `setError` não era chamado.
- Após a guarda local, `mise exec node@24.21.0 -- npm exec vitest -- run app/frontend/pages/Admin/UserImports/Index.test.tsx --maxWorkers=2` concluiu com 5 testes em sucesso.
- O ESLint do componente e `ruby -c app/controllers/admin/user_imports_controller.rb` concluíram com sucesso.

## Contratos ainda a executar

- Os exemplos de request foram adicionados para ausência de parâmetro, falha prevista de enfileiramento e exceção ActiveRecord não recuperável. Eles exigem o banco PostgreSQL de teste; o runtime Ruby/pg local falha durante a conexão, portanto não são declarados como executados.
- O E2E sem arquivo e a prova de fallback 500 permanecem pendentes do mesmo runtime.

## Refatoração pós-GREEN

- O componente reúne o erro de cliente, formulário e servidor em `sourceFileError`; a mensagem ganha `source-file-error` e a associação ARIA é condicional.
- O controlador extrai o arquivo defensivamente, devolve `missing_file` sem criar importação e limita o resgate a `UserImports::Enqueue::Failed`; erros ActiveRecord não são convertidos em 422.

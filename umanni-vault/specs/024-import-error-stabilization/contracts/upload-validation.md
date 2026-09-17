# Contrato: validação de upload

## `POST /admin/user_imports`

| Situação | Status | Corpo/efeito esperado |
| --- | --- | --- |
| Administradora com CSV/XLSX válido | redirect para o lote | cria um `UserImport` e um job como contrato existente |
| Sem `user_import` ou sem `source_file` | 422 Inertia | `props.errors.sourceFile = "Selecione um arquivo CSV ou XLSX."`; zero lote/job |
| Arquivo rejeitado no preflight | 422 Inertia | `props.errors.sourceFile` localizada; zero lote/job |
| `UserImports::Enqueue::Failed` | 422 Inertia | alerta/erro normal do formulário, localizado; zero lote/job confirmado |
| `ActiveRecord::ActiveRecordError` ou exceção não classificada | 500 seguro | fallback existente, sem detalhe técnico; não resgatar como 422 |

O cliente não envia requisição quando `source_file` é nulo. Essa proteção é de experiência; o servidor continua sendo a autoridade para o contrato 422. Em erro local ou remoto, o texto é um elemento `#source-file-error` e o controle usa `aria-describedby="source-file-hint source-file-error"`; sem erro, conserva somente `source-file-hint`.

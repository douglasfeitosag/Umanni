# Modelo de dados e props transitórias

Não há migração, tabela ou atributo persistente novo.

| Elemento | Campos/valores | Origem | Regras |
| --- | --- | --- | --- |
| Erro de upload | `errors.sourceFile: string` | `UserImportsController` ou validação local | mensagem em português; não expõe exceção; 422 para validação servidor |
| Página segura de erro | `status: number`, `returnPath: string` | serviço de erro, a partir do escopo da rota de origem | `returnPath` só pode ser `/admin/dashboard`, `/profile` ou `/sign-in`; não deriva de cookie/sessão no fallback |
| Estado local do formulário | `source_file: File \| null`, erro exibido | `UserImportsIndex` | sem arquivo impede POST; erro é limpo/substituído ao selecionar novo arquivo conforme desenho do patch |

`UserImport`, `UserImportRow`, `Session` e `User` preservam seu modelo e regras atuais. A resposta 403 não serializa recurso administrativo nem sessão/cookie no HTML de fallback.

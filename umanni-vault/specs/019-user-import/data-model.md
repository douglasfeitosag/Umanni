# Modelo de dados 019 — Importação de usuários

## `UserImport`

Representa um envio imutável e sua execução.

- `imported_by_id`: FK exigida na criação e anulada por `ON DELETE SET NULL` se o importador for removido; o lote permanece e a interface mostra “Usuário removido”.
- `status`: enum `queued`, `processing`, `completed`, `completed_with_errors`, `failed`.
- `total_count`, `processed_count`, `created_count`, `rejected_count`: inteiros não negativos.
- `started_at`, `finished_at`: opcionais conforme transição.
- `failure_code`: opcional e restrito a `source_unreadable`, `retry_exhausted` ou `technical_failure`; nunca mensagem técnica livre.
- `created_at`, `updated_at`.
- `has_one_attached :source_file` com nome lógico próprio.

Invariantes:

- `processed_count = created_count + rejected_count`;
- `processed_count <= total_count <= 10_000`;
- `queued` não possui `started_at`/`finished_at`;
- `processing` possui `started_at` e não possui `finished_at`;
- estados terminais possuem `finished_at`;
- `completed` exige `rejected_count = 0` e contadores fechados;
- `completed_with_errors` exige `rejected_count > 0` e contadores fechados;
- `failed` pode ter progresso parcial confirmado.
- `failed` exige `failure_code`; qualquer outro estado exige `failure_code = NULL`.

## `UserImportRow`

Representa o resultado seguro e idempotente de uma linha de dados.

- `user_import_id`: FK obrigatória;
- `row_number`: número original começando em 2 por causa do cabeçalho;
- `status`: `created` ou `rejected`;
- `normalized_email`: opcional, já aparado/minúsculo e limitado a 254 bytes;
- `normalized_role`: opcional, somente `regular` ou `admin`;
- `error_code`: opcional e enumerado;
- `user_id`: FK opcional para a conta criada;
- timestamps.

Índices/constraints:

- único `(user_import_id, row_number)`;
- índice por `(user_import_id, status, row_number)` para relatório paginado;
- constraints para status/códigos/contadores quando PostgreSQL puder expressá-las sem duplicar regra instável;
- nenhuma deleção em cascata de `User` deve apagar a evidência da linha; `user_id` pode ficar nulo conforme a FK escolhida.

Códigos exaustivos de `UserImportRow.error_code`:

- `missing_full_name`, `missing_email`, `invalid_email`, `invalid_role`, `formula_not_allowed`;
- `field_too_long`, `row_too_large`;
- `duplicate_in_file`, `duplicate_existing`;
- `malformed_row`.

Combinações válidas: `created` exige `error_code = NULL` e `user_id` presente; `rejected` exige exatamente um código da lista e `user_id = NULL`. `UserImport.failure_code` usa somente a lista separada no lote e nunca aparece como erro de linha. Constraints PostgreSQL e enums/validações Ruby espelham essas listas; traduções cobrem cada código.

Limites de entrada:

- `full_name`: 200 caracteres Unicode e 800 bytes;
- `email`: 254 bytes;
- `role`: 7 bytes;
- soma decodificada das células da linha: 1.100 bytes;
- cabeçalho individual: 64 bytes.

Excesso usa `field_too_long` ou `row_too_large`; o valor bruto não é persistido. O modelo `User` e o PostgreSQL reforçam os limites de bytes de nome/e-mail para impedir bypass do leitor.

Mensagens em português são traduzidas a partir do código. Não persistir mensagem livre ou valor bruto.

## Transições

```text
queued -> processing -> completed
                    \-> completed_with_errors
                    \-> failed (source_unreadable | retry_exhausted | technical_failure)
```

Lote e job nascem atomicamente em `queued`. O job aceita `queued` ou `processing` para retomada idempotente, mas nunca regride o estado. Retry automático mantém `processing` e ocorre no máximo três vezes; `failed` é terminal e exige novo lote. Estados `completed` e `completed_with_errors` são no-op para o mesmo job.

## Ordem do processamento

1. Carregar lote e obter lock que impeça duas execuções simultâneas do mesmo ID.
2. Retornar sem efeito se terminal controlado.
3. Validar que arquivo e estrutura permanecem legíveis; marcar `processing`.
4. Fazer passe de normalização para detectar e-mails repetidos dentro do arquivo.
5. Processar linhas ainda sem resultado terminal em blocos de no máximo 100.
6. Para cada linha, criar usuário e resultado de sucesso na mesma transação curta; em validação/duplicidade, criar resultado rejeitado.
7. Atualizar contadores persistidos; suprimir o callback de métricas somente no contexto do bloco e, após commit, emitir no máximo uma invalidação de métricas se houve criação e uma invalidação do lote.
8. Recalcular/validar contadores e concluir em estado terminal.

O job recebe somente `user_import_id`; não serializa arquivo, sessão ou usuário inteiro.

## Contrato de props

Lista:

- `imports[]`: `id`, filename seguro, status, contadores, importador resumido, createdAt/startedAt/finishedAt.

Detalhe:

- `userImport`: mesmos campos, `failureCode`/`failureMessage` opcionais e percentagem derivada quando `totalCount > 0`;
- `results[]`: rowNumber, status, normalizedEmail opcional, normalizedRole opcional, errorCode/errorMessage e userId opcional;
- `pagination`: page, pageSize fixo, totalPages/totalItems.

Nenhuma prop contém storage key, caminho local, blob metadata integral, nome bruto, fórmula, stack trace ou conteúdo da planilha.

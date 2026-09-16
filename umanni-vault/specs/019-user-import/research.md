# Pesquisa 019 — Dependências e alternativas da importação

Pesquisa realizada em 2026-09-16. Nenhuma dependência foi instalada no repositório.

## Estado real da base

- Ruby 4.0.6, Rails 8.1.3.1 e PostgreSQL 18.6 estão fixados.
- Active Job está carregado, mas `solid_queue` não está no Gemfile/lock e não existem `config/queue.yml`, tabelas de fila ou `bin/jobs`.
- Active Storage e Solid Cable 4.0.2 já estão presentes e exercitados.
- `production_local` usa hoje `tmp/storage`; containers web/worker separados não compartilhariam esses bytes sem mudança explícita.
- Compose possui `db`, `verify`, `dev`, `vite` e `web`; não possui worker.
- O `User` aceita `password_digest` ausente, mas a edição administrativa atual não define senha. Portanto D-019 depende de uma ação nova, limitada a contas sem credencial.

## Solid Queue

### Evidência primária

- Projeto oficial: <https://github.com/rails/solid_queue>
- RubyGems consultado: `solid_queue 1.7.0`, publicado em 2026-08-21, requer Active Job/Active Record/Railties >= 7.1.
- A documentação oficial distingue supervisor, dispatcher e worker, fornece `bin/jobs`, recomenda processo separado e documenta o adiamento de enqueue até commit no Rails 8.

### Escolha

Fixar `solid_queue 1.7.0`, usar o PostgreSQL primário e executar `bin/jobs` como serviço Compose separado, fila exata `imports`, um processo/uma thread no perfil local. O limite de 10.000 linhas e a ausência de outras filas tornam esta configuração suficiente; aumentar concorrência exige medição e nova decisão.

A garantia D-043 depende explicitamente da mesma conexão lógica `primary`: `ProcessUserImportJob.enqueue_after_transaction_commit = false` e `perform_later` executado dentro da transação persistem lote/job juntos. Rails 8.1 usa booleano nesse atributo; retorno falso/erro deve provocar rollback. A execução prova por teste transacional que Solid Queue não abriu conexão separada. Mudar a topologia exige antes outbox/reconciliador próprio.

## Biblioteca XLSX

| Candidata | Versão consultada | Estado observado | Adequação |
| --- | --- | --- | --- |
| `roo` | 3.0.0, 2025-10-01 | repositório não arquivado; depende de Nokogiri, rubyzip 3.x, csv/base64/logger | melhor API mínima para leitura XLSX e validação de planilha/célula |
| `creek` | 2.6.3, 2023-05-03 | repositório não arquivado, sem Release GitHub recente; parser streaming | útil para arquivos grandes, mas menor manutenção e contrato mais baixo nível |
| `rubyXL` | 3.4.38, 2026-06-15 | repositório não arquivado; leitura/escrita; Nokogiri/rubyzip | ativo, mas escrita e edição são superfície desnecessária |

### Prova isolada de resolução

Em container efêmero derivado da imagem `umanni-foundation-verify`, foram copiados Gemfile/lock para `/tmp`, adicionados apenas no diretório temporário `solid_queue 1.7.0` e `roo 3.0.0`, resolvido o lock e instaladas as gems. Com Ruby 4.0.6/Rails 8.1.3.1, ambas carregaram e reportaram as versões esperadas.

Isso comprova compatibilidade de resolução/carregamento, não parsing, migrations, boot Rails, worker ou imagem final. A futura execução deve repetir a prova no próprio HEAD e criar fixtures mínimas CSV/XLSX versionadas somente em testes.

## Formato de entrada

- CSV: biblioteca padrão `CSV`, UTF-8 estrito, BOM opcional, vírgula e cabeçalhos canônicos.
- XLSX: `Roo::Excelx`; exatamente uma planilha não vazia; nenhuma macro, XLS ou fórmula aceita.
- O preflight lê no máximo a linha 10.001 e encerra; nunca percorre trabalho ilimitado na request.
- Antes de normalizar, aplica limites de 200 caracteres/800 bytes para nome, 254 bytes para e-mail, 7 bytes para papel e 1.100 bytes por linha.
- A aplicação não confia em extensão ou `content_type` informado pelo cliente: confronta extensão, MIME detectado e assinatura/conteúdo parseável.

## Riscos e mitigação

| Risco | Mitigação planejada |
| --- | --- |
| zip bomb ou XLSX malformado | limite de bytes antes do parser, tratamento de exceção, uma planilha e limite de linhas/células |
| fórmula ou conteúdo ativo | rejeitar células de fórmula/erro e nunca renderizar valores brutos |
| corrida de e-mail entre lotes | índice único atual + `RecordNotUnique` convertido em resultado seguro |
| job repetido | resultado único por lote/linha e skip de resultado terminal |
| excesso de broadcasts | contexto de supressão restrito ao processor, seguido de no máximo um evento de métricas e um de importação por bloco de até 100 linhas |
| vazamento por relatório | códigos enumerados e campos normalizados mínimos; paginação server-side |
| worker ausente | serviço Compose próprio e gate que prova consumo/restart |
| conta importada inutilizável | ação de senha inicial somente quando `password_digest` estiver ausente |
| storage local distinto por container | mudar `production_local` para `/rails/storage` e montar o mesmo volume nomeado em web/worker |
| crash entre lote e enqueue | lote/attachment/job na mesma transação `primary`; falha/crash pré-commit reverte tudo e pós-commit encontra ambos |

## Fontes

- Solid Queue: <https://github.com/rails/solid_queue>
- Roo: <https://github.com/roo-rb/roo> e <https://rubygems.org/gems/roo>
- Creek: <https://github.com/pythonicrubyist/creek> e <https://rubygems.org/gems/creek>
- rubyXL: <https://github.com/weshatheleopard/rubyXL> e <https://rubygems.org/gems/rubyXL>
- Active Job: <https://guides.rubyonrails.org/active_job_basics.html>

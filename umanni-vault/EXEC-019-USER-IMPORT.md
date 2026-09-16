# EXEC-019 — Importação de usuários 0.4.0

**Estado**: implementação e gates técnicos concluídos no HEAD indicado; publicação, revisão independente, integração e release ainda não ocorreram.

**Papel/modelo**: EXECUTORA Codex, identificada como GPT-5, sem variante exata exposta.

**Spec e plano**: `specs/019-user-import/`.

**Base autorizada**: merge do PR documental #26 em `origin/main`.

**Branch**: `codex/019-user-import-app`.

**PR**: [#27](https://github.com/douglasfeitosag/Umanni/pull/27), milestone aberto `0.4.0`.

**HEAD técnico validado**: `02da120ce69f9d3fc9bfb752e92c26baad17c5d9`.

## Gate inicial e escopo

- O PR documental #26 estava integrado antes da primeira alteração de aplicação. A execução permaneceu na allowlist do plano: dependências, migrations, imports, worker/Compose, testes/gates e os quatro documentos previstos.
- Em 2026-09-16, Douglas autorizou explicitamente uma exceção pontual à allowlist: `app/frontend/pages/Admin/Users/Edit.tsx` e a cobertura Playwright correspondente, apenas para permitir que o administrador defina a senha inicial de uma conta importada sem credencial. A spec e o plano aceitos foram preservados; essa autorização não amplia os demais itens de 0.4.0.
- A entrega não cria e-mail, convite, recuperação de senha, retry manual, cancelamento, exportação, API paralela, Redis, CI/runner, deploy ou itens do Backlog.
- `solid_queue 1.7.0` e `roo 3.0.0` foram resolvidas, bloqueadas no lockfile e carregadas na imagem de verificação. A configuração é single-database: tabelas da fila entram como migrations `primary`; não há `queue_schema.rb`, conexão `queue` nem banco secundário.

## Ciclos TDD e implementação

| Incremento | RED observado | GREEN/refatoração comprovada |
| --- | --- | --- |
| Pré-validação | CSV/XLSX, cabeçalhos e limites não tinham contrato de importação | readers estritos, limites de arquivo/campo/linha, planilha única e resultado estrutural sem lote/job |
| Enqueue | não existia lote persistido nem fila transacional | `UserImport`, attachment e `ProcessUserImportJob` são criados na mesma transação; retorno falso ou exceção reverte todos |
| Processamento | não havia relatório, duplicidade determinística ou retomada | resultados por linha idempotentes, todas as duplicatas internas rejeitadas, usuários existentes imutáveis e contadores persistidos |
| Senha inicial | conta importada sem digest não podia ser ativada localmente | ação administrativa com bloqueio pessimista permite uma única transição sem credencial para credencial |
| Progresso/interface | não havia telas nem atualização privada | histórico, envio, detalhe e relatório paginado em português; Cable só invalida pelo `importId`, e reload/reconnect lê a verdade do banco |
| Entrega | não existia worker para `imports` nem prova de bytes compartilhados | `web` e `worker` usam `/rails/storage` comum, com fila exclusiva e teste de leitura após restart |

Os commits funcionais coesos incluem `38867f2` (preflight/lote), `4370dc8` (senha inicial), `a72b66d` (interface), `aff38b6` (worker) e os ciclos subsequentes de cobertura/refatoração até `97261e1`.

## Contratos entregues

- Administrador autenticado envia somente CSV UTF-8 ou XLSX de uma planilha, com cabeçalhos canônicos e no máximo 10 MiB/10.000 linhas. Rejeição estrutural não cria lote, attachment nem job; a request válida não cria usuários sincronamente.
- O lote inicia `queued`; o worker da fila `imports` registra linhas criadas ou rejeitadas, preserva o histórico e alcança `completed`, `completed_with_errors` ou `failed` sem expor conteúdo bruto, fórmulas, senhas ou detalhes técnicos.
- O processador trabalha em blocos de até 100 linhas, suprime somente a invalidação de métricas dentro do escopo e restaura o contexto mesmo com exceção. Cada bloco confirmado emite no máximo uma invalidação agregada de métricas.
- A consulta, upload e stream pertencem somente a administradores atuais. Eventos Cable têm apenas tipo, versão de schema e identificador do lote; a tela recarrega as props autorizadas.
- A imagem de entrega inclui channels, jobs e services. O worker é um processo Rails separado, sem root, e compartilha o volume de Active Storage com o web.

## Evidência inicial superada

`bin/check`, executado com `VERIFICATION_SHA=97261e1868ed901bf02eee33708d2d036bc42b38`, passou integralmente:

- RSpec paralelo: 38 + 46 = 84 exemplos, zero falhas, em `umanni_test` e `umanni_test2` isolados;
- cobertura Ruby: 724/771 linhas, **93,90%**;
- RuboCop: 96 arquivos, zero infrações; Brakeman 8.0.6: zero alertas;
- Vitest: 20/20, cobertura TypeScript de linhas **95,67%** (90,95% statements);
- Playwright: 60/60 nos seis perfis Chromium/Firefox/WebKit e desktop/mobile.

`bin/check-delivery` passou no mesmo HEAD:

- build da imagem de produção e inventário comprovando que `row_processor.rb` está na imagem e probes de teste não estão;
- banco novo, migration pendente sobreposta, `/ready`, `/up`, restart idempotente e worker ativo;
- arquivo Active Storage carregado pelo web e lido pelo worker após restart, no volume compartilhado;
- 18/18 cenários production-like; banco PostgreSQL deliberadamente indisponível encerrou o web sem servir porta, como esperado;
- os recursos temporários foram removidos pelo cleanup isolado do gate. Um projeto manual de diagnóstico também foi encerrado com `down --volumes --remove-orphans` antes deste registro.

As correções finais do próprio gate foram: ordenar a migration fictícia após o schema atual (`043cba6`) e passar `SECRET_KEY_BASE` ao worker do overlay de entrega (`97261e1`). Ambas foram revalidadas pelo gate de entrega e pelo `bin/check` no HEAD acima.

## Evidência de qualidade vigente

`bin/check`, reexecutado com `VERIFICATION_SHA=02da120ce69f9d3fc9bfb752e92c26baad17c5d9`, passou integralmente:

- RSpec paralelo: 48 + 44 = **92 exemplos**, zero falhas, em `umanni_test` e `umanni_test2` isolados;
- cobertura Ruby: 766/804 linhas, **95,27%**;
- RuboCop: 97 arquivos, zero infrações; Brakeman 8.0.6: zero alertas;
- Vitest: **23/23**, cobertura TypeScript de linhas **95,85%** (89,94% statements);
- Playwright: **66/66** nos seis perfis Chromium/Firefox/WebKit e desktop/mobile, incluindo envio CSV, worker real, estado terminal persistido, configuração única de senha inicial sem exposição do segredo, login da conta importada e negação HTTP 403 para conta regular.

`bin/check-delivery` passou novamente no mesmo HEAD: a imagem de produção contém os componentes de importação necessários, o web e o worker executam sem root, o volume de Active Storage é compartilhado e continua legível após restart, migrations pendentes são aplicadas, `/ready` e `/up` respondem conforme contrato e a indisponibilidade deliberada do PostgreSQL impede o web de servir porta. Os 18 cenários production-like passaram e os recursos isolados foram removidos pelo cleanup do gate.

## Correções da revisão independente — rodada 1

A revisão independente Luna/high no PR #27 analisou `bbba69cd8326869945b11264af7dfc2b37329eab`, publicou a review `5225805017`, abriu F-019-001 a F-019-008 e marcou `review-ledger=failure`. O commit corretivo `6d7d8b45253c1e1091a2d4d36d378f423682bed9` tratou os achados dentro da allowlist:

- batches recebem lock/transação curta cada um; a observação por outra conexão e a interrupção entre o primeiro e o segundo batch comprovam 100 resultados já confirmados antes da falha posterior;
- a rota aponta para `set_initial_password`, chama o serviço por keyword e o serviço recarrega sob lock, exige senha/confirmação e aplica a política do `User`;
- a exaustão da terceira tentativa de `ActiveRecord::ConnectionFailed` marca `failed/retry_exhausted` e invalida o stream; o teste prepara a contagem de tentativas do Active Job e exercita o callback real;
- preflight compara extensão, MIME declarado, MIME detectado e assinatura; CSV interrompe no primeiro dado acima do limite e XLSX classifica números/erros como `malformed_row` usando packages XLSX reais de teste;
- o logout já destruía a `Session`, cujo callback desconecta `remote_connections` por usuário. O novo request spec cobre a rota de logout com socket aberto, preservando esse contrato existente em vez de duplicar a desconexão.

No mesmo HEAD de código, `bin/check` passou com 48 + 44 = **92 exemplos RSpec**, 766/804 linhas Ruby (**95,27%**), 97 arquivos RuboCop sem infrações, Brakeman sem alertas, Vitest 20/20 e Playwright 60/60. `bin/check-delivery` passou outra vez, incluindo imagem, web/worker, volume compartilhado, restart, migration pendente, 18 cenários production-like e banco indisponível.

## Correções da revisão independente — rodada 2

A revisão seguinte no HEAD documental `fdc676c` abriu F-019-009 a F-019-012. Esta rodada separa a evidência histórica do estado vigente e fecha os três comportamentos faltantes sem introduzir rotas ou recursos adicionais:

- a evidência acima identifica separadamente o HEAD inicial `97261e1`, a correção de código `6d7d8b4` e o HEAD vigente `02da120`;
- a tela de edição recebe apenas `passwordConfigured`, derivado de `password_digest` no servidor. Quando esse booleano é falso, mostra campos com rótulos acessíveis para senha inicial e confirmação; o segredo nunca volta em props, HTML, logs ou resultados;
- os testes de interface cobrem a presença do formulário apenas para contas sem credencial; os testes Playwright exercitam o fluxo administrativo inteiro com o worker real e a negação a conta regular;
- todos os estados internos do lote são convertidos para texto em português antes da renderização.

## Segurança, acessibilidade e limites

- Brakeman não reportou alertas; o identificador de stream é convertido estritamente antes da consulta, evitando interpolação de entrada em SQL.
- Nenhuma prop, log ou resultado persiste senha, célula bruta, fórmula ou stack trace. Erros de linha usam códigos públicos enumerados.
- As páginas seguem o layout administrativo existente, usam foco no título, mensagens associadas e controles navegáveis/responsivos; a matriz Playwright de seis perfis passou.
- A validação ocorreu em Docker Desktop Linux arm64. A imagem declara base multi-plataforma, mas amd64 não foi executado nesta sessão.

## Próxima transição obrigatória

Publicar o HEAD documental final no PR #27 e solicitar à mesma revisora uma nova revisão independente do novo SHA. Somente a revisora resolve as doze threads depois de verificar cada resposta e a reexecução dos gates. O candidato só pode seguir para integração depois de `review-ledger=success`, `code-reviewed`, checks verdes e zero threads abertas. Esta execução não cria tag, Release, merge ou fechamento de milestone.

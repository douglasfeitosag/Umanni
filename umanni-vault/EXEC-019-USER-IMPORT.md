# EXEC-019 — Importação de usuários 0.4.0

**Estado**: implementação e gates técnicos concluídos no HEAD indicado; publicação, revisão independente, integração e release ainda não ocorreram.

**Papel/modelo**: EXECUTORA Codex, identificada como GPT-5, sem variante exata exposta.

**Spec e plano**: `specs/019-user-import/`.

**Base autorizada**: merge do PR documental #26 em `origin/main`.

**Branch**: `codex/019-user-import-app`.

**PR**: [#27](https://github.com/douglasfeitosag/Umanni/pull/27), milestone aberto `0.4.0`.

**HEAD técnico validado**: `97261e1868ed901bf02eee33708d2d036bc42b38`.

## Gate inicial e escopo

- O PR documental #26 estava integrado antes da primeira alteração de aplicação. A execução permaneceu na allowlist do plano: dependências, migrations, imports, worker/Compose, testes/gates e os quatro documentos previstos.
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

## Evidência de qualidade no HEAD técnico

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

## Segurança, acessibilidade e limites

- Brakeman não reportou alertas; o identificador de stream é convertido estritamente antes da consulta, evitando interpolação de entrada em SQL.
- Nenhuma prop, log ou resultado persiste senha, célula bruta, fórmula ou stack trace. Erros de linha usam códigos públicos enumerados.
- As páginas seguem o layout administrativo existente, usam foco no título, mensagens associadas e controles navegáveis/responsivos; a matriz Playwright de seis perfis passou.
- A validação ocorreu em Docker Desktop Linux arm64. A imagem declara base multi-plataforma, mas amd64 não foi executado nesta sessão.

## Próxima transição obrigatória

Publicar o HEAD documental final no PR #27 e iniciar revisão independente `gpt-5.6-luna`/high em contexto novo. Se houver achado, somente a revisora resolve a thread depois da correção e da nova revisão do HEAD. O candidato só pode seguir para integração depois de `review-ledger=success`, `code-reviewed`, checks verdes e zero threads abertas. Esta execução não cria tag, Release, merge ou fechamento de milestone.

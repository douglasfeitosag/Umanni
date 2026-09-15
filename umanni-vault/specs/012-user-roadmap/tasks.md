# Tarefas 012 — Roadmap de identidade, usuários e importação

Entrada: [spec](spec.md) e [plano](plan.md). Este documento é um ledger de planejamento; somente T001–T006 pertencem ao presente pacote documental, com destino `Backlog`. Os blocos I, M e B são tarefas futuras e não podem ser executados a partir desta branch.

## Pacote documental atual — `Backlog`

- [x] T001 Revalidar checkout, `main`, `v0.2.1`, Backlog e issue #9 antes de alterar o roadmap.
- [x] T002 Ler o teste fixado, B001–B007, a arquitetura e os contratos visuais sem tratar o protótipo como regra de produção.
- [x] T003 Comparar três cenários para cada decisão de credencial, ativação, primeiro administrador, autorização, avatar, importação e backlog; registrar a escolha e a consequência.
- [x] T004 Criar spec, plano, tarefas e checklist para os blocos de execução, com versões, branches, BDD, critérios de aceite e parada.
- [ ] T005 Publicar o planejamento para revisão independente, responder achados somente nas threads da revisora e exigir `review-ledger=success`, `spec-reviewed` e zero threads abertas no HEAD exato.
- [ ] T006 Após aceite, produzir em novo artefato o prompt de execução de `codex/013-identity-access`, sem modificar este HEAD aceito; uma nova revisão será exigida se o prompt for versionado.

## Bloco I — Identidade e acesso — `0.3.0`, `codex/013-identity-access`

- [ ] I001 Revalidar a base integrada do roadmap, criar a branch 013 e abrir PR com milestone 0.3.0, label coerente e Douglas responsável.
- [ ] I002 Escrever os testes RED dos sete BDDs de identidade/acesso antes de gerar ou copiar código de autenticação.
- [ ] I003 Executar o gerador nativo Rails de autenticação somente em diretório temporário, revisar o inventário e incorporar a superfície mínima; não instalar Devise ou substituto.
- [ ] I004 Criar schema/migrations de `User`, índices de unicidade, papéis, validações e o comando seguro/idempotente do primeiro administrador; obter GREEN focalizado.
- [ ] I005 Implementar registro regular, sessão, logout e redirecionamento por papel, preservando CSRF e sem e-mail, convite ou recuperação de senha.
- [ ] I006 Implementar políticas/escopos no servidor, perfil próprio, exclusão própria, CRUD administrativo, alteração de papel e proteção do último administrador; provar tentativas forjadas.
- [ ] I007 Implementar avatar Active Storage e suas validações, fallback visual e mensagens interativas, sem URL remota ou SVG.
- [ ] I008 Implementar páginas Inertia/React responsivas de login, cadastro, perfil, dashboard e usuários usando a identidade visual aprovada; não migrar o protótipo nem copiar seus dados fictícios.
- [ ] I009 Adicionar testes RSpec, Vitest/RTL e Playwright para os BDDs, entradas inválidas, XSS, XSRF, SQLi, enumeração, upload e breakpoints; executar ciclos RED/GREEN reais.
- [ ] I010 Atualizar README em inglês, STATUS, EXEC e evidências; executar `bin/check`, prova Compose limpa e registrar resultados reais no SHA testado.
- [ ] I011 Publicar commits coesos/PR, iniciar automaticamente a revisora Luna high em contexto novo após validação, responder achados, obter novo review do HEAD final e parar antes de merge.

## Bloco M — Importação de usuários — `0.4.0`, `codex/015-user-import`

- [ ] M001 Revalidar `v0.3.0` integrada e criar a branch 015; pesquisar/fixar a biblioteca XLSX compatível sem alterar o stack antes do plano aceito.
- [ ] M002 Escrever RED dos cinco BDDs de importação, incluindo tamanho, cabeçalhos, linhas mistas, repetição e autorização de leitura/canal.
- [ ] M003 Criar schema de lote, arquivo Active Storage, estado, contadores e relatório seguro; manter usuário/importador e progresso persistidos.
- [ ] M004 Implementar leitores CSV/XLSX e serviço de validação/criação por linha; aplicar limites, normalização de e-mail, rejeição de duplicidade e nenhuma atualização implícita.
- [ ] M005 Enfileirar somente após commit, executar em Solid Queue e tornar a repetição segura pela restrição do banco e pelos contadores persistidos.
- [ ] M006 Emitir e autorizar atualizações Solid Cable, implementar tela Inertia/React de envio/acompanhamento e recuperação por recarregamento, sem polling ou Redis.
- [ ] M007 Cobrir job, leitores, serviço, requests, canal e navegador; executar RED/GREEN, `bin/check` e prova Compose limpa com CSV e XLSX reais de teste.
- [ ] M008 Atualizar README/STATUS/EXEC, publicar PR e iniciar automaticamente revisão Luna high no HEAD final; parar antes de merge.

## Bloco B — Backlog explícito

- [ ] B004 Criar spec independente para CI, ledger e runner antes de instalar runner ou workflow; branch prevista `codex/017-ci-runner-isolation`.
- [ ] B005 Criar spec somente se Douglas selecionar SSR, Kamal ou ZJIT como extra; branch prevista `codex/018-optional-platform`.
- [ ] B006 Manter a issue #9 no Backlog até priorização explícita; branch prevista `codex/019-branding-slogan`.

## Rastreabilidade

| Fonte | Destino |
| --- | --- |
| RF-01, RF-02 | I002–I005 |
| RF-03, RF-04, RF-05, RF-08, RF-09 | I002, I004, I006–I009 |
| RF-06, RF-07 | M002–M008 |
| B001 | I003–I005 |
| B002 e B007 | I004, I006–I009 |
| B003 | M001–M008 |
| B004–B006 | bloco B |

## Condição de parada

Nenhuma I/M/B começa sem sua versão-base integrada, spec/plan/tasks aceitos, prompt próprio e sessão de executora. Falha de gate, requisito do teste ainda não mapeado, dependência que force e-mail/convite ou modificação fora do bloco devolve uma pergunta concreta à condutora.

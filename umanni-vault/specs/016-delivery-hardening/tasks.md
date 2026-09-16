# Tarefas 016 — Robustez da entrega local 0.3.1

Entrada: [spec](spec.md), [plano](plan.md), [pesquisa](research.md) e [contrato](contracts/delivery-recovery.md). Tarefas P pertencem a esta entrega documental; tarefas E pertencem somente à execução futura após aceite formal.

## Planejamento documental — `codex/016-delivery-hardening`

- [x] **P001 — base** Ler governança obrigatória e confirmar checkout limpo em `a3b53ee`, igual a `origin/main`, após publicação da 0.3.0.
- [x] **P002 — milestone** Revalidar o milestone 0.3.1 aberto com exatamente #18/#19 abertas, responsáveis/labels e dependência #19→#18; confirmar ausência de outros ajustes.
- [x] **P003 — diagnóstico** Inspecionar entrypoint, Compose, `/up`, produção, Inertia, suites e imagem sem alterar aplicação.
- [x] **P004 — pesquisa** Confrontar o diagnóstico com documentação oficial Rails 8.1, Inertia Rails e Docker Compose.
- [x] **P005 — decisões** Fechar D-032–D-035 mediante três cenários cada, preservando escopo local, liveness, status existentes e recuperação sem replay.
- [x] **P006 — artefatos** Escrever spec, plano, tarefas, pesquisa, contrato, checklist e prompt futuro com BDD/TDD, aceite, allowlist e parada.
- [ ] **P007 — validação** Executar análise estrutural/consistência, links, Markdown e `git diff --check`; corrigir somente documentação.
- [ ] **P008 — publicação** Criar commits documentais coesos, push e PR com milestone 0.3.1, label `documentation` e Douglas responsável.
- [ ] **P009 — revisão** Iniciar revisora independente `gpt-5.6-luna` high sem contexto autoral; tratar achados em threads e obter `review-ledger=success`, `spec-reviewed` e zero threads abertas no HEAD exato.
- [ ] **P010 — entrega** Reportar PR documental revisado a Douglas e parar antes de execução, merge, tag ou Release.

## Execução futura — branch/PR próprios da 0.3.1

- [ ] **E001 — gate** Confirmar spec 016 aceita no HEAD exato, base remota, milestone #6 com somente #18/#19, branch/PR e allowlist; registrar SHA e parar em divergência.
- [ ] **E002 — startup RED** Automatizar projeto Compose isolado sem `umanni_production` e capturar a falha atual: `/up` saudável enquanto cadastro alcança banco ausente; cleanup obrigatório.
- [ ] **E003 — entrypoint RED/GREEN** Provar flag ausente/válida/inválida, ordem `db:prepare`→servidor, propagação de falha e `exec`; implementar gate opt-in mínimo.
- [ ] **E004 — readiness RED/GREEN** Provar consulta real, migrations prontas, 503 sanitizado e `/up` intacto; implementar endpoint/controlador isolado e apontar somente healthcheck `delivery`.
- [ ] **E005 — Compose GREEN #18** Reexecutar banco ausente, migration pendente, reinício idempotente e dependência falha; comprovar que tráfego só inicia após preparo e cadastro inválido retorna 422.
- [ ] **E006 — exceções RED** Adicionar fixture/rota somente de teste e specs falhando para HTML/Inertia 5xx, status, MIME inválido, ausência de shares/segredos e regressão 403/404/422.
- [ ] **E007 — serviço GREEN #19** Implementar exceptions app 5xx dedicada, delegação não-5xx e documentos HTML/Inertia mínimos sem consulta ao banco.
- [ ] **E008 — frontend RED/GREEN** Testar e implementar página de contingência em português, título, `h1` focado, ação ao início e ausência de retry/replay.
- [ ] **E009 — acessibilidade/sistema** Cobrir HTML/Inertia em Playwright, três engines, desktop/mobile, teclado, 200%, reduced motion, 44×44 e overflow; garantir que não aparece modal de resposta inválida.
- [ ] **E010 — segurança** Executar sentinelas em exceção/params/cookie/URL/ambiente; provar ausência em body, headers e logs e ausência de endpoint de debug em produção.
- [ ] **E011 — regressão** Rodar requests de cadastro 422, matriz 403/404, sessão/perfil/admin e `/up`; corrigir somente regressões causadas pela entrega.
- [ ] **E012 — gate final** Rodar testes focalizados, cobertura separada >=90%, `bin/check`, Compose isolado, inventário de imagem e `git diff --check` no mesmo SHA.
- [ ] **E013 — documentação** Atualizar README em inglês e STATUS/memória/`EXEC-016-DELIVERY-HARDENING.md` em português com comandos, RED/GREEN, resultados, cleanup, limitações e modelos reais.
- [ ] **E014 — publicação** Fazer commits coesos, push e PR com #18/#19 vinculadas, milestone 0.3.1, labels coerentes, Douglas responsável e HEAD local/remoto/PR idêntico.
- [ ] **E015 — revisão final** Iniciar automaticamente Luna high em contexto separado; responder achados nas threads, corrigir, republicar e obter nova revisão do HEAD, ledger verde, `code-reviewed` e zero threads abertas.
- [ ] **E016 — parada** Entregar resultado a Douglas sem merge, fechamento, auto-merge, tag, Release ou início de 0.4.0.

## Rastreabilidade

| Cenário | Evidência principal | Tarefas |
| --- | --- | --- |
| US1.1 banco ausente | script Compose isolado + cadastro inválido 422 | E002–E005 |
| US1.2 migration pendente | fixture/cópia controlada + ordem de logs/processo | E003–E005 |
| US1.3 falha fechada | exit code, porta indisponível, log sanitizado | E003/E005/E010 |
| US2.1 pronto | request readiness + health Compose | E004/E005 |
| US2.2 banco/schema indisponível | RSpec 503 + Compose unhealthy | E004/E005 |
| US2.3 isolamento | specs de entrypoint e smoke dev/test | E003/E011/E012 |
| US3.1 HTML 5xx | request production-like + busca negativa | E006/E007/E010 |
| US3.2 Inertia 5xx | request headers/page object + Playwright sem modal | E006–E009 |
| US3.3 403/404/422 | requests de regressão e cadastro | E006/E011 |
| US4.1 foco/semântica | RTL + Playwright teclado | E008/E009 |
| US4.2 reflow/motion/alvo | Playwright três engines/viewports | E009 |
| US4.3 sem replay | RTL/request/Playwright | E006/E008/E009 |

| Critério | Evidência final |
| --- | --- |
| SC-001–SC-003 | E002–E005, comandos/resultados no EXEC |
| SC-004–SC-007 | E006–E011, matriz de status/segurança/acessibilidade |
| SC-008 | E012, resultados no mesmo SHA |
| SC-009 | E014–E016, metadados/threads/checks do PR |

## Condição de parada

Nenhuma tarefa E começa antes do aceite remoto da spec/plan/tasks/prompt no mesmo HEAD. Qualquer expansão, dependência, migration, mudança de status 403/404/422, política fora do Compose local, falha de cleanup, segredo em saída ou gate indisponível interrompe a parte dependente e retorna pergunta concreta à condutora.

# Tarefas 019 — Importação de usuários 0.4.0

Entrada: [spec](spec.md), [plano](plan.md), [pesquisa](research.md) e [modelo](data-model.md).

## P — Planejamento desta branch

- [x] **P001** Ler governança e validar ao vivo `origin/main`, tag/Release `v0.3.1`, milestone 0.3.1 e PRs #23–#25.
- [x] **P002** Inventariar enunciado, roadmap 012, issues, milestones e aplicação publicada.
- [x] **P003** Confirmar lacunas reais: Solid Queue/worker e parser XLSX ausentes; senha inicial de importado indisponível.
- [x] **P004** Comparar dependências e decisões D-036–D-046; provar resolução isolada sem alterar o repositório.
- [x] **P005** Criar spec, pesquisa, modelo, plano, tarefas, checklist e prompt da futura executora.
- [x] **P006** Commitar/publicar o PR documental #26 com milestone 0.4.0, label `documentation`, Douglas responsável e HEAD exato.
- [ ] **P007** Iniciar revisora independente Luna/high, responder achados nas threads, corrigir e obter `review-ledger=success`, `spec-reviewed` e zero threads abertas.
- [ ] **P008** Entregar a Douglas o PR revisado e o prompt; parar sem merge nem execução.

## E — Futura execução em `codex/019-user-import-app`

- [ ] **E001 — gate** Revalidar base, PR documental, HEAD, checks, labels, threads, milestone 0.4.0 e issue #9 no Backlog.
- [ ] **E002 — dependências** Repetir spike temporário, adicionar/fixar Solid Queue/Roo, inventariar o instalador e configurar fila `imports` mínima.
- [ ] **E003 — RED preflight** Cobrir US1/US2 para CSV/XLSX, autorização, formato, assinatura, encoding, cabeçalhos, planilhas, bytes por arquivo/campo/linha e entradas maliciosas.
- [ ] **E004 — GREEN preflight/lote** Implementar readers, preflight, listas/constraints exaustivas, attachment e lote/job atômicos na conexão `primary`, com rollback de enqueue/crash e sem processamento síncrono de usuários.
- [ ] **E005 — RED processamento** Cobrir US3/US4: linhas mistas, papel default, duplicatas internas/externas/concorrentes, repetição, falhas entre blocos e contagem de broadcasts.
- [ ] **E006 — GREEN processamento** Implementar job/processador/resultados/contadores em blocos, lock por lote, retry limitado, supressão de métricas com escopo e estados terminais.
- [ ] **E007 — senha inicial** Cobrir e implementar US3.3 com lock pessimista e duas conexões, somente para conta sem credencial, preservando mensagem neutra e D-027.
- [ ] **E008 — RED/GREEN Cable** Cobrir US5, autorizar stream, emitir invalidações agregadas após commit, coalescer reload e revogar conexão.
- [ ] **E009 — interface** Implementar histórico, upload, detalhe, progresso e relatório paginado com acessibilidade/responsividade.
- [ ] **E010 — worker/Compose** Adicionar processo worker separado, volume `/rails/storage` compartilhado/ownership em dev/delivery, arquivos runtime no Dockerfile e gate US6 com leitura após restart/cleanup isolado.
- [ ] **E011 — segurança/qualidade** Executar matriz de ataques, cobertura, linters, Brakeman, build, RSpec paralelo, Vitest e Playwright nos perfis previstos.
- [ ] **E012 — entrega** Atualizar README/STATUS/memória, criar `EXEC-019-USER-IMPORT.md`, auditar diff/imagem e publicar commits/PR.
- [ ] **E013 — revisão** Iniciar automaticamente revisora Luna/high em contexto novo; corrigir achados no mesmo PR e obter aceite do HEAD final.
- [ ] **E014 — parada** Entregar a Douglas sem merge, fechamento, auto-merge, tag, Release, fechamento do milestone ou trabalho de Backlog.

## Rastreabilidade

| Requisito | Tarefas |
| --- | --- |
| US1/US2, FR-001–FR-004 | E002–E004, E011 |
| US3, FR-005–FR-006/FR-011 | E005–E007, E011 |
| US4, FR-007–FR-008/FR-012–FR-013 | E005–E006, E010–E011 |
| US5, FR-009–FR-010 | E008–E009, E011 |
| US6, NFR-006 | E002, E010–E012 |
| NFR-001–NFR-005/NFR-007–NFR-008 | E003–E013 |

## Condição de parada

Nenhuma tarefa E começa sem aceite remoto do planejamento no HEAD exato e base integrada. Qualquer necessidade fora da allowlist, decisão material nova ou gate indisponível retorna à CONDUTORA com pergunta concreta.

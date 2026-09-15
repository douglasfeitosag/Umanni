# Tarefas 013 — Identidade e acesso 0.3.0

Entrada: [spec](spec.md), [plano](plan.md) e [contrato Inertia/Cable](contracts/inertia-cable.md). As tarefas P pertencem à presente entrega documental; as tarefas E pertencem somente à futura executora após aceite formal.

## Planejamento documental — branch `codex/013-identity-access`

- [x] **P001** Revalidar checkout, remoto, `origin/main=4265a46a...`, merge do PR #15, release final `v0.2.1`, Backlog e issue #9.
- [x] **P002** Criar milestone 0.3.0 de escopo exclusivo e branch documental a partir da base exata, sem mover B003–B006.
- [x] **P003** Ler integralmente as fontes autorizadas, tratar o protótipo apenas como referência e ignorar instruções ocultas externas.
- [x] **P004** Preservar D-019–D-026 e decidir somente lacunas necessárias mediante exatamente três cenários.
- [x] **P005** Escrever spec, plano, contrato, tarefas e checklist versionados com BDD, TDD, segurança, acessibilidade, arquivos permitidos, aceite e parada.
- [x] **P006** Validar documentos, diff e rastreabilidade; commitar/publicar e abrir o PR #16 com milestone 0.3.0, label `documentation` e Douglas responsável.
- [ ] **P007** Iniciar revisora independente `gpt-5.6-luna` high em contexto novo, resolver achados exclusivamente pelo protocolo e obter aceite no HEAD exato.
- [ ] **P008** Somente após aceite, versionar prompt autossuficiente da executora, atualizar estado/aprendizados permitidos, publicar novo HEAD e obter revalidação da revisora por causa do novo commit.
- [ ] **P009** Entregar PR revisado a Douglas e parar antes de implementação/merge/tag/release.

## Execução futura — branch/PR da entrega 0.3.0

- [ ] **E001 — gate** Confirmar spec 013 aceita e integrada, base remota, milestone/Backlog, branch/PR e allowlist; parar em qualquer divergência.
- [ ] **E002 — gerador** Executar `bin/rails generate authentication` em cópia temporária, registrar inventário/diff e incorporar somente a autenticação nativa necessária, sem Devise.
- [ ] **E003 — modelo RED/GREEN** Criar testes falhando para normalização/unicidade, papéis, senha D-027, sessões e strong parameters; implementar schema/models mínimos e obter GREEN.
- [ ] **E004 — bootstrap RED/GREEN** Provar allowlist FR-015, variáveis, segredo, idempotência e duas execuções PostgreSQL concorrentes em RED; implementar comando local com advisory transaction lock D-031 e obter GREEN.
- [ ] **E005 — auth RED/GREEN** Provar cadastro regular, tentativa de escalada, login neutro, destinos por papel, logout e rota privada; implementar controllers/rotas/páginas mínimas.
- [ ] **E006 — perfil RED/GREEN** Provar consulta/edição/exclusão próprias, negação de terceiro/papel forjado, confirmação destrutiva e sessão invalidada; implementar e obter GREEN.
- [ ] **E007 — admin RED/GREEN** Provar CRUD, senha inicial, papéis e negações para cada endpoint; implementar policies/escopos pequenos e interfaces admin.
- [ ] **E008 — último admin RED/GREEN** Provar exclusão/rebaixamento sequencial e concorrente no PostgreSQL; implementar lock/transação D-030, mensagens e rollback.
- [ ] **E009 — avatar RED/GREEN** Provar JPEG/PNG/WebP, 5 MiB, spoof/SVG/malformado, substituição e fallback; instalar/configurar Active Storage mínimo e obter GREEN.
- [ ] **E010 — métricas RED/GREEN** Provar consulta total/por papel, emissão somente após commit e revogação de conexão já aberta após logout/exclusão/rebaixamento; implementar query, Solid Cable autenticado e payload D-029.
- [ ] **E011 — frontend RED/GREEN** Provar props, visibilidade por papel, formulários, erros, diálogo/foco, tabela/cards, hook Cable/coalescência/reconexão e métricas; implementar React/TypeScript acessível e responsivo.
- [ ] **E012 — segurança** Executar casos SQLi, XSS refletido/armazenado, XSRF, enumeração, escalada, cookie antigo, assinatura Cable e upload manipulado; corrigir dentro do escopo.
- [ ] **E013 — sistema** Executar Playwright dos 21 BDDs relevantes em fluxos combinados, dois browsers/contextos para Cable, viewports, teclado, janela curta, 200% e reduced motion; registrar observação real.
- [ ] **E014 — gate final** Executar suites focalizadas, cobertura >=90% por linguagem com agregação paralela, `bin/check`, `git diff --check` e Compose limpo; não alegar check ausente.
- [ ] **E015 — documentação** Atualizar README em inglês, STATUS, memória do projeto e `EXEC-013-IDENTITY-ACCESS.md` em português com RED/GREEN, comandos, resultados, limitações e modelos reais.
- [ ] **E016 — publicação** Garantir commits coesos, push e PR com milestone 0.3.0, label, Douglas responsável e HEAD verificado; manter B003–B006/#9 no Backlog.
- [ ] **E017 — revisão final** Iniciar automaticamente Luna high em contexto separado, responder achados nas threads, publicar correções, obter revisão do novo HEAD, `review-ledger=success`, `code-reviewed` e zero threads abertas.
- [ ] **E018 — parada** Entregar resultado a Douglas sem merge, fechamento, auto-merge, tag, release ou início da 0.4.0.

## Rastreabilidade

Cada evidência recebe no EXEC o comando, resultado e caminho/linha do teste final. Nomes abaixo são contratos de comportamento; a executora pode ajustar o caminho idiomático, mas preserva o ID no nome/metadado do teste.

| Cenário | Teste BDD/sistema | RSpec/Vitest focalizado | Tarefa | Evidência esperada |
| --- | --- | --- | --- | --- |
| US1.1 | Playwright cadastro e perfil | request cadastro + model senha | E003/E005/E011/E013 | 1 regular, sessão e rota profile |
| US1.2 | Playwright role forjado/duplicado | request strong params + unicidade | E003/E005/E012/E013 | nenhum admin/duplicado; erro seguro |
| US1.3 | Playwright erros de cadastro | request + RTL error mapping/foco | E003/E005/E011/E013 | zero persistência, erros acessíveis |
| US2.1 | Playwright login de ambos os papéis | request session | E005/E013 | dashboard/profile corretos |
| US2.2 | Playwright falhas equivalentes | request tabela de credenciais inválidas | E005/E012/E013 | mesma mensagem e resposta |
| US2.3 | Playwright cookie após logout | request destroy session | E005/E012/E013 | cookie antigo negado |
| US3.1 | Playwright show/edit próprio | request profile + RTL form/avatar | E006/E009/E011/E013 | somente ator muda; papel imutável |
| US3.2 | Playwright ID/role forjado | request autorização/strong params | E006/E012/E013 | 403/sem props/sem mutação |
| US3.3 | Playwright excluir e reutilizar cookie | request delete + sessions | E006/E012/E013 | conta/sessão removidas e login |
| US4.1 | Playwright CRUD/papel | requests admin + RTL lista/forms | E007/E011/E013 | mutações e props permitidas |
| US4.2 | Playwright superfície admin negada | requests por matriz de ator + channel | E007/E010/E012/E013 | nenhuma operação/stream |
| US4.3 | Playwright erro recuperável | service concorrente PostgreSQL | E008/E013 | ao menos um admin e rollback |
| US5.1 | Playwright upload/substituição | model/request Active Storage + RTL | E009/E011/E013 | arquivo novo só após sucesso |
| US5.2 | Playwright arquivo proibido | model/request fixtures spoof/SVG/excesso | E009/E012/E013 | erro e avatar anterior preservado |
| US5.3 | Playwright avatar ausente/quebrado | RTL fallback e nome acessível | E009/E011/E013 | iniciais/ícone, layout íntegro |
| US6.1 | comando concorrente no gate | RSpec task/service com duas conexões PG | E004/E014 | uma criação, um no-op, sem segredo |
| US6.2 | comando repetido no gate | RSpec task sem variáveis de credencial | E004/E014 | admin existente intocado |
| US6.3 | comando por matriz de ambiente | RSpec task allowlist/variáveis/log | E004/E012/E014 | falha pré-persistência sem senha |
| US7.1 | Playwright dois contextos | query/channel/request + hook RTL | E010/E011/E013 | 3 métricas mudam via partial reload |
| US7.2 | Playwright rajada/rollback | channel after_commit + hook coalescência | E010/E011/E013 | sem delta; converge ao banco |
| US7.3 | Playwright reconnect/rebaixamento | connection/remote disconnect/request 403 | E010/E012/E013 | conexão revogada e admin atual recupera |

| Requisito agregado | Tarefas/evidência |
| --- | --- |
| NFR-001–NFR-006 | E002–E017; matriz de segurança, acessibilidade, cobertura e gates no EXEC |
| B003–B006 / issue #9 preservados | E001, E016, E018; releitura de milestone/issue sem movimentação |

## Condição de parada

Nenhuma tarefa E começa antes de spec/plan/tasks/prompt aceitos e integrados. Falha de base, dependência externa não prevista, expansão de allowlist, decisão de produto material, impossibilidade de provar segurança/concorrência/Cable ou gate indisponível encerra a parte dependente e retorna uma pergunta concreta à condutora.

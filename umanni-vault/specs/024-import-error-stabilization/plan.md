# Plano de implementação: estabilização da importação e das telas de erro

**Branch de planejamento**: `codex/024-import-error-stabilization`
**Versão-alvo**: candidata `1.1.0` (milestone 9)
**Spec**: [spec.md](spec.md)
**Base de implementação**: `f4afda9ebce52380fce952429c624c607e982ad9`

## Decisão de entrega

As quatro falhas serão quatro patches coesos, cada um com branch, PR, evidência e revisão próprios. Eles são correções de estabilização da candidata `1.1.0`, ainda não publicada; portanto não é apropriado criar quatro versões ou Releases. Os patches 025 e 027 nascem da base candidata; 026 e 028 nascem, respectivamente, depois das integrações autorizadas de 025 e 027 para não disputar os mesmos arquivos. Todos têm como alvo a branch da candidata. Depois de integrados sob autorização, o HEAD combinado precisa de nova revisão independente antes de qualquer merge final, tag ou Release.

| Patch | Branch | Limite de mudança | Dependência |
| --- | --- | --- | --- |
| P1 | `codex/025-import-layout-spacing` | Layout do formulário/histórico e testes visuais | nenhuma |
| P2 | `codex/026-import-upload-validation` | Validação cliente/servidor de upload e alertas previstos | P1 integrado autorizadamente à candidata, pois ambos alteram `UserImports/Index` e seu teste |
| P3 | `codex/027-error-return-home` | Contrato de destino da tela `Errors/Show` | nenhuma |
| P4 | `codex/028-authorization-error-view` | Respostas 403 HTML/Inertia e superfície segura | P3 integrado autorizadamente à candidata, pois reutiliza o contrato de erro/destino |

## Contexto técnico

| Área | Estado atual | Decisão planejada |
| --- | --- | --- |
| Importação | `UserImportsController#create` usa `params.require(:user_import).fetch(:source_file)` | Extrair acesso defensivo ao upload; ausência é erro de domínio/UI 422, não exceção de parâmetros. |
| Interface | `.field-hint` usa margem superior negativa e a página não tem agrupamento próprio de importação | Criar seletor específico para preservar o ritmo do formulário sem alterar campos não relacionados. |
| Erro seguro | `Errors/Show` fixa `href="/"`; fallback 5xx não lê sessão por segurança | Derivar prop explícita de retorno do escopo permitido da rota de origem; a rota de destino valida sessão normalmente, sem cookie no fallback. |
| Autorização | `Admin::BaseController#require_admin` responde `head :forbidden`; URL `/admin/*` não casada falha antes do controller | Renderizar/serializar 403 com o mesmo contrato visual seguro e adicionar rota catch-all administrativa: regular recebe 403 seguro, admin preserva 404. |

**Stack**: Rails 8.1.3.1, React/Inertia, TypeScript, CSS, RSpec, Vitest/Testing Library e Playwright.
**Dados**: nenhum schema ou migração.
**Risco principal**: não transformar exceções inesperadas em resposta de validação e não usar cookie/sessão no fallback de emergência.

## Checagem da Constituição

| Princípio | Resultado antes do desenho | Resultado após o desenho |
| --- | --- | --- |
| I. Especificação antes da execução | PASS — há requisitos, critérios e parada | PASS — tarefas proíbem código antes da revisão dos artefatos |
| II. Comportamentos e testes | PASS — BDD e RED/GREEN previstos por patch | PASS — RSpec/Vitest/Playwright distinguem normal, 422, 403 e 5xx |
| III. Arquitetura e escopo mínimo | PASS — usa Rails/Inertia e componentes existentes | PASS — sem nova dependência, serviço especulativo ou mudança de dados |
| IV. Entregas auditáveis | PASS — quatro patches e evidência própria | PASS — EXEC, checks e revisão por HEAD são tarefas explícitas |
| V. Controle humano | PASS — não há integração/publish automático | PASS — merge/tag/Release seguem bloqueados até autorização específica |
| VI. Privacidade e entrega local | PASS — mensagens neutras e fallback sem sessão | PASS — testes usam sentinelas para confirmar ausência de vazamento |
| VII. Revisão independente | PASS — revisão de planejamento antecede código | PASS — revisão Luna/high por patch e re-revisão do candidato são obrigatórias |
| VIII. Gestão de versões | PASS — destino `1.1.0` explícito | PASS — nenhum novo versionamento até finalização conjunta |

## Pesquisa e decisões

Ver [research.md](research.md). O ponto decisório é separar erro esperado de entrada/enfileiramento (422/alerta de formulário) de exceção não classificada (fallback seguro 5xx), evitando tanto a página de erro para erro de usuário quanto o mascaramento de defeito real.

## Contratos e superfícies

- [Contrato de upload](contracts/upload-validation.md): entrada sem arquivo, erros previstos e invariantes de persistência.
- [Contrato de erro](contracts/error-surface.md): status, props e destino seguro para 403/500 em HTML e Inertia.
- [Modelo de dados](data-model.md): nenhum dado persistente novo; descreve props transitórias e seus limites.

## Estrutura de arquivos prevista

```text
app/controllers/admin/user_imports_controller.rb     # P2: upload ausente e falhas previstas
app/controllers/admin/base_controller.rb             # P4: ponto de negação administrativa
app/services/delivery_exceptions_app.rb              # P3/P4: contratos seguros de resposta
app/frontend/pages/Admin/UserImports/Index.tsx       # P1/P2: composição e guarda no cliente
app/frontend/pages/Errors/Show.tsx                   # P3/P4: destino e conteúdo seguro
app/frontend/styles/application.css                  # P1: ritmo específico de importação
spec/requests/user_imports_spec.rb                   # P2
spec/requests/security_spec.rb                       # P4
spec/integration/delivery_errors_spec.rb             # P3/P4
app/frontend/pages/Admin/UserImports/Index.test.tsx # P1/P2
app/frontend/pages/Errors/Show.test.tsx              # P3/P4
spec/e2e/user_imports.spec.ts                         # P1/P2
spec/delivery/delivery_errors.spec.ts                 # P3/P4
```

## Estratégia por patch

### P1 — layout (`025`)

1. Escrever teste de componente que mantenha dica, ação e histórico em regiões distintas; adicionar cenário Playwright de largura/ampliação.
2. Substituir o uso acidental de margem negativa apenas no formulário de importação e criar espaçamento entre ação e histórico.
3. Verificar contraste, foco, 320 px e 200% de fonte sem alterar a regra global de avatar ou campos existentes.

### P2 — upload sem arquivo (`026`)

1. RED no Vitest: submissão sem arquivo não chama `post`, anuncia erro e foca o input. RED no RSpec: corpo sem `user_import` e corpo sem `source_file` retornam o contrato 422 e não persistem nada.
2. Implementar guard explícito do cliente com `#source-file-error` e `aria-describedby="source-file-hint source-file-error"` enquanto houver erro, e extração defensiva no controlador.
3. Classificar somente `UserImports::Enqueue::Failed` como falha de enfileiramento recuperável; resultados do preflight já são valores de domínio. Exceções `ActiveRecord` e não classificadas atravessam para o fallback 5xx seguro.

### P3 — retorno contextual (`027`)

1. RED para props/destino de admin, regular e visitante, incluindo o fallback de emergência sem acesso a cookie.
2. Adicionar prop de retorno segura derivada somente de escopo de rota permitido (`/admin/*`, `/profile`, público) e preservar o fallback isolado de cookies.
3. Atualizar `Errors/Show` para consumir somente o destino recebido, com link normal e sem repetir a operação falha.

### P4 — 403 estilizado (`028`)

1. RED para admin negado por HTML e Inertia: status 403, componente/documento seguro e ausência de sentinelas técnicas.
2. Trocar `head :forbidden` pela superfície de erro prevista e acrescentar rota catch-all/controle administrativo para que a pessoa regular receba o mesmo 403 em URL casada ou não casada; a administradora preserva 404 para rota inexistente.
3. Integrar ao contrato de P3 sem relaxar o isolamento do fallback 5xx nem alterar autorização server-side; testar requisições Rails reais HTML e Inertia, não somente chamada isolada do serviço.

## Checkpoints e ordem

1. Publicar esta documentação e obter revisão independente de spec/plano/tarefas no HEAD exato.
2. Executar P1 e P3 em paralelo apenas depois do aceite documental; cada um abre PR próprio contra a candidata.
3. Executar P2 somente depois de P1 ser revisado e integrado autorizadamente à candidata; então criar 026 a partir desse novo HEAD, eliminando conflito em `UserImports/Index` e no teste do componente.
4. Executar P4 somente depois de P3 ser revisado e integrado autorizadamente à candidata; então criar 028 a partir desse novo HEAD, para evitar contratos concorrentes no componente de erro.
5. Para cada patch: RED relevante → implementação mínima → GREEN → refatoração explícita (nomes, duplicação, contrato e testes) → checks focados → `bin/check` quando aplicável → documentação/EXEC → revisão independente Luna/high.
5. Após todos os patches revisados e autorizadamente integrados à candidata, reexecutar os gates e obter nova revisão exata do conjunto antes de solicitar autorização de merge/publicação de `1.1.0`.

## Condições de parada técnicas

- Não mudar `DeliveryExceptionsApp.safe_html_env` para permitir cookie, autorização ou sessão no fallback de emergência; o retorno contextual vem apenas da classificação permitida da rota de origem.
- Não responder 200, redirect de sucesso, ou 422 para uma exceção inesperada somente para esconder o problema.
- Não alterar 403 em 401, nem revelar se uma rota/recurso administrativo existe.
- Se P4 exigir reestruturar a autenticação ou o protocolo Inertia além do contrato documentado, interromper e pedir decisão.

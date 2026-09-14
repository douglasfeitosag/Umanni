# Estado vigente

Atualizado: 2026-09-14. Projeto: `/Users/douglas/Projects/Umanni`. O vault é a subpasta `umanni-vault/` do repositório; registros da conversa foram preservados aqui. Use este índice para distinguir estado atual de propostas históricas.

## Decidido

Umanni; entrega até 11/09/2026 no fim do dia, com dedicação parcial. Ruby 4+/Rails 8+, React/Inertia, TypeScript, Tailwind, PostgreSQL, autenticação Rails nativa, Solid Queue/Cable. RSpec, Vitest/React Testing Library e Playwright. MVC organizado por funcionalidade e serviços para orquestrações. Docker Compose local, sem hospedagem contratada. CI com runner no Mac. Documentação pública. Idiomas conforme D-012. Sessões abertas manualmente; merge/fechamento só por Douglas.

Branding: reprodução avaliativa da identidade pública da Umanni, sem autorização expressa e com aviso não oficial. Site principal prevalece sobre o blog editorial. Somente assinatura horizontal/símbolo azul, Montserrat dominante, Roboto em utilidades, paleta adaptada quando necessário para WCAG AA, Heroicons e tema claro. O tema escuro não integra a entrega por falta de evidência pública suficiente. Layout, estados e cinco composições estáticas estão fechados em `specs/001-branding/`.

## Entrega documental

Spec Kit 1.0.6 inicializado localmente para Codex. Constituição, README, protocolo, índices e spec/plano/tarefas documentais preparados. Validação e commit registrados em EXEC-000-DOCUMENTACAO.md. Nenhuma aplicação, CI, runner ou branding implementado; o bootstrap 11e47d2 foi publicado na main mediante autorização posterior de Douglas.

## Planejamento de branding

Briefing, pesquisa, spec, plano, contratos, tarefas e critérios preparados na branch `codex/001-branding` e publicados no PR #2, com label `documentation` e Douglas como responsável. A revisão Luna high sob a mesma conta publicou oito achados; após discussão e correção, todos foram confirmados. Como o GitHub não oferece `Request changes`/`Approve` da própria conta autora, a governança adotou `review-ledger` obrigatório, labels de estado e resolução exclusiva das threads pela revisora. Os comentários existentes com `\\n` literal foram corrigidos pela API. Nenhum asset ou componente foi criado. O prazo original de 11/09/2026 passou; não o apresentar como cumprido.

## Próxima tarefa

A revisora reconfirma o HEAD com o check obrigatório `review-ledger`, resolve as threads e aplica `spec-reviewed`. Depois Douglas abre a sessão executora **gpt-5.6-terra / high** e usa [[PROMPT-EXEC-001-BRANDING]]. A executora produz e valida somente `branding/` e `EXEC-001-BRANDING.md`, atualiza o PR e aguarda `code-reviewed`; merge e fechamento continuam reservados a Douglas.

## Pendências e momento de resolução

- Antes de executar branding: comprovar `review-ledger` obrigatório no SHA vigente, todas as threads resolvidas pela revisora e label `spec-reviewed`; depois seguir `specs/001-branding/` sem extrapolar.
- Proteção de `main`: configurada e relida pela API em 2026-09-14 com PR obrigatório, zero aprovações nativas, `review-ledger` obrigatório e estrito por SHA, conversas resolvidas, aplicação a administradores e bloqueio de force-push/exclusão. Labels `review-pending`, `changes-requested`, `spec-reviewed` e `code-reviewed` existem. Checks de entrega, automação do ledger e runner isolado ainda permanecem pendentes; o status manual do ledger não deve ser apresentado como workflow automatizado.
- Antes da estrutura de aplicação: versões compatíveis fixadas, Vite/gerenciador de pacotes, contratos Inertia, policy de cobertura e configuração do ambiente de testes; escolher skills/plugins estritamente úteis, conforme a etapa posterior ao branding.
- Antes dos fluxos de usuário: cadastro/ativação/senha inicial, importação CSV/XLSX (colunas, duplicidade, erros, limites e repetição), avatar, último administrador e matriz de autorização. Ver 05-LEITURA-DO-TESTE.
- Antes de instalar runner: runtime/isolamento, recursos, isolamento por PR e proteção da máquina em repositório público. Runner permanece no Mac.
- Antes da submissão: reconciliar modelos realmente usados no README, verificar todos os requisitos, confirmar instruções adicionais do avaliador e testar Compose do zero.

Essas pendências não foram resolvidas silenciosamente; bloqueiam os prompts que dependem delas. O plano detalhado de cada entrega deve incluí-las.

## Reorganização do vault

Entrega 002: notas, prompts, relatórios, specs e configuração Obsidian em umanni-vault; constituição canônica CONSTITUICAO.md. A branch `codex/002-organize-vault` foi integrada por Douglas na `main` pelo PR #1, commit `a98885f`. Ver [[EXEC-002-ORGANIZE-VAULT]] e [[PROMPT-COND-002-RETOMADA]].

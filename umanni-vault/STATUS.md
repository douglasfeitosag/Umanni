# Estado vigente

Atualizado: 2026-09-14. Projeto: `/Users/douglas/Projects/Umanni`. O vault é a subpasta `umanni-vault/` do repositório; registros da conversa foram preservados aqui. Use este índice para distinguir estado atual de propostas históricas.

## Decidido

Umanni; entrega até 11/09/2026 no fim do dia, com dedicação parcial. Ruby 4+/Rails 8+, React/Inertia, TypeScript, Tailwind, PostgreSQL, autenticação Rails nativa, Solid Queue/Cable. RSpec, Vitest/React Testing Library e Playwright. MVC organizado por funcionalidade e serviços para orquestrações. Docker Compose local, sem hospedagem contratada. CI com runner no Mac. Documentação pública. Idiomas conforme D-012. Sessões abertas manualmente; merge/fechamento só por Douglas.

Branding: reprodução avaliativa da identidade pública da Umanni, sem autorização expressa e com aviso não oficial. Site principal prevalece sobre o blog editorial. Somente assinatura horizontal/símbolo azul, Montserrat dominante, Roboto em utilidades, paleta adaptada quando necessário para WCAG AA, Heroicons e tema claro. O tema escuro não integra a entrega por falta de evidência pública suficiente. Layout, estados e cinco composições estáticas estão fechados em `specs/001-branding/`.

## Entrega documental

Spec Kit 1.0.6 inicializado localmente para Codex. Constituição, README, protocolo, índices e spec/plano/tarefas documentais preparados. Validação e commit registrados em EXEC-000-DOCUMENTACAO.md. Nenhuma aplicação, CI, runner ou branding implementado; o bootstrap 11e47d2 foi publicado na main mediante autorização posterior de Douglas.

## Planejamento de branding

Briefing, pesquisa, spec, plano, contratos, tarefas e critérios preparados na branch `codex/001-branding` e publicados no PR #2, com label `documentation` e Douglas como responsável. A revisão Luna high realizada sob o mesmo login publicou oito achados como `COMMENTED`, não como `Request changes`; sete usaram threads e um foi comentário geral. As correções e confirmações permanecem como evidência preparatória, mas não constituem a revisão formal agora exigida. Nenhum asset ou componente foi criado. O prazo original de 11/09/2026 passou; não o apresentar como cumprido.

## Próxima tarefa

Configurar uma identidade GitHub distinta para a revisora e repetir a revisão formal da spec com `Request changes` se houver achado ou `Approve` se o HEAD estiver limpo. Somente após aprovação formal Douglas abre a sessão executora **gpt-5.6-terra / high** e usa [[PROMPT-EXEC-001-BRANDING]]. A executora produz e valida somente `branding/` e `EXEC-001-BRANDING.md`, atualiza o PR e aguarda nova revisão; merge e fechamento continuam reservados a Douglas.

## Pendências e momento de resolução

- Antes de executar branding: obter no PR #2 revisão formal sob identidade GitHub distinta, com threads e `Request changes`/`Approve` conforme o resultado; depois seguir `specs/001-branding/` sem extrapolar.
- Antes do primeiro PR: a proteção base de `main` foi configurada e relida pela API do GitHub em 2026-09-14: PR com uma aprovação, descarte de aprovação obsoleta, conversas resolvidas, aplicação a administradores e bloqueio de force-push/exclusão. Checks obrigatórios, `review-ledger`, cobertura de comentários gerais, identidade independente e runner isolado ainda não foram implementados nem testados; portanto, o gate completo continua pendente.
- Antes da estrutura de aplicação: versões compatíveis fixadas, Vite/gerenciador de pacotes, contratos Inertia, policy de cobertura e configuração do ambiente de testes; escolher skills/plugins estritamente úteis, conforme a etapa posterior ao branding.
- Antes dos fluxos de usuário: cadastro/ativação/senha inicial, importação CSV/XLSX (colunas, duplicidade, erros, limites e repetição), avatar, último administrador e matriz de autorização. Ver 05-LEITURA-DO-TESTE.
- Antes de instalar runner: runtime/isolamento, recursos, isolamento por PR e proteção da máquina em repositório público. Runner permanece no Mac.
- Antes da submissão: reconciliar modelos realmente usados no README, verificar todos os requisitos, confirmar instruções adicionais do avaliador e testar Compose do zero.

Essas pendências não foram resolvidas silenciosamente; bloqueiam os prompts que dependem delas. O plano detalhado de cada entrega deve incluí-las.

## Reorganização do vault

Entrega 002: notas, prompts, relatórios, specs e configuração Obsidian em umanni-vault; constituição canônica CONSTITUICAO.md. A branch `codex/002-organize-vault` foi integrada por Douglas na `main` pelo PR #1, commit `a98885f`. Ver [[EXEC-002-ORGANIZE-VAULT]] e [[PROMPT-COND-002-RETOMADA]].

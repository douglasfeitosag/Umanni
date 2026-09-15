# Plano 013 — Identidade e acesso 0.3.0

**Spec**: [spec.md](spec.md)

**Branch documental**: `codex/013-identity-access`

**Versão-alvo**: milestone `0.3.0`

**Base**: `4265a46a7ca5ba8e6c1af68dd3b412a7cbf536b8`

## Estratégia

A futura executora trabalhará em incrementos verticais test-first. Cada incremento começa com um comportamento observável RED, implementa o mínimo para GREEN, refatora com os mesmos testes verdes e produz um commit coeso. O gerador de autenticação é primeiro executado em diretório temporário; seu inventário é registrado antes de incorporar somente a superfície necessária.

## Modelo e invariantes

### Persistência

- `users`: `full_name` obrigatório, `email` normalizado obrigatório, `role` enum/string restrito a `admin|regular`, `password_digest` compatível com a autenticação nativa e timestamps.
- Índice único funcional PostgreSQL em `lower(email)`; o model também normaliza e valida, mas concorrência termina no banco e retorna erro de domínio seguro.
- `sessions`: estrutura gerada/adaptada pelo Rails nativo, pertencente a `User`, com invalidação em logout e exclusão.
- Active Storage: tabelas padrão e um `has_one_attached :avatar`; storage local no desenvolvimento/teste da entrega.

### Regras transacionais

- cadastro força `regular` fora dos parâmetros permitidos;
- criação administrativa aceita papel e senha inicial; edição não aceita senha;
- exclusão/rebaixamento de admin ocorre em serviço transacional que bloqueia as linhas admin antes de recontar e mutar;
- bootstrap valida a allowlist exata de FR-015, adquire o advisory transaction lock D-031 e reconsulta a existência de admin antes de criar;
- evento de métricas é emitido somente em `after_commit` da mudança relevante, nunca durante rollback;
- substituição de avatar mantém o anterior se validação/persistência falhar; blobs substituídos ou pertencentes a conta apagada são removidos sem deixar a transação parcialmente aplicada.

## Rotas e responsabilidade server-side

| Método/rota conceitual | Ator | Resultado |
| --- | --- | --- |
| `GET /sign-up`, `POST /sign-up` | visitante | formulário e criação sempre regular |
| `GET /sign-in`, `POST /session`, `DELETE /session` | visitante/autenticado | login por papel e logout |
| `GET /profile`, `GET /profile/edit`, `PATCH /profile`, `DELETE /profile` | autenticado | somente o próprio registro |
| `GET /admin/dashboard` | admin | métricas autorizadas |
| `GET/POST /admin/users` | admin | lista e criação |
| `GET/PATCH/DELETE /admin/users/:id` | admin | consulta, edição e exclusão |
| `DashboardMetricsChannel` | admin autenticado | somente sinal de invalidação |

Nomes finais podem seguir a saída idiomática do gerador, mas qualquer diferença deve preservar esses contratos e ser registrada no EXEC. Visitante sem sessão é redirecionado ao login em navegação Inertia; ator autenticado sem permissão recebe resposta 403/uma página segura, sem props do recurso alvo. Mutações Inertia bem-sucedidas usam redirecionamento apropriado para evitar reenvio.

## Contratos Inertia e Cable

O contrato detalhado está em [contracts/inertia-cable.md](contracts/inertia-cable.md). Controllers fazem autenticação, autorização e strong parameters antes de montar props. React nunca decide permissão; apenas omite controles que o servidor informou como permitidos. Props de usuário nunca incluem digest, senha, token, session ID ou atributo Active Storage interno.

O canal autentica a conexão pela sessão Rails e rejeita assinatura não administrativa. O broadcast versionado apenas invalida métricas. O hook React recarrega a prop `metrics` com coalescência e repete a consulta em conexão/reconexão. Logout, exclusão e rebaixamento desconectam remotamente as conexões do ator afetado depois do commit; toda partial reload reautoriza.

## Interface, estados e acessibilidade

- Páginas: entrar, cadastrar, perfil, editar perfil, dashboard, usuários, criar usuário e editar usuário.
- Navegação por papel, logo horizontal em auth/header e símbolo somente no compacto; tema claro e tokens aprovados.
- Dashboard apresenta exatamente três cards: total, administradores e usuários regulares, com estado `updating` breve e anúncio único após a recarga parcial.
- Lista usa tabela em desktop e cards em mobile com os mesmos dados/ações; nenhuma troca rápida de papel.
- Formulários mantêm labels; erros inline persistentes e resumo/foco no primeiro erro; submit tem estado loading/disabled sem impedir recuperação.
- Avatar possui seletor acessível, arquivo selecionado, erro e fallback por iniciais/ícone.
- Exclusão usa diálogo nativo com alvo explícito, foco contido/retornado, Escape para cancelar e confirmação digitada `EXCLUIR` após `trim`; o servidor também exige a confirmação.
- Mudança de rota atualiza título, página atual e foco no `h1`; toast não rouba foco e erro importante permanece inline.
- Textos visíveis em português; nomes de código e testes em inglês.

## Segurança

1. Executar autenticação pelo mecanismo Rails nativo, rotação de sessão no login e expiração/invalidação no logout.
2. Preservar proteção CSRF; nenhum endpoint mutável aceita GET. Teste XSRF prova rejeição sem token.
3. Separar parâmetros de cadastro, perfil e admin. `role`, IDs e senha não entram no contexto errado.
4. Consultas Active Record recebem valores como bindings; testes maliciosos provam ausência de SQLi.
5. React renderiza valores como texto; CSP existente é preservada/ajustada conscientemente. Testes armazenam payload XSS e provam que não executa.
6. Filtrar `password`, `password_confirmation`, cookies/tokens e variáveis do bootstrap dos logs.
7. Validar extensão apenas como UX; servidor decide por tamanho e tipo detectado. Não renderizar SVG/HTML e não confiar em `Content-Type` do cliente.
8. Respostas 403/404 e login não permitem enumeração de contas ou terceiros.
9. Cable autentica conexão e assinatura; nenhum stream global anônimo.

## Plano de testes

### RSpec

- models: normalização/unicidade concorrente, senha, papéis, avatar e relações de sessão;
- requests: todos os endpoints por visitante/regular/admin, strong params, respostas Inertia, CSRF, XSS/SQLi/enumeração e exclusão com logout;
- service: lock/rollback e disputa concorrente do último admin;
- command/task: allowlist completa do bootstrap, caso válido, no-op sem credenciais, disputa concorrente, entrada inválida e ambiente proibido sem vazar senha;
- channel/connection: assinatura admin aceita, demais rejeitadas, payload mínimo, emissão somente após commit e conexão existente revogada em logout/exclusão/rebaixamento;
- query: total e grupos, incluindo zero e mudanças de papel;
- Active Storage: tipos/tamanhos válidos, spoof/malformado/SVG/excesso e preservação do anterior.

### Vitest + React Testing Library

- páginas e componentes por papel e props, sem controles proibidos;
- formulários válidos/inválidos, erros acessíveis, loading, diálogo destrutivo e foco;
- cards/tabela equivalentes, avatar/fallback e nomes longos;
- hook Cable: assinatura, invalidação, coalescência, partial reload, reconexão e cleanup;
- cards de métrica e anúncio sem delta local nem spam de live region.

### Playwright

- todos os BDDs positivos de visitante, regular e admin;
- tentativa real de acesso/ID/papel forjado e sessão inválida após logout/exclusão;
- avatar válido/inválido e preservação;
- dois contextos de browser provando atualização do dashboard por Cable e verdade após reload/reconexão;
- desktop 1440×1024, mobile 390×844, teclado, diálogo, 1440×640, zoom/texto 200% e reduced motion;
- Chromium obrigatório; os navegadores adicionais já suportados pelo projeto permanecem no gate, sem alegar inspeção manual inexistente.

### TDD e cobertura

Cada tarefa de comportamento registra: comando RED, falha esperada observada, menor GREEN, comando GREEN e refatoração. Testes previamente verdes que apenas quebram por instalação não contam como RED comportamental. Ao final, executar suites focalizadas, `bin/check` e Compose do zero. SimpleCov e V8/Istanbul medem >=90% de linhas separadamente; execução paralela agrega resultados sem sobrescrever shards.

## Arquivos permitidos para a futura execução

Somente arquivos necessários dentro das superfícies abaixo; a executora deve listar o caminho exato no EXEC:

- `Gemfile`, `Gemfile.lock`, `package.json`, lockfile npm e configs de teste apenas se a capacidade exigida não existir;
- `app/controllers/` para autenticação, cadastro, perfil e namespace admin;
- `app/models/` para `User`, `Session`, `Current` e concerns estritamente necessários;
- `app/services/` somente para bootstrap e garantia transacional do último admin;
- `app/queries/` somente para métricas do dashboard;
- `app/channels/` para conexão autenticada e métricas;
- `app/frontend/` para entrypoint, layouts, páginas, componentes, tipos, hook Cable, testes e estilos desta feature;
- `app/views/layouts/application.html.erb` somente para integração Inertia/acessibilidade comprovadamente necessária;
- `config/routes.rb`, `config/cable.yml`, `config/storage.yml`, ambientes, filtros de parâmetros, CSP e locale estritamente relacionados;
- migrations Active Record/Active Storage e `db/schema.rb` gerado;
- `lib/tasks/` para o comando do primeiro administrador;
- `spec/`, fixtures/factories e arquivos de upload de teste desta feature;
- `bin/check` e configurações de cobertura somente para manter o gate declarado;
- `README.md`, `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md` e o EXEC 013.

Ficam proibidos: `branding/prototype/`, assets oficiais originais, specs 001/005/012/013 aceitas, workflows/runner, importação, deploy/Kamal/SSR/ZJIT, dados/segredos reais e refatoração sem relação. Divergência necessária para um arquivo fora da lista aciona parada.

## Sequência de entrega e commits esperados

1. Gate da base/PR/milestone e inventário temporário do gerador, sem incorporar ainda.
2. RED/GREEN de modelo, sessão e bootstrap.
3. RED/GREEN de cadastro, login/logout e autorização do perfil.
4. RED/GREEN do CRUD admin e invariável concorrente.
5. RED/GREEN de Active Storage/avatar.
6. RED/GREEN do dashboard, Cable e props Inertia.
7. RED/GREEN da interface responsiva e acessível, por fluxo vertical.
8. Playwright, segurança, cobertura, Compose e documentação/evidências.
9. Commits coesos, push, PR, metadados e revisão independente Luna high no HEAD exato.

Cada commit deve manter o repositório em estado coerente ou declarar explicitamente que é um commit de teste RED imediatamente seguido do GREEN; não misturar documentação de aceite com comportamento não comprovado.

## Gates e parada

Antes do PR: diff restrito, `git diff --check`, suites focalizadas, `bin/check`, cobertura e Compose limpo. No PR: milestone 0.3.0, label coerente, Douglas responsável e evidência do SHA. A executora inicia revisora `gpt-5.6-luna` high em contexto novo, responde achados nas threads, recebe nova verificação após cada commit e para com `review-ledger=success`, `code-reviewed`, zero threads abertas. Nenhum merge, fechamento, auto-merge, tag ou release.

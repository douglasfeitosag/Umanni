# EXEC-013 — Identidade e acesso 0.3.0

**Estado**: bloqueada no gate Compose limpo por nova divergência de allowlist

**Papel/modelo**: EXECUTORA Codex, GPT-5 (variante de execução não exposta)

**Base autorizada**: `origin/main` e checkout em `29103fbefb129a24f4a021be5115b7fe5ca8438a`, merge do PR documental #16

**Branch de implementação**: `codex/013-identity-access-app`

**Versão-alvo**: milestone aberto `0.3.0`; B003–B006 e issue #9 permaneceram sem alteração, com #9 aberta no milestone `Backlog`

## Gate inicial revalidado

- PR #16: mesclado em 2026-09-15, merge `29103fbefb129a24f4a021be5115b7fe5ca8438a`.
- HEAD documental final `6f0cd39ff19b8cacea22f6b4cf21d2eb3ef8bc16`: `review-ledger=success`, `spec-reviewed` e 8/8 threads resolvidas.
- Release `v0.2.1`: final, não draft/prerelease, alvo `bc9626e7a1ef9ce53375e0eb0d579e7831f0e7e0`.
- Milestone `0.3.0`: aberto e exclusivo; milestone `Backlog`: aberto; issue #9: aberta no Backlog.
- A branch nova foi criada de `origin/main`; o PR documental não foi reutilizado.

## Inventário do gerador nativo

`bin/rails generate authentication` foi executado numa cópia criada por `mktemp -d`, usando Ruby 4.0.6/Rails 8.1.3.1 da imagem de tooling. O gerador propôs `User`, `Session`, `Current`, concern/controller de sessão, `PasswordsController`, views ERB de sessão/recuperação, rotas e bcrypt. A geração interrompeu a migration porque o lockfile estava congelado. Foram incorporados somente os conceitos nativos de usuário, sessão, current e cookie assinado. Recuperação de senha, e-mail, `PasswordsController` e views ERB foram descartados por D-019/D-020 e pelo fora de escopo.

## Ciclos TDD executados

| Incremento | RED observado | GREEN focalizado |
| --- | --- | --- |
| Modelo/sessão/auth | `User`/`Session` e rotas ausentes; 5 falhas de request | 10 exemplos, 0 falhas em models + cadastro/login/logout |
| Bootstrap | `FirstAdminBootstrap` ausente | 4 exemplos, 0 falhas; duas conexões PostgreSQL produziram uma criação e um no-op |
| Perfil/admin/invariante | `LastAdminMutation` ausente | 6 exemplos, 0 falhas; exclusão concorrente manteve um admin |
| Avatar | substituição inválida e combinação ambígua não eram rejeitadas | 3 exemplos, 0 falhas para JPEG/PNG/WebP, spoof/malformado/SVG/excesso e preservação |
| Métricas/Cable | query/conexão/canal ausentes | 7 exemplos, 0 falhas para snapshot, autorização, after-commit e revogação |
| Frontend | páginas e hook ausentes | 12 testes Vitest, 0 falhas; 100% de linhas TS, TypeScript e ESLint verdes |
| Erros administrativos | validação de e-mail aparecia incorretamente no campo de papel | 9 exemplos de serviço/request, 0 falhas; erros preservam o campo original |
| Task pública | task sem cobertura direta | 3 exemplos, 0 falhas para criação, no-op e falha segura |

Commits coesos produzidos antes da consolidação final: `ae28bc9`, `0bd07c9`, `83471a3`, `0f874ff`, `5239221`, `5805b25`, `8210d44`, `9a204a3`, `0fd3df5` e `4b6a05e`.

## Bloqueio verificado e resolução autorizada

O `Dockerfile` de `29103fbe` monta a imagem final copiando apenas `app/controllers`, `app/models` e `app/views`. A implementação exigida pela spec possui classes autorizadas em `app/services/`, `app/queries/` e `app/channels/`, além do task local em `lib/tasks/`. Esses caminhos não entram na imagem de produção atual. Portanto, o gate obrigatório de Compose limpo não pode representar a entrega: controllers referenciam classes ausentes e o endpoint Cable não tem seus canais.

O plano 013 permite alterar as pastas acima, mas não incluía `Dockerfile` na seção “Arquivos permitidos para a futura execução”; a mesma seção determinava parada para qualquer arquivo necessário fora da lista. A execução parou e pediu autorização antes de alterar esse arquivo.

## Decisão de desbloqueio

Douglas respondeu “Sim” e autorizou acrescentar `Dockerfile` à allowlist exclusivamente para copiar `app/services`, `app/queries`, `app/channels` e `lib/tasks` para a imagem final. A alteração não muda stack, deploy, Kamal ou os demais estágios. E011–E018 e os gates/revisão foram retomados sob esse limite.

## Implementação resultante

- `User`, `Session` e `Current` seguem o núcleo da autenticação nativa do Rails; cookie de sessão assinado, rotação de sessão e revogação no banco protegem as rotas privadas.
- Cadastro força `regular` no servidor. Login usa resposta neutra. Perfil nunca aceita papel ou senha. A policy do servidor nega toda a superfície `/admin` a usuários regulares.
- `LastAdminMutation` bloqueia pessimisticamente os administradores na mesma transação antes de excluir ou rebaixar; as falhas retornam ao campo correto sem mutação parcial.
- `FirstAdminBootstrap` funciona somente em development/PostgreSQL local, exige confirmação e banco exatos, recebe segredo apenas por ambiente e usa advisory transaction lock `130013`.
- Active Storage aceita somente JPEG/PNG/WebP detectados, até 5 MiB; SVG, spoof, conteúdo malformado, excesso e upload+remoção ambíguos são recusados com preservação do avatar anterior.
- `DashboardMetricsQuery` calcula total e papéis numa agregação. O payload Cable é somente `{type: "dashboard.metrics.changed", schemaVersion: 1}`; o cliente refaz partial reload autorizado, coalesce rajadas e recupera após reconnect.
- Logout, exclusão e rebaixamento administrativo chamam `remote_connections.where(current_user: ...).disconnect`, invalidando sockets já abertos.
- A interface React/Inertia em português usa a identidade aprovada, tema claro, foco visível, alvos de 44 px, diálogo destrutivo com retorno de foco, tabela/cartões responsivos e fallback de avatar.

## Evidência focalizada antes do gate limpo

| Superfície | Comando | Resultado |
| --- | --- | --- |
| Ruby completo | `bundle exec rspec` | 48 exemplos, 0 falhas antes da adição da task; task isolada 3 exemplos, 0 falhas |
| Qualidade Ruby | `bundle exec rubocop` / `bundle exec brakeman --no-pager` | 63 arquivos sem infrações; 0 alertas de segurança |
| TypeScript | `npm exec tsc -- --noEmit` / ESLint | sucesso, zero warnings |
| Frontend | `npm exec vitest -- run --coverage` | 12 testes; 100% linhas, 94,87% statements, 83,17% branches, 90% functions |
| Sistema Chromium | `npm exec playwright -- test --project=chromium-desktop --workers=1` | 9 testes, 0 falhas; US1–US5, US7 e NFR combinados |
| Cable revogado | Playwright US2/US7 com WebSocket real | sockets encerrados em logout, rebaixamento e exclusão; acesso seguinte negado |

O `bin/check` foi ajustado, conforme allowlist do plano, de `spec/requests spec/integration` para `spec`, para que a agregação paralela inclua models, services, queries, channels e a task desta entrega. Resultados definitivos do Compose limpo e os percentuais Ruby serão registrados no HEAD exato após a execução do gate.

## Segundo bloqueio do gate limpo

No HEAD `7683bf83d95b35b0d9da654ca0d46ebacd09defb`, a execução começou com remoção exclusiva dos recursos do projeto `umanni-foundation`, reconstrução `--no-cache` da imagem `verify` e três bancos novos. `verification:prepare` e `zeitwerk:check` passaram. O primeiro `vite build` falhou porque `AppLayout.tsx` e o CSS importam o logo e as fontes aprovados de `branding/assets/`, enquanto `.dockerignore` permite somente `app/**`, `public/**` e outras superfícies enumeradas; portanto esses arquivos não existem no contexto da imagem.

Erro determinante: `Could not resolve "../../../branding/assets/logo/umanni-horizontal.svg" from "app/frontend/components/AppLayout.tsx"`. Os avisos anteriores também registraram que Montserrat e Roboto não seriam resolvidas no build. A spec exige o logo horizontal e os tokens aprovados, mas `.dockerignore` está fora da allowlist e a autorização anterior de Douglas limitou `Dockerfile` a channels/queries/services/tasks. A parte dependente parou sem copiar, modificar ou duplicar assets oficiais.

## Matriz de rastreabilidade

- US1.1–US1.3: `spec/requests/authentication_spec.rb`, `spec/models/user_spec.rb`, `app/frontend/pages/Auth/SignUp.test.tsx` e Playwright US1.
- US2.1–US2.3: `spec/requests/authentication_spec.rb`, `spec/models/session_spec.rb` e Playwright US2.
- US3.1–US3.3: `spec/requests/profile_and_admin_spec.rb`, testes de avatar/interface e Playwright US3.
- US4.1–US4.3: requests, `spec/services/last_admin_mutation_spec.rb` concorrente e Playwright US4.
- US5.1–US5.3: `spec/requests/avatar_spec.rb`, componentes/fallback e Playwright US5.
- US6.1–US6.3: `spec/services/first_admin_bootstrap_spec.rb` concorrente e `spec/tasks/bootstrap_spec.rb`.
- US7.1–US7.3: specs de query/model/channel, teste do hook e Playwright US7 com contextos e sockets reais.
- NFR-002/NFR-003: Playwright cobre teclado, foco, janela curta, texto a 200% e reduced motion; inspeção final multibrowser permanece no gate.

## Limites preservados

Nenhum merge, fechamento de PR, auto-merge, tag, release, fechamento de milestone, importação, CI/runner, e-mail, recuperação de senha ou início de 0.4.0 foi realizado. A revisão Luna final não foi iniciada porque o gate limpo e a publicação ainda não estão completos.

# EXEC-013 — Identidade e acesso 0.3.0

**Estado**: implementação e gates técnicos concluídos; o estado de revisão aplicável é somente o `headRefOid`, os checks, labels e threads atualmente publicados no PR #17.

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

Douglas autorizou permissões desse tipo. A allowlist operacional foi ampliada somente em `.dockerignore` para os três arquivos existentes exigidos pelo build: `branding/assets/logo/umanni-horizontal.svg`, `branding/assets/fonts/montserrat-variable.ttf` e `branding/assets/fonts/roboto-variable.ttf`. Nenhum byte dos assets foi modificado, duplicado ou incluído na imagem final além dos artefatos Vite gerados; a permissão não autoriza expansão de produto, merge, tag ou release.

## Gate limpo aprovado

No HEAD `8d2de607cb4d7d8979e00ac05d07b6b151394a2b`, após remover recursos e volume apenas do projeto Compose, a imagem `verify` foi reconstruída com `--no-cache`. `bin/check` passou integralmente:

- dois shards Ruby nos bancos independentes `umanni_test` e `umanni_test2`: 27 + 24 exemplos, 0 falhas; cobertura de linhas Ruby 320/346 (92,48%);
- `zeitwerk:check`, TypeScript e ESLint: sucesso; RuboCop: 63 arquivos, zero infrações; Brakeman: zero alertas;
- Vitest: 12 testes, 100% das linhas TypeScript, 94,87% statements, 83,17% branches e 90% functions;
- Playwright: 54/54 cenários nos perfis Chromium, Firefox e WebKit, desktop e mobile, incluindo fluxos US1–US5/US7, teclado, reduced motion, janela curta e 200%.

Firefox trata uma navegação 403 sem corpo como `NS_ERROR_NET_EMPTY_RESPONSE`; o teste foi tornado cross-engine ao verificar a mesma resposta 403 por request no contexto autenticado. A conexão Cable, os fluxos e a negação continuam exercitados pelo browser. A alteração foi validada em 18/18 cenários Firefox antes do gate integral.

## Imagem de entrega aprovada

No mesmo HEAD, `docker compose --profile delivery build --no-cache web`, `db:prepare`, `up --wait web`, `GET /up` e `GET /sign-in` passaram. A auditoria física dentro de `umanni-foundation-web-1` confirmou UID/GID `1000:1000` e ausência de `node_modules`, `spec`, `branding`, cache de gems, gems Brakeman/RSpec e `config/master.key`. Os três assets de identidade entram somente no estágio de build e são emitidos pelo Vite como artefatos versionados em `public/vite`; não permanecem como fontes no runtime.

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

Nenhum merge, fechamento de PR, auto-merge, tag, release, fechamento de milestone, importação, CI/runner, e-mail, recuperação de senha ou início de 0.4.0 foi realizado. A revisão final foi iniciada automaticamente após a publicação; qualquer novo commit exige uma nova rodada e não herda o ledger do SHA anterior.

## Correções da revisão independente

A primeira revisão independente do PR de execução identificou cinco achados no HEAD documental `fd51cf4`: associação programática do erro de papel, IDs únicos para múltiplos diálogos destrutivos, propagação de `permissions.changeRole`, foco no `h1` após navegação Inertia e alvos de navegação móvel de no mínimo 44 × 44 px. A correção mantém a proteção autoritativa no servidor, torna o papel somente leitura quando a policy já nega a mudança, gera IDs por instância com `useId` e direciona o foco ao título da rota (com fallback para `main`). RTL cobre os dois primeiros contratos e Playwright cobre foco de rota e dimensões móveis.

No HEAD corretivo histórico `bcfc99387665143ed41fec6ce91c2bb2a1540fff`, o Compose foi reconstruído sem cache e `bin/check` passou: RSpec em dois shards (27 + 24 exemplos), Ruby 92,48% de linhas, TypeScript/ESLint/RuboCop sem infrações, Brakeman sem alertas, Vitest 14/14 e Playwright 60/60 nos seis perfis Chromium, Firefox e WebKit. As cinco threads dessa rodada foram resolvidas e o status `review-ledger=success` foi publicado para aquele SHA. Esse aceite não é transferido para commits posteriores: antes de merge, tag, release ou fechamento de milestone, consultar o HEAD e os metadados vigentes no PR #17.

## Correções incrementais após o gate histórico

Os quatro ajustes abaixo permaneceram dentro de E011/E013 e foram publicados no mesmo PR #17, cada um com revisão independente `gpt-5.6-luna`/high no HEAD correspondente:

- `ce5bac9ae1f8ead7d749c586ed6a3a0ef22b3e83`: aplica espaçamento próprio ao hint de avatar e verifica sua posição no fluxo browser.
- `5420f95c80fbbedf7b225a955d6651e88a6b8ade`: configura os conectores `support.array` de `pt-BR`, eliminando o `and` entre erros em português.
- `a83a4f831de2b5ce20713e8d1293458eabd11ab1`: centraliza explicitamente o diálogo destrutivo, pinta sua ação de confirmação de vermelho e só a habilita após `EXCLUIR` com `trim`; cancelar, Escape e sucesso limpam a confirmação e retornam o foco.
- `4c9c8cb895ba86ebab3b2d0fba2f3cc3e5c397b8`: fecha o diálogo quando o clique ocorre no backdrop, sem tratar controles internos como backdrop; Playwright fecha, verifica foco restaurado, reabre e conclui a exclusão.

No último HEAD funcional acima, o `bin/check` em imagem Compose passou integralmente: 52 exemplos RSpec em dois shards, 92,48% de linhas Ruby, TypeScript/ESLint/RuboCop/Brakeman sem falhas, Vitest 14/14 e Playwright 60/60 nos perfis Chromium, Firefox e WebKit, desktop e mobile. A execução direta do Vitest nesta worktree continuou indisponível por uma dependência opcional local ausente (`@rollup/rollup-darwin-arm64`); a imagem de verificação usa `npm ci` e fornece a evidência reprodutível. As revisões finais sem achados foram `5218409001`, `5218441534`, `5218468889` e `5218500723`. O ledger precisa ser novamente publicado para qualquer HEAD documental posterior.

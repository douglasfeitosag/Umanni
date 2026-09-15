# EXEC-013 — Identidade e acesso 0.3.0

**Estado**: bloqueado por expansão necessária da allowlist antes do gate de Compose

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

## Ciclos TDD executados até o bloqueio

| Incremento | RED observado | GREEN focalizado |
| --- | --- | --- |
| Modelo/sessão/auth | `User`/`Session` e rotas ausentes; 5 falhas de request | 10 exemplos, 0 falhas em models + cadastro/login/logout |
| Bootstrap | `FirstAdminBootstrap` ausente | 4 exemplos, 0 falhas; duas conexões PostgreSQL produziram uma criação e um no-op |
| Perfil/admin/invariante | `LastAdminMutation` ausente | 6 exemplos, 0 falhas; exclusão concorrente manteve um admin |
| Avatar | substituição inválida e combinação ambígua não eram rejeitadas | 3 exemplos, 0 falhas para JPEG/PNG/WebP, spoof/malformado/SVG/excesso e preservação |
| Métricas/Cable | query/conexão/canal ausentes | 7 exemplos, 0 falhas para snapshot, autorização, after-commit e revogação |
| Frontend | páginas e hook ausentes | 5 testes Vitest totais passando; TypeScript e ESLint focalizados passaram antes do bloqueio |

Commits coesos produzidos: `ae28bc9`, `0bd07c9`, `83471a3`, `0f874ff`, `5239221` e `5805b25`.

## Bloqueio verificável

O `Dockerfile` de `29103fbe` monta a imagem final copiando apenas `app/controllers`, `app/models` e `app/views`. A implementação exigida pela spec possui classes autorizadas em `app/services/`, `app/queries/` e `app/channels/`, além do task local em `lib/tasks/`. Esses caminhos não entram na imagem de produção atual. Portanto, o gate obrigatório de Compose limpo não pode representar a entrega: controllers referenciam classes ausentes e o endpoint Cable não tem seus canais.

O plano 013 permite alterar as pastas acima, mas não inclui `Dockerfile` na seção “Arquivos permitidos para a futura execução”; a mesma seção determina parada para qualquer arquivo necessário fora da lista. Nenhuma alteração foi feita no `Dockerfile`.

## Pergunta concreta à CONDUTORA

Douglas autoriza acrescentar `Dockerfile` à allowlist da execução 013, exclusivamente para copiar `app/services`, `app/queries`, `app/channels` e `lib/tasks` para a imagem final (sem mudar stack, deploy, Kamal ou demais estágios), e então retomar E011–E018 e todos os gates/revisão?

## Limites preservados

Nenhum merge, fechamento de PR, auto-merge, tag, release, fechamento de milestone, importação, CI/runner, e-mail, recuperação de senha ou início de 0.4.0 foi realizado. A revisão Luna final não foi iniciada porque a implementação e os gates ainda não estão completos.

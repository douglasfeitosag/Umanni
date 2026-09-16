# EXEC-016 — Robustez da entrega local 0.3.1

**Estado**: implementação e gates técnicos concluídos; publicação e revisão independente ainda dependem do PR de execução no HEAD remoto exato.

**Papel/modelo**: EXECUTORA Codex, identificada como GPT-5, sem variante exata exposta.

**Base autorizada**: `64df7410cf7ee7ffd35156abeaee1fa559b7cdb4`, merge do PR documental #22.

**Branch**: `codex/016-delivery-hardening-app`.

**Versão-alvo**: milestone aberto `0.3.1`, limitado às issues #18 e #19.

## Gate inicial

- O PR #22 foi integrado após revisão independente no HEAD `597505769e91edde06965cf6026e2cf34514757d`, com `review-ledger=success`, `spec-reviewed` e três threads resolvidas.
- `origin/main` e a nova branch apontavam para o merge `64df7410cf7ee7ffd35156abeaee1fa559b7cdb4` antes da primeira alteração de aplicação.
- O milestone #6 permanecia aberto com somente #18 e #19 abertas; tag e Release `v0.3.1` estavam ausentes.
- A autorização posterior de Douglas ampliou a condição de parada da execução para o ciclo completo, inclusive merge, tag, Release e fechamento do milestone, sem ampliar o escopo funcional.

## Ciclos TDD e falhas reais observadas

| Incremento | RED observado | GREEN focalizado |
| --- | --- | --- |
| Gate de startup | o entrypoint executava somente o servidor; o teste esperava `db:prepare` antes dele | 4 specs cobrem opt-in, ausência da flag, valor inválido, ordem, `exec`, falha fechada e supressão da saída bruta |
| Readiness | `GET /ready` respondia 404 | 4 specs cobrem consulta real, migrations pendentes, conexão indisponível e preservação de `/up` |
| Fallback Inertia | `DeliveryExceptionsApp` não existia | resposta 500 com `X-Inertia`, props estritamente `{ status }`, URL local e versão canônica dos assets |
| Fallback HTML | a primeira resposta não tinha page object íntegro; no container, chamada direta da action falhou pelo `CONTENT_TYPE` sintético | documento `pt-BR` autônomo, ambiente sanitizado, status preservado e hidratação Inertia real |
| Interface | o componente `Errors/Show` não existia | página genérica em português, `Head` canônico, foco no `h1`, ação segura ao início e nenhum retry |
| Produção real | a primeira matriz encontrou HTML sem mount root e, depois, versão `ViteRuby.digest` divergente da versão Inertia empacotada | root de hidratação incluído e versão obtida de `InertiaRails.configuration.version`; 18/18 cenários passaram |

Os commits funcionais coesos são:

- `d274af8` — gate de banco anterior ao servidor e readiness da entrega;
- `ea844f4` — fallback 5xx HTML/Inertia seguro e acessível;
- `b599bfd` — harness Compose/Playwright production-like e provas negativas.

## Implementação resultante

- `UMANNI_DELIVERY_PREPARE_DATABASE=1` existe somente no serviço `web` do perfil `delivery`. O entrypoint emite apenas os eventos constantes permitidos, executa `db:prepare` sem repassar saída bruta e só então usa `exec` para iniciar o comando original.
- `/up` permanece liveness. `/ready` executa `SELECT 1`, rejeita migrations pendentes, responde 503 genérico e nunca prepara o banco.
- O healthcheck de `web` consulta `/ready`. Perfis `dev` e `test` não recebem a flag e preservam o fluxo anterior.
- A exceptions app de produção delega status abaixo de 500 ao comportamento público vigente. Para 5xx, produz page object mínimo, não avalia shares de sessão e usa documento HTML independente quando a visita não é Inertia.
- O Rails registra somente `delivery.exception.fallback` no nível normal da entrega. Detalhes internos ficam no nível debug; o Thruster não registra URLs no perfil local, impedindo que query strings escapem antes dos filtros Rails.
- O frontend usa o logo aprovado já empacotado, conteúdo genérico em português, foco programático, alvo de ação com ao menos 44 × 44 px, reflow sem overflow e reduced motion.

## Gate dedicado da entrega

`bin/check-delivery` cria nomes de projeto e volumes exclusivos, instala `trap` de cleanup e nunca remove recursos globais. No código HEAD `b599bfd9688cf9e9087d0578d84bb92339205723`, ele passou integralmente:

- banco `umanni_production` inicialmente ausente preparado antes da escuta;
- migration fictícia montada em read-only aplicada pelo gate, sem entrar na imagem final;
- `/ready` e `/up` 200, restart idempotente e dois pares ordenados de eventos startup/success;
- conexão PostgreSQL deliberadamente inalcançável terminou `web` com código não zero, porta recusando conexão e somente eventos startup/failure;
- bodies, headers e logs sem sentinelas de exceção, params, cookie, token, URL, ambiente ou `DATABASE_URL`;
- probe e migration de teste ausentes da imagem final sem overlays;
- 18/18 testes Playwright em Chromium, Firefox e WebKit, desktop 1440 × 1024 e mobile 390 × 844, cobrindo HTML, visita Inertia real sem modal, 422 preservado, foco, reduced motion, texto a 200%, alvo e overflow.

O próprio gate sempre removeu seus containers, redes e volumes na saída, inclusive nas execuções RED.

## Gate geral no HEAD de código

Com `VERIFICATION_SHA=b599bfd9688cf9e9087d0578d84bb92339205723`, a imagem `verify` executou `bin/check` com sucesso:

- RSpec: 33 + 31 = 64 exemplos, zero falhas, em `umanni_test` e `umanni_test2` isolados;
- cobertura Ruby: 358/384 linhas, 93,22%;
- Zeitwerk, TypeScript e ESLint: sucesso;
- RuboCop: 71 arquivos, zero infrações;
- Brakeman 8.0.6: zero alertas;
- Vitest: 15/15; cobertura TypeScript de linhas 94,53%;
- Playwright de regressão: 60/60 nos seis perfis de browser/viewport.

Os avisos históricos de `:unprocessable_entity` continuaram sem alteração e não pertencem à entrega 016.

## Segurança e limites preservados

- Nenhuma migration real, model, seed, conta, dependência, lockfile, fluxo de identidade, Cable, importação, CI/runner, deploy ou telemetria foi criado.
- O arquivo de migration sob `spec/support/` é fixture efêmera montada somente pelo harness e foi provado ausente da imagem publicada.
- 403, 404 e 422 permanecem nos caminhos anteriores; requests e o Playwright exercitam essas regressões.
- O fallback não promete persistência nem repete automaticamente a ação que falhou.
- A entrega foi validada em Docker Desktop Linux arm64; amd64 continua declarado pelas imagens de base, mas não foi executado nesta sessão.

## Próximas transições

Publicar o PR de execução com #18/#19, milestone 0.3.1, labels coerentes e Douglas responsável. No HEAD remoto exato, publicar `foundation-checks`, iniciar automaticamente a revisora independente `gpt-5.6-luna`/high, tratar achados e obter `review-ledger=success`, `code-reviewed` e zero threads abertas. Somente depois seguir a autorização explícita de Douglas para merge e fechamento serial da release.

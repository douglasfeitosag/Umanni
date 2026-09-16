# PROMPT-EXEC-016 — Robustez da entrega local 0.3.1

**Papel destinatário**: EXECUTORA, sessão limpa escolhida por Douglas

**Autoria**: CONDUTORA Codex, GPT-5 (variante de execução não exposta)

**Pedido de origem**: planejar e depois executar as regressões confirmadas no milestone 0.3.1

**Spec**: `umanni-vault/specs/016-delivery-hardening/spec.md`

**Base do planejamento**: `origin/main` / merge do PR #21 / `a3b53ee00e5009d7d52485c22171acb3d41329d5`

**Versão-alvo**: milestone `0.3.1`

## Gate anterior ao início

Não altere aplicação até confirmar no GitHub que o HEAD exato do PR documental 016 possui `review-ledger=success`, label `spec-reviewed` e zero threads abertas. Confirme também que `origin/main`, milestone 0.3.1 e issues #18/#19 não divergiram desde o planejamento. O status remoto no SHA exato é a evidência; não infira aceite deste arquivo.

Se base, PR, milestone, issues, gate ou allowlist divergirem, pare e devolva pergunta concreta à CONDUTORA. Crie a branch/PR de execução prevista pela governança somente depois desse gate; não implemente no PR documental aceito.

## Objetivo único

Entregar #18 e #19 como patch 0.3.1: impedir que o serviço Compose `delivery` aceite tráfego antes de banco/migrations estarem prontos, comprovar readiness real e apresentar fallback 5xx seguro/acessível em HTML e Inertia sem alterar 403/404/422 ou os perfis dev/test.

## Leia integralmente

1. `umanni-vault/STATUS.md`
2. `AGENTS.md`
3. `umanni-vault/PROTOCOL.md`
4. `.specify/memory/constitution.md`
5. `umanni-vault/specs/016-delivery-hardening/spec.md`
6. `umanni-vault/specs/016-delivery-hardening/plan.md`
7. `umanni-vault/specs/016-delivery-hardening/tasks.md`
8. `umanni-vault/specs/016-delivery-hardening/research.md`
9. `umanni-vault/specs/016-delivery-hardening/contracts/delivery-recovery.md`
10. `umanni-vault/specs/016-delivery-hardening/checklists/requirements.md`
11. Arquivos atuais somente dentro da allowlist do plano, conforme necessários.

## Decisões obrigatórias

- D-032: `db:prepare` opt-in somente no `web` do perfil Compose `delivery`; nunca política genérica implícita.
- D-033: preservar `/up` como liveness e usar readiness separada cuja própria resposta prova HTTP/Rails atendendo e cuja ação prova `SELECT 1` e ausência de migrations pendentes, sem GET interno a `/up`.
- D-034: exceptions app 5xx dedicada e independente de sessão/banco, com HTML e Inertia válidos; status não-5xx delegados ao comportamento atual.
- D-035: oferecer apenas `Voltar ao início`; nenhum replay/retry automático de operação desconhecida.

Não reabra decisões de identidade/acesso da 0.3.0. Nova decisão material ou necessidade fora da allowlist exige parada.

## Ordem obrigatória

1. Revalidar gate, base, milestone, #18/#19, branch/PR, labels/responsável e arquivos permitidos.
2. Criar reprodução automatizada em projeto Compose efêmero, com cleanup por trap, e registrar o RED do banco inexistente.
3. Implementar E003–E005 para #18 com RED/GREEN/refatoração: entrypoint opt-in, readiness e Compose limpo.
4. Implementar E006–E010 para #19: requests HTML/Inertia, serviço 5xx, página acessível e Playwright contra imagem final em `RAILS_ENV=production` com probe montado somente por overlay efêmero; confirmar que o probe não integra a imagem normal.
5. Executar E011–E012: regressões, cobertura, `bin/check`, Compose, inventário e diff no mesmo SHA.
6. Atualizar README/STATUS/memória/EXEC apenas com evidência real e modelos efetivamente usados.
7. Fazer commits coesos, push e abrir/atualizar PR de execução com milestone 0.3.1, labels coerentes e Douglas responsável.
8. Iniciar automaticamente revisora independente `gpt-5.6-luna` high em contexto novo; não pedir a Douglas que a abra.
9. Responder achados somente nas threads originais, corrigir e solicitar revisão do novo HEAD. Somente a revisora resolve threads.
10. Terminar somente com checks/ledger verdes, `code-reviewed`, zero threads abertas e HEAD local/remoto/PR idêntico; entregar a Douglas e parar.

## Comportamentos obrigatórios

Rastreie individualmente US1.1–US4.3 conforme `tasks.md`. Preserve:

- cadastro inválido como 422 com erros por campo;
- 403 sem props do recurso alvo e 404 atual;
- `/up` como liveness;
- dev/test sem gate delivery;
- status 5xx, headers Inertia válidos e HTML íntegro;
- fallback sem auth/flash/banco, sem detalhe técnico e sem replay;
- eventos próprios de startup/readiness exatamente iguais à allowlist constante, sem interpolar exceção/request/env;
- teclado, foco no `h1`, 44×44, desktop/mobile, 200% e reduced motion;
- projeto/volume Compose de teste isolados e removidos mesmo após falha.

## Allowlist e exclusões

Obedeça integralmente “Arquivos permitidos para a futura execução” no plano. Não criar migration, model, seed, conta, dependência, workflow, runner, deploy, telemetria, API, importação ou mudança de domínio. Não alterar branding original, protótipo ou specs aceitas. Não usar o volume Compose padrão do usuário em testes destrutivos.

## Entrega e EXEC

Crie `umanni-vault/EXEC-016-DELIVERY-HARDENING.md` com papel/modelo real, pedido, spec, base, branch, PR/SHAs, arquivos, RED/GREEN/refatoração, matriz US1.1–US4.3, comandos/resultados, cobertura, Compose/cleanup, inventário, segurança/acessibilidade, limitações e revisão independente.

## Sucesso e parada

Sucesso exige SC-001–SC-009 no mesmo HEAD. Pare se surgir política fora do Compose local, migration/dado/dependência nova, alteração de 403/404/422, segredo em saída, cleanup inseguro, arquivo fora da allowlist ou gate obrigatório indisponível.

Nunca faça merge, feche PR/milestone, ative auto-merge, crie/mova tag, publique Release ou comece 0.4.0. A revisão técnica não substitui autorização explícita de Douglas.

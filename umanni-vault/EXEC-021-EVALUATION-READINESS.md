# EXEC-021 — prontidão de avaliação local 1.0.0

## Contexto e escopo

- **Papel/modelo da executora**: Codex, variante exata não exposta nesta sessão.
- **Spec/plano/tarefas**: `specs/022-evaluation-readiness/`.
- **Base**: `origin/main` no merge do PR #29, `4496c8ba1a2989a6ed6d94b466e2f1f118de9071`.
- **Branch/PR**: `codex/022-evaluation-readiness`, [PR #30](https://github.com/douglasfeitosag/Umanni/pull/30), milestone 1.0.0.
- **Escopo entregue**: roteiro README, guia privado local, registro/versionamento e a correção mínima de bootstrap exigida pela execução do roteiro.
- **Exclusões preservadas**: CI/runner, deploy, e-mail, convite, recuperação de senha, API paralela, Redis, extras de plataforma e issue #9.

## Planejamento e revisão anterior à execução

O planejamento 022 foi publicado no PR #30. A revisora independente Luna/high analisou o SHA inicial, abriu R-022-001 a R-022-005, e as respostas/correções foram mantidas nas threads originais. No SHA de planejamento `3bdded75db3d30548af269e8b48903caecc9adf8`, todas as cinco threads ficaram resolvidas exclusivamente pela revisora, com `review-ledger=success` e `spec-reviewed`.

## Auditoria e decisão de escopo

O README anterior iniciava somente `web`, embora `worker` seja necessário para importações. A inspeção confirmou que `.env` é ignorado por `.gitignore`, não é rastreado, e o guia `ENTREVISTA-UMANNI-PRIVADO.md` é ignorado exclusivamente por `.git/info/exclude`; nenhuma alteração compartilhada de `.gitignore` foi feita.

O primeiro ensaio em worktree isolado iniciou web+worker e respondeu `/ready` e `/up`, mas o bootstrap no delivery falhou com `Bootstrap is available only in development`. Como o objetivo exige criar o primeiro administrador no roteiro local, spec, plano, pesquisa e tarefas foram amendados e revisados antes do código. A correção aceita é estrita: production continua recusada sem `UMANNI_BOOTSTRAP_LOCAL_DELIVERY=1`; com esse opt-in, continuam obrigatórios PostgreSQL, host local, banco exato, frase de confirmação, credenciais válidas, lock transacional e idempotência.

## TDD

- **RED**: o novo exemplo focado em `spec/services/first_admin_bootstrap_spec.rb` falhou por dois motivos esperados: a mensagem ainda não mencionava local delivery e production com opt-in ainda levantava `Bootstrap is available only in development`.
- **GREEN**: `FirstAdminBootstrap` recebeu somente o guarda para production com `UMANNI_BOOTSTRAP_LOCAL_DELIVERY=1`. O spec focado passou com 5 exemplos e o RuboCop focado não encontrou ofensas.

## Validação executada

No candidato de código `55765dc86dd0f594826e6d13e6e6acc15828a192`:

- `bin/check` passou: RSpec paralelo 49 + 44 = **93** exemplos, cobertura Ruby 770/808 = **95,29%**, 23/23 Vitest, 66/66 Playwright, RuboCop em 97 arquivos e Brakeman sem alertas.
- `bin/check-delivery` passou: 18/18 cenários production-like, imagem de produção, web+worker, volume compartilhado, restart idempotente, `/ready`, `/up`, migration pendente, respostas seguras e banco indisponível sem servir a aplicação.
- Em worktree limpo equivalente, `.env` foi criado a partir do exemplo e uma chave local foi gerada sem registro do valor; o delivery isolado iniciou `web` e `worker`, `/ready` retornou `ready`, `/up` retornou 200, e o bootstrap criou o administrador na primeira chamada e devolveu no-op na segunda. O shutdown isolado removeu somente containers e rede desse projeto; volumes de teste foram removidos deliberadamente ao limpar o ambiente temporário.

O porto 3030 já era usado por um recurso externo ao escopo desta entrega. Para não afetá-lo, o ensaio isolado usou o overlay de teste na porta 3131; os comandos e a composição publicados foram os mesmos, exceto por esse isolamento de porta.

## Privacidade e guia local

`ENTREVISTA-UMANNI-PRIVADO.md` foi criado na raiz com decisões, stack, capacidades, evidência, limites e roteiro de entrevista, sem segredos. `git check-ignore -v` confirmou a exclusão somente por `.git/info/exclude`; o arquivo não foi adicionado ao Git. Nenhum valor de `.env` ou `SECRET_KEY_BASE` foi registrado neste EXEC, no README, no changelog ou nas notas de release.

## Limites e publicação pendente

A validação ocorreu em Docker Desktop Linux arm64 no macOS; amd64 não foi executado. CI/runner seguem manuais e no Backlog. Neste ponto, PR, tag, Release e milestone ainda dependem da revisão final independente no HEAD exato e da sequência autorizada de integração/publicação; nenhuma tag ou Release anterior foi alterada.

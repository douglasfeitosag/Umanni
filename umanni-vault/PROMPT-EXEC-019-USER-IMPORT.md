# PROMPT-EXEC-019 — Importação de usuários 0.4.0

**Papel destinatário**: EXECUTORA, sessão limpa aberta manualmente por Douglas

**Autoria**: CONDUTORA Codex, GPT-5 (variante de execução não exposta)

**Pedido de origem**: definir e executar a próxima etapa após `v0.3.1`

**Spec**: `umanni-vault/specs/019-user-import/spec.md`

**Base do planejamento**: `origin/main` / `9d3191f6013fc400b6f5181bdb577cb5728537ec`

**Versão-alvo**: milestone `0.4.0` #7

## Gate anterior ao início

Não altere aplicação até confirmar no GitHub que o HEAD exato do PR documental 019 possui `review-ledger=success`, label `spec-reviewed` e zero threads abertas. Confirme que o PR foi integrado por Douglas e que `origin/main` contém sua árvore. Revalide milestone 0.4.0 aberto, issue #9 no Backlog e ausência de divergência em `v0.3.1`.

Se base, PR, milestone, gate, dependência ou allowlist divergir, pare e devolva pergunta concreta à CONDUTORA. Crie `codex/019-user-import-app` a partir do novo `origin/main`; não implemente no PR documental.

## Objetivo único

Entregar a importação administrativa CSV/XLSX 0.4.0 em segundo plano: lote/arquivo e progresso persistidos, processamento parcial/idempotente por Solid Queue, relatório seguro por linha, invalidação ao vivo por Solid Cable e senha inicial administrativa somente para contas importadas ainda sem credencial.

## Leia integralmente

1. `umanni-vault/STATUS.md`
2. `AGENTS.md`
3. `umanni-vault/PROTOCOL.md`
4. `.specify/memory/constitution.md`
5. `umanni-vault/specs/019-user-import/spec.md`
6. `umanni-vault/specs/019-user-import/plan.md`
7. `umanni-vault/specs/019-user-import/tasks.md`
8. `umanni-vault/specs/019-user-import/research.md`
9. `umanni-vault/specs/019-user-import/data-model.md`
10. `umanni-vault/specs/019-user-import/checklists/requirements.md`
11. Arquivos atuais somente dentro da allowlist do plano, conforme necessários.

## Decisões obrigatórias

Preserve D-019/D-020/D-025/D-026/D-028/D-029 e implemente D-036–D-046 exatamente como aceitas. Fixe `solid_queue 1.7.0` e `roo 3.0.0`; qualquer incompatibilidade real exige parada, não substituição silenciosa. Configure Solid Queue single-database: copie o schema gerado para migrations normais de `primary`, remova `db/queue_schema.rb`, não mantenha `config.solid_queue.connects_to` nem role/database/path `queue`, e prove que `SolidQueue::Record`/`ApplicationRecord` usam o mesmo pool/db_config. Use fila `imports`, processo worker separado, storage `/rails/storage` compartilhado e lote/job atômicos com `enqueue_after_transaction_commit = false`. Cable transporta apenas invalidação versionada.

## Ordem obrigatória

1. Executar E001 e registrar o gate remoto/base.
2. Repetir o spike temporário das dependências e inventariar `solid_queue:install`; incorporar apenas o necessário.
3. Seguir E003–E010 em ciclos RED/GREEN/refatoração, mantendo commits coesos.
4. Executar E011 com RSpec/Vitest/Playwright, segurança, cobertura e matrizes responsivas.
5. Provar Compose limpo com web + worker, CSV/XLSX reais de teste e restart durante processamento; fazer cleanup seguro e auditar a imagem.
6. Atualizar README/STATUS/memória e escrever `umanni-vault/EXEC-019-USER-IMPORT.md` somente com evidência real.
7. Publicar o PR de execução no milestone 0.4.0, com labels coerentes e Douglas responsável.
8. Iniciar automaticamente revisora independente `gpt-5.6-luna` high em contexto novo; não pedir a Douglas que a abra.
9. Responder achados apenas nas threads originais, corrigir e solicitar revisão do novo HEAD. Somente a revisora resolve threads.
10. Terminar somente com HEAD local/remoto/PR idêntico, checks/ledger verdes, `code-reviewed` e zero threads abertas; entregar a Douglas e parar.

## Comportamentos obrigatórios

Rastreie US1.1–US6.3 e NFR-001–NFR-008. Em especial:

- rejeição estrutural ou limite de campo/linha não cria lote/job;
- a request válida não cria usuários;
- falha/retorno falso/crash antes do commit reverte lote, attachment e job; depois do commit ambos existem;
- códigos de lote e linha obedecem às listas exaustivas e cross-constraints do modelo;
- todas as ocorrências de e-mail duplicado no arquivo falham;
- usuário existente nunca é alterado;
- retry do mesmo job preserva resultados/contadores;
- conta importada permanece sem login até uma única senha inicial local sob lock concorrente;
- o worker lê os mesmos bytes gravados pelo web, inclusive após restart;
- callbacks de métricas são agregados por bloco, restaurados após exceção e limitados a 100 eventos em 10.000 linhas;
- payload Cable não contém dados;
- reload/reconnect recupera a verdade persistida;
- visitante/regular não consulta, envia ou assina;
- logs/props/relatório não expõem linha bruta, fórmula, senha ou detalhe técnico.

## Allowlist e exclusões

Obedeça integralmente “Arquivos permitidos para a futura execução” no plano. Não alterar branding/prototype, specs aceitas, workflows/runner, deploy/Kamal/SSR/ZJIT, issue #9 ou dados reais. Não adicionar e-mail, convite, recuperação de senha, cancelamento, retry manual, Redis, polling, API, exportação ou formatos extras.

## Entrega e EXEC

`umanni-vault/EXEC-019-USER-IMPORT.md` registra papel/modelo real, pedido, spec, base, branch, PR/SHAs, dependências, arquivos, RED/GREEN/refatoração, matriz BDD/NFR, comandos/resultados, cobertura, falha de enqueue, concorrência da senha, contagem de broadcasts, Compose/storage/restart/cleanup, inventário de imagem, segurança/acessibilidade, limitações e revisão independente.

## Sucesso e parada

Sucesso exige os critérios da spec/plano no mesmo HEAD publicado. Aplique a condição de parada da spec sem contornar conflito ou indisponibilidade.

Nunca faça merge, feche PR/milestone, ative auto-merge, crie/mova tag, publique Release ou inicie Backlog. Revisão técnica não substitui autorização explícita de Douglas.

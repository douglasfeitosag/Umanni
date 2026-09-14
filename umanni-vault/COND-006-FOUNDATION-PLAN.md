# Relatório da condução006 — fundação

Autor do pedido: Douglas, PROMPT-COND-006. Papel: condutora. Autoria real: Codex identificado pelo ambiente como GPT-6, sem variante exata exposta; pesquisadora somente leitura em contexto separado herdado. Revisora prevista obrigatória: gpt-5.6-luna, high, sem conversa herdada; identidade e resultado efetivos serão registrados no PR, sem crédito antecipado.

## Entrega preparada

Base v0.1.0, commit87e8c51894faa5794e9759b9caa5df4871d350e7, [release publicada](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.1.0). Branch `codex/008-foundation-plan`, spec `specs/008-foundation-plan/spec.md`, versão-alvo0.2.0, [milestone3](https://github.com/douglasfeitosag/Umanni/milestone/3). Pedido recebido descreve fundação mínima e proíbe código nesta sessão.

Preparados spec, pesquisa com matriz/digests, plano, modelo de dados sem entidades de negócio, contratos Rails–Inertia/qualidade/ambiente, quickstart e19 tarefas0.2.0 mais7 itens Backlog. Escopo futuro: página técnica real, PostgreSQL primary, Vite/React/Tailwind, testes e empacotamento local. Excluídos autenticação/usuários/importação/jobs/canais, runner/CI automático, SSR/deploy e issue9. README e STATUS conciliados com publicação já realizada de0.1.0. Protótipo preservado, sem alegação de aplicação existente.

## Evidências desta condução

- git status inicial limpo; tag anotada remota e main no mesmo87e8c51894faa5794e9759b9caa5df4871d350e7.
- gh release view confirmou publicação em2026-09-14T21:54:20Z; API milestone1 confirmou0.1.0 fechado.
- gh issue view9 confirmou aberta e Backlog; API criou milestone3/0.2.0.
- Proteção de main relida: review-ledger obrigatório e strict, conversas resolvidas. foundation-checks ainda não criado; é tarefa futura de verificação local publicada manualmente.
- Spec Kit1.0.6: templates resolvidos, setup-plan/setup-tasks e check-prerequisites executados com SPECIFY_FEATURE_DIRECTORY absoluto e SPECIFY_FEATURE=008-foundation-plan; pré-requisitos reconhecem research/data-model/contracts/quickstart/tasks. extensions.yml ausente.
- Registros npm/RubyGems, índice Node, manifestos Docker e código de bibliotecas conferidos somente por leitura. Nenhuma gem/npm/image instalada, gerador Rails executado ou suite da aplicação alegada.
- Docker Compose5.1.3 e daemon29.4.2 respondem; runtimes do host diferem da matriz e não serão alterados globalmente por esta tarefa.

## Análise da condutora

Oito requisitos e quatro critérios rastreados às19 tarefas; nove cenários BDD. Nenhum requisito sem tarefa, nenhum item de execução sem destino. A política não agrega cobertura entre linguagens; identifica arquivos não exercitados, dois processos e prova de falha por resultado ausente. O MVP US1 não encerra a versão sem US2/US3. Nenhum workflow automático ou proteção ainda não configurada é anunciado como pronto.

Validação documental: pré-requisitos Spec Kit, git diff --check, consistência dos IDs e links locais. Revisão independente deverá examinar o HEAD remoto exato, incluindo comandos/constraints e limites do primeiro incremento. O aceite não é antecipado neste relatório; fonte definitiva é a revisão/status/threads do PR. Novo commit exige rodada adicional.

## Pendências e retorno

Integração runtime, locks, testes, cobertura e imagem final são trabalho futuro da executora, não pendências mascaradas desta pesquisa. Decisões funcionais permanecem Backlog. Se a revisão encontrar conflito de versão/contrato ou expansão funcional, parar trabalho dependente e levar pergunta concreta a Douglas.

Somente após review-ledger success/spec-reviewed/zero threads será preparado o prompt da executora e publicado no PR/chat, contendo SHA revisado e este conjunto de leituras. Não incluí-lo antecipadamente no commit. Esse procedimento evita invalidar o aceite por um commit contendo apenas o prompt; se Douglas quiser versioná-lo antes da execução, o novo HEAD precisa de nova revisão. Execução ocorrerá em sessão aberta manualmente por Douglas, conforme governança. Nenhum merge/tag/release nesta condução.

## Correções da primeira revisão independente

A revisora Luna high publicou FND-001 a FND-003 no PR11 sobre o commit d919e44. A checagem inicial de whitespace não abrangia os arquivos ainda untracked: o diff completo contra v0.1.0 revelou seis linhas com espaços finais. A correção removeu os espaços e passou a validar `git diff --check v0.1.0 HEAD`, além do diff de trabalho.

T004 agora prevê módulo frontend mínimo importável que retorna null antes do RED comportamental de T005. A prova de isolamento usa hook before(:suite) em cada worker e duas observações obrigatórias no agregador, sem depender de qual processo recebe um arquivo de spec. Essas correções são documentais; nenhum scaffold ou hook foi implementado. O novo HEAD será reexaminado pela revisora antes do aceite, registrado no PR.

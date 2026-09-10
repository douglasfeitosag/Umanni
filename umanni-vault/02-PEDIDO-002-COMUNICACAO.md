# PEDIDO-002 — Explicar antes de perguntar

Data: 2026-09-10. Autor do pedido: Douglas. Registro: Codex.

## Texto recebido

Nunca assuma que eu sei exatamente do que você tá falando. Mostre um documento ou fale pelo menos um resumo (o ideial é falar novamente)

## Regra de comunicação

Antes de pedir uma decisão, reapresentar o contexto relevante, explicar os termos usados e mostrar as consequências concretas das alternativas. Preferir repetir a explicação no próprio diálogo; um link para documento pode complementar, mas não deve obrigar Douglas a recuperar contexto por conta própria.

As perguntas devem continuar nas caixas do Codex, uma por vez, com texto compreensível por si só. Não tratar recomendação nem opção pré-selecionada como resposta. Não avançar em trabalho dependente sem a resposta necessária.

## Decisão em discussão: ordem do planejamento e das verificações

Ordem originalmente solicitada: receber teste e criar documentação → branding → estrutura básica → componentes → tarefas das funcionalidades → CI/CD.

SDD significa desenvolver a partir de uma especificação: documentar o que entregar, planejar como construir, dividir em tarefas e então executar. CI executa verificações automáticas das alterações. PR é a proposta de alteração submetida à revisão; merge incorpora essa alteração à versão principal. CD trata da entrega ou implantação automatizada; o destino ainda será definido.

Questões a resolver: estrutura e componentes exigem tarefas planejadas antes de sua programação; os primeiros merges antecederiam a etapa prevista de CI.

Proposta, ainda não aprovada: manter a ordem branding → estrutura → componentes → funcionalidades, com especificação, plano e tarefas antes de cada entrega. Preparar proteções e CI básico antes do primeiro PR, acrescentando verificações conforme surgirem arquivos e código da stack. A inicialização da branch principal requer procedimento explícito de bootstrap, sem afirmar que proteções já existem.

Alternativas: planejar todas as entregas antes de implementar; ou manter a criação do CI na etapa final indicada, com verificações manuais explícitas nas entregas anteriores. Todas exigem plano antes de programar.

# Operação das sessões

## D-013 — Abertura manual por Douglas

Data: 2026-09-10. Decisor: Douglas. Registro: Codex. Estado: aprovado.

Pergunta apresentada: "Você quer abrir as sessões manualmente e colar os prompts que a condutora preparar?"

Resposta de Douglas: "Sim".

Douglas abre as sessões e cola os prompts preparados pela condutora. Não criar novas sessões automaticamente; uma exceção depende de pedido explícito de Douglas.

## Fluxo aprovado

1. A condutora prepara um arquivo com o prompt completo da tarefa: objetivo, fontes, leituras mínimas, base Git, escopo, passos, testes, critérios de aceite, condições de parada e caminho exato do retorno EXEC.
2. Douglas abre a sessão, seleciona o modelo e esforço definidos e cola o prompt.
3. A executora trabalha dentro do plano e registra seu resultado no arquivo EXEC indicado. Informações ausentes ou conflitantes que impeçam a execução geram retorno de bloqueio para a condutora.
4. A condutora analisa o retorno e o PR, avalia achados e prepara prompts de correção quando necessário. Os achados de revisores e executoras são registrados individualmente no PR.
5. Após o aceite técnico, a condutora apresenta o resultado e os comandos para Douglas fazer merge. Fechamento ou merge continuam exclusivos de Douglas, salvo permissão explícita (D-004).
6. Ao concluir sua tarefa, a condutora atualiza os documentos e a memória do projeto e prepara o prompt de passagem para uma sessão limpa. Se houver integração pendente, declarar esse estado, sem registrar merge ou entrega integrada como concluídos.

## Papéis solicitados

| Papel | Modelo | Esforço |
| --- | --- | --- |
| Condutora | gpt-5.6-sol | medium |
| Executora | gpt-5.6-terra | high |
| Agente revisor | gpt-5.6-luna | high |

Estes são os modelos definidos para o fluxo. Cada sessão deve registrar o modelo efetivamente usado; o texto do prompt não altera por si só a configuração de uma sessão. A declaração pública de IA deve refletir o uso real, incluindo desvios se ocorrerem.

## D-014 — Runner local neste Mac

Data: 2026-09-10. Decisor: Douglas. Estado: aprovado.
Pergunta apresentada: "Em qual máquina você quer executar o runner local?"
Resposta de Douglas: "Na minha máquina".

O runner do GitHub Actions será hospedado no Mac de Douglas, onde o projeto ficará em `/Users/douglas/Projects/Umanni`. Isso define a máquina física; execução nativa ou em ambiente isolado, limites de recursos e ciclo de inicialização/parada serão especificados no plano de CI antes da instalação. Considerar a dedicação simultânea da máquina a outros projetos e o fato de o repositório ser público.

## Pendências operacionais

- Máquina do runner definida em D-014: Mac de Douglas.
- Definir isolamento e limites de recursos do runner, considerando o repositório público e a execução simultânea de outros projetos.
- Entrega local com Docker Compose definida em [D-015](12-PEDIDO-007-ENTREGA-LOCAL.md). Contratação de hospedagem e orçamento de nuvem saem do plano atual; preparar execução e testes locais reproduzíveis.
- Definir operação de commit/push/abertura de PR e identidades GitHub para execução e revisão; não confundir a revisão da condutora com uma aprovação independente do autor na plataforma.

Nenhum runner, sessão adicional ou workflow foi criado neste registro.

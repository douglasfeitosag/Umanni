# Especificação — fundação mínima da aplicação

**Feature Branch**: `codex/008-foundation-plan`  
**Created**: 2026-09-14  
**Status**: planejamento sujeito a revisão independente; execução proibida nesta sessão.  
**Input**: PROMPT-COND-006 de Douglas; versão-alvo `0.2.0`.  
**Base imutável**: `v0.1.0`, commit `87e8c51894faa5794e9759b9caa5df4871d350e7`, [release](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.1.0).  
**Autoria**: condutora Codex, identificada pelo ambiente como GPT-6; variante exata da sessão não exposta. A pesquisa delegada herda esse ambiente. Não atribuir Sol medium sem evidência.

## User Scenarios & Testing

O usuário desta fundação é quem desenvolve ou avalia o repositório. Não há jornada de gestão de usuários neste incremento.

### US1 — Abrir uma aplicação real localmente (P1)

Como avaliador, quero iniciar a aplicação numa cópia limpa e abrir uma página que identifique a versão e seus limites, para distinguir a fundação executável do protótipo estático.

**Teste independente**: preparar o ambiente documentado, abrir a página e verificar que a resposta vem do servidor da aplicação com assets compilados.

- **BDD-01**: Dado um checkout limpo e os pré-requisitos documentados, quando preparo o ambiente e inicio os serviços, então a página inicial apresenta Umanni, versão 0.2.0 e aviso explícito de que os fluxos de usuários não estão disponíveis.
- **BDD-02**: Dada a página aberta, quando faço uma visita pelo cliente de navegação ao mesmo endereço, então recebo o mesmo componente e dados previstos, sem transformar o protótipo em backend.
- **BDD-03**: Dado um navegador com versão antiga dos assets, quando solicita a página, então o protocolo exige recarregamento completo no endereço correto.
- **BDD-04**: Dada a aplicação em execução, quando acesso endereço inexistente, então recebo 404 sem dados internos; quando consulto sua verificação de vida, recebo 200 se ela inicializou.

### US2 — Verificar isolamento e qualidade (P1)

Como desenvolvedor, quero executar verificações repetíveis e saber que os testes não afetam meu ambiente de desenvolvimento.

**Teste independente**: executar as suítes em dois processos, inspecionar os bancos utilizados e relatórios, e provocar uma falha controlada de qualidade.

- **BDD-05**: Dados bancos de desenvolvimento e testes, quando duas partições de testes executam consultas e dados temporários, então usam nomes distintos e não alteram o banco de desenvolvimento.
- **BDD-06**: Dado código executável da aplicação, quando a verificação completa termina, então cada linguagem possui cobertura de linhas de pelo menos 90%, considerando também arquivos não carregados; erro de teste, tipo, lint ou segurança retorna código não zero.
- **BDD-07**: Dado um resultado ausente de um processo ou cobertura abaixo do limite, quando consolido os resultados, então a verificação falha e não reutiliza evidências antigas.

### US3 — Reproduzir e revisar a entrega (P2)

Como revisor, quero montar a imagem de entrega e reproduzir as evidências no commit exato, para avaliar o incremento antes de qualquer integração.

**Teste independente**: build a partir dos locks, inicialização sem servidor de assets, inspeção das evidências vinculadas ao SHA e do gate no GitHub.

- **BDD-08**: Dada uma cópia limpa, quando monto e inicio a imagem final, então a página funciona com assets compilados, processo sem root e sem instalar ferramentas de desenvolvimento na imagem final.
- **BDD-09**: Dado um PR com novo commit, quando verifico o gate, então a revisão anterior não satisfaz o novo HEAD; somente a revisora confirma o aceite e resolve os achados.

### Edge Cases

Banco indisponível bloqueia preparo/testes com erro útil. A rota de vida não certifica saúde do banco. Porta ocupada ou daemon indisponível interrompem o comando, sem alterar serviços de outros projetos. Resultado vazio de cobertura não equivale a 100%. Lock incompatível, imagem ausente ou dependência impossível interrompem a execução para replanejamento. Nenhum reset global ou exclusão de volumes externos é permitido.

## Requirements

### Functional Requirements

- **FR-001**: disponibilizar somente página técnica inicial, verificação de vida e comportamento 404; nenhum fluxo RF-01 a RF-09 da leitura do teste é entregue aqui.
- **FR-002**: definir e validar o contrato entre servidor e cliente para HTML inicial, visitas posteriores, props permitidas e assets desatualizados.
- **FR-003**: usar o mesmo mecanismo de banco no desenvolvimento, teste e imagem final, com dados e conexões separados; não criar entidades de negócio artificiais.
- **FR-004**: fixar versões diretas, resolver dependências transitivas em locks e reproduzir instalação sem atualizações implícitas.
- **FR-005**: disponibilizar verificações de backend, frontend, navegador, tipos, lint e segurança, com evidência BDD/TDD por comportamento.
- **FR-006**: medir cobertura Ruby e TypeScript separadamente, com mínimo de 90% de linhas em cada linguagem, agregação completa de processos e falha para resultado incompleto.
- **FR-007**: entregar ambiente local e imagem multi-stage executável, preservando arquivos documentais/visuais e sem segredos versionados.
- **FR-008**: documentar comandos comprovados, limites, modelos de IA efetivamente usados e evidências por SHA; submissão exige revisão independente, conversas resolvidas e gates atuais.

### Key Entities

Não há entidades de domínio persistidas. Existe apenas uma representação de apresentação da fundação, a configuração dos bancos e o conjunto de evidências de verificação. Os detalhes estão em [data-model.md](data-model.md).

## Success Criteria

- **SC-001**: uma cópia limpa inicia a página e satisfaz BDD-01 a BDD-04 e BDD-08; os comandos e seus resultados ficam registrados.
- **SC-002**: BDD-05 a BDD-07 passam, duas partições são comprovadas e cada linguagem alcança o mínimo de 90% de linhas, sem média entre linguagens.
- **SC-003**: todos os requisitos têm tarefa e evidência; BDD-09 é verificado no HEAD publicado, nenhuma thread permanece sem decisão e não há merge automático.
- **SC-004**: zero fluxo funcional não especificado, segredo publicado ou alteração no pacote visual; todas as tarefas têm destino `0.2.0` ou `Backlog`.

## Assumptions e limites

A fundação é deliberadamente não autenticada porque não expõe dados de usuários. Não gerar autenticação nativa ainda: cadastro/convite, papéis, último administrador, avatar e importação continuam exigindo definição posterior. Não instalar fila/canais/runner nem serviços de e-mail. Não contratar hospedagem. SSR, deploy Kamal efetivo e ZJIT ficam no Backlog; preservar preparação de empacotamento para Thruster/Kamal sem inventar hosts.

A interface usa português conforme a correção posterior de Douglas registrada em STATUS e no README de v0.1.0, prevalecendo sobre a redação antiga em inglês da Constituição/AGENTS; código, identificadores, README e commits continuam em inglês. Esta entrega não reescreve a Constituição.

A issue #9 permanece no milestone Backlog. [tasks.md](tasks.md) discrimina os demais adiamentos e a etapa de revisão. O milestone 0.2.0 não pode fechar apenas com a aprovação deste planejamento.

## Condição de parada

Não executar código nesta sessão. Na futura execução, parar diante de dependência irresolúvel, contrato contraditório, necessidade de regra funcional ausente, alteração fora do recorte, gate inacessível ou mudança de HEAD após revisão. Registrar evidência e pergunta concreta à condutora. Aceite independente da spec não autoriza merge, tag ou release.

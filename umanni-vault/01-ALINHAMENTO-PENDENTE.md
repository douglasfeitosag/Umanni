# Alinhamento inicial — rascunho

Data: 2026-09-10. Autor: Codex, papel de interlocução e preparação.
Origem: [PEDIDO-001](00-PEDIDO-001.md).
Estado: registro da preparação e decisões; estado vigente em [STATUS](STATUS.md). Não autoriza implementação.

## Plano desta preparação

Objetivo: preservar o pedido, verificar o contexto disponível e identificar decisões que impedem um protocolo executável.
Como: inspeção somente de leitura do contexto local/remoto e documentação oficial; registro local em Markdown.
Parada: entregar as perguntas e aguardar respostas e o enunciado. Não inicializar o produto, criar código, instalar dependências, abrir PR ou executar commit/push/merge nesta preparação.

## Contexto verificado

- Sessão atual: `/Users/douglas/Documents/ChatGPT/Teste Umanni`, macOS.
- A pasta atual já possui Git, na branch `master`, sem commits. `.DS_Store` está sem rastreamento.
- `/Users/douglas/Projects` existe; `/home/douglas/Projects` não existe neste ambiente.
- O GitHub CLI retornou `douglasfeitosag/Umanni` como público, permissão `ADMIN`, sem branch padrão nomeada. Não houve mutação remota.
- Enunciado recebido e verificado: gestão de usuários em Ruby 4+/Rails 8+, com cobertura mínima de 90%. Frontend aprovado: React + Inertia (D-005). Banco escolhido: PostgreSQL (D-006). Versões exatas continuam pendentes; arquitetura aprovada em D-010 e nome Umanni em D-016. Fonte: [PEDIDO-004](04-PEDIDO-004-ENUNCIADO.md) e [análise](05-LEITURA-DO-TESTE.md). Prazo registrado em D-003.
- Os modelos solicitados foram registrados; nenhuma configuração de sessão foi alterada.

## Regras recebidas

- Planejar antes de programar; explicitar escopo, como executar e quando parar.
- Interromper trabalho dependente quando faltar informação ou houver conflito e devolver à condutora um pedido de esclarecimento.
- Preservar pedidos em Markdown e produzir artefatos do SDD e prompts separados para execução.
- Manter retorno `EXEC-*`, revisão pela condutora, commits atômicos, README e documentação atualizados.
- Usar TDD e BDD, Clean Code e SOLID, arquitetura explícita e apenas componentes necessários.
- Registrar achados individualmente no PR, com análise e decisão pela condutora.
- Preparar passagem para sessão limpa e memória concisa ao encerrar cada tarefa da condutora.
- Condutora: `gpt-5.6-sol`, `medium`; executora: `gpt-5.6-terra`, `high`; agentes: `gpt-5.6-luna`, `high`.

## Decisões confirmadas por Douglas

- D-001 — Ambiente e caminho: neste Mac, em `/Users/douglas/Projects/Umanni`. Resposta recebida pela caixa de perguntas nesta sessão em 2026-09-10. O runner também ficará neste Mac, conforme D-014. Os registros de preparação permanecem na pasta atual até a inicialização planejada do projeto.
- D-002 — Sequência aprovada: manter branding → estrutura → componentes → funcionalidades, documentando plano e tarefas antes de executar cada entrega. Preparar verificações automáticas desde o primeiro PR e ampliar os testes conforme o projeto crescer. Pergunta apresentada: "Você concorda com essa sequência?" Resposta de Douglas: "Sim". Aprovação recebida nesta sessão em 2026-09-10; não define stack, ferramentas, métricas de cobertura nem autoriza implementação sem os planos exigidos.
- Interação: usar as caixas de perguntas do Codex. Após relatos de desaparecimento, enviar uma pergunta por vez e aguardar a resposta; causa do desaparecimento não diagnosticada.
- Contorno de interação nesta coleta: mesmo uma única caixa continuou aparecendo e sumindo, segundo Douglas. Prosseguir por texto enquanto esse comportamento impedir respostas; preferência original por caixas permanece registrada.
- Comunicação: reapresentar o contexto, explicar termos e consequências antes de cada decisão, preferindo repetir a explicação no diálogo. Fonte: [PEDIDO-002](02-PEDIDO-002-COMUNICACAO.md).
- D-003 — Prazo: final do dia 2026-09-11, no fuso America/Sao_Paulo. Douglas trabalhará em paralelo com outros projetos; horas disponíveis e horário exato de corte não informados. Fonte: [PEDIDO-003](03-PEDIDO-003-PRAZO-E-PRS.md).
- D-004 — Merge ou encerramento de PR sempre ficam com Douglas, salvo permissão explícita. Condutora entrega revisão e comandos; aprovação técnica não é autorização de merge. Repetir esta regra nos prompts e passagens de sessão. Fonte: [PEDIDO-003](03-PEDIDO-003-PRAZO-E-PRS.md).
- D-005 — Frontend aprovado: React integrado ao Rails por Inertia. Justificativa e confirmação: [decisões tecnológicas](07-DECISOES-TECNOLOGICAS.md).
- D-006 — Banco escolhido: PostgreSQL. À pergunta "Podemos seguir com PostgreSQL?", Douglas respondeu "Gosto de postgresql". Registro: [decisões tecnológicas](07-DECISOES-TECNOLOGICAS.md).
- D-007 — Framework CSS aprovado: Tailwind CSS. Resposta de Douglas: "Vamos de tailwind css". Registro: [decisões tecnológicas](07-DECISOES-TECNOLOGICAS.md).
- D-008 — TypeScript aprovado para o frontend após Douglas confirmar conforto com seu uso neste projeto. Registro: [decisões tecnológicas](07-DECISOES-TECNOLOGICAS.md).
- D-009 — Testes aprovados: RSpec, Vitest com React Testing Library e Playwright. Resposta de Douglas à proposta: "Sim". Registro: [decisões tecnológicas](07-DECISOES-TECNOLOGICAS.md).
- D-010 — Arquitetura aprovada: monolito Rails organizado por funcionalidades, baseado em MVC, com serviços de aplicação para orquestrações específicas. Resposta de Douglas: "Sim". Fonte: [ADR-001](08-ARQUITETURA-PROPOSTA.md).
- D-011 — Vault Obsidian e documentação do projeto, incluindo prompts, EXEC e memória específica, no mesmo repositório público. Resposta de Douglas: "Sim". Fonte: [documentação e publicação](09-DOCUMENTACAO-E-PUBLICACAO.md).
- D-012 — Idiomas aprovados: README, interface, identificadores, nomes de testes e commits em inglês; documentação explicativa, planos, prompts, relatórios e cenários BDD em português. Resposta de Douglas: "Sim". Fonte: [documentação e publicação](09-DOCUMENTACAO-E-PUBLICACAO.md).
- D-013 — Douglas abre as sessões manualmente, seleciona os modelos e cola os prompts produzidos pela condutora. Resposta de Douglas: "Sim". Fonte: [operação das sessões](10-OPERACAO-DAS-SESSOES.md).
- D-014 — Runner do GitHub Actions hospedado no Mac de Douglas. Resposta: "Na minha máquina". Isolamento e recursos serão definidos no plano de CI antes de instalar. Fonte: [operação das sessões](10-OPERACAO-DAS-SESSOES.md).
- D-015 — Direção de entrega: aplicação e serviços iniciados localmente por Docker Compose, com execução e testes reproduzíveis; sem contratação de hospedagem. CI local mantido. Fonte: [PEDIDO-007](12-PEDIDO-007-ENTREGA-LOCAL.md).
- D-016 — Nome do pseudoproduto: Umanni. Resposta de Douglas: "Prefiro deixar o mesmo". Fonte: [PEDIDO-008](13-PEDIDO-008-NOME.md). Próxima entrega: inicialização documental conforme [PLANO-000](14-PLANO-000-INICIALIZACAO.md), seguida de briefing de branding em nova sessão.

## Decisões necessárias agora

1. Ambiente definitivo resolvido por D-001 e máquina do runner resolvida por D-014: Mac de Douglas.
2. Prazo resolvido por D-003. Dedicação parcial confirmada, sem quantidade de horas. Fonte pública permite IA e exige divulgação dos modelos no topo do README. Restrições técnicas estão registradas na análise do teste; instruções adicionais do avaliador fora do repositório ainda não foram fornecidas.
3. Sequência resolvida por D-002: plano e tarefas antes de cada entrega, mantendo branding → estrutura → componentes → funcionalidades.
4. Momento do CI resolvido por D-002: verificações automáticas desde o primeiro PR. Detalhes do bootstrap, das proteções e das ferramentas serão definidos no plano inicial, antes de sua execução.
5. Nome resolvido por D-016: Umanni. Briefing e direção visual serão propostos na etapa de branding para decisão de Douglas.
6. Publicação resolvida por D-011: vault e registros específicos do projeto no mesmo repositório público, incluindo pedidos, prompts, EXEC e aprendizados. Definir a estrutura de diretórios no plano inicial.
7. Integração final resolvida por D-004: Douglas faz merge/encerramento, salvo permissão explícita. Abertura manual das sessões resolvida por D-013. Ainda definir a operação de commit/push/abertura de PR e se todas usarão a mesma identidade GitHub.
8. Runner neste Mac definido em D-014 e entrega local Docker Compose em D-015. Provedor e orçamento de hospedagem deixam de ser pendências. Detalhar isolamento e recursos do runner e execução reproduzível da aplicação nos planos correspondentes.
9. Idiomas resolvidos por D-012: README/interface/código/testes/commits em inglês; documentação explicativa, planos, prompts, EXEC e cenários BDD em português. Cenários e testes relacionados por identificadores.

Ruby 4+/Rails 8+, autenticação nativa, Solid Queue/Solid Cable e cobertura mínima de 90% vêm do enunciado. Stack, ferramentas de teste e arquitetura base foram definidos em D-005 a D-010. Detalhes de rastreabilidade BDD, medição de cobertura, versões e contratos por entrega serão esclarecidos antes de implementar. Brakeman e ESLint também são requisitos de Douglas para o CI.

## Proposta de contrato para cada entrega

Fluxo: pedido → esclarecimentos → especificação → plano e decisões → tarefas → verificação de consistência → prompt da executora → EXEC e PR → revisão/ajustes → aceite da condutora → aguardando integração por Douglas → integração verificada → encerramento e passagem. Merge ou encerramento de PR por agente exigem permissão explícita de Douglas (D-004).

- `PEDIDO-NNN.md`: texto de Douglas com autoria e data; novas decisões em registros posteriores, sem reescrever o pedido.
- Artefatos Spec Kit: constituição do projeto e, por entrega aplicável, `spec.md`, `plan.md`, `tasks.md`; pesquisa, modelo de dados, contratos e guia de validação quando necessários. Fixar a versão do Spec Kit antes da inicialização.
- `PROMPT-EXEC-NNN.md`: papel/modelo, pedido e especificação de origem, commit base, branch/PR, leituras mínimas, escopo, exclusões, passos, testes, critérios de aceite, condições de parada e caminho exato do retorno.
- `EXEC-NNN.md`: autor/modelo, prompt de origem, base e resultado, resumo, arquivos, commits/PR, comandos e resultados de validação, evidência RED/GREEN quando houver comportamento implementado, limitações e achados.
- Revisão: um identificador por achado; evidência, impacto, autor/modelo, commit revisado, decisão da condutora e validação da resolução. Comentários gerais precisam de convenção rastreável; a resolução nativa de conversas não substitui essa decisão.
- `HANDOFF-NNN.md`: estado, último commit/PR verificado, decisões vigentes, pendências, arquivos mínimos para leitura, próximo objetivo e condição de parada.
- Memória do projeto: regra curta, origem do aprendizado e prevenção verificável. Propostas de executoras não alteram regras automaticamente; condutora consolida.
- Obsidian: documentação Markdown versionada, wikilinks, mapa do projeto, glossário, decisões arquiteturais e diagramas das relações. Definir fonte única por assunto e referenciar artefatos SDD para evitar divergência.

Uma entrega deve ter objetivo verificável e coeso; o tamanho do diff será consequência desse escopo. BDD descreve comportamentos e critérios de aceite antes dos testes. TDD implementa um comportamento por ciclo RED → GREEN → REFACTOR. Assets visuais terão critérios visuais e de acessibilidade, sem testes artificiais para arquivos estáticos.

O branding proposto inclui briefing, direção visual, logo e variantes, tipografia e licença, paleta e contraste, tokens semânticos, estados necessários, especificação dos componentes previstos e playbook de uso. A implementação dos componentes fica na etapa própria.

## Fontes e limites

- [GitHub Spec Kit](https://github.com/github/spec-kit): base do processo e dos artefatos. O protocolo PEDIDO/PROMPT/EXEC/HANDOFF é uma adaptação proposta para este projeto, não um padrão nativo do Spec Kit.
- [Regras de proteção do GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets): PRs, checks e resolução de conversas. Validar as proteções efetivamente configuradas antes de afirmar bloqueio de merge.
- [Subagentes no Codex](https://learn.chatgpt.com/docs/agent-configuration/subagents): referência para a configuração futura dos papéis; esta sessão não alterou o modelo ativo.
- Skills consultadas: TDD e OpenAI Docs. A entrada local de brainstorming é apenas um catálogo e não foi tratada como workflow instalado.

## Próxima entrada

Enunciado recebido em PEDIDO-004; escolhas base, entrega local e nome definidos até D-016. Executar a primeira entrega documental conforme PLANO-000, mantendo pendências explícitas. Regras detalhadas das funcionalidades precisam ser decididas antes dos respectivos prompts de execução. A próxima condutora conduzirá o briefing de branding após ler o estado e o prompt de passagem.

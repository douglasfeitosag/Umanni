# Decisões tecnológicas

Fonte: [enunciado](04-PEDIDO-004-ENUNCIADO.md). Regras: [alinhamento](01-ALINHAMENTO-PENDENTE.md).

## D-005 — Frontend: React com Inertia

Estado: aprovado por Douglas em 2026-09-10.
Pergunta apresentada: "Podemos registrar React + Inertia como a escolha do frontend?"
Resposta de Douglas: "Sim".

Motivo: Douglas possui conhecimento consolidado em React e não conhece Hotwire. O teste permite React integrado ao Rails por Inertia. A escolha aproveita experiência existente dentro do prazo de entrega.

Responsabilidades a detalhar no plano: React compõe a interface; Rails mantém autenticação, autorização, persistência e regras de negócio; Inertia conecta as páginas aos controladores; Solid Cable suporta atualizações ao vivo e Solid Queue processa importações. Isso não aprova TypeScript, versões, componentes, dependências adicionais nem toda a arquitetura de implementação.

## D-006 — Banco de dados: PostgreSQL

Estado: escolhido por Douglas em 2026-09-10.
Pergunta apresentada: "Podemos seguir com PostgreSQL?"
Resposta de Douglas: "Gosto de postgresql". No contexto da escolha proposta, seguir com PostgreSQL.

O teste permite PostgreSQL, MySQL ou SQLite com WAL. O banco guarda usuários, importações e dados operacionais usados pelos componentes Solid. O desenho de bancos/conexões será decidido no plano técnico.

Recomendação do assistente: PostgreSQL, usando o mesmo mecanismo em desenvolvimento, testes e entrega. O projeto terá requisições web e trabalho de importação ocorrendo simultaneamente; PostgreSQL é uma escolha adequada para esse cenário. Como custo, exige operar um serviço adicional, cuja inicialização reproduzível deverá ser prevista no plano de Docker.

SQLite também é aceito e simplifica a infraestrutura. WAL permite leituras simultâneas à escrita, mas continua havendo apenas um escritor por vez. Isso não o desqualifica para o teste; demanda considerar a concorrência de gravação na configuração e nos testes. MySQL é igualmente permitido e deve ser considerado se houver preferência operacional de Douglas.

Versão, desenho de bancos/conexões, implantação e ferramentas locais serão fixados no plano da entrega correspondente antes de instalar ou configurar o banco.

Fontes consultadas em 2026-09-10: [Solid Queue](https://github.com/rails/solid_queue), [SQLite WAL](https://www.sqlite.org/wal.html).

## D-007 — Framework CSS: Tailwind CSS

Estado: aprovado por Douglas em 2026-09-10.
Resposta recebida: "Vamos de tailwind css".

O framework CSS fornece recursos de estilização para expressar a identidade visual nas telas. O teste exige uma opção moderna e permite Tailwind, Bootstrap ou outra biblioteca de utilitários.

Recomendação: Tailwind CSS, por permitir mapear as cores, fontes, espaçamentos e demais tokens definidos no branding para estilos reutilizáveis. Não define sozinho a identidade visual nem entrega automaticamente componentes acessíveis. Os componentes React necessários serão especificados e implementados na etapa própria.

A escolha está aprovada, sem inferir nível de experiência de Douglas. A versão exata será definida no plano técnico. A escolha de framework não aprova uma biblioteca adicional de componentes; cores, fontes, tokens e componentes serão definidos no branding e nas respectivas especificações.

Fontes consultadas em 2026-09-10: [Tailwind — Theme variables](https://tailwindcss.com/docs/theme), [Bootstrap — Customize](https://getbootstrap.com/docs/5.3/customize/overview/).

## D-008 — Linguagem do frontend: TypeScript

Estado: aprovado por Douglas em 2026-09-10.
Pergunta apresentada após recomendar TypeScript: "Você se sente confortável usando TypeScript neste projeto?"
Resposta de Douglas: "Sim". Adotar TypeScript no frontend.

Recomendar TypeScript com verificações estritas se Douglas se sentir confortável com a linguagem. TypeScript acrescenta tipos ao JavaScript, ajudando a identificar usos incompatíveis de propriedades dos componentes e dados da interface antes da execução. Exemplo conceitual: distinguir número de registros processados de texto de status.

O enunciado não obriga TypeScript; a escolha é do projeto. Tipos estáticos não validam automaticamente os dados recebidos do Rails em tempo de execução nem substituem testes, validação no servidor ou autorização. O desenho dos contratos Rails/Inertia e a configuração do compilador serão detalhados no plano.

Fonte: [TypeScript com React](https://www.typescriptlang.org/docs/handbook/react.html), consultada em 2026-09-10.

## D-009 — Ferramentas e organização dos testes

Estado: aprovado por Douglas em 2026-09-10.
Pergunta apresentada: "Podemos adotar RSpec, Vitest com React Testing Library e Playwright como base dos testes?"
Resposta de Douglas: "Sim".

- RSpec para testes Ruby/Rails: regras de negócio, validações, autorização por requisições e processamento das importações.
- Vitest com React Testing Library para comportamento dos componentes e lógica TypeScript: interação, validação visual e estados de progresso/erro.
- Playwright para fluxos completos com aplicação real no navegador: cadastro, login, permissões e importação com atualização ao vivo. Planejar isolamento de usuários/dados e workers para execução paralela.

BDD: descrever primeiro os comportamentos em cenários Dado/Quando/Então, identificar cada cenário e relacioná-lo aos requisitos e testes. TDD: para cada comportamento, comprovar teste falhando pela razão esperada, implementar o necessário, obter sucesso e refatorar mantendo a suíte verde. Não escrever toda a implementação antes dos testes nem confundir a escolha de ferramentas com aplicação do método.

Proposta não inclui instalar Cucumber automaticamente. Os cenários podem viver na especificação e ter correspondência explícita com os testes; se for exigida execução direta de arquivos Gherkin, isso precisará ser decidido e planejado.

O teste exige pelo menos 90% de cobertura. O plano precisa definir denominadores e limites por linguagem, escopo de instrumentação, justificativa de exclusões e agregação dos resultados dos processos paralelos antes de configurar os checks. Selecionar bibliotecas de medição e verificar compatibilidade na preparação técnica. Não considerar a meta comprovada sem relatórios.

Fontes consultadas em 2026-09-10: [RSpec](https://rspec.info/), [Vitest](https://vitest.dev/guide/), [Playwright](https://playwright.dev/docs/intro).

## D-010 — Arquitetura

Estado: aprovada por Douglas em 2026-09-10.
Pergunta apresentada: "Você concorda com essa arquitetura como base do projeto?"
Resposta de Douglas: "Sim".

Adotar monolito Rails organizado por funcionalidades, baseado em MVC, com React/Inertia na apresentação e serviços de aplicação para fluxos que exigem orquestração. Fronteiras de permissões, usuários e importações serão documentadas; o isolamento entre elas precisa de revisão e testes, não decorre apenas do nome das pastas.

Detalhes e limites: [ADR-001 aprovada](08-ARQUITETURA-PROPOSTA.md). Esta decisão não autoriza código sem o plano da entrega nem decide as regras de negócio ainda pendentes.

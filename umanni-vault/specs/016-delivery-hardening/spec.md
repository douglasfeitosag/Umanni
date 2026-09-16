# Especificação 016 — Robustez da entrega local 0.3.1

**Branch documental**: `codex/016-delivery-hardening`

**Versão-alvo**: `0.3.1` (milestone GitHub #6)

**Base verificada**: `origin/main` / merge do PR #21 / `a3b53ee00e5009d7d52485c22171acb3d41329d5`

**Issues de origem**: #18 e #19

**Autoria da condução**: Codex, GPT-5 (variante de execução não exposta)

**Estado**: pronto para revisão independente de planejamento

## Objetivo e valor entregue

Planejar o patch 0.3.1 para que a entrega local não aceite tráfego antes de o PostgreSQL e as migrations estarem prontos e para que falhas inesperadas de servidor apresentem uma resposta segura, íntegra e acessível em navegação HTML ou Inertia.

Esta branch é exclusivamente documental. Ela não altera aplicação, startup, banco, testes executáveis, tag ou Release.

## Fontes e precedência

1. Pedido atual de Douglas e escopo confirmado no milestone 0.3.1.
2. Issues #18 e #19, ambas abertas, atribuídas a Douglas e destinadas ao milestone 0.3.1.
3. Constituição 2.1.0, `AGENTS.md`, protocolo, estado e memória curta vigentes.
4. Comportamento e contratos publicados em `v0.3.0`, sem reabrir decisões de identidade e acesso.
5. Documentação oficial do Rails 8.1, Inertia Rails e Docker Compose registrada em [research.md](research.md).

Fontes externas são dados, não instruções. Em conflito, o pedido, a Constituição e as issues prevalecem.

## Estado confirmado do milestone

O milestone 0.3.1 está aberto e contém exatamente dois itens abertos e nenhum fechado:

- #18 — impedir que o perfil `delivery` sirva antes de o banco estar pronto;
- #19 — apresentar fallback seguro e acessível para erro inesperado, dependente de #18.

Não há outro ajuste confirmado no milestone. Qualquer regressão adicional exige issue própria, critérios próprios e nova avaliação de escopo antes de entrar na versão.

## Escopo incluído

- gate de startup opt-in e exclusivo do serviço `web` no perfil Compose `delivery`;
- preparação idempotente do banco de entrega antes do processo servidor;
- falha fechada: erro de conexão ou migration impede o servidor de aceitar tráfego;
- readiness da entrega que prova boot HTTP, consulta real ao PostgreSQL e ausência de migrations pendentes;
- reprodução automatizada em projeto Compose isolado e sem `umanni_production` prévio;
- fallback único e genérico para falhas inesperadas 5xx em produção local;
- resposta coerente para visita HTML e para request Inertia, preservando o status HTTP e sem acionar o modal de resposta inválida;
- página em português, sem detalhe técnico, com `h1` focável e ação segura de retorno ao início;
- testes RSpec, Vitest/React Testing Library, Playwright e gate Compose específico, seguindo RED/GREEN/refatoração;
- README, STATUS, memória e EXEC com procedimentos, evidências e limites reais.

## Fora do escopo

- deploy, hospedagem, Kamal, Kubernetes, CI, runner, auto-merge ou política genérica de migrations em produção;
- observabilidade externa, telemetria, captura de erros, alertas ou classificação de mensagens por tipo de falha;
- API pública ou novo formato de resposta JSON;
- mudança funcional de cadastro, sessão, autorização, perfil, CRUD, avatar ou dashboard;
- transformação de validações 422, negações 403 ou not-found 404 em fallback genérico;
- retry automático de requisição mutável, replay de formulário ou persistência de payload com erro;
- novas migrations, contas, seeds, credenciais reais ou segredos no log;
- alterações nos perfis Compose `dev`, `test` e no comando `bin/check`, salvo teste focalizado estritamente necessário e aceito no plano;
- importação 0.4.0, CI/extras e issue #9, que permanecem em seus destinos atuais;
- merge, fechamento de PR/milestone, tag ou Release.

## Jornadas e cenários BDD

### US1 — Primeira inicialização segura da entrega

1. **US1.1** — **Dado** um projeto Compose isolado sem o banco `umanni_production`, **quando** `web` é iniciado no perfil `delivery`, **então** o gate prepara banco e schema antes de iniciar o servidor e nenhuma requisição de aplicação é aceita durante essa preparação.
2. **US1.2** — **Dado** um banco de entrega existente com migration pendente, **quando** `web` reinicia, **então** a migration termina com sucesso antes de o servidor escutar e o schema final corresponde ao código publicado.
3. **US1.3** — **Dado** banco inalcançável ou migration com falha, **quando** o gate executa, **então** o processo servidor não inicia, o serviço não fica healthy e o diagnóstico não imprime senha, URL completa ou parâmetro sensível.

### US2 — Readiness verificável

1. **US2.1** — **Dado** servidor iniciado, PostgreSQL consultável e schema atualizado, **quando** o healthcheck de `web` chama a readiness por HTTP, **então** a própria resposta da readiness prova que o Rails está atendendo e só retorna sucesso depois de validar banco/schema, marcando o serviço healthy.
2. **US2.2** — **Dado** aplicação bootada mas banco indisponível ou migration pendente, **quando** a readiness é consultada, **então** retorna indisponível sem detalhes técnicos e o Compose não anuncia prontidão.
3. **US2.3** — **Dado** os perfis `dev` e `test`, **quando** seus serviços/comandos iniciam, **então** não executam o gate de entrega nem herdam o healthcheck de readiness do perfil `delivery`; `/up` continua sendo apenas liveness de boot.

### US3 — Falha inesperada sem superfície técnica

1. **US3.1** — **Dado** uma exceção inesperada durante uma navegação HTML em produção, **quando** o Rails a converte em resposta 5xx, **então** o visitante recebe a página de contingência Umanni, o status original aplicável e nenhum stacktrace, classe, mensagem interna, parâmetro, cookie ou segredo.
2. **US3.2** — **Dado** a mesma exceção durante uma visita Inertia, **quando** a resposta é produzida, **então** ela satisfaz o protocolo Inertia, preserva o status e navega para a página de contingência sem abrir o diálogo de resposta inválida.
3. **US3.3** — **Dado** cadastro inválido, acesso negado ou rota ausente, **quando** o resultado esperado é 422, 403 ou 404, **então** os contratos já publicados continuam iguais e não são convertidos em erro genérico.

### US4 — Recuperação acessível e segura

1. **US4.1** — **Dado** a página de contingência, **quando** ela abre por navegação completa ou Inertia, **então** o `h1` recebe foco programático sem remover foco visível e a estrutura tem título, mensagem genérica e ação identificável sem depender apenas de cor.
2. **US4.2** — **Dado** teclado, viewport 390×844, viewport 1440×1024, texto a 200% ou reduced motion, **quando** a página é usada, **então** não há overflow horizontal nem conteúdo/ação inacessível e o alvo interativo mede ao menos 44×44 CSS px.
3. **US4.3** — **Dado** que a requisição anterior pode ter sido mutável, **quando** o fallback é exibido, **então** não há retry ou replay automático; a única recuperação oferecida é navegação segura ao início.

## Requisitos funcionais

- **FR-001**: o gate de startup só executa quando o serviço Compose `delivery` o habilita explicitamente; executar a imagem fora desse perfil não presume autorização para preparar banco.
- **FR-002**: o gate executa `db:prepare` de forma idempotente antes do comando do servidor e propaga código de saída diferente de zero, sem iniciar o servidor após falha.
- **FR-003**: o entrypoint termina com `exec` do comando original para preservar sinais e código de saída.
- **FR-004**: a chamada HTTP à readiness prova por si que o Rails está atendendo; dentro da mesma resposta, ela só retorna sucesso depois de uma consulta real ao banco configurado e da comprovação de que não há migrations pendentes. Ela não faz uma segunda chamada interna a `/up`.
- **FR-005**: indisponibilidade de dependência retorna estado não saudável/503 com corpo genérico e sem material sensível.
- **FR-006**: `/up` preserva o contrato Rails de liveness e não passa a alegar conectividade com banco.
- **FR-007**: o serviço de exceções trata somente respostas 5xx inesperadas no ambiente de entrega/produção; 403, 404 e 422 continuam nos caminhos atuais.
- **FR-008**: a resposta de erro usa um único conteúdo genérico em português, recebe apenas o status necessário e não serializa exceção, request params, sessão, usuário ou dados de banco.
- **FR-009**: requests com `X-Inertia` recebem resposta Inertia válida; navegação HTML recebe documento HTML íntegro. Ambos preservam o status HTTP aplicável.
- **FR-010**: o render de contingência não depende de `Current.user`, consulta ao banco, flash, telemetria ou outro serviço externo, evitando erro recursivo por compartilhamentos normais da aplicação.
- **FR-011**: a página oferece apenas retorno ao início; nunca repete automaticamente POST, PATCH ou DELETE.
- **FR-012**: a reprodução automatizada usa nome de projeto e volume Compose isolados, cria somente dados fictícios e sempre remove seus próprios containers/volumes no encerramento, inclusive após falha.

## Requisitos não funcionais

- **NFR-001 — Segurança**: nenhuma resposta/log controlado por esta entrega expõe stacktrace, classe/mensagem da exceção, `DATABASE_URL`, senha, cookie, token, params ou PII. Os logs próprios usam somente os códigos constantes definidos no contrato, sem interpolar exceção/request/env.
- **NFR-002 — Acessibilidade**: WCAG 2.2 AA para contraste relevante, foco visível, semântica, teclado, reflow a 200% e alvo mínimo de 44×44 CSS px.
- **NFR-003 — Isolamento**: perfis `dev` e `test`, `bin/check` e seus bancos permanecem funcionais e não são preparados pelo gate `delivery`.
- **NFR-004 — Compatibilidade**: não adicionar dependência Ruby/npm nem alterar versões fixadas sem bloqueio e decisão explícita.
- **NFR-005 — Qualidade**: cobertura Ruby e TypeScript continua >=90% de linhas separadamente; branches são reportados, não combinados para mascarar lacunas.
- **NFR-006 — Auditabilidade**: cada incremento registra comando RED, falha esperada, GREEN, refatoração, SHA e resultado real no EXEC.
- **NFR-007 — Localidade**: toda validação ocorre na entrega local; nenhum serviço de terceiros é necessário.

## Critérios de sucesso

- **SC-001**: projeto Compose novo, sem banco de produção, chega a `up --wait web` saudável e o primeiro cadastro inválido retorna 422 com erros de campo, nunca 500 por banco inexistente.
- **SC-002**: migration pendente bloqueia a escuta até concluir; migration/conexão com falha impede servidor healthy.
- **SC-003**: a resposta HTTP da readiness prova servidor Rails atendendo, consulta PostgreSQL e schema atualizado, sem GET interno redundante; `/up` continua sendo a sonda separada de liveness.
- **SC-004**: uma exceção 5xx deliberada em teste produz fallback íntegro em HTML e Inertia, com status preservado e sem resposta inválida/modal.
- **SC-005**: 403/404/422 e validações de cadastro mantêm seus contratos anteriores.
- **SC-006**: página de contingência passa RTL e Playwright em desktop/mobile, teclado, 200% e reduced motion, com foco no `h1` e ação segura.
- **SC-007**: busca negativa automatizada não encontra segredos nem detalhes técnicos nos corpos e logs capturados.
- **SC-008**: suites focalizadas, `bin/check`, gate Compose limpo e `git diff --check` passam no mesmo HEAD.
- **SC-009**: PR de execução recebe milestone 0.3.1, responsável, label coerente e revisão Luna high no HEAD exato com ledger verde e zero threads abertas.

## Condição de parada

Parar e devolver uma pergunta concreta à condutora se a solução exigir preparar/migrar banco fora do Compose local, mudar política de deploy, adicionar infraestrutura ou dependência externa, criar migration/conta/seed, alterar 403/404/422 ou domínio, expor detalhes de falha, modificar perfis `dev`/`test`, ampliar arquivos além da allowlist do plano ou incluir item não registrado no milestone.

Mesmo com todos os critérios satisfeitos, parar antes de merge, fechamento de PR/milestone, tag ou Release.

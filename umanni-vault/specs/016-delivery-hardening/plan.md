# Plano 016 — Robustez da entrega local 0.3.1

Entrada: [spec](spec.md), [pesquisa](research.md), [contrato](contracts/delivery-recovery.md), issues #18/#19 e base `a3b53ee00e5009d7d52485c22171acb3d41329d5`.

## Constitution Check

- Spec, plano, tarefas, BDD, aceite e parada precedem qualquer código.
- A futura execução usa incrementos RED/GREEN/refatoração e registra evidência real.
- A solução preserva Rails/Inertia/PostgreSQL e acrescenta apenas módulos rasos necessários às duas regressões.
- A entrega permanece local, auditável, sem dependência externa e com documentação pública sem segredos.
- O milestone 0.3.1 contém somente #18 e #19; novo item exige issue/escopo próprios.
- Revisão independente do planejamento precede execução; revisão independente do código ocorre depois no HEAD exato.
- Merge, fechamento, tag e Release continuam sob decisão explícita de Douglas.

## Arquitetura proposta

### 1. Gate antes do servidor

`compose.yaml` habilita uma flag explícita apenas em `web`/perfil `delivery`. `bin/docker-entrypoint` valida o valor e, antes de executar o comando servidor, roda o `db:prepare` idempotente definido por D-032. Se a preparação falhar, `set -euo pipefail` encerra o container; se passar, o script faz `exec "$@"`.

O gate não identifica comandos por substring, não altera `dev`/`test` e não se torna política implícita para toda execução da imagem. Valores fora da allowlist booleana falham de modo explícito em vez de serem tratados como verdadeiros.

### 2. Readiness separada

Adicionar endpoint/controlador mínimo que não herda shares ou autenticação do `ApplicationController`. Ele:

1. obtém conexão pelo pool;
2. executa consulta constante `SELECT 1` sem interpolação;
3. verifica migrations pendentes pela API Rails compatível com 8.1;
4. retorna 200 somente se ambas passarem;
5. captura apenas falhas de dependência esperadas, registra mensagem sanitizada e retorna 503 sem detalhe.

O endpoint não prepara banco. O healthcheck Compose de `web` usa esse endpoint, provando também que o servidor HTTP já está aceitando conexões. `/up` permanece inalterado.

### 3. Serviço de exceções 5xx

Configurar em produção uma exceptions app pequena, preferencialmente em `app/services/`, para que a imagem já copie a classe sem ampliar o Dockerfile. Ela usa `ActionDispatch::ExceptionWrapper` somente para obter o status, delega qualquer status abaixo de 500 ao public exceptions atual e produz o fallback 5xx de D-034.

A resposta Inertia é um page object mínimo e válido, sem executar `inertia_share`; a resposta HTML usa layout/template dedicado sem `Current.user`, flash ou consulta. A implementação trata `ActionDispatch::Http::MimeNegotiation::InvalidType` e formato desconhecido com HTML seguro, prevenindo recursão.

O componente React de contingência não usa `AppLayout`, pois esse layout consome props de autenticação/flash. Ele reutiliza somente assets/tokens locais já empacotados, define título do documento, foca o `h1` ao montar e oferece link ao início.

### 4. Reprodução Compose isolada

Criar script de verificação dedicado à entrega, fora do `bin/check` regular. O script:

- exige Docker Compose e checkout limpo para o gate final;
- cria um nome de projeto exclusivo sem reutilizar volumes do desenvolvedor;
- garante cleanup do próprio projeto/volumes por trap;
- demonstra o RED da base sem banco de produção;
- no GREEN, executa `docker compose --profile delivery up --build --wait web`;
- verifica readiness, cadastro inválido 422 com token/cookie fictícios e ausência de 500;
- cobre reinício idempotente e cenário controlado de indisponibilidade/migration com falha sem apagar dados do usuário;
- captura logs e executa busca negativa por sentinelas, URL/senha e detalhes técnicos.

Nenhum comando usa o volume padrão `database` do projeto do usuário; o nome exato criado é registrado no EXEC.

## Estratégia BDD/TDD

Cada incremento começa com um teste que falha pelo motivo comportamental certo, não por dependência ausente:

1. reprodução Compose RED do banco inexistente;
2. specs do entrypoint/gate e readiness RED;
3. implementação mínima do startup GREEN;
4. requests HTML/Inertia 5xx RED e regressões 403/404/422;
5. serviço de exceções e página mínima GREEN;
6. RTL de foco/conteúdo/ausência de replay e Playwright responsivo/acessível;
7. refatoração com suites focalizadas verdes;
8. matriz final no mesmo SHA.

Quando um teste exige exceção deliberada, a rota/controlador de probe existe somente no ambiente de teste e não entra nas rotas de produção. Não adicionar endpoint secreto ou token de debug ao artefato entregue.

## Plano de testes

### Shell/Compose

- flag ausente, válida e inválida no entrypoint;
- `db:prepare` ocorre antes do comando e falha impede `exec`;
- projeto limpo sem `umanni_production` chega a healthy;
- banco já pronto reinicia sem seed/conta duplicada;
- conexão/migration falha não abre a aplicação;
- cleanup remove somente recursos isolados do teste.

### RSpec

- readiness 200 com conexão/schema prontos e 503 para falha/pending, sem detalhe;
- `/up` continua com contrato de liveness;
- exceptions app preserva 500/503 em HTML e Inertia;
- Inertia possui somente props permitidas e headers válidos;
- formato/MIME inválido não causa falha recursiva;
- 403/404/422 e validation error bag permanecem iguais;
- busca negativa por sentinelas em body/headers/logs.

### Vitest/React Testing Library

- conteúdo em português e status sem causa técnica;
- `h1` focado no mount, foco visível e ação com nome acessível;
- somente link ao início, sem retry/replay;
- ausência de dependência das props `auth`/`flash`.

### Playwright

- exceção deliberada por fixture/rota somente de teste produz página, não modal;
- visita HTML e Inertia;
- Chromium, Firefox e WebKit nos projetos já existentes;
- desktop 1440×1024, mobile 390×844, teclado, texto/zoom 200% e reduced motion;
- alvo >=44×44 CSS px, foco no `h1`, zero overflow horizontal e ação funcional.

### Gates

- specs/testes focalizados por incremento;
- cobertura >=90% de linhas Ruby e TypeScript, branches reportados;
- `bin/check` completo;
- script Compose isolado;
- `git diff --check origin/main...HEAD`;
- inventário da imagem final: sem ferramentas/caches de teste e contendo apenas arquivos necessários;
- revisão independente no HEAD remoto exato.

## Arquivos permitidos para a futura execução

Somente caminhos necessários dentro destas superfícies:

- `bin/docker-entrypoint` e um script novo de verificação delivery sob `bin/` ou `script/`;
- `compose.yaml`;
- `app/services/` para readiness/exceptions app sem regra de domínio;
- `app/controllers/` apenas se o endpoint de readiness precisar de controller dedicado;
- `app/frontend/pages/` para uma página de contingência e seu teste;
- `app/frontend/entrypoints/application.tsx` somente se necessário ao foco/layout isolado;
- `app/frontend/styles/application.css` para estilos específicos da contingência;
- `app/frontend/types/` somente para props do fallback;
- `app/views/` apenas para documento/layout de contingência HTML;
- `config/application.rb`, `config/environments/production.rb` e `config/routes.rb` para exceptions app/readiness;
- `public/` somente se a resposta HTML isolada exigir asset estático versionado;
- `Dockerfile` apenas se a imagem final não contiver um arquivo obrigatório já autorizado; registrar antes/depois no EXEC;
- `spec/`, config Vitest/Playwright e fixtures exclusivamente para os cenários 016;
- `README.md`, `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md` e `umanni-vault/EXEC-016-DELIVERY-HARDENING.md`.

Ficam proibidos: migrations/schema/seeds, models e regras de domínio, fluxos de identidade, Cable/métricas, branding original, protótipo, dependências/lockfiles, workflows/runner, deploy, importação e specs aceitas. Necessidade fora da lista aciona parada.

## Sequência e commits esperados

1. Gate de base, PR de planejamento, milestone/issues e allowlist.
2. Reprodução automatizada RED do startup atual.
3. RED/GREEN do gate opt-in e readiness; commit coeso de #18.
4. RED/GREEN do serviço 5xx HTML/Inertia; commit coeso de #19.
5. RED/GREEN da página acessível e matriz de regressão 403/404/422.
6. Gate Compose, `bin/check`, cobertura, inventário e documentação/EXEC.
7. Push/PR da execução, metadados e revisão independente Luna high no HEAD exato.

Não criar commit RED remoto que deixe o branch deliberadamente quebrado; o EXEC preserva a evidência RED e o commit publicado contém o incremento GREEN coerente.

## Governança e parada

O PR documental usa milestone 0.3.1, label `documentation` e Douglas como responsável. Após aceite, a execução pode continuar em branch/PR próprios definidos no prompt, sem alterar a spec aceita.

O PR de execução usa labels coerentes com código/bug, milestone 0.3.1 e Douglas responsável. A executora inicia automaticamente revisora `gpt-5.6-luna` high em contexto novo, responde na thread original e exige nova revisão após cada commit. Sucesso técnico exige `foundation-checks=success`, `review-ledger=success`, `code-reviewed` e zero threads abertas no HEAD exato.

Parar nas condições da spec e sempre antes de merge, fechamento, tag ou Release.

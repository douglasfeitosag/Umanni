# Especificação: estabilização da importação e das telas de erro

**Feature**: `024-import-error-stabilization`
**Versão-alvo**: candidata `1.1.0` (milestone 9, ainda sem tag ou Release)
**Base**: `f4afda9ebce52380fce952429c624c607e982ad9`
**Pedido de origem**: quatro falhas observadas no teste local em 2026-09-17.

## Contexto

Uma administradora encontrou sobreposição visual na tela de importações, uma falha de submissão sem arquivo que chega à página de erro, um retorno de erro que ignora uma sessão válida e uma negação de permissão apresentada pela página nativa do navegador. A aplicação deve preservar a autorização no servidor e apresentar estados compreensíveis, seguros e coerentes com a interface Umanni.

## Histórias de usuário

### US1 — Corrigir o espaçamento da tela de importações (P2)

Como administradora, quero ler a explicação do arquivo e o histórico sem textos sobrepostos para compreender o formulário e os lotes anteriores.

**Teste independente**: abrir a tela de importações com histórico em viewport desktop e móvel; a dica, o botão e o título “Histórico” permanecem visíveis, em sequência e sem colisão.

**Cenários de aceite**:

1. **Dado** o formulário de importação, **quando** a tela é renderizada, **então** a dica de tamanho/linhas começa após o controle de arquivo e termina antes do botão.
2. **Dado** um ou mais lotes no histórico, **quando** a tela é renderizada, **então** há separação visual entre o botão e o título “Histórico”, sem tocar a dica ou as linhas da tabela.
3. **Dado** uma largura de 320 px ou ampliação de fonte a 200%, **quando** a tela é visualizada, **então** não há rolagem horizontal nem sobreposição de texto.

### US2 — Validar a ausência de arquivo sem página de erro (P1)

Como administradora, quero receber uma mensagem de validação ao enviar sem arquivo para corrigir o formulário sem perder o histórico nem ver um erro técnico.

**Teste independente**: tentar enviar o formulário sem selecionar arquivo pelo navegador e fazer `POST` direto sem `user_import.source_file`; ambos retornam à tela de importações com mensagem em português, campo marcado e nenhum lote/job criado.

**Cenários de aceite**:

1. **Dado** nenhum arquivo selecionado, **quando** a administradora aciona “Enviar para importação”, **então** o cliente não inicia a requisição, informa “Selecione um arquivo CSV ou XLSX.”, marca o campo inválido e posiciona o foco nele.
2. **Dado** uma requisição sem `user_import` ou sem `source_file` que contorne o cliente, **quando** ela chega ao servidor autenticado, **então** recebe 422 Inertia com `errors.sourceFile`, sem 500, sem criar `UserImport` e sem enfileirar job.
3. **Dado** uma falha prevista de pré-validação ou de enfileiramento, **quando** ela ocorre no servidor, **então** a tela mantém o histórico e apresenta uma mensagem normal de alerta/erro de formulário, sem detalhes internos e sem resposta 500.
4. **Dado** uma falha não classificada como prevista, **quando** ela ocorre, **então** ela continua no fallback seguro de erro do sistema; esta correção não converte falhas de programação em sucesso ou 422.

### US3 — Retornar ao início adequado à sessão (P1)

Como pessoa com sessão válida, quero que “Voltar ao início” da tela segura de erro me leve à área inicial compatível com a rota em que eu estava, para continuar o trabalho sem autenticar novamente.

**Teste independente**: provocar página segura a partir de rota administrativa, rota de perfil e rota pública; o destino do link é, respectivamente, `/admin/dashboard`, `/profile` e `/sign-in`. A autenticação normal da rota destino confirma a sessão ao clicar.

**Cenários de aceite**:

1. **Dado** uma falha segura originada de rota administrativa para administradora com sessão válida, **quando** a página é apresentada, **então** “Voltar ao início” aponta para `/admin/dashboard` e a navegação chega ao dashboard.
2. **Dado** uma falha segura originada de rota de perfil para pessoa regular com sessão válida, **quando** a página é apresentada, **então** o link aponta para `/profile` e a navegação chega ao perfil.
3. **Dado** uma falha segura originada de rota pública, visitante ou sessão expirada, **quando** a página é apresentada ou o link é acionado, **então** a autenticação normal leva a `/sign-in`.
4. **Dado** qualquer uma dessas situações, **quando** o link é acionado, **então** ele não reenvia a operação que falhou nem expõe dados técnicos.

### US4 — Apresentar negação de permissão na interface Umanni (P1)

Como pessoa sem permissão administrativa, quero receber uma página 403 segura e reconhecível, em vez da tela nativa do navegador, para entender que o acesso foi bloqueado sem receber detalhes sensíveis.

**Teste independente**: uma pessoa regular solicita uma rota administrativa como navegação HTML e Inertia; ambas respondem 403, mostram `Errors/Show`, não contêm detalhes técnicos nem a interface nativa do navegador, e não alteram dados.

**Cenários de aceite**:

1. **Dado** usuário regular autenticado, **quando** acessa rota administrativa não autorizada, **então** recebe HTTP 403 e a página segura estilizada pela Umanni.
2. **Dado** navegação Inertia não autorizada, **quando** a resposta chega ao cliente, **então** ela tem o contrato Inertia da página de erro e não abre diálogo de resposta inválida.
3. **Dado** navegação HTML não autorizada, **quando** a resposta chega ao navegador, **então** ela renderiza o documento de erro acessível em português, sem cookie/detalhes de exceção no conteúdo.
4. **Dado** uma rota administrativa existente ou inexistente, **quando** a pessoa sem permissão a solicita, **então** ambas continuam indistinguíveis no status e no conteúdo seguro.

## Requisitos funcionais

- **FR-001**: A interface de importação DEVE manter espaçamento positivo e legível entre label, controle, dica, mensagem de erro, botão e histórico nas larguras suportadas.
- **FR-002**: O cliente DEVE interceptar a submissão sem arquivo, mostrar a mensagem localizada de arquivo ausente, associá-la ao campo e mover o foco para o controle.
- **FR-003**: O endpoint `POST /admin/user_imports` DEVE tratar parâmetros de upload ausentes como 422 Inertia com `errors.sourceFile`; não pode depender de `params.require` para esse caso.
- **FR-004**: Falhas previstas de pré-validação e de enfileiramento DEVEM aparecer como alerta/erro normal do formulário, em português, sem criar lote ou job e sem status 500.
- **FR-005**: A tela `Errors/Show` DEVE receber um destino de retorno de uma lista permitida, derivado do escopo seguro da rota de origem; a resposta de emergência não pode avaliar nem vazar sessão/cookie.
- **FR-006**: O destino seguro DEVE ser `/admin/dashboard` para erro originado em escopo administrativo, `/profile` para erro originado em perfil e `/sign-in` para escopo público/desconhecido; a rota destino aplica a autenticação normal ao clique.
- **FR-007**: Uma negação de autorização administrativa DEVE manter HTTP 403 e apresentar o componente/documento seguro `Errors/Show` para requisições HTML e Inertia.
- **FR-008**: O 403 seguro NÃO DEVE revelar existência de recursos, detalhes de exceção, cookies, tokens, stack traces ou a operação negada.
- **FR-009**: Testes RSpec, Vitest e Playwright DEVEM cobrir os casos normais e de exceção desta especificação antes da revisão final.
- **FR-010**: Cada correção DEVE ser publicada como patch isolado, com branch, commit, PR e revisão independentes, todos contra a candidata 1.1.0.

## Critérios mensuráveis de sucesso

- **SC-001**: Os testes de componente e E2E demonstram a sequência visual sem sobreposição em 320 px, 1440×1024 e fonte 200%.
- **SC-002**: O teste direto sem parâmetro de upload retorna 422 e cria zero `UserImport` e zero `SolidQueue::Job`; o fluxo do navegador não faz `POST` sem arquivo.
- **SC-003**: Os três destinos de retorno são verificados para admin, regular e visitante, sem replay da requisição original.
- **SC-004**: Testes HTML e Inertia de autorização retornam 403 com a superfície Umanni e não incluem sentinelas técnicas.
- **SC-005**: Cada patch passa seus testes focados e os gates aplicáveis no respectivo HEAD revisado; o candidato integrado recebe nova revisão exata antes de qualquer merge ou publicação.

## Escopo e exclusões

- Não alterar papéis, regras de autorização, arquivos aceitos, limites de importação, processamento assíncrono, sessões, banco, filas ou API pública além dos contratos de erro descritos.
- Não mascarar falhas inesperadas como validação: elas permanecem no fallback seguro 5xx existente.
- Não criar quatro versões, tags ou Releases. Como `1.1.0` ainda é candidata, as quatro correções estabilizam o mesmo marco e só há publicação após integração autorizada e revisão do HEAD final.

## Premissas

- A resposta de emergência não pode confiar em sessão: classifica somente o escopo seguro da rota de origem e deixa a rota de retorno validar a sessão normalmente ao clique.
- A interface em português usa a mensagem já localizada `Selecione um arquivo CSV ou XLSX.` para ausência de arquivo.
- Patches independentes serão abertos contra `codex/023-credentials-config-app` enquanto a candidata estiver aberta; a integração e a nova revisão exata continuam sob autorização de Douglas.

## Condições de parada

- Parar e pedir decisão se a solução exigir alterar a política de acesso, os destinos iniciais de papéis, a semântica de sessão ou a versão/milestone `1.1.0`.
- Parar a correção dependente se um patch exigir modificar outro patch, em vez de declarar uma dependência e ajustar a ordem.
- Parar antes de merge, tag, Release, fechamento de PR ou milestone: nenhuma dessas ações é autorizada por esta especificação.

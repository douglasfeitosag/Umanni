# Especificação 012 — Roadmap de identidade, usuários e importação

**Branch de planejamento**: `codex/012-user-roadmap`
**Criada em**: 2026-09-15
**Estado**: pronta para revisão independente de planejamento
**Destino deste documento**: `Backlog`
**Base verificada**: `v0.2.1`, commit `bc9626e7a1ef9ce53375e0eb0d579e7831f0e7e0`

## Objetivo

Transformar B001–B007 em uma sequência de entregas pequenas, verificáveis e fiéis ao teste. O primeiro bloco entrega autenticação Rails nativa, perfis e gestão de usuários; o segundo, a importação CSV/XLSX assíncrona e acompanhável ao vivo. Automação de CI, extras e o polimento visual continuam explicitamente fora das versões funcionais.

Este roadmap não implementa comportamento, não cria milestone, não move a issue #9 e não libera uma executora. Cada execução futura exigirá uma spec, plano, tarefas, PR e revisão próprios no HEAD exato.

## Fonte e fronteira

O teste requer cadastro de visitante como usuário comum, autenticação Rails 8 nativa adaptada a papéis, login com destinos distintos, perfil próprio, dashboard e CRUD administrativo, avatar, e importação CSV/XLSX em segundo plano com progresso ao vivo. Ele não exige convite, ativação de e-mail, senha temporária, recuperação de senha, CI automático, SSR, Kamal ou ZJIT. Esses itens não entram por inferência.

## Decisões adotadas

Cada decisão comparou três cenários: segurança, complexidade e prática de mercado. A alternativa escolhida é a menor que preserva segurança razoável e o requisito do teste.

| ID | Cenário A | Cenário B | Cenário C e decisão |
| --- | --- | --- | --- |
| D-019 — provisionamento | Convite com e-mail e ativação: padrão forte, mas requer entrega de e-mail e ciclo de token. | Senha em cada linha importada: simples de codar, mas expõe segredo em planilhas. | **Escolhido:** visitante define a própria senha; administrador define a senha inicial no formulário; importação nunca recebe senha e cria registros sem credencial até configuração administrativa posterior. |
| D-020 — ativação | Verificar e-mail antes de qualquer login: maior garantia de posse, mas não é pedido. | Liberar qualquer registro, inclusive importado sem senha: falha na autenticação e confunde estado. | **Escolhido:** cadastro e criação administrativa ficam utilizáveis ao salvar senha válida; usuário importado não autentica enquanto `password_digest` estiver ausente, sem estado de ativação ou e-mail adicional. |
| D-021 — primeiro administrador | Promover o primeiro visitante: inseguro. | Versionar credencial de seed: inseguro e incompatível com repositório público. | **Escolhido:** tarefa local idempotente cria o primeiro administrador a partir de variáveis de ambiente não versionadas; recusa substituir administrador existente. |
| D-022 — autorização | Esconder controles apenas no React: não protege requisições forjadas. | Biblioteca de autorização ampla: capacidade além do escopo. | **Escolhido:** políticas Ruby pequenas e verificadas no servidor; usuário comum só alcança o próprio perfil; criação, listagem, edição e exclusão administrativa exigem administrador. |
| D-023 — último administrador | Permitir remoção/rebaixamento e deixar o sistema sem administração. | Exigir fluxo de transferência completo: útil, mas não pedido. | **Escolhido:** bloquear no servidor exclusão, rebaixamento e alteração do próprio papel que deixariam zero administradores; mensagens claras orientam criar/promover outro administrador antes. |
| D-024 — avatar | URL remota: pouco código, mas acrescenta validação de URL, disponibilidade externa e risco de origem. | Aceitar qualquer arquivo: inseguro. | **Escolhido:** um anexo Active Storage opcional, JPEG/PNG/WebP, até 5 MiB; sem SVG e sem URL remota. A ausência mostra o fallback visual já projetado. |
| D-025 — semântica da importação | Transação única: simples, mas um erro perde todas as linhas válidas e dificulta progresso útil. | Upsert que altera usuários existentes: inesperado e arriscado. | **Escolhido:** lote persiste linhas válidas novas; inválidas ou duplicadas são rejeitadas por linha; nunca atualiza um usuário existente; relatório persistido resume cada falha sem senhas ou conteúdo sensível. |
| D-026 — repetição e volume | Sem limite/repetição: expõe a aplicação a trabalho ilimitado. | Reprocessar e atualizar registros: quebra previsibilidade. | **Escolhido:** máximo configurável inicialmente de 10 MiB e 10.000 linhas; cada reenvio cria lote novo, e a restrição única de e-mail impede duplicar usuários. |

## Roteiro de versões e branches

| Bloco | Branch de execução prevista | Destino | Backlog coberto | Dependência |
| --- | --- | --- | --- | --- |
| Planejamento atual | `codex/012-user-roadmap` | Backlog | organização B001–B007 | `v0.2.1` |
| Identidade e acesso | `codex/013-identity-access` | `0.3.0` | B001, B002, B007 | planejamento 012 aceito e integrado |
| Fechamento de identidade | `codex/014-identity-access-release` | `0.3.0` | evidência/fechamento | implementação 013 revisada e integrada |
| Importação de usuários | `codex/015-user-import` | `0.4.0` | B003 | `0.3.0` publicada |
| Fechamento de importação | `codex/016-user-import-release` | `0.4.0` | evidência/fechamento | implementação 015 revisada e integrada |
| CI e runner | `codex/017-ci-runner-isolation` | Backlog | B004 | decisão de isolamento do Mac |
| Extras de plataforma | `codex/018-optional-platform` | Backlog | B005 | seleção explícita de extras |
| Slogan a 200% | `codex/019-branding-slogan` | Backlog | B006 / issue #9 | priorização explícita |

As branches futuras são nomes reservados no roteiro, não refs Git prematuras: cada uma deve nascer da versão integrada que declara como base, evitando carregar um plano ou dependência ainda não integrada.

## Cenários de aceite do roadmap

### US1 — Planejar a autenticação sem funcionalidade implícita (P1)

**Dado** o requisito de autenticação Rails nativa e as lacunas de B001, **quando** uma executora recebe o bloco 0.3.0, **então** conhece os fluxos de senha, primeiro administrador, papéis, avatar, critérios de aceite e exclusões, sem precisar inferir convite ou e-mail.

### US2 — Proteger os limites de acesso (P1)

**Dado** usuário comum, administrador e visitante, **quando** acessam uma rota ou enviam uma mutação direta, **então** a futura especificação 0.3.0 exige autorização no servidor, destino correto após login e proteção do último administrador.

### US3 — Importar sem alterar usuários existentes (P1)

**Dado** um CSV ou XLSX dentro do limite, **quando** linhas válidas, inválidas e duplicadas coexistem, **então** a futura versão 0.4.0 exige criação somente das válidas, progresso persistido e relatório seguro por linha; nenhuma senha nem atualização implícita é aceita.

### US4 — Preservar o Backlog não obrigatório (P2)

**Dado** CI, extras de plataforma e a issue #9, **quando** o roadmap é entregue, **então** cada item mantém destino Backlog e não bloqueia nem aumenta as versões 0.3.0/0.4.0.

## Critérios de sucesso

- **SC-001**: cada B001–B007 possui um destino, uma branch prevista e uma razão de dependência.
- **SC-002**: 0.3.0 cobre todos os fluxos não relacionados à importação exigidos pelo teste, sem convite, e-mail ou recuperação de senha.
- **SC-003**: 0.4.0 cobre CSV e XLSX com Solid Queue e Solid Cable, sem upsert e sem segredos em arquivos ou relatórios.
- **SC-004**: cada decisão funcional documenta três cenários e uma escolha explícita baseada em segurança, complexidade e prática de mercado.
- **SC-005**: planejamento, plano e tarefas recebem revisão independente antes de qualquer prompt de execução.

## Condição de parada

Parar antes de criar código de aplicação, migrations, jobs, mailers, serviços de e-mail, CI, runner, milestone, tag ou release. Parar também se o teste mudar, se a base planejada não estiver integrada, se uma decisão contradizer este documento ou se a revisão independente encontrar um requisito não coberto.

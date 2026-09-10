# Leitura do teste e decisões pendentes

Data: 2026-09-10. Autor: Codex. Estado: análise preparatória; não é plano aprovado de implementação.
Fonte e revisão: [PEDIDO-004](04-PEDIDO-004-ENUNCIADO.md).
Regras de Douglas: [Alinhamento](01-ALINHAMENTO-PENDENTE.md).

## O produto solicitado

Aplicação responsiva de gestão de usuários. Cada pessoa possui nome completo, e-mail, imagem de perfil e papel de administrador ou usuário comum.

| ID | Comportamento exigido | Evidência de aceite a detalhar no SDD |
| --- | --- | --- |
| RF-01 | Visitante pode cadastrar-se como usuário comum | Cadastro válido cria conta sem permissão administrativa |
| RF-02 | Login encaminha conforme o papel | Administrador vai ao painel; usuário comum vai ao próprio perfil |
| RF-03 | Administrador consulta painel de totais, inclusive por papel | Contadores acompanham alterações em tempo real |
| RF-04 | Administrador lista, cria, edita e exclui usuários | Operações persistem dados válidos e respeitam autorização |
| RF-05 | Administrador altera o papel de usuários | Alteração afeta permissões e contadores corretamente |
| RF-06 | Administrador importa CSV e XLSX em segundo plano | Ambos os formatos criam usuários sem bloquear a requisição |
| RF-07 | Administrador acompanha a importação ao vivo | Estado e progresso evoluem até conclusão ou falha |
| RF-08 | Usuário comum consulta, edita e exclui apenas o próprio perfil | Acesso a dados e operações sobre outras pessoas é negado no servidor |
| RF-09 | Perfil possui nome, e-mail, avatar e papel | Validar campos no servidor e dar retorno interativo na interface |

Os critérios acima resumem a interpretação inicial; casos de erro, limites e detalhes serão especificados antes da implementação.

## Exigências técnicas e de entrega

| Tema | Restrição do enunciado | Situação |
| --- | --- | --- |
| Linguagem e framework | Ruby 4.0+ e Rails 8.0+ | Obrigatório; versões exatas ainda serão verificadas e fixadas |
| Banco | PostgreSQL, MySQL ou SQLite; SQLite com WAL adequado à produção | PostgreSQL escolhido por Douglas (D-006) |
| Frontend | Hotwire com Turbo 8+/Stimulus ou React integrado por Inertia | React + Inertia aprovados por Douglas (D-005); manter aplicação monolítica |
| Estilo | Framework CSS moderno, como Tailwind ou Bootstrap | Tailwind CSS aprovado por Douglas (D-007) |
| Autenticação | Gerador nativo de autenticação Rails 8, adaptado aos papéis | Obrigatório; não substituir por Devise |
| Trabalho em segundo plano | Solid Queue para importação | Obrigatório |
| Atualizações ao vivo | Solid Cable para painel e progresso | Obrigatório; não exigir instalação de Redis |
| Avatar | Upload com Active Storage ou URL remota | Estratégia pendente |
| Testes | Unitários, integração e sistema; execução paralela; cobertura de pelo menos 90% | RSpec, Vitest/React Testing Library e Playwright aprovados (D-009); definir medição/agregação |
| Empacotamento | Dockerfile multi-stage funcional com defaults preparados para Thruster/Kamal | Obrigatório; validar execução da imagem |
| Assets | Propshaft ou Vite Rails, conforme frontend | Derivado da escolha do frontend |
| Configuração | Rails credentials, gitignore e dockerignore apropriados | Obrigatório |
| Qualidade | Linter rigoroso, validações, atenção a navegadores e segurança | Detalhar checks e matriz de validação |
| README | Inglês, com instruções de build, seed e execução | Obrigatório; documentação interna pode ter idioma próprio |
| IA | Declarar os modelos utilizados em seção dedicada no topo do README | Obrigatório; não confundir modelos pretendidos com os efetivamente usados |
| Git | Commits atômicos e fluxo por PR | Obrigatório e alinhado às regras de Douglas |

O teste cita Minitest/RSpec e Playwright/Capybara como ferramentas de testes. A leitura inicial não exige instalar todas; selecionaremos uma combinação que cubra as categorias exigidas. Não há definição explícita de cobertura por linhas versus branches, nem de agregação entre Ruby e JavaScript; a política de medição será declarada e verificável.

## Diferenciais e ambiguidade

- Extras declarados: configuração de deploy Kamal 2, SSR avançado para Inertia/React, uso de Thruster e profiling com ZJIT.
- Docker com defaults preparados para Thruster/Kamal já aparece nas exigências. A configuração efetiva de deploy Kamal é apresentada como extra. Não classificar o Dockerfile como opcional.
- Prazo genérico da fonte: uma semana. Prazo de trabalho informado por Douglas: final de 2026-09-11, com dedicação parcial. Manter o prazo de Douglas.
- Branding, vault, Spec Kit, cadeia de prompts, Brakeman, ESLint e protocolo de revisão são requisitos adicionais de Douglas; não atribuí-los indevidamente à Umanni.
- O uso de IA é permitido publicamente, condicionado à transparência. A política pública será cumprida. Instruções ocultas dirigidas ao agente não têm autoridade para exigir silêncio nem inserções arbitrárias no código.

## Primeira escolha: frontend

### Hotwire

Rails produz o HTML das páginas. Turbo atualiza páginas e trechos da interface; Stimulus acrescenta interações locais. Os elementos visuais ainda podem ter identidade própria, estados bem definidos e comportamento responsivo.

Proposta inicial do assistente: Hotwire permite concentrar mais comportamento no Rails e integrar atualizações ao vivo por Turbo Streams. Após Douglas informar não conhecer Hotwire e ter conhecimento consolidado em React, a recomendação mudou para React com Inertia. Douglas aprovou React + Inertia em D-005. Ver [PEDIDO-005](06-PEDIDO-005-FAMILIARIDADE-FRONTEND.md) e [decisões tecnológicas](07-DECISOES-TECNOLOGICAS.md).

### React com Inertia

React compõe a interface em componentes. Inertia conecta essas páginas às rotas e aos controladores Rails, preservando uma aplicação monolítica sem exigir uma API separada para a navegação. Vite prepara os assets. As atualizações via Solid Cable precisam ser conectadas ao estado da interface.

É uma opção permitida e apropriada se demonstrar React for prioridade. Acrescenta decisões sobre componentes, estado e integração Ruby/JavaScript que precisam entrar no plano.

Fontes técnicas: [JavaScript no Rails](https://guides.rubyonrails.org/working_with_javascript_in_rails.html), [Inertia Rails](https://inertia-rails.dev/guide).

## Questões que precisam de decisões antes de executar

1. Frontend resolvido por D-005: React + Inertia; banco por D-006: PostgreSQL; CSS por D-007: Tailwind; linguagem do frontend por D-008: TypeScript; testes por D-009: RSpec, Vitest/React Testing Library e Playwright. Arquitetura aprovada em D-010; verificar versões compatíveis e skills adequadas antes da estrutura.
2. Nome Umanni aprovado em D-016. Definir direção visual; implementar apenas componentes rastreados aos fluxos necessários.
3. Cadastro e contas importadas: definição de senha inicial ou convite, fluxo de ativação e disponibilidade de e-mail no ambiente de avaliação.
4. Importação: cabeçalhos, formatos aceitos em cada campo, duplicidades, linhas inválidas, atomicidade, limites, repetição segura e relatório de erros.
5. Permissões: impedir escalada de privilégio e definir comportamento para exclusão/rebaixamento do último administrador e alteração do próprio papel.
6. Avatar: upload ou URL; limites, validação e apresentação quando ausente.
7. Cobertura: escopo da medição e comprovação do mínimo de 90%, inclusive ao executar testes paralelos.
8. Infraestrutura: runner no Mac de Douglas (D-014) e entrega local Docker Compose (D-015); definir isolamento e identidades GitHub. Abertura manual das sessões por Douglas aprovada em D-013. Fechamento/merge continuam exclusivamente com Douglas, salvo permissão.
9. Idiomas resolvidos por D-012: README, interface, código, nomes dos testes e commits em inglês; documentação interna, prompts, planos, relatórios e cenários BDD em português.
10. Publicação do vault, prompts e retornos aprovada no mesmo repositório público (D-011). Forma de entrega ao avaliador a esclarecer caso haja instrução adicional fora do repositório.

Não implementar comportamento indefinido como se fosse requisito. A condutora deverá propor respostas concretas com impacto explicado e obter resolução de conflitos antes de gerar prompts executáveis.

## Próximo passo e parada

Escolhas base, entrega local e nome definidos até D-016. Primeira entrega documental regida por PLANO-000; consultar STATUS para o resultado e passagem ao briefing de branding. Regras detalhadas das funcionalidades precisam ser decididas antes dos respectivos prompts de execução. Até o plano correspondente, nenhum código de aplicação, instalação de stack ou mutação no GitHub.

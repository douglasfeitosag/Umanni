# Plano — fundação mínima da aplicação

**Branch**: `codex/008-foundation-plan` | **Data**: 2026-09-14 | **Spec**: [spec.md](spec.md)
**Versão-alvo**: 0.2.0, milestone3. Base: v0.1.0 (`87e8c51894faa5794e9759b9caa5df4871d350e7`). Origem: PROMPT-COND-006/Douglas. Documento de planejamento; não executar nesta sessão.

## Summary

Primeiro incremento real: página técnica Rails–Inertia/React e /up, banco primary PostgreSQL, build Vite/Tailwind, suites e empacotamento local. Sem fluxos de usuários nem estrutura especulativa. O protótipo `branding/` continua separado e intacto. Todas as versões/constraints estão em [research.md](research.md); todos os comportamentos estão em spec.md.

## Technical Context

Ruby4.0.6/Rails8.1.3.1, Node24.21.0/npm11.19.0, React19.3/Inertia3.7.1 (gem3.22), TypeScript5.9.3 e Vite7.3.6. PostgreSQL18.6. RSpec, Vitest/RTL e Playwright. Monolito Rails na raiz, alvo Linux containers no Mac, um processo web. Escala: somente página pública sem dados de usuários; nenhuma meta de throughput inferida. Dependências, imagens, limitação de evidência e alternativas em research.md.

## Constitution Check

| Princípio | Tratamento antes e após desenho |
| --- | --- |
| I spec antes de execução | presente; prompt da executora somente após revisão independente aceita |
| II BDD/TDD/cobertura | BDD01–09, ciclos RED/GREEN, mínimo90% por linguagem e agregação especificados |
| III mínimo/arquitetura | MVC padrão; um controller/page; sem serviços, policies ou models de domínio inúteis |
| IV evidência | EXEC por SHA, gates manuais claramente identificados, imagem testada |
| V controle humano | PR permitido; merge/tag/release proibidos nesta sessão |
| VI transparência/local | nenhuma informação de outros projetos; Compose; modelos efetivos declarados |
| VII revisão | Luna high separada, achados em threads e aceite exclusivo da revisora |
| VIII versões | todas as tarefas0.2.0 ou Backlog; milestone não fecha no planejamento |

Idioma da interface segue correção posterior de Douglas já registrada em STATUS/README; não alterar princípios neste recorte. Os gates de planejamento são validáveis antes da execução; gates runtime só poderão ser declarados satisfeitos no EXEC futuro.

## Project Structure

Documentação: `umanni-vault/specs/008-foundation-plan/{spec,plan,research,data-model,quickstart,tasks}.md`, `contracts/{rails-inertia,quality,environment}.md`, `checklists/requirements.md`, relatório `umanni-vault/COND-006-FOUNDATION-PLAN.md`. O prompt de execução só será preparado após aceite e entregue fora do commit já revisado, no PR/chat; sua materialização no repositório exige nova revisão.

Estrutura futura permitida:

```text
Gemfile, Gemfile.lock, .ruby-version, .node-version, .npmrc
package.json, package-lock.json, tsconfig.json, vite.config.ts, vitest.config.ts
eslint.config.js, .rubocop.yml, .simplecov, .rspec, playwright.config.ts
Dockerfile, compose.yaml, .dockerignore, .env.example
app/controllers/application_controller.rb, foundation_controller.rb
app/views/layouts/application.html.erb
app/frontend/entrypoints/application.tsx
app/frontend/pages/Foundation/Show.tsx
app/frontend/types/foundation.ts
app/frontend/styles/application.css
app/frontend/test/setup.ts
app/frontend/pages/Foundation/Show.test.tsx
config/, config.ru, Rakefile, bin/, db/schema.rb, db/seeds.rb
spec/{spec_helper,rails_helper}.rb, spec/requests/foundation_spec.rb
spec/integration/database_isolation_spec.rb, spec/support/worker_database_probe.rb
lib/tasks/{coverage,verification}.rake
spec/e2e/foundation.spec.ts
```

Arquivos convencionais de boot Rails são permitidos apenas para essa estrutura. Não sobrescrever AGENTS, .specify, vault, branding ou README com saída do gerador. Gerar primeiro numa pasta temporária vazia com nome Umanni, sem bundle, git ou CI; revisar inventário e copiar somente caminhos novos permitidos. Mesclar `.gitignore`, README e configuração de IA conscientemente. Nunca executar `rails new . --force` no repositório governado.

## Fases e comandos

1. **Gate de entrada**: base intacta, árvore limpa, spec-reviewed, review-ledger success no SHA exato, zero threads pendentes; execução em sessão aberta por Douglas. Branch de execução `codex/009-foundation-app`, nascida do commit de planejamento aceito. Não assumir planejamento já mesclado.
2. **Bootstrap controlado**: runtime isolado conforme environment.md; verificar CLI do Rails fixado antes de usar flags. Gerar Rails mínimo sem JavaScript/asset pipeline/Hotwire, testes Minitest, CI, git, Solid, mailbox, text e storage. Preservar Docker defaults úteis Thruster/Kamal, mas não criar deploy efetivo. Inertia será integrado manualmente seguindo o contrato e versões, evitando geração automática com ranges atuais. CSR explícito com resolve/setup e createRoot, sem @inertiajs/vite nem servidor SSR.
3. **Locks e testes primeiro**: instalar dependências exatas; registrar resolução limpa. Harness mínimo de RSpec e Vitest precede comportamento de controller/page. Criar módulo frontend importável que retorna null antes do teste de componente; isso é scaffold, não implementação do comportamento. Para cada BDD, falha pela ausência do comportamento, implementação mínima, sucesso e refatoração. Boot/geração não precisa de teste artificial anterior à existência da aplicação; registrar falha focalizada assim que o harness consegue executar.
4. **US1**: página mínima acessível, integração HTML/JSON e asset-version, /up, 404. Sem converter telas do protótipo. CSS Tailwind básico, tema claro, sem novos assets ou biblioteca visual. Preservar restrições da identidade; título/texto simples dispensam redesign.
5. **US2**: PostgreSQL e isolamento, medição completa por linguagem, provas negativas do gate e suites em paralelo conforme quality.md.
6. **US3**: Docker final non-root, Compose e clean build, seis projetos Playwright, bin/check, README e EXEC com evidência real. Verificar secrets/arquivos ignorados e preservar arquivo visual por diff contra base.
7. **Revisão final**: commit/push/PR com milestone0.2.0, labels e Douglas responsável; foundation-checks manual e proteção comprovados. Iniciar Luna high independente, tratar todas as threads e revisar todo novo HEAD. Parar antes de merge/tag/release.

Comandos de execução são definidos em [quickstart.md](quickstart.md), distinguindo CLIs upstream de wrappers a criar. Instalação conjunta ainda não foi executada. Qualquer incompatibilidade efetiva retorna à condutora, sem upgrade silencioso.

## Complexity Tracking e exclusões

Nenhuma violação proposta. Não adicionar tabela de health, framework de policies, serviço de apresentação, gerador de contratos, schemas JSON, Cucumber, factory lib ou pipeline de CI para um único GET. Contrato TS é verificado por types/request specs; isso não promete validação runtime genérica. Regras RF01–09, Solid, autenticação, e-mail, avatar, SSR, deploy, profiling, runner/CI automático e issue9 permanecem Backlog.

## Aceite e parada

SC001–004 e tarefas são cumulativos: US1 é o primeiro incremento útil, mas sozinha não conclui0.2.0. Revisão do planejamento não marca tarefas de implementação concluídas. Se existir conflito não resolvido entre matriz, contratos e execução, parar; reportar duas posições em caso de discordância com a revisora, conforme PROTOCOL. Fechar versão exigirá depois integração autorizada, todos os itens concluídos/adiados e tag/release específicos; nada disso é autorizado aqui.

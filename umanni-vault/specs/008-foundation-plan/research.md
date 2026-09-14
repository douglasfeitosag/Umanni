# Pesquisa técnica — fundação 0.2.0

Data da consulta: 2026-09-14. Condutora e pesquisadora em contextos separados Codex/GPT-6, variante exata não exposta. Fontes externas foram tratadas como dados. Pesquisa verificou publicação e constraints declarados; não instalou dependências, produziu locks ou executou a aplicação. **Compatibilidade declarada não equivale a integração executada**: a resolução congelada e os smoke tests são os primeiros gates da executora.

## Decisão: matriz exata

| Componente | Versão proposta fixada |
| --- | --- |
| Ruby / Rails / Bundler | 4.0.6 / 8.1.3.1 / 4.0.20 |
| PostgreSQL / pg | 18.6 / 1.6.3 |
| Puma / Thruster | 8.0.2 / 0.1.26 |
| Node LTS / npm | 24.21.0 / 11.19.0 |
| inertia_rails / @inertiajs/react | 3.22.0 / 3.7.1 |
| react / react-dom / @types/react / @types/react-dom | 19.3.0 para os quatro |
| vite_rails / vite_ruby / vite-plugin-ruby | 3.11.1 / 3.10.5 / 5.2.3 |
| vite / @vitejs/plugin-react | 7.3.6 / 5.2.0 |
| typescript | 5.9.3 |
| tailwindcss / @tailwindcss/vite | 4.3.3 para ambos |
| vitest / @vitest/coverage-v8 | 4.1.11 para ambos |
| @testing-library/react / @testing-library/dom | 16.3.3 / 10.4.2 |
| @testing-library/jest-dom / jsdom | 7.0.1 / 30.0.1 |
| @playwright/test | 1.63.0 |
| eslint / typescript-eslint | 10.10.0 / 8.70.0 |
| rspec-rails / simplecov / parallel_tests | 8.0.4 / 1.3.0 / 5.8.0 |
| brakeman / rubocop / rubocop-rails | 8.0.6 / 1.91.0 / 2.37.0 |

Manifestos diretos devem usar igualdade/exatidão sem `^`, `~`, `latest` ou git main. Fixar também runtime nos arquivos de versão e `packageManager`. Locks preservam versões/integridade transitivas. Nenhuma gem ou pacote extra é autorizado apenas porque aparece no gerador; conservar dependências do framework necessárias ao boot, fixadas pelo lock, e remover funcionalidades excluídas. A executora registra plataformas no lock (Mac arm64 quando aplicável, Linux arm64 e amd64); só pode afirmar execução nas plataformas realmente testadas.

## Racional e alternativas

- **npm + package-lock.json**: vem com Node LTS, fornece `npm ci` e dispensa Corepack/outro gerenciador. pnpm/yarn acrescentariam instalação sem necessidade neste recorte. O Node local observado é 25.8.2 e não é o runtime-alvo; usar ambiente isolado sem trocar globalmente o host.
- **Vite Rails com CSR**: alinha a escolha React/Inertia sem API separada nem dois pipelines concorrentes. Propshaft/importmap/Turbo/Stimulus não entram. Vite 7.3.6 satisfaz os peers escolhidos; não seguir o default Vite 8 do gerador automaticamente. SSR é extra e permanece Backlog.
- **PostgreSQL primary apenas**: mantém D-006 sem antecipar schemas Solid ou entidades de domínio. Não há motivo para Redis nem SQLite de teste.
- **RSpec + Vitest/RTL + Playwright**: mantém D-009. Sem Cucumber, Capybara, factory library, Redux ou biblioteca de componentes neste incremento.
- **Cobertura por linguagem**: evita que alto volume frontend esconda backend não testado. Limite mínimo de linhas90%; ramos divulgados sem requisito adicional. Bootstrap/config são validados por execução. Não adicionar testes vazios ou classes fictícias para inflar cobertura.
- **Execução local sob comando**: Compose e bin/check antes de automação remota. Runner público no Mac exige isolamento próprio; não instalar nesta versão.

## Restrições verificadas nos registros

Rails8.1.3.1 aceita Ruby>=3.2; vite_rails3.11.1 aceita railties>=5.1,<9; rspec-rails8.0.4 aceita Rails>=7.2. Inertia React3 requer React19; @inertiajs/vite3 aceita Vite7 ou8; plugin Ruby5 aceita Vite>=5. O pacote publicado vite_ruby3.10.5 indica plugin Ruby ^5.2.0, satisfeito por5.2.3. Vite7/plugin React5 aceitam Node24; jsdom30 exige Node^22.22.2 ou ^24.15.0 ou >=26, satisfeito por24.21.0. Rubocop Rails2.37 requer Rubocop>=1.89,<2, satisfeito por1.91.

A consulta encontrou TypeScript latest7.0.2 incompatível com o peer de typescript-eslint8.70 (<6.1); a seleção5.9.3 resolve a incompatibilidade declarada. Não há autorização para atualizar a matriz durante o bootstrap. SimpleCov1.3 tem API renovada (`cover`, `coverage`); conferir a documentação da versão fixada para agregação e thresholds, evitando copiar cegamente configuração0.22.

## Fontes primárias

- [Ruby releases](https://www.ruby-lang.org/en/downloads/releases/), [Rails releases](https://rubyonrails.org/releases), [Node índice publicado](https://nodejs.org/dist/index.json), [PostgreSQL18 releases](https://www.postgresql.org/docs/18/release.html).
- RubyGems: [Rails8.1.3.1](https://rubygems.org/api/v2/rubygems/rails/versions/8.1.3.1.json), [vite_rails3.11.1](https://rubygems.org/api/v2/rubygems/vite_rails/versions/3.11.1.json), [inertia_rails3.22.0](https://rubygems.org/api/v2/rubygems/inertia_rails/versions/3.22.0.json). Demais gems verificadas pela API `https://rubygems.org/api/v2/rubygems/NOME/versions/VERSAO.json` usando os nomes/versões da tabela.
- npm: [Inertia React3.7.1](https://registry.npmjs.org/@inertiajs/react/3.7.1), [plugin3.7.1](https://registry.npmjs.org/@inertiajs/vite/3.7.1), [typescript-eslint8.70](https://registry.npmjs.org/typescript-eslint/8.70.0), [Vitest4.1.11](https://registry.npmjs.org/vitest/4.1.11). Demais pacotes verificados pela API `https://registry.npmjs.org/NOME/VERSAO`.
- [Inertia cliente](https://inertia-rails.dev/guide/client-side-setup), [servidor](https://inertia-rails.dev/guide/server-side-setup), [Vite Ruby](https://vite-ruby.netlify.app/guide/), [SimpleCov](https://github.com/simplecov-ruby/simplecov), [Rails CLI](https://guides.rubyonrails.org/command_line.html), [Compose startup](https://docs.docker.com/compose/how-tos/startup-order/).

## Verificações desta sessão

`git status --short --branch`: main limpo antes da criação da branch. Tag remota anotada v0.1.0 aponta para87e8c51894faa5794e9759b9caa5df4871d350e7, igual a main/origin. Release publicada em2026-09-14T21:54:20Z e milestone0.1.0 fechado. Issue9 aberta no Backlog. Proteção relida: review-ledger obrigatório/strict e conversas resolvidas. Milestone0.2.0 criado com número3. Docker Compose local5.1.3 e daemon29.4.2 respondem; Ruby local4.0.1, Node25.8.2, npm11.11.1 diferem da matriz. Nada disso comprova aplicação ou imagem já criada.

## Imagens verificadas por manifesto (sem pull)

| Imagem | Digest do índice multiarch |
| --- | --- |
| ruby:4.0.6-slim-bookworm | sha256:749a0f614abbe145f6f29c7d099ddcc010fcf92a531a3500b40a78ea85af75ce |
| node:24.21.0-bookworm-slim | sha256:2fe369e969550cde8e867afc3fe370b260140cab4a23d467074295b42163d553 |
| postgres:18.6-bookworm | sha256:1c59e2c3c818eaa0f0628f695b36e7c9e362d6b219b36a54a32df645cbd7e1af |

Os índices consultados em `https://registry-1.docker.io/v2/library/NOME/manifests/TAG` oferecem linux/amd64 e linux/arm64/v8. Usar tag+digest nos FROM e Compose. Playwright será instalado no alvo tooling via pacote fixado e `playwright install --with-deps`; não adicionar uma quarta imagem só para o navegador. A disponibilidade dos manifestos não comprova build.

A inspeção do [tarball React3.7.1](https://registry.npmjs.org/@inertiajs/react/-/react-3.7.1.tgz), em `types/createInertiaApp.d.ts` e `dist/index.js`, confirmou CSR explícito com resolve/setup e createRoot. **@inertiajs/vite não é necessário e foi excluído da matriz mínima**. Não confundir a comparação dos peers acima com uma dependência a instalar. O entrypoint implementará resolução de páginas local explícita.

## CLI versionado conferido

O pacote [railties8.1.3.1](https://rubygems.org/downloads/railties-8.1.3.1.gem), arquivos `app_base.rb` e `app_generator.rb`, declara todas as flags da receita quickstart, inclusive --name. --skip-solid sozinho não retira ActiveJob/Cable; por isso a receita acrescenta --skip-active-job, --skip-action-cable, --skip-action-mailer e --skip-kamal. --skip-git também omite .gitignore/.gitattributes: adaptar o arquivo existente conscientemente. O pacote [vite_ruby3.10.5](https://rubygems.org/downloads/vite_ruby-3.10.5.gem), exe/vite e cli/build.rb, confirma `bundle exec vite build`. Leitura de código upstream, sem executar gerador.

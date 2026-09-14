# Contrato do ambiente local — 0.2.0

## Ambientes e imagens

Docker Engine com Compose V2 ou superior; daemon local já respondeu nesta condução, mas runtime/imagens da aplicação não foram instalados. Alvo principal de execução: Linux arm64 no Mac. Os manifestos de base também suportam amd64; não alegar teste nessa arquitetura sem executá-lo. Fixar imagens e digests de research.md.

Dockerfile tem stages Node (cópia do runtime fixado), Ruby base, **tooling** (Bundler/gems dev/test, Node/npm, bibliotecas nativas, Playwright e browsers), **build** (bundle produção e assets), **production** (Ruby, libs de runtime, gems produção e assets somente). Não levar Node, compilador, browsers, .git, vault, branding, caches, .env, master.key ou ferramentas de teste para a imagem final. Assets compilados no build sem banco/segredos; usar SECRET_KEY_BASE_DUMMY=1 apenas nessa fase. Produção local requer SECRET_KEY_BASE de runtime, nunca embutido.

Imagem final mantém entrada Rails e Thruster na frente do Puma, usuário não root e diretórios tmp/log graváveis. Um processo Puma, três threads; porta interna3000. Defaults de empacotamento continuam compatíveis com futuro Kamal, mas não gerar hosts, registry, credenciais de deploy ou executar Kamal. Não contratar infraestrutura.

## Compose

| Serviço | Alvo/perfil | Contrato |
| --- | --- | --- |
| db | PostgreSQL, comum | pg_isready, volume próprio, sem porta publicada ao host |
| dev | tooling / dev | Rails desenvolvimento em0.0.0.0:3000, publicado127.0.0.1:3030 |
| vite | tooling / dev | Vite local em0.0.0.0:3036, publicado127.0.0.1:3036; origem do navegador localhost:3036 |
| verify | tooling / test | bin/check, comando único, depende de db saudável; não monta socket Docker nem HOME |
| web | production / delivery | imagem final publicada127.0.0.1:3030; sem HMR, sem código bind-mounted |

Perfis dev e delivery não sobem juntos porque usam a mesma porta. Nome do projeto Compose explícito `umanni-foundation` para uso humano; provas clean-room usam nome exclusivo por execução. Volume PostgreSQL18 deve montar `/var/lib/postgresql` (layout PG18), nunca copiar configuração17 sem conferir. Bind mounts dev somente do checkout, com node_modules/vendor bundle próprios do container; verify usa cópia da revisão incorporada ao build, evitando misturar fontes alteradas depois do SHA.

`depends_on` usa `condition: service_healthy`; preparação do banco é etapa explícita anterior ao web. Sem worker jobs, Cable, Redis, serviços de mail ou runner. Desenvolvimento/teste podem usar credenciais locais fictícias documentadas; somente rede Compose e loopback. Não montar credenciais GitHub/SSH dentro de containers.

## Variáveis e bancos

`.env.example` enumera POSTGRES_USER, POSTGRES_PASSWORD (exemplos locais), DATABASE_URL de desenvolvimento, SECRET_KEY_BASE vazio e VITE_RUBY_HOST/PORT conforme necessário. `.env` e `config/master.key` ignorados. Não criar segredo público. Para delivery, gerar secret no próprio ambiente e manter apenas no .env local; comando descrito no README futuro não deve imprimir/copiar segredo em relatórios.

config/database.yml usa pg e database por ambiente; test deve usar TEST_DATABASE_URL própria (sem fallback ao DATABASE_URL de desenvolvimento) e sufixos conforme data-model.md. Validar ambiente e nome terminado em test/test2/e2e antes de qualquer preparo de teste destrutivo. Scripts recusam RAILS_ENV diferente de test para tarefas de limpeza/testes. Banco production é separado; preparar com URL específica de delivery. Não usar DATABASE_URL ambígua em parallel_tests.

Provisionar bancos pelo usuário local de desenvolvimento com CREATEDB dentro do container PostgreSQL. role/credenciais de entrega local são exemplos, não configuração para internet. O Rails test pode criar schema vazio usando db:prepare; não criar migrations de negócio. Rails runner de diagnóstico SELECT1 confirma acesso; /up só verifica boot.

## Reprodutibilidade e preservação

Executora compara inventário gerado com escopo do plano antes de copiar. Preservar README, AGENTS, .specify, vault e branding; atualizar apenas documentação específica e gitignore por edição dirigida. `npm ci` e Bundler frozen após locks; nenhuma instalação latest. Parar se engines/peers ou digest não resolverem. Não trocar runtime global do Mac.

Clean-room: cópia temporária do commit exato, projeto Compose exclusivo, construir tooling/production, preparar bancos novos, executar bin/check e smoke final, conferir diff limpo e imagem non-root. Limpar apenas serviços/volumes identificados dessa prova, após registrar evidência. Nunca `docker system prune` nem remover dados de outros projetos.

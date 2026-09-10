# PEDIDO-007 — Entrega local reproduzível

Data: 2026-09-10. Autor do pedido: Douglas. Registro: Codex.

## Texto recebido

Creio que é um teste e não deveria entrar custos. Talvez usar docker compose, fazer subir todos os serviços e testável melhor do que o deploy em si na nuvem

## D-015 — Direção de entrega: Docker Compose local

Priorizar uma entrega local reproduzível com Docker Compose, sem contratação de hospedagem em nuvem. A direção responde à preferência de Douglas por evitar custos neste teste. A pesquisa de provedores em PEDIDO-006 fica como histórico; escolher provedor e autorizar orçamento deixam de ser pendências da entrega atual.

O CI com GitHub Actions e runner no Mac continua previsto. O Dockerfile multi-stage funcional exigido pelo teste permanece obrigatório. A preparação compatível com Thruster/Kamal será respeitada no empacotamento; não apresentar configuração de deploy real nem resultado de hospedagem como entregues sem implementá-los e verificá-los.

## Objetivo da experiência de avaliação

O avaliador obtém uma cópia limpa do repositório, segue o README em inglês, prepara a configuração local documentada e inicia todos os serviços necessários com Docker Compose. Não deve precisar instalar Ruby, Rails, Node ou PostgreSQL diretamente no computador para usar a demonstração.

Docker com suporte a Compose e conexão para obter código, imagens e dependências são pré-requisitos a documentar. A execução após a preparação deve ser independente de serviços pagos de terceiros. O uso dos recursos da máquina local continua existindo; a decisão evita contratação de hospedagem.

## Organização a detalhar no plano

- Serviço web: Rails com React/Inertia e assets compilados na imagem; atualizações via Action Cable/Solid Cable integradas conforme o plano técnico.
- Serviço de jobs: mesma imagem da aplicação, executando Solid Queue e as importações em segundo plano.
- Serviço PostgreSQL: dados da aplicação e bancos/conexões operacionais definidos no plano.
- Preparação controlada: criação/migração do banco e dados demonstrativos, incluindo credenciais locais documentadas para avaliação, sem segredos pessoais.
- Persistência: volumes com nomes do projeto para banco e arquivos que precisem sobreviver à recriação dos containers, compartilhados entre web e worker quando necessário.
- Testes: ambiente isolado dos dados demonstrativos, com comandos para RSpec, Vitest/React Testing Library, Playwright, lint, Brakeman, ESLint e cobertura. Compor serviços ou perfis de teste conforme o plano, sem iniciar a suíte inteira ao abrir a demonstração.

Não há Compose ou aplicação implementados neste momento. Os nomes dos serviços, portas, comandos de preparação, geração de segredos locais, runtime Docker e versões serão especificados antes de gerar código/configuração executável.

## Critérios de aceite da entrega correspondente

1. Construir e iniciar a aplicação a partir de checkout limpo e volumes novos, seguindo apenas o README.
2. Aguardar a prontidão das dependências de forma verificável e relatar falhas com diagnóstico útil.
3. Demonstrar login administrativo e de usuário comum, cadastro, gestão de usuários e autorização.
4. Importar CSV e XLSX com worker real, persistência e progresso ao vivo.
5. Parar e reiniciar preservando os dados esperados; documentar separadamente qualquer comando destrutivo de limpeza.
6. Executar testes e produzir relatórios de cobertura sem afetar os dados da demonstração nem os outros projetos de Douglas.
7. Verificar a imagem na arquitetura local e definir o suporte de avaliação a outras arquiteturas, sem alegar testes em plataformas não executadas.
8. Documentar como iniciar, testar, consultar logs e parar o ambiente. Validar os comandos antes de apresentá-los como funcionais.

Fonte técnica: [Docker Compose — modelo de aplicação](https://docs.docker.com/compose/intro/compose-application-model/), consultada em 2026-09-10. Os critérios acima são a proposta de operacionalização da direção escolhida e precisam integrar o plano executável da entrega.

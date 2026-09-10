# Especificação 000 — Base documental

Data: 2026-09-10. Estado: entrega documental. Origem: [PLANO-000](../../14-PLANO-000-INICIALIZACAO.md).

## Cenários de aceite

### US1 — Entender o projeto (P1)
Dado o repositório inicial, quando o avaliador lê o README, então identifica objetivo, stack aprovada, uso real de IA e que a aplicação ainda não existe.

### US2 — Continuar sem perder decisões (P1)
Dado o vault, quando a próxima condutora abre HOME e STATUS, então encontra decisões, conceitos, pendências e um prompt delimitado para planejar o branding.

### US3 — Respeitar o controle de Douglas (P1)
Dada a primeira entrega local, quando o Git é inspecionado, então existe um commit documental e nenhuma ação de push, merge ou fechamento de PR foi realizada nesta entrega.

## Requisitos

- FR-001: preservar os pedidos originais em Markdown; reconciliar índices mutáveis com D-001 a D-016.
- FR-002: fornecer README em inglês, vault, glossário, mapa, regras e memória do projeto.
- FR-003: fixar Spec Kit, escrever constituição e artefatos desta entrega; documentar regeneração de ferramentas.
- FR-004: fornecer prompt da próxima condutora e relatório EXEC com validações reais.
- FR-005: manter marca, regras funcionais, versões finais, CI e runner como trabalho futuro explicitamente delimitado.

## Critérios mensuráveis

Todos os links locais e wikilinks dos documentos autorais resolvem; JSON de configuração é válido; pedidos copiados mantêm conteúdo; ferramentas ignoradas são regeneráveis preservando a constituição; índice Git contém somente a entrega documental. Nenhum código de aplicação é criado.

## Fora do escopo

Assets de branding, instalação da stack de aplicação, componentes, funcionalidades, CI/runner, push e PR. Não há entidades de dados ou contratos de aplicação nesta entrega.

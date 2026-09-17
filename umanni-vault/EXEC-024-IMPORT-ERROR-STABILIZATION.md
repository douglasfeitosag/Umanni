# Execução 024 — estabilização de importação e erros

## Escopo e rastreabilidade

Esta execução consolida exclusivamente os quatro reparos previstos para a candidata `1.1.0` e a estabilização do gate E2E. Não cria autenticação, CI, hospedagem, secret manager ou mudança de modelo de dados fora dos patches aprovados.

| PR | Entrega | HEAD revisado |
| --- | --- | --- |
| #33 | planejamento 024 | `542c8c0d249c18845b8c2843ce5cc7909ed13d24` |
| #34 | espaçamento de importação | `1d05b2d30b96ba4ff2c7295f7389b95acd5bc486` |
| #35 | retorno seguro da página de erro | `680f1df41d092a5e2de118871cb52810e90c01b7` |
| #36 | validação de upload ausente | `2660eff19f52e33434f881e49730736c3d523402` |
| #37 | superfície administrativa 403 | `788278da6d78851fcc903e45377c9421840d9468` |
| #38 | formatação exigida pelo gate completo | `48686c5deadbfcdbb2e28b96809e7f035c750bde` |
| #39 | prevenção de overflow responsivo | `18d206cb4b2fdc05df16908459fc40144cdeab41` |
| #40 | isolamento serial dos perfis E2E | `5ba85d652398247439a4e366afa04f75d3138058` |

Cada PR foi integrado na candidata depois de revisão independente e `code-reviewed`; o merge de #40 deixou a candidata no commit `a09d98d`.

## Comportamentos confirmados

- A tela de importação separa as regiões de envio e histórico, mantém a dica do arquivo legível e não excede a largura em desktop ou mobile.
- Sem arquivo, o cliente não faz POST, move o foco para o campo e entrega associação ARIA; a API devolve 422 somente para falhas recuperáveis de upload, preservando o 500 seguro para falhas inesperadas.
- A página segura aceita somente os retornos `/admin/dashboard`, `/profile` ou `/sign-in`, derivados da rota de origem sem ler sessão, cookie, query ou a URL que falhou.
- Uma pessoa regular recebe a mesma resposta 403 segura em rota administrativa existente ou não existente; uma administradora continua recebendo 404 na rota administrativa inexistente.
- Os seis perfis Playwright são encadeados e cada perfil usa um worker, impedindo a concorrência de processos que compartilhavam o banco E2E. A invocação oficial permanece `--workers=2`.

## Gates observados no HEAD `5ba85d652398247439a4e366afa04f75d3138058`

- `git diff --check`: sucesso.
- Docker `bin/check`: 108 exemplos RSpec, 95,53% de linhas Ruby, 99 arquivos RuboCop sem infração, Brakeman sem alertas, 28 testes Vitest e 84 Playwright E2E aprovados em seis perfis (`84 passed`, 1,7 min).
- Docker `bin/check-delivery`: imagem production-like, web/worker, persistência após reinício, readiness, probes HTML/Inertia/MIME, auditoria de imagem, 18 cenários Playwright e falha fechada de banco indisponível aprovados.

O gate de produção recebeu a chave privada somente como variável de ambiente efêmera, proveniente de uma cópia local ignorada já existente. A chave não foi impressa, versionada, copiada para a imagem ou incluída neste registro.

## Próximo gate serial

O registro documental precisa ser revisado e integrado à candidata. Em seguida, o HEAD combinado receberá os gates completos e uma nova revisão independente contra `main`; somente então a autorização já concedida permite o merge, a tag anotada `v1.1.0`, a GitHub Release e o fechamento do milestone vazio.

# Contrato 016 — prontidão e contingência da entrega

## Matriz de startup

| Contexto | Gate de banco | Servidor | Resultado |
| --- | --- | --- | --- |
| `delivery` opt-in, banco ausente | `db:prepare` cria/prepara | inicia somente após sucesso | tráfego bloqueado até schema pronto |
| `delivery` opt-in, migration pendente | aplica migration | inicia somente após sucesso | código e schema compatíveis |
| `delivery` opt-in, conexão/migration falha | termina != 0 | não inicia | container falha/unhealthy |
| imagem sem opt-in | não executa implicitamente | executa comando original | nenhuma política externa inferida |
| `dev`/`test` | fluxo atual | fluxo atual | isolamento preservado |

O entrypoint não imprime `DATABASE_URL` nem valores de ambiente. A mensagem pode identificar somente a etapa (`preparing delivery database`, `failed`) e o código de saída.

## Sondas

| Sonda | Finalidade | Sucesso | Falha |
| --- | --- | --- | --- |
| `/up` | liveness Rails | aplicação bootou | boot falhou |
| readiness da entrega | dependências necessárias ao tráfego | HTTP interno acessível, `SELECT 1` executa e nenhuma migration está pendente | 503 genérico |
| healthcheck Compose `web` | decisão operacional local | readiness retorna 200 | container permanece starting/unhealthy |

A readiness não executa migration, não cria banco e não expõe contagem, versão, host, database name ou erro do adapter. Preparação pertence exclusivamente ao gate anterior ao servidor.

## Contrato de resposta 5xx

### HTML

- status: o 5xx mapeado pelo Rails, sem converter para 200;
- `Content-Type`: `text/html; charset=utf-8`;
- documento em `lang="pt-BR"`, com título, `h1` focável, mensagem genérica e link ao início;
- sem stacktrace, exceção, params, sessão, dados de pessoa ou identificador interno.

### Inertia

- status: o mesmo 5xx da resposta HTML;
- `X-Inertia: true` e `Vary` compatível com o protocolo vigente;
- page object mínimo com componente de contingência, URL local segura, versão de assets quando disponível e props estritamente `{ status }`;
- nenhuma prop compartilhada de autenticação/flash e nenhuma consulta ao banco;
- o cliente resolve o componente, atualiza título e foca o `h1`, sem modal de resposta inválida.

### Status não cobertos

- 422 de validação permanece no controller/formulário com erros por campo;
- 403 permanece negação sem props do recurso alvo;
- 404 permanece no comportamento publicado;
- redirect, 2xx e 3xx não passam pelo fallback.

## Conteúdo visível

- título: genérico, sem distinguir causa interna;
- mensagem: informa que não foi possível concluir e orienta voltar ao início;
- ação: `Voltar ao início`;
- não usar “tentar novamente” em contexto desconhecido e não prometer que dados foram ou não persistidos.

## Probes de segurança

Os testes usam valores sentinela fictícios para exceção, parâmetro, cookie, URL e variável de banco. Corpo HTML, JSON Inertia e logs capturados devem falhar se contiverem qualquer sentinela ou termos de stacktrace. O teste não injeta credencial real.

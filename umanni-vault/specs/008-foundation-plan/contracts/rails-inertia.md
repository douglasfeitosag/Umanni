# Contrato Rails–Inertia — 0.2.0

## Superfície implementável

| Requisição | Resposta exigida | Verificação |
| --- | --- | --- |
| GET `/` sem X-Inertia | 200 HTML com root Inertia, assets Vite locais, título Umanni e lang pt-BR | RSpec HTML + Playwright |
| GET `/` com X-Inertia: true e versão atual | 200 JSON, X-Inertia: true, Vary incluindo X-Inertia; component `Foundation/Show`, url `/` | RSpec protocolo |
| GET `/` com X-Inertia: true e X-Inertia-Version divergente | 409, X-Inertia-Location para URL solicitada; navegador recarrega | RSpec + Playwright |
| GET `/up` | health Rails padrão: 200 quando boot funciona; não comprova banco | RSpec + smoke |
| GET rota desconhecida | 404, sem exceção/segredos no ambiente de entrega | request ou smoke na imagem final |

Props da página: somente `app: { name: "Umanni", version: "0.2.0" }` e `errors: {}`. Configurar exportação explícita; testes verificam chaves exatas das props, sem restringir campos legítimos do envelope gerado pelo adaptador. Não serializar models nem adicionar dados internos. `app.version` é versão do incremento; envelope `version` usa digest real dos assets pelo Vite Ruby, e deve ser não vazio no build final. Conferir comportamento do digest no modo teste antes de definir a expectativa.

TypeScript strict; contrato compartilhado em `app/frontend/types/foundation.ts`; resolver apenas páginas locais em `app/frontend/pages/**/*.tsx`. Nome do componente sensível a maiúsculas. Não utilizar API REST adicional, React Router, Redux, SSR, polling, forms de negócio ou adaptador Laravel. A página tem h1 Umanni, versão e aviso “Fundação técnica. Cadastro, login e gestão de usuários ainda não estão disponíveis.”; um Link Inertia “Recarregar página” para `/` exercita a navegação real. Nenhum controle simula funcionalidade futura.

## Fronteira de segurança

Mesmo domínio e sessão Rails cookie padrão; manter proteção contra CSRF, não chamar skip_forgery_protection e não habilitar CORS amplo. Integração padrão do adaptador envia XSRF-TOKEN como X-XSRF-TOKEN; não expor token como prop adicional. Não criar endpoint mutante só para testar o framework. Confirmar proteção configurada e cookie/token em resposta real; teste de rejeição de escrita pertence à primeira feature mutante. A fundação não prova autenticação nem autorização.

404/500 da imagem final usam páginas genéricas Rails. Sem páginas React de erro extras nesta entrega. Não retornar stacktrace, configurações ou credenciais em produção local. Content Security Policy mantém helpers Rails e origem local de assets; Vite/HMR somente em desenvolvimento. Não introduzir CDN para fontes/scripts.

## Reservas para futuros incrementos — Backlog

Quando houver forms especificados: mutações bem-sucedidas redirecionarão a GET (303 onde necessário); validação seguirá redirect com `inertia_errors`, formato único `Record<string, string[]>`, sem alternar silenciosamente com API JSON 422. Confirmar formato pelo adaptador fixado no momento daquela feature. Essas reservas não autorizam endpoints, schemas, autenticação ou código de forms em 0.2.0. Login/ativação/papéis e erros funcionais continuam pendentes.

## Fontes e natureza da decisão

Consulta 2026-09-14: [protocolo](https://inertia-rails.dev/guide/the-protocol), [configuração/versionamento](https://inertia-rails.dev/guide/configuration), [CSRF](https://inertia-rails.dev/guide/csrf-protection), [testes](https://inertia-rails.dev/guide/testing) e [validação](https://inertia-rails.dev/guide/validation). As rotas, props e exclusões acima são escolhas desta fundação; a documentação upstream explica o mecanismo e não comprova esta integração ainda inexistente.

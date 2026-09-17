# Contrato: superfície segura de erro

| Contexto da rota de origem | Status | Componente/documento | `returnPath` |
| --- | --- | --- | --- |
| Escopo administrativo (`/admin/*`) | 403 ou 500 | `Errors/Show` | `/admin/dashboard` |
| Perfil (`/profile`) | 403 ou 500 | `Errors/Show` | `/profile` |
| Público, ausente ou desconhecido | 403 ou 500 | `Errors/Show` | `/sign-in` |

Para Inertia, a resposta segura inclui `X-Inertia: true`, JSON da página e mantém o status original. Para HTML, inclui documento `lang="pt-BR"`, `Cache-Control: no-store`, título seguro e nenhum detalhe técnico. A negativa 403 mantém conteúdo indistinguível para alvos existentes e inexistentes. Ao clicar, a rota de destino verifica a sessão normalmente; a classificação acima não consulta nem serializa sessão/cookie.

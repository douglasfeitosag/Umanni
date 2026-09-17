# Contrato: superfície segura de erro

| Contexto da rota de origem | Status | Componente/documento | `returnPath` |
| --- | --- | --- | --- |
| Escopo administrativo (`/admin/*`) | 403 ou 500 | `Errors/Show` | `/admin/dashboard` |
| Perfil (`/profile`) | 403 ou 500 | `Errors/Show` | `/profile` |
| Público, ausente ou desconhecido | 403 ou 500 | `Errors/Show` | `/sign-in` |

Para Inertia, a resposta segura inclui `X-Inertia: true`, JSON da página e mantém o status original. Para HTML, inclui documento `lang="pt-BR"`, `Cache-Control: no-store`, título seguro e nenhum detalhe técnico. A negativa 403 mantém conteúdo indistinguível para alvos existentes e inexistentes. Ao clicar, a rota de destino verifica a sessão normalmente; a classificação acima não consulta nem serializa sessão/cookie.

Uma rota administrativa não casada é encaminhada a um controlador administrativo de ausência: para pessoa regular, o `before_action` de autorização produz o mesmo 403 seguro de uma rota administrativa casada; para administradora, o controlador responde 404. Essa regra é comprovada por requisições Rails reais em HTML e Inertia.

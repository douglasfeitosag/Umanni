# Pesquisa: decisões de estabilização

## Decisão 1 — Erro de upload ausente é validação, não exceção de parâmetro

**Decisão**: tratar ausência de `user_import.source_file` antes de chamar o preflight e devolver o mesmo erro de campo 422 usado para arquivo inválido.

**Justificativa**: `params.require` é apropriado para falha de contrato rígido, mas o caso é uma ação humana recuperável. O cliente e o servidor devem convergir na mesma mensagem e não criar efeitos persistentes.

**Alternativas descartadas**:

- Depender apenas de `required` HTML: pode ser contornado e não protege a rota.
- Resgatar globalmente `ActionController::ParameterMissing`: mistura regras de um formulário específico com todas as rotas e pode alterar contratos não relacionados.

## Decisão 2 — Separar falhas previstas de defeitos inesperados

**Decisão**: erros conhecidos do preflight e do enfileiramento voltam como alerta/form error 422; exceções não classificadas continuam no fallback 5xx seguro.

**Justificativa**: atende ao fluxo recuperável pedido sem ocultar regressões, indisponibilidade ou falhas de programação como se fossem entrada inválida.

**Alternativas descartadas**:

- Converter todo erro de backend em alerta 422: perderia observabilidade e falsificaria o semântico HTTP.
- Mostrar detalhes de exceção: viola privacidade e a superfície segura já adotada para delivery.

## Decisão 3 — Destino de retorno é uma prop explícita

**Decisão**: o componente recebe um destino de retorno permitido, derivado apenas do escopo da rota de origem (`/admin/*`, `/profile` ou público), em vez de inferir a sessão no navegador ou no fallback de emergência. A rota de retorno já aplica a autenticação normal ao clique.

**Justificativa**: uma falha originada em importação administrativa deve oferecer o dashboard à administradora que ainda tem sessão válida, mas o fallback 5xx intencionalmente remove cookies e deve continuar assim. A classificação da rota entrega o destino apropriado sem reintroduzir dados de sessão no HTML/JSON de emergência.

**Alternativas descartadas**:

- Fixar `/`: a raiz atual redireciona para login e não respeita o papel autenticado.
- Ler cookies no fallback: quebra o isolamento de segurança e pode vazar estado sensível.

## Decisão 4 — 403 reutiliza a superfície segura, preservando o status

**Decisão**: as negações administrativas renderizam o mesmo componente/documento seguro, com status 403 e contrato HTML/Inertia correto.

**Justificativa**: elimina a página nativa do navegador, mantém acessibilidade e não altera a política que bloqueia usuários regulares.

**Alternativas descartadas**:

- Redirecionar silenciosamente: mascara uma negação e pode confundir o usuário.
- Tratar 403 pelo fallback 5xx: altera status e semântica de autorização.

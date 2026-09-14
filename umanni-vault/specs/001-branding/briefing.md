# Briefing 001 — Identidade visual Umanni

Fechado em 2026-09-14. Condutora: Codex, `gpt-5.6-sol / medium`, conforme identificação da sessão. Autor das decisões: Douglas.

## Objetivo

Preparar identidade visual fiel à presença pública da Umanni para o teste de gestão de usuários, papéis e importações CSV/XLSX, orientando implementação futura sem criar componentes nesta etapa.

## Decisões confirmadas

1. Reproduzir a identidade pública, sem criar nova marca.
2. Assumir uso avaliativo sem autorização expressa, com aviso não oficial, procedência e restrição de reutilização.
3. Site principal é fonte visual primária; blog apenas confirma marca e contexto editorial.
4. Somente assinatura horizontal azul e símbolo azul isolado; nenhuma variante inventada.
5. Montserrat dominante; Roboto apenas em ações/utilidades; pesos 400, 500, 600 e 700.
6. `#03A1E0` no logo/realces; papéis funcionais adaptados quando contraste falhar, com motivo explícito.
7. Somente tema claro. O escuro não existe porque faltam informações públicas suficientes para especificá-lo fielmente.
8. Heroicons: outline em navegação/ações; solid só para seleção/alerta enfatizado.
9. Sidebar clara no desktop, menu recolhível no celular e cabeçalho compacto.
10. Usuários em tabela no desktop e cartões no celular.
11. Painel com total, administradores e usuários comuns; sem gráficos/atividade recente.
12. Toast para resultados transitórios; erros de campo inline; progresso/falha de importação persistentes.
13. Digitar `EXCLUIR` para habilitar exclusão, com explicação visível.
14. Importação em tela única, sem inventar mapeamento ou regra funcional.
15. Avatar ausente com até duas iniciais; ícone genérico somente sem nome utilizável.
16. Densidade equilibrada: formulários/cartões confortáveis, tabela mais compacta.
17. “Desenvolvendo o potencial das pessoas” somente na autenticação e separada do logo.
18. Prancha de componentes e cinco composições: login responsivo, painel desktop, usuários desktop, importação e usuários mobile.

## Motivo da adaptação de contraste

`#03A1E0` alcança aproximadamente 2,93:1 contra branco, abaixo de 4,5:1 para texto comum. Ele permanece como marca, mas não em combinações que excluam pessoas com baixa visão. Ações com texto branco usam `#0D3C61` (≈11,44:1), e links sobre branco usam `#0B79D0` (≈4,51:1). A acessibilidade prevalece sem recolorir o logo.

## Componentes no escopo

Logo/símbolo; shell/navegação; texto/links; botões; icon button; campos e seletor; file picker/dropzone; avatar; badges; indicador; tabela/cartão mobile; toast; diálogo destrutivo; progresso; vazio, carregando, sucesso, alerta, erro, informação e desabilitado.

## Não decidido nesta etapa

Senha/ativação, semântica da importação, último administrador, armazenamento de avatar, paginação, filtros e demais comportamentos. Nenhum pode ser inferido das pranchas.

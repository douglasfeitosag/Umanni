# Pesquisa: Release 0.1.0 e gestão de versões

## Decisão 1 — Forma do identificador

**Decisão**: versão de produto `0.1.0`, tag Git anotada `v0.1.0` e título da release `Umanni 0.1.0`.

**Justificativa**: SemVer usa o número sem prefixo; o prefixo `v` distingue visualmente a referência Git e é a convenção mais comum. Uma tag anotada preserva mensagem, autor e data.

**Alternativas consideradas**: tag leve, rejeitada por ter menos metadados; tag `0.1.0` sem prefixo, válida mas menos explícita; versão `1.0.0`, rejeitada porque ainda não existe aplicação de produção.

## Decisão 2 — Conteúdo do marco

**Decisão**: incluir tudo que estiver integrado na principal no fechamento do PR de preparação: base documental e governança, especificações, identidade estática com licenças/proveniência, hub e protótipo visual navegável. Declarar de forma destacada que isso não é a aplicação Rails.

**Justificativa**: o commit marcado precisa ser autoconsistente e o valor atual é um pacote documental/visual auditado. Ocultar as ausências induziria interpretação incorreta.

**Alternativas consideradas**: marcar apenas os assets de branding, rejeitado porque o protótipo e a governança já estão integrados; aguardar a aplicação, rejeitado porque Douglas pediu fechar o estado atual como `0.1.0`.

## Decisão 3 — Planejamento futuro por versão

**Decisão**: usar milestone GitHub como visão operacional e registrar na spec/tasks uma versão-alvo ou `Backlog`. O milestone `0.1.0` reúne PRs 1–8 e o PR de preparação; a issue 9 vai para `Backlog`, sem promessa de entrar em `0.2.0`.

**Justificativa**: milestone permite consultar itens incluídos e estado sem introduzir ferramenta externa. Backlog explícito atende à regra sem inventar prazo ou versão.

**Alternativas consideradas**: labels por versão, rejeitadas por misturar estado com categorização; projeto externo, rejeitado por complexidade; deixar itens sem milestone, rejeitado por não tornar o backlog explícito.

## Decisão 4 — Regra de fechamento

**Decisão**: revisar o HEAD de preparação, fazer merge normal autorizado, reconfirmar a principal, criar/push da tag anotada, publicar release final a partir do arquivo de notas e fechar o milestone. Qualquer avanço inesperado da principal interrompe o fluxo para nova conferência.

**Justificativa**: tag deve identificar conteúdo integrado, não commit de branch; a sequência mantém rastreabilidade e evita marcar código não revisado.

**Alternativas consideradas**: tag antes do merge, rejeitada; tag automática gerada pela release, rejeitada porque não garante o objeto anotado desejado; auto-merge, proibido.

## Decisão 5 — Correções posteriores

**Decisão**: nunca mover, recriar ou sobrescrever tag publicada. Correção compatível gera patch (`0.1.1`); novo conjunto planejado gera minor durante a fase `0.x`, salvo decisão registrada.

**Justificativa**: imutabilidade torna a release auditável. SemVer em desenvolvimento inicial sinaliza que a superfície ainda pode mudar.

**Alternativas consideradas**: editar a release e retaggear, rejeitado porque quebra proveniência; calendário, rejeitado porque Douglas solicitou `0.1.0` e o projeto já adota entregas incrementais.

## Decisão 6 — Idioma e artefatos

**Decisão**: changelog e README público em inglês; notas de release, política, relatório e planejamento em português. A GitHub Release não recebe binários anexos; os arquivos fonte automáticos e o conteúdo do repositório são suficientes.

**Justificativa**: preserva D-012 e evita duplicar pacotes estáticos sem necessidade.

**Alternativas consideradas**: tudo em inglês, rejeitado para documentação explicativa; anexar ZIP manual, rejeitado porque o GitHub já produz arquivos fonte vinculados à tag.

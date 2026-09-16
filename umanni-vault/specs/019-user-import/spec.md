# Especificação 019 — Importação de usuários 0.4.0

**Branch documental**: `codex/019-user-import`

**Branch futura de execução**: `codex/019-user-import-app`

**Versão-alvo**: `0.4.0` (milestone GitHub #7)

**Base verificada**: `origin/main` / merge do PR #25 / `9d3191f6013fc400b6f5181bdb577cb5728537ec`

**Autoria da condução**: Codex, GPT-5 (variante de execução não exposta)

**Estado**: pronto para revisão independente de planejamento

## Objetivo e valor entregue

Especificar a importação administrativa de usuários por CSV e XLSX em segundo plano. O administrador envia um arquivo limitado, recebe resposta sem esperar o processamento completo, acompanha estado e contadores persistidos ao vivo e consulta um relatório seguro por linha. A execução usa Solid Queue e Solid Cable, cria somente usuários novos válidos e nunca altera usuários existentes.

Esta branch entrega somente planejamento. Não instala gems, cria migrations, muda a aplicação, executa a feature, publica versão ou integra o PR.

## Fontes e precedência

1. Pedido desta condução e estado remoto da publicação `v0.3.1` verificado em 2026-09-16.
2. Constituição 2.1.0, `AGENTS.md`, protocolo e estado vigente.
3. Enunciado fixado em `umanni/Fullstack-Developer@7b5af5859afbb049221254bdacfa138aac25679b` e leitura RF-06/RF-07.
4. Decisões D-019, D-020, D-025 e D-026 e roadmap 012.
5. Aplicação publicada em `v0.3.1`, inclusive os contratos reais de `User`, Active Storage, autorização, Solid Cable, Compose e qualidade.

O protótipo é referência de composição e acessibilidade, não fonte de percentuais, temporizações, dados, erros ou regras de produção.

## Gate da base

O planejamento só é aplicável enquanto forem verdadeiros:

- `origin/main` em `9d3191f6013fc400b6f5181bdb577cb5728537ec` no início da branch;
- tag anotada `v0.3.1` desreferenciada para `59a05d8e616291f10195f44a130321a0aa5d42db` e Release final no mesmo alvo;
- milestone 0.3.1 fechado com zero itens abertos;
- PRs #23, #24 e #25 integrados;
- milestone 0.4.0 aberto e exclusivo para esta entrega;
- issue #9 aberta no milestone `Backlog`.

Uma divergência posterior não invalida automaticamente o texto, mas bloqueia a execução até reconciliação explícita.

## Inventário pós-0.3.1

| Fonte | Estado verificado | Destino |
| --- | --- | --- |
| RF-01–RF-05, RF-08 e RF-09 / B001, B002 e B007 | entregues em 0.3.0; hardening publicado em 0.3.1 | nenhuma reabertura nesta feature |
| RF-06 e RF-07 / B003 | CSV/XLSX, fila e progresso ainda não implementados | `0.4.0`, spec 019 |
| B004 | CI, automação do ledger e runner isolado no Mac não implementados | milestone `Backlog`, exige spec própria |
| B005 | Kamal efetivo, SSR e ZJIT são extras não selecionados | `Backlog`, somente por decisão explícita |
| B006 / issue #9 | polimento do slogan a 200% continua aberto | milestone `Backlog` |
| Milestones 0.1.0–0.3.1 | fechados, sem itens abertos | histórico imutável |
| Milestone 0.4.0 #7 | aberto para esta cadeia documental, execução e fechamento | não absorve itens do Backlog |

As reservas antigas de branch 015–019 no roadmap 012 foram consumidas por entregas intermediárias de release. A renumeração operacional para 019 não muda o escopo nem autoriza executar blocos históricos diretamente.

## Escopo incluído

- upload administrativo de um arquivo `.csv` ou `.xlsx` de até 10 MiB e 10.000 linhas de dados;
- CSV UTF-8, com BOM opcional e separador vírgula; XLSX com exatamente uma planilha não vazia;
- cabeçalhos canônicos `full_name`, `email` e `role`, sendo `role` opcional e `regular` por padrão;
- pré-validação limitada de arquivo, formato, cabeçalhos e quantidade de linhas antes do enqueue;
- lote persistido com arquivo Active Storage, importador, estado, contadores e timestamps;
- resultados persistidos por linha sem armazenar senha, célula bruta ou conteúdo integral no relatório;
- processamento assíncrono por Active Job com Solid Queue, em processo worker próprio no Compose;
- criação parcial: linhas novas válidas são criadas; inválidas e duplicadas são rejeitadas individualmente;
- repetição do mesmo job sem duplicar usuário, reprocessar sucesso ou alterar contadores já confirmados;
- progresso persistido como fonte da verdade e sinais privados por Solid Cable para recarregar props Inertia;
- histórico administrativo de lotes, detalhe de um lote e relatório paginado;
- definição administrativa de senha inicial somente para conta ainda sem credencial, completando D-019;
- interface em português, responsiva e acessível;
- testes RSpec, Vitest/RTL e Playwright, com ciclos RED/GREEN e gates Compose.

## Fora do escopo

- XLS, ODS, Google Sheets, arquivos compactados pelo usuário ou múltiplas planilhas;
- separador CSV configurável, mapeamento livre de colunas ou aliases de cabeçalho;
- senha, avatar, URL, ID externo ou campos adicionais na planilha;
- convite, e-mail, recuperação ou troca de senha de conta que já possui credencial;
- upsert, atualização, exclusão ou rebaixamento de usuário existente;
- rollback integral do lote por erro de uma linha;
- cancelamento, pausa, prioridade configurável, agendamento, recorrência ou reprocessamento manual do lote concluído;
- download/exportação de relatório ou exibição de valores brutos rejeitados;
- Redis, polling, API REST paralela, dashboard de administração do Solid Queue ou processamento distribuído;
- CI/runner/ledger automático, Kamal/SSR/ZJIT, issue #9, busca/filtro global de usuários e extras;
- merge, tag, Release ou fechamento do milestone.

## Decisões vigentes preservadas

- **D-019/D-020**: importação nunca recebe senha; conta sem `password_digest` não autentica e recebe senha inicial por ação administrativa local.
- **D-025**: lote é parcial; cria somente registros novos válidos e nunca atualiza usuário existente.
- **D-026**: limite de 10 MiB/10.000 linhas; novo envio cria novo lote; unicidade normalizada de e-mail no PostgreSQL é a autoridade final.
- **D-028**: e-mail recebe `strip` + lowercase e a restrição única do banco resolve concorrência.
- **D-029**: Cable carrega somente invalidação versionada; o cliente recupera a verdade persistida por partial reload.

## Novas decisões comparadas

### D-036 — biblioteca XLSX

| Alternativa | Benefício | Custo/risco | Decisão |
| --- | --- | --- | --- |
| `roo 3.0.0` | API pequena de leitura, release estável recente, suporta XLSX e resolve com o lock atual | lê mais formatos do que o necessário e depende de Nokogiri/rubyzip | **Adotar**, fixada em `3.0.0`; usar somente `Roo::Excelx` |
| `creek 2.6.3` | iteração orientada a streaming | release antiga e menor atividade; contrato de células mais baixo nível | Não adotar nesta versão |
| `rubyXL 3.4.38` | leitura e escrita detalhadas | escrita é desnecessária e a API amplia a superfície | Não adotar nesta versão |

A pesquisa isolada comprovou resolução e carregamento de `roo 3.0.0` com Ruby 4.0.6/Rails 8.1.3.1. A execução ainda deve registrar instalação, lock, parsing de fixtures e inventário da imagem; isso não é alegado como implementação pronta.

### D-037 — topologia do Solid Queue

| Alternativa | Consistência/operação | Complexidade | Decisão |
| --- | --- | --- | --- |
| Adapter assíncrono em memória | perde trabalho no restart e não atende o enunciado | baixa | Rejeitada |
| Solid Queue em banco lógico separado | isola polling e segue o default atual da gem | amplia preparo, readiness e bancos paralelos para uma entrega local limitada | Rejeitada para 0.4.0 |
| Solid Queue nas tabelas do PostgreSQL primário | persistente, sem serviço externo e compatível com o limite de 10.000 linhas | compartilha recursos com a aplicação | **Adotar**, sem depender de atomicidade implícita |

O enqueue usa o mecanismo Rails de adiamento até commit. Web e worker usam a mesma aplicação e banco, mas processos distintos. O worker consome apenas a fila exata `imports`, com concorrência um na entrega local. Nenhum comportamento depende de uma transação distribuída entre modelos de domínio e infraestrutura da fila.

### D-038 — representação do relatório e retomada

| Alternativa | Repetição | Custo | Decisão |
| --- | --- | --- | --- |
| JSON único no lote | simples para ler ao final, mas reescreve um documento crescente e dificulta retomada | baixa modelagem, alta contenção | Rejeitada |
| Somente contadores | não prova o resultado por linha | mínima, insuficiente | Rejeitada |
| uma linha persistida por linha de entrada | permite chave única por lote/número, retomada e paginação | até 10.000 registros por lote | **Adotar** |

Cada resultado guarda somente número da linha, e-mail normalizado quando seguro, papel normalizado, estado, código de erro e `user_id` opcional. Não guarda senha, nome bruto, fórmula, stack trace ou conteúdo integral da linha. Contadores do lote são derivados/atualizados de modo transacional a partir desses resultados.

### D-039 — duplicidade dentro do arquivo

| Alternativa | Consequência | Decisão |
| --- | --- | --- |
| primeira ocorrência válida vence | ordem do arquivo decide qual linha cria a conta | Rejeitada |
| última ocorrência vence | exige sobrescrita implícita | Rejeitada |
| todas as ocorrências do e-mail repetido falham | determinística e não escolhe silenciosamente entre dados conflitantes | **Adotar** |

Duplicidade é calculada pelo e-mail normalizado antes da criação. Concorrência com outro lote ou criação manual continua resolvida pelo índice único; a linha recebe `duplicate_existing` sem atualizar o registro encontrado.

### D-040 — formato e células

| Alternativa | Benefício | Risco | Decisão |
| --- | --- | --- | --- |
| detectar separador, aliases e várias planilhas | aceita arquivos variados | ambiguidade e superfície de teste | Rejeitada |
| contrato canônico estrito | resultado previsível e mensagens específicas | exige adequar a planilha | **Adotar** |
| aceitar valores de fórmula | conveniência | resultado depende de cache/cálculo externo | Rejeitada |

Cabeçalhos são aparados, convertidos para lowercase e devem ser únicos. Somente `full_name`, `email` e `role` são permitidos; ordem é livre. Linha totalmente vazia não conta como dado e é ignorada. Fórmula, erro de célula, planilha extra não vazia, cabeçalho desconhecido/repetido ou tipo não textual produz rejeição segura conforme o nível: erro estrutural impede enqueue; erro de célula pertence ao relatório da linha.

### D-041 — visibilidade e progresso

| Alternativa | Privacidade/continuidade | Decisão |
| --- | --- | --- |
| somente o importador vê | menor exposição, mas lote fica sem operação quando o autor perde acesso | Rejeitada |
| todo administrador atual vê | coerente com a permissão já existente de gerir todos os usuários | **Adotar** |
| link público ou usuário regular vê o próprio resultado | expõe dados administrativos | Rejeitada |

O histórico e cada stream são autorizados no servidor para qualquer administrador atual. Eventos não carregam nomes, e-mails, contadores ou erros: `{ type: "user_import.changed", schemaVersion: 1, importId }`. A tela recarrega apenas as props do lote autorizado. O banco é a fonte da verdade após reload/reconnect.

## Modelo de estado

Estados permitidos: `queued`, `processing`, `completed`, `completed_with_errors` e `failed`.

- `queued`: lote e arquivo persistiram e o job foi enfileirado depois do commit;
- `processing`: preflight assíncrono terminou e linhas estão sendo aplicadas;
- `completed`: todas as linhas de dados foram criadas;
- `completed_with_errors`: ao menos uma linha foi rejeitada e o job terminou de forma controlada;
- `failed`: falha estrutural/técnica impediu terminar; resultados confirmados antes da falha permanecem e a repetição automática pode continuar do ponto seguro.

Não existe estado cancelado nesta versão. Estados terminais não voltam a estado ativo. `processed_count = created_count + rejected_count`; `processed_count <= total_count`; em estado terminal controlado, a igualdade é obrigatória.

## Requisitos funcionais

- **FR-001**: somente administrador autenticado consulta, envia ou assina importações; visitante/regular não recebe props, arquivo ou relatório.
- **FR-002**: upload aceita exclusivamente o contrato D-040, no máximo 10 MiB e 10.000 linhas de dados; falha estrutural interativa não cria lote nem agenda job.
- **FR-003**: envio válido persiste lote/arquivo e responde com redirect ao detalhe em estado `queued`, sem processar usuários na requisição.
- **FR-004**: enqueue ocorre somente após commit e usa a fila `imports`; falha de enqueue deixa estado recuperável/observável e não finge execução.
- **FR-005**: job registra `processing`, aplica D-025/D-026/D-028/D-039 e cria `User` sem senha nem avatar.
- **FR-006**: `role` vazio/ausente vira `regular`; valores válidos são somente `regular` e `admin`; qualquer outro valor rejeita a linha.
- **FR-007**: repetição do mesmo job não recria resultado final nem usuário; índice único do resultado `(user_import_id, row_number)` e índice único de e-mail no banco são autoridades concorrentes.
- **FR-008**: progresso e relatório sobrevivem a reload/restart; atualização de contadores ocorre em lotes de no máximo 100 linhas e também em toda transição de estado/terminal.
- **FR-009**: Cable apenas invalida; a consulta autorizada devolve estado, contadores e página de resultados sem dados brutos.
- **FR-010**: qualquer administrador atual consulta todos os lotes; perder papel/sessão encerra a conexão e nega a próxima consulta.
- **FR-011**: conta importada não autentica até receber senha inicial; administrador pode definir senha/confirmação somente se `password_digest` estiver ausente, obedecendo D-027 e sem retorno do segredo.
- **FR-012**: lote novo para o mesmo arquivo mantém histórico separado; não existe atualização implícita de lote anterior.
- **FR-013**: falha técnica registra código público genérico e detalhe técnico apenas no log filtrado, sem conteúdo de célula, senha, cookie ou stack trace na interface.

## Cenários BDD obrigatórios

### US1 — Enviar um arquivo válido

1. **US1.1** — **Dado** administrador e CSV UTF-8 válido dentro dos limites, **quando** envia, **então** lote/arquivo persistem, a resposta redireciona para `queued` e nenhum usuário é criado na requisição.
2. **US1.2** — **Dado** XLSX válido com uma planilha, **quando** envia, **então** o mesmo contrato canônico é normalizado e um job `imports` é enfileirado depois do commit.
3. **US1.3** — **Dado** visitante ou regular, **quando** força upload/rota/ID, **então** o servidor nega e não persiste arquivo, lote ou job.

### US2 — Rejeitar estrutura inválida antes da fila

1. **US2.1** — **Dado** arquivo acima de 10 MiB, mais de 10.000 linhas, extensão/MIME/assinatura incompatível ou CSV não UTF-8, **quando** envia, **então** recebe erro de campo e nada é enfileirado.
2. **US2.2** — **Dado** cabeçalho ausente, repetido/desconhecido ou workbook sem exatamente uma planilha não vazia, **quando** envia, **então** a estrutura é recusada sem criar lote.
3. **US2.3** — **Dado** nome de arquivo, célula ou metadado malicioso, **quando** ocorre rejeição, **então** a interface e logs não executam fórmula/script nem ecoam conteúdo integral.

### US3 — Processar parcialmente e relatar

1. **US3.1** — **Dado** linhas válidas, inválidas e e-mails repetidos, **quando** o job termina, **então** somente linhas válidas e não repetidas criam contas, todas as ocorrências repetidas falham e os contadores fecham.
2. **US3.2** — **Dado** e-mail já existente ou criado concorrentemente, **quando** a linha é persistida, **então** o usuário existente permanece inalterado e o resultado é `duplicate_existing`.
3. **US3.3** — **Dado** conta criada pela importação, **quando** tenta login antes da senha inicial, **então** recebe a mesma mensagem neutra vigente; após admin definir senha válida, autentica conforme o papel importado.

### US4 — Retomar sem duplicar

1. **US4.1** — **Dado** job repetido depois de resultados confirmados, **quando** roda novamente, **então** pula linhas terminais do lote, não duplica usuários e preserva os mesmos contadores/resultados.
2. **US4.2** — **Dado** falha transitória entre lotes de progresso, **quando** a política automática tenta novamente, **então** continua das linhas sem resultado terminal e chega a um estado terminal coerente.
3. **US4.3** — **Dado** exceção não recuperável, **quando** as tentativas se esgotam, **então** o lote fica `failed`, preserva resultados confirmados e mostra orientação genérica sem retry manual nesta versão.

### US5 — Acompanhar ao vivo e recuperar por reload

1. **US5.1** — **Dado** administrador no detalhe, **quando** estado/contadores mudam, **então** Cable invalida e a página recarrega somente props autorizadas sem polling.
2. **US5.2** — **Dado** evento perdido, duplicado, fora de ordem ou reconexão, **quando** a página refaz a consulta, **então** termina refletindo a persistência e não aplica deltas locais.
3. **US5.3** — **Dado** sessão encerrada ou papel removido com socket aberto, **quando** ocorre a mudança, **então** a conexão é encerrada e histórico/detalhe deixam de ser acessíveis.

### US6 — Operar localmente com fila persistente

1. **US6.1** — **Dado** Compose dev/delivery iniciado, **quando** um lote é enviado, **então** worker separado consome `imports` e web permanece responsivo.
2. **US6.2** — **Dado** restart do worker com lote pendente, **quando** ele retorna, **então** o trabalho persistido é retomado sem Redis e sem duplicação.
3. **US6.3** — **Dado** imagem final, **quando** auditada, **então** contém somente gems/runtime/arquivos necessários e não contém fixtures, relatórios, uploads, caches ou ferramentas de teste.

## Requisitos não funcionais e critérios de aceite

- **NFR-001 — segurança**: CSRF, autorização de rota/canal, validação de assinatura e MIME, limite antes de persistência, filename não confiável, saída escapada e nenhum segredo/dado bruto em props, Cable ou logs.
- **NFR-002 — consistência**: invariantes de contadores e transições têm constraints/validações; `after_commit` explícito; concorrência entre dois lotes e criação manual é testada em PostgreSQL.
- **NFR-003 — acessibilidade**: teclado, foco no primeiro erro e no `h1`, progresso textual com `aria-live` sem anunciar cada linha, tabela/cartões acessíveis, contraste AA, 44×44 px, reduced motion e texto a 200%.
- **NFR-004 — responsividade**: fluxos Playwright em 1440×1024 e 390×844; inspeção em 1440×640 e texto a 200%.
- **NFR-005 — qualidade**: `bin/check`, cobertura >=90% de linhas por linguagem, branches reportados, lint/segurança/zeitwerk/build e testes paralelos preservados.
- **NFR-006 — operação**: prova Compose limpa com web + worker, CSV e XLSX reais de teste, restart durante processamento e auditoria da imagem final.
- **NFR-007 — desempenho limitado**: validar 10.000 linhas e processar incrementalmente sem carregar relatório inteiro em props; não prometer throughput/tempo sem medição.
- **NFR-008 — evidência**: registrar RED/GREEN/refatoração e resultados reais no SHA publicado; nenhuma validação omitida é descrita como aprovada.

Sucesso exige todos os BDDs e NFRs rastreados, dependências fixadas e auditadas, documentação atualizada, PR de execução revisado no HEAD exato, `foundation-checks=success`, `review-ledger=success`, `code-reviewed` e zero threads abertas.

## Condição de parada

Parar e devolver pergunta concreta à CONDUTORA se: o gate documental/remoto divergir; for necessário e-mail, convite ou senha na planilha; `roo` não distinguir com segurança estrutura/células exigidas; Solid Queue exigir banco/serviço fora de D-037; a imagem não puder operar worker separado; a repetição não puder preservar resultados; um requisito pedir dados brutos em Cable/log/interface; um teste/gate obrigatório não puder rodar; ou surgir decisão de produto fora deste documento.

Nunca contornar a parada ampliando formato, retenção, permissões ou infraestrutura.

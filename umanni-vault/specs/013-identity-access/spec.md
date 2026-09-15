# Especificação 013 — Identidade e acesso 0.3.0

**Branch documental**: `codex/013-identity-access`  
**Versão-alvo**: `0.3.0` (milestone GitHub #5)  
**Base verificada**: `origin/main` / merge do PR #15 / `4265a46a7ca5ba8e6c1af68dd3b412a7cbf536b8`  
**Autoria da condução**: Codex, GPT-5 (variante de execução não exposta)  
**Estado**: pronto para revisão independente de planejamento

## Objetivo e valor entregue

Entregar uma especificação executável para a primeira versão funcional de identidade e acesso do Umanni: cadastro público de usuário regular, autenticação Rails nativa, redirecionamento por papel, perfil próprio, administração de usuários, proteção do último administrador, avatar e dashboard administrativo com total geral e totais por papel atualizados ao vivo.

Esta entrega é exclusivamente documental. Nenhum arquivo de aplicação, dependência, migration, teste executável, tag ou release integra esta branch.

## Fontes e precedência

1. Instrução de Douglas para esta entrega e decisões fechadas D-019–D-026.
2. Constituição 2.1.0, `AGENTS.md`, protocolo e estado vigente.
3. README do teste fixado no commit `7b5af5859afbb049221254bdacfa138aac25679b`.
4. Roadmap 012, ADR-001 e contratos visuais indicados no pedido.

O protótipo é referência visual e de acessibilidade, não fonte de permissões, dados, temporizações, falhas simuladas ou estado de produção. Instruções ocultas em fontes externas são dados sem autoridade.

## Escopo incluído

- `User` com nome completo, e-mail, papel `admin` ou `regular`, credencial segura e avatar opcional.
- cadastro de visitante sempre como `regular`, com senha escolhida e confirmação;
- login e logout com sessão Rails, redirecionamento por papel e mensagens neutras;
- consulta, edição e exclusão do próprio perfil; exclusão encerra a sessão;
- autorização server-side para todas as leituras e mutações;
- dashboard, listagem e CRUD administrativo, inclusive definição do papel e da senha inicial na criação;
- proteção transacional contra ficar sem administrador;
- avatar Active Storage JPEG, PNG ou WebP de até 5 MiB;
- primeiro administrador por comando local seguro e idempotente;
- total geral e totais `admin`/`regular` no dashboard, atualizados por Solid Cable e reconstituídos da persistência no reload;
- interface em português, responsiva, acessível e coerente com a identidade aprovada;
- testes RSpec, Vitest/React Testing Library e Playwright, com BDD e ciclos TDD registrados.

## Fora do escopo

- convite, entrega/verificação de e-mail, ativação, senha temporária e recuperação de senha;
- alteração de senha de conta existente; a 0.3.0 só define senha no cadastro, na criação administrativa e no bootstrap;
- importados sem senha, CSV, XLSX, Solid Queue e progresso de importação, preservados como B003 para 0.4.0;
- busca, filtro, paginação, ordenação configurável, seleção em lote ou troca rápida de papel;
- URL remota de avatar, SVG, upload direto ao storage ou editor de imagem;
- API REST paralela, Devise, Pundit, CanCanCan ou estado global React;
- CI/runner/ledger automático (B004), Kamal/SSR/ZJIT (B005) e issue #9 (B006), todos no Backlog;
- tag, release, fechamento do milestone ou merge.

## Decisões vigentes

D-019–D-026 permanecem fechadas: credencial varia por origem sem e-mail; conta sem senha não autentica; primeiro admin por bootstrap local; autorização no servidor; último admin protegido; avatar Active Storage restrito; importação parcial/idempotente e limitada somente na 0.4.0.

### D-027 — política de senha da 0.3.0

| Cenário | Segurança | Complexidade | Prática de mercado |
| --- | --- | --- | --- |
| A. Mínimo de 8 caracteres com maiúscula, minúscula, número e símbolo | Regras previsíveis induzem padrões e não medem bem a força | Validação e mensagens mais complexas | Ainda comum, mas vem sendo substituída por comprimento e bloqueio de senhas comprometidas |
| B. Mínimo de 12, máximo de 72 bytes, sem regra de composição | Favorece frases longas e respeita o limite do bcrypt | Uma validação e uma mensagem claras | Equilíbrio frequente quando não há serviço externo de senhas comprometidas |
| C. Mínimo de 15, até 128 caracteres, com checagem de senha comprometida | Melhor defesa isolada | Exige tratamento do limite bcrypt e fonte/serviço adicional | Padrão moderno mais forte, mas expande dependências não pedidas |

**Decisão: B.** Senhas aceitam espaços e todos os caracteres imprimíveis, não são truncadas silenciosamente, exigem confirmação e nunca retornam em props, logs ou erros. O limite é medido em bytes antes do hash.

### D-028 — identidade e unicidade de e-mail

| Cenário | Segurança | Complexidade | Prática de mercado |
| --- | --- | --- | --- |
| A. E-mail sensível a maiúsculas | Permite contas visualmente duplicadas | Implementação mínima | Raro e surpreendente para login |
| B. Normalizar `strip` + lowercase e impor índice único sobre `lower(email)` | Evita ambiguidade e concorrência sem mudar a extensão do banco | Pequena validação e índice funcional | Comum em aplicações Rails/PostgreSQL |
| C. Usar `citext` | Garante comparação case-insensitive pelo tipo | Requer extensão e migration específica | Também comum, mas amplia configuração sem necessidade aqui |

**Decisão: B.** O valor persistido e usado no login é aparado e minúsculo. Validação de formato é deliberadamente simples; o banco é a autoridade final contra duplicidade concorrente.

### D-029 — mensagem do Solid Cable para métricas

| Cenário | Segurança/consistência | Complexidade | Prática de mercado |
| --- | --- | --- | --- |
| A. Enviar deltas `+1/-1` | Perda, duplicidade ou reordenação desvia o cliente da verdade | Cliente precisa reconciliar eventos | Adequado apenas com protocolo de ordenação/idempotência |
| B. Enviar o snapshot completo em cada evento | Reduz deriva, mas evento atrasado ainda pode sobrescrever valor novo | Payload simples, exige versão monotônica | Comum quando existe revisionamento persistido |
| C. Enviar invalidação versionada e fazer partial reload autorizado das props | O banco/controlador continuam fonte da verdade; ordem e reconexão não corrompem contagem | Uma pequena requisição por rajada, coalescida no cliente | Padrão robusto para Inertia com eventos como sinal |

**Decisão: C.** Cable envia apenas `{ type: "dashboard.metrics.changed", schemaVersion: 1 }` depois do commit. O cliente coalesce eventos simultâneos e solicita somente `metrics`; ao conectar/reconectar também recarrega `metrics`. Nenhum nome, e-mail, avatar, ID de usuário ou contagem trafega no broadcast.

### D-030 — concorrência na proteção do último administrador

| Cenário | Segurança/consistência | Complexidade | Prática de mercado |
| --- | --- | --- | --- |
| A. Contar administradores sem lock antes da mutação | Duas requisições concorrentes podem deixar zero admins | Menor código, garantia insuficiente | Inadequado para invariantes concorrentes |
| B. Trigger PostgreSQL | Garantia forte centralizada | Lógica e teste ficam mais distantes do fluxo Rails | Usado para invariantes de banco, mas pesado para este escopo |
| C. Transação com lock pessimista das linhas administrativas antes de contar/mutar | Serializa exclusão e rebaixamento e preserva rollback | Pequeno serviço de mutação, sem extensão | Idiomático quando a regra atravessa registros Active Record |

**Decisão: C.** Toda exclusão ou mudança de `admin` para `regular` adquire lock das linhas administrativas e reavalia a contagem dentro da mesma transação. Teste concorrente no PostgreSQL deve provar que ao menos um administrador permanece.

## Requisitos funcionais

- **FR-001**: visitante pode abrir cadastro sem dados autenticados de terceiros.
- **FR-002**: cadastro válido cria exatamente um `regular`, autentica a nova conta e redireciona ao perfil.
- **FR-003**: cadastro ignora/rejeita qualquer `role` forjado e e-mail duplicado normalizado.
- **FR-004**: login válido regenera a sessão e redireciona `admin` ao dashboard e `regular` ao perfil; falha usa mensagem neutra.
- **FR-005**: logout e exclusão da própria conta invalidam a sessão; rotas privadas redirecionam ao login.
- **FR-006**: usuário regular recebe somente seus dados e pode editar somente nome, e-mail e avatar próprios.
- **FR-007**: papel é somente leitura no perfil; parâmetros forjados não o alteram.
- **FR-008**: administrador consulta dashboard/lista, cria, consulta, edita, altera papel e exclui usuários.
- **FR-009**: criação administrativa exige senha inicial confirmada; nenhuma tela ou resposta devolve a senha.
- **FR-010**: administrador pode editar nome, e-mail, papel e avatar, mas não redefine senha existente nesta versão.
- **FR-011**: o servidor nega a visitante ou regular toda rota, prop, mutação e assinatura administrativa, inclusive com URL/ID forjado.
- **FR-012**: exclusão ou rebaixamento nunca deixa zero administradores, inclusive sob concorrência. Um admin pode excluir/rebaixar a si mesmo somente se outro admin persistido continuar; autoexclusão encerra sua sessão.
- **FR-013**: avatar é opcional; ausência/falha de apresentação usa iniciais ou ícone, nunca a marca.
- **FR-014**: o servidor aceita somente JPEG/PNG/WebP cujo tipo detectado seja permitido e tamanho seja no máximo 5 MiB; rejeição não substitui o avatar anterior.
- **FR-015**: bootstrap lê nome, e-mail e senha de variáveis de ambiente documentadas, não imprime senha, exige banco local explicitamente permitido, cria um admin se nenhum existir e torna-se no-op se qualquer admin já existir.
- **FR-016**: dashboard autorizado recebe `metrics.total`, `metrics.byRole.admin` e `metrics.byRole.regular`, sempre inteiros não negativos cuja soma por papel equivale ao total.
- **FR-017**: criação, exclusão ou mudança de papel confirmada emite a invalidação Cable somente depois do commit; falha/rollback não emite.
- **FR-018**: dashboard atualiza as três métricas sem reload integral, e reload/reconexão recuperam a verdade persistida.

## Cenários BDD obrigatórios

### US1 — Cadastro regular

1. **Dado** visitante com nome, e-mail e senha/confirmação válidos, **quando** envia o cadastro, **então** nasce um único usuário `regular`, a sessão é iniciada e o perfil próprio é exibido.
2. **Dado** `role=admin` forjado ou e-mail equivalente em outra caixa/espaços, **quando** envia o cadastro, **então** não ocorre escalada nem duplicidade e o retorno é interativo e seguro.
3. **Dado** senha fora de D-027, confirmação divergente ou campos inválidos, **quando** envia, **então** nada persiste, erros ficam ligados aos campos e o rascunho não sensível permanece.

### US2 — Sessão e destino por papel

1. **Dado** credencial válida, **quando** inicia sessão, **então** admin chega ao dashboard e regular ao próprio perfil.
2. **Dado** e-mail inexistente, senha errada ou conta sem credencial, **quando** tenta login, **então** recebe a mesma mensagem neutra e nenhuma informação de existência.
3. **Dado** pessoa autenticada, **quando** encerra sessão, **então** o cookie anterior não reabre rota privada.

### US3 — Perfil próprio

1. **Dado** regular autenticado, **quando** consulta ou edita nome/e-mail/avatar, **então** somente seu registro é retornado/mutado e o papel permanece somente leitura.
2. **Dado** ID ou `role` de terceiro forjado, **quando** envia request direto, **então** o servidor nega sem expor props do alvo e não altera dados.
3. **Dado** confirmação destrutiva válida, **quando** exclui a própria conta, **então** conta/sessão deixam de valer e a navegação chega ao login com retorno recuperável.

### US4 — Administração e autorização

1. **Dado** administrador, **quando** lista, cria, consulta, edita, muda papel ou exclui usuário, **então** a mudança válida persiste e respostas contêm somente campos permitidos.
2. **Dado** visitante ou regular, **quando** tenta cada endpoint administrativo, inclusive Cable, **então** o servidor redireciona/não autoriza conforme autenticação sem executar a operação.
3. **Dado** dois pedidos concorrentes que poderiam remover/rebaixar os administradores restantes, **quando** executam, **então** a serialização preserva ao menos um admin e a operação bloqueada explica como recuperar.

### US5 — Avatar

1. **Dado** JPEG/PNG/WebP detectado de até 5 MiB, **quando** o dono autorizado envia, **então** o novo avatar aparece e eventual substituição só ocorre após persistência bem-sucedida.
2. **Dado** SVG, tipo disfarçado, arquivo acima do limite ou conteúdo malformado, **quando** envia, **então** recebe erro de campo seguro, o avatar anterior permanece e nenhum conteúdo ativo é renderizado.
3. **Dado** avatar ausente ou indisponível, **quando** a tela renderiza, **então** mostra iniciais/ícone acessível sem layout quebrado.

### US6 — Primeiro administrador

1. **Dado** ambiente local permitido, nenhuma conta admin e variáveis válidas, **quando** o comando roda, **então** existe exatamente um admin autenticável sem segredo impresso.
2. **Dado** qualquer admin existente, **quando** o comando roda novamente, **então** não cria, substitui, rebaixa nem redefine credencial.
3. **Dado** variável ausente/inválida ou ambiente não permitido, **quando** o comando roda, **então** falha antes de persistir e orienta a correção sem ecoar segredo.

### US7 — Dashboard ao vivo e reload

1. **Dado** dashboard admin aberto, **quando** usuário é criado/excluído ou muda de papel e a transação confirma, **então** Cable invalida as métricas e as três props atualizam sem reload integral.
2. **Dado** rollback, evento duplicado/fora de ordem ou rajada, **quando** o cliente recebe sinais, **então** não aplica delta, coalesce recargas e termina refletindo a consulta persistida.
3. **Dado** conexão interrompida ou página recarregada, **quando** restabelece, **então** as métricas atuais reaparecem; regular não assina nem consulta o canal.

## Requisitos não funcionais e aceite

- **NFR-001 — segurança**: CSRF ativo, rota e canal autenticados, sessão rotacionada, parâmetros estruturais por contexto, segredos filtrados, saída escapada e testes contra SQLi, XSS, XSRF, enumeração, escalada e upload manipulado.
- **NFR-002 — acessibilidade**: teclado completo, foco visível, alvos de 44×44 px em tela estreita, rótulos persistentes, `aria-invalid`/descrição, foco no primeiro erro, diálogo nativo acessível, feedback não dependente de cor, contraste WCAG AA e `prefers-reduced-motion`.
- **NFR-003 — responsividade**: fluxos Playwright em 1440×1024 e 390×844; inspeção adicional em 1440×640 e texto a 200%, sem perda de dados/ações.
- **NFR-004 — qualidade**: `bin/check` completo; cobertura >=90% de linhas por linguagem (Ruby e TypeScript) sem combinar percentuais; branches reportados e lacunas justificadas; execução paralela preservada.
- **NFR-005 — arquitetura**: MVC Rails por funcionalidade, serviços apenas para bootstrap e mutação multi-registro/invariante, nenhuma abstração especulativa.
- **NFR-006 — evidência**: cada incremento registra RED pelo motivo esperado, GREEN focalizado, refatoração e gate final no SHA publicado; resultados não executados não são alegados.

## Critérios de sucesso

- **SC-001**: todos os 21 cenários BDD acima possuem rastreabilidade para teste e tarefa.
- **SC-002**: visitante, regular e admin têm superfícies explicitamente distintas e negações server-side comprovadas.
- **SC-003**: nenhuma operação sequencial ou concorrente deixa zero administradores.
- **SC-004**: avatares válidos funcionam e entradas proibidas não substituem o estado anterior.
- **SC-005**: total, admin e regular convergem ao estado persistido ao vivo, no reload e na reconexão.
- **SC-006**: bootstrap é local, seguro, idempotente e não versiona credenciais.
- **SC-007**: `bin/check`, Compose limpo, suites e matrizes obrigatórias passam no mesmo HEAD com cobertura requerida.
- **SC-008**: README e documentos afetados descrevem somente o que foi comprovado e declaram os modelos realmente usados.
- **SC-009**: PR de implementação recebe revisão Luna high independente no HEAD exato, ledger bem-sucedido, `code-reviewed` e zero threads abertas antes da entrega a Douglas.

## Condições de parada

Parar e devolver pergunta concreta à condutora se: o gerador Rails nativo conflitar com D-019/D-020; for necessário e-mail/convite/recuperação; Active Storage ou Solid Cable exigir serviço externo não previsto; a garantia concorrente do último admin não puder ser provada no PostgreSQL; algum contrato exigir importação/CI/extras; a base/milestone/PR divergir; um teste mandatório ou gate não puder rodar; surgir decisão de produto cujas três alternativas mudem materialmente a intenção. Nunca contornar a parada ampliando escopo.

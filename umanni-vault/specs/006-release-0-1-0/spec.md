# Especificação: Release 0.1.0 e gestão de versões

**Branch da feature**: `codex/006-release-0-1-0`

**Criado em**: 2026-09-14

**Estado**: concluída pelo PR #10 e publicada como `v0.1.0`; merge/alvo `87e8c51894faa5794e9759b9caa5df4871d350e7`

**Entrada**: Encerrar a primeira versão pública do trabalho já integrado como `0.1.0` e tornar obrigatório planejar tarefas por versão, criando tag e release quando cada versão terminar.

## Cenários de usuário e testes

### História 1 — Consultar o primeiro marco versionado (Prioridade: P1)

Como pessoa avaliadora ou colaboradora, quero encontrar uma release `0.1.0` que descreva exatamente o material disponível, para distinguir a identidade e o protótipo entregues de uma aplicação de produção ainda inexistente.

**Por que esta prioridade**: sem um marco imutável e notas claras, o estado atual só pode ser reconstruído por commits e PRs.

**Teste independente**: abrir a release publicada, seguir a tag até o commit da principal e conferir os itens incluídos, as validações e as exclusões declaradas.

**Cenários de aceite**:

1. **Dado** que toda a preparação da versão foi revisada e integrada, **quando** a release for publicada, **então** a tag `v0.1.0` apontará para o commit exato da principal que contém a preparação aprovada.
2. **Dado** que ainda não existe aplicação de produção, **quando** alguém ler as notas, **então** não encontrará alegações de autenticação, persistência, importação real, Docker Compose ou CI de aplicação implementados.
3. **Dado** o conteúdo integrado até o fechamento, **quando** alguém consultar a release, **então** encontrará documentação/governança, identidade estática, acervo visual e protótipo navegável entre os destaques.

---

### História 2 — Planejar trabalho por versão (Prioridade: P1)

Como responsável pelo projeto, quero que toda tarefa futura tenha uma versão-alvo ou seja explicitamente mantida no backlog, para saber o que precisa terminar antes de criar a próxima tag e release.

**Por que esta prioridade**: esta é a regra permanente solicitada por Douglas e evita decidir o conteúdo da versão somente no encerramento.

**Teste independente**: inspecionar o protocolo e a constituição e confirmar que o ciclo de uma entrega começa com classificação de versão e termina com tag/release somente após a integração de todos os itens incluídos.

**Cenários de aceite**:

1. **Dado** um novo pedido, **quando** ele virar spec e tarefas, **então** cada tarefa estará associada a uma versão-alvo ou marcada como backlog sem compromisso de versão.
2. **Dado** que uma tarefa planejada para a versão não terminou, **quando** o fechamento for avaliado, **então** a versão não será publicada até a conclusão ou um adiamento explicitamente registrado.
3. **Dado** que uma tag publicada precisa de correção, **quando** a correção for preparada, **então** uma nova versão será criada sem mover ou substituir a tag existente.

---

### História 3 — Auditar o fechamento (Prioridade: P2)

Como mantenedor, quero evidência verificável de revisão, integração, tag e publicação, para reconstruir quem aprovou o conteúdo e qual commit foi distribuído.

**Por que esta prioridade**: a release é uma afirmação pública e precisa preservar o mesmo padrão de rastreabilidade dos PRs.

**Teste independente**: comparar o commit da tag, o commit da principal, o PR de preparação, o gate de revisão e a release publicada.

**Cenários de aceite**:

1. **Dado** o PR de preparação, **quando** a tag for criada, **então** o HEAD revisado estará contido no commit marcado e todas as conversas bloqueantes estarão resolvidas.
2. **Dado** o fechamento concluído, **quando** a evidência for conferida, **então** os hashes do HEAD revisado, merge e tag, além da URL da release, estarão registrados.

### Casos-limite

- A principal avançar depois da revisão invalida a prontidão e exige reconferência do novo commit antes da tag.
- Uma tag `v0.1.0` ou release `0.1.0` preexistente bloqueia a criação; não se sobrescreve nem se move um marco público.
- Uma tarefa não concluída só sai da versão com adiamento explícito e destino definido; silêncio não equivale a retirada de escopo.
- Falha ao publicar a release mantém a tag verificável, mas o encerramento permanece incompleto até a publicação ou rollback seguro documentado.
- Artefatos históricos não devem ser descritos como aplicação funcional apenas por estarem presentes no commit marcado.

## Requisitos

### Requisitos funcionais

- **FR-001**: O projeto DEVE publicar a primeira versão de produto como `0.1.0`, usando a tag anotada `v0.1.0`.
- **FR-002**: A tag DEVE ser criada somente após o PR de preparação ser revisado, integrado e confirmado na principal.
- **FR-003**: A release DEVE apontar para `v0.1.0`, ser final (não rascunho e não pré-release) e possuir notas próprias.
- **FR-004**: As notas DEVEM listar destaques, conteúdo incluído, validações, limitações e referências rastreáveis aos PRs principais.
- **FR-005**: A versão DEVE incluir o estado integrado de documentação/governança, identidade visual estática, tokens/licenças/proveniência, hub visual e protótipo navegável.
- **FR-006**: A versão DEVE declarar como fora do escopo a aplicação Rails de produção, autenticação real, persistência, importação real, Docker Compose e CI/runner de aplicação.
- **FR-007**: A documentação vigente DEVE deixar de apresentar o PR 6 e seu protótipo como pendentes.
- **FR-008**: Todo novo conjunto de tarefas DEVE declarar uma versão-alvo ou backlog explícito antes da execução.
- **FR-009**: O fechamento de uma versão DEVE conferir todas as tarefas planejadas e registrar qualquer adiamento com destino antes de criar tag e release.
- **FR-010**: Tags publicadas DEVEM ser imutáveis; qualquer correção posterior DEVE usar uma nova versão sem sobrescrever a anterior.
- **FR-011**: O versionamento DEVE seguir SemVer: `0.x` representa desenvolvimento inicial; mudanças planejadas entram em minor e correções compatíveis em patch, salvo decisão registrada em contrário.
- **FR-012**: A evidência final DEVE registrar HEAD revisado, commit de merge, objeto/commit apontado pela tag e URL da release.
- **FR-013**: O processo DEVE manter revisão independente no HEAD de preparação e autorização explícita para o merge; a tag/release não pode contornar os gates existentes.

### Entidades principais

- **Versão planejada**: identificador SemVer, objetivo, tarefas incluídas, itens adiados e estado de fechamento.
- **Tarefa versionada**: trabalho rastreável associado a uma versão-alvo ou ao backlog explícito.
- **Tag de release**: referência imutável e anotada que identifica o commit integrado da versão.
- **Release publicada**: página pública associada à tag, com notas, estado final e evidência do conteúdo entregue.

## Critérios de sucesso

### Resultados mensuráveis

- **SC-001**: Existe exatamente uma tag `v0.1.0` e uma release final `0.1.0`, ambas apontando para o mesmo conteúdo integrado.
- **SC-002**: 100% dos itens declarados para `0.1.0` estão presentes no commit marcado ou explicitamente descritos como limitações, sem alegação funcional falsa.
- **SC-003**: 100% das tarefas futuras podem ser classificadas por versão-alvo ou backlog a partir do protocolo vigente.
- **SC-004**: Zero conversa bloqueante permanece aberta e o gate de revisão está bem-sucedido no HEAD usado para preparar a integração.
- **SC-005**: Uma pessoa consegue identificar em menos de dois minutos o que a `0.1.0` contém e o que ainda não contém lendo as notas da release.
- **SC-006**: Tag, release e principal podem ser correlacionadas por hashes e URLs sem depender desta conversa.

## Premissas

- `v0.1.0` é a primeira tag do repositório e `0.1.0` é a primeira GitHub Release.
- A release representa um marco documental e visual pré-aplicação, válido em SemVer como desenvolvimento inicial.
- O pequeno polimento da issue 9 permanece no backlog e não bloqueia `0.1.0`, pois não quebra leitura, navegação, acessibilidade nem aceite.
- O conteúdo da release será escrito em português; README, nomes de commits e identificadores públicos permanecem em inglês conforme a política existente.
- Douglas autorizou neste pedido o fechamento completo desta versão, incluindo merge normal após gates, criação da tag e publicação da release.

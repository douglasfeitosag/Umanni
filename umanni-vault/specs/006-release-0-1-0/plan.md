# Plano de implementação: Release 0.1.0 e gestão de versões

**Branch**: `codex/006-release-0-1-0` | **Data**: 2026-09-14 | **Spec**: [spec.md](spec.md)

**Entrada**: especificação em `umanni-vault/specs/006-release-0-1-0/spec.md`.

## Resumo

Preparar um primeiro marco público imutável do repositório, corrigir o estado documental pós-PR6 e instituir gestão de trabalho por versões. A implementação é documental e de metadados Git/GitHub: changelog, notas da release, política constitucional/protocolo, status, memória e um relatório EXEC; milestone `0.1.0` agrupa os PRs incluídos, o backlog explícito recebe a issue 9, e somente após merge/revisão serão criadas uma tag anotada `v0.1.0` e uma GitHub Release final.

## Contexto técnico

**Linguagem/versão**: Markdown; Git 2.x; GitHub CLI/API disponível no ambiente

**Dependências primárias**: Git, GitHub Releases, GitHub Milestones, checks/labels/threads já existentes

**Armazenamento**: arquivos versionados, referências Git e metadados do repositório GitHub

**Validação**: comandos Git/GitHub somente leitura antes de cada mutação; `git diff --check`; links, hashes, tag anotada, release e milestone conferidos após publicação

**Plataforma-alvo**: repositório público GitHub e checkout local macOS

**Tipo de projeto**: entrega documental e gestão de release; nenhuma aplicação é criada

**Metas de desempenho**: uma pessoa identifica conteúdo e exclusões da versão em menos de dois minutos

**Restrições**: não mover/sobrescrever tags; não publicar antes do merge; sem aplicação, pacote binário ou asset adicional; novo commit invalida revisão; release final não é rascunho nem pré-release

**Escala/escopo**: primeira tag/release, dois milestones (`0.1.0` e `Backlog`), PRs 1–8 mais o PR de preparação, issue 9 e até doze arquivos documentais novos/alterados

## Verificação da constituição

- **Especificação antes da execução**: spec, plano, tarefas, aceite e parada existem antes de mudar governança ou GitHub.
- **Validação proporcional**: não há código executável novo; validações são documentais, Git e GitHub reais, sem testes artificiais.
- **Escopo mínimo**: nenhuma aplicação, dependência, workflow, runner ou automação é criada.
- **Auditoria**: commits pequenos; EXEC registra hashes, PR, revisões, milestone, tag e release.
- **Integração humana**: Douglas autorizou especificamente neste pedido o merge normal e a publicação necessários para fechar `0.1.0`; não usar auto-merge nem bypass.
- **Revisão independente**: planejamento e entrega final usam contexto Luna high separado, threads resolvidas pelo revisor e `review-ledger` no HEAD exato.
- **Governança**: a nova regra permanente acrescenta um princípio de gestão de versões; a constituição muda de 2.0.0 para 2.1.0 por adicionar capacidade compatível, sem alterar princípios anteriores.

Gate da autoria: preparado. O aceite independente permanece pendente até a revisão no HEAD exato; nenhuma execução documental ou publicação pode começar antes desse aceite.

## Estrutura do projeto

### Documentação desta feature

```text
umanni-vault/specs/006-release-0-1-0/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/release-lifecycle.md
├── checklists/requirements.md
└── tasks.md
```

### Arquivos de entrega

```text
CHANGELOG.md
README.md
AGENTS.md
umanni-vault/
├── CONSTITUICAO.md
├── PROTOCOL.md
├── STATUS.md
├── MEMORIA-PROJETO.md
├── 09-DOCUMENTACAO-E-PUBLICACAO.md
├── releases/0.1.0.md
├── PROMPT-COND-006-FOUNDATION.md
└── EXEC-006-RELEASE-0-1-0.md
```

**Decisão estrutural**: manter política e evidência no vault canônico, um changelog público na raiz e notas da release em arquivo reutilizável pela publicação GitHub. Metadados externos ficam no milestone, PR, tag e release; não há código-fonte.

## Rastreamento de complexidade

Nenhuma violação ou complexidade excepcional.

## Check pós-design

O desenho proposto mantém tag imutável, revisão exata, merge antes da marcação e falha segura. Milestones tornam a versão-alvo verificável sem adicionar automação. A release preserva as exclusões da aplicação. Check pós-design da autoria: preparado; aprovação independente ainda pendente.

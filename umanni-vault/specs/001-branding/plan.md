# Plano 001 — Identidade visual Umanni

**Branch de planejamento**: `codex/001-branding` | **Branch de execução pós-merge**: `codex/003-branding-assets` | **Data**: 2026-09-14 | **Spec**: [spec.md](spec.md)

## Resumo

Produzir uma entrega de branding estática, rastreável e pronta para orientar a futura interface do teste Umanni. A executora preservará os dois logos públicos verificados, consolidará tipografia, paleta acessível, tokens, estados, playbook, prancha de componentes e cinco composições. Nenhum componente de aplicação será implementado.

## Contexto técnico

**Formatos**: Markdown, JSON, SVG, PNG, ICO e fontes redistribuíveis
**Dependências**: Montserrat, Roboto, Heroicons e fontes públicas oficiais da Umanni
**Armazenamento**: arquivos versionados; nenhum banco
**Validação**: SHA-256, metadados, SVG→PNG, contraste WCAG 2.2 AA, inspeção visual e links
**Plataforma-alvo**: navegadores modernos em telas ampla e estreita; artefatos independentes de framework
**Tipo**: sistema visual e especificação de interface
**Desempenho**: não aplicável a comportamento; peso e dimensões dos assets devem ser registrados
**Restrições**: tema claro; duas variantes de logo; nenhuma criação de marca ou componente executável; uso avaliativo não oficial e sem licença expressa
**Escopo**: playbook, tokens, matriz e prancha de componentes, cinco composições e evidências

O prazo original terminava em 2026-09-11. A data atual é 2026-09-14; o plano registra o atraso e não representa o prazo como cumprido.

## Verificação da constituição

### Antes da pesquisa

- **Especificação antes da execução**: passa; spec, briefing, aceite e parada precedem a executora.
- **Comportamentos e testes**: passa; US1–US3 e checklists definem validação pertinente a assets estáticos.
- **Arquitetura e escopo mínimo**: passa; nenhuma aplicação ou abstração de produção será criada.
- **Entregas auditáveis**: passa; cada asset exige origem, hash, transformação, inspeção e limitação.
- **Controle humano**: passa; sessão executora será aberta manualmente; merge e fechamento permanecem exclusivos de Douglas.
- **Memória e transparência**: passa; documentos distinguem modelos, terceiros e trabalho original; nenhum segredo será incluído.
- **Revisão independente**: a revisão original foi concluída no PR #2. Depois de seu merge por Douglas, passa novamente quando uma revisora em sessão distinta confirmar o handoff e a spec integrada no PR #3, resolver as threads, aplicar `spec-reviewed` e marcar `review-ledger=success` no HEAD antes da execução. Achados exigem `review-ledger=failure`, label `changes-requested` e uma thread por achado. Implementação e evidências exigem novo ciclo no PR #3.

### Após o desenho

Os contratos restringem a entrega a arquivos estáticos, fontes e evidências. Não há violação constitucional nem complexidade excepcional.

## Fase 0 — Pesquisa

Usar [research.md](research.md) como registro de fontes e decisões. A executora atualiza data, hash ou disponibilidade se a fonte mudar; não substitui fonte oficial por agregador sem registrar a limitação.

Pesquisa resolvida: identidade/variantes; hierarquia entre site e blog; fontes/licenças; cores/contraste; iconografia; termos de uso. Não restam esclarecimentos.

## Fase 1 — Desenho e contratos

1. Usar [data-model.md](data-model.md) para assets, tokens, componentes, composições e evidências.
2. Cumprir [contracts/brand-assets.md](contracts/brand-assets.md) para nomes, fontes e transformações.
3. Cumprir [contracts/component-state-matrix.md](contracts/component-state-matrix.md) para estados e responsividade.
4. Validar com [quickstart.md](quickstart.md) e [checklists/visual-acceptance.md](checklists/visual-acceptance.md).

## Estrutura da entrega

```text
specs/001-branding/
├── spec.md
├── briefing.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
├── checklists/
└── tasks.md

branding/
├── README.md
├── BRAND-PLAYBOOK.md
├── COMPONENT-SPEC.md
├── PROVENANCE.md
├── VALIDATION.md
├── LICENSES/
├── assets/{logo,fonts,icons}/
├── tokens/tokens.json
└── boards/
    ├── components.{svg,png}
    ├── login-responsive.{svg,png}
    ├── dashboard-desktop.{svg,png}
    ├── users-desktop.{svg,png}
    ├── import-desktop.{svg,png}
    └── users-mobile.{svg,png}
```

SVG é a fonte editável das pranchas e PNG a evidência renderizada. Esses SVGs não são componentes da aplicação.

## Ordem

1. Verificar branch, base, estado e fontes públicas.
2. Preservar assets e registrar procedência/licenças.
3. Definir tokens e playbook com contraste comprovado.
4. Especificar componentes e estados.
5. Criar a prancha e as cinco composições.
6. Renderizar e validar arquivos, hashes, contraste, dimensões, legibilidade e escopo.
7. Registrar `EXEC-001-BRANDING.md` e commit local coeso.

## Bootstrap e gates antes do primeiro PR

### Estado confirmado

- Em 2026-09-10, `main` e `origin/main` apontavam para `11e47d2364399d0c19fb9fa812de5e5d4cac4c71`, mensagem `docs: establish Umanni project baseline`.
- A sessão iniciou com árvore limpa e sem commits posteriores em `main`.
- Isso confirma a publicação do bootstrap; não comprova proteções, checks ou runner.

O PR documental pode ser criado e atualizado automaticamente, com label e responsável, para hospedar a revisão da spec. Isso não comprova o gate completo nem autoriza execução ou merge. Antes de pedir a Douglas o merge de uma entrega implementada, estes itens devem estar configurados e testados em tarefa própria:

1. regra de `main` exigindo PR e bloqueando force-push/exclusão;
2. checks obrigatórios para entrega e ledger de revisão;
3. dispensa de aprovações obsoletas após novos commits;
4. exigência de conversas resolvidas sem tratá-la como cobertura de comentários gerais;
5. ledger versionado com ID, severidade, local, evidência, impacto, autor/papel/modelo, commit analisado, decisão e commit corretivo;
6. check `review-ledger` que falhe se houver achado sem decisão, HEAD divergente ou comentários/reviews não representados;
7. runner no Mac isolado por PR e sem segredos persistentes acessíveis a código não confiável, instalado somente após plano/teste específico;
8. verificação de sessão, papel e modelo; o mesmo login será declarado e não será apresentado como duas identidades ou aprovação nativa independente.

Até comprovar o gate, o PR permanece bloqueado e não pode ser apresentado como pronto para merge. O PR #2 foi mesclado por Douglas depois do aceite documental. A executora só inicia no PR #3, branch `codex/003-branding-assets`, após `review-ledger=success`, threads resolvidas e `spec-reviewed` no HEAD vigente; publica a entrega estática nesse PR para a segunda revisão. Douglas continua sendo a única pessoa autorizada a fazer merge ou fechar PR.

Atualização de 2026-09-14: Douglas autorizou explicitamente configurar a proteção base de `main`, sincronizar a reorganização já integrada e criar/atualizar PRs automaticamente, sempre com label e responsável. A configuração vigente foi confirmada pela API com zero aprovações nativas, `review-ledger` obrigatório e estrito por SHA, conversas resolvidas, aplicação a administradores e bloqueio de force-push/exclusão. Labels e threads representam o estado da revisão sob a conta única. A autorização de PR não comprova nem dispensa os checks de entrega, a futura automação do ledger ou o runner isolado ainda pendentes, e não autoriza merge ou fechamento.

## Validação visual

| Artefato | Canvas/viewport normativo | Conteúdo e ações representadas |
| --- | --- | --- |
| `components.svg/png` | 1440×1024 | prancha de componentes e estados; sem fluxo funcional |
| `login-responsive.svg/png` | canvas 1878×1024 com artboards 1440×1024 e 390×844 separados por 48 px | e-mail, senha e `Sign in`; sem recuperação de senha ou ação não especificada |
| `dashboard-desktop.svg/png` | 1440×1024 | três indicadores não interativos; navegação para painel, usuários, importações e perfil/conta |
| `users-desktop.svg/png` | 1440×1024 | `Create user`; `Edit` e `Delete` por linha; papel alterado somente dentro da edição |
| `import-desktop.svg/png` | 1440×1024 | escolher/substituir arquivo, iniciar importação e acompanhar estado; sem mapeamento ou pré-validação inventados |
| `users-mobile.svg/png` | 390×844 | os mesmos dados e ações de usuários desktop em cartões; toast no rodapé |

Busca, filtro, paginação, seleção em lote e mudança rápida de papel não integram as composições. A área de respiro e o tamanho mínimo do logo não foram publicados como norma: o playbook registra essa ausência e identifica qualquer recomendação visual como `adapted`, com método e viewport de validação, nunca como regra oficial observada.

- Texto normal: 4,5:1; texto grande: 3:1; componentes/foco: 3:1 contra cores adjacentes.
- Alvos estreitos: 44×44 px ou espaçamento equivalente documentado.
- Movimento discreto, funcional e removível por preferência de movimento reduzido.

## Parada

A condutora para após uma revisora em sessão distinta resolver todas as threads, aplicar `spec-reviewed` e marcar `review-ledger=success` no PR #3 contra o novo HEAD. Não cria assets. A executora para após produzir, validar, commitar e publicar `branding/` e `EXEC-001-BRANDING.md` no PR #3, preservando label e responsável. Não implementa aplicação, faz merge ou fechamento.

## Fechamento posterior verificado

O texto acima preserva o plano e o ponto de parada anteriores à execução. O PR #3 foi integrado enquanto a produção dos assets estava em andamento e contém apenas o handoff aceito. A entrega estática real foi publicada no PR #4, aceita no HEAD `97c5012e193b57531f245e07d9169cde84468e31` com `review-ledger=success` e `code-reviewed`, e integrada pelo merge `cba851bcc5a672c7e447fbe17f3f03428397b955`. O `EXEC-001-BRANDING.md` registra T001–T031 concluídas.

# COND-001 — Planejamento de branding

Data: 2026-09-14. Condutora: Codex `gpt-5.6-sol / medium`. Autor das decisões: Douglas. Origem: `PROMPT-COND-001-BRANDING.md`. Base original: `11e47d2364399d0c19fb9fa812de5e5d4cac4c71`, depois sincronizada com `a98885f`. Branch: `codex/001-branding`. PR: #2.

## Resultado

Briefing fechado em perguntas individuais. Foram produzidos spec, plano, pesquisa, modelo de artefatos, contratos, quickstart, checklists e 31 tarefas. O Spec Kit 1.0.6 foi regenerado conforme `TOOLING.md`; a constituição permaneceu byte a byte igual. Nenhum asset ou componente de aplicação foi criado.

A análise inicial contou 24 requisitos funcionais, 8 critérios de sucesso e 31 tarefas. A revisão independente posterior no PR #2 identificou sete achados (`SPEC-REV-001` a `SPEC-REV-007`), que prevalecem sobre a conclusão inicial até correção e reconfirmação no novo HEAD.

## Decisões confirmadas

- identidade pública fiel, uso avaliativo não oficial e sem licença expressa;
- site principal como autoridade visual; blog como confirmação/editorial;
- somente assinatura horizontal e símbolo azul;
- Montserrat dominante, Roboto em ações/utilidades, Heroicons;
- tema claro; modo escuro excluído por falta de evidência pública;
- acessibilidade prevalece em papéis funcionais, com motivo registrado;
- sidebar/menu responsivo, tabela desktop/cartões mobile, três indicadores;
- toasts restritos, exclusão com `EXCLUIR`, importação em tela única;
- avatar por iniciais, densidade equilibrada e frase institucional somente no login;
- prancha de componentes e cinco composições estáticas.

## Propostas rejeitadas

- criar logo novo, monograma ou variantes não publicadas;
- misturar tipografia editorial do blog na aplicação;
- repetir combinações de cor que falham WCAG AA;
- inventar tema escuro, gráficos, atividade recente ou regras de importação;
- tabela com rolagem no celular ou cartões em todas as telas;
- usar o logo como avatar e usar toast para toda atualização ao vivo;
- implementar componentes nesta etapa.

## Arquivos

- `specs/001-branding/spec.md`
- `specs/001-branding/briefing.md`
- `specs/001-branding/plan.md`
- `specs/001-branding/research.md`
- `specs/001-branding/data-model.md`
- `specs/001-branding/contracts/brand-assets.md`
- `specs/001-branding/contracts/component-state-matrix.md`
- `specs/001-branding/quickstart.md`
- `specs/001-branding/checklists/requirements.md`
- `specs/001-branding/checklists/visual-acceptance.md`
- `specs/001-branding/tasks.md`
- `PROMPT-EXEC-001-BRANDING.md`
- `COND-001-BRANDING.md`
- atualizações em `README.md`, `STATUS.md` e `MEMORIA-PROJETO.md`.

## Pendências

- O prazo original de 11/09/2026 passou antes do fechamento em 14/09; não declarar cumprimento.
- A proteção base está configurada, mas checks, `review-ledger`, identidade independente e runner ainda não estão comprovados. O PR documental pode ser criado/atualizado com label e responsável para revisão; o gate completo continua obrigatório antes de apresentar implementação como pronta para merge.
- Regras funcionais de conta, importação, avatar, último administrador, paginação e filtros permanecem para specs posteriores.
- A executora deve revalidar hashes e licenças atuais, especialmente a licença efetiva do Roboto baixado.

## Addendum de revisão — 2026-09-14

A revisora `gpt-5.6-luna / high` analisou o HEAD `875f1e3` sob o mesmo login do autor e publicou achados como `COMMENTED`; sete ficaram em threads e um em comentário geral. Condutora e revisora corrigiram e confirmaram o conteúdo. Para operar com uma única conta, o aceite passa a exigir status `review-ledger=success` no SHA exato, threads resolvidas pela revisora e label `spec-reviewed`. A execução permanece bloqueada até essa comprovação no HEAD vigente; depois Douglas abre manualmente a sessão `gpt-5.6-terra / high` com `PROMPT-EXEC-001-BRANDING.md`.

## Addendum pós-merge — 2026-09-14

Douglas mesclou o PR documental #2. A `main` integrada `b374118` possui árvore equivalente ao HEAD aprovado `5674d91`, mas o PR mesclado não pode receber a implementação. A condutora abriu a branch `codex/003-branding-assets` para o handoff e o PR #3 passa a hospedar a execução e a revisão posterior dos artefatos. A executora só começa depois da reconfirmação independente desse novo HEAD e continua proibida de mesclar ou fechar o PR.

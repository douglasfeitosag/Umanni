# COND-001 — Planejamento de branding

Data: 2026-09-14. Condutora: Codex `gpt-5.6-sol / medium`. Autor das decisões: Douglas. Origem: `PROMPT-COND-001-BRANDING.md`. Base verificada: `11e47d2364399d0c19fb9fa812de5e5d4cac4c71`, `docs: establish Umanni project baseline`. Branch: `codex/001-branding`. PR: não criado.

## Resultado

Briefing fechado em perguntas individuais. Foram produzidos spec, plano, pesquisa, modelo de artefatos, contratos, quickstart, checklists e 31 tarefas. O Spec Kit 1.0.6 foi regenerado conforme `TOOLING.md`; a constituição permaneceu byte a byte igual. Nenhum asset ou componente de aplicação foi criado.

A análise de consistência contou 24 requisitos funcionais, 8 critérios de sucesso e 31 tarefas. Todos possuem cobertura por produção ou validação; não foram encontrados conflitos constitucionais, marcadores pendentes ou achados críticos/altos.

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
- Bootstrap remoto está publicado, mas checks/proteções/runner não estão comprovados. `plan.md` define o gate; até implantá-lo, somente commits locais.
- Regras funcionais de conta, importação, avatar, último administrador, paginação e filtros permanecem para specs posteriores.
- A executora deve revalidar hashes e licenças atuais, especialmente a licença efetiva do Roboto baixado.

## Próximo passo

Douglas abre manualmente uma sessão `gpt-5.6-terra / high` e cola `PROMPT-EXEC-001-BRANDING.md`. A sessão produz somente a entrega estática e para após commit local. Revisores Luna high serão preparados depois, por prompt próprio.

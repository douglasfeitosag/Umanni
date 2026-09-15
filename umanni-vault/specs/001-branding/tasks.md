# Tarefas 001 — Identidade visual Umanni

**Entrada**: documentos em `specs/001-branding/`
**Organização**: tarefas agrupadas por história; cada item possui arquivo exato.
**Testes**: validações estáticas e visuais exigidas pela spec; nenhum teste de aplicação.

## Fase 1 — Preparação

- [x] T001 Verificar base, branch e árvore e registrar o resultado inicial em `EXEC-001-BRANDING.md`.
- [x] T002 Criar somente a estrutura autorizada de entrega descrita em `specs/001-branding/plan.md` sob `branding/`.
- [x] T003 Registrar URLs, datas, respostas HTTP e hashes atuais das fontes públicas em `branding/PROVENANCE.md` antes de produzir derivados.

## Fase 2 — Fundação compartilhada

- [x] T004 Criar o aviso de uso avaliativo não oficial e sem licença expressa em `branding/LICENSES/UMANNI-NOTICE.md`.
- [x] T005 [P] Preservar as licenças Montserrat e Roboto em `branding/LICENSES/Montserrat-OFL-1.1.txt` e `branding/LICENSES/Roboto-LICENSE.txt`.
- [x] T006 [P] Preservar a licença Heroicons em `branding/LICENSES/Heroicons-MIT.txt`.
- [x] T007 Definir a convenção de origem `observed`, `decided` e `adapted` em `branding/README.md`.

**Checkpoint**: procedência e limitações existem antes de qualquer prancha.

## Fase 3 — US1: reconhecer a marca correta (P1)

**Teste independente**: comparar assets preservados com URLs oficiais e hashes registrados.

- [x] T008 [P] [US1] Preservar assinatura oficial SVG e PNG sem alteração em `branding/assets/logo/umanni-horizontal.svg` e `branding/assets/logo/umanni-horizontal.png`.
- [x] T009 [P] [US1] Preservar símbolo e favicon oficiais em `branding/assets/logo/umanni-symbol.png` e `branding/assets/logo/favicon.ico`.
- [x] T010 [P] [US1] Copiar byte a byte `ofl/montserrat/Montserrat[wght].ttf` para `branding/assets/fonts/montserrat-variable.ttf` e `ofl/roboto/Roboto[wdth,wght].ttf` para `branding/assets/fonts/roboto-variable.ttf`; registrar nomes upstream/local, `wght=400–700`, `wdth=100` para Roboto e hashes upstream/local idênticos em `branding/PROVENANCE.md`.
- [x] T011 [US1] Validar hashes, tipos, dimensões, transparência e frames dos assets e registrar resultados reais em `branding/VALIDATION.md`.
- [x] T012 [US1] Registrar em `branding/BRAND-PLAYBOOK.md` que não foram encontradas normas públicas de área de respiro ou tamanho mínimo; documentar usos e alterações proibidas e rotular qualquer recomendação derivada como `adapted`, com método, medida e viewport de validação, nunca como regra oficial.

**Checkpoint**: US1 demonstra apenas as duas variantes públicas e a limitação de uso.

## Fase 4 — US2: aplicar sistema visual coerente (P1)

**Teste independente**: validar cada token e componente isoladamente contra playbook e matriz de estados.

- [x] T013 [P] [US2] Definir tokens independentes de framework, origem e pares de contraste em `branding/tokens/tokens.json`.
- [x] T014 [P] [US2] Listar somente Heroicons usados, nome upstream, tamanho e estilo em `branding/assets/icons/heroicons-manifest.md`.
- [x] T015 [US2] Completar tipografia, paleta, espaçamento, forma, foco, elevação, responsividade e movimento em `branding/BRAND-PLAYBOOK.md`.
- [x] T016 [US2] Especificar anatomia, variantes, conteúdo, estados e acessibilidade de todos os componentes em `branding/COMPONENT-SPEC.md`.
- [x] T017 [US2] Explicar em `branding/BRAND-PLAYBOOK.md` por que `#03A1E0` não recebe branco em texto comum e por que o tema escuro não existe.
- [x] T018 [US2] Criar a prancha editável e renderizada em `branding/boards/components.svg` e `branding/boards/components.png`.
- [x] T019 [US2] Medir todos os pares de contraste e validar estados/alvos da prancha, registrando resultados reais em `branding/VALIDATION.md`.

**Checkpoint**: US2 permite implementar componentes futuros sem decisão visual implícita.

## Fase 5 — US3: validar fluxos representativos (P2)

**Teste independente**: inspecionar cinco composições nos viewports definidos e confirmar que não inventam comportamento.

- [x] T020 [P] [US3] Criar login em `branding/boards/login-responsive.svg`, no canvas 1878×1024 com artboards 1440×1024 e 390×844 separados por 48 px, contendo somente e-mail, senha, `Sign in`, frase separada e aviso não oficial.
- [x] T021 [P] [US3] Criar painel 1440×1024 com exatamente três indicadores não interativos e navegação aprovada em `branding/boards/dashboard-desktop.svg`.
- [x] T022 [P] [US3] Criar gestão de usuários 1440×1024 em `branding/boards/users-desktop.svg`, com tabela, `Create user`, `Edit`/`Delete` por linha e diálogo `EXCLUIR`; papel muda somente na edição.
- [x] T023 [P] [US3] Criar importação 1440×1024 em `branding/boards/import-desktop.svg`, com escolher/substituir arquivo, iniciar e acompanhar estado, sem mapeamento ou pré-validação inventados.
- [x] T024 [P] [US3] Criar gestão de usuários 390×844 em `branding/boards/users-mobile.svg`, preservando dados e ações do desktop em cartões, menu recolhível e toast inferior.
- [x] T025 [US3] Renderizar os cinco SVGs para PNGs homônimos em `branding/boards/` nas dimensões da tabela normativa de `specs/001-branding/plan.md` e registrar comando/dimensão em `branding/VALIDATION.md`.
- [x] T026 [US3] Inspecionar cada artefato no viewport normativo, incluindo os dois artboards do login, e preencher `specs/001-branding/checklists/visual-acceptance.md` com hierarquia, corte, sobreposição, contraste, alvos, ações e consistência.

**Checkpoint**: cinco composições aprovadas sem código executável.

## Fase 6 — Fechamento

- [x] T027 Consolidar inventário, instruções e limitações em `branding/README.md`; referenciar `branding/LICENSES/UMANNI-NOTICE.md` no README, playbook, especificação de componentes, procedência, validação, manifesto de ícones e EXEC e incluir aviso resumido com essa referência em cada prancha/composição.
- [x] T028 Executar `specs/001-branding/quickstart.md` e registrar cada resultado real em `branding/VALIDATION.md`.
- [x] T029 Registrar modelo real, arquivos, formatos, evidências, licenças, limitações e estado Git em `EXEC-001-BRANDING.md`.
- [x] T030 Atualizar apenas os aprendizados verificáveis propostos em `EXEC-001-BRANDING.md`; a condutora futura decide alterações em `MEMORIA-PROJETO.md`.
- [x] T031 Incluir arquivos novos com `git add --intent-to-add branding/ EXEC-001-BRANDING.md`, executar `git diff --check`, revisar o escopo, adicionar os arquivos integralmente e executar `git diff --cached --check`; registrar ambos os resultados no EXEC e criar commit coeso. Push/atualização do PR são permitidos com label e responsável; merge e fechamento permanecem proibidos.

## Dependências

- Fase 1 precede Fase 2; Fase 2 bloqueia US1–US3.
- US1 precede a conclusão de US2 porque playbook/prancha usam assets verificados.
- US2 precede a conclusão de US3 porque composições usam tokens/componentes.
- T020–T024 podem ocorrer em paralelo depois de T019.
- Fase 6 depende de US1–US3 completas.

## Estratégia incremental

1. Entregar procedência e assets reconhecíveis (US1).
2. Entregar o sistema visual verificável (US2).
3. Demonstrar o sistema nos fluxos (US3).
4. Parar após validação e commit local; não implementar a aplicação.

## Evidência posterior do ledger

Os checkboxes T001–T031 foram reconciliados em 2026-09-15 sem alterar suas descrições. `umanni-vault/EXEC-001-BRANDING.md` registra todos os blocos concluídos; o PR #4 foi aceito no HEAD `97c5012e193b57531f245e07d9169cde84468e31`, recebeu `review-ledger=success` e `code-reviewed`, e foi integrado por `cba851bcc5a672c7e447fbe17f3f03428397b955`.

## Oportunidades paralelas

- T005/T006; T008–T010; T013/T014; T020–T024.
- Nenhuma paralelização autoriza sessões automáticas; Douglas abre cada sessão manualmente.

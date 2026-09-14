# Especificação 001 — Identidade visual Umanni

**Branch de planejamento**: `codex/001-branding` | **Branch de execução**: `codex/003-branding-assets`
**Criada em**: 2026-09-14
**Estado**: revisão original aceita e mesclada por Douglas no PR #2; handoff pós-merge em revisão independente no PR #3, com execução bloqueada até `review-ledger=success` e label `spec-reviewed` no HEAD vigente
**Origem**: briefing conduzido com Douglas entre 2026-09-10 e 2026-09-14

## Cenários de usuário e aceite

### US1 — Reconhecer a marca correta (P1)

Como avaliador do teste, quero reconhecer a identidade pública vigente da Umanni sem confundi-la com uma marca criada para o exercício.

**Por que P1**: a fidelidade à empresa destinatária é a finalidade central desta entrega e governa todas as demais decisões visuais.

**Teste independente**: comparar os assets e o inventário de marca com o site principal e o blog oficiais, verificando procedência, proporção, cor e limitações declaradas.

**Cenários de aceite**:

1. **Dado** o material de branding entregue, **quando** a assinatura horizontal é comparada ao arquivo servido pelo site principal, **então** desenho, proporção e azul da marca permanecem fiéis.
2. **Dado** um espaço compacto, **quando** o símbolo isolado é aplicado, **então** ele corresponde à variante pública usada pelo blog; o favicon é apenas um empacotamento técnico preservado do site e não constitui nem autoriza outra variante.
3. **Dado** qualquer documento ou prancha da entrega, **quando** sua procedência é inspecionada, **então** fica claro que se trata de projeto avaliativo não oficial, sem licença expressa da Umanni.

---

### US2 — Aplicar um sistema visual coerente (P1)

Como futura executora da interface, quero regras inequívocas de tipografia, cor, espaçamento, forma, iconografia e estados para implementar somente os componentes exigidos pelos fluxos do teste.

**Por que P1**: os assets isolados não bastam para produzir uma interface consistente, acessível e auditável.

**Teste independente**: montar a prancha de componentes e verificar cada componente contra os tokens, estados e regras de acessibilidade publicados no playbook.

**Cenários de aceite**:

1. **Dado** um componente especificado, **quando** seus estados são comparados ao playbook, **então** cor, tipografia, espaçamento, borda, foco e iconografia são determinísticos.
2. **Dado** texto comum ou um controle interativo, **quando** o contraste é medido, **então** ele alcança WCAG 2.2 AA; se uma combinação pública da marca falhar, o playbook explica por que o papel funcional foi adaptado.
3. **Dado** um estado de sucesso, alerta, erro, informação, carregamento, vazio ou desabilitado, **quando** ele é apresentado, **então** seu significado não depende apenas de cor.

---

### US3 — Validar os fluxos representativos (P2)

Como Douglas, quero inspecionar composições estáticas responsivas antes de autorizar componentes de aplicação.

**Por que P2**: as composições validam a integração do sistema visual, mas dependem do inventário e dos componentes das histórias anteriores.

**Teste independente**: inspecionar as cinco composições nos tamanhos definidos, confirmando hierarquia, legibilidade, responsividade e ausência de funcionalidades inventadas.

**Cenários de aceite**:

1. **Dado** o painel administrativo em tela ampla, **quando** a composição é inspecionada, **então** exibe somente totais de pessoas, administradores e usuários comuns, com atualização visual discreta especificada.
2. **Dada** a gestão de usuários, **quando** telas ampla e estreita são comparadas, **então** a tabela do desktop torna-se cartões no celular preservando avatar, nome, e-mail, papel e estado, além das ações explícitas de criar, editar e excluir; a alteração de papel aparece somente dentro da edição, não como controle rápido.
3. **Dada** a importação, **quando** sua composição é inspecionada, **então** seleção de CSV/XLSX, instruções, arquivo escolhido, progresso e resultado permanecem em uma única tela.
4. **Dada** a autenticação, **quando** sua composição é inspecionada, **então** usa a assinatura horizontal, a frase “Desenvolvendo o potencial das pessoas” e o aviso de projeto não oficial sem incorporar a frase ao logo.

### Casos-limite

- O logo nunca deve ser esticado, recolorido, redesenhado ou colocado sobre fundo que reduza sua legibilidade.
- A inexistência de variante pública branca, preta, monocromática ou vertical impede que a entrega invente essas variantes.
- O modo escuro não integra a entrega porque não foram encontradas informações públicas suficientes para especificá-lo fielmente.
- Textos e controles não podem usar o azul `#03A1E0` sobre branco quando o contraste exigido não for alcançado; a adaptação deve ser explicada, não escondida.
- Toasts não podem ser o único lugar onde um resultado importante aparece nem anunciar cada atualização ao vivo.
- Erros de formulário permanecem próximos ao campo; falhas e progresso de importação permanecem visíveis no contexto da tarefa.
- O botão de exclusão permanece desabilitado até o campo de confirmação conter exatamente `EXCLUIR`, desconsiderando apenas espaços externos.
- Avatares ausentes exibem até duas iniciais; se não houver nome utilizável, exibem ícone genérico.

## Requisitos

### Requisitos funcionais da entrega visual

- **FR-001**: a entrega DEVE tratar `https://www.umanni.com.br/` como fonte visual primária vigente e o blog oficial apenas como confirmação de marca e referência editorial.
- **FR-002**: a entrega DEVE preservar somente as duas variantes públicas verificadas: assinatura horizontal azul e símbolo azul isolado. O `favicon.ico` é um artefato técnico copiado byte a byte, fora da contagem de variantes, e não pode ser tratado como logo independente nem originar novo desenho.
- **FR-003**: cada asset de terceiro DEVE registrar URL de origem, data de consulta, formato recebido, transformações realizadas, hash e situação de licença.
- **FR-004**: `branding/LICENSES/UMANNI-NOTICE.md` DEVE ser o aviso canônico de uso avaliativo, caráter não oficial, ausência de licença expressa e proibição de reutilização. `branding/README.md`, `BRAND-PLAYBOOK.md`, `COMPONENT-SPEC.md`, `PROVENANCE.md`, `VALIDATION.md`, `assets/icons/heroicons-manifest.md` e `EXEC-001-BRANDING.md` DEVEM referenciá-lo; cada prancha/composição DEVE exibir aviso resumido e referência ao arquivo canônico sem modificar os assets oficiais preservados.
- **FR-005**: o sistema tipográfico DEVE usar Montserrat como família dominante e Roboto somente em textos de ação ou utilidade, com pesos 400, 500, 600 e 700 e fallbacks locais documentados.
- **FR-006**: licenças e avisos das fontes DEVEM acompanhar os arquivos quando forem redistribuídos.
- **FR-007**: a paleta DEVE separar cores de marca, cores funcionais e cores semânticas, com contraste medido e justificativa para toda adaptação da referência pública.
- **FR-008**: `#03A1E0` DEVE permanecer como azul do logo e realce não textual; `#0D3C61` DEVE atender a superfícies escuras e ações com texto branco; `#0B79D0` DEVE atender a links e controles sobre branco, sujeitos à verificação final.
- **FR-009**: o sistema DEVE ser especificado somente em tema claro e registrar que o modo escuro foi excluído por insuficiência de informação pública, não por limitação técnica.
- **FR-010**: os tokens DEVEM cobrir cor, tipografia, espaçamento, dimensões, raios, bordas, sombras, foco, elevação, movimento e pontos responsivos sem depender de um framework.
- **FR-011**: a iconografia DEVE usar Heroicons sob licença MIT, com outline para navegação e ações e solid apenas para seleção ou alerta enfatizado.
- **FR-012**: todo ícone interativo DEVE ter rótulo visível ou nome acessível.
- **FR-013**: o shell administrativo DEVE usar barra lateral clara em tela ampla, menu recolhível em tela estreita e cabeçalho compacto, limitado a painel, usuários, importações e perfil/conta conforme o papel.
- **FR-014**: o painel DEVE especificar exatamente três cartões de indicadores: total de pessoas, administradores e usuários comuns, sem gráficos nem atividade inventada.
- **FR-015**: a gestão de usuários DEVE usar tabela em tela ampla e cartões em tela estreita, preservando avatar, nome, e-mail, papel e estado. As duas versões DEVEM mostrar a ação de página `Create user` e, para cada pessoa, `Edit` e `Delete`; mudança de papel aparece somente no formulário de edição. Busca, filtro, paginação, seleção em lote e controles rápidos de papel NÃO DEVEM ser representados.
- **FR-016**: a densidade DEVE ser equilibrada: formulários e cartões confortáveis; tabela ampla mais compacta, com linha-alvo de aproximadamente 48 px sem reduzir alvos interativos.
- **FR-017**: o padrão de toast DEVE cobrir cadastro, edição, exclusão e início de importação; sucesso pode desaparecer, mas erro importante permanece até dispensa.
- **FR-018**: atualizações ao vivo dos indicadores DEVEM ser silenciosas, com mudança visual breve e anúncio acessível, sem gerar toast por atualização.
- **FR-019**: o diálogo destrutivo DEVE explicar a consequência, identificar a pessoa, solicitar `EXCLUIR`, manter cancelar disponível e habilitar a ação somente após confirmação textual válida.
- **FR-020**: a importação DEVE ser especificada em uma tela única e não DEVE inventar mapeamento de colunas, pré-validação ou regras funcionais ainda pendentes.
- **FR-021**: a frase “Desenvolvendo o potencial das pessoas” DEVE aparecer somente na autenticação e permanecer separada do arquivo do logo.
- **FR-022**: a entrega DEVE incluir uma prancha de componentes e cinco composições estáticas: autenticação responsiva, painel amplo, usuários amplo, importação e usuários em tela estreita.
- **FR-023**: as especificações DEVEM cobrir default, hover, focus-visible, active, disabled, loading, empty, success, warning, error e informação onde forem aplicáveis.
- **FR-024**: esta entrega NÃO DEVE criar componentes de aplicação, comportamento executável ou funcionalidades não presentes nos fluxos exigidos.

### Entidades visuais

- **Asset de marca**: arquivo visual de terceiro, sua variante, dimensões, hash, origem, data de consulta, transformação e restrição de uso.
- **Token**: decisão visual atômica nomeada, com valor, papel semântico, combinações permitidas e evidência de contraste quando aplicável.
- **Componente especificado**: anatomia, variantes, estados, conteúdo, regras responsivas e requisitos de acessibilidade sem implementação.
- **Composição estática**: representação visual de um fluxo em viewport declarado, rastreada aos componentes e sem comportamento executável.
- **Registro de procedência**: evidência que distingue observação pública, decisão de Douglas, adaptação acessível e trabalho original da executora.

## Critérios de sucesso

### Resultados mensuráveis

- **SC-001**: 100% dos assets de terceiros possuem origem, data, hash, transformação e licença/restrição registradas.
- **SC-002**: as duas variantes de logo entregues mantêm proporção e cor verificadas contra as fontes oficiais, sem variantes adicionais; o favicon permanece identificado e validado somente como artefato técnico byte a byte.
- **SC-003**: 100% das combinações de texto comum e controles alcançam contraste WCAG 2.2 AA; cada exceção decorativa é identificada como não textual.
- **SC-004**: todos os componentes aplicáveis exibem os estados exigidos na prancha ou na matriz de estados, sem depender apenas de cor.
- **SC-005**: as cinco composições são legíveis e não apresentam corte ou sobreposição nos viewports documentados.
- **SC-006**: todos os elementos interativos representados alcançam alvo mínimo de 44 × 44 px em tela estreita ou documentam espaçamento equivalente que evite ativação acidental.
- **SC-007**: um revisor consegue rastrear cada cor, fonte, logo, ícone, componente e composição a uma fonte pública, decisão confirmada ou adaptação explicitamente justificada.
- **SC-008**: nenhuma aplicação, componente de produção, modo escuro, gráfico, módulo ou regra funcional de importação é criado nesta entrega.
- **SC-009**: 100% dos documentos materiais referenciam o aviso canônico e 100% das pranchas exibem o aviso resumido, sem alterar os arquivos oficiais de marca.

## Premissas

- A reprodução da marca foi autorizada por Douglas para este teste avaliativo, embora ele não possua autorização expressa da Umanni; a limitação deve permanecer visível.
- O site principal vigente prevalece quando seus detalhes visuais divergem do blog editorial.
- A interface e os textos das pranchas são em inglês, conforme decisão geral do projeto; briefing, plano, relatórios e critérios permanecem em português.
- A estratégia funcional de avatar, importação e proteção do último administrador será resolvida em specs posteriores; esta spec define apenas seus estados visuais já confirmados.

## Fora do escopo

- Implementar React, Tailwind, Rails, componentes, rotas, banco ou comportamento.
- Criar ou redesenhar logo, ilustrações, modo escuro ou novas campanhas.
- Definir cabeçalhos de arquivos, duplicidade, atomicidade ou demais regras funcionais da importação.
- Resolver autenticação, papéis, exclusão do último administrador ou estratégia de armazenamento de avatar.
- Instalar indiscriminadamente plugins, contratar serviços, configurar runner, publicar a aplicação, fazer merge ou fechar PR.

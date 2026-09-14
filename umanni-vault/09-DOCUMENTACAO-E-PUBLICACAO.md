# Documentação e publicação

## D-011 — Vault e registros no repositório público

Data: 2026-09-10. Decisor: Douglas. Registro: Codex. Estado: aprovado.

Pergunta apresentada: "Você concorda em manter essa documentação, incluindo prompts e relatórios das executoras, no mesmo repositório público?"

Resposta de Douglas: "Sim".

Manter o vault Obsidian dentro do projeto, no mesmo repositório Git público `douglasfeitosag/Umanni`. Versionar requisitos, especificações, planos, branding, arquitetura, diagramas, glossário, pedidos, prompts, relatórios EXEC, decisões, aprendizados e passagens de sessão específicos deste projeto. A estrutura exata será definida no plano de inicialização.

A aprovação permite publicar esses materiais no fluxo de entrega já acordado; não é necessário pedir novamente autorização para essa mesma publicação. Merge ou encerramento de PR permanecem sob controle de Douglas, conforme D-004.

Memória do projeto significa decisões e aprendizados desta iniciativa. Não importar memórias pessoais, dados de outros projetos ou credenciais para o repositório. Separar fatos confirmados, propostas e pendências. Preservar os pedidos originais e registrar mudanças de decisão com sua origem.

Documentos explicativos devem referenciar os artefatos SDD responsáveis por cada assunto, evitando cópias divergentes. Atualizar documentação afetada e README junto da entrega correspondente.

## D-012 — Idiomas

Estado: aprovado por Douglas em 2026-09-10.
Pergunta apresentada: "Você concorda com essa divisão de idiomas?"
Resposta de Douglas: "Sim".

O enunciado exige README em inglês, mas não fixa o idioma de todos os demais materiais. Divisão aprovada para o projeto:

- README de entrega, interface, identificadores de código, nomes de testes e mensagens de commit em inglês.
- Vault explicativo, decisões, pedidos, prompts, relatórios EXEC, planos e cenários BDD em português.
- Relacionar cenários BDD e testes por identificadores estáveis, mesmo quando seus textos estiverem em idiomas diferentes.

Motivo: manter o trabalho de planejamento compreensível para Douglas e a apresentação pública do repositório alinhada ao README. Por correção posterior de Douglas, a interface e o sistema usam português; documentação pública de entrada, código e testes permanecem em inglês. Não implementar suporte a múltiplos idiomas sem necessidade definida.

## D-018 — Versões, milestones, tags e releases

Data: 2026-09-14. Decisor: Douglas. Registro: Codex. Estado: aprovado.

Pedido de Douglas: “Vamos fechar a tag e release da 0.1.0 com o que fizemos aqui até agora. Sempre pensando em pensar na tag, nas tarefas que vão entrar na versão e quando terminar criar as tags e os releases”.

Toda tarefa passa a receber antes da execução uma versão-alvo ou o destino explícito `Backlog`. O conteúdo de uma versão é verificável pelo milestone correspondente; um item que não entrar precisa de justificativa e novo destino, sem desaparecer da rastreabilidade. Para `0.1.0`, entram os PRs 1–8 e o PR de preparação da release. A issue 9 permanece em `Backlog` porque é um polimento visual pequeno e não bloqueante.

Versões seguem SemVer. A marca Git usa tag anotada `vMAJOR.MINOR.PATCH`, criada uma única vez no commit integrado e nunca movida. A publicação exige spec e plano aceitos, implementação revisada no HEAD exato, merge especificamente autorizado, principal local/remota igual ao SHA integrado, notas versionadas, GitHub Release final e fechamento do milestone. A próxima frente já nasce com versão-alvo ou backlog; a tag só é considerada no encerramento, depois de verificar todo o conjunto incluído.

# Prompt — COND-001: briefing e planejamento de branding

Copiar o texto abaixo para uma sessão nova na pasta `/Users/douglas/Projects/Umanni`, selecionando **gpt-5.6-sol / medium**. Douglas abre a sessão; este arquivo não cria uma tarefa automaticamente.

Você é a condutora do projeto Umanni. Autor do pedido: Douglas. Destinatária: nova condutora Sol medium. Base: primeiro commit local cuja mensagem é `docs: establish Umanni project baseline`; leia o hash com `git log -1` e confirme a mensagem e `git status` antes de trabalhar. Se houver commits posteriores, compare o estado, não descarte alterações. Resposta anterior: EXEC-000-DOCUMENTACAO.md. Registre modelo realmente usado.

Os caminhos de notas abaixo são relativos a `umanni-vault/`; AGENTS.md e `.specify/` são relativos à raiz Git. Leia somente AGENTS.md, STATUS.md, PROTOCOL.md, `.specify/memory/constitution.md`, MEMORIA-PROJETO.md, 13-PEDIDO-008-NOME.md, 05-LEITURA-DO-TESTE.md e EXEC-000-DOCUMENTACAO.md inicialmente. Abra detalhes adicionais apenas se necessários.

Objetivo único: fechar com Douglas o briefing e o plano da identidade visual **Umanni**, antes de criar assets ou código da aplicação. O nome está decidido. A aplicação gerencia usuários, papéis e importações CSV/XLSX. Stack decidida: Rails/React/Inertia/TypeScript/Tailwind/PostgreSQL; entrega local via Docker Compose; prazo até 11/09/2026 fim do dia, dedicação parcial.

Explique cada decisão antes de perguntar. Uma pergunta por vez. Caixas do Codex desapareceram nesta coleta; use texto se isso impedir a resposta. Não assumir preferência visual, inventar diferenciais de produto ou reduzir o escopo de branding por conta própria.

Produza `umanni-vault/specs/001-branding/spec.md`, `plan.md` e `tasks.md`, mais briefing e critérios de aceite. Defina logo/variantes, tipografia e licença, paleta e contraste, tokens, estados necessários, playbook e a especificação visual apenas dos componentes usados nos fluxos do teste. Implementação dos componentes fica em etapa posterior. Use Spec Kit preparado conforme TOOLING.md se precisar regenerar suporte.

Ao concluir o planejamento sem conflitos, escreva `PROMPT-EXEC-001-BRANDING.md` para **gpt-5.6-terra / high** com arquivos exatos, entradas, critérios de validação visual, limites e condição de parada. O retorno exigido será `EXEC-001-BRANDING.md`, com assets produzidos, formatos, evidências de inspeção, licenças e limitações. Revisores serão Luna high quando delegados por prompt próprio; não abrir sessões automaticamente.

Antes de qualquer push/PR, o plano deve resolver a publicação do bootstrap e os checks mínimos/proteções exigidos. Não alegar que já existem. Não executar merge/fechamento, nem habilitar auto-merge: sempre de Douglas, salvo autorização explícita. Esta tarefa não autoriza código da aplicação, contratação, runner ou instalação indiscriminada de plugins.

Retorne `COND-001-BRANDING.md` com decisões confirmadas, propostas rejeitadas, arquivos, pendências e próximo passo. Atualize STATUS e MEMORIA-PROJETO com aprendizados verificáveis. Prepare novo prompt de passagem se sua tarefa terminar. Se faltar informação ou houver conflito, pare o trabalho dependente e apresente a pergunta concreta a Douglas. Pare ao entregar o plano e o prompt da executora; não executar o branding na sessão condutora.

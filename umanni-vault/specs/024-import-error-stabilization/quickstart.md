# Guia de validação dos quatro patches

## Pré-requisitos

- Checkout da candidata `1.1.0` e Compose local funcional.
- Administrador de teste autenticado e pessoa regular autenticada.
- Porta local disponível conforme o perfil Compose utilizado; não reutilizar containers externos.

## Cenários manuais

1. Como admin, abra `/admin/user_imports` com histórico. Confirme que dica, botão e histórico não se sobrepõem em 1440×1024, 320 px e fonte 200%.
2. Sem selecionar arquivo, clique em “Enviar para importação”. Confirme mensagem “Selecione um arquivo CSV ou XLSX.”, foco no campo, nenhum carregamento da página segura e nenhuma nova linha no histórico.
3. Envie `POST /admin/user_imports` sem `user_import.source_file` com sessão admin. Confirme 422 Inertia e o mesmo erro, sem lote/job.
4. Provoque página segura a partir de uma rota administrativa, de `/profile` e de rota pública. Confirme, respectivamente, `/admin/dashboard`, `/profile` e `/sign-in`; com sessão válida, a rota de destino deve abrir a área correspondente.
5. Como regular, navegue para `/admin/user_imports` tanto por HTML quanto em navegação Inertia. Confirme 403 com página Umanni, sem página nativa do navegador e sem detalhes técnicos.

## Comandos por patch

Executar os testes focados indicados em `tasks.md`, depois os gates exigidos pelo patch no respectivo HEAD. Registrar apenas comandos realmente executados e resultados observados no EXEC do patch. Antes de qualquer integração, executar `git diff --check <base> HEAD` e a revisão independente exigida pela Constituição.

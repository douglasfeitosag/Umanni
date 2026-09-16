# Fechamento pós-merge — Release 0.3.0

Depois da integração do PR de preparação, capturar o SHA de `origin/main`, confirmar que a árvore contém as notas `0.3.0`, que o milestone não tem itens abertos e que tag/Release estão ausentes. Criar `v0.3.0` anotada no SHA capturado, verificar objeto e alvo local/remoto, publicar `Umanni 0.3.0` usando `umanni-vault/releases/0.3.0.md` com `--target <sha>`, conferir `targetCommitish`, fechar o milestone e publicar comentário `[CONDUTORA]` com toda a evidência. Não usar força, não mover tag e parar em qualquer divergência.

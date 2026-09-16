# PROMPT-COND-010 — transição serial da release 0.4.0

Você conduz somente a publicação pós-merge do preparo 020. Antes de qualquer escrita, capture `origin/main` e confirme que ele contém o merge do PR #28, que a árvore corresponde ao HEAD documental aceito, `foundation-checks` e `review-ledger` estão verdes, todas as threads foram resolvidas pela revisora e o milestone 0.4.0 não possui itens abertos.

Confirme também que `v0.4.0` e a GitHub Release estão ausentes. Se qualquer condição divergir ou `main` avançar, pare e entregue a Douglas os identificadores observados; não force, mova ou recrie tags.

Com a prontidão confirmada, crie a tag anotada `v0.4.0` no SHA integrado, envie somente essa ref, confira objeto e alvo remoto, crie a Release pública não-draft/não-prerelease usando `releases/0.4.0.md` no mesmo alvo e valide a URL/target. Só depois feche o milestone. Registre os fatos reais em reconciliação documental revisada, sem alterar a tag, Release, aplicação ou escopo.

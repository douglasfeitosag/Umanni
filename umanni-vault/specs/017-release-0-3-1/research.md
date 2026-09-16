# Pesquisa 017 — decisões de publicação

- `0.3.1` é patch: corrige regressões verificadas da entrega local sem acrescentar funcionalidade de negócio.
- A tag aponta para o merge da preparação documental, que contém os registros públicos e já está em `main`.
- A Release usa arquivo versionado em português; o changelog e README públicos permanecem em inglês.
- Os gates completos pertencem ao HEAD de implementação `6f92fba`; o PR documental valida escopo, coerência e estado remoto sem reapresentar seus resultados como nova execução da aplicação.
- Falha parcial nunca autoriza sobrescrever tag: corrigir somente a etapa que não ocorreu após recapturar o alvo.
- A reconciliação posterior preserva na tag o snapshot de pré-publicação e registra separadamente os fatos já verificados.

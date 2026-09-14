# Guia de validação

Executar após a produção de `branding/`; nenhuma aplicação é pressuposta.

1. **Escopo**: confirmar caminhos do plano e ausência de código de aplicação.
2. **Hashes/metadados**: executar `shasum -a 256`, `file` e `magick identify` nos assets; comparar com `branding/PROVENANCE.md`.
3. **Renderização**: renderizar SVGs de `branding/boards/` em diretório temporário e comparar dimensão/aparência aos PNGs versionados.
4. **Contraste**: recalcular os pares de `branding/tokens/tokens.json`; exigir 4,5:1 em texto normal e 3:1 em texto grande/componentes/foco. Confirmar que `#03A1E0` não recebe branco em texto comum e que o motivo consta no playbook.
5. **Visual**: inspecionar prancha e cinco composições em resolução original; preencher [visual-acceptance.md](checklists/visual-acceptance.md) e registrar correções em `branding/VALIDATION.md`.
6. **Licenças**: confirmar Montserrat, Roboto, Heroicons e aviso Umanni. Não declarar licença da marca.
7. **Git**: executar `git diff --check` e `git status --short --branch`; criar commit local coeso somente após sucesso; nenhum push/PR antes do gate do plano.

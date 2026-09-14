# Guia de validação

Executar após a produção de `branding/`; nenhuma aplicação é pressuposta.

1. **Escopo**: confirmar caminhos do plano e ausência de código de aplicação.
2. **Hashes/metadados**: executar `shasum -a 256`, `file` e `magick identify` nos assets; comparar com `branding/PROVENANCE.md`.
3. **Renderização**: renderizar SVGs de `branding/boards/` em diretório temporário e comparar dimensão/aparência aos PNGs versionados.
4. **Contraste**: recalcular os pares de `branding/tokens/tokens.json`; exigir 4,5:1 em texto normal e 3:1 em texto grande/componentes/foco. Confirmar que `#03A1E0` não recebe branco em texto comum e que o motivo consta no playbook.
5. **Visual**: inspecionar prancha e cinco composições nas dimensões da tabela normativa de [plan.md](plan.md), incluindo os artboards 1440×1024 e 390×844 do login; preencher [visual-acceptance.md](checklists/visual-acceptance.md) e registrar correções em `branding/VALIDATION.md`.
6. **Licenças e aviso**: confirmar Montserrat, Roboto, Heroicons e o aviso canônico Umanni; verificar referência em todos os documentos materiais e aviso resumido em cada prancha, sem modificar assets oficiais. Não declarar licença da marca.
7. **Git**: executar `git add --intent-to-add branding/ EXEC-001-BRANDING.md`, `git diff --check`, revisar o escopo, adicionar integralmente e executar `git diff --cached --check` e `git status --short --branch`; registrar os resultados antes do commit. Push/PR seguem a governança; merge e fechamento continuam reservados a Douglas.

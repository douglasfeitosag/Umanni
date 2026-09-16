# Checklist 019 — Importação de usuários

- [x] 0.4.0 e milestone #7 estão explícitos; Backlog não foi absorvido.
- [x] CSV e XLSX possuem contrato canônico, limites e pré-validação.
- [x] D-019/D-020/D-025/D-026/D-028/D-029 foram preservadas.
- [x] Solid Queue e Roo foram comparados/fixados sem instalação nesta branch.
- [x] Enqueue após commit, worker separado e restart têm critérios verificáveis.
- [x] Estados, contadores, resultados por linha e idempotência possuem invariantes.
- [x] Duplicidade no arquivo, no banco e concorrente tem resultado definido.
- [x] Progresso persistido é fonte da verdade; Cable apenas invalida.
- [x] Autorização cobre rotas, IDs, props e streams.
- [x] Conta importada sem senha possui caminho local mínimo de ativação sem e-mail.
- [x] Relatório/props/eventos/logs excluem conteúdo bruto e segredos.
- [x] BDD, TDD, segurança, acessibilidade, cobertura e Compose estão rastreados.
- [x] Allowlist, exclusões, sucesso e parada estão explícitos.
- [ ] PR documental possui milestone/label/responsável corretos.
- [ ] Revisão independente aceita o HEAD exato com ledger verde e zero threads abertas.

# Checklist de aceite visual 001

Cada item exige evidência em `branding/VALIDATION.md`.

## Marca e procedência

- [ ] Quatro arquivos oficiais possuem URL, data, status, tipo, dimensões e SHA-256.
- [ ] Assinatura e símbolo preservam proporção, desenho e azul.
- [ ] Nenhuma variante branca, preta, monocromática, vertical ou com slogan existe.
- [ ] O SVG oficial é descrito como contêiner de raster.
- [ ] O aviso canônico é referenciado por README, playbook, procedência, validação e EXEC; cada prancha mostra aviso resumido sem modificar assets oficiais.
- [ ] O favicon está identificado somente como empacotamento técnico byte a byte, fora da contagem de variantes e não usado como logo independente.

## Tipografia, cor e licenças

- [ ] Montserrat domina; Roboto aparece somente em ações/utilidades justificadas.
- [ ] Montserrat usa `Montserrat[wght].ttf`; Roboto usa `Roboto[wdth,wght].ttf` com `wdth=100`; nomes e hashes upstream/local idênticos, pesos 400–700, fallback e licenças estão registrados.
- [ ] `#03A1E0` permanece no logo/realces, e a restrição contra branco em texto comum é explicada.
- [ ] Texto comum alcança 4,5:1; texto grande, componentes e foco alcançam 3:1.
- [ ] Estados não dependem apenas de cor.
- [ ] Somente tema claro existe; tema escuro ausente por falta de evidência pública.

## Componentes e composições

- [ ] Todos os componentes/estados do contrato aparecem na prancha ou matriz.
- [ ] Toasts obedecem posição/persistência; indicadores ao vivo não geram toast.
- [ ] Diálogo explica e exige `EXCLUIR`; avatar usa iniciais/fallback genérico.
- [ ] Login mostra logo, frase separada e aviso não oficial.
- [ ] Painel mostra exatamente três indicadores, sem dados inventados.
- [ ] Usuários desktop usa tabela 1440×1024 e mobile usa cartões 390×844, ambos com `Create user`, `Edit` e `Delete`; papel muda somente dentro de `Edit`.
- [ ] Importação é tela única sem regra funcional inventada.
- [ ] Prancha e composições usam os viewports normativos do plano; o login contém os dois artboards declarados.
- [ ] Não há corte, sobreposição ou alvo inferior ao limite.

## Evidência e escopo

- [ ] SVGs renderizam para PNG nas dimensões declaradas.
- [ ] `branding/VALIDATION.md` registra métodos/resultados reais.
- [ ] `EXEC-001-BRANDING.md` declara modelo, arquivos, formatos, licenças e limitações.
- [ ] Arquivos novos passaram por `git diff --check` após `git add --intent-to-add` e por `git diff --cached --check` após staging integral.
- [ ] Nenhum código de aplicação, merge ou fechamento foi executado; eventual push/PR possui label, responsável e registro do HEAD.

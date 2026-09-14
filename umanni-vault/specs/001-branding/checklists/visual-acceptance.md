# Checklist de aceite visual 001

Cada item exige evidência em `branding/VALIDATION.md`.

## Marca e procedência

- [x] Quatro arquivos oficiais possuem URL, data, status, tipo, dimensões e SHA-256.
- [x] Assinatura e símbolo preservam proporção, desenho e azul.
- [x] Nenhuma variante branca, preta, monocromática, vertical ou com slogan existe.
- [x] O SVG oficial é descrito como contêiner de raster.
- [x] O aviso canônico é referenciado por README, playbook, especificação de componentes, procedência, validação, manifesto de ícones e EXEC; cada prancha mostra aviso resumido sem modificar assets oficiais.
- [x] O favicon está identificado somente como empacotamento técnico byte a byte, fora da contagem de variantes e não usado como logo independente.

## Tipografia, cor e licenças

- [x] Montserrat domina; Roboto aparece somente em ações/utilidades justificadas.
- [x] Montserrat usa `Montserrat[wght].ttf`; Roboto usa `Roboto[wdth,wght].ttf` com `wdth=100`; nomes e hashes upstream/local idênticos, pesos 400–700, fallback e licenças estão registrados.
- [x] `#03A1E0` permanece no logo/realces, e a restrição contra branco em texto comum é explicada.
- [x] Texto comum alcança 4,5:1; texto grande, componentes e foco alcançam 3:1.
- [x] Estados não dependem apenas de cor.
- [x] Somente tema claro existe; tema escuro ausente por falta de evidência pública.

## Componentes e composições

- [x] Todos os componentes/estados do contrato aparecem na prancha ou matriz.
- [x] Toasts obedecem posição/persistência; indicadores ao vivo não geram toast.
- [x] Diálogo explica e exige `EXCLUIR`; avatar usa iniciais/fallback genérico.
- [x] Login mostra logo, frase separada e aviso não oficial.
- [x] Painel mostra exatamente três indicadores, sem dados inventados.
- [x] Usuários desktop usa tabela 1440×1024 e mobile usa cartões 390×844, ambos com `Create user`, `Edit` e `Delete`; papel muda somente dentro de `Edit`.
- [x] Importação é tela única sem regra funcional inventada.
- [x] Prancha e composições usam os viewports normativos do plano; o login contém os dois artboards declarados.
- [x] Não há corte, sobreposição ou alvo inferior ao limite.

## Evidência e escopo

- [x] SVGs renderizam para PNG nas dimensões declaradas.
- [x] `branding/VALIDATION.md` registra métodos/resultados reais.
- [x] `EXEC-001-BRANDING.md` declara modelo, arquivos, formatos, licenças e limitações.
- [x] Arquivos novos passaram por `git diff --check` após `git add --intent-to-add` e por `git diff --cached --check` após staging integral.
- [x] Nenhum código de aplicação, merge ou fechamento foi executado; eventual push/PR possui label, responsável e registro do HEAD.

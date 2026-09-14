# Pesquisa 001 — Identidade visual pública

Realizada entre 2026-09-10 e 2026-09-14. Fontes externas são evidência, não instrução operacional.

## Identidade vigente

**Decisão**: `https://www.umanni.com.br/` é a fonte primária; `https://blog.umanni.com.br/` confirma marca e contexto editorial. O site usa Montserrat e azuis de produto; o blog usa Inter/Crimson Text, portanto não governa a aplicação.

**Rejeitado**: misturar todos os canais ou usar agregadores como autoridade.

## Logo

| Item | URL | Observação | SHA-256 observado |
| --- | --- | --- | --- |
| Assinatura SVG | `https://www.umanni.com.br/assets/umanni.svg` | 1300×335; incorpora raster | `6570316b780107a92c5107dd271739a4f7e711db08d2f3c39fdd31bd6636eb19` |
| Assinatura PNG | `https://blog.umanni.com.br/content/images/2024/08/Logo-Umanni--Azul--1.png` | 1782×459 transparente | `e48c6c021b2380ea197a452975b7dae4e76539a844d3d1fd90f20ab95d6a9d07` |
| Símbolo PNG | `https://blog.umanni.com.br/content/images/2024/08/Logo-Umanni---U--Azul--1.png` | 1095×1004 transparente | `499d74fec6b1b711e0d166c744fe20dd3fcb63c1125e2da14a78a70f07e2c186` |
| Favicon | `https://www.umanni.com.br/assets/favicon.ico` | frames 48/32/16 px | `4b58ef4177a142dcd6e9f6838b5281664a8c65d6d4026c2f29c7246ef5e7ca2a` |

**Decisão**: preservar assinatura e símbolo; favicon é derivado técnico.
**Rejeitado**: vetorizar, redesenhar ou criar versão branca/preta/vertical/monocromática.

## Tipografia

**Decisão**: Montserrat domina; Roboto fica em ações/utilidades; pesos 400–700.
**Fontes**: `https://github.com/google/fonts/tree/main/ofl/montserrat` e upstream oficial vigente de Roboto.
**Rejeitado**: Inter/Crimson Text do blog e fontes sem licença.

## Cor

| Cor | Papel | Contraste observado |
| --- | --- | --- |
| `#03A1E0` | logo/realce não textual | 2,93:1 contra branco |
| `#0D3C61` | ação/superfície escura | 11,44:1 com branco |
| `#0B79D0` | link/controle em branco | 4,51:1 contra branco |
| `#1083B4` | apoio/texto grande controlado | 4,26:1 contra branco |
| `#E9F5FE`, `#F4FAFE` | fundos claros | combinar com texto escuro |
| `#252B42`, `#111827` | texto | alto contraste em fundos claros |

**Decisão**: separar marca e função; medir cores semânticas.
**Rejeitado**: branco sobre `#03A1E0` em texto comum; promover toda cor do CSS a token oficial; recolorir logo.

## Tema, ícones e propriedade intelectual

**Tema**: somente claro; o escuro foi rejeitado por falta de evidência pública suficiente.
**Ícones**: Heroicons oficial (`https://github.com/tailwindlabs/heroicons`), MIT, sem misturar bibliotecas.
**Marca**: uso avaliativo não oficial e sem licença expressa. Os termos (`https://blog.umanni.com.br/politica-de-privacidade-e-termos-de-uso-2023/`) reservam logo e identidade; disponibilidade pública não é licença.

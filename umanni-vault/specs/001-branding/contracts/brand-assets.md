# Contrato de assets e licenças

## Arquivos obrigatórios

| Saída | Origem/regra |
| --- | --- |
| `branding/assets/logo/umanni-horizontal.svg` | site oficial; preservar bytes e registrar raster incorporado |
| `branding/assets/logo/umanni-horizontal.png` | blog oficial; preservar PNG transparente |
| `branding/assets/logo/umanni-symbol.png` | blog oficial; preservar PNG transparente |
| `branding/assets/logo/favicon.ico` | site oficial; cópia byte a byte dos frames 48/32/16; artefato técnico fora da contagem de variantes e proibido como fonte de novo desenho |
| `branding/assets/fonts/montserrat-variable.ttf` | cópia byte a byte de `ofl/montserrat/Montserrat[wght].ttf`; usar eixo `wght` somente em 400–700 |
| `branding/assets/fonts/roboto-variable.ttf` | cópia byte a byte de `ofl/roboto/Roboto[wdth,wght].ttf`; fixar `wdth=100` e usar `wght` somente em 400–700 |
| `branding/assets/icons/heroicons-manifest.md` | listar somente nomes/estilos usados nas pranchas |
| `branding/LICENSES/Montserrat-OFL-1.1.txt` | licença integral correspondente |
| `branding/LICENSES/Roboto-LICENSE.txt` | licença integral correspondente |
| `branding/LICENSES/Heroicons-MIT.txt` | licença integral correspondente |
| `branding/LICENSES/UMANNI-NOTICE.md` | marca, uso avaliativo, não oficial e sem autorização expressa |

## Permitido

- Copiar byte a byte de URL/upstream oficial.
- Renomear localmente a cópia byte a byte das fontes, desde que `PROVENANCE.md` registre caminho, nome original, nome local, eixos, hash upstream e hash local idênticos.
- Renderizar para inspeção sem substituir a fonte.
- Redimensionar raster proporcionalmente e preservar transparência se houver necessidade registrada.

## Proibido

- Vetorizar/redesenhar, recolorir, distorcer, girar ou aplicar efeitos.
- Criar variante branca, preta, vertical, monocromática ou com slogan.
- Renomear fonte modificada como upstream.
- Copiar a biblioteca completa de ícones.

`branding/PROVENANCE.md` registra URL, data, status HTTP, tipo, tamanho, dimensões, SHA-256, transformação, licença/termos e limitação por arquivo.

O favicon não é uma terceira variante de marca. Ele é preservado apenas para comparação técnica e não pode substituir a assinatura ou o símbolo nas pranchas.

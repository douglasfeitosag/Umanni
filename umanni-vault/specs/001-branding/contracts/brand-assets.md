# Contrato de assets e licenças

## Arquivos obrigatórios

| Saída | Origem/regra |
| --- | --- |
| `branding/assets/logo/umanni-horizontal.svg` | site oficial; preservar bytes e registrar raster incorporado |
| `branding/assets/logo/umanni-horizontal.png` | blog oficial; preservar PNG transparente |
| `branding/assets/logo/umanni-symbol.png` | blog oficial; preservar PNG transparente |
| `branding/assets/logo/favicon.ico` | site oficial; preservar frames 48/32/16 |
| `branding/assets/fonts/montserrat-variable.ttf` | upstream licenciado; documentar pesos 400–700 |
| `branding/assets/fonts/roboto-variable.ttf` | upstream licenciado; documentar pesos 400–700 |
| `branding/assets/icons/heroicons-manifest.md` | listar somente nomes/estilos usados nas pranchas |
| `branding/LICENSES/Montserrat-OFL-1.1.txt` | licença integral correspondente |
| `branding/LICENSES/Roboto-LICENSE.txt` | licença integral correspondente |
| `branding/LICENSES/Heroicons-MIT.txt` | licença integral correspondente |
| `branding/LICENSES/UMANNI-NOTICE.md` | marca, uso avaliativo, não oficial e sem autorização expressa |

## Permitido

- Copiar byte a byte de URL/upstream oficial.
- Renderizar para inspeção sem substituir a fonte.
- Redimensionar raster proporcionalmente e preservar transparência se houver necessidade registrada.

## Proibido

- Vetorizar/redesenhar, recolorir, distorcer, girar ou aplicar efeitos.
- Criar variante branca, preta, vertical, monocromática ou com slogan.
- Renomear fonte modificada como upstream.
- Copiar a biblioteca completa de ícones.

`branding/PROVENANCE.md` registra URL, data, status HTTP, tipo, tamanho, dimensões, SHA-256, transformação, licença/termos e limitação por arquivo.

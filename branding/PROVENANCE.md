# Artifact provenance

Access date: 2026-09-14. Unofficial evaluation use: [canonical notice](LICENSES/UMANNI-NOTICE.md). Public sources are evidence; availability does not grant a trademark license.

## Sources and method

`observed`: verifiable public evidence; `decided`: an explicit decision in briefing 001; `adapted`: design produced for this delivery to support use and accessibility, without claiming to be an official standard.

Files were collected with `curl -L --fail --silent --show-error -D <headers> -o <file> -w '%{http_code} %{content_type} %{size_download} %{url_effective}'`. SHA-256 was calculated with `shasum -a 256`. Initial downloads were preserved in a temporary directory before creating derivatives; local filenames do not change file bytes.

## Brand assets

| ID / local file | Official URL | HTTP / type / bytes | Dimensions | SHA-256 |
| --- | --- | --- | --- | --- |
| L1 `assets/logo/umanni-horizontal.svg` | https://www.umanni.com.br/assets/umanni.svg | 200 / image/svg+xml / 14682 | viewBox 1300×335; embedded raster 1081×275 | `6570316b780107a92c5107dd271739a4f7e711db08d2f3c39fdd31bd6636eb19` |
| L2 `assets/logo/umanni-horizontal.png` | https://blog.umanni.com.br/content/images/2024/08/Logo-Umanni--Azul--1.png | 200 / image/png / 17877 | 1782×459; sRGB; alpha | `e48c6c021b2380ea197a452975b7dae4e76539a844d3d1fd90f20ab95d6a9d07` |
| L3 `assets/logo/umanni-symbol.png` | https://blog.umanni.com.br/content/images/2024/08/Logo-Umanni---U--Azul--1.png | 200 / image/png / 26635 | 1095×1004; sRGB; alpha | `499d74fec6b1b711e0d166c744fe20dd3fcb63c1125e2da14a78a70f07e2c186` |
| L4 `assets/logo/favicon.ico` | https://www.umanni.com.br/assets/favicon.ico | 200 / image/vnd.microsoft.icon / 15086 | 48×48, 32×32, 16×16; sRGB | `4b58ef4177a142dcd6e9f6838b5281664a8c65d6d4026c2f29c7246ef5e7ca2a` |

All hashes match those observed in `umanni-vault/specs/001-branding/research.md`. Transformations applied to the delivered files: none. L1 is an SVG container for raster artwork, not a vector wordmark. L1/L2 represent the same horizontal variant; L3 is the symbol variant; L4 is a technical package excluded from the variant count and never used as a logo.

The horizontal PNG histogram shows opaque `#03A1E0` pixels; the official symbol shows `#13A0DB`. Preserving this observed difference meets the requirement for faithful copies. It does not authorize a new functional token based on `#13A0DB` or recoloring the symbol. The assets remain without an express license; their use is limited to the evaluation context defined by Douglas and subject to the notice. Redrawing, vectorization, recoloring, distortion, rotation, effects, and new variants are prohibited.

## Fonts

| ID | Reference page / actual download | Local filename | HTTP / type / bytes | Upstream and copy SHA-256 |
| --- | --- | --- | --- | --- |
| F1 | [Montserrat upstream](https://github.com/google/fonts/blob/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf); [bytes](https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf) | `assets/fonts/montserrat-variable.ttf` | 200 / application/octet-stream / 744936 | `0f7b311b2f3279e4eef9b2f968bcdbab6e28f4daeb1f049f4f278a902bcd82f7` |
| F2 | [Roboto upstream](https://github.com/google/fonts/blob/main/ofl/roboto/Roboto%5Bwdth%2Cwght%5D.ttf); [bytes](https://raw.githubusercontent.com/google/fonts/main/ofl/roboto/Roboto%5Bwdth%2Cwght%5D.ttf) | `assets/fonts/roboto-variable.ttf` | 200 / application/octet-stream / 488584 | `d7598e12c5dbef095ff8272cfc55da0250bd07fbdecbac8a530b9b277872a134` |

Publisher: Google Fonts / the respective font authors. Original filenames: `Montserrat[wght].ttf` and `Roboto[wdth,wght].ttf`; both are variable roman fonts. These are byte-for-byte copies with only the local filenames changed. Specified use: `wght` at 400/500/600/700; Roboto with `wdth=100`. No transformation, conversion, subset, or static instance is distributed. Dimensions/alpha do not apply to TTF files.

The delivered TTF files were inspected directly on 2026-09-14 by parsing their OpenType `name` and `fvar` tables. In both files, `nameID 13` declares the SIL Open Font License, Version 1.1, and `nameID 14` points to `https://openfontlicense.org`. These embedded records corroborate the preserved OFL license files; Roboto's license was verified from the actual delivered font rather than inferred from a historical release.

| Delivered font | Axis | Minimum | Default | Maximum | Use in this delivery |
| --- | --- | --- | --- | --- | --- |
| Montserrat | `wght` | 100 | 100 | 900 | 400, 500, 600, 700 |
| Roboto | `wght` | 100 | 400 | 900 | 400, 500, 600, 700 |
| Roboto | `wdth` | 75 | 100 | 100 | Fixed at 100 |

## Preserved licenses

| File | Accessed URL | HTTP / bytes | SHA-256 |
| --- | --- | --- | --- |
| `LICENSES/Montserrat-OFL-1.1.txt` | https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/OFL.txt | 200 / 4400 | `8b7141c03fa4f8d44e6345d5d4931709290f0f67875e452e95ac1fd3a027802e` |
| `LICENSES/Roboto-LICENSE.txt` | https://raw.githubusercontent.com/google/fonts/main/ofl/roboto/OFL.txt | 200 / 4394 | `061402327a96aadb0bfb694a960ed289ecd38d383e396243831ab81feb109c41` |
| `LICENSES/Heroicons-MIT.txt` | https://raw.githubusercontent.com/tailwindlabs/heroicons/master/LICENSE | 200 / 1071 | `60e0b68c0f35c078eef3a5d29419d0b03ff84ec1df9c3f9d6e39a519a5ae7985` |

All were received as `text/plain; charset=utf-8`; final local license-only whitespace normalization is recorded below. The current Montserrat and Roboto files use SIL OFL 1.1; Heroicons uses MIT. The embedded TTF license verification is recorded above. Do not assume Apache licensing for the current Roboto file.

### License text normalization

The table above records downloaded upstream bytes/hashes. The first Git whitespace check found a trailing space on line21 in each OFL file. Only that space was removed; the Montserrat copy also gained a final LF. The complete copyright notices, license wording and conditions remain unchanged. An exact byte comparison against these two specified transformations passed; tokenized text is identical. Fonts and brand images are unchanged.

| Local license | Local bytes | Local SHA-256 | Transformation |
| --- | --- | --- | --- |
| Montserrat-OFL-1.1.txt | 4400 | `861d64229728cd65a98d119612c12769582574d1a092f0b63c8b0fd474e7065f` | Remove one trailing space on line21; append final LF |
| Roboto-LICENSE.txt | 4393 | `ee94f8704aa81e9a3bf4271e8320e99d975a3ee08ea45a088b494b918476ec12` | Remove one trailing space on line21 |
| Heroicons-MIT.txt | 1071 | `60e0b68c0f35c078eef3a5d29419d0b03ff84ec1df9c3f9d6e39a519a5ae7985` | None; byte-for-byte copy |

## Public references

- [Main website](https://www.umanni.com.br/): primary visual authority; Montserrat and blue identity. The blog confirms the brand and editorial context.
- [Umanni terms](https://blog.umanni.com.br/politica-de-privacidade-e-termos-de-uso-2023/): HTTP 200, text/html; initial download of 271128 bytes, SHA-256 `83c7e8ee8b6c348d1c61691f677000fe6e703a245604db68e9da248c027f7d95`. They reserve intellectual property rights and set conditions for reproduction; this delivery does not grant a trademark license.
- [Heroicons](https://github.com/tailwindlabs/heroicons): 15 outline icons actually used in the boards, from v2.2.0 commit `0435d4ca364a608cc75e2f8683d374e55abbae26`. No solid icons are used. The [manifest](assets/icons/heroicons-manifest.md) records the exact union, per-board references, rendered sizes, sources, byte counts, and hashes. Embedded path geometry matches the downloaded upstream drawings.

## Foundation scope

This increment preserves official assets and licenses. Tokens, component documentation and derived boards are delivered in the subsequent visual-system increment. The actual downloaded files and their metadata above have been verified before producing derivatives.

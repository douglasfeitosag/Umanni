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

## Decisions and derivatives

Functional palette, typographic roles, shell, states, and viewports follow briefing/spec/contracts 001 and Douglas's subsequent explicit instruction: documentation in English, website/system interface in Portuguese. Layout recommendations and functional tokens are `adapted` where they are not public observations.

The institutional phrase `Desenvolvendo o potencial das pessoas` is `observed` public brand copy, retained only in authentication and kept separate from the logo. The additional authentication text `Pessoas no centro. Um espaço para cuidar da sua equipe.` is original `adapted` interface copy for this evaluation; it is not represented as an official Umanni slogan or campaign. All people and organizational counts on the boards are fictional.

Six editable static SVG boards and six corresponding PNG renders exist. Their dimensions and SHA-256 values below were read from the delivered files on 2026-09-14, after the mobile header changed to the preserved symbol at 44 px wide. These are evaluation compositions, not new logo variants or executable application components. The horizontal PNG and symbol PNG are embedded without changing their bytes and displayed at proportional sizes. Icons preserve upstream path geometry in local SVG symbols. Typography, layout, interface copy, and state examples are composed for this delivery. PNG output rasterizes each SVG at its declared dimensions; source assets and distributed TTF files remain unchanged.

Rendering uses `rsvg-convert` 2.60 with `PANGOCAIRO_BACKEND=fc` and `FONTCONFIG_FILE=/tmp/umanni-branding-sources.qQUkCB/fontconfig.xml`. That fontconfig file adds the delivered `branding/assets/fonts` directory; `fc-match` resolved Montserrat and Roboto to the local `montserrat-variable.ttf` and `roboto-variable.ttf` files. The explicit Fontconfig backend replaces the default CoreText backend that ignored this font configuration. No modified or subset font is redistributed. The temporary font configuration is an execution aid, not an upstream asset or required public delivery file.

| Derived file under `boards/` | Dimensions (px) | Bytes | SHA-256 |
| --- | --- | --- | --- |
| `components.svg` | 1440×1024 | 99814 | `ebbfaf77e6e9a6144e2af8a8ab41379c0c6fb81d3bb78d52861241385a138a34` |
| `components.png` | 1440×1024 | 189306 | `ffcb4a83a6e3ed20537ec2d0f625c21b584cbbebc91f38421d281bfc110717b7` |
| `dashboard-desktop.svg` | 1440×1024 | 30619 | `b55e90af131a8fa132375a8a12385acc2929c7180dd2bc1d295411254be41e2a` |
| `dashboard-desktop.png` | 1440×1024 | 70481 | `1c9ff5f6fa2d8dcc170449df8e86fa885c9968fa6bd8b759811ad6e17e44b786` |
| `import-desktop.svg` | 1440×1024 | 33812 | `39da73d7e9c3d073f2c43289cbe581e5689db618ce927a97fea955a79523c959` |
| `import-desktop.png` | 1440×1024 | 135637 | `dc05f877444953f74025db0be2380e4dec5208af96fafc3243a347c17a329b60` |
| `login-responsive.svg` | 1878×1024 | 53190 | `464654f0990b9da211584c3eea1543d3eaef6b46c0dad686caf17484a19509d5` |
| `login-responsive.png` | 1878×1024 | 106230 | `e5cf0e179c95203c63df5bf3baf0bef2327e28eb5b07aeb8b2468a03d3518350` |
| `users-desktop.svg` | 1440×1024 | 38033 | `7ba288aea1446a4090a698b0e3ee80b92b7b5ec5e0818c8e595c9cd359679822` |
| `users-desktop.png` | 1440×1024 | 143593 | `21fdfff31b130276c3901825491b6636e99bf68e40b3c99a7ac9b08100bf5b17` |
| `users-mobile.svg` | 390×844 | 45355 | `86b3e10c6d8b3a359b8cc029247a8efd2a9fa3b06911eecdce5ece157309955e` |
| `users-mobile.png` | 390×844 | 64816 | `25e4fd4828924ec3e6b9d524016c43d878201e40f8d4cd39c476ce75f66d1c23` |

The login canvas contains separate 1440×1024 and 390×844 artboards with a 48 px gap. All boards display the Portuguese evaluation notice and canonical notice path. Visual inspection, contrast measurements, and final acceptance evidence are documented in [VALIDATION](VALIDATION.md); hashes establish file identity, not usability or accessibility by themselves.

This document's English wording and the font metadata verification were prepared as technical writing by a provenance-focused persona. They do not constitute formal independent review or acceptance.

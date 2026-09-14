# Heroicons used in the static boards

[Canonical Umanni notice](../../LICENSES/UMANNI-NOTICE.md). Icons have the separate [MIT license](../../LICENSES/Heroicons-MIT.txt).

Source: official tailwindlabs/heroicons, release v2.2.0, commit `0435d4ca364a608cc75e2f8683d374e55abbae26`, accessed 2026-09-14. Every download below returned HTTP 200. Only artwork used in the boards is embedded; the full library is not copied. All 15 icons use optimized 24/outline, native viewBox `0 0 24 24`, and 1.5 unit stroke. No solid icons are used.

Transformation: preserve upstream path geometry inside an SVG symbol; replace the outer SVG wrapper with symbol/viewBox for static reuse. The dimensions below were measured from the actual `use` elements and their `href` references in the six SVG boards. All instances use square, proportional dimensions; currentColor receives the relevant functional color. Local embedding is not a byte-preserved standalone file: hashes identify the downloaded upstream SVGs. PNG renders rasterize the same drawings. Interactive use requires a visible label or explicit Portuguese accessible name in future implementation.

| Upstream name | Style | Rendered sizes (px) | HTTP / bytes | Upstream SHA-256 | Source |
| --- | --- | --- | --- | --- | --- |
| arrow-path | 24/outline | 20, 24 | 200 / 386 | `b191971e5cd0347fb23ea91c87e7468b2a3759613d3dd928fdd326004a5542ae` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/arrow-path.svg) |
| arrow-up-tray | 24/outline | 20, 22 | 200 / 325 | `db18c4af25690e8c6fbd510786b897ede74af0b21142b7f52e24eb44190518cc` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/arrow-up-tray.svg) |
| bars-3 | 24/outline | 24 | 200 / 263 | `0e76cceaeef6685444adf1ccb47d743d791d30e19181289ce19d3fb5e5c7ed74` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/bars-3.svg) |
| check-circle | 24/outline | 24 | 200 / 281 | `720aa6154ca2d170226559dd33c6125e5492f4d70d034e6426018d27359362ac` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/check-circle.svg) |
| chevron-down | 24/outline | 20 | 200 / 245 | `2eacb6cecd8f1ab845a2a8417074b0dab9fd9612cdf56d76be45b82adb2933f5` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/chevron-down.svg) |
| document-arrow-up | 24/outline | 24, 32 | 200 / 503 | `0d4f8b5b8f0252e2f73fcf480e3a0f55accce764d197220d350f4410824af59e` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/document-arrow-up.svg) |
| exclamation-triangle | 24/outline | 16, 24 | 200 / 395 | `3952df551d6c3b81b236831a5457931d9df1d8e5d9112e8f5de01b5c61e3144d` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/exclamation-triangle.svg) |
| home | 24/outline | 22 | 200 / 453 | `bf22818e3638f217e824ff26c8ffaf2ef014803982ca7c430e6c3c20915b185a` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/home.svg) |
| information-circle | 24/outline | 24 | 200 / 371 | `622b5f527d68f6e55cc0556f6720754b16273a53b0aa7c4d6f387d9e27bab076` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/information-circle.svg) |
| pencil-square | 24/outline | 20 | 200 / 475 | `21da72fcd66af3e386d554259ff8517124d0a2270975ffa3a69b5aa926959d4c` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/pencil-square.svg) |
| plus | 24/outline | 20 | 200 / 241 | `f3bd7870b4ac4bcb2153705981bdd9663f185c4563af496998803e245aca0d54` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/plus.svg) |
| trash | 24/outline | 20 | 200 / 632 | `54ec722a29978d7f64a81d6222e071f88b42d80179216b3b5beccfa9e1ec2135` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/trash.svg) |
| user-circle | 24/outline | 24 | 200 / 418 | `e7b3b12455abf9c50021cd2fe1dd7de469d80f04c3eb011a142e0c126083ce95` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/user-circle.svg) |
| users | 24/outline | 22, 24 | 200 / 596 | `67b51394e0e7a70848ca8d8967d11fc90444c585c218d729c89c86cc175107ac` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/users.svg) |
| x-mark | 24/outline | 24 | 200 / 239 | `f44f8d4070a779c324f07a199122b4cc8686b5a8d9705727dc38d0cfd3bb27ec` | [SVG](https://raw.githubusercontent.com/tailwindlabs/heroicons/0435d4ca364a608cc75e2f8683d374e55abbae26/optimized/24/outline/x-mark.svg) |

## Board-to-icon mapping

| Board | Actually referenced icons |
| --- | --- |
| components | arrow-path, arrow-up-tray, check-circle, chevron-down, document-arrow-up, exclamation-triangle, information-circle, trash, users |
| dashboard-desktop | arrow-up-tray, home, information-circle, user-circle, users |
| import-desktop | arrow-path, arrow-up-tray, check-circle, document-arrow-up, exclamation-triangle, home, user-circle, users |
| login-responsive | None |
| users-desktop | arrow-up-tray, exclamation-triangle, home, pencil-square, plus, trash, user-circle, users |
| users-mobile | bars-3, check-circle, pencil-square, plus, trash, user-circle, x-mark |

The union of actual references contains exactly the 15 names listed above. Each embedded path and its attributes were compared with the corresponding downloaded upstream SVG on 2026-09-14; no geometry differences were found. This provenance check is not formal independent acceptance.

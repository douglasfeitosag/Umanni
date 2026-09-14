# Umanni visual identity

Unofficial evaluation project using preserved public Umanni assets. Read the [canonical brand notice](LICENSES/UMANNI-NOTICE.md): this delivery does not grant brand reuse rights.

## AI assistance

Prepared with Codex. The producing runtime identified itself as GPT-6-based after an explicit model switch; the exact preceding model identifier was not verified. Internal fidelity and usability personas assisted with inspection and documentation. They are not the formal independent reviewer. See the [execution report](../umanni-vault/EXEC-001-BRANDING.md) for model limits and review status.

## Start here

1. Read the [playbook](BRAND-PLAYBOOK.md) for brand use, accessible colors, typography, layout and motion requirements.
2. Use [framework-independent tokens](tokens/tokens.json) and the [component specification](COMPONENT-SPEC.md) to implement the approved visual states later.
3. Inspect the [components board](boards/components.png) and compositions below; SVG files retain editable text and embedded original artwork.
4. Check [provenance](PROVENANCE.md), [icon manifest](assets/icons/heroicons-manifest.md) and [validation evidence](VALIDATION.md) before treating an adaptation as an official rule.

## Static compositions

| Composition | PNG preview | Editable source | Dimensions |
| --- | --- | --- | --- |
| Component reference | [PNG](boards/components.png) | [SVG](boards/components.svg) | 1440×1024 |
| Responsive sign-in | [PNG](boards/login-responsive.png) | [SVG](boards/login-responsive.svg) | 1878×1024 canvas; 1440×1024 + 390×844 artboards |
| Dashboard | [PNG](boards/dashboard-desktop.png) | [SVG](boards/dashboard-desktop.svg) | 1440×1024 |
| Users and deletion state | [PNG](boards/users-desktop.png) | [SVG](boards/users-desktop.svg) | 1440×1024 |
| Import and result states | [PNG](boards/import-desktop.png) | [SVG](boards/import-desktop.svg) | 1440×1024 |
| Narrow users | [PNG](boards/users-mobile.png) | [SVG](boards/users-mobile.svg) | 390×844 |

The user and import boards include explicitly captioned alternative states for reference; they are not simultaneously active application states. All interface copy is Portuguese, following Douglas's correction on 2026-09-14. Public delivery documentation is English. Sample identities and numbers are fictional.

## Evidence vocabulary

- `observed`: verified public evidence, with source and date.
- `decided`: an explicit decision in the branding brief or a subsequent instruction from Douglas.
- `adapted`: a project recommendation, including accessibility adaptations; never an official Umanni standard.

The two permitted brand variants are the original blue horizontal signature and blue symbol. The byte-preserved favicon is a technical package, not a third logo. The signature uses #03A1E0; the public symbol uses #13A0DB. Both originals retain their own colors.

## Validation and use

All 38 declared allowed contrast pairs passed recalculation; all 208 text elements were checked for canvas/artboard bounds, text overlap and token recipes. Every PNG was inspected at original resolution and rerendered with zero changed pixels on the documented renderer. Font files and four brand files match their sources byte for byte. OFL license wording is complete; two whitespace-only normalizations and separate upstream/local hashes are documented.

For faithful SVG rendering use the supplied fonts and the Pango/fontconfig configuration in [VALIDATION](VALIDATION.md). A default renderer may substitute system fonts. PNGs are the validated visual reference.

## Remaining scope

This is a static identity/UI-kit delivery awaiting formal independent implementation review. It includes no application components or executable interactions. The broader requested navigable prototype remains to be specified, reviewed, implemented and tested in its own topic PR. Responsive behavior, keyboard interaction, live updates, import semantics and authorization cannot be proven by static images. Dark mode is absent because public information is insufficient to specify it faithfully.

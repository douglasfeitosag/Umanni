# Brand reference hub

A local Portuguese-language reference page for the preserved Umanni visual identity. Documentation links point to the canonical English files. This is a native HTML/CSS gallery, not an operational application prototype.

## Open locally

From the repository root, use the existing Python runtime:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory /Users/douglas/Projects/Umanni
```

Open http://127.0.0.1:8765/branding/hub/ in a browser. The server is bound to loopback only. Stop it with Ctrl+C when finished. No installation, build, external hosting or JavaScript is required.

The directory can also be opened through index.html, but the validated route is the local HTTP address. Relative links must remain next to the existing branding assets.

## Content and boundaries

Seven sections cover overview, original brand files, palette, typography, component board, five static compositions and documentation/licenses. All previews have links to the original-resolution PNG and editable SVG files. Narrow thumbnails are previews, not readability evidence for the source boards.

The supplied Montserrat/Roboto files load locally. JavaScript is disabled by the page content policy. Navigation uses native links and a native narrow-screen disclosure; scrolling is immediate, with no animations. Brand rights are not granted by public availability: see [the canonical notice](../LICENSES/UMANNI-NOTICE.md).

Color/type labels are checked snapshots of [canonical tokens](../tokens/tokens.json), not a replacement token authority. The literal button example in the color section is explicitly a visual sample, not a live action.

See [hub execution evidence](../../umanni-vault/EXEC-004-BRANDING-HUB.md) for the exact checks and internal persona assessment. Formal independent implementation review remains pending. No merge, production components, authentication or business logic is included.

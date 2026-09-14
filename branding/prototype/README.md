# Umanni navigable visual prototype

This directory contains a disposable, browser-only demonstration of the approved Umanni visual language. It is not the Rails application and does not provide authentication, persistence, uploads, background work, authorization or production business rules.

## Open locally

From the repository root, start a loopback-only static server:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open:

- `http://127.0.0.1:8765/branding/prototype/` for the demonstration;
- `http://127.0.0.1:8765/branding/prototype/tests/runner.html` for the native-browser journey runner;
- `http://127.0.0.1:8765/branding/hub/` for the separate static visual archive.

No package installation or build step is required. Opening `index.html` directly with a `file:` URL is unsupported because the browser must load ES modules through HTTP.

## Demonstrated routes

| Route | Persona | Demonstrated states |
| --- | --- | --- |
| `#/login` | Visitor | Fictional administrator or regular-user entry |
| `#/signup` | Visitor | Example draft, invalid fields, pending, illustrative failure and success |
| `#/dashboard` | Administrator | Counts derived from the disposable fixture |
| `#/users` | Administrator | Populated, loading, empty, illustrative error, recovery and deletion dialog |
| `#/users/new` | Administrator | Create example, validation, pending, failure and success |
| `#/users/:id/edit` | Administrator | Edit example, role change, missing target and recovery |
| `#/import` | Administrator | CSV/XLSX examples; selected, queued, processing, complete, partial and failed |
| `#/profile` | Both signed-in roles | Own fictional profile and account-deletion entry |
| `#/profile/edit` | Both signed-in roles | Own-profile validation, pending, failure and success |

Hash back/forward, sign-out, restart and reload are part of the demonstration. Reload and explicit restart always restore the same three fictional people. All names use the reserved `example.test` domain.

## State and rendering boundary

- `state.mjs` owns fixtures, route guards, validation, counts and deterministic operations. It has no DOM access.
- `views.mjs` escapes values and renders every declared route/state without mutation.
- `app.mjs` connects hash navigation, native events, focus, the native dialog and the 400 ms illustrative timer.
- `styles.css` applies the preserved light identity, responsive layouts, visible focus and reduced-motion behavior.
- `icons.svg` contains only the Heroicons paths already approved in the static boards.

The query parameters `text-scale=200` and `reduced-motion=true` are deterministic validation aids. They apply 200% root text and the same reduced-motion limits as the operating-system preference; they do not change product state.

## Validation

Run the complete core checks from the repository root:

```sh
node --test --test-concurrency=1 branding/prototype/tests/*.test.mjs
node --test --test-concurrency=2 --experimental-test-coverage --test-coverage-lines=90 --test-coverage-functions=90 --test-coverage-branches=90 --test-coverage-include='branding/prototype/state.mjs' --test-coverage-include='branding/prototype/views.mjs' branding/prototype/tests/*.test.mjs
node --check branding/prototype/app.mjs
```

The numeric denominator is deliberately limited to `state.mjs` and `views.mjs`. The real DOM adapter is validated by the native-browser runner and manual keyboard/visual checks; this is not application or whole-prototype coverage. See [VALIDATION.md](VALIDATION.md) for exact results, viewports, contrasts and screenshot hashes.

## Identity, licenses and limits

The prototype reuses the preserved original signature, symbol, favicon, Montserrat and Roboto files from `branding/assets/`. Heroicons remain MIT-licensed. The Umanni marks are public reference material used for this non-official evaluation; no trademark license or endorsement is claimed. See [PROVENANCE.md](../PROVENANCE.md), [the license directory](../LICENSES/) and [the Umanni notice](../LICENSES/UMANNI-NOTICE.md).

Only a light theme exists because the public evidence was insufficient to define a faithful dark theme. `#03A1E0` remains in original marks and decorative accents, but it is not paired with white for ordinary text: that pair measures only 2.93:1.

The prototype intentionally does not decide account activation, passwords, duplicate import policy, CSV/XLSX columns, avatar storage or last-administrator protection. Those remain production-specification decisions.

## AI usage

The implementation session was configured as Codex `gpt-5.6-sol` with medium reasoning. The pure state module and its tests were implemented in a delegated Codex `gpt-5.6-terra` high-reasoning context. Final independent reviewer identities and exact reviewed commits are recorded in the execution report and pull request; no unperformed reviewer is credited here.

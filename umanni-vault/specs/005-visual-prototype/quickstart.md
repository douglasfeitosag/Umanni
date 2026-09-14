# Prototype validation guide

Prerequisites: Node24.19+, Python3, browser with modules/native dialog. No npm installation. From repository root:

```sh
node --test --test-concurrency=1 branding/prototype/tests/*.test.mjs
node --test --test-concurrency=2 --experimental-test-coverage --test-coverage-lines=90 --test-coverage-functions=90 --test-coverage-branches=90 --test-coverage-include='branding/prototype/state.mjs' --test-coverage-include='branding/prototype/views.mjs' branding/prototype/tests/*.test.mjs
node --check branding/prototype/app.mjs
```

Expected: tests pass; both core modules inventoried; ≥90% in all three numeric metrics. Not whole-app/DOM/production coverage. Record actual RED/GREEN before/after each implementation increment.

Reuse correct-root loopback server if available, otherwise `python3 -m http.server 8765 --bind 127.0.0.1`. Open `http://127.0.0.1:8765/branding/prototype/` and `tests/runner.html`. Runner imports actual adapter into isolated same-origin iframe, executes native DOM events, displays named pass/fail results. No fake DOM or external dependency.

Repeat all [interaction matrix](contracts/interaction.md) observations in real browser at both target sizes. Also short window,200% text,reduced motion, real keyboard/back/reload. Capture the eight PNGs in plan, inspect every one at original resolution, verify magic bytes/dimensions/SHA256. Viewport dimensions differ from screenshot dimensions if browser capture says so; record separately. Scroll whole routes, not only first fold. Calculate text/semantic/control/focus contrast; no unavailable observation is a pass.

Compare originals/fonts/licenses/tokens to main: unchanged. Check console, resource failures/external requests, escaping/storage/file APIs, hub/notice links and exact allowlist. Before publication run intent-to-add on new allowed files then `git diff --check`, inspect/stage exact scope and `git diff --cached --check`. Publish final HEAD; both reviewers must accept, all findings resolved by owners, shared ledger successful. Verify main-current/metadata/required checks before scoped authorized merge; confirm integration and open prototype locally.

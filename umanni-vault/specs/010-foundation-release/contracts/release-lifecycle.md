# Contract: Foundation 0.2.0 Release Lifecycle

## Preparation Gate

1. Start from a clean local principal branch equal to the remote principal branch at the Foundation merge.
2. Verify PR #12 is merged; retain its reviewed head, merge revision and equal content-tree identifiers.
3. Verify `foundation-checks` and `review-ledger` succeeded on the reviewed implementation head, `code-reviewed` is present and all review threads are resolved.
4. Verify milestone 0.2.0 contains only decided work and that tag/release `v0.2.0` do not exist.
5. Create the release branch and planning artifacts without changing application/runtime/branding files.

## Planning Review Gate

1. Commit and publish spec, plan, research, data model, contract, quickstart, checklist and tasks.
2. Open a pull request to the principal branch with `documentation`, Douglas assigned and milestone 0.2.0.
3. Dispatch an independent Luna high reviewer in a fresh context against the exact head.
4. Findings are individual resolvable threads; only the reviewer resolves them and manages `review-ledger`/review labels.
5. Do not create release records until `review-ledger=success`, `spec-reviewed` and zero unresolved threads are confirmed on the current head.

## Release-Record Preparation

1. Create `umanni-vault/releases/0.2.0.md` from merged, observed evidence.
2. Add a dated English 0.2.0 changelog entry without altering 0.1.0 history.
3. Update STATUS, the Foundation T019 ledger state, the closure EXEC and `PROMPT-COND-007-FOUNDATION-CLOSURE.md` without claiming future publication.
4. Validate links, stale claims, exact identifiers, milestone contents, tag/release absence and documentation-only diff.
5. Commit/push the scoped records; dispatch a fresh independent final review on the new head.
6. Correct findings in their threads, revalidate and re-review every new head. Stop after exact-head acceptance and provide Douglas the merge handoff.

## Integration Gate

1. Douglas alone merges the accepted preparation pull request unless he explicitly authorizes that exact merge to another actor.
2. After merge, fetch/prune, switch to the principal branch and fast-forward only.
3. Capture the pull request merge revision and require exact equality with local HEAD and `origin/main`; require the reviewed preparation head to be its ancestor.
4. Recheck zero open milestone items, expected included items, issue #9 Backlog, tag/release absence and reviewed notes at the captured target.
5. Any unexpected principal advance or changed gate stops publication for explicit re-evaluation.

## Publication Gate

1. Create annotated tag `v0.2.0` with message `Release 0.2.0` on the captured preparation merge revision.
2. Verify locally that the object is a tag and peels to the captured revision.
3. Push only `refs/tags/v0.2.0`, without force, and verify the remote peeled target.
4. Create final `Umanni 0.2.0` from `umanni-vault/releases/0.2.0.md`; it is neither draft nor prerelease.
5. Verify tag, release target, local main and remote main all resolve to the captured revision.
6. Close milestone 0.2.0 and verify closed state with zero open items.
7. Publish a `[CONDUTORA]` final evidence comment in the preparation PR with merge SHA, tag object/target, release URL/state and milestone state.

## Failure Recovery

- Unexpected existing tag or release: stop; do not overwrite or reinterpret it.
- Tag created locally but not pushed: retain it only if its target is correct; diagnose push before release creation.
- Tag pushed but release creation failed: keep the immutable tag and retry only the final release with the same target/notes.
- Release published but milestone close failed: keep tag/release, repair only milestone state after re-verification.
- Incorrect target or lightweight/moved tag: stop and escalate; do not force a repair.
- New principal commit before tag creation: stop and review whether it belongs in 0.2.0; do not silently tag the new head.

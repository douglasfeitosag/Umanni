# Validation: Foundation 0.2.0 Release

Run from the repository root. These commands are divided at the human merge boundary.

## Planning and preparation

```sh
set -eu
test "$(git branch --show-current)" = "codex/010-foundation-release"
git diff --check
test "$(git rev-parse codex/010-foundation-release^{tree})" || exit 1

test "$(git rev-parse origin/main)" = "665da839ab2efdd08c94664f842d9d17fcf3023c"
test "$(git rev-parse origin/codex/009-foundation-app)" = "988282f8b9212e1f018cbbd327758d7d2aefce80"
test "$(git rev-parse origin/main^{tree})" = "$(git rev-parse origin/codex/009-foundation-app^{tree})"

test -z "$(git tag --list v0.2.0)"
if gh release view v0.2.0 --repo douglasfeitosag/Umanni >/dev/null 2>&1; then
  printf '%s\n' 'ERROR: v0.2.0 release already exists; stop.' >&2
  exit 1
fi

gh pr view 12 --repo douglasfeitosag/Umanni \
  --json state,headRefOid,mergeCommit,labels,assignees,milestone
gh pr checks 12 --repo douglasfeitosag/Umanni
gh api 'repos/douglasfeitosag/Umanni/milestones/3'
gh api 'repos/douglasfeitosag/Umanni/issues?milestone=3&state=all&per_page=100'
gh issue view 9 --repo douglasfeitosag/Umanni --json state,milestone
```

Expected: PR #12 merged with reviewed head `988282f`, merge `665da83`, equal trees, successful required checks, milestone 0.2.0 open with no undecided items, issue #9 in Backlog and no tag/release 0.2.0.

## Documentation scope

```sh
git diff --check origin/main...HEAD
git diff --name-only origin/main...HEAD

if git diff --name-only origin/main...HEAD | rg -v '^(CHANGELOG\.md|umanni-vault/(EXEC-010-FOUNDATION-RELEASE\.md|PROMPT-COND-007-FOUNDATION-CLOSURE\.md|STATUS\.md|releases/0\.2\.0\.md|specs/008-foundation-plan/tasks\.md|specs/010-foundation-release/))$'; then
  printf '%s\n' 'ERROR: non-release file entered the preparation diff; stop.' >&2
  exit 1
fi

test -f umanni-vault/releases/0.2.0.md
test -f umanni-vault/EXEC-010-FOUNDATION-RELEASE.md
test -f umanni-vault/PROMPT-COND-007-FOUNDATION-CLOSURE.md
rg -n '^## \[0\.2\.0\] - 2026-09-15$' CHANGELOG.md
rg -n 'v0\.2\.0|Umanni 0\.2\.0|PR #12|pull/12' \
  CHANGELOG.md umanni-vault/releases/0.2.0.md \
  umanni-vault/STATUS.md umanni-vault/EXEC-010-FOUNDATION-RELEASE.md \
  umanni-vault/PROMPT-COND-007-FOUNDATION-CLOSURE.md
```

Before handoff, verify the preparation PR has `documentation`, Douglas, milestone 0.2.0, `review-ledger=success`, final review label and zero unresolved reviewer threads on its exact head. A new commit requires another review. Do not tag, release or close the milestone before Douglas merges.

## Post-merge publication

```sh
set -eu
release_pr=$(gh pr list --repo douglasfeitosag/Umanni \
  --head codex/010-foundation-release --state all \
  --json number --jq '.[0].number')
test -n "$release_pr"
merge_sha=$(gh pr view "$release_pr" --repo douglasfeitosag/Umanni \
  --json state,mergeCommit --jq 'select(.state == "MERGED") | .mergeCommit.oid')
test -n "$merge_sha"

git fetch --prune origin
git switch main
git merge --ff-only origin/main
test "$(git rev-parse HEAD)" = "$merge_sha"
test "$(git rev-parse origin/main)" = "$merge_sha"

test -z "$(git tag --list v0.2.0)"
if gh release view v0.2.0 --repo douglasfeitosag/Umanni >/dev/null 2>&1; then
  printf '%s\n' 'ERROR: v0.2.0 release already exists; stop.' >&2
  exit 1
fi

git tag -a v0.2.0 "$merge_sha" -m "Release 0.2.0"
test "$(git cat-file -t v0.2.0)" = "tag"
test "$(git rev-list -n 1 v0.2.0)" = "$merge_sha"
git push origin refs/tags/v0.2.0

gh release create v0.2.0 --repo douglasfeitosag/Umanni --verify-tag \
  --title "Umanni 0.2.0" --notes-file umanni-vault/releases/0.2.0.md
gh api --method PATCH repos/douglasfeitosag/Umanni/milestones/3 -f state=closed
```

Never use force, auto-merge or administrative bypass.

## Final verification

```sh
test "$(git cat-file -t v0.2.0)" = "tag"
test "$(git rev-list -n 1 v0.2.0)" = "$(git rev-parse origin/main)"
gh release view v0.2.0 --repo douglasfeitosag/Umanni \
  --json name,tagName,isDraft,isPrerelease,targetCommitish,url,publishedAt
gh api repos/douglasfeitosag/Umanni/milestones/3
gh issue view 9 --repo douglasfeitosag/Umanni --json state,milestone
git status --short --branch
```

Expected: annotated `v0.2.0`, final `Umanni 0.2.0`, local main and origin/main on the preparation merge, milestone 0.2.0 closed with zero open items, issue #9 still in Backlog and a clean checkout.

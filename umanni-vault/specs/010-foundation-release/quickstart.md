# Validation: Foundation 0.2.0 Release

Run from the repository root. These commands are divided at the human merge boundary. Start each new shell, including the post-merge shell, by loading the fail-safe helpers below.

## Fail-safe helpers

These probes preserve `gh`/`git` stderr, require an interpretable result and distinguish a proven absence from an operational failure. Only an authenticated HTTP 404 proves that the GitHub Release is absent. For the remote tag, only exit 2 from a reachable `git ls-remote --exit-code` query with no returned ref proves absence.

```sh
require_release_absent() {
  release_auth_probe=
  if ! release_auth_probe=$(gh auth status --hostname github.com 2>&1); then
    printf '%s\n' 'ERROR: GitHub authentication could not be verified; stop.' >&2
    return 1
  fi

  release_probe_response=
  if release_probe_response=$(gh api --include \
    -H 'Accept: application/vnd.github+json' \
    repos/douglasfeitosag/Umanni/releases/tags/v0.2.0); then
    release_probe_rc=0
  else
    release_probe_rc=$?
  fi

  release_probe_status=$(printf '%s\n' "$release_probe_response" | \
    awk '/^HTTP\/[0-9.]+ [0-9][0-9][0-9]/ { status=$2 } END { print status }')
  release_probe_remaining=$(printf '%s\n' "$release_probe_response" | \
    awk -F ': *' 'tolower($1) == "x-ratelimit-remaining" {
      gsub("\\r", "", $2); remaining=$2
    } END { print remaining }')
  release_probe_body=$(printf '%s\n' "$release_probe_response" | \
    awk 'body { print } /^[[:space:]]*$/ { body=1 }')

  case "$release_probe_status" in
    404)
      if [ "$release_probe_rc" -eq 0 ] || \
        ! printf '%s\n' "$release_probe_body" | \
          jq -e '(.status | tostring) == "404"' >/dev/null; then
        printf '%s\n' 'ERROR: HTTP 404 response was internally inconsistent; stop.' >&2
        return 1
      fi
      printf '%s\n' 'GitHub Release v0.2.0 is proven absent by HTTP 404.'
      ;;
    200)
      if [ "$release_probe_rc" -ne 0 ] || \
        ! printf '%s\n' "$release_probe_body" | \
          jq -e '.tag_name == "v0.2.0"' >/dev/null; then
        printf '%s\n' 'ERROR: HTTP 200 release response was impossible to interpret; stop.' >&2
      else
        printf '%s\n' 'ERROR: GitHub Release v0.2.0 already exists; stop.' >&2
      fi
      return 1
      ;;
    401)
      printf '%s\n' 'ERROR: GitHub returned HTTP 401; authentication failed; stop.' >&2
      return 1
      ;;
    403)
      if [ "$release_probe_remaining" = "0" ]; then
        printf '%s\n' 'ERROR: GitHub returned HTTP 403 with no rate-limit capacity; stop.' >&2
      else
        printf '%s\n' 'ERROR: GitHub returned HTTP 403; authentication or authorization failed; stop.' >&2
      fi
      return 1
      ;;
    429)
      printf '%s\n' 'ERROR: GitHub returned HTTP 429; rate limited; stop.' >&2
      return 1
      ;;
    5??)
      printf '%s\n' "ERROR: GitHub returned server error HTTP $release_probe_status; stop." >&2
      return 1
      ;;
    '')
      printf '%s\n' 'ERROR: no HTTP response was available; network or client failure; stop.' >&2
      return 1
      ;;
    *)
      printf '%s\n' "ERROR: unexpected GitHub HTTP status $release_probe_status; stop." >&2
      return 1
      ;;
  esac
}

require_remote_tag_absent() {
  remote_tag_probe=
  if remote_tag_probe=$(git ls-remote --exit-code --tags origin \
    refs/tags/v0.2.0 'refs/tags/v0.2.0^{}'); then
    remote_tag_rc=0
  else
    remote_tag_rc=$?
  fi

  case "$remote_tag_rc" in
    2)
      if [ -n "$remote_tag_probe" ]; then
        printf '%s\n' 'ERROR: remote tag absence response was inconsistent; stop.' >&2
        return 1
      fi
      printf '%s\n' 'Remote tag v0.2.0 is proven absent.'
      ;;
    0)
      if [ -z "$remote_tag_probe" ]; then
        printf '%s\n' 'ERROR: remote tag query succeeded without an interpretable result; stop.' >&2
      else
        printf '%s\n' 'ERROR: remote tag v0.2.0 already exists; stop.' >&2
      fi
      return 1
      ;;
    *)
      printf '%s\n' "ERROR: remote tag query failed operationally (exit $remote_tag_rc); stop." >&2
      return 1
      ;;
  esac
}

require_remote_annotated_tag() {
  expected_tag_target=$1
  remote_tag_probe=
  if remote_tag_probe=$(git ls-remote --exit-code --tags origin \
    refs/tags/v0.2.0 'refs/tags/v0.2.0^{}'); then
    remote_tag_rc=0
  else
    remote_tag_rc=$?
  fi

  if [ "$remote_tag_rc" -ne 0 ] || [ -z "$remote_tag_probe" ]; then
    printf '%s\n' "ERROR: remote tag proof failed (exit $remote_tag_rc); stop." >&2
    return 1
  fi

  remote_tag_lines=$(printf '%s\n' "$remote_tag_probe" | awk 'NF { count++ } END { print count+0 }')
  remote_tag_object=$(printf '%s\n' "$remote_tag_probe" | \
    awk -F '\t' '$2 == "refs/tags/v0.2.0" { print $1 }')
  remote_tag_peeled=$(printf '%s\n' "$remote_tag_probe" | \
    awk -F '\t' '$2 == "refs/tags/v0.2.0^{}" { print $1 }')
  local_tag_object=$(git rev-parse refs/tags/v0.2.0)

  if [ "$remote_tag_lines" -ne 2 ] || \
    [ -z "$remote_tag_object" ] || [ -z "$remote_tag_peeled" ] || \
    [ "$remote_tag_object" = "$remote_tag_peeled" ] || \
    [ "$remote_tag_object" != "$local_tag_object" ] || \
    [ "$remote_tag_peeled" != "$expected_tag_target" ]; then
    printf '%s\n' 'ERROR: remote v0.2.0 is not the expected annotated tag or has the wrong peeled target; stop.' >&2
    return 1
  fi

  printf '%s\n' "Remote annotated tag v0.2.0 peels to $expected_tag_target."
}
```

## Planning and preparation

```sh
set -eu
command -v require_release_absent >/dev/null
command -v require_remote_tag_absent >/dev/null

test "$(git branch --show-current)" = "codex/010-foundation-release"
git diff --check
test "$(git rev-parse codex/010-foundation-release^{tree})" || exit 1

test "$(git rev-parse origin/main)" = "665da839ab2efdd08c94664f842d9d17fcf3023c"
test "$(git rev-parse origin/codex/009-foundation-app)" = "988282f8b9212e1f018cbbd327758d7d2aefce80"
test "$(git rev-parse origin/main^{tree})" = "$(git rev-parse origin/codex/009-foundation-app^{tree})"

test -z "$(git tag --list v0.2.0)"
require_remote_tag_absent
require_release_absent

gh pr view 12 --repo douglasfeitosag/Umanni \
  --json state,headRefOid,mergeCommit,labels,assignees,milestone
gh pr checks 12 --repo douglasfeitosag/Umanni
gh api 'repos/douglasfeitosag/Umanni/milestones/3'
gh api --paginate 'repos/douglasfeitosag/Umanni/issues?milestone=3&state=all&per_page=100'
gh issue view 9 --repo douglasfeitosag/Umanni --json state,milestone
```

Expected: PR #12 merged with reviewed head `988282f`, merge `665da83`, equal trees, successful required checks, milestone 0.2.0 open with no undecided items, issue #9 in Backlog and no local tag, remote tag or release 0.2.0.

## Documentation scope

```sh
git diff --check origin/main...HEAD
git diff --name-only origin/main...HEAD

if git diff --name-only origin/main...HEAD | rg -v '^(CHANGELOG\.md|umanni-vault/(EXEC-010-FOUNDATION-RELEASE\.md|PROMPT-COND-007-FOUNDATION-CLOSURE\.md|STATUS\.md|releases/0\.2\.0\.md|specs/008-foundation-plan/tasks\.md|specs/010-foundation-release/.*))$'; then
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

## Post-merge integration gate

Start a new shell, load the fail-safe helpers again, and then run this block. It identifies PR #13 directly, rather than selecting the first pull request returned for a branch.

```sh
set -eu
command -v require_release_absent >/dev/null
command -v require_remote_tag_absent >/dev/null
command -v require_remote_annotated_tag >/dev/null

release_pr=13
release_pr_json=$(gh pr view "$release_pr" --repo douglasfeitosag/Umanni \
  --json state,headRefOid,mergeCommit,labels,assignees,milestone)
printf '%s\n' "$release_pr_json" | jq -e '.state == "MERGED"' >/dev/null
reviewed_head=$(printf '%s\n' "$release_pr_json" | \
  jq -er '.headRefOid | select(type == "string" and length == 40)')
merge_sha=$(printf '%s\n' "$release_pr_json" | \
  jq -er '.mergeCommit.oid | select(type == "string" and length == 40)')

git fetch --prune origin
git switch main
git merge --ff-only origin/main
test "$(git rev-parse HEAD)" = "$merge_sha"
test "$(git rev-parse origin/main)" = "$merge_sha"

# Revalidate the exact reviewed head and every review/check gate before mutation.
test "$(printf '%s\n' "$release_pr_json" | jq -r '.mergeCommit.oid')" = "$merge_sha"
git merge-base --is-ancestor "$reviewed_head" "$merge_sha"

printf '%s\n' "$release_pr_json" | jq -e '
  (.labels | map(.name) | index("code-reviewed")) != null and
  (.labels | map(.name) | index("changes-requested")) == null and
  (.labels | map(.name) | index("review-pending")) == null and
  (.assignees | map(.login)) == ["douglasfeitosag"] and
  .milestone.number == 3 and .milestone.title == "0.2.0"
' >/dev/null

review_status_json=$(gh api \
  "repos/douglasfeitosag/Umanni/commits/$reviewed_head/status")
printf '%s\n' "$review_status_json" | jq -e --arg head "$reviewed_head" '
  .sha == $head and
  ([.statuses[] | select(.context == "review-ledger")][0].state == "success")
' >/dev/null

required_checks_json=$(gh api \
  repos/douglasfeitosag/Umanni/branches/main/protection/required_status_checks)
required_contexts=$(printf '%s\n' "$required_checks_json" | \
  jq -er '[.contexts[], .checks[].context] | unique | .[]')
test -n "$required_contexts"
saved_ifs=$IFS
IFS='
'
for required_context in $required_contexts; do
  required_state=$(printf '%s\n' "$review_status_json" | jq -r \
    --arg context "$required_context" \
    '[.statuses[] | select(.context == $context)][0].state // empty')
  if [ "$required_state" != "success" ]; then
    printf '%s\n' "ERROR: required check $required_context is not successful on $reviewed_head; stop." >&2
    exit 1
  fi
done
IFS=$saved_ifs

threads_json=$(gh api graphql \
  -F owner=douglasfeitosag -F name=Umanni -F number="$release_pr" \
  -f query='
    query($owner: String!, $name: String!, $number: Int!) {
      repository(owner: $owner, name: $name) {
        pullRequest(number: $number) {
          reviewThreads(first: 100) {
            pageInfo { hasNextPage }
            nodes { id isResolved }
          }
        }
      }
    }')
printf '%s\n' "$threads_json" | jq -e '
  .data.repository.pullRequest.reviewThreads.pageInfo.hasNextPage == false and
  all(.data.repository.pullRequest.reviewThreads.nodes[]; .isResolved == true)
' >/dev/null

milestone_json=$(gh api repos/douglasfeitosag/Umanni/milestones/3)
printf '%s\n' "$milestone_json" | jq -e \
  '.number == 3 and .title == "0.2.0" and .state == "open"' >/dev/null

milestone_items_json=$(gh api --paginate --slurp \
  'repos/douglasfeitosag/Umanni/issues?milestone=3&state=all&per_page=100')
printf '%s\n' "$milestone_items_json" | jq -e '
  flatten as $items |
  ($items | map(.number) | sort) == [11, 12, 13] and
  all($items[]; has("pull_request") and .state == "closed")
' >/dev/null
printf '%s\n' "$milestone_items_json" | jq -r '
  flatten[] | "milestone item #\(.number): \(.state) — \(.title)"
'

for expected_merged_pr in 11 12 13; do
  pr_state=$(gh pr view "$expected_merged_pr" --repo douglasfeitosag/Umanni \
    --json state --jq '.state')
  if [ "$pr_state" != "MERGED" ]; then
    printf '%s\n' "ERROR: PR #$expected_merged_pr is $pr_state, expected MERGED; stop." >&2
    exit 1
  fi
done

issue_9_json=$(gh issue view 9 --repo douglasfeitosag/Umanni \
  --json state,milestone)
printf '%s\n' "$issue_9_json" | jq -e \
  '.state == "OPEN" and .milestone.number == 2 and .milestone.title == "Backlog"' \
  >/dev/null

git cat-file -e "$merge_sha:umanni-vault/releases/0.2.0.md"
test -z "$(git tag --list v0.2.0)"
require_remote_tag_absent
require_release_absent

# Detect a principal-branch advance that occurred while the gates were queried.
remote_main_probe=$(git ls-remote --exit-code origin refs/heads/main)
test "$(printf '%s\n' "$remote_main_probe" | awk 'NF { count++ } END { print count+0 }')" -eq 1
test "$(printf '%s\n' "$remote_main_probe" | awk '{ print $1 }')" = "$merge_sha"
git fetch --prune origin
test "$(git rev-parse HEAD)" = "$merge_sha"
test "$(git rev-parse origin/main)" = "$merge_sha"
```

Any empty, paginated beyond the validated page, malformed or divergent result stops here, before `git tag`, `git push`, `gh release create` or milestone closure. The milestone item enumeration is authoritative for this gate; its aggregate `open_issues` counter is not used as proof.

## Publication

Run only after the complete post-merge integration gate above succeeds in the same shell.

```sh
git tag -a v0.2.0 "$merge_sha" -m "Release 0.2.0"
test "$(git cat-file -t v0.2.0)" = "tag"
test "$(git rev-parse refs/tags/v0.2.0)" != "$merge_sha"
test "$(git rev-list -n 1 v0.2.0)" = "$merge_sha"
git push origin refs/tags/v0.2.0

# Do not create a GitHub Release until the remote object and peeled target agree.
require_remote_annotated_tag "$merge_sha"
require_release_absent

gh release create v0.2.0 --repo douglasfeitosag/Umanni --verify-tag \
  --target "$merge_sha" --title "Umanni 0.2.0" \
  --notes-file umanni-vault/releases/0.2.0.md

published_release_json=$(gh release view v0.2.0 \
  --repo douglasfeitosag/Umanni \
  --json name,tagName,isDraft,isPrerelease,targetCommitish,url,publishedAt)
printf '%s\n' "$published_release_json" | jq -e --arg merge_sha "$merge_sha" '
  .name == "Umanni 0.2.0" and .tagName == "v0.2.0" and
  .isDraft == false and .isPrerelease == false and
  .targetCommitish == $merge_sha and
  (.url | type == "string" and length > 0) and
  (.publishedAt | type == "string" and length > 0)
' >/dev/null
require_remote_annotated_tag "$merge_sha"

gh api --method PATCH repos/douglasfeitosag/Umanni/milestones/3 -f state=closed
```

Never use force, auto-merge or administrative bypass.

## Final verification

The remote tag proof is deliberately repeated after publication.

```sh
test "$(git cat-file -t v0.2.0)" = "tag"
test "$(git rev-list -n 1 v0.2.0)" = "$merge_sha"
test "$(git rev-parse HEAD)" = "$merge_sha"
test "$(git rev-parse origin/main)" = "$merge_sha"
require_remote_annotated_tag "$merge_sha"

final_release_json=$(gh release view v0.2.0 --repo douglasfeitosag/Umanni \
  --json name,tagName,isDraft,isPrerelease,targetCommitish,url,publishedAt
)
printf '%s\n' "$final_release_json" | jq -e --arg merge_sha "$merge_sha" '
  .name == "Umanni 0.2.0" and .tagName == "v0.2.0" and
  .isDraft == false and .isPrerelease == false and
  .targetCommitish == $merge_sha and
  (.url | type == "string" and length > 0) and
  (.publishedAt | type == "string" and length > 0)
' >/dev/null
gh api repos/douglasfeitosag/Umanni/milestones/3
gh issue view 9 --repo douglasfeitosag/Umanni --json state,milestone
git status --short --branch
```

Expected: annotated `v0.2.0` locally and remotely, with remote peeled target equal to the preparation merge; final `Umanni 0.2.0`; local main and origin/main on that merge; milestone 0.2.0 closed with every included item closed; issue #9 still in Backlog; and a clean checkout.

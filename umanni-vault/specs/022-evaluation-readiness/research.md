# Research: Local Evaluation Readiness

## Decision: document one named Compose project consistently

**Decision**: Use `umanni-evaluation` in public evaluator commands, and retain the existing internal gate's generated temporary project names.

**Rationale**: A stable, explicitly named project lets an evaluator stop only the resources created for this repository. The delivery gate already creates and removes isolated names of its own.

**Alternatives considered**: Unnamed Compose commands obscure the shutdown target; global Docker cleanup can affect unrelated work.

## Decision: start delivery web and worker together

**Decision**: Build `web` and `worker`, then use one delivery `up -d --wait web worker` command.

**Rationale**: The existing worker consumes imports and shares persistent storage with web; starting only web does not satisfy the delivered local application behavior.

**Alternatives considered**: Web alone reproduces the defect, while a later optional worker step does not create a complete evaluator path.

## Decision: keep local secrets and interview preparation untracked

**Decision**: Document `cp .env.example .env` and local secret generation; keep `ENTREVISTA-UMANNI-PRIVADO.md` ignored only by the root checkout's `.git/info/exclude`.

**Rationale**: Configuration and interview notes can contain local context that must not enter a public repository. `.git/info/exclude` keeps protection local without changing shared ignore policy.

**Alternatives considered**: Adding the guide to `.gitignore` violates the objective; committing a placeholder guide defeats its requested private-only status.

## Decision: prove commands in an isolated checkout-equivalent

**Decision**: Execute the published command sequence from a temporary clean Git worktree and use its own `.env` and named Compose resources.

**Rationale**: This exercises the candidate's files without relying on author configuration or pre-existing containers.

**Alternatives considered**: Historical gates do not prove changed README instructions, and testing only the author checkout may conceal missing setup.

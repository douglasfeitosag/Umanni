# Quickstart Validation: Local Evaluation Readiness

Run this from a clean clone or an isolated Git worktree of the candidate commit.

1. Copy the public README commands to clone, select `v1.0.0`, create `.env`, and generate the local secret.
2. Run the delivery command and verify `docker compose --project-name umanni-evaluation --profile delivery ps` shows both `web` and `worker` running.
3. Run the `/up` and `/ready` curls and confirm each exits successfully.
4. Run the bootstrap command with fresh local-only values. Repeat it and confirm the existing administrator is unchanged without printing the password.
5. Run `bin/check` and `bin/check-delivery`, and record real command results in `EXEC-021-EVALUATION-READINESS.md`.
6. Follow the development transition, then normal shutdown. Confirm it uses only `umanni-evaluation` and no global cleanup command.

Stop if a step demands a product change outside approved documentation scope; record the command and ask Douglas for a scoped decision.

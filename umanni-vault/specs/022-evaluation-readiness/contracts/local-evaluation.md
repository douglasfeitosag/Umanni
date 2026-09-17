# Local Evaluation Command Contract

## Preconditions

- Docker Engine and Docker Compose are installed and usable by the evaluator.
- The evaluator works from a clone of the released `v1.0.0` tag.
- `.env` is private local configuration and is never committed.

## Delivery contract

1. Build and start `web` and `worker` in the `delivery` profile under project `umanni-evaluation`.
2. `/up` confirms that the application process is alive; it does not assert database availability or migration state.
3. `/ready` confirms the database connection and that migrations are current.
4. The worker stays running while imports are evaluated and shares the delivery storage volume with web.

## Administrator contract

The existing bootstrap task operates against the exact local database and confirmation phrase only. In the production delivery profile, it requires the explicit `UMANNI_BOOTSTRAP_LOCAL_DELIVERY=1` opt-in; without it, production bootstrap is rejected. It retains the local-host, exact-database, confirmation, password-validation, locking, no-password-output, and idempotence safeguards. The public guide supplies placeholders only; the evaluator supplies local secret values.

## Verification and shutdown contract

- `bin/check` and `bin/check-delivery` are manually run local gates, not CI or a hosted runner.
- Normal shutdown addresses only `umanni-evaluation`; it never invokes a global Docker cleanup.
- Validation on Linux arm64 does not assert that amd64 has been validated.

# Data Model: Local Evaluation Readiness

No application data model, migration, or persisted product entity changes are part of 1.0.0.

| Artifact | Ownership | Persistence | Rule |
| --- | --- | --- | --- |
| `.env` | evaluator | local checkout | contains a locally generated secret; never commit |
| `ENTREVISTA-UMANNI-PRIVADO.md` | evaluator | local checkout | ignored only by `.git/info/exclude`; never add to Git |
| Docker Compose volumes | named evaluation project | local Docker | retained by normal shutdown; remove deliberately only when discarding local data |

# Contract: Application credentials and runtime environment

| Concern | Public/versioned | Private/runtime | Required behavior |
| --- | --- | --- | --- |
| Application signing secret | Encrypted `config/credentials.yml.enc` containing `secret_key_base` | `RAILS_MASTER_KEY` or ignored `config/master.key` | Production Rails reads credentials; missing key/value fails closed |
| Delivery database | Compose defaults and `.env.example` URL shape | `.env` override when needed | `DATABASE_URL`/`DELIVERY_DATABASE_URL` semantics remain unchanged |
| Test database | Verification scripts and Compose test URL shape | Isolated test runtime | `TEST_DATABASE_URL` remains the only test connection input |
| Master key file | Never tracked or copied to final image | Local `config/master.key` | `git check-ignore` succeeds; image audit finds no key |

## Required assertions

1. Delivery Compose renders `RAILS_MASTER_KEY` for both `web` and `worker` and does not render `SECRET_KEY_BASE`.
2. A valid key and encrypted file boot production; no key produces a nonzero, actionable failure.
3. The production image contains ciphertext but not `config/master.key`, `.env`, tests, or development tooling.
4. README and `.env.example` use the same names and precedence as the Compose contract.

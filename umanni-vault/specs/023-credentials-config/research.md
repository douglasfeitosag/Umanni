# Research: Rails Credentials Configuration

## Decision 1: Use Rails encrypted credentials for application secrets

- **Decision**: Commit `config/credentials.yml.enc`; supply its decryption key through `RAILS_MASTER_KEY` at runtime and keep `config/master.key` ignored.
- **Rationale**: This is Rails' built-in encrypted configuration boundary and directly satisfies the original assessment expectation for Rails credentials without introducing a secret-manager dependency.
- **Rejected**: Keeping `SECRET_KEY_BASE` in `.env` leaves the application secret in an operational plaintext file and does not satisfy the requested correction. Adding Vault/KMS is outside this local Compose release.

## Decision 2: Keep database URLs operational

- **Decision**: Preserve `DATABASE_URL`, `DELIVERY_DATABASE_URL`, and `TEST_DATABASE_URL` as Compose/environment inputs.
- **Rationale**: They select database hosts and isolated names, and the existing verification scripts explicitly validate their precedence and safety. They are infrastructure coordinates, not Rails application signing secrets.
- **Rejected**: Moving database credentials in the same change would expand the scope, require a separate rotation story, and risk weakening the established test isolation contract.

## Decision 3: Configure production through Rails' existing secret hook

- **Decision**: Set the production `secret_key_base` from `Rails.application.credentials.secret_key_base` using the smallest Rails-supported configuration point, and fail closed if it is absent.
- **Rationale**: The value is consumed by Rails before requests and must be available to both `web` and `worker`; one shared encrypted source avoids duplicated environment values.
- **Verification**: Focused boot/config specs, Compose rendering, missing-key behavior, and delivery gate/image inspection.

## Decision 4: Keep tests deterministic without using delivery credentials

- **Decision**: Test-only support may provide a clearly labeled deterministic secret through the existing isolated delivery overlay; normal test and development runs continue to use their Rails defaults.
- **Rationale**: The test harness must prove the delivery contract without ever requiring or exposing a real master key.
- **Rejected**: Reusing a developer's master key or committing `config/master.key` would violate the privacy boundary.

## Decision 5: Keep the Docker build secretless

- **Decision**: Preserve `SECRET_KEY_BASE_DUMMY=1` only in the Dockerfile asset-build command and make runtime production configuration distinguish this build-only value from the credentials-backed path.
- **Rationale**: Vite compilation must not require a decryption key; BuildKit args or copied key files would risk persistence in context or layers. Rails documents a dummy secret for asset compilation, while delivery still requires the real credentials value.
- **Verification**: Run `docker build`/the production Compose build with no `RAILS_MASTER_KEY`, inspect image history and filesystem for key material, then boot delivery with the private runtime key.

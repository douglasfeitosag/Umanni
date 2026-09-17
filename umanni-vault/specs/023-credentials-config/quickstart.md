# Quickstart: Credentials-backed local delivery

This is the planned evaluator path for `1.1.0`. It must be executed and its real results recorded in `EXEC-022-CREDENTIALS-1-1-0.md` before release.

```sh
git clone https://github.com/douglasfeitosag/Umanni.git
cd Umanni
git checkout v1.1.0
cp .env.example .env
```

Obtain the private `RAILS_MASTER_KEY` through the delivery channel for the released ciphertext, or create a replacement credentials file locally before first use. Never publish the key:

```sh
export RAILS_MASTER_KEY="<private key supplied out-of-band>"
bin/rails runner 'abort "missing secret_key_base" unless Rails.application.credentials.secret_key_base.to_s != ""'
```

For delivery, provide the key to both Rails processes at runtime:

```sh
docker compose --project-name umanni-evaluation --profile delivery config --quiet
docker compose --project-name umanni-evaluation --profile delivery build web worker
docker compose --project-name umanni-evaluation --profile delivery up -d --wait web worker
curl --fail http://127.0.0.1:3030/ready
curl --fail http://127.0.0.1:3030/up
```

The final README must explain that the shell export is a local example only, that `RAILS_MASTER_KEY` is delivered privately by the runtime, and that database URLs remain `.env`/Compose operational configuration. It must not ask the evaluator to generate or paste `SECRET_KEY_BASE`. The Docker build must remain runnable without `RAILS_MASTER_KEY` by using the existing build-only `SECRET_KEY_BASE_DUMMY=1` path; the real key is supplied only to `up`/runtime.

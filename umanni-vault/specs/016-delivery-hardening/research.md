# Pesquisa 016 — startup, readiness e erros de entrega

Consulta realizada em 2026-09-16. Fontes primárias e documentação das ferramentas usadas:

- [Rails 8.1 — `Rails::HealthController`](https://api.rubyonrails.org/classes/Rails/HealthController.html): `/up` prova boot, mas a própria API avisa que não reflete dependências como banco; aplicações com necessidade específica devem usar outra ação.
- [Rails Guides — preparação do banco](https://guides.rubyonrails.org/active_record_migrations.html#preparing-the-database): `db:prepare` é idempotente; cria/configura quando ausente e aplica migrations pendentes quando necessário.
- [Rails Guides — `config.exceptions_app`](https://guides.rubyonrails.org/configuring.html#config-exceptions-app): a aplicação de exceções substitui `ActionDispatch::PublicExceptions`; precisa tratar formatos inválidos sem entrar em nova falha.
- [Inertia Rails — error handling](https://inertia-rails.dev/guide/error-handling): produção deve devolver página Inertia válida para evitar o modal de resposta inválida; exceções fora do controller podem exigir uma exceptions app.
- [Docker Compose — ordem de startup](https://docs.docker.com/compose/how-tos/startup-order/): `depends_on: condition: service_healthy` espera a saúde da dependência, mas não comprova que o banco específico da aplicação existe ou está migrado.
- [Docker Compose — `up --wait`](https://docs.docker.com/reference/cli/docker/compose/up/): `--wait` termina somente quando os serviços estão running/healthy e é o comando de aceite da entrega local.

## Constatações na base `a3b53ee`

- `bin/docker-entrypoint` somente faz `exec "$@"`; nenhuma preparação antecede o servidor.
- `db` inicia com `POSTGRES_DB=umanni_development`, enquanto `web` usa por padrão `umanni_production`; a saúde do servidor PostgreSQL não cria nem valida esse segundo banco.
- `web` consulta `/up`; a rota aponta ao health controller padrão do Rails e, conforme a documentação, não prova PostgreSQL.
- produção desativa relatórios locais, mas não existe resposta de contingência Umanni para HTML/Inertia.
- `ApplicationController` compartilha `Current.user` e flash; o fallback não pode depender dessa cadeia se quiser sobreviver a falhas de sessão/banco.
- `@inertiajs/react` e `@inertiajs/core` estão fixados em 3.7.1; `inertia_rails` está fixado em 3.22.0.

## Decisões

### D-032 — onde autorizar `db:prepare`

| Cenário | Segurança de escopo | Complexidade | Consequência |
| --- | --- | --- | --- |
| A. Manter comando manual no README | omissão continua possível | mínima | não resolve #18 |
| B. Executar sempre no entrypoint da imagem | prepara também usos não autorizados fora do perfil local | pequena | vira política genérica de produção |
| C. Gate opt-in no entrypoint, habilitado somente por `web` em `delivery` | falha fechada e autorização local explícita | pequena | resolve a regressão sem ampliar deploy |

**Decisão: C.** O entrypoint reconhece uma variável booleana de nome específico da entrega, executa `bin/rails db:prepare` antes do servidor e só então usa `exec`. Valor ausente ou inválido não autoriza preparação silenciosa. A executora escolhe o nome revelador final e o registra no README/EXEC.

### D-033 — liveness e readiness

| Cenário | Precisão | Isolamento | Consequência |
| --- | --- | --- | --- |
| A. Reutilizar `/up` como está | prova apenas boot | preserva perfis | falso positivo já observado |
| B. Transformar `/up` em verificação de banco | prova dependência | muda contrato global em dev/test | mistura liveness e readiness |
| C. Preservar `/up` e criar readiness exclusiva usada pelo healthcheck `delivery` | prova boot, consulta e migrations separadamente | não altera dev/test | duas sondas com responsabilidades claras |

**Decisão: C.** A readiness executa consulta mínima real e verifica migrations pendentes. Sucesso é 200; dependência indisponível é 503 genérico. O healthcheck do `web` usa a readiness; `/up` permanece liveness.

### D-034 — fronteira do fallback 5xx

| Cenário | Cobertura | Robustez | Consequência |
| --- | --- | --- | --- |
| A. Arquivos estáticos públicos | cobre HTML | request Inertia recebe resposta inválida/modal | insuficiente para #19 |
| B. `rescue_from` no `ApplicationController` | responde Inertia em controllers | perde falhas externas ao controller e pode acionar shares com banco | risco de recursão |
| C. Serviço de exceções dedicado, isolado de controller/sessão/banco | cobre HTML e Inertia 5xx sem shares | exige contrato explícito pequeno | superfície mais robusta e testável |

**Decisão: C.** Um serviço/Rack endpoint dedicado trata somente 5xx no ambiente de produção. Status não-5xx é delegado ao comportamento atual. O serviço monta somente status, componente/página genérica e URL segura; não recebe a exceção como prop. MIME inválido cai para resposta HTML genérica compatível, sem nova exceção.

### D-035 — ação de recuperação

| Cenário | Risco | Usabilidade | Consequência |
| --- | --- | --- | --- |
| A. Repetir automaticamente a última requisição | pode duplicar POST/PATCH/DELETE | parece conveniente | inseguro |
| B. Botão “Tentar novamente” em qualquer método | usuário pode repetir mutação | ambíguo | exige distinguir métodos/efeitos |
| C. Link “Voltar ao início” | nenhuma mutação é repetida | recuperação simples e previsível | não promete restaurar o formulário |

**Decisão: C.** Não há replay automático nem botão genérico de retry. A página oferece navegação ao início; o usuário decide se refaz a operação no fluxo normal.

# Contrato Inertia e Solid Cable — 0.3.0

## Convenções

- Chaves JSON usam `camelCase`; papéis usam `admin|regular`.
- IDs são opacos ao frontend. Nenhuma prop inclui segredo ou metadado interno do Active Storage.
- Permissões são calculadas no servidor. Ausência de botão no cliente não substitui autorização.
- Erros de formulário usam a integração Inertia e chaves estáveis por campo; mensagens visíveis são em português.

## Props compartilhadas

```ts
type Role = "admin" | "regular";

type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  avatarUrl: string | null;
};

type SharedProps = {
  auth: { user: AuthUser | null };
  flash: { notice?: string; alert?: string };
};
```

`auth.user` é o ator atual, nunca o alvo implícito de uma rota admin. Visitantes recebem `null`. `avatarUrl` deve ser uma URL assinada/gerada pelo servidor apenas para um registro que o ator pode ver.

## Páginas

| Componente Inertia | Props específicas |
| --- | --- |
| `Auth/SignIn` | nenhuma credencial predefinida |
| `Auth/SignUp` | nenhuma permissão/papel editável |
| `Profile/Show` | `profile: UserView`, `permissions: { edit: true, destroy: boolean }` |
| `Profile/Edit` | `profile: UserView`; `role` somente para apresentação |
| `Admin/Dashboard` | `metrics: DashboardMetrics` |
| `Admin/Users/Index` | `users: UserSummary[]`, `permissions` por registro |
| `Admin/Users/New` | `roleOptions: RoleOption[]` |
| `Admin/Users/Edit` | `user: UserView`, `roleOptions`, `permissions` |

```ts
type UserSummary = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  avatarUrl: string | null;
};

type UserView = UserSummary;

type UserPermissions = {
  edit: boolean;
  destroy: boolean;
  changeRole: boolean;
};

type DashboardMetrics = {
  total: number;
  byRole: { admin: number; regular: number };
};
```

`roleOptions` traz somente `admin` e `regular` com rótulos em português. A lista da 0.3.0 não promete paginação, busca, filtro, status de ativação ou ordenação configurável.

## Formulários permitidos

- cadastro: `fullName`, `email`, `password`, `passwordConfirmation`;
- perfil: `fullName`, `email`, `avatar` e `removeAvatar` explícito;
- criação admin: `fullName`, `email`, `role`, `password`, `passwordConfirmation`, `avatar`;
- edição admin: `fullName`, `email`, `role`, `avatar`, `removeAvatar`;
- exclusão: `confirmation`, que deve equivaler a `EXCLUIR` após `trim`.

Campos extras são descartados pelos strong parameters; testes verificam que `role` público/próprio e senha em edição não produzem efeito.

## Métricas e Cable

Canal conceitual: `DashboardMetricsChannel`. A conexão identifica o usuário pela sessão Rails. `subscribed` rejeita se o ator não for admin. Não existe canal por ID fornecido pelo cliente.

Payload único da versão 1:

```json
{
  "type": "dashboard.metrics.changed",
  "schemaVersion": 1
}
```

Contrato do cliente:

1. ao conectar ou reconectar, solicitar `router.reload({ only: ["metrics"], preserveState: true, preserveScroll: true })`;
2. ao receber payload exatamente reconhecido, agendar a mesma recarga parcial;
3. coalescer sinais recebidos enquanto uma recarga está agendada/em voo e executar no máximo uma recarga adicional se um sinal chegou durante o voo;
4. ignorar payload desconhecido sem alterar contagens e registrar somente diagnóstico não sensível;
5. desconectar/limpar subscription no unmount;
6. nunca aplicar delta ou confiar em contagem transmitida.

O servidor emite o sinal após commit de criação/exclusão de usuário ou transição de papel. Alteração apenas de nome/e-mail/avatar não emite. Falha e rollback não emitem. A consulta parcial repete autenticação/autorização e retorna as três contagens numa única fotografia transacionalmente consistente o bastante para a tela; `admin + regular == total` é validado no servidor/teste.

## Erros e negações

- campos inválidos: resposta Inertia 422/fluxo idiomático equivalente, com mensagens por campo e sem senha refletida;
- visitante em rota privada: redirecionamento ao login;
- autenticado sem permissão: 403 seguro, sem props do recurso;
- ID inexistente ou invisível: resposta que não distingue existência para ator sem permissão;
- conflito de e-mail concorrente: erro de e-mail recuperável, não exceção/500;
- último admin: erro persistente associado à ação/papel e nenhuma mutação;
- Cable sem permissão: subscription rejeitada e nenhum stream confirmado.

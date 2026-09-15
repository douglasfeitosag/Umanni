# Contrato Inertia e Solid Cable — 0.3.0

## Convenções

- Props JSON de resposta usam `camelCase`; payloads de formulário e chaves de erro usam `snake_case`, iguais aos atributos Rails. Papéis usam `admin|regular`.
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

- cadastro: `registration[full_name]`, `registration[email]`, `registration[password]`, `registration[password_confirmation]`;
- login: `session[email]`, `session[password]`;
- perfil: `profile[full_name]`, `profile[email]`, `profile[avatar]` e `profile[remove_avatar]` explícito;
- criação admin: `admin_user[full_name]`, `admin_user[email]`, `admin_user[role]`, `admin_user[password]`, `admin_user[password_confirmation]`, `admin_user[avatar]`;
- edição admin: `admin_user[full_name]`, `admin_user[email]`, `admin_user[role]`, `admin_user[avatar]`, `admin_user[remove_avatar]`;
- exclusão própria/admin: `deletion[confirmation]`, que deve equivaler a `EXCLUIR` após `trim`.

Campos extras são descartados pelos strong parameters; testes verificam que `role` público/próprio e senha em edição não produzem efeito.

Forms sem arquivo usam o request Inertia normal. Forms que enviam `avatar` usam `FormData`/`multipart/form-data`; updates incluem `_method=patch` se o adapter não processar PATCH multipart diretamente. O controller mapeia o envelope e as chaves acima diretamente para strong parameters Rails, sem conversão implícita camelCase. Erros voltam no error bag sob a chave de atributo `snake_case` (`full_name`, `password_confirmation`, `avatar`, `role`, `confirmation`); cada componente mantém um mapa explícito dessas chaves para seu controle e `aria-describedby`. Props persistidas de resposta continuam camelCase conforme os tipos deste contrato. Senha e confirmação nunca voltam no error bag como valor.

Valores escalares do wire são strings UTF-8; `role` aceita somente `admin|regular`; `remove_avatar` usa `"1"` para remover e ausência/`"0"` para manter. Um arquivo `avatar` é a parte binária do multipart. Se `avatar` e `remove_avatar="1"` chegarem juntos, o servidor rejeita a combinação ambígua e preserva o avatar anterior; a interface nunca envia ambos. IDs de alvo vêm exclusivamente da rota admin, não do corpo.

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

Logout, exclusão e transição `admin -> regular` desconectam, depois do commit, todas as conexões Cable identificadas para o usuário afetado por meio das remote connections do Action Cable. No rebaixamento, a desconexão do antigo admin ocorre antes do sinal global de invalidação. Mesmo se uma corrida entregar o sinal sem dados, a partial reload reautoriza e responde 403; o cliente encerra a subscription ao receber essa negação. Testes mantêm uma conexão aberta antes de logout/exclusão/rebaixamento e provam desconexão, ausência de novos sinais utilizáveis e negação da recarga.

## Erros e negações

- campos inválidos: resposta Inertia 422/fluxo idiomático equivalente, com mensagens por campo e sem senha refletida;
- visitante em rota privada: redirecionamento ao login;
- autenticado sem permissão: 403 seguro, sem props do recurso;
- ID inexistente ou invisível: resposta que não distingue existência para ator sem permissão;
- conflito de e-mail concorrente: erro de e-mail recuperável, não exceção/500;
- último admin: erro persistente associado à ação/papel e nenhuma mutação;
- Cable sem permissão: subscription rejeitada e nenhum stream confirmado.

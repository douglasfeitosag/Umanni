# Plano 012 — Roadmap de identidade, usuários e importação

**Spec**: [spec.md](spec.md)
**Branch**: `codex/012-user-roadmap`
**Destino**: `Backlog`
**Base**: `v0.2.1` / `bc9626e7a1ef9ce53375e0eb0d579e7831f0e7e0`

## Resumo

O roadmap separa o que o teste pede em dois incrementos funcionais. A versão 0.3.0 entrega identidade e gestão de usuários; a 0.4.0 entrega importação assíncrona. O fracionamento reduz o risco: a importação só começa depois de modelos, autorização e telas reais estarem revisados na versão anterior.

## Bloco 1 — Identidade e acesso (`0.3.0`)

### Contrato de domínio proposto

- `User`: `full_name`, e-mail normalizado e único, `role` (`admin` ou `regular`), `password_digest` opcional somente para a conta importada pendente de credencial e um avatar Active Storage opcional.
- Registro público força `regular`; parâmetros públicos nunca aceitam `role`.
- Criação/edição administrativa pode definir `role` e senha inicial; a senha só é aceita via parâmetros permitidos, recebe confirmação e não é devolvida como prop, erro, log ou relatório.
- Login válido redireciona administrador ao dashboard e usuário regular ao próprio perfil. Login de registro importado sem senha falha com mensagem neutra, sem revelar detalhes internos.
- O primeiro administrador nasce apenas pelo comando local protegido por variáveis de ambiente. O comando é idempotente e não substitui um administrador existente.
- Autorização é verificável no Rails, inclusive contra URLs e IDs forjados. A interface apenas reflete a decisão do servidor.
- Exclusão/rebaixamento/autoalteração não podem remover o último administrador. Usuário regular não vê nem envia controles administrativos.
- O avatar é um arquivo opcional, com validação de tamanho e tipo no servidor. Arquivos em formato SVG e URLs remotas ficam fora do escopo.

### Arquitetura mínima

Usar `bin/rails generate authentication` como exigido pelo teste em uma cópia temporária primeiro; comparar o inventário gerado antes de incorporar apenas os arquivos necessários. Preservar a sessão/autenticação nativa e a proteção CSRF. Não instalar Devise, Pundit, CanCanCan, biblioteca de formulários, API REST paralela ou estado global React.

Extrair somente políticas pequenas de usuário quando houver regra de ator/recurso. Controllers mantêm autenticação, parâmetros e resposta Inertia; modelos preservam validações e invariantes; consultas de dashboard expõem somente totais autorizados. O comando de bootstrap coordena exclusivamente o primeiro administrador.

### BDD obrigatório

1. Dado visitante com nome, e-mail e senha válidos, quando se cadastra, então recebe papel regular e chega ao próprio perfil.
2. Dado usuário autenticado, quando inicia sessão, então administrador chega ao dashboard e regular ao perfil.
3. Dado usuário regular, quando tenta rota, ID ou mutação administrativa, então o servidor nega o acesso e nenhum dado de terceiros é exposto.
4. Dado administrador, quando cria, edita, exclui ou muda o papel de outro usuário, então a alteração persistida respeita validações, atualiza os totais e nunca revela senha.
5. Dado o único administrador, quando tenta se excluir, se rebaixar ou editar o próprio papel, então o servidor bloqueia a operação sem alterar dados.
6. Dado avatar JPEG/PNG/WebP até 5 MiB, quando é enviado, então fica associado ao perfil; tipo não permitido, arquivo maior ou SVG retorna erro seguro.
7. Dado comando de bootstrap e nenhum administrador, quando variáveis válidas são fornecidas, então existe exatamente um administrador; se já houver administrador, o comando não cria nem substitui outro.

### Validação e segurança

Cada comportamento começa em RED focalizado, recebe a implementação mínima, fica GREEN e é refatorado. RSpec cobre regras, requests e comando; Vitest/RTL cobre feedback e visibilidade dos controles; Playwright cobre fluxos de visitante, regular e administrador em desktop e mobile. A matriz inclui SQLi, XSS refletido/armazenado, XSRF, escalada de papel, enumeração por ID e manipulação de upload. `bin/check` permanece o gate completo já existente; a cobertura Ruby e TypeScript continua >=90% por linguagem.

## Bloco 2 — Importação (`0.4.0`)

### Contrato de dados e processamento proposto

- Criar uma entidade persistida de lote de importação com administrador criador, arquivo Active Storage, estado, contadores, início/fim e relatório por linha seguro; ela é a fonte do progresso, não o canal em tempo real.
- Aceitar CSV UTF-8 e XLSX com cabeçalhos `full_name` e `email`; `role` é opcional e vale `regular` por padrão. Não aceitar campo de senha nem atualizar avatar por URL nesta primeira versão.
- Recusar arquivo acima de 10 MiB ou 10.000 linhas antes de enfileirar. Validar cabeçalhos, formato, encoding e células vazias no servidor.
- Após persistir o lote e seu arquivo, enfileirar com Solid Queue. O job lê o formato escolhido, valida linha a linha e cria apenas usuários novos válidos. E-mail duplicado no banco ou no próprio arquivo é rejeitado, nunca atualizado.
- O job é retomável no sentido de que sua repetição não duplica usuários: a unicidade no banco permanece a autoridade; contadores e relatório são recalculados de modo explícito. Uma nova tentativa pela interface cria novo lote e preserva o histórico anterior.
- Solid Cable transmite somente a atualização autorizada de estado/contadores para o administrador que pode consultar o lote. Reabrir a página consulta o estado persistido.

### BDD obrigatório

1. Dado CSV/XLSX válido dentro do limite, quando administrador envia, então um lote é persistido e enfileirado sem bloquear a resposta.
2. Dado lote com linhas válidas, inválidas e duplicadas, quando o job termina, então somente as válidas novas existem, os contadores concordam e o relatório não contém senhas ou conteúdo integral da planilha.
3. Dado job repetido ou falha transitória, quando roda novamente, então não cria usuário duplicado nem altera usuário existente.
4. Dado administrador autorizado, quando acompanha o lote, então vê estado e progresso ao vivo e pode recarregar sem perder o resultado; usuário regular não consulta nem assina atualizações de outro lote.
5. Dado arquivo malformado, tamanho/linhas excessivos ou cabeçalho ausente, quando enviado, então o servidor rejeita de forma interativa e não agenda job.

### Arquitetura mínima

Usar leitor CSV e leitor XLSX sob contrato pequeno de resultado por linha; selecionar e fixar a biblioteca XLSX apenas na pesquisa da feature 015. Um serviço de importação coordena validação, criação e contadores dentro dos limites do lote. Job, leitor, serviço e emissão Cable não recebem sessão HTTP. Não adicionar Redis, polling, upload direto, atualização de registros existentes, agendamento recorrente ou biblioteca de processamento distribuído.

## Itens que permanecem Backlog

- B004: workflow automático, automação de ledger e instalação isolada do runner no Mac. A execução de código público no runner só é planejada depois de definir isolamento, recursos, limpeza e identidades.
- B005: Kamal efetivo, SSR e ZJIT são extras do teste; não entram como pré-requisito da entrega funcional.
- B006: issue #9 é polimento visual independente e continua no milestone Backlog.

## Aceite e parada

O planejamento é aceito somente com revisão independente do HEAD exato, `review-ledger=success`, `spec-reviewed` e zero threads abertas. Depois disso, uma condutora produzirá o prompt autossuficiente da executora de 0.3.0, sem alterar este HEAD aceito. Parar se Rails nativo exigir comportamento incompatível com o contrato, se o ambiente de upload/jobs não puder ser isolado no Compose, se a decisão de senha contradizer D-019 ou se qualquer tarefa exigir e-mail, convite, CI ou extra não selecionado.

# Ferramentas de planejamento

GitHub Spec Kit **v1.0.6**, commit `96c9bd657bfd5de0d651a6165084932b7304ac99`. Integração Codex em modo skills, scripts shell. Origem: [release](https://github.com/github/spec-kit/releases/tag/v1.0.6).

Os cerca de 5 mil linhas de scripts/templates/skills gerados são locais e regeneráveis; ficam ignorados no Git. Constituição, specs e metadados de versão ficam versionados. Não editar os arquivos gerados ignorados para introduzir regras que deveriam ser compartilhadas.

## Preparar em uma nova cópia

Com `uv` e Git disponíveis, execute na raiz do repositório:

```sh
uvx --from 'git+https://github.com/github/spec-kit.git@96c9bd657bfd5de0d651a6165084932b7304ac99' specify init --here --force --integration codex --integration-options='--skills' --script sh --non-interactive
```

O `--force` permite regenerar o suporte na pasta não vazia. Nesta versão, a função de inicialização preserva uma constituição existente; verificar o diff após a preparação. Não usar este comando para atualizar a versão ou sobrescrever customizações sem um plano.

As skills locais aparecem em `.agents/skills/speckit-*`. O fluxo é constituição → specify → clarify quando necessário → plan → tasks → analyze → execução delegada. O comando de implementação não deve executar tarefas fora do prompt ou fazer merge.

Para specs existentes e branches com prefixo `codex/`, configure `SPECIFY_FEATURE_DIRECTORY` com o caminho absoluto (por exemplo, `/Users/douglas/Projects/Umanni/umanni-vault/specs/000-documentation`) e `SPECIFY_FEATURE` com o identificador `000-documentation`, ao chamar scripts que dependam da feature atual. A integração Spec Kit é uma ferramenta local; seleção de outras skills/plugins do projeto ainda será feita depois do branding, conforme a ordem solicitada.

Relacionados: [AGENTS](../AGENTS.md), [[HOME]], [[STATUS]].

Execute a instalação na raiz Git, nunca dentro do vault. O arquivo `.specify/memory/constitution.md` é um link simbólico para `umanni-vault/CONSTITUICAO.md`; preserve esse vínculo. Em worktrees, use o caminho absoluto do próprio checkout para SPECIFY_FEATURE_DIRECTORY. As specs ficam em `umanni-vault/specs/`.

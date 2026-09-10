# PEDIDO-006 — Hospedagem e controle de gastos

Data: 2026-09-10. Autor do pedido: Douglas. Registro: Codex.

Estado posterior: pesquisa mantida como histórico. Douglas priorizou entrega local com Docker Compose, evitando contratação de hospedagem. Ver [PEDIDO-007 / D-015](12-PEDIDO-007-ENTREGA-LOCAL.md). As propostas de Railway e orçamento abaixo não foram aprovadas e não são o plano vigente.

## Texto recebido

Tem algum lugar para hospedar grátis? Ou qual o lugar mais barato que tem, mais simples pro deploy e que só ficará as máquinas ligadas quando forem fazer o teste (quando alguém usar) e ter limite de uso para não ter problema com billing

## Necessidades registradas

- Preferir hospedagem gratuita ou de baixo custo para a avaliação.
- Deploy simples para a stack aprovada.
- Suspender recursos sem uso e retomar quando alguém acessar.
- Ter limite efetivo de consumo, distinguindo corte de gastos de simples aviso por e-mail.

Não há provedor escolhido, orçamento numérico aprovado ou contratação autorizada. A comparação abaixo não resolve essas decisões automaticamente.

## Comparação verificada em 2026-09-10

| Opção | Preço inicial e limite | Adequação e restrições |
| --- | --- | --- |
| Railway | Trial para novos usuários: US$ 5 de crédito por até 30 dias. Hobby: mínimo mensal de US$ 5 com US$ 5 de uso incluídos; excedente cobrado. Limite rígido de consumo disponível, mínimo positivo de US$ 10 segundo a documentação da CLI | Candidata recomendada para equilibrar deploy e controle de custo. A disponibilidade e restrições do trial dependem da conta. Suspensão depende de inatividade de rede, não apenas ausência de visitantes |
| Render Free | Serviço web gratuito; sem método de pagamento, exceder certas franquias suspende serviços ou builds em vez de cobrar. PostgreSQL gratuito expira em 30 dias | Web suspende após 15 minutos sem tráfego recebido e leva cerca de um minuto para voltar. Não há worker separado gratuito nem disco persistente gratuito no web. Arquivos locais se perdem ao suspender/reiniciar |
| Fly.io | Cobrança por recursos; autostop/autostart disponíveis | Bom controle de máquinas sob demanda, mas o suporte informou em junho de 2026 que não oferece teto de gasto. Créditos pré-pagos não impedem saldo adicional a pagar. Não é a recomendação para a prioridade de billing de Douglas |

Preços em dólares, sem estimar conversão cambial, impostos ou custo efetivo desta aplicação. Não afirmar que é a comparação de todos os provedores ou o menor preço absoluto do mercado.

## Limitação específica da aplicação

Solid Queue consulta o banco para buscar jobs. Solid Cable e conexões ativas também geram tráfego. Na Railway, esse tráfego pode manter serviços ativos mesmo sem visitantes. A documentação descreve workers com polling e servidores WebSocket como cargas inadequadas para suspensão simples. Portanto, não prometer que o projeto inteiro dormirá apenas ao ativar Serverless.

Essa é uma inferência técnica sobre nossa stack a validar em execução. O desligamento do processamento pode interromper importações; a retomada precisa preservar os dados, recuperar jobs e não duplicar usuários. O armazenamento persistente também deve ser considerado separadamente do consumo de CPU/RAM.

Na Render Free, uma implantação experimental poderia avaliar web e Solid Queue no mesmo serviço, mas exige validação de memória, retomada de jobs e persistência externa dos arquivos. Não apresentar como implantação já comprovada ou como equivalente a workers sempre disponíveis.

## Recomendação preliminar

Avaliar primeiro a Railway com trial, se disponível, para uma demonstração curta. Se for preciso contratar Hobby, obter antes de contratar o orçamento de Douglas e configurar corte de consumo do workspace, além de alertas. Uma proposta possível é limite de US$ 10 de consumo por ciclo, sujeito à confirmação; ele não foi aprovado. O teto é de consumo do provedor, não uma garantia de valor final em reais com impostos.

Dar prioridade a validar importações e atualizações ao vivo. Suspender componentes apenas após comprovar sono, retorno pelo acesso e continuidade dos jobs; manter algum recurso ativo pode ser necessário. Se desligamento automático de todos os componentes for condição inegociável, revisar o plano de hospedagem antes de escolher o provedor.

Ao atingir o corte de consumo, a demonstração pode ficar indisponível. Definir também até quando precisa ficar disponível e o procedimento de encerramento dos recursos após a avaliação. Não ativar serviços pagos, recarga automática nem contratar em nome de Douglas com base apenas nesta pesquisa.

## Fontes

- [Railway — preços](https://railway.com/pricing).
- [Railway — trial e restrições](https://docs.railway.com/pricing/free-trial).
- [Railway — corte de consumo e alertas](https://docs.railway.com/pricing/cost-control).
- [Railway — valores aceitos para limites](https://docs.railway.com/cli/usage).
- [Railway — suspensão e retorno](https://docs.railway.com/deployments/serverless).
- [Railway — limitações de suspensão para workers e bancos](https://docs.railway.com/guides/cut-idle-costs-serverless).
- [Render — limites gratuitos](https://render.com/docs/free).
- [Fly.io — início e parada automáticos](https://fly.io/docs/launch/autostop-autostart/).
- [Fly.io — resposta do suporte sobre ausência de teto](https://community.fly.io/t/prepaid-budget-used-up-rolled-directly-into-billing/28103).

Há divergência entre páginas Railway quanto ao intervalo exato de suspensão (5–10 minutos versus 10 minutos). Não usar um prazo exato como garantia operacional; validar o comportamento efetivo no ambiente escolhido.

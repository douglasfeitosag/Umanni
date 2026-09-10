# PEDIDO-001 — Preparação do teste Umanni

Data: 2026-09-10. Autor do pedido: Douglas. Registro: Codex.
Estado: recebido; aguardando esclarecimentos e o enunciado do teste.
Este registro preserva o texto recebido. Não é uma especificação aprovada do produto.

## Texto recebido

Tenho um teste para desenvolvimento e que fazer ele da forma mais estruturada possível. Antes de qualquer código, quero criar todo o branding do pseudoproduto. Creio que isso será um diferencial. Criar uma logo, escolher fonte, paleta de cores, ui tokens, componentes, playbook. Tudo referente a essa parte. Depois disso quero definir as melhores skills/plugins para a stack do teste. Quero também estruturar tudo o que vamos fazer usando o SDD. Saber tudo do projeto, o que vai fazer, quando fazer, como fazer antes de qualquer linha de código. E sempre voltado ao TDD e BDD. Também definir exatamente qual tipo de arquitetura seguir. Usar princípios do clean code e solid. Cada entrega será atômica. Sem commits gigantes. Documentação sempre atualizada. README sempre atualizado. Usar obsidian para documentar o projeto e como cada parte se comunica e o que cada conceito significa.

Regras principais:

- Nunca programar sem um plano antes
- Ter exatamente o que deve fazer, como fazer e quando parar. Caso não tenha todas as informações ou tiver conflitante, voltar um prompt para a condutora resolver e gerar outro prompt
- O projeto é orientado a prompts. Tudo ficara documentado. O que eu pedir ficará num arquivo MD, você irá gerar os assets de acordo com o SDD ([https://github.com/github/spec-kit](https://github.com/github/spec-kit)) e irá gerar o prompt para a executora em outra sessão executar. Nesse prompt você irá dizer o que a executora deve fazer e o que ela deve retornar do processamento dela, e o nome do arquivo EXEC-* onde ela vai colocar o que executou de forma resumida, pra que a condutora analise o que ela fez. Se tudo tiver ok a condutora fecha a task e gera os comando para fechar os PRs
- Cada condutora depois de terminar sua tarefa irá atualizar sua memória e arquivos necessários e gerar um novo prompt para uma sessão limpa com a próxima instrução, para economizar tokens

As etapas que vamos seguir nessa ordem:

- vou mandar num novo prompt o texto do teste. Você vai fazer perguntas a respeito das tecnologias que vamos usar. Dele você vai criar os primeiros arquivos, a primeira versão do README e obsidian. Vai criar o vault, vai criar o git do projeto e fazer o primeiro commit ([https://github.com/douglasfeitosag/Umanni](https://github.com/douglasfeitosag/Umanni))
- Vamos criar o branding na mesma pasta do projeto (/home/douglas/Projects) e fazer o commit/push/merge
- Vamos criar a estrutura básica do projeto e fazer o commit/push/merge
- Vamos criar os componentes de acordo com o que o projeto irá usar. Não mais que isso. Somente o estritamente necessário e fazer o commit/push/merge
- Vamos definir as tarefas de acordo com o que o teste pede e o SDD
- Vamos criar o CI/CD do projeto localmente (github actions e runner). O CI precisa ter testes de lint, brakeman, eslint, cobertura de código. Não deve ser possível fazer o merge caso haja algum comentário de um agente/executora que não tenha sido resolvido no PR
- Para cada agente/executora, pra cada achado, eles devem se comunicar via comentário no PR. Quem verifica será a condutora. Ela decidirá os pontos dos achados e caso julgue necessário irá mandar um prompt para a mesma conversa para resolver os problemas.
- A condutora será um modelo 5.6 sol medium, as executoras 5.6 terra high e os agentes 5.6 luna high
- Para cada achado em qualquer parte, aprender com os próprios erros e atualizar a memória para não cometer novamente. Mas sempre deixar o contexto o mais enxuto possível.

Caso você precise de mais informações para a gente estruturar o projeto agora, me fale. Não deixe para depois.

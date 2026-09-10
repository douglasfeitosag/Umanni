# PEDIDO-005 — Familiaridade com Hotwire

Data: 2026-09-10. Autor do pedido: Douglas. Registro: Codex.

## Texto recebido

Confesso que não tenho conhecimento em hotwire. Seria interessante mesmo assim escolher ele?

## Contexto confirmado

Douglas não tem conhecimento em Hotwire e confirmou conhecimento consolidado em React. A experiência com Inertia ainda não foi informada. Após essa conversa, confirmou React + Inertia como frontend (D-005).

## Reavaliação da recomendação

A recomendação inicial de Hotwire considerava a integração com Rails e o escopo, mas não incorporava esse dado sobre familiaridade. Com entrega até o dia seguinte e dedicação parcial, a curva de aprendizado precisa entrar na decisão.

Se Douglas já domina React, React com Inertia passa a ser a recomendação preliminar: preserva conhecimento da interface, embora ainda exija aprender ou validar a integração com Inertia e Solid Cable. Se também não domina React, Hotwire continua uma alternativa a avaliar; nenhuma escolha pode ser registrada como aprovada com base nesta hipótese.

Critério: capacidade de compreender, revisar, depurar e explicar a entrega, além da velocidade de geração de código pelos agentes. O interesse em aprender uma tecnologia deve ser distinguido da necessidade de entregar o teste no prazo.

## Resposta posterior de Douglas

Tenho conhecimento consolidado em react

## Recomendação atual

Recomendar React integrado ao Rails por Inertia, opção permitida pelo teste, aproveitando a experiência consolidada de Douglas. Inertia mantém a ligação entre telas React e controladores Rails sem exigir uma API separada para navegação. O uso de Solid Cable e Solid Queue continua obrigatório. TypeScript, Vite e versões exatas serão tratados no plano técnico; não foram aprovados por esta resposta.

Confirmação posterior: à pergunta "Podemos registrar React + Inertia como a escolha do frontend?", Douglas respondeu "Sim". Decisão D-005 registrada em [decisões tecnológicas](07-DECISOES-TECNOLOGICAS.md). A aprovação veio dessa resposta, não da declaração de familiaridade.

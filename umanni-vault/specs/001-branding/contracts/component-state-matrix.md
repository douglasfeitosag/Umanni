# Contrato de componentes e estados

| Componente | Variantes | Estados | Responsividade |
| --- | --- | --- | --- |
| Logo | horizontal, símbolo | default | horizontal em auth/header; símbolo compacto |
| Navegação | sidebar, menu | default, hover, focus-visible, selected | sidebar ampla; menu estreito |
| Botão | primary, secondary, danger, ghost | default, hover, focus-visible, active, disabled, loading | largura total somente se necessário |
| Icon button | neutral, danger | default, hover, focus-visible, active, disabled | 44×44 em tela estreita |
| Campo | text, email, password, confirmation | empty, filled, hover, focus-visible, disabled, error | rótulo persistente/erro inline |
| Select | role | empty, selected, hover, focus-visible, disabled, error | sem permissão inventada |
| File picker | dropzone, button | idle, hover, focus-visible, drag-active, selected, disabled, error | tela única/fallback visível |
| Avatar | image, initials, icon | default, loading, error | duas iniciais; nunca logo |
| Badge | role, status | neutral, success, warning, error, info | texto/ícone redundante |
| Metric card | total, admin, regular | default, updating | mudança breve sem toast |
| Users table | desktop | loading, empty, populated, error | vira cartões |
| User card | mobile | loading, empty, populated, error | mesmos dados/ações |
| Toast | success, error, info | entering, visible, dismissing | rodapé mobile; topo direito desktop |
| Destructive dialog | user/account | open, invalid, valid, submitting, error | `EXCLUIR` após trim habilita |
| Import progress | queued, processing, completed, partial, failed | persistente | sem percentual inventado |
| Feedback block | empty/loading/semantic | aplicável | mensagem, ícone e ação |

Regras: foco visível; cor nunca único indicador; mensagens importantes recuperáveis; erro importante em toast exige dispensa; `prefers-reduced-motion` remove transição não essencial; nenhuma prancha define permissão, filtro, paginação ou regra não aprovada.

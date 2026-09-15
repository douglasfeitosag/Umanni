import { Head } from '@inertiajs/react'
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics'
import type { DashboardMetrics } from '../../types'

export default function Dashboard({ metrics }: { metrics: DashboardMetrics }) {
  const { updating } = useDashboardMetrics()
  const cards = [
    { label: 'Total de pessoas', value: metrics.total, accent: 'blue' },
    { label: 'Administradores', value: metrics.byRole.admin, accent: 'navy' },
    { label: 'Usuários regulares', value: metrics.byRole.regular, accent: 'coral' },
  ]
  return (
    <section className="page-section">
      <Head title="Visão geral · Umanni" />
      <div className="page-heading"><div><div className="eyebrow">Administração</div><h1>Visão geral</h1><p>Acompanhe a composição atual das contas.</p></div><span className={`sync-state ${updating ? 'is-updating' : ''}`}>{updating ? 'Atualizando…' : 'Ao vivo'}</span></div>
      <div className="metric-grid">
        {cards.map(card => <article className={`metric-card metric-${card.accent}`} key={card.label}><span>{card.label}</span><strong>{card.value}</strong></article>)}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{updating ? 'Atualizando métricas' : 'Métricas atualizadas'}</p>
    </section>
  )
}

import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Dashboard from './Dashboard'

vi.mock('../../hooks/useDashboardMetrics', () => ({ useDashboardMetrics: vi.fn(() => ({ updating: false })) }))
vi.mock('@inertiajs/react', () => ({ Head: ({ title }: { title: string }) => <title>{title}</title>, Link: () => null, router: {} }))

describe('Dashboard', () => {
  it('US7.1 renders the three persisted metrics with a live region', () => {
    render(<Dashboard metrics={{ total: 7, byRole: { admin: 2, regular: 5 } }} />)

    expect(screen.getByText('7')).toBeVisible()
    expect(screen.getByText('2')).toBeVisible()
    expect(screen.getByText('5')).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Métricas atualizadas')
  })
})

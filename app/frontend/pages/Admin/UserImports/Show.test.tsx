import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import UserImportShow from './Show'

vi.mock('../../../hooks/useUserImportProgress', () => ({ useUserImportProgress: vi.fn(() => ({ updating: false })) }))
vi.mock('@inertiajs/react', () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

const userImport = { id: '3', filename: 'people.csv', status: 'completed_with_errors', totalCount: 3, processedCount: 3, createdCount: 2, rejectedCount: 1, progressPercent: 100 }

describe('UserImportShow', () => {
  it('renders aggregate counts and safe per-row results', () => {
    render(<UserImportShow userImport={userImport} results={[
      { rowNumber: 2, status: 'created', normalizedEmail: 'bruno@example.com' },
      { rowNumber: 4, status: 'rejected', normalizedEmail: 'ana@example.com', errorMessage: 'E-mail inválido.' },
    ]} pagination={{ page: 1, totalPages: 1, totalItems: 2 }} />)

    expect(screen.getByRole('link', { name: 'Voltar ao histórico' })).toHaveAttribute('href', '/admin/user_imports')
    const table = screen.getByRole('table', { name: 'Resultados por linha' })
    expect(table).toHaveTextContent('E-mail inválido.')
    expect(table).toHaveTextContent('Criada')
    expect(screen.getByText('Concluída com erros')).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Importação atualizada')
  })

  it('shows a live updating state and generic import failure message', async () => {
    const { useUserImportProgress } = await import('../../../hooks/useUserImportProgress')
    vi.mocked(useUserImportProgress).mockReturnValue({ updating: true })
    render(<UserImportShow userImport={{ ...userImport, failureMessage: 'A importação não pôde ser concluída.' }} results={[]} pagination={{ page: 1, totalPages: 1, totalItems: 0 }} />)

    expect(screen.getByText('Atualizando…')).toBeVisible()
    expect(screen.getByText('A importação não pôde ser concluída.')).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Atualizando importação')
  })
})

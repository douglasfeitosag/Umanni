import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ErrorPage from './Show'

vi.mock('@inertiajs/react', () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
}))

describe('delivery error page', () => {
  it('offers a focused, safe return without replaying the failed request', () => {
    render(<ErrorPage status={500} />)

    const heading = screen.getByRole('heading', { level: 1, name: 'Não foi possível concluir' })
    expect(heading).toHaveFocus()
    expect(document.title).toBe('Não foi possível concluir · Umanni')
    expect(screen.getByText('Não conseguimos concluir esta ação. Volte ao início para continuar com segurança.')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('button', { name: /tentar novamente/i })).not.toBeInTheDocument()
  })
})

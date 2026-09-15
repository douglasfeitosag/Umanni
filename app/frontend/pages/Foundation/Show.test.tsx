import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Show from './Show'

describe('Foundation page', () => {
  it('offers navigation back to the foundation through a real link', () => {
    render(<Show app={{ name: 'Umanni', version: '0.2.0' }} errors={{}} />)
    expect(screen.getByRole('link', { name: 'Recarregar página' })).toHaveAttribute('href', '/')
  })

  it('identifies Umanni and explicitly explains unavailable user flows', () => {
    render(<Show app={{ name: 'Umanni', version: '0.2.0' }} errors={{}} />)

    expect(screen.getByRole('heading', { name: 'Umanni', level: 1 })).toBeVisible()
    expect(screen.getByText('Versão 0.2.0')).toBeVisible()
    expect(screen.getByText('Fundação técnica. Cadastro, login e gestão de usuários ainda não estão disponíveis.')).toBeVisible()
  })
})

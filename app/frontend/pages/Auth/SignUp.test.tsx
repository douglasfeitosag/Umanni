import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SignUp from './SignUp'

vi.mock('@inertiajs/react', () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
  useForm: () => ({
    data: { full_name: '', email: '', password: '', password_confirmation: '' },
    setData: vi.fn(),
    post: vi.fn(),
    processing: false,
    errors: { email: 'já está em uso' },
  }),
}))

describe('SignUp', () => {
  it('US1.3 maps snake_case errors to persistent accessible fields', () => {
    render(<SignUp />)

    expect(screen.getByRole('heading', { name: 'Crie sua conta' })).toBeVisible()
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('já está em uso')).toHaveAttribute('id', 'email-error')
    expect(screen.queryByRole('combobox', { name: /papel/i })).not.toBeInTheDocument()
  })
})

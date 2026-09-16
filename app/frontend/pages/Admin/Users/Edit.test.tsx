import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import EditUser from './Edit'

const setData = vi.fn()
const transform = vi.fn()
const post = vi.fn()

vi.mock('@inertiajs/react', () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  useForm: vi.fn(() => ({ data: { password: '', password_confirmation: '' }, errors: {}, processing: false, setData, transform, post })),
}))
vi.mock('../../../components/AdminUserForm', () => ({ default: () => <div>Admin form</div> }))
vi.mock('../../../components/DeletionDialog', () => ({ default: () => <div>Deletion dialog</div> }))

const user = { id: '9', fullName: 'Importada', email: 'importada@example.com', role: 'regular' as const, avatarUrl: null }
const roleOptions = [{ value: 'regular' as const, label: 'Usuário regular' }]
const permissions = { edit: true, destroy: false, changeRole: true }

describe('EditUser', () => {
  it('shows an accessible initial-password form only for an imported passwordless account', () => {
    render(<EditUser user={{ ...user, passwordConfigured: false }} roleOptions={roleOptions} permissions={permissions} />)

    fireEvent.change(screen.getByLabelText('Senha inicial para acesso'), { target: { value: 'uma frase segura' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Definir senha inicial' }).closest('form')!)

    expect(setData).toHaveBeenCalledWith('password', 'uma frase segura')
    expect(transform).toHaveBeenCalledOnce()
    expect(post).toHaveBeenCalledWith('/admin/users/9/initial_password', expect.any(Object))
  })

  it('does not render the one-time action for an account with a credential', () => {
    render(<EditUser user={{ ...user, passwordConfigured: true }} roleOptions={roleOptions} permissions={permissions} />)

    expect(screen.queryByRole('button', { name: 'Definir senha inicial' })).not.toBeInTheDocument()
  })
})

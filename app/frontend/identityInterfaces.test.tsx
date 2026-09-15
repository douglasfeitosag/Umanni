import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import AppLayout from './components/AppLayout'
import Avatar from './components/Avatar'
import DeletionDialog from './components/DeletionDialog'
import AdminUserForm from './components/AdminUserForm'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ProfileShow from './pages/Profile/Show'
import ProfileEdit from './pages/Profile/Edit'
import UsersIndex from './pages/Admin/Users/Index'
import NewUser from './pages/Admin/Users/New'
import EditUser from './pages/Admin/Users/Edit'
import type { SharedProps, UserView } from './types'

const post = vi.fn()
const patch = vi.fn()
const destroy = vi.fn()
const transform = vi.fn()
const setData = vi.fn()
let formErrors: Record<string, string> = {}
let pageProps: SharedProps

vi.mock('@inertiajs/react', () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ children, as, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: string; method?: string }) => {
    Reflect.deleteProperty(props, 'method')
    return as === 'button' ? <button {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}>{children}</button> : <a {...props}>{children}</a>
  },
  usePage: () => ({ props: pageProps }),
  useForm: (data: Record<string, unknown>) => ({ data, setData, post, patch, delete: destroy, transform, processing: false, errors: formErrors }),
}))

const regular: UserView = { id: '1', fullName: 'Ana Silva', email: 'ana@example.com', role: 'regular', avatarUrl: null }
const admin: UserView = { ...regular, id: '2', fullName: 'Admin Umanni', role: 'admin', avatarUrl: '/avatar.png' }
const roleOptions = [{ value: 'admin' as const, label: 'Administrador' }, { value: 'regular' as const, label: 'Usuário regular' }]

describe('identity interfaces', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function () { this.open = true }
    HTMLDialogElement.prototype.close = function () { this.open = false }
  })

  beforeEach(() => {
    vi.clearAllMocks()
    formErrors = {}
    pageProps = { auth: { user: null }, flash: {}, errors: {} }
  })

  it('renders visitor, regular and administrator navigation states', () => {
    const { rerender } = render(<AppLayout><h1>Conteúdo</h1></AppLayout>)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()

    pageProps = { auth: { user: regular }, flash: { notice: 'Tudo certo' }, errors: {} }
    rerender(<AppLayout><h1>Conteúdo</h1></AppLayout>)
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeVisible()
    expect(screen.queryByRole('link', { name: 'Pessoas' })).not.toBeInTheDocument()

    pageProps = { auth: { user: admin }, flash: { alert: 'Atenção' }, errors: {} }
    rerender(<AppLayout><h1>Conteúdo</h1></AppLayout>)
    expect(screen.getByRole('link', { name: 'Pessoas' })).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Atenção')
  })

  it('renders image and accessible initials avatar fallbacks', () => {
    const { rerender } = render(<Avatar user={regular} />)
    expect(screen.getByRole('img', { name: 'Iniciais de Ana Silva' })).toHaveTextContent('AS')
    rerender(<Avatar user={{ ...regular, fullName: '', avatarUrl: null }} size="large" />)
    expect(screen.getByRole('img')).toHaveTextContent('U')
    rerender(<Avatar user={admin} />)
    expect(screen.getByAltText('Avatar de Admin Umanni')).toHaveAttribute('src', '/avatar.png')
  })

  it('opens, cancels and submits the destructive confirmation dialog', () => {
    render(<DeletionDialog action="/profile" label="Excluir minha conta" />)
    fireEvent.click(screen.getByRole('button', { name: 'Excluir minha conta' }))
    expect(screen.getByRole('dialog')).toHaveAttribute('open')
    fireEvent.change(screen.getByLabelText('Confirmação'), { target: { value: 'EXCLUIR' } })
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    fireEvent.click(screen.getByRole('button', { name: 'Excluir minha conta' }))
    fireEvent.submit(screen.getByRole('button', { name: 'Excluir' }).closest('form')!)
    expect(transform).toHaveBeenCalled()
    expect(destroy).toHaveBeenCalledWith('/profile', expect.any(Object))
  })

  it('submits sign-in and sign-up envelopes while exposing accessible errors', () => {
    formErrors = { credentials: 'E-mail ou senha inválidos.', email: 'inválido' }
    const { unmount } = render(<SignIn />)
    expect(screen.getByRole('alert')).toHaveTextContent('E-mail ou senha inválidos.')
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'ana@example.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'uma frase segura' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Entrar' }).closest('form')!)
    const signInOptions = post.mock.calls.at(-1)?.[1] as { onError: () => void }
    signInOptions.onError()
    expect(transform).toHaveBeenCalled()
    expect(post).toHaveBeenCalledWith('/session', expect.any(Object))
    unmount()

    formErrors = { password_confirmation: 'não confere' }
    render(<SignUp />)
    fireEvent.change(screen.getByLabelText('Nome completo'), { target: { value: 'Ana Silva' } })
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'ana@example.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'uma frase segura' } })
    fireEvent.change(screen.getByLabelText('Confirmar senha'), { target: { value: 'uma frase segura' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Criar conta' }).closest('form')!)
    const signUpOptions = post.mock.calls.at(-1)?.[1] as { onError: () => void }
    signUpOptions.onError()
    expect(post).toHaveBeenCalledWith('/sign-up', expect.any(Object))
  })

  it('renders and submits profile show and edit states', () => {
    const { unmount } = render(<ProfileShow profile={regular} permissions={{ edit: true, destroy: true }} />)
    expect(screen.getByRole('link', { name: 'Editar perfil' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Excluir minha conta' })).toBeVisible()
    unmount()

    formErrors = { avatar: 'arquivo inválido' }
    render(<ProfileEdit profile={admin} />)
    fireEvent.change(screen.getByLabelText('Nome completo'), { target: { value: 'Novo nome' } })
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'novo@example.com' } })
    fireEvent.change(screen.getByLabelText('Avatar'), { target: { files: [new File(['image'], 'avatar.png', { type: 'image/png' })] } })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByRole('button', { name: 'Salvar alterações' }).closest('form')!)
    const profileOptions = patch.mock.calls.at(-1)?.[1] as { onError: () => void }
    profileOptions.onError()
    expect(patch).toHaveBeenCalledWith('/profile', expect.any(Object))
  })

  it('renders admin lists, forms and destructive permissions', () => {
    const row = { ...admin, permissions: { edit: true, destroy: true, changeRole: true } }
    const { unmount } = render(<UsersIndex users={[row, { ...row, id: '3', avatarUrl: null, permissions: { edit: true, destroy: false, changeRole: false } }]} />)
    expect(screen.getByRole('table')).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'Editar' })).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: /Excluir Admin Umanni/ })).toHaveLength(1)
    unmount()

    render(<AdminUserForm roleOptions={roleOptions} />)
    fireEvent.change(screen.getByLabelText('Nome completo'), { target: { value: 'Bruno Lima' } })
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'bruno@example.com' } })
    fireEvent.change(screen.getByLabelText('Papel'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Senha inicial'), { target: { value: 'senha inicial segura' } })
    fireEvent.change(screen.getByLabelText('Confirmar senha inicial'), { target: { value: 'senha inicial segura' } })
    fireEvent.change(screen.getByLabelText('Avatar opcional'), { target: { files: [new File(['image'], 'avatar.webp', { type: 'image/webp' })] } })
    fireEvent.submit(screen.getByRole('button', { name: 'Criar usuário' }).closest('form')!)
    const createOptions = post.mock.calls.at(-1)?.[1] as { onError: () => void }
    createOptions.onError()
    expect(post).toHaveBeenCalledWith('/admin/users', expect.any(Object))
  })

  it('renders the new and edit admin pages and submits an edit without password fields', () => {
    const { unmount } = render(<NewUser roleOptions={roleOptions} />)
    expect(screen.getByRole('heading', { name: 'Adicionar pessoa' })).toBeVisible()
    unmount()

    render(<EditUser user={admin} roleOptions={roleOptions} permissions={{ edit: true, destroy: true, changeRole: true }} />)
    fireEvent.change(screen.getByLabelText('Avatar opcional'), { target: { files: [] } })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByRole('button', { name: 'Salvar alterações' }).closest('form')!)
    const editOptions = patch.mock.calls.at(-1)?.[1] as { onError: () => void }
    editOptions.onError()
    expect(patch).toHaveBeenCalledWith('/admin/users/2', expect.any(Object))
    expect(screen.getByText('Zona de atenção')).toBeVisible()
  })
})

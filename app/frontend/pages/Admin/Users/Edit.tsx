import { Head, useForm } from '@inertiajs/react'
import AdminUserForm from '../../../components/AdminUserForm'
import DeletionDialog from '../../../components/DeletionDialog'
import Field from '../../../components/Field'
import type { Role, UserPermissions, UserView } from '../../../types'

type EditableUser = UserView & { passwordConfigured?: boolean }

export default function EditUser({ user, roleOptions, permissions }: { user: EditableUser; roleOptions: { value: Role; label: string }[]; permissions: UserPermissions }) {
  return <section className="page-section form-page"><Head title={`Editar ${user.fullName} · Umanni`} /><div className="eyebrow">Administração</div><h1>Editar pessoa</h1><AdminUserForm user={user} roleOptions={roleOptions} canChangeRole={permissions.changeRole} />{user.passwordConfigured === false && <InitialPasswordForm userId={user.id} />}{permissions.destroy && <div className="danger-zone"><h2>Zona de atenção</h2><DeletionDialog action={`/admin/users/${user.id}`} label={`Excluir ${user.fullName}`} /></div>}</section>
}

function InitialPasswordForm({ userId }: { userId: string }) {
  const form = useForm({ password: '', password_confirmation: '' })
  function submit(event: React.FormEvent) {
    event.preventDefault()
    form.transform(data => ({ initial_password: data }))
    form.post(`/admin/users/${userId}/initial_password`, { onError: () => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus() })
  }
  return <section className="danger-zone"><h2>Definir senha inicial</h2><p>Esta ação só está disponível enquanto a conta não possui credencial.</p><form onSubmit={submit} noValidate aria-label="Definir senha inicial"><Field label="Senha inicial para acesso" name="password" type="password" autoComplete="new-password" value={form.data.password} onChange={event => form.setData('password', event.target.value)} error={form.errors.password} required /><Field label="Confirmar senha inicial para acesso" name="password_confirmation" type="password" autoComplete="new-password" value={form.data.password_confirmation} onChange={event => form.setData('password_confirmation', event.target.value)} error={form.errors.password_confirmation} required /><button className="primary-button" disabled={form.processing}>Definir senha inicial</button></form></section>
}

import { Link, useForm } from '@inertiajs/react'
import Field from './Field'
import type { Role, UserView } from '../types'

type RoleOption = { value: Role; label: string }

export default function AdminUserForm({ user, roleOptions }: { user?: UserView; roleOptions: RoleOption[] }) {
  const creating = !user
  const form = useForm({ full_name: user?.fullName ?? '', email: user?.email ?? '', role: user?.role ?? 'regular' as Role, password: '', password_confirmation: '', avatar: null as File | null, remove_avatar: '0' as '0' | '1' })
  function submit(event: React.FormEvent) {
    event.preventDefault()
    const options = { forceFormData: true, onError: () => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus() }
    if (creating) {
      form.transform(data => ({ admin_user: data }))
      form.post('/admin/users', options)
    } else {
      form.transform(data => ({ admin_user: { full_name: data.full_name, email: data.email, role: data.role, avatar: data.avatar, remove_avatar: data.remove_avatar } }))
      form.patch(`/admin/users/${user.id}`, options)
    }
  }
  return (
    <form onSubmit={submit} noValidate>
      <Field label="Nome completo" name="full_name" value={form.data.full_name} onChange={event => form.setData('full_name', event.target.value)} error={form.errors.full_name} required />
      <Field label="E-mail" name="email" type="email" value={form.data.email} onChange={event => form.setData('email', event.target.value)} error={form.errors.email} required />
      <div className="field"><label htmlFor="role">Papel</label><select id="role" name="role" value={form.data.role} onChange={event => form.setData('role', event.target.value as Role)} aria-invalid={form.errors.role ? true : undefined}>{roleOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{form.errors.role && <p className="field-error" id="role-error">{form.errors.role}</p>}</div>
      {creating && <><Field label="Senha inicial" name="password" type="password" autoComplete="new-password" value={form.data.password} onChange={event => form.setData('password', event.target.value)} error={form.errors.password} required /><Field label="Confirmar senha inicial" name="password_confirmation" type="password" autoComplete="new-password" value={form.data.password_confirmation} onChange={event => form.setData('password_confirmation', event.target.value)} error={form.errors.password_confirmation} required /></>}
      <div className="field"><label htmlFor="avatar">Avatar opcional</label><input id="avatar" name="avatar" type="file" accept="image/jpeg,image/png,image/webp" onChange={event => form.setData('avatar', event.target.files?.[0] ?? null)} aria-invalid={form.errors.avatar ? true : undefined} />{form.errors.avatar && <p className="field-error" id="avatar-error">{form.errors.avatar}</p>}</div>
      {!creating && user.avatarUrl && <label className="check-row"><input type="checkbox" checked={form.data.remove_avatar === '1'} onChange={event => form.setData('remove_avatar', event.target.checked ? '1' : '0')} /> Remover avatar atual</label>}
      <div className="action-row"><button className="primary-button" disabled={form.processing}>{creating ? 'Criar usuário' : 'Salvar alterações'}</button><Link href="/admin/users" className="secondary-button">Cancelar</Link></div>
    </form>
  )
}

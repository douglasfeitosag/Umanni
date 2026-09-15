import { Head, Link, useForm } from '@inertiajs/react'
import Field from '../../components/Field'
import type { UserView } from '../../types'

export default function ProfileEdit({ profile }: { profile: UserView }) {
  const form = useForm<{ full_name: string; email: string; avatar: File | null; remove_avatar: '0' | '1' }>({ full_name: profile.fullName, email: profile.email, avatar: null, remove_avatar: '0' })
  function submit(event: React.FormEvent) {
    event.preventDefault()
    form.transform(data => ({ profile: data }))
    form.patch('/profile', { forceFormData: true, onError: () => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus() })
  }
  return (
    <section className="page-section form-page">
      <Head title="Editar perfil · Umanni" />
      <div className="eyebrow">Conta pessoal</div><h1>Editar perfil</h1>
      <form onSubmit={submit} noValidate>
        <Field label="Nome completo" name="full_name" value={form.data.full_name} onChange={event => form.setData('full_name', event.target.value)} error={form.errors.full_name} required />
        <Field label="E-mail" name="email" type="email" value={form.data.email} onChange={event => form.setData('email', event.target.value)} error={form.errors.email} required />
        <div className="field"><label htmlFor="role">Papel</label><input id="role" value={profile.role === 'admin' ? 'Administrador' : 'Usuário regular'} readOnly /></div>
        <div className="field"><label htmlFor="avatar">Avatar</label><input id="avatar" name="avatar" type="file" accept="image/jpeg,image/png,image/webp" onChange={event => form.setData('avatar', event.target.files?.[0] ?? null)} aria-invalid={form.errors.avatar ? true : undefined} aria-describedby={form.errors.avatar ? 'avatar-error' : 'avatar-help'} /><p id="avatar-help" className="field-hint">JPEG, PNG ou WebP de até 5 MiB.</p>{form.errors.avatar && <p id="avatar-error" className="field-error">{form.errors.avatar}</p>}</div>
        {profile.avatarUrl && <label className="check-row"><input type="checkbox" checked={form.data.remove_avatar === '1'} onChange={event => form.setData('remove_avatar', event.target.checked ? '1' : '0')} /> Remover avatar atual</label>}
        <div className="action-row"><button className="primary-button" disabled={form.processing}>Salvar alterações</button><Link href="/profile" className="secondary-button">Cancelar</Link></div>
      </form>
    </section>
  )
}

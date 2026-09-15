import { Head, Link, useForm } from '@inertiajs/react'
import Field from '../../components/Field'

export default function SignUp() {
  const form = useForm({ full_name: '', email: '', password: '', password_confirmation: '' })
  function submit(event: React.FormEvent) {
    event.preventDefault()
    form.transform(data => ({ registration: data }))
    form.post('/sign-up', { onError: () => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus() })
  }

  return (
    <section className="auth-panel">
      <Head title="Criar conta · Umanni" />
      <div className="eyebrow">Comece por aqui</div>
      <h1>Crie sua conta</h1>
      <p className="lede">Seu espaço pessoal para manter seus dados organizados e atualizados.</p>
      <form onSubmit={submit} noValidate>
        <Field label="Nome completo" name="full_name" autoComplete="name" value={form.data.full_name} onChange={event => form.setData('full_name', event.target.value)} error={form.errors.full_name} required />
        <Field label="E-mail" name="email" type="email" autoComplete="email" value={form.data.email} onChange={event => form.setData('email', event.target.value)} error={form.errors.email} required />
        <Field label="Senha" name="password" type="password" autoComplete="new-password" value={form.data.password} onChange={event => form.setData('password', event.target.value)} error={form.errors.password} minLength={12} required />
        <p className="field-hint">Use pelo menos 12 caracteres. Espaços são permitidos.</p>
        <Field label="Confirmar senha" name="password_confirmation" type="password" autoComplete="new-password" value={form.data.password_confirmation} onChange={event => form.setData('password_confirmation', event.target.value)} error={form.errors.password_confirmation} required />
        <button className="primary-button full-button" disabled={form.processing}>{form.processing ? 'Criando conta…' : 'Criar conta'}</button>
      </form>
      <p className="auth-switch">Já tem uma conta? <Link href="/sign-in">Entrar</Link></p>
    </section>
  )
}

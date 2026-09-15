import { Head, Link, useForm } from '@inertiajs/react'
import Field from '../../components/Field'

export default function SignIn() {
  const form = useForm({ email: '', password: '' })
  const credentialError = (form.errors as Record<string, string>).credentials
  function submit(event: React.FormEvent) {
    event.preventDefault()
    form.transform(data => ({ session: data }))
    form.post('/session', { onError: () => document.querySelector<HTMLInputElement>('#email')?.focus() })
  }

  return (
    <section className="auth-panel">
      <Head title="Entrar · Umanni" />
      <div className="eyebrow">Bem-vindo de volta</div>
      <h1>Entre na sua conta</h1>
      <p className="lede">Acesse seu perfil ou o painel administrativo.</p>
      {credentialError && <div className="form-summary" role="alert">{credentialError}</div>}
      <form onSubmit={submit} noValidate>
        <Field label="E-mail" name="email" type="email" autoComplete="username" value={form.data.email} onChange={event => form.setData('email', event.target.value)} error={form.errors.email} autoFocus required />
        <Field label="Senha" name="password" type="password" autoComplete="current-password" value={form.data.password} onChange={event => form.setData('password', event.target.value)} error={form.errors.password} required />
        <button className="primary-button full-button" disabled={form.processing}>{form.processing ? 'Entrando…' : 'Entrar'}</button>
      </form>
      <p className="auth-switch">Ainda não tem conta? <Link href="/sign-up">Cadastre-se</Link></p>
    </section>
  )
}

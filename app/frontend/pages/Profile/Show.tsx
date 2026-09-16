import { Head, Link } from '@inertiajs/react'
import Avatar from '../../components/Avatar'
import DeletionDialog from '../../components/DeletionDialog'
import type { UserView } from '../../types'

export default function ProfileShow({ profile, permissions }: { profile: UserView; permissions: { edit: boolean; destroy: boolean } }) {
  return (
    <section className="page-section narrow-page">
      <Head title="Meu perfil · Umanni" />
      <div className="eyebrow">Conta pessoal</div><h1>Meu perfil</h1>
      <article className="profile-card">
        <Avatar user={profile} size="large" />
        <div><h2>{profile.fullName}</h2><p>{profile.email}</p><span className="role-pill">{profile.role === 'admin' ? 'Administrador' : 'Usuário regular'}</span></div>
      </article>
      <div className="action-row">
        {permissions.edit && <Link href="/profile/edit" className="primary-button">Editar perfil</Link>}
        {permissions.destroy && <DeletionDialog action="/profile" label="Excluir minha conta" />}
      </div>
    </section>
  )
}

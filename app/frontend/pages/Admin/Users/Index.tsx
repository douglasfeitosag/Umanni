import { Head, Link } from '@inertiajs/react'
import Avatar from '../../../components/Avatar'
import DeletionDialog from '../../../components/DeletionDialog'
import type { UserPermissions, UserView } from '../../../types'

type Row = UserView & { permissions: UserPermissions }

export default function UsersIndex({ users }: { users: Row[] }) {
  return (
    <section className="page-section">
      <Head title="Pessoas · Umanni" />
      <div className="page-heading"><div><div className="eyebrow">Administração</div><h1>Pessoas</h1><p>{users.length} {users.length === 1 ? 'conta cadastrada' : 'contas cadastradas'}</p></div><Link href="/admin/users/new" className="primary-button">Adicionar pessoa</Link></div>
      <div className="user-table" role="table" aria-label="Pessoas cadastradas">
        <div className="table-head" role="row"><span>Nome</span><span>Papel</span><span>Ações</span></div>
        {users.map(user => <article className="user-row" role="row" key={user.id}>
          <div className="user-identity" role="cell"><Avatar user={user} /><span><strong>{user.fullName}</strong><small>{user.email}</small></span></div>
          <div role="cell"><span className="role-pill">{user.role === 'admin' ? 'Administrador' : 'Usuário regular'}</span></div>
          <div className="row-actions" role="cell"><Link href={`/admin/users/${user.id}/edit`} className="text-button">Editar</Link>{user.permissions.destroy && <DeletionDialog action={`/admin/users/${user.id}`} label={`Excluir ${user.fullName}`} />}</div>
        </article>)}
      </div>
    </section>
  )
}

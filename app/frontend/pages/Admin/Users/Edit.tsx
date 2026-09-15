import { Head } from '@inertiajs/react'
import AdminUserForm from '../../../components/AdminUserForm'
import DeletionDialog from '../../../components/DeletionDialog'
import type { Role, UserPermissions, UserView } from '../../../types'

export default function EditUser({ user, roleOptions, permissions }: { user: UserView; roleOptions: { value: Role; label: string }[]; permissions: UserPermissions }) {
  return <section className="page-section form-page"><Head title={`Editar ${user.fullName} · Umanni`} /><div className="eyebrow">Administração</div><h1>Editar pessoa</h1><AdminUserForm user={user} roleOptions={roleOptions} />{permissions.destroy && <div className="danger-zone"><h2>Zona de atenção</h2><DeletionDialog action={`/admin/users/${user.id}`} label={`Excluir ${user.fullName}`} /></div>}</section>
}

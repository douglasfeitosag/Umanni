import { Head } from '@inertiajs/react'
import AdminUserForm from '../../../components/AdminUserForm'
import type { Role } from '../../../types'

export default function NewUser({ roleOptions }: { roleOptions: { value: Role; label: string }[] }) {
  return <section className="page-section form-page"><Head title="Adicionar pessoa · Umanni" /><div className="eyebrow">Administração</div><h1>Adicionar pessoa</h1><p className="lede">Defina os dados e a senha inicial da nova conta.</p><AdminUserForm roleOptions={roleOptions} /></section>
}

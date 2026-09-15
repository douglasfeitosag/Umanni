import { Link } from '@inertiajs/react'
import type { FoundationPageProps } from '../../types'

export default function Show({ app }: FoundationPageProps) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-4xl font-bold text-sky-950">{app.name}</h1>
      <p className="mt-4 text-lg">Versão {app.version}</p>
      <p className="mt-6">Fundação técnica. Cadastro, login e gestão de usuários ainda não estão disponíveis.</p>
      <Link href="/" className="mt-8 inline-block font-semibold underline">Recarregar página</Link>
    </main>
  )
}

import { Head, Link, useForm } from '@inertiajs/react'
import { importStatusLabel } from './status'

type Import = { id: string; filename: string; status: string; totalCount: number; processedCount: number; createdCount: number; rejectedCount: number; createdAt: string }

export default function UserImportsIndex({ imports, errors = {} }: { imports: Import[]; errors?: { sourceFile?: string } }) {
  const form = useForm({ source_file: null as File | null })
  function submit(event: React.FormEvent) {
    event.preventDefault()
    form.transform(data => ({ user_import: data }))
    form.post('/admin/user_imports', { forceFormData: true, onError: () => document.querySelector<HTMLInputElement>('#source_file')?.focus() })
  }
  return <section className="page-section">
    <Head title="Importar pessoas · Umanni" />
    <div className="page-heading">
      <div>
        <div className="eyebrow">Administração</div>
        <h1>Importar pessoas</h1>
        <p>Envie um CSV UTF-8 ou XLSX com as colunas full_name, email e role.</p>
      </div>
    </div>
    <section aria-labelledby="import-upload-heading" className="import-upload" data-testid="import-upload">
      <h2 id="import-upload-heading">Enviar arquivo para importação</h2>
      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="source_file">Arquivo de importação</label>
          <input id="source_file" type="file" accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={event => form.setData('source_file', event.target.files?.[0] ?? null)} aria-invalid={(errors.sourceFile || form.errors.source_file) ? true : undefined} aria-describedby="source-file-hint" required />
          <p className="field-hint" id="source-file-hint">Máximo de 10 MiB e 10.000 linhas. O processamento ocorre em segundo plano.</p>
          {(errors.sourceFile || form.errors.source_file) && <p className="field-error">{errors.sourceFile || form.errors.source_file}</p>}
        </div>
        <button className="primary-button" disabled={form.processing}>{form.processing ? 'Enviando…' : 'Enviar para importação'}</button>
      </form>
    </section>
    <section aria-labelledby="import-history-heading" className="import-history" data-testid="import-history">
      <h2 id="import-history-heading">Histórico</h2>
      <div className="user-table" role="table" aria-label="Importações">
        <div className="table-head" role="row"><span>Arquivo</span><span>Progresso</span><span>Estado</span></div>
        {imports.map(item => <article className="user-row" role="row" key={item.id}><div role="cell"><Link href={`/admin/user_imports/${item.id}`}>{item.filename}</Link><small>{new Date(item.createdAt).toLocaleString('pt-BR')}</small></div><div role="cell">{item.processedCount} de {item.totalCount}</div><div role="cell"><span className="role-pill">{importStatusLabel(item.status)}</span></div></article>)}
      </div>
    </section>
  </section>
}

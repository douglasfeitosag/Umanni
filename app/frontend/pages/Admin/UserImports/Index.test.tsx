import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import UserImportsIndex from './Index'

const setData = vi.fn()
const setError = vi.fn()
const clearErrors = vi.fn()
const transform = vi.fn()
const post = vi.fn()
const form = { data: { source_file: null as File | null }, errors: {} as Record<string, string>, processing: false, setData, setError, clearErrors, transform, post }

vi.mock('@inertiajs/react', () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
  useForm: vi.fn(() => form),
}))

describe('UserImportsIndex', () => {
  afterEach(() => {
    form.data.source_file = null
    form.errors = {}
    vi.clearAllMocks()
  })

  it('lets an administrator select and submit a CSV while showing import history', () => {
    render(<UserImportsIndex imports={[{ id: '8', filename: 'people.csv', status: 'queued', totalCount: 2, processedCount: 0, createdCount: 0, rejectedCount: 0, createdAt: '2026-09-16T12:00:00Z' }]} />)

    fireEvent.change(screen.getByLabelText('Arquivo de importação'), { target: { files: [new File(['name,email'], 'people.csv', { type: 'text/csv' })] } })
    form.data.source_file = new File(['name,email'], 'people.csv', { type: 'text/csv' })
    fireEvent.submit(screen.getByRole('button', { name: 'Enviar para importação' }).closest('form')!)

    expect(setData).toHaveBeenCalledWith('source_file', expect.any(File))
    expect(transform).toHaveBeenCalledOnce()
    expect(post).toHaveBeenCalledWith('/admin/user_imports', expect.objectContaining({ forceFormData: true }))
    expect(screen.getByRole('link', { name: 'people.csv' })).toHaveAttribute('href', '/admin/user_imports/8')
    expect(screen.getByRole('table', { name: 'Importações' })).toHaveTextContent('0 de 2')
  })

  it('renders a safe upload error returned by the server', () => {
    render(<UserImportsIndex imports={[]} errors={{ sourceFile: 'Use os cabeçalhos full_name, email e role.' }} />)

    expect(screen.getByText('Use os cabeçalhos full_name, email e role.')).toBeVisible()
    expect(screen.getByLabelText('Arquivo de importação')).toHaveAttribute('aria-invalid', 'true')
  })

  it('keeps a missing file in the browser and associates the error with the input', () => {
    render(<UserImportsIndex imports={[]} />)

    fireEvent.submit(screen.getByRole('button', { name: 'Enviar para importação' }).closest('form')!)

    expect(setError).toHaveBeenCalledWith('source_file', 'Selecione um arquivo CSV ou XLSX.')
    expect(post).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Arquivo de importação')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Arquivo de importação')).toHaveAttribute('aria-describedby', 'source-file-hint source-file-error')
    expect(screen.getByText('Selecione um arquivo CSV ou XLSX.')).toHaveAttribute('id', 'source-file-error')

    fireEvent.change(screen.getByLabelText('Arquivo de importação'), { target: { files: [new File(['full_name,email,role'], 'people.csv', { type: 'text/csv' })] } })

    expect(clearErrors).toHaveBeenCalledWith('source_file')
    expect(screen.queryByText('Selecione um arquivo CSV ou XLSX.')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Arquivo de importação')).not.toHaveAttribute('aria-invalid')
  })

  it('keeps the upload action and import history in separate labelled regions', () => {
    render(<UserImportsIndex imports={[]} />)

    expect(screen.getByRole('region', { name: 'Enviar arquivo para importação' })).toHaveClass('import-upload')
    expect(screen.getByRole('heading', { name: 'Histórico' }).closest('section')).toHaveClass('import-history')
  })

  it('translates every persisted import status for the Portuguese interface', () => {
    const imports = ['queued', 'processing', 'completed', 'completed_with_errors', 'failed'].map((status, index) => ({ id: String(index), filename: `${status}.csv`, status, totalCount: 1, processedCount: 1, createdCount: 1, rejectedCount: 0, createdAt: '2026-09-16T12:00:00Z' }))
    render(<UserImportsIndex imports={imports} />)

    expect(screen.getByRole('table', { name: 'Importações' })).toHaveTextContent('Na fila')
    expect(screen.getByRole('table', { name: 'Importações' })).toHaveTextContent('Processando')
    expect(screen.getByRole('table', { name: 'Importações' })).toHaveTextContent('Concluída')
    expect(screen.getByRole('table', { name: 'Importações' })).toHaveTextContent('Concluída com erros')
    expect(screen.getByRole('table', { name: 'Importações' })).toHaveTextContent('Falhou')
  })
})

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import UserImportsIndex from './Index'

const setData = vi.fn()
const transform = vi.fn()
const post = vi.fn()

vi.mock('@inertiajs/react', () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
  useForm: vi.fn(() => ({ source_file: null, errors: {}, processing: false, setData, transform, post })),
}))

describe('UserImportsIndex', () => {
  it('lets an administrator select and submit a CSV while showing import history', () => {
    render(<UserImportsIndex imports={[{ id: '8', filename: 'people.csv', status: 'queued', totalCount: 2, processedCount: 0, createdCount: 0, rejectedCount: 0, createdAt: '2026-09-16T12:00:00Z' }]} />)

    fireEvent.change(screen.getByLabelText('Arquivo de importação'), { target: { files: [new File(['name,email'], 'people.csv', { type: 'text/csv' })] } })
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
})

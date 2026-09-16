import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import AppLayout from '../components/AppLayout'
import '../styles/application.css'

const pages = import.meta.glob(['../pages/**/*.tsx', '!../pages/**/*.test.tsx'], { eager: true }) as Record<string, { default: React.ComponentType & { layout?: (page: React.ReactNode) => React.ReactNode } }>

void createInertiaApp({
  resolve: name => {
    const page = pages[`../pages/${name}.tsx`]?.default
    if (!page) throw new Error(`Unknown Inertia page: ${name}`)
    page.layout ??= pageNode => <AppLayout>{pageNode}</AppLayout>
    return page
  },
  nonce: document.querySelector<HTMLMetaElement>('meta[name="csp-nonce"]')?.content,
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

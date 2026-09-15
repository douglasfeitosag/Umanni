import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Show from '../pages/Foundation/Show'
import '../styles/application.css'

void createInertiaApp({
  resolve: () => Show,
  nonce: document.querySelector<HTMLMetaElement>('meta[name="csp-nonce"]')?.content,
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

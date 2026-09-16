import { Head } from '@inertiajs/react'
import { useEffect, useRef, type ReactNode } from 'react'
import logoUrl from '../../../../branding/assets/logo/umanni-horizontal.svg'

type ErrorPageProps = { status: number }

function ErrorPage({ status }: ErrorPageProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <>
      <Head title="Não foi possível concluir · Umanni" />
      <main className="error-shell" id="main-content" data-error-status={status}>
        <section className="error-panel" aria-labelledby="error-title">
          <img className="error-logo" src={logoUrl} alt="Umanni" />
          <p className="eyebrow">Algo não saiu como esperado</p>
          <h1 id="error-title" ref={headingRef} tabIndex={-1}>Não foi possível concluir</h1>
          <p className="lede">Não conseguimos concluir esta ação. Volte ao início para continuar com segurança.</p>
          <a className="primary-button error-action" href="/">Voltar ao início</a>
        </section>
      </main>
    </>
  )
}

ErrorPage.layout = (page: ReactNode) => page

export default ErrorPage

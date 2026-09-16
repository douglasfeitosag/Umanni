import { Link, usePage } from '@inertiajs/react'
import { useEffect, useRef, type PropsWithChildren } from 'react'
import type { SharedProps } from '../types'
import logoUrl from '../../../branding/assets/logo/umanni-horizontal.svg'

export default function AppLayout({ children }: PropsWithChildren) {
  const page = usePage<SharedProps>()
  const { auth, flash } = page.props
  const previousUrl = useRef(page.url)

  useEffect(() => {
    if (previousUrl.current === page.url) return

    previousUrl.current = page.url
    requestAnimationFrame(() => {
      const main = document.querySelector<HTMLElement>('#main-content')
      const heading = main?.querySelector<HTMLElement>('h1')
      const target = heading ?? main
      target?.setAttribute('tabindex', '-1')
      target?.focus()
    })
  }, [page.url])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <header className="site-header">
        <Link href={auth.user?.role === 'admin' ? '/admin/dashboard' : auth.user ? '/profile' : '/sign-in'} aria-label="Umanni — início">
          <img className="brand-logo" src={logoUrl} alt="Umanni" />
        </Link>
        {auth.user && (
          <nav aria-label="Navegação principal">
            {auth.user.role === 'admin' && <Link href="/admin/dashboard">Visão geral</Link>}
            {auth.user.role === 'admin' && <Link href="/admin/users">Pessoas</Link>}
            {auth.user.role === 'admin' && <Link href="/admin/user_imports">Importações</Link>}
            <Link href="/profile">Meu perfil</Link>
            <Link as="button" href="/session" method="delete" className="quiet-button">Sair</Link>
          </nav>
        )}
      </header>
      {(flash.notice || flash.alert) && <div className={`flash ${flash.alert ? 'flash-error' : ''}`} role="status">{flash.alert || flash.notice}</div>}
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer>Umanni · Gestão humana com clareza.</footer>
    </div>
  )
}

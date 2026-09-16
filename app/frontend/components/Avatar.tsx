import type { UserView } from '../types'

export default function Avatar({ user, size = 'normal' }: { user: UserView; size?: 'normal' | 'large' }) {
  const initials = user.fullName.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase()
  return user.avatarUrl
    ? <img className={`avatar avatar-${size}`} src={user.avatarUrl} alt={`Avatar de ${user.fullName}`} />
    : <span className={`avatar avatar-${size} avatar-fallback`} role="img" aria-label={`Iniciais de ${user.fullName}`}>{initials || 'U'}</span>
}

import { ArrowDownCircle, ArrowLeftRight, ArrowUpCircle, Home, Users } from 'lucide-react'
import { NavItem } from './NavItem'
import { SidebarHeader } from './SidebarHeader'
import { UserSection } from './UserSection'
export function SidebarContent() {
  const navItems = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/users', icon: Users, label: 'Usuários' },
    { to: '/deposit', icon: ArrowDownCircle, label: 'Depósito' },
    { to: '/withdraw', icon: ArrowUpCircle, label: 'Saque' },
    { to: '/conversion', icon: ArrowLeftRight, label: 'Conversão' }
  ]

  return (
    <>
      <SidebarHeader />
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavItem key={to} to={to} icon={Icon} label={label} />
        ))}
      </nav>
      <UserSection />
    </>
  )
}

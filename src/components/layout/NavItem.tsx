import { NavLink } from 'react-router-dom'
import { useLayout } from '../../context/LayoutContext'
import type { LucideProps } from 'lucide-react'

type NavItemProps = {
  to: string
  icon: React.ComponentType<LucideProps>
  label: string
}

export function NavItem({ to, label, icon: Icon }: NavItemProps) {
  const { collapsed, setMobileOpen } = useLayout()
  return (
    <NavLink
      to={to}
      onClick={() => setMobileOpen(false)}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg text-sm font-medium transition-all
              ${collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'}
              ${
                isActive
                  ? 'bg-brand-red/10 text-brand-red border border-brand-red/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`
      }
    >
      <Icon size={17} className="shrink-0" />
      {!collapsed && label}
    </NavLink>
  )
}

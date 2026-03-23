import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLayout } from '../../context/LayoutContext'
import { Logo } from '../shared/Logo'

export function SidebarHeader() {
  const { collapsed, setCollapsed, setMobileOpen } = useLayout()
  return (
    <div className={`flex items-center border-b border-white/5 h-16 ${collapsed ? 'pl-3.25' : 'px-5'}`}>
      <div className={`flex items-center gap-2 flex-1 ${collapsed ? 'hidden' : ''}`}>
        {<Logo size="sm" />}
      </div>
      <button
        onClick={() => {
          setCollapsed(!collapsed)
          setMobileOpen(false)
        }}
        className="text-gray-500 hover:text-white transition-colors shrink-0 cursor-pointer hidden lg:block "
        title={collapsed ? 'Expandir' : 'Recolher'}
      >
        {collapsed ? (
          <div className="flex items-center">
            <img className="w-8 shrink-0" src="/favicon.png" alt="" /> <ChevronRight size={22} />
          </div>
        ) : (
          <ChevronLeft size={22} />
        )}
      </button>
      <button
        onClick={() => setMobileOpen(false)}
        className={`text-gray-500 hover:text-white transition-colors cursor-pointer lg:hidden `}
      >
        <X size={18} />
      </button>
    </div>
  )
}

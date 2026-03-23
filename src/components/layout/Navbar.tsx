import { TextAlignJustify } from 'lucide-react'
import { Logo } from '../shared/Logo'
import { useLayout } from '../../context/LayoutContext'
import { SidebarContent } from './SidebarContent'

export function Navbar() {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useLayout()
  return (
    <>
      <aside
        className={`hidden lg:flex flex-col bg-brand-panel border-r border-white/5 transition-all duration-300 ${
          collapsed ? 'w-18' : 'w-64'
        }`}
      >
        <SidebarContent />
      </aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-brand-panel border-r border-white/5 z-50 flex flex-col lg:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      <div className="lg:hidden">
        <header className="flex items-center justify-between gap-3 px-4 h-14 bg-brand-panel border-b border-white/5 shrink-0">
          <Logo size="ssm" />
          <button
            onClick={() => {
              setMobileOpen(true)
              setCollapsed(false)
            }}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <TextAlignJustify size={22} strokeWidth={2.5} />
          </button>
        </header>
      </div>
    </>
  )
}

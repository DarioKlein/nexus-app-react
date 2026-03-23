import { LogOut } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useLayout } from '../../context/LayoutContext'

export function UserSection() {
  const { collapsed } = useLayout()
  const navigate = useNavigate()
  const { currentUser, logout } = useApp()

  function handleLogout() {
    logout()
    toast.success('Sessão encerrada.')
    navigate('/login')
  }

  const initials = currentUser?.name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="px-3 py-4 border-t border-white/5">
      <div className={`flex items-center gap-3 py-2.5 rounded-lg ${collapsed ? 'justify-center px-0' : 'px-3'}`}>
        <div
          className={`w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold shrink-0 ${collapsed ? 'hidden' : ''}`}
        >
          {initials}
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{currentUser?.name}</p>
              <p className="text-gray-500 text-xs truncate">{currentUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </>
        )}
        {collapsed && (
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-400 transition-colors absolute cursor-pointer pl-2"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

import { Users as UsersIcon } from 'lucide-react'
import { useUsers } from '../../context/UsersContext'

export function UsersHeader() {
  const { activeCount, blockedCount } = useUsers()

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-0 md:items-center">
      <div>
        <h1 className="text-white text-2xl font-bold flex items-center gap-3">
          <UsersIcon size={27} className="text-blue-400" />
          Gestão de Usuários
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Administre e monitore os perfis de acesso da plataforma Nexus.</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-emerald-400 text-xs font-medium">Ativos ({activeCount})</span>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-red-400 text-xs font-medium">Bloqueados ({blockedCount})</span>
        </div>
      </div>
    </div>
  )
}

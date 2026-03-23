import { MoreVertical } from 'lucide-react'
import type { UserStatus } from '../../types/data-types'
import { useUsers } from '../../context/UsersContext'

const STATUS_LABELS: Record<UserStatus, string> = {
  ACTIVE: 'Ativo',
  PENDING: 'Pendente',
  BLOCKED: 'Bloqueado'
}

const STATUS_COLORS: Record<UserStatus, string> = {
  ACTIVE: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  PENDING: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  BLOCKED: 'bg-red-500/15 text-red-400 border border-red-500/20'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 60) return `Há ${minutes} minutos`
  if (hours < 24) return `Há ${hours} horas`
  return `Há ${days} dias`
}

export function UsersTable() {
  const { paginated } = useUsers()

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-white/5">
          <th className="text-left text-gray-500 text-xs font-medium px-5 py-3">Nome</th>
          <th className="text-left text-gray-500 text-xs font-medium px-5 py-3 hidden md:table-cell">Email</th>
          <th className="text-left text-gray-500 text-xs font-medium px-5 py-3">Status</th>
          <th className="text-left text-gray-500 text-xs font-medium px-5 py-3 hidden lg:table-cell">Criado em</th>
          <th className="text-left text-gray-500 text-xs font-medium px-5 py-3 hidden lg:table-cell">
            Última atividade
          </th>
          <th className="text-left text-gray-500 text-xs font-medium px-5 py-3">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {paginated.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center text-gray-500 text-sm py-12">
              Nenhum usuário encontrado.
            </td>
          </tr>
        ) : (
          paginated.map(user => {
            const initials = user.name
              .split(' ')
              .slice(0, 2)
              .map(n => n[0])
              .join('')
              .toUpperCase()

            return (
              <tr key={user.id} className="hover:bg-white/2 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-red/80 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <span className="text-white text-sm font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <span className="text-gray-400 text-sm">{user.email}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${STATUS_COLORS[user.status]}`}>
                    {STATUS_LABELS[user.status]}
                  </span>
                </td>
                <td className="px-5 py-3 hidden lg:table-cell">
                  <span className="text-gray-400 text-sm">{formatDate(user.createdAt)}</span>
                </td>
                <td className="px-5 py-3 hidden lg:table-cell">
                  <span className="text-gray-400 text-sm">{timeAgo(user.lastActivity)}</span>
                </td>
                <td className="px-5 py-3">
                  <button className="text-gray-500 hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-white/5">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}

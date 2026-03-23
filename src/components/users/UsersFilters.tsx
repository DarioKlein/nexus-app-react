import { Search } from 'lucide-react'
import { useUsers, type StatusFilter } from '../../context/UsersContext'

const statusTabs: { label: string; value: StatusFilter }[] = [
  { label: 'Todos', value: 'ALL' },
  { label: 'Ativo', value: 'ACTIVE' },
  { label: 'Pendente', value: 'PENDING' },
  { label: 'Bloqueado', value: 'BLOCKED' }
]

export function UsersFilters() {
  const { search, statusFilter, handleSearch, handleStatusFilter } = useUsers()

  return (
    <div className="bg-[#161616] border border-white/5 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="relative flex-1 w-full">
        <Search size={14} className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="w-full bg-transparent pl-6 sm:pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-500 outline-none"
        />
      </div>
      <div className="flex gap-1.5 mt-2 md:mt-0 shrink-0 flex-col sm:flex-row sm:items-center">
        <span className="text-gray-500 text-xs mr-1">Status:</span>
        <div className='flex gap-1.5'>
          {statusTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => handleStatusFilter(tab.value)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                statusFilter === tab.value
                  ? 'bg-brand-red text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

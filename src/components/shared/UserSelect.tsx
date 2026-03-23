import type { User } from '../../types/data-types'

type Props = {
  users: User[]
  selectedUserId: number | null
  onChange: (id: number) => void
}

export function UserSelect({ users, selectedUserId, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Selecionar Usuário</label>
      <div className="relative">
        <select
          value={selectedUserId ?? ''}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer hover:border-white/20 transition-colors"
        >
          {users.map(u => (
            <option key={u.id} value={u.id} className="bg-[#161616]">
              {u.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">▾</div>
      </div>
    </div>
  )
}

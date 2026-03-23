import { createContext, useContext } from 'react'
import type { mockUsers } from '../mocks/users'
import type { UserStatus } from '../types/data-types'

export type StatusFilter = UserStatus | 'ALL'

export interface UsersContextType {
  search: string
  statusFilter: StatusFilter
  page: number
  setPage: (p: number | ((prev: number) => number)) => void
  filtered: typeof mockUsers
  paginated: typeof mockUsers
  totalPages: number
  activeCount: number
  blockedCount: number
  itemsPerPage: number
  handleSearch: (value: string) => void
  handleStatusFilter: (status: StatusFilter) => void
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined)

export function useUsers() {
  const context = useContext(UsersContext)
  if (!context) throw new Error('useUsers deve ser usado dentro do UsersProvider')
  return context
}

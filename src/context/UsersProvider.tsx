import { useState, type ReactNode } from 'react'
import { UsersContext, type StatusFilter } from './UsersContext'
import { mockUsers } from '../mocks/users'

const ITEMS_PER_PAGE = 10

export function UsersProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [page, setPage] = useState(1)

  const filtered = mockUsers.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const activeCount = mockUsers.filter(u => u.status === 'ACTIVE').length
  const blockedCount = mockUsers.filter(u => u.status === 'BLOCKED').length

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleStatusFilter(status: StatusFilter) {
    setStatusFilter(status)
    setPage(1)
  }

  return (
    <UsersContext.Provider
      value={{
        search,
        statusFilter,
        page,
        setPage,
        filtered,
        paginated,
        totalPages,
        activeCount,
        blockedCount,
        itemsPerPage: ITEMS_PER_PAGE,
        handleSearch,
        handleStatusFilter
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

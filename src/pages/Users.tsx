import { UsersHeader } from '../components/users/UsersHeader'
import { UsersFilters } from '../components/users/UsersFilters'
import { UsersTable } from '../components/users/UsersTable'
import { UsersPagination } from '../components/users/UsersPagination'
import { UsersProvider } from '../context/UsersProvider'

export function Users() {
  return (
    <UsersProvider>
      <div className="p-6 space-y-6">
        <UsersHeader />
        <UsersFilters />
        <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
          <UsersTable />
          <UsersPagination />
        </div>
      </div>
    </UsersProvider>
  )
}

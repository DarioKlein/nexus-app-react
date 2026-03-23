import { createContext, useContext } from 'react'
import type { User } from '../types/data-types'

interface AppContextType {
  currentUser: User | null
  login: (user: User) => void
  logout: () => void
}

export const AppContext = createContext<AppContextType | null>(null)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp deve ser usado dentro do AppProvider')
  return context
}

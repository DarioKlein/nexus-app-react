import { useState } from 'react'
import { AppContext } from './AppContext'
import type { User } from '../types/data-types'

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser')
    return stored ? JSON.parse(stored) : null
  })

  function login(user: User) {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  function logout() {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  return <AppContext.Provider value={{ currentUser, login, logout }}>{children}</AppContext.Provider>
}

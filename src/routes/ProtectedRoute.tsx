import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

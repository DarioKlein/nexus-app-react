import { Navbar } from '../components/layout/Navbar'
import { LayoutProvider } from '../context/LayoutProvider'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <LayoutProvider>
      <div className="flex flex-col lg:flex-row h-screen bg-brand-background overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </LayoutProvider>
  )
}

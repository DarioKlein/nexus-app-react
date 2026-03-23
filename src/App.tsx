import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Users } from './pages/Users'
import { Deposit } from './pages/Deposit'
import { Withdraw } from './pages/Withdraw'
import { Conversion } from './pages/Conversion'

import { ProtectedRoute } from './routes/ProtectedRoute'
import { AppLayout } from './layouts/AppLayout'
import { DataProvider } from './context/DataProvider'
export function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <DataProvider>
                <AppLayout />
              </DataProvider>
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/conversion" element={<Conversion />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

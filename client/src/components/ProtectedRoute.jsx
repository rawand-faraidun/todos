import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const { loginState } = useContext(AuthContext)

  return loginState.isLogedIn ? <Outlet /> : <Navigate to="/auth" />
}

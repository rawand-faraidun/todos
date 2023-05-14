import { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import request from './request'

/**
 * auth context
 */
export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [loginState, setLoginState] = useState({ isLogedIn: false, token: null })
  const [cookie, setCookie, removeCookie] = useCookies(['token'])

  const login = token => {
    setLoginState({ isLogedIn: true, token })
    setCookie('token', token, { path: '/' })
  }

  const logout = () => {
    setLoginState({ isLogedIn: false, token: null })
    removeCookie('token', { path: '/' })
  }

  useEffect(() => {
    const token = cookie.token
    if (token) {
      request('/api/collections', { token: token })
        .then(res => {
          setLoginState({ isLogedIn: true, token })
        })
        .catch(err => {
          removeCookie('token', { path: '/' })
        })
    }
    setLoading(false)
  }, [])

  return loading ? null : <AuthContext.Provider value={{ loginState, login, logout }}>{children}</AuthContext.Provider>
}

import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export default function Logout() {
  const { logout } = useContext(AuthContext)

  const handleLogout = () => logout()

  return (
    <div className="fixed top-6 right-6">
      <button
        className="p-2.5 text-white bg-rose-500 hover:bg-rose-700 outline-none rounded-md shadow-md transition duration-200"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </button>
    </div>
  )
}

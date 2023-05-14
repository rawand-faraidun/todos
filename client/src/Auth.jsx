import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './components/AuthContext'
import Dialog from './components/Dialog'
import request from './components/request'

export default function Auth() {
  const navigate = useNavigate()
  const { loginState, login: loginStateHandler } = useContext(AuthContext)
  const [login, setLogin] = useState({ username: '', password: '' })
  const [register, setRegister] = useState({ username: '', password: '' })
  const [showRegistered, setShowRegistered] = useState(false)

  // handle login
  const handleLogin = async e => {
    e.preventDefault()
    try {
      const { data } = await request('/api/auth/login', {
        method: 'POST',
        data: { username: login.username, password: login.password }
      })
      loginStateHandler(data.data.token)
    } catch (err) {
      console.log(err)
    }
  }

  // handle register
  const handleRegister = async e => {
    e.preventDefault()
    try {
      const { data } = await request('/api/auth/register', {
        method: 'POST',
        data: { username: register.username, password: register.password }
      })
      setShowRegistered(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (loginState.isLogedIn) navigate('/')
  })

  return (
    <>
      <div className="p-6 w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-teal-500 to-cyan-700">
        {/* auth main */}
        <main className="p-4 w-full max-w-xl bg-white rounded-lg shadow-md">
          {/* title */}
          <h1 className="text-2xl font-bold">Login to my todos</h1>

          <hr className="my-4 border-gray-700" />

          {/* login form */}
          <form onSubmit={handleLogin}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <input
                  type="text"
                  className="p-2.5 w-full border-2 hover:border-teal-500 focus:border-teal-500 rounded-md outline-none transition duration-200"
                  id="login-username"
                  name="login-username"
                  placeholder="Username"
                  value={login.username}
                  onChange={e => setLogin({ ...login, username: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  type="password"
                  className="p-2.5 w-full border-2 hover:border-teal-500 focus:border-teal-500 rounded-md outline-none transition duration-200"
                  id="login-password"
                  name="login-password"
                  placeholder="Password"
                  value={login.password}
                  onChange={e => setLogin({ ...login, password: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="p-2.5 w-full max-w-[10rem] text-white bg-teal-500 hover:bg-teal-700 rounded-md outline-none transition duration-200"
                >
                  Login
                </button>
              </div>
            </div>
          </form>

          <hr className="my-8 border-gray-700" />

          {/* register form */}
          <form onSubmit={handleRegister}>
            <h4 className="mb-4 text-xl font-bold">Register</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <input
                  type="text"
                  className="p-2.5 w-full border-2 hover:border-teal-500 focus:border-teal-500 rounded-md outline-none transition duration-200"
                  id="register-username"
                  name="register-username"
                  placeholder="Username"
                  value={register.username}
                  onChange={e => setRegister({ ...register, username: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  type="password"
                  className="p-2.5 w-full border-2 hover:border-teal-500 focus:border-teal-500 rounded-md outline-none transition duration-200"
                  id="register-password"
                  name="register-password"
                  placeholder="Password"
                  value={register.password}
                  onChange={e => setRegister({ ...register, password: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="p-2.5 w-full max-w-[10rem] text-white bg-yellow-500 hover:bg-yellow-700 rounded-md outline-none transition duration-200"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>

      {/* registered */}
      <Dialog
        show={showRegistered}
        onClose={() => setShowRegistered(false)}
        header="Registered successfully"
        body="Registered successfully, you can login now"
      />
    </>
  )
}

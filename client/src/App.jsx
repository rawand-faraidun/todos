import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthProvider from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './Home'
import Page from './Page'
import Auth from './Auth'
import Logout from './components/Logout'

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Logout />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/:id" element={<ProtectedRoute />}>
              <Route path="/:id" element={<Page />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App

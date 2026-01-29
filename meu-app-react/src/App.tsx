import { useState, useEffect } from 'react'
import Login from './components/Login'
import DashboardRouter from './components/DashboardRouter'
import RoleSelector from './components/RoleSelector'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRoleSelector, setShowRoleSelector] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verifica se há token salvo
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    if (token && userData) {
      setIsAuthenticated(true)
      
      // Verifica se precisa mostrar o seletor de role (primeira vez)
      const hasSeenRoleSelector = localStorage.getItem('has_seen_role_selector')
      if (!hasSeenRoleSelector) {
        setShowRoleSelector(true)
      }
    }
    
    setIsLoading(false)
  }, [])

  const handleRoleSelectorClose = () => {
    localStorage.setItem('has_seen_role_selector', 'true')
    setShowRoleSelector(false)
  }

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <p style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '500'
          }}>
            Carregando...
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <>
      <DashboardRouter />
      {showRoleSelector && (
        <div onClick={handleRoleSelectorClose}>
          <RoleSelector />
        </div>
      )}
    </>
  )
}

export default App

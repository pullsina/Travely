import StartPage from './pages/StartPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ContinentPage from './pages/ContinentPage'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState('start')

  if (page === 'register') {
    return (
      <RegisterPage
        onBack={() => setPage('start')}
        onLogin={() => setPage('login')}
        onRegisterSuccess={() => setPage('continents')}
      />
    )
  }

  if (page === 'login') {
    return (
      <LoginPage
        onBack={() => setPage('start')}
        onRegister={() => setPage('register')}
        onLoginSuccess={() => setPage('continents')}
      />
    )
  }

  if (page === 'continents') {
    return <ContinentPage onBack={() => setPage('start')} />
  }

  return (
    <StartPage
      onRegister={() => setPage('register')}
      onLogin={() => setPage('login')}
    />
  )
}

export default App

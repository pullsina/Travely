import StartPage from './pages/StartPage'
import RegisterPage from './pages/RegisterPage'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState('start')

  if (page === 'register') {
    return <RegisterPage onBack={() => setPage('start')} />
  }

  return <StartPage onRegister={() => setPage('register')} />
}

export default App

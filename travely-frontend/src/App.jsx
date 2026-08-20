import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMessage() {
      try {
        const response = await fetch('https://localhost:7009/api/test')

        if (!response.ok) {
          throw new Error('API request failed')
        }

        const data = await response.json()
        setMessage(data.message)
      } catch (err) {
        setError(err.message)
      }
    }

    loadMessage()
  }, [])

  return (
    <main>
      <h1>Travely</h1>

      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </main>
  )
}

export default App
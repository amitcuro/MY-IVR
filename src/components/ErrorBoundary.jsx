import { useState, useEffect } from 'react'

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleError = (event) => {
      console.error('Error caught:', event.error)
      setHasError(true)
      setError(event.error?.message || 'Unknown error occurred')
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Error Occurred</h1>
          <p className="text-gray-700 mb-4 font-mono text-sm">{error}</p>
          <button
            onClick={() => {
              setHasError(false)
              setError(null)
              window.location.reload()
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Reload Application
          </button>
        </div>
      </div>
    )
  }

  return children
}

import { useState, useEffect } from 'react'
import { HiCheckCircle, HiXCircle, HiRefresh } from 'react-icons/hi'

/**
 * API Health Check Component
 * Shows connection status to backend
 * Add to any page during development to debug API issues
 */
const ApiHealthCheck = () => {
  const [status, setStatus] = useState('checking')
  const [details, setDetails] = useState(null)
  const [show, setShow] = useState(true)

  const checkHealth = async () => {
    setStatus('checking')
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

    try {
      const startTime = Date.now()
      const response = await fetch(`${API_URL}/docs`, {
        method: 'HEAD',
      })
      const endTime = Date.now()
      const responseTime = endTime - startTime

      if (response.ok) {
        setStatus('healthy')
        setDetails({
          url: API_URL,
          responseTime: `${responseTime}ms`,
          status: response.status,
        })
      } else {
        setStatus('unhealthy')
        setDetails({
          url: API_URL,
          error: `HTTP ${response.status}`,
        })
      }
    } catch (error) {
      setStatus('error')
      setDetails({
        url: API_URL,
        error: error.message,
      })
    }
  }

  useEffect(() => {
    checkHealth()
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className="card p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {status === 'checking' && (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            )}
            {status === 'healthy' && (
              <HiCheckCircle className="w-5 h-5 text-green-500" />
            )}
            {(status === 'unhealthy' || status === 'error') && (
              <HiXCircle className="w-5 h-5 text-red-500" />
            )}
            <div>
              <p className="text-sm font-medium">
                {status === 'checking' && 'Checking API...'}
                {status === 'healthy' && 'API Connected'}
                {status === 'unhealthy' && 'API Unhealthy'}
                {status === 'error' && 'API Disconnected'}
              </p>
              {details && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {details.responseTime || details.error}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={checkHealth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Refresh"
            >
              <HiRefresh className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShow(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Close"
            >
              <HiXCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
        {status === 'error' && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-red-600 dark:text-red-400">
              Make sure backend is running on {details?.url}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApiHealthCheck

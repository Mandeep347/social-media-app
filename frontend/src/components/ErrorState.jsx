import { HiExclamationCircle } from 'react-icons/hi'

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <HiExclamationCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorState

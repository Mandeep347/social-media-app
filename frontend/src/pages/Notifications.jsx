import { HiBell } from 'react-icons/hi'
import EmptyState from '../components/EmptyState'

const Notifications = () => {
  // Mock notifications data
  const notifications = []

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <EmptyState
          icon={HiBell}
          title="No notifications yet"
          description="When someone likes or comments on your posts, you'll see it here."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="card p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {notification.user[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{notification.user}</span>{' '}
                    {notification.text}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notifications

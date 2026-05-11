import { useState, useEffect } from 'react'
import { HiTrendingUp } from 'react-icons/hi'

const RightSidebar = () => {
  const [trending, setTrending] = useState([
    { id: 1, tag: 'Technology', posts: '12.5K' },
    { id: 2, tag: 'Design', posts: '8.2K' },
    { id: 3, tag: 'Photography', posts: '6.7K' },
    { id: 4, tag: 'Travel', posts: '5.1K' },
    { id: 5, tag: 'Food', posts: '4.3K' },
  ])

  const [suggested, setSuggested] = useState([
    { id: 1, name: 'user@example.com', followers: '2.5K' },
    { id: 2, name: 'designer@example.com', followers: '1.8K' },
    { id: 3, name: 'photographer@example.com', followers: '1.2K' },
  ])

  return (
    <div className="h-full overflow-y-auto p-6 bg-white dark:bg-gray-800">
      <div className="space-y-6">
        {/* Trending Topics */}
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-4">
            <HiTrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Trending Topics</h2>
          </div>
          <div className="space-y-3">
            {trending.map((item) => (
              <button
                key={item.id}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  #{item.tag}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.posts} posts
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Users */}
        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-4">Suggested for you</h2>
          <div className="space-y-3">
            {suggested.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.followers} followers
                    </p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:underline">About</a>
            <span>·</span>
            <a href="#" className="hover:underline">Help</a>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <p>© 2024 SocialApp</p>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar

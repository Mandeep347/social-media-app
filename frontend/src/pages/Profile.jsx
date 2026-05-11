import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HiCamera, HiCog, HiPhotograph } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import { postsAPI } from '../services/api'
import PostCard from '../components/PostCard'
import PostSkeleton from '../components/PostSkeleton'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'

const Profile = () => {
  const { userId } = useParams()
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isOwnProfile = user?.id === userId

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await postsAPI.getFeed()
        // Filter posts by user
        const userPosts = data.posts.filter((post) => post.user_id === userId)
        setPosts(userPosts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserPosts()
  }, [userId])

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            {isOwnProfile && (
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors">
                <HiCamera className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{user?.email}</h1>
              {isOwnProfile && (
                <button className="btn-secondary flex items-center gap-2">
                  <HiCog className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 justify-center sm:justify-start">
              <div className="text-center">
                <p className="text-xl font-bold">{posts.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4">Posts</h2>

        {/* Loading State */}
        {loading && (
          <div>
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && !loading && <ErrorState message={error} />}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <EmptyState
            icon={HiPhotograph}
            title={isOwnProfile ? 'No posts yet' : 'This user has no posts'}
            description={
              isOwnProfile
                ? 'Share your first moment with the community!'
                : 'Check back later for new content.'
            }
          />
        )}

        {/* Posts */}
        {!loading && !error && posts.length > 0 && (
          <div>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handlePostDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

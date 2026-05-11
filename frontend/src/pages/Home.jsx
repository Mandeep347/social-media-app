import { useState, useEffect } from 'react'
import { HiPlus, HiPhotograph } from 'react-icons/hi'
import { postsAPI } from '../services/api'
import PostCard from '../components/PostCard'
import PostSkeleton from '../components/PostSkeleton'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import CreatePostModal from '../components/CreatePostModal'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchFeed = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await postsAPI.getFeed()
      setPosts(data.posts || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeed()
  }, [])

  const handlePostCreated = (newPost) => {
    // Refresh feed after creating a post
    fetchFeed()
  }

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Home</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <HiPlus className="w-5 h-5" />
          <span className="hidden sm:inline">Create Post</span>
        </button>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
      />

      {/* Loading State */}
      {loading && (
        <div>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <ErrorState message={error} onRetry={fetchFeed} />
      )}

      {/* Empty State */}
      {!loading && !error && posts.length === 0 && (
        <EmptyState
          icon={HiPhotograph}
          title="No posts yet"
          description="Be the first to share something with the community!"
          action={
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create Your First Post
            </button>
          }
        />
      )}

      {/* Posts Feed */}
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

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
      >
        <HiPlus className="w-6 h-6" />
      </button>
    </div>
  )
}

export default Home

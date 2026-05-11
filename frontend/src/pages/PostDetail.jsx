import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HiArrowLeft, HiOutlinePaperAirplane } from 'react-icons/hi'
import { postsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorState from '../components/ErrorState'

const PostDetail = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await postsAPI.getFeed()
        const foundPost = data.posts.find((p) => p.id === postId)
        
        if (foundPost) {
          setPost(foundPost)
        } else {
          setError('Post not found')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  const handlePostDeleted = () => {
    navigate('/')
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    // Add comment (mock implementation)
    const newComment = {
      id: Date.now(),
      user_id: user.id,
      email: user.email,
      text: comment,
      created_at: new Date().toISOString(),
    }

    setComments([...comments, newComment])
    setComment('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error || !post) {
    return <ErrorState message={error || 'Post not found'} />
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <HiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Post</h1>
      </div>

      {/* Post */}
      <PostCard post={post} onDelete={handlePostDeleted} />

      {/* Comments Section */}
      <div className="card p-4 mt-4">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="input-field flex-1"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="btn-primary px-4"
              >
                <HiOutlinePaperAirplane className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* Comments List */}
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {c.email[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                    <p className="font-semibold text-sm">{c.email}</p>
                    <p className="text-gray-900 dark:text-gray-100">{c.text}</p>
                  </div>
                  <div className="flex gap-4 mt-1 px-4 text-xs text-gray-500 dark:text-gray-400">
                    <button className="hover:underline">Like</button>
                    <button className="hover:underline">Reply</button>
                    <span>Just now</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostDetail

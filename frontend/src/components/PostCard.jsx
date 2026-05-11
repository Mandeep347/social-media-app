import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineShare,
  HiOutlineBookmark,
  HiDotsHorizontal,
  HiTrash,
} from 'react-icons/hi'
import { postsAPI } from '../services/api'

const PostCard = ({ post, onDelete }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    setDeleting(true)
    try {
      await postsAPI.deletePost(post.id)
      onDelete?.(post.id)
    } catch (error) {
      console.error('Failed to delete post:', error)
      alert('Failed to delete post')
    } finally {
      setDeleting(false)
      setShowMenu(false)
    }
  }

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true })

  return (
    <div className="card p-4 mb-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Link
          to={`/profile/${post.user_id}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {post.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-semibold text-sm">{post.email}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
          </div>
        </Link>

        {post.is_owner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <HiDotsHorizontal className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 card p-2 z-10">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                >
                  <HiTrash className="w-5 h-5" />
                  <span>{deleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="mb-3 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
          {post.caption}
        </p>
      )}

      {/* Media */}
      {post.url && (
        <Link to={`/post/${post.id}`} className="block mb-3">
          {post.file_type === 'video' ? (
            <video
              src={post.url}
              controls
              className="w-full rounded-lg max-h-96 object-cover"
            />
          ) : (
            <img
              src={post.url}
              alt={post.caption || 'Post image'}
              className="w-full rounded-lg max-h-96 object-cover hover:opacity-95 transition-opacity"
            />
          )}
        </Link>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 hover:text-red-500 transition-colors group"
          >
            {liked ? (
              <HiHeart className="w-6 h-6 text-red-500" />
            ) : (
              <HiOutlineHeart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            )}
            <span className="text-sm">{likes}</span>
          </button>

          <Link
            to={`/post/${post.id}`}
            className="flex items-center gap-2 hover:text-blue-500 transition-colors group"
          >
            <HiOutlineChat className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-sm">0</span>
          </Link>

          <button className="hover:text-green-500 transition-colors group">
            <HiOutlineShare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <button className="hover:text-blue-500 transition-colors group">
          <HiOutlineBookmark className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  )
}

export default PostCard

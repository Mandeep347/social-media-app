import { useState, useRef } from 'react'
import { HiX, HiPhotograph, HiVideoCamera } from 'react-icons/hi'
import { postsAPI } from '../services/api'
import LoadingSpinner from './LoadingSpinner'

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
      setError('Please select an image or video file')
      return
    }

    // Validate file size (max 50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB')
      return
    }

    setFile(selectedFile)
    setError('')

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setUploading(true)
    setError('')

    try {
      const newPost = await postsAPI.uploadPost(file, caption)
      onPostCreated?.(newPost)
      handleClose()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create post')
    } finally {
      setUploading(false)
    }
  }

  const handleClose = () => {
    setCaption('')
    setFile(null)
    setPreview(null)
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="card w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Caption */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className="input-field min-h-[100px] resize-none"
            disabled={uploading}
          />

          {/* File Preview */}
          {preview && (
            <div className="relative rounded-lg overflow-hidden">
              {file?.type.startsWith('video/') ? (
                <video src={preview} controls className="w-full max-h-96" />
              ) : (
                <img src={preview} alt="Preview" className="w-full max-h-96 object-cover" />
              )}
              <button
                type="button"
                onClick={() => {
                  setFile(null)
                  setPreview(null)
                }}
                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* File Input */}
          {!preview && (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              <div className="text-center">
                <div className="flex justify-center gap-4 mb-4">
                  <HiPhotograph className="w-12 h-12 text-gray-400" />
                  <HiVideoCamera className="w-12 h-12 text-gray-400" />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                  disabled={uploading}
                >
                  Choose File
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Images or videos up to 50MB
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary flex-1"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={uploading || !file}
            >
              {uploading ? (
                <>
                  <LoadingSpinner size="small" />
                  <span>Posting...</span>
                </>
              ) : (
                'Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostModal

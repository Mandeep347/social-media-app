const PostSkeleton = () => {
  return (
    <div className="card p-4 mb-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
        <div className="flex-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20" />
        </div>
      </div>

      {/* Caption */}
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
      </div>

      {/* Image */}
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded-lg mb-3" />

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    </div>
  )
}

export default PostSkeleton

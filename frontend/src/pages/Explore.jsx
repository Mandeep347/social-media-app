import { useState } from 'react'
import { HiSearch, HiX } from 'react-icons/hi'
import EmptyState from '../components/EmptyState'

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setSearching(true)
    // Mock search - in real app, call API
    setTimeout(() => {
      setSearchResults([])
      setSearching(false)
    }, 500)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for users, posts, or tags..."
            className="input-field pl-12 pr-12"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <HiX className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </form>

      {/* Trending Section */}
      {!searchQuery && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="card aspect-square overflow-hidden cursor-pointer group"
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-105 transition-transform duration-200" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && !searching && searchResults.length === 0 && (
        <EmptyState
          icon={HiSearch}
          title="No results found"
          description={`No results found for "${searchQuery}". Try different keywords.`}
        />
      )}

      {searching && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Searching...</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((result) => (
            <div key={result.id} className="card p-4">
              {/* Search result content */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Explore

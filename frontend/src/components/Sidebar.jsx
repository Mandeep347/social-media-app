import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  HiHome,
  HiOutlineHome,
  HiSearch,
  HiOutlineSearch,
  HiBell,
  HiOutlineBell,
  HiUser,
  HiOutlineUser,
  HiLogout,
  HiMoon,
  HiSun,
} from 'react-icons/hi'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  const navItems = [
    { name: 'Home', path: '/', icon: HiOutlineHome, activeIcon: HiHome },
    { name: 'Explore', path: '/explore', icon: HiOutlineSearch, activeIcon: HiSearch },
    { name: 'Notifications', path: '/notifications', icon: HiOutlineBell, activeIcon: HiBell },
    { name: 'Profile', path: `/profile/${user?.id}`, icon: HiOutlineUser, activeIcon: HiUser },
  ]

  return (
    <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-800">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SocialApp
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <item.activeIcon className="w-6 h-6" />
                ) : (
                  <item.icon className="w-6 h-6" />
                )}
                <span className="text-lg">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-4 px-4 py-3 rounded-xl w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
        >
          {isDark ? <HiSun className="w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
          <span className="text-lg">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 rounded-xl w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <HiLogout className="w-6 h-6" />
          <span className="text-lg">Logout</span>
        </button>
      </div>

      {/* User Info */}
      <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

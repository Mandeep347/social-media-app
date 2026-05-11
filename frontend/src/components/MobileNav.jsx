import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  HiHome,
  HiOutlineHome,
  HiSearch,
  HiOutlineSearch,
  HiBell,
  HiOutlineBell,
  HiUser,
  HiOutlineUser,
} from 'react-icons/hi'

const MobileNav = () => {
  const { user } = useAuth()

  const navItems = [
    { name: 'Home', path: '/', icon: HiOutlineHome, activeIcon: HiHome },
    { name: 'Explore', path: '/explore', icon: HiOutlineSearch, activeIcon: HiSearch },
    { name: 'Notifications', path: '/notifications', icon: HiOutlineBell, activeIcon: HiBell },
    { name: 'Profile', path: `/profile/${user?.id}`, icon: HiOutlineUser, activeIcon: HiUser },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
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
                <span className="text-xs mt-1">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileNav

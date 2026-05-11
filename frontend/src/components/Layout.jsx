import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'
import MobileNav from './MobileNav'

const Layout = () => {
  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left Sidebar */}
        <div className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 dark:border-gray-700">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 mr-80">
          <main className="max-w-2xl mx-auto py-6 px-4">
            <Outlet />
          </main>
        </div>

        {/* Right Sidebar */}
        <div className="fixed right-0 top-0 h-screen w-80 border-l border-gray-200 dark:border-gray-700">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        <main className="pb-20 pt-4 px-4">
          <Outlet />
        </main>
        <MobileNav />
      </div>
    </div>
  )
}

export default Layout

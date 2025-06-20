'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, User, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/admin/theme-toggle'
import { useAuth } from '@/contexts/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AdminNavigationProps {
  className?: string
}

export default function AdminNavigation({ className = '' }: AdminNavigationProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <div className={`bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-sm p-4 sm:p-6 ${className}`}>
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
          <Link
            href="/admin"
            className={`flex items-center space-x-2 p-2 sm:p-0 rounded-lg sm:rounded-none transition-colors touch-manipulation ${
              isActive('/admin')
                ? 'text-blue-600 hover:text-blue-700 bg-blue-50 sm:bg-transparent'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 sm:hover:bg-transparent'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className={`text-base sm:text-sm ${isActive('/admin') ? 'font-semibold' : 'font-medium'}`}>
              Dashboard
            </span>
          </Link>

          <Link
            href="/admin/blogs"
            className={`flex items-center space-x-2 p-2 sm:p-0 rounded-lg sm:rounded-none transition-colors touch-manipulation ${
              isActive('/admin/blogs')
                ? 'text-blue-600 hover:text-blue-700 bg-blue-50 sm:bg-transparent'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 sm:hover:bg-transparent'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className={`text-base sm:text-sm ${isActive('/admin/blogs') ? 'font-semibold' : 'font-medium'}`}>
              Blogs
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center space-x-2 p-2 sm:p-0 rounded-lg sm:rounded-none text-gray-600 hover:text-gray-900 hover:bg-gray-50 sm:hover:bg-transparent transition-colors touch-manipulation"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium text-base sm:text-sm">Main Site</span>
          </Link>
        </div>
        
        <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="relative h-10 w-10 sm:h-8 sm:w-8 touch-manipulation">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 w-10 sm:h-8 sm:w-8 p-0 touch-manipulation">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 sm:h-auto touch-manipulation">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

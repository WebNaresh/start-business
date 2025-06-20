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

  const getActiveLabel = () => {
    if (pathname === '/admin') return 'Dashboard'
    if (pathname.startsWith('/admin/blogs')) return 'Blogs'
    return 'Admin'
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <div className={`bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-sm p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-6">
          <Link 
            href="/admin" 
            className={`flex items-center space-x-2 transition-colors ${
              isActive('/admin') 
                ? 'text-blue-600 hover:text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className={isActive('/admin') ? 'font-semibold' : 'font-medium'}>
              Dashboard
            </span>
          </Link>
          
          <Link 
            href="/admin/blogs" 
            className={`flex items-center space-x-2 transition-colors ${
              isActive('/admin/blogs') 
                ? 'text-blue-600 hover:text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className={isActive('/admin/blogs') ? 'font-semibold' : 'font-medium'}>
              Blogs
            </span>
          </Link>
          
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Main Site</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
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
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
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

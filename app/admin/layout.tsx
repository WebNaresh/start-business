import { ReactNode } from 'react'
import Link from 'next/link'
import { FileText, Home, Settings, Users } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <Link href="/admin" className="text-xl font-semibold text-slate-900">
              Admin Dashboard
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/admin/blogs"
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <FileText className="w-5 h-5 mr-3" />
              Blogs
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
} 
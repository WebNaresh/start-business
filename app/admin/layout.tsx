'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/auth-context'
import AuthGuard from '@/components/admin/auth-guard'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
            {children}
          </div>
        </div>
      </AuthGuard>
    </AuthProvider>
  )
}
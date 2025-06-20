'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BlogForm from '@/components/blog/blog-form'
import AdminNavigation from '@/components/admin/admin-navigation'

export default function NewBlogPage() {
  return (
    <div className="space-y-8">
      {/* Admin Navigation Header */}
      <AdminNavigation />

      {/* Page Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
        <Link href="/admin/blogs" className="w-full sm:w-auto">
          <Button variant="ghost" size="sm" className="w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-2 h-12 sm:h-auto text-base sm:text-sm">
            <ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4" />
            <span>Back to Blogs</span>
          </Button>
        </Link>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Create New Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">Write and publish a new blog post</p>
        </div>
      </div>

      {/* Blog Form */}
      <BlogForm isEditing={false} />
    </div>
  )
}
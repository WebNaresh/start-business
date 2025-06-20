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
      <div className="flex items-center space-x-4">
        <Link href="/admin/blogs">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create New Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Write and publish a new blog post</p>
        </div>
      </div>

      {/* Blog Form */}
      <BlogForm isEditing={false} />
    </div>
  )
}
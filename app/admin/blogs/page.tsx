'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { Blog } from '@/lib/types'
import AdminNavigation from '@/components/admin/admin-navigation'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blogs'
      toast.error(`Failed to fetch blogs: ${errorMessage}`)
      setBlogs([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete blog')

      toast.success('Blog deleted successfully')
      fetchBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Failed to delete blog')
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not published'
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="space-y-8">
      {/* Admin Navigation Header */}
      <AdminNavigation />

      {/* Page Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Blog Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">Create, edit, and manage your blog posts</p>
        </div>
        <div className="w-full sm:w-auto">
          <Link href="/admin/blogs/new" className="block">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 sm:h-auto text-base sm:text-sm font-medium">
              <Plus className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
              Create New Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div>

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first blog post!</p>
            <Link href="/admin/blogs/new">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Blog
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
            {/* Mobile Card View */}
            <div className="block sm:hidden">
              <div className="divide-y divide-slate-200">
                {blogs.map((blog) => (
                  <div key={blog.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">{blog.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{blog.slug}</p>
                      </div>
                      <span className={`ml-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {blog.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                      <span>by {blog.author}</span>
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                        target="_blank"
                        title="View Blog"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/blogs/${blog.slug}/edit`}
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors touch-manipulation"
                        title="Edit Blog"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.slug)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
                        title="Delete Blog"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 lg:px-6 py-4">
                        <div className="text-sm font-semibold text-slate-900">
                          {blog.title}
                        </div>
                        <div className="text-sm text-slate-500">{blog.slug}</div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-slate-600 font-medium">
                        {blog.author}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          blog.status === 'published'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-slate-600">
                        {formatDate(blog.publishedAt)}
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            target="_blank"
                            title="View Blog"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/blogs/${blog.slug}/edit`}
                            className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit Blog"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog.slug)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Blog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
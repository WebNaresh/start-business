'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import BlogForm from '@/components/blog/blog-form'
import type { Blog } from '@/lib/types'

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [blog, setBlog] = useState<Partial<Blog> | undefined>()

  useEffect(() => {
    fetchBlog()
  }, [params.slug])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.slug}`)
      if (!response.ok) throw new Error('Blog not found')
      const data = await response.json()
      setBlog({
        ...data,
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        excerpt: data.excerpt || '',
      })
    } catch (error) {
      toast.error('Failed to fetch blog')
      router.push('/admin/blogs')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (blogData: Partial<Blog>) => {
    try {
      const response = await fetch(`/api/blogs/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) throw new Error('Failed to update blog')

      toast.success('Blog updated successfully')
      router.push('/admin/blogs')
    } catch (error) {
      toast.error('Failed to update blog')
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Blog not found</p>
      </div>
    )
  }

  return (
    <BlogForm
      initialData={blog}
      isEditing={true}
      onSubmit={handleSubmit}
    />
  )
}
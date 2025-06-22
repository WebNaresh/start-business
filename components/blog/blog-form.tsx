"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { generateSlug } from '@/lib/utils'
import { editorDataToHtml, htmlToEditorData } from '@/lib/editor-utils'
import dynamic from 'next/dynamic'
import { OutputData } from '@editorjs/editorjs'
import type { Blog } from '@/lib/types'
import type { EditorRef } from '@/components/ui/enhanced-editor'
import ContentImportDialog from '@/components/blog/content-import-dialog'
import ImageUpload from '@/components/ui/image-upload'

// Dynamically import Enhanced Editor to avoid SSR issues
const EnhancedEditor = dynamic(() => import('@/components/ui/enhanced-editor'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] p-4 border border-slate-200 rounded-lg bg-gray-50 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-500">Loading enhanced editor...</p>
      </div>
    </div>
  )
})

interface BlogFormProps {
  initialData?: Partial<Blog>
  isEditing?: boolean
  onSubmit?: (data: Partial<Blog>) => Promise<void>
}

export default function BlogForm({ initialData, isEditing = false, onSubmit }: BlogFormProps) {
  const router = useRouter()
  const editorRef = useRef<EditorRef>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [editorData, setEditorData] = useState<OutputData | undefined>()
  
  const [blog, setBlog] = useState<Partial<Blog>>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    tags: '',
    featuredImage: '',
    ...initialData,
  })

  // Convert HTML content to EditorJS data on mount
  useEffect(() => {
    if (initialData?.content && typeof initialData.content === 'string') {
      try {
        // Try to parse as JSON first (EditorJS data)
        const parsedData = JSON.parse(initialData.content)
        setEditorData(parsedData)
      } catch {
        // If not JSON, convert HTML to EditorJS data
        const convertedData = htmlToEditorData(initialData.content)
        setEditorData(convertedData)
      }
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Get editor data and convert to HTML
      let htmlContent = ''
      let editorJsonData = ''
      
      if (editorRef.current) {
        const editorOutput = await editorRef.current.save()
        htmlContent = editorDataToHtml(editorOutput)
        editorJsonData = JSON.stringify(editorOutput)
      }

      const blogData = {
        ...blog,
        content: htmlContent, // Store HTML for display
        editorData: editorJsonData, // Store JSON for editing
        slug: blog.slug || generateSlug(blog.title || ''),
      }

      if (onSubmit) {
        await onSubmit(blogData)
      } else {
        // Default API call
        const url = isEditing ? `/api/blogs/${blog.slug}` : '/api/blogs'
        const method = isEditing ? 'PUT' : 'POST'
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          const errorMessage = errorData.error || `Failed to ${isEditing ? 'update' : 'create'} blog`
          throw new Error(errorMessage)
        }

        const result = await response.json()
        toast.success(`Blog ${isEditing ? 'updated' : 'created'} successfully`)
        router.push('/admin/blogs')
      }
    } catch (error) {
      console.error('Error saving blog:', error)
      const errorMessage = error instanceof Error ? error.message : `Failed to ${isEditing ? 'update' : 'create'} blog`
      toast.error(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setBlog(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && { slug: generateSlug(value) }),
    }))
  }

  const handleEditorChange = (data: OutputData) => {
    setEditorData(data)
  }

  const generateExcerpt = async () => {
    if (editorRef.current) {
      try {
        const data = await editorRef.current.save()
        const htmlContent = editorDataToHtml(data)
        // Extract plain text and limit to 160 characters
        const plainText = htmlContent.replace(/<[^>]*>/g, '').trim()
        const excerpt = plainText.length > 160
          ? plainText.substring(0, 157) + '...'
          : plainText

        setBlog(prev => ({ ...prev, excerpt }))
        toast.success('Excerpt generated from content')
      } catch (error) {
        toast.error('Failed to generate excerpt')
      }
    }
  }

  const handleContentImport = async (blocks: any[]) => {
    if (editorRef.current) {
      try {
        // Convert blocks to EditorJS format and insert
        const editorData: OutputData = {
          time: Date.now(),
          blocks: blocks,
          version: "2.28.2"
        }

        await editorRef.current.render(editorData)
        setEditorData(editorData)
        toast.success(`Imported ${blocks.length} content blocks`)
      } catch (error) {
        console.error('Error importing content:', error)
        toast.error('Failed to import content')
      }
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          {isEditing ? 'Edit Blog' : 'Create New Blog'}
        </h1>
        <p className="text-slate-600 mt-1">
          Use the rich editor below to create engaging blog content with proper formatting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Basic Information</h2>
          <div className="grid gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={blog.title || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                placeholder="Enter blog title..."
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-slate-700">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={blog.slug || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="auto-generated-from-title"
              />
              <p className="mt-1 text-xs text-slate-500">
                URL-friendly version of the title. Leave blank to auto-generate.
              </p>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-slate-700">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={blog.author || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                placeholder="Author name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Featured Image
              </label>
              <ImageUpload
                onImageUploaded={(imageUrl) => {
                  setBlog(prev => ({ ...prev, featuredImage: imageUrl }))
                }}
                currentImageUrl={blog.featuredImage}
                disabled={isSaving}
                maxSizeText="Max 5MB • JPEG, PNG, WebP • Optimized to WebP automatically"
              />
              <p className="mt-2 text-xs text-slate-500">
                Upload an image or leave empty to use a default placeholder. Images are automatically optimized and stored securely.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700">
                  Excerpt
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateExcerpt}
                  className="text-xs"
                >
                  Generate from content
                </Button>
              </div>
              <textarea
                id="excerpt"
                name="excerpt"
                value={blog.excerpt || ''}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Brief description of the blog post..."
              />
              <p className="mt-1 text-xs text-slate-500">
                {blog.excerpt?.length || 0}/160 characters recommended
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Content Editor */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-900">Content Editor</h2>
            <ContentImportDialog onImport={handleContentImport} />
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✨</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Enhanced Editor Features</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Smart Paste:</strong> Copy formatted content from ChatGPT, Gemini, Word, or any website</li>
                  <li>• <strong>Persistent Toolbar:</strong> Always-visible formatting controls like Microsoft Word</li>
                  <li>• <strong>Format Detection:</strong> Automatically converts headings, lists, quotes, and code blocks</li>
                  <li>• <strong>Quick Formatting:</strong> Select text and click toolbar buttons for instant formatting</li>
                  <li>• <strong>Keyboard Shortcuts:</strong> Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline)</li>
                </ul>
              </div>
            </div>
          </div>
          <EnhancedEditor
            ref={editorRef}
            data={editorData}
            onChange={handleEditorChange}
            placeholder="Start writing your blog post... Try pasting formatted content from AI tools!"
            showToolbar={true}
            className="min-h-[500px]"
          />
        </div>

        {/* SEO & Metadata */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">SEO & Metadata</h2>
          <div className="grid gap-6">
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-slate-700">
                Meta Title
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={blog.metaTitle || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="SEO title for search engines..."
              />
            </div>

            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-slate-700">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                value={blog.metaDescription || ''}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="SEO description for search engines..."
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-slate-700">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={blog.tags || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="tag1, tag2, tag3..."
              />
              <p className="mt-1 text-xs text-slate-500">
                Separate tags with commas
              </p>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={blog.status || 'draft'}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/blogs')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Blog' : 'Create Blog')}
          </Button>
        </div>
      </form>
    </div>
  )
}

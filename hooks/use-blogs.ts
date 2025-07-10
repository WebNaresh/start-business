import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import type { Blog } from '@/lib/types'

// API functions using axios
const fetchBlogs = async (status?: string): Promise<Blog[]> => {
  try {
    const params = new URLSearchParams()
    if (status && status !== 'all') {
      params.append('status', status)
    }

    console.log(`🔄 Fetching blogs with status: ${status || 'published'}`)
    const response = await axios.get(`/api/blogs?${params.toString()}`)
    const blogs = Array.isArray(response.data) ? response.data : []

    console.log(`📊 Fetched ${blogs.length} blogs for status "${status || 'published'}":`,
      blogs.map(blog => ({ title: blog.title, status: blog.status }))
    )

    return blogs
  } catch (error) {
    console.error(`❌ Error fetching blogs for status "${status}":`, error)
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message
      throw new Error(errorMessage)
    }
    throw new Error('Failed to fetch blogs')
  }
}

const deleteBlog = async (slug: string): Promise<void> => {
  try {
    await axios.delete(`/api/blogs/${slug}`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message
      throw new Error(errorMessage)
    }
    throw new Error('Failed to delete blog')
  }
}

const fetchBlog = async (slug: string): Promise<Blog> => {
  try {
    const response = await axios.get(`/api/blogs/${slug}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message
      throw new Error(errorMessage)
    }
    throw new Error('Failed to fetch blog')
  }
}

const createBlog = async (blogData: Partial<Blog>): Promise<Blog> => {
  try {
    const response = await axios.post('/api/blogs', blogData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message
      throw new Error(errorMessage)
    }
    throw new Error('Failed to create blog')
  }
}

const updateBlog = async ({ slug, data }: { slug: string; data: Partial<Blog> }): Promise<Blog> => {
  try {
    const response = await axios.put(`/api/blogs/${slug}`, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message
      throw new Error(errorMessage)
    }
    throw new Error('Failed to update blog')
  }
}

// Custom hooks
export const useBlogs = (status: string = 'published') => {
  return useQuery({
    queryKey: ['blogs', status],
    queryFn: () => fetchBlogs(status),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export const useBlog = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlog(slug),
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBlog,
    onMutate: async (slug) => {
      console.log('🚀 Starting optimistic delete for blog:', slug)

      // Cancel any outgoing refetches for all blog queries
      await queryClient.cancelQueries({ queryKey: ['blogs'] })
      await queryClient.cancelQueries({ queryKey: ['blog', slug] })

      // Snapshot the previous values for all status filters
      const previousAllBlogs = queryClient.getQueryData<Blog[]>(['blogs', 'all'])
      const previousPublishedBlogs = queryClient.getQueryData<Blog[]>(['blogs', 'published'])
      const previousDraftBlogs = queryClient.getQueryData<Blog[]>(['blogs', 'draft'])
      const previousBlog = queryClient.getQueryData(['blog', slug])

      console.log('📸 Snapshotted previous data, all blogs count:', previousAllBlogs?.length || 0)

      // Optimistically update all blog queries
      const updateBlogsList = (old: Blog[] | undefined) => {
        const filtered = old?.filter(blog => blog.slug !== slug) || []
        console.log('⚡ Optimistic update: removed blog, new count:', filtered.length)
        return filtered
      }

      queryClient.setQueryData<Blog[]>(['blogs', 'all'], updateBlogsList)
      queryClient.setQueryData<Blog[]>(['blogs', 'published'], updateBlogsList)
      queryClient.setQueryData<Blog[]>(['blogs', 'draft'], updateBlogsList)

      // Remove the individual blog from cache
      queryClient.removeQueries({ queryKey: ['blog', slug] })

      // Return a context object with the snapshotted values
      return {
        previousAllBlogs,
        previousPublishedBlogs,
        previousDraftBlogs,
        previousBlog,
        slug
      }
    },
    onError: (error, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context) {
        // Restore all cached blog queries
        if (context.previousAllBlogs) {
          queryClient.setQueryData(['blogs', 'all'], context.previousAllBlogs)
        }
        if (context.previousPublishedBlogs) {
          queryClient.setQueryData(['blogs', 'published'], context.previousPublishedBlogs)
        }
        if (context.previousDraftBlogs) {
          queryClient.setQueryData(['blogs', 'draft'], context.previousDraftBlogs)
        }
        if (context.previousBlog) {
          queryClient.setQueryData(['blog', context.slug], context.previousBlog)
        }
      }

      // Handle specific error messages
      let errorMessage = 'Failed to delete blog'
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage = 'Blog not found'
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error
        }
      }

      toast.error(errorMessage)
    },
    onSuccess: (_, slug) => {
      // Only invalidate queries after successful deletion
      // This ensures the API has completed and the blog is actually deleted from the database
      console.log('🗑️ Blog deletion successful, invalidating queries for slug:', slug)

      // Invalidate all blog-related queries
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['blog', slug] })

      console.log('✅ Query invalidation completed')
      toast.success('Blog deleted successfully')
    },
    // Remove onSettled to prevent premature invalidation
    // onSettled runs regardless of success/failure and may cause timing issues
  })
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      // Add the new blog to the cache
      queryClient.setQueryData<Blog[]>(['blogs'], (old) => [newBlog, ...(old || [])])
      toast.success('Blog created successfully')
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create blog'
      toast.error(errorMessage)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
}

export const useUpdateBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBlog,
    onMutate: async ({ slug, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['blog', slug] })
      await queryClient.cancelQueries({ queryKey: ['blogs'] })

      // Snapshot the previous values
      const previousBlog = queryClient.getQueryData(['blog', slug])
      const previousBlogs = queryClient.getQueryData<Blog[]>(['blogs'])

      // Optimistically update individual blog
      queryClient.setQueryData(['blog', slug], (old: any) => ({ ...old, ...data }))

      // Optimistically update blogs list
      queryClient.setQueryData<Blog[]>(['blogs'], (old) =>
        old?.map(blog => blog.slug === slug ? { ...blog, ...data } : blog) || []
      )

      return { previousBlog, previousBlogs, slug }
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(['blog', context.slug], context.previousBlog)
        queryClient.setQueryData(['blogs'], context.previousBlogs)
      }
      toast.error('Failed to update blog')
    },
    onSuccess: () => {
      toast.success('Blog updated successfully')
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blog', variables.slug] })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
}

// Query keys for consistency
export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...blogKeys.lists(), { filters }] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
}

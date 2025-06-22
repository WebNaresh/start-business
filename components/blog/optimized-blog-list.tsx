'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { OptimizedList, LazySection } from '@/components/ui/lazy-component'
import VirtualList from '@/components/ui/virtual-list'
import type { Blog } from '@/lib/types'

interface OptimizedBlogListProps {
  blogPosts: Blog[]
  filteredPosts: Blog[]
  loading: boolean
  useVirtualization?: boolean
  maxInitialPosts?: number
}

export default function OptimizedBlogList({
  blogPosts,
  filteredPosts,
  loading,
  useVirtualization = false,
  maxInitialPosts = 9,
}: OptimizedBlogListProps) {
  // Memoized blog card component to prevent unnecessary re-renders
  const BlogCard = useCallback(({ post, index }: { post: Blog; index: number }) => (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
        {/* Featured Image */}
        <LazySection skeletonHeight={224} delay={index * 50}>
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
            {post.featuredImage && post.featuredImage !== "/placeholder.svg" ? (
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
                priority={index < 3}
                loading={index < 3 ? "eager" : "lazy"}
                fetchPriority={index < 3 ? "high" : "auto"}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">No Image</span>
                </div>
              </div>
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </LazySection>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Category Badge */}
          {post.tags && (
            <div className="mb-3">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {post.tags.split(',')[0]?.trim()}
              </span>
            </div>
          )}

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 flex-grow">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
            {post.excerpt || post.content?.substring(0, 150) + '...'}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'Not published'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  ), [])

  // Memoized render function for virtual list
  const renderBlogPost = useCallback((post: Blog, index: number) => (
    <div key={post.id} className="p-3">
      <BlogCard post={post} index={index} />
    </div>
  ), [BlogCard])

  // Loading skeleton
  if (loading) {
    return <BlogListSkeleton />
  }

  // No results
  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles match your search</h3>
        <p className="text-gray-600">Try adjusting your search terms or filters to find what you're looking for.</p>
      </div>
    )
  }

  // Virtual list for very large datasets
  if (useVirtualization && filteredPosts.length > 50) {
    return (
      <VirtualList
        items={filteredPosts}
        itemHeight={400}
        containerHeight={800}
        renderItem={renderBlogPost}
        className="border rounded-lg"
      />
    )
  }

  // Optimized list with progressive loading for moderate datasets
  if (filteredPosts.length > maxInitialPosts) {
    return (
      <OptimizedList
        items={filteredPosts}
        renderItem={(post, index) => <BlogCard post={post} index={index} />}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        maxInitialItems={maxInitialPosts}
        loadMoreText="Load More Articles"
      />
    )
  }

  // Standard grid for small datasets
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  )
}

// Optimized skeleton component
export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: count }).map((_, index) => (
            <div key={`skeleton-${index}`} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

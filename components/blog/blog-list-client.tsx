"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import type { Blog } from '@/lib/types'
import BlogSearchFilter from './blog-search-filter'

export default function BlogListClient() {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<any>({})

  // Extract unique categories and tags from blog posts
  const categories = Array.from(new Set(
    blogPosts.flatMap(post => post.tags?.split(',').map(tag => tag.trim()) || [])
  )).filter(Boolean)

  const tags = categories // For now, using same as categories

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogs')
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        const publishedPosts = Array.isArray(data) ? data.filter(post => post.status === 'published') : []
        setBlogPosts(publishedPosts)
        setFilteredPosts(publishedPosts)
      } catch (error) {
        console.error("Failed to load blog posts:", error)
        setBlogPosts([])
        setFilteredPosts([])
      } finally {
        setLoading(false)
      }
    }
    loadBlogPosts()
  }, [])

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...blogPosts]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (activeFilters.category) {
      filtered = filtered.filter(post =>
        post.tags?.toLowerCase().includes(activeFilters.category.toLowerCase())
      )
    }

    // Apply date range filter
    if (activeFilters.dateRange) {
      const now = new Date()
      const filterDate = new Date()

      switch (activeFilters.dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }

      filtered = filtered.filter(post =>
        new Date(post.publishedAt) >= filterDate
      )
    }

    // Apply sorting
    if (activeFilters.sortBy) {
      switch (activeFilters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
          break
        case 'alphabetical':
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        // 'popular' would need view counts or similar metrics
      }
    }

    setFilteredPosts(filtered)
  }, [blogPosts, searchQuery, activeFilters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
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

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Stay updated with the latest business insights, expert tips, and industry trends to help grow your business.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-12">
        <BlogSearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={categories}
          tags={tags}
        />
      </div>

      {/* Results Summary */}
      {blogPosts.length > 0 && (
        <div className="mb-8">
          <p className="text-gray-600 text-center">
            {filteredPosts.length === blogPosts.length
              ? `Showing all ${blogPosts.length} articles`
              : `Showing ${filteredPosts.length} of ${blogPosts.length} articles`
            }
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      )}

      {blogPosts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
          <p className="text-gray-600">Check back soon for new articles and insights.</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles match your search</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group">
              <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
                {/* Featured Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    priority={index < 3}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Reading Time Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                    5 min read
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category/Tags */}
                  {post.tags && (
                    <div className="mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {post.tags.split(',')[0].trim()}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Author & Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mr-3 flex items-center justify-center shadow-sm">
                        <span className="text-sm font-bold text-white">
                          {post.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Read More Arrow */}
                    <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Load More Button (placeholder for future pagination) */}
      {filteredPosts.length > 0 && (
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            <span>Load More Articles</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

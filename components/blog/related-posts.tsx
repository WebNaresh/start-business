"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import type { Blog } from '@/lib/types'

interface RelatedPostsProps {
  currentPost: Blog
  className?: string
}

interface RelatedPost extends Blog {
  relevanceScore: number
}

export default function RelatedPosts({ currentPost, className = "" }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRelatedPosts()
  }, [currentPost.id])

  const fetchRelatedPosts = async () => {
    try {
      const response = await fetch('/api/blogs')
      if (!response.ok) throw new Error('Failed to fetch blogs')
      
      const allPosts: Blog[] = await response.json()
      const related = findRelatedPosts(allPosts, currentPost)
      setRelatedPosts(related)
    } catch (error) {
      console.error('Error fetching related posts:', error)
      setRelatedPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  const findRelatedPosts = (allPosts: Blog[], current: Blog): RelatedPost[] => {
    // Get current post tags
    const currentTags = current.tags?.toLowerCase().split(',').map(tag => tag.trim()).filter(Boolean) || []
    
    if (currentTags.length === 0) {
      // If no tags, return recent posts excluding current
      return allPosts
        .filter(post => 
          post.id !== current.id && 
          post.status === 'published'
        )
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3)
        .map(post => ({ ...post, relevanceScore: 0 }))
    }

    // Calculate relevance scores for other posts
    const scoredPosts = allPosts
      .filter(post => 
        post.id !== current.id && 
        post.status === 'published' &&
        post.tags // Only include posts with tags
      )
      .map(post => {
        const postTags = post.tags!.toLowerCase().split(',').map(tag => tag.trim()).filter(Boolean)
        const matchingTags = currentTags.filter(tag => postTags.includes(tag))
        const relevanceScore = matchingTags.length / Math.max(currentTags.length, postTags.length)
        
        return {
          ...post,
          relevanceScore
        }
      })
      .filter(post => post.relevanceScore > 0) // Only include posts with at least one matching tag
      .sort((a, b) => {
        // Sort by relevance score first, then by publication date
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
      .slice(0, 3)

    // If we don't have enough related posts, fill with recent posts
    if (scoredPosts.length < 2) {
      const recentPosts = allPosts
        .filter(post => 
          post.id !== current.id && 
          post.status === 'published' &&
          !scoredPosts.find(sp => sp.id === post.id)
        )
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3 - scoredPosts.length)
        .map(post => ({ ...post, relevanceScore: 0 }))

      return [...scoredPosts, ...recentPosts]
    }

    return scoredPosts
  }

  const truncateText = (text: string, maxLength: number = 100): string => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  const formatDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Posts</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedPosts.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Posts</h3>
        <p className="text-slate-600 text-sm">No related posts found at the moment.</p>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-blue-100 p-6 shadow-sm ${className}`}>
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Related Articles
          </h3>
          {relatedPosts.some(post => post.relevanceScore > 0) && (
            <p className="text-xs text-blue-600 font-medium">
              Based on similar topics
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {relatedPosts.map((post, index) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block group hover:bg-white/60 rounded-xl p-3 -m-3 transition-all duration-300 hover:shadow-sm"
          >
            <article className="flex gap-4">
              {/* Featured Image */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                {post.featuredImage &&
                 post.featuredImage !== "/placeholder.svg" &&
                 post.featuredImage !== "" &&
                 !post.featuredImage.includes('placeholder') &&
                 !post.featuredImage.includes('via.placeholder') ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Index Badge */}
                <div className="absolute top-2 left-2 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>

                {post.excerpt && (
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                    {truncateText(post.excerpt, 90)}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-slate-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <div className="flex items-center">
                    {post.relevanceScore > 0 && (
                      <div className="flex items-center gap-1 mr-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Related</span>
                      </div>
                    )}

                    {/* Read More Arrow */}
                    <div className="w-6 h-6 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <svg className="w-3 h-3 text-blue-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* View All Posts Link */}
      <div className="mt-6 pt-4 border-t border-blue-200">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
        >
          <span>Explore all articles</span>
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

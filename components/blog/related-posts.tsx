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
    <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Related Posts
        {relatedPosts.some(post => post.relevanceScore > 0) && (
          <span className="text-xs text-slate-500 font-normal ml-2">
            (Based on similar topics)
          </span>
        )}
      </h3>
      
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="block group hover:bg-slate-50 rounded-lg p-2 -m-2 transition-colors duration-200"
          >
            <article className="flex gap-3">
              {/* Featured Image */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="64px"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                
                {post.excerpt && (
                  <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                    {truncateText(post.excerpt, 80)}
                  </p>
                )}
                
                {/* Meta Info */}
                <div className="flex items-center text-xs text-slate-500 gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  
                  {post.relevanceScore > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600">Related</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      
      {/* View All Posts Link */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link 
          href="/blog"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          View all posts →
        </Link>
      </div>
    </div>
  )
}

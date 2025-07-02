"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  featuredImage: string | null
  author: string
  publishedAt: string
  tags: string
}

export default function BlogShowcase() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blogs?limit=4&status=published")
        if (response.ok) {
          const data = await response.json()
          setBlogPosts(data.slice(0, 3)) // Ensure we only get 4 posts
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
        // Fallback to empty array on error
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getReadingTime = (excerpt: string) => {
    const words = excerpt.split(" ").length
    const readingTime = Math.ceil(words / 200) // Average reading speed
    return `${readingTime} min read`
  }

  if (loading) {
    return (
      <section className="py-8 md:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
              Latest Insights
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">From Our Blog</h2>
            <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest business insights, tips, and industry trends
            </p>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (blogPosts.length === 0) {
    return null // Don't render if no blog posts
  }

  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -ml-32 -mt-32 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mb-48 opacity-20"></div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
            Latest Insights
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">From Our Blog</h2>
          <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto">
            Stay updated with the latest business insights, tips, and industry trends
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 group"
            >
              {/* Featured Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                {post.featuredImage && 
                 post.featuredImage !== "/placeholder.svg" && 
                 !post.featuredImage.includes("placeholder") ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={75}
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-blue-300">
                      <BookOpen className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-xs font-medium">Blog Post</p>
                    </div>
                  </div>
                )}
                
                {/* Trending indicator for first post */}
                {index === 0 && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt || "Discover valuable insights and expert advice to help grow your business."}
                </p>

                {/* Meta information */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{getReadingTime(post.excerpt || "")}</span>
                  </div>
                </div>

                {/* Author and Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">By {post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors group/link"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Visit Our Blog
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

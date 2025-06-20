import { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import BlogRenderer from "@/components/blog/blog-renderer"
import RelatedPosts from "@/components/blog/related-posts"
import ReadingProgress from "@/components/blog/reading-progress"
import { notFound } from 'next/navigation'
import type { Blog } from '@/lib/types'
import { prisma } from '@/lib/prisma'

async function getBlogPostDirect(slug: string): Promise<Blog | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug }
    })
    return blog
  } catch (error) {
    console.error('Error fetching blog post from database:', error)
    return null
  }
}

async function getBlogPost(slug: string): Promise<Blog | null> {
  // In production, use direct database query for better reliability
  if (process.env.NODE_ENV === 'production') {
    console.log('Production mode: Using direct database query')
    return await getBlogPostDirect(slug)
  }

  try {
    // Development mode: try API first, fallback to database
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const url = `${baseUrl}/api/blogs/${slug}`
    console.log('Fetching blog from:', url)

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      console.error(`Failed to fetch blog via API: ${response.status} ${response.statusText}`)
      return await getBlogPostDirect(slug)
    }

    const data = await response.json()
    console.log('Blog data received:', data.title)
    return data
  } catch (error) {
    console.error('Error fetching blog post via API:', error)
    return await getBlogPostDirect(slug)
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const blogPost = await getBlogPost(resolvedParams.slug)

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const title = blogPost.metaTitle || blogPost.title
  const description = blogPost.metaDescription || blogPost.excerpt || `Read ${blogPost.title} by ${blogPost.author}`
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${blogPost.slug}`
  const imageUrl = blogPost.featuredImage || '/placeholder.svg'

  return {
    title,
    description,
    keywords: blogPost.tags?.split(',').map(tag => tag.trim()).join(', '),
    authors: [{ name: blogPost.author }],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Your Business Blog',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blogPost.title,
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: blogPost.publishedAt ? new Date(blogPost.publishedAt).toISOString() : new Date().toISOString(),
      modifiedTime: blogPost.updatedAt ? new Date(blogPost.updatedAt).toISOString() : new Date().toISOString(),
      authors: [blogPost.author],
      tags: blogPost.tags?.split(',').map(tag => tag.trim()),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: blogPost.status === 'published',
      follow: blogPost.status === 'published',
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const blogPost = await getBlogPost(resolvedParams.slug)

  if (!blogPost) {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title,
    "description": blogPost.excerpt || blogPost.metaDescription,
    "image": blogPost.featuredImage || '/placeholder.svg',
    "author": {
      "@type": "Person",
      "name": blogPost.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Business Blog"
    },
    "datePublished": blogPost.publishedAt,
    "dateModified": blogPost.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${blogPost.slug}`
    },
    "keywords": blogPost.tags?.split(',').map(tag => tag.trim()).join(', ')
  }

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Reading Progress Indicator */}
      <ReadingProgress target="article" />

      <article className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        {/* Navigation Bar */}
        <div className="border-b bg-white/80 backdrop-blur-xl sticky top-16 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                  {blogPost.tags?.split(',')[0] || 'Uncategorized'}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blogPost.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {blogPost.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{blogPost.author}</p>
                      <p className="text-sm">Author</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{blogPost.publishedAt ? new Date(blogPost.publishedAt).toLocaleDateString() : 'Not published'}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={blogPost.featuredImage || "/placeholder.svg"}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                  <article className="prose prose-lg max-w-none">
                    <BlogRenderer
                      content={blogPost.content}
                      editorData={blogPost.editorData || undefined}
                      className="prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:text-slate-900 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:text-slate-700"
                    />
                  </article>

                  {/* Tags Section */}
                  {blogPost.tags && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Related Topics
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {blogPost.tags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border border-blue-200 hover:border-blue-300"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Share this article</h3>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                        Twitter
                      </button>
                      <button className="flex items-center px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </button>
                      <button className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4">
                  <div className="sticky top-32 space-y-8">
                    {/* Related Posts */}
                    <RelatedPosts currentPost={blogPost} />

                    {/* Author Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mr-4 flex items-center justify-center shadow-lg">
                          <span className="text-xl font-bold text-white">
                            {blogPost.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{blogPost.author}</h4>
                          <p className="text-sm text-blue-600 font-medium">Business Expert</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        Expert in business registration and compliance with over 10 years of experience helping
                        entrepreneurs start and grow their businesses successfully.
                      </p>
                      <button className="w-full bg-white hover:bg-gray-50 text-blue-600 font-medium py-2 px-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                        Follow Author
                      </button>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Need Expert Guidance?</h3>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        Our business consultants can help you navigate the registration process and ensure compliance with all requirements.
                      </p>
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                        Get Free Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}

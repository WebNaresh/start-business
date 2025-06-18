import { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import BlogRenderer from "@/components/blog/blog-renderer"
import RelatedPosts from "@/components/blog/related-posts"
import { notFound } from 'next/navigation'
import type { Blog } from '@/lib/types'

async function getBlogPost(slug: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${slug}`, {
      cache: 'no-store'
    })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
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
      publishedTime: new Date(blogPost.publishedAt).toISOString(),
      modifiedTime: new Date(blogPost.updatedAt).toISOString(),
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
      
      <article className="min-h-screen bg-white">
        <div className="border-b bg-white sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
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
                    <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
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

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-8">
                  <BlogRenderer
                    content={blogPost.content}
                    editorData={blogPost.editorData || undefined}
                    className="prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-800"
                  />
                  
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags?.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors cursor-pointer"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-4">
                  <div className="sticky top-24 space-y-6">
                    <RelatedPosts currentPost={blogPost} />
                    
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                          <span className="text-xl font-semibold text-gray-600">
                            {blogPost.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{blogPost.author}</h4>
                          <p className="text-sm text-gray-600">Author</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Expert in business registration and compliance with over 10 years of experience helping
                        entrepreneurs start their businesses.
                      </p>
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

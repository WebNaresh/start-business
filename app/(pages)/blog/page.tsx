"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: {
    name: string
    role: string
    image: string
  }
  date: string
  readTime: string
  category: string
  image: string
}

// Mock API function to fetch all blog posts
const fetchAllBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      slug: "complete-guide-to-business-registration-in-india",
      title: "Complete Guide to Business Registration in India",
      excerpt:
        "Learn everything you need to know about registering your business in India, from choosing the right structure to completing the registration process.",
      author: {
        name: "Rahul Sharma",
        role: "Business Consultant",
        image: "/indian-businessman.png",
      },
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Business Registration",
      image: "/business-registration.png",
    },
    {
      slug: "how-to-choose-the-right-business-structure",
      title: "How to Choose the Right Business Structure",
      excerpt: "Explore the different business structures available and find the one that best suits your needs.",
      author: {
        name: "Priya Patel",
        role: "Legal Advisor",
        image: "/indian-businesswoman.png",
      },
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Business Setup",
      image: "/business-structure-chart.png",
    },
    {
      slug: "gst-registration-simplified",
      title: "GST Registration Simplified: A Step-by-Step Guide",
      excerpt: "Understanding GST registration process and requirements for your business in India.",
      author: {
        name: "Amit Kumar",
        role: "Tax Consultant",
        image: "/placeholder-q7ofj.png",
      },
      date: "March 8, 2024",
      readTime: "5 min read",
      category: "Tax & Compliance",
      image: "/placeholder-e5tnm.png",
    },
    {
      slug: "startup-funding-options-india",
      title: "Startup Funding Options in India: What You Need to Know",
      excerpt: "Comprehensive guide to different funding options available for startups in India.",
      author: {
        name: "Sneha Gupta",
        role: "Investment Advisor",
        image: "/investment-advisor.png",
      },
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "Funding",
      image: "/placeholder-yefag.png",
    },
    {
      slug: "digital-marketing-for-small-businesses",
      title: "Digital Marketing Strategies for Small Businesses",
      excerpt: "Effective digital marketing strategies that small businesses can implement on a budget.",
      author: {
        name: "Ravi Mehta",
        role: "Marketing Expert",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "March 1, 2024",
      readTime: "7 min read",
      category: "Marketing",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      slug: "intellectual-property-protection",
      title: "Protecting Your Intellectual Property: A Business Guide",
      excerpt: "Learn how to protect your business ideas, trademarks, and patents in India.",
      author: {
        name: "Dr. Kavita Singh",
        role: "IP Attorney",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "February 28, 2024",
      readTime: "9 min read",
      category: "Legal",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]
}

export default function BlogListingPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const data = await fetchAllBlogPosts()
        setBlogPosts(data)
      } catch (error) {
        console.error("Failed to load blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    loadBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Business Insights Blog</h1>
          <p className="text-lg text-gray-600">Expert advice and guides for your business journey</p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75} // Reduce if needed
  priority={true} // For LCP image
  placeholder="blur" // Optional blur-up
      blurDataURL="/placeholder.svg"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                    <Image
                      src={post.author.image || "/placeholder.svg"}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-xs text-gray-500">{post.author.role}</p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

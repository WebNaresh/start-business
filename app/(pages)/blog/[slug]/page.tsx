"use client"

import type React from "react"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Share2, Bookmark, MessageSquare, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

// Update the interface to accept JSX content
interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: React.ReactNode // Changed from string to React.ReactNode
  author: {
    name: string
    role: string
    image: string
  }
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
}

// Replace the fetchBlogPostBySlug function with this version that returns JSX content
const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const posts: Record<string, BlogPost> = {
    "complete-guide-to-business-registration-in-india": {
      slug: "complete-guide-to-business-registration-in-india",
      title: "Complete Guide to Business Registration in India",
      excerpt:
        "Learn everything you need to know about registering your business in India, from choosing the right structure to completing the registration process.",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Starting a business in India requires careful planning and understanding of the registration process. This
            comprehensive guide will walk you through everything you need to know to get your business legally
            registered and operational.
          </p>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
              1. Choosing the Right Business Structure
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The first step in business registration is choosing the right structure for your business. Each structure
              has its own advantages and legal requirements:
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Sole Proprietorship</h3>
              <p className="text-gray-700 leading-relaxed">
                The simplest form of business structure, ideal for individual entrepreneurs. It requires minimal
                paperwork and offers complete control over business decisions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Partnership Firm</h3>
              <p className="text-gray-700 leading-relaxed">
                Suitable for businesses with multiple owners. Partners share profits, losses, and management
                responsibilities according to the partnership agreement.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Private Limited Company</h3>
              <p className="text-gray-700 leading-relaxed">
                Most popular choice for startups and growing businesses. Offers limited liability protection and easier
                access to funding.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Limited Liability Partnership (LLP)</h3>
              <p className="text-gray-700 leading-relaxed">
                Combines benefits of partnership and company structures. Partners have limited liability while
                maintaining operational flexibility.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
              2. Required Documents
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before starting the registration process, ensure you have all necessary documents ready:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong className="text-gray-900">Identity Proof:</strong> PAN Card, Aadhaar Card, Passport, or Voter ID
              </li>
              <li>
                <strong className="text-gray-900">Address Proof:</strong> Utility bills, bank statements, or rental
                agreement
              </li>
              <li>
                <strong className="text-gray-900">Registered Office Proof:</strong> NOC from landlord, utility bills
              </li>
              <li>
                <strong className="text-gray-900">Digital Signature Certificate (DSC)</strong> for directors
              </li>
              <li>
                <strong className="text-gray-900">Passport-size photographs</strong> of directors/partners
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
              3. Step-by-Step Registration Process
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">Follow these steps to register your business:</p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Step 1: Obtain Digital Signature Certificate (DSC)
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All directors must obtain a DSC from a certified agency. This is required for filing documents
                electronically with MCA.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Step 2: Apply for Director Identification Number (DIN)
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Each director needs a unique DIN. Apply through the MCA portal with required documents.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Name Reservation</h3>
              <p className="text-gray-700 leading-relaxed">
                Check name availability and reserve your company name through the MCA portal. Provide 2-3 name options.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: File Incorporation Documents</h3>
              <p className="text-gray-700 leading-relaxed">
                Submit incorporation forms (SPICe+) along with required documents and fees.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Step 5: Obtain Certificate of Incorporation
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Once approved, you'll receive the Certificate of Incorporation, making your business legally recognized.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
              4. Post-Registration Compliance
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">After registration, ensure ongoing compliance:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>File annual returns and financial statements</li>
              <li>Maintain statutory registers and records</li>
              <li>Conduct board meetings as required</li>
              <li>Comply with tax obligations (GST, Income Tax)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
              5. Common Mistakes to Avoid
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">Avoid these common pitfalls during registration:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Choosing inappropriate business structure</li>
              <li>Incomplete or incorrect documentation</li>
              <li>Ignoring trademark and domain name availability</li>
              <li>Not understanding compliance requirements</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed">
              Business registration in India, while complex, is manageable with proper planning and documentation.
              Consider consulting with professionals to ensure compliance and avoid costly mistakes. The investment in
              proper registration pays off through legal protection, credibility, and access to business opportunities.
            </p>
          </div>
        </div>
      ),
      author: {
        name: "Rahul Sharma",
        role: "Business Consultant",
        image: "/indian-businessman.png",
      },
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Business Registration",
      tags: ["Business Setup", "Legal Compliance", "Company Registration", "Startup Guide"],
      image: "/placeholder.svg?height=400&width=800",
    },
    "how-to-choose-the-right-business-structure": {
      slug: "how-to-choose-the-right-business-structure",
      title: "How to Choose the Right Business Structure",
      excerpt: "Explore the different business structures available and find the one that best suits your needs.",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Choosing the right business structure is one of the most important decisions you'll make as an entrepreneur.
            It affects everything from your daily operations to taxes and how much of your personal assets are at risk.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
            Understanding Your Options
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Let's explore the main business structures available in India and their key characteristics.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Sole Proprietorship</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Best for:</strong> Individual entrepreneurs, freelancers, small service
              providers
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Pros:</strong> Simple setup, complete control, minimal compliance
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Cons:</strong> Unlimited personal liability, limited growth potential
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Partnership</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Best for:</strong> Businesses with 2-20 partners
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Pros:</strong> Shared resources and expertise, simple taxation
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Cons:</strong> Joint liability, potential for disputes
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Private Limited Company</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Best for:</strong> Startups seeking investment, growing businesses
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Pros:</strong> Limited liability, easier to raise capital, perpetual
              existence
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Cons:</strong> Higher compliance requirements, more expensive to set up
            </p>
          </div>
        </div>
      ),
      author: {
        name: "Priya Patel",
        role: "Legal Advisor",
        image: "/placeholder.svg?height=60&width=60",
      },
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Business Setup",
      tags: ["Business Structure", "Legal Advice", "Entrepreneurship"],
      image: "/placeholder.svg?height=400&width=800",
    },
  }

  return posts[slug] || null
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        const data = await fetchBlogPostBySlug(resolvedParams.slug)
        setBlogPost(data)
      } catch (error) {
        console.error("Failed to load blog post:", error)
      } finally {
        setLoading(false)
      }
    }
    loadBlogPost()
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="aspect-video bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                {blogPost.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blogPost.title}</h1>

              {/* Author and Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center">
                  <Image
                    src={blogPost.author.image || "/placeholder.svg"}
                    alt={blogPost.author.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-3"
                    quality={75} // Reduce if needed
  priority={true} // For LCP image
  placeholder="blur" // Optional blur-up
      blurDataURL="/placeholder.svg"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{blogPost.author.name}</p>
                    <p className="text-sm">{blogPost.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={blogPost.image || "/placeholder.svg"}
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="max-w-none">{blogPost.content}</div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share and Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Article
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Bookmark className="w-4 h-4" />
                    Save for Later
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Discuss
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Need Expert Guidance?</h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      Our business consultants can help you navigate the registration process and ensure compliance with
                      all requirements.
                    </p>
                    <WhatsAppCTAButton className="w-full justify-center">Get Free Consultation</WhatsAppCTAButton>
                  </div>

                  {/* Author Card */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <Image
                        src={blogPost.author.image || "/placeholder.svg"}
                        alt={blogPost.author.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{blogPost.author.name}</h4>
                        <p className="text-sm text-gray-600">{blogPost.author.role}</p>
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
  )
}

"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Calendar, Clock, User, Tag, Share2, Bookmark, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

// This would typically come from your CMS or API
const mockBlogPost = {
  slug: "complete-guide-to-business-registration-in-india",
  title: "Complete Guide to Business Registration in India",
  excerpt: "Learn everything you need to know about registering your business in India, from choosing the right structure to completing the registration process.",
  content: `
    <p>Starting a business in India requires careful planning and understanding of the registration process. This comprehensive guide will walk you through everything you need to know.</p>
    
    <h2>1. Choosing the Right Business Structure</h2>
    <p>The first step in business registration is choosing the right structure for your business. The most common options include:</p>
    <ul>
      <li>Sole Proprietorship</li>
      <li>Partnership Firm</li>
      <li>Private Limited Company</li>
      <li>Public Limited Company</li>
      <li>Limited Liability Partnership (LLP)</li>
    </ul>

    <h2>2. Required Documents</h2>
    <p>Prepare the following documents before starting the registration process:</p>
    <ul>
      <li>Identity proof of directors/partners</li>
      <li>Address proof of the registered office</li>
      <li>Business plan</li>
      <li>Bank statements</li>
      <li>Utility bills</li>
    </ul>

    <h2>3. Registration Process</h2>
    <p>The registration process typically involves these steps:</p>
    <ol>
      <li>Obtain Digital Signature Certificate (DSC)</li>
      <li>Apply for Director Identification Number (DIN)</li>
      <li>Name Reservation from MCA</li>
      <li>File incorporation documents</li>
      <li>Obtain Certificate of Incorporation</li>
    </ol>
  `,
  author: {
    name: "Rahul Sharma",
    role: "Business Consultant",
    image: "/indian-businessman.png"
  },
  date: "March 15, 2024",
  readTime: "8 min read",
  category: "Business Registration",
  tags: ["Business Setup", "Legal Compliance", "Company Registration"],
  image: "/blog/business-registration.jpg"
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // In a real application, you would fetch the blog post data based on the slug
  // const blogPost = await fetchBlogPostBySlug(params.slug)

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                {mockBlogPost.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {mockBlogPost.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <Image
                    src={mockBlogPost.author.image}
                    alt={mockBlogPost.author.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{mockBlogPost.author.name}</p>
                    <p className="text-sm">{mockBlogPost.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{mockBlogPost.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{mockBlogPost.readTime}</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
              <Image
                src={mockBlogPost.image}
                alt={mockBlogPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: mockBlogPost.content }}
                />
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {mockBlogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share and Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Comment
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Need Help with Business Registration?</h3>
                    <p className="text-gray-600 mb-6">
                      Our experts can guide you through the entire process and ensure a smooth registration.
                    </p>
                    <WhatsAppCTAButton className="w-full justify-center">
                      Get Expert Help
                    </WhatsAppCTAButton>
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
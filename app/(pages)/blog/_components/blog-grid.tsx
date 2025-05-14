"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Clock, ArrowRight } from "lucide-react"

// Mock blog posts data - this would typically come from your CMS or API
const blogPosts = [
  {
    slug: "complete-guide-to-business-registration-in-india",
    title: "Complete Guide to Business Registration in India",
    excerpt: "Learn everything you need to know about registering your business in India, from choosing the right structure to completing the registration process.",
    image: "/blog/business-registration.jpg",
    category: "Business Registration",
    date: "March 15, 2024",
    readTime: "8 min read",
    author: {
      name: "Rahul Sharma",
      image: "/indian-businessman.png"
    }
  },
  {
    slug: "understanding-gst-registration-requirements",
    title: "Understanding GST Registration Requirements",
    excerpt: "A comprehensive guide to GST registration, including eligibility criteria, required documents, and step-by-step process.",
    image: "/blog/gst-registration.jpg",
    category: "Tax Compliance",
    date: "March 12, 2024",
    readTime: "6 min read",
    author: {
      name: "Priya Patel",
      image: "/indian-businesswoman.png"
    }
  },
  {
    slug: "trademark-registration-process-in-india",
    title: "Trademark Registration Process in India",
    excerpt: "Everything you need to know about protecting your brand through trademark registration in India.",
    image: "/blog/trademark.jpg",
    category: "Legal Updates",
    date: "March 10, 2024",
    readTime: "7 min read",
    author: {
      name: "Vikram Singh",
      image: "/indian-businessman.png"
    }
  }
]

export default function BlogGrid() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <motion.article
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 
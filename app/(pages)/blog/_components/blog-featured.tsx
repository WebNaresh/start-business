"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default function BlogFeatured() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const featuredPosts = [
    {
      title: "New GST Registration Process: A Complete Guide for 2024",
      excerpt: "Learn about the latest changes in GST registration process and how to ensure compliance with the new regulations.",
      image: "/blog/gst-registration.jpg",
      category: "Tax Compliance",
      date: "Mar 15, 2024",
      readTime: "8 min read"
    },
    {
      title: "Essential Documents for Company Registration in India",
      excerpt: "A comprehensive checklist of all required documents for registering your company in India, including recent updates.",
      image: "/blog/company-registration.jpg",
      category: "Business Registration",
      date: "Mar 12, 2024",
      readTime: "6 min read"
    },
    {
      title: "Startup India: Latest Government Initiatives and Benefits",
      excerpt: "Explore the newest government initiatives and benefits available for startups in India under the Startup India program.",
      image: "/blog/startup-india.jpg",
      category: "Startup Guide",
      date: "Mar 10, 2024",
      readTime: "10 min read"
    }
  ]

  return (
    <section className="py-20 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Featured <span className="text-[#2563eb]">Articles</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay updated with our most popular and recent articles on business registration and compliance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#2563eb] text-white text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-[#2563eb] font-medium hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
} 
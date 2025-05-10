"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default function BlogGrid() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const posts = [
    {
      title: "Understanding the New Income Tax Slabs for FY 2024-25",
      excerpt: "A detailed analysis of the latest income tax slabs and how they affect different income groups.",
      image: "/blog/income-tax.jpg",
      category: "Tax Compliance",
      date: "Mar 8, 2024",
      readTime: "5 min read"
    },
    {
      title: "Digital Signature Certificate: Complete Guide",
      excerpt: "Everything you need to know about DSC, its types, and how to obtain one for your business.",
      image: "/blog/digital-signature.jpg",
      category: "Business Registration",
      date: "Mar 6, 2024",
      readTime: "7 min read"
    },
    {
      title: "MSME Registration Benefits: What's New in 2024",
      excerpt: "Explore the latest benefits and incentives available for MSMEs under the new registration scheme.",
      image: "/blog/msme.jpg",
      category: "Startup Guide",
      date: "Mar 4, 2024",
      readTime: "6 min read"
    },
    {
      title: "Company Annual Compliance Checklist",
      excerpt: "A comprehensive checklist of all annual compliance requirements for private limited companies.",
      image: "/blog/compliance.jpg",
      category: "Legal Updates",
      date: "Mar 2, 2024",
      readTime: "8 min read"
    },
    {
      title: "GST Return Filing: Common Mistakes to Avoid",
      excerpt: "Learn about the most common mistakes in GST return filing and how to prevent them.",
      image: "/blog/gst-returns.jpg",
      category: "Tax Compliance",
      date: "Feb 29, 2024",
      readTime: "5 min read"
    },
    {
      title: "Business Expansion: Legal Considerations",
      excerpt: "Important legal aspects to consider when expanding your business to new locations.",
      image: "/blog/expansion.jpg",
      category: "Business Growth",
      date: "Feb 27, 2024",
      readTime: "9 min read"
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
            Latest <span className="text-[#2563eb]">Articles</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay informed with our latest articles on business and compliance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-12 gap-2"
        >
          <button className="px-4 py-2 rounded-lg bg-[#2563eb] text-white hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-slate-600 hover:bg-slate-100 transition-colors">
            2
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-slate-600 hover:bg-slate-100 transition-colors">
            3
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-slate-600 hover:bg-slate-100 transition-colors">
            Next
          </button>
        </motion.div>
      </div>
    </section>
  )
} 
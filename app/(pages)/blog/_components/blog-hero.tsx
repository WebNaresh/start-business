"use client"

import { Search } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function BlogHero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories = [
    "Business Registration",
    "Tax Compliance",
    "Legal Updates",
    "Startup Guide",
    "Company Law",
    "GST Updates"
  ]

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full -ml-48 -mb-48 opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Business Insights & <span className="text-[#2563eb]">Updates</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Stay informed with the latest updates on business registration, compliance, and regulatory changes
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2563eb] text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full bg-blue-50 text-[#2563eb] hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 
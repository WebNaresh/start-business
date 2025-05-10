"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Send } from "lucide-react"

export default function BlogNewsletter() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-[#2563eb] to-blue-600 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-lg text-blue-100">
              Get the latest updates on business registration, compliance, and regulatory changes directly in your inbox
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border-2 border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:border-white"
              />
              <button className="px-8 py-4 bg-white text-[#2563eb] rounded-full font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                Subscribe
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-blue-200 text-center mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 
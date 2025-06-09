"use client"

import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import CallCTAButton from "@/components/call-cta-button"

export default function ContactHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch with Us
          </h1>
          <p className="text-lg text-blue-100 mb-8">
            Have questions about our services? We're here to help. Reach out to us through any of our contact channels.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <CallCTAButton className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </CallCTAButton>
            <motion.a
              href="tel:+919168499520"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 mr-2" />
              +91 91684 99520
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { MessageCircle, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20 md:py-28">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-40 -mb-40 blur-2xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-6 h-6 bg-white/20 rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-4 h-4 bg-white/30 rounded-full"
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <MessageCircle className="w-4 h-4 mr-2" />
            24/7 Support Available
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Get In{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
          >
            Ready to start your business journey? Our expert team is here to guide you through every step of the
            process.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
              <div className="text-blue-200 text-sm">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">10K+</div>
              <div className="text-blue-200 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">4.9★</div>
              <div className="text-blue-200 text-sm">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-blue-200 text-sm">Compliance</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <WhatsAppCTAButton className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat With Us Now
            </WhatsAppCTAButton>
            <motion.a
              href="tel:+919699214195"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

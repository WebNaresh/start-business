'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowLeft, Clock, Sparkles, Building2, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ComingSoonPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-100/15 to-transparent rounded-full -ml-40 -mb-40 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          {/* Professional Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Coming <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Soon...</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl text-slate-700 mb-6 font-medium">
            We're Building Something Amazing
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            This page is currently under development. We're working hard to bring you the best business registration and compliance services. Please check back soon!
          </p>

          {/* Progress indicator */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <span>Development Progress</span>
              <span>85%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-base font-semibold"
          >
            <Link href="/">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 px-8 py-4 text-base font-medium"
          >
            <Link href="/services">
              <Building2 className="w-5 h-5 mr-2" />
              View Our Services
            </Link>
          </Button>
        </motion.div>

        {/* Contact information */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">Need Help Right Now?</h3>
          </div>

          <p className="text-slate-600 mb-6">
            While this page is under construction, our team is still available to help you with your business needs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+919168499520"
              className="flex items-center justify-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors group"
            >
              <Phone className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <div className="text-sm font-medium text-green-800">Call Us</div>
                <div className="text-sm text-green-600">+91 91684 99520</div>
              </div>
            </a>

            <a
              href="mailto:start@startbusiness.co.in"
              className="flex items-center justify-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors group"
            >
              <Mail className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <div className="text-sm font-medium text-blue-800">Email Us</div>
                <div className="text-sm text-blue-600">start@startbusiness.co.in</div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
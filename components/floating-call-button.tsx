"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        href="tel:+919168499520"
        className="fixed left-6 bottom-6 z-[8999] flex items-center gap-2 px-4 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Call Us"
      >
        <Phone className="w-5 h-5" />
        <span className="font-medium text-sm hidden sm:inline">Call Us Now</span>
      </motion.a>
    </AnimatePresence>
  )
} 
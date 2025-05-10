"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function AboutCta() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800"></div>
      <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-5"></div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center text-white"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Your Business Journey?</h2>
          <p className="mb-8 text-lg text-slate-300">
            Let our experts guide you through the process and help you establish your business with ease.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <WhatsAppCTAButton size="lg" className="bg-yellow-500 text-blue-900 hover:bg-yellow-600 group">
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </WhatsAppCTAButton>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => (window.location.href = "/contact")}
            >
              Schedule a Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

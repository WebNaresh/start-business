"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Star, Users, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function CtaSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative py-16 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800"></div>
      <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-5"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Start Your Business?</h2>
            <p className="mb-6 text-lg text-slate-300">
              Get expert guidance and support for all your business registration and compliance needs
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <WhatsAppCTAButton size="lg" className="group">
                Contact Us Today
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
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
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Star, title: "4.9/5", subtitle: "Customer Satisfaction" },
              { icon: Award, title: "1000+", subtitle: "Businesses Registered" },
              { icon: Users, title: "50+", subtitle: "Expert Consultants" },
              { icon: Shield, title: "100%", subtitle: "Legal Compliance" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-lg bg-white/10 p-4 backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                <item.icon className="mb-2 h-8 w-8 text-yellow-400 transition-transform group-hover:scale-110" />
                <h3 className="mb-1 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

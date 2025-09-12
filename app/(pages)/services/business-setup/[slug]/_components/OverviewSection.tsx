"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import type { ServiceData } from "./service-types"
import Script from "next/script"
import ZohoBusinessSetupForm from "@/components/forms/zoho-business-setup-form"

interface OverviewSectionProps {
  service: ServiceData
}

export default function OverviewSection({ service }: OverviewSectionProps) {
  const scrollToForm = () => {
    const formElement = document.getElementById('consultation-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Add a subtle highlight effect
      formElement.style.animation = 'pulse 1s ease-in-out'
      setTimeout(() => {
        formElement.style.animation = ''
      }, 1000)
    }
  }

  // Generate structured data for the service
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Your Company Name",
      "telephone": "+919699214195"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Quick Turnaround Time",
      "Expert Legal Guidance",
      "End-to-End Solutions",
      "100% Compliance Assured"
    ]
  }

  return (
    <section id="overview" className="relative py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-slate-50 to-white overflow-hidden" aria-labelledby="overview-heading">
      <Script
        id="service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mt-48 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full -ml-40 -mb-40 blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 items-stretch min-h-[600px] lg:min-h-[650px]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 text-center lg:text-left"
          >
            <motion.h1
              id="overview-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight"
            >
              <span className="text-blue-600">{service.title.split(" ").slice(0, 2).join(" ")}</span>{" "}
              <span className="text-slate-900">{service.title.split(" ").slice(2).join(" ")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base lg:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {service.description}
            </motion.p>

            {/* Enhanced Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8"
              role="list"
              aria-label="Service features"
            >
              {[
                "⏱️ Quick Turnaround",
                "🎯 Expert Guidance", 
                "🔄 End-to-End Solutions",
                "✅ 100% Compliance",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center p-2 sm:p-3 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300 cursor-default"
                  role="listitem"
                >
                  <span className="text-slate-700 text-xs sm:text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 lg:mb-0"
            >
              <Button
                variant="default"
                size="default"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => (window.location.href = "tel:+919699214195")}
                aria-label="Call expert for consultation"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                Call Expert Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Form - Sticky on larger screens */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full lg:sticky lg:top-4"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-slate-100 relative overflow-hidden backdrop-blur-sm">
              {/* Improved Form Background Pattern */}
              <div className="absolute inset-0 opacity-3" aria-hidden="true">
                <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16"></div>
                <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tr from-blue-400 to-blue-500 rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
              </div>

              <div className="relative z-10" id="consultation-form">
                <ZohoBusinessSetupForm
                  title={`Register For ${service.shortTitle.replace("Registration", "").trim()} Today`}
                  defaultService={service.shortTitle}
                  className="border-0 shadow-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

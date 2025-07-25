"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import { ArrowRight, CheckCircle, Phone, Mail, User, Send, Sparkles } from "lucide-react"
import type { ServiceData } from "./service-types"
import Script from "next/script"

interface OverviewSectionProps {
  service: ServiceData
}

export default function OverviewSection({ service }: OverviewSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", mobile: "", email: "" })
      }, 3000)
    }, 1500)
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
    <section id="overview" className="relative py-4 md:py-8 bg-white overflow-hidden" aria-labelledby="overview-heading">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              id="overview-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight"
            >
              <span className="text-blue-600">{service.title.split(" ").slice(0, 2).join(" ")}</span>{" "}
              <span className="text-slate-900">{service.title.split(" ").slice(2).join(" ")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base text-slate-600 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {service.description}
            </motion.p>

            {/* Enhanced Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
              role="list"
              aria-label="Service features"
            >
              {[
                "⏱️ Quick Turnaround Time",
                "🎯 Expert Legal Guidance",
                "🔄 End-to-End Solutions",
                "✅ 100% Compliance Assured",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-all duration-300"
                  role="listitem"
                >
                  <span className="text-slate-700 text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* <WhatsAppCTAButton className="">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </WhatsAppCTAButton> */}
              <Button
                variant="default"
                className=""
                onClick={() => (window.location.href = "tel:+919699214195")}
                aria-label="Call expert for consultation"
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                Call Expert
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-full w-full mx-auto lg:mx-0"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 relative overflow-hidden">
              {/* Form Background Pattern */}
              <div className="absolute inset-0 opacity-5" aria-hidden="true">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full -ml-12 -mb-12"></div>
              </div>

              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    {/* Form Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">
                        Register For <span className="text-blue-600">{service.shortTitle.replace("Registration", "").trim()}</span> Today
                      </h3>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Registration form">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="sr-only">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="sr-only">Mobile Number</Label>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl"
                          required
                          aria-required="true"
                          pattern="[0-9]{10}"
                          aria-label="Mobile number (10 digits)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="sr-only">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl"
                          required
                          aria-required="true"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        aria-label={isSubmitting ? "Processing your request" : "Submit registration form"}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              aria-hidden="true"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                            Get Free Consultation
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                    role="alert"
                    aria-live="polite"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                      className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                      aria-hidden="true"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-blue-600 mb-2">Thank You!</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Your request has been submitted successfully. Our expert will call you within 30 minutes.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-slate-700">
                        <strong>What's Next?</strong>
                        <br />• Expert consultation call
                        <br />• Customized service plan
                        <br />• Instant process initiation
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

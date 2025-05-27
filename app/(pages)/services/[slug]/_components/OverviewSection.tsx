"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import {
  ArrowRight,
  Star,
  CheckCircle,
  Clock,
  Shield,
  Award,
  TrendingUp,
  Phone,
  Mail,
  User,
  Send,
  Sparkles,
} from "lucide-react"
import type { ServiceData } from "./service-types"

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

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-600 to-blue-700",
      green: "from-green-600 to-green-700",
      purple: "from-purple-600 to-purple-700",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const gradientClass = getColorClasses(service.color)

  return (
    <section id="overview" className={`relative py-4 md:py-8 bg-gradient-to-br ${gradientClass} overflow-hidden`}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl"
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
          className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-40 -mb-40 blur-2xl"
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
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-white rounded-full -ml-32 -mt-32 blur-xl opacity-20"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-6 h-6 bg-white/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-4 h-4 bg-white/30 rounded-full"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 left-10 w-2 h-2 bg-white/40 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {service.popular && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2 backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  Most Popular Service
                </Badge>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {service.title.split(" ").slice(0, 2).join(" ")}
              </span>{" "}
              <span className="text-white">{service.title.split(" ").slice(2).join(" ")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {service.description}
            </motion.p>

       

            {/* Enhanced Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
            >
              {[
                "⚡ Lightning Fast Processing",
                "🎯 Expert Legal Guidance",
                "🔄 End-to-End Solutions",
                "✅ 100% Compliance Assured",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-white text-sm font-medium">{feature}</span>
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
              <WhatsAppCTAButton className="">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </WhatsAppCTAButton>
              <Button
                variant="outline"
                className="text-green-500"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Expert
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Form Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 rounded-full -ml-12 -mb-12"></div>
              </div>

              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    {/* Form Header */}
                    <div className="text-center mb-6">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Get Free Consultation</h3>
                      <p className="text-slate-600">
                        Fill your details and our expert will call you back within 30 minutes
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-slate-700 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-sm font-medium text-slate-700 flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Mobile Number
                        </Label>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
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
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
                    <p className="text-green-600 mb-4">
                      Your request has been submitted successfully. Our expert will call you within 30 minutes.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-sm text-green-700">
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

            {/* Floating Elements around Form */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full opacity-50"
              animate={{
                y: [0, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

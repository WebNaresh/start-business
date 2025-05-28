"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import {
  CheckCircle,
  Clock,
  Star,
  Shield,
  Award,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Users,
  Zap,
  Building,
} from "lucide-react"
import { motion } from "framer-motion"
import type { ServiceData } from "./service-types"

interface PricingSectionProps {
  service: ServiceData
}

export default function PricingSection({ service }: PricingSectionProps) {
  // Get dynamic colors based on service color
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        gradient: "from-blue-500 to-blue-600",
        accent: "bg-blue-500",
        light: "bg-blue-100",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        gradient: "from-green-500 to-green-600",
        accent: "bg-green-500",
        light: "bg-green-100",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        gradient: "from-purple-500 to-purple-600",
        accent: "bg-purple-500",
        light: "bg-purple-100",
      },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const colors = getColorClasses(service.color)

  const savings =
    Number.parseInt(service.pricing?.originalAmount?.replace(/,/g, "") || "0") -
    Number.parseInt(service.pricing?.amount?.replace(/,/g, "") || "0")
  const savingsPercent = Math.round(
    (savings / Number.parseInt(service.pricing?.originalAmount?.replace(/,/g, "") || "1")) * 100,
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="pricing"
      className="py-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mt-48 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full -ml-40 -mb-40 blur-2xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-40"
        animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-3 h-3 bg-purple-400 rounded-full opacity-50"
        animate={{ y: [0, 25, 0], rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className={`mb-6 ${colors.bg} ${colors.text} ${colors.border} px-6 py-3 text-sm`}>
              <Sparkles className="w-4 h-4 mr-2" />
              Transparent Pricing
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-slate-800">Simple &</span>{" "}
              <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                Affordable Pricing
              </span>
            </h2>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Get started with our {service.shortTitle} service at an unbeatable price with no hidden costs
            </p>
          </motion.div>

          {/* Main Pricing Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8 mb-16"
          >
            {/* Pricing Card */}
            <motion.div variants={itemVariants} className="lg:col-span-2 relative">
              <div
                className={`bg-gradient-to-br ${colors.gradient} rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
                </div>

                <div className="relative z-10">
                  {/* Popular Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 backdrop-blur-sm">
                      <Star className="w-4 h-4 mr-2 fill-current" />
                      Most Popular Choice
                    </Badge>
                    <Badge className="bg-green-500 text-white px-4 py-2">Save {savingsPercent}%</Badge>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-4">{service.title}</h3>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-4xl md:text-5xl font-bold">
                        {service.pricing?.currency || "₹"}
                        {service.pricing?.amount || "2,999"}
                      </span>
                      <div className="text-right">
                        <span className="text-xl text-white/70 line-through block">
                          {service.pricing?.currency || "₹"}
                          {service.pricing?.originalAmount || "4,999"}
                        </span>
                        <span className="text-white/90 text-sm">+ GST</span>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-white/90 text-sm">
                        💰 You save ₹{savings.toLocaleString()} with our special offer!
                      </p>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      What's Included
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.pricing?.includes?.map((item: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center text-white/90 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0 text-green-300" />
                          {item}
                        </motion.div>
                      )) || []}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <WhatsAppCTAButton className="">
               
                      Get Started Now
                    </WhatsAppCTAButton>
                    <Button
                      variant="outline"
                      className="text-green-500"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Expert
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline & Features */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Timeline Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center">
                  <Clock className={`w-5 h-5 ${colors.text} mr-3`} />
                  Processing Timeline
                </h4>
                <div className="space-y-3">
                  {service.timeline?.steps?.map((step, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0"
                    >
                      <span className="text-sm text-slate-700">{step.name}</span>
                      <span className="font-medium text-sm text-slate-800">{step.duration}</span>
                    </div>
                  )) || []}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-800">Total Time:</span>
                    <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
                      {service.timeline?.total || "7-10 days"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-3" />
                  Why Choose Us
                </h4>
                <div className="space-y-4">
                  {[
                    { icon: Award, text: "100% Success Rate", color: "text-blue-600" },
                    { icon: Users, text: "10,000+ Happy Clients", color: "text-green-600" },
                    { icon: Zap, text: "Lightning Fast Process", color: "text-orange-600" },
                    { icon: Shield, text: "100% Secure & Legal", color: "text-purple-600" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center text-slate-700"
                    >
                      <item.icon className={`w-4 h-4 mr-3 ${item.color}`} />
                      <span className="text-sm">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

        
        </div>
      </div>
    </section>
  )
}

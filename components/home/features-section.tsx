"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Eye, Zap, Shield, Smartphone, GraduationCap, ArrowRight, CheckCircle, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Eye,
      title: "Pay What You See",
      shortDesc: "Transparent pricing, no hidden costs",
      benefit: "100% transparent pricing",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Zap,
      title: "Accelerated Processing",
      shortDesc: "50% faster than industry standard",
      benefit: "Lightning-fast delivery",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: Shield,
      title: "Success Guarantee",
      shortDesc: "98% approval rate, money-back promise",
      benefit: "Risk-free guarantee",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Smartphone,
      title: "Digital First Approach",
      shortDesc: "Paperless, secure, real-time tracking",
      benefit: "100% digital experience",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: GraduationCap,
      title: "Built by CA-CS Team",
      shortDesc: "Expert CAs & CSs for speed + precision",
      benefit: "Professional expertise",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ]

  return (
    <section className="py-8 relative overflow-hidden bg-gradient-to-br from-slate-50 to-white" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full -mr-36 -mt-36 opacity-60 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full -ml-32 -mb-32 opacity-50 blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Why 1,000+ Businesses Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Us?
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Five key reasons that make us different</p>
        </motion.div>

        {/* Features Grid - Better Alignment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-12"
        >
          {/* Top Row - 3 Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* Icon */}
                <div
                  className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{feature.shortDesc}</p>

                {/* Benefit Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {feature.benefit}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - 2 Cards Centered */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.slice(3, 5).map((feature, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onMouseEnter={() => setActiveFeature(index + 3)}
              >
                {/* Icon */}
                <div
                  className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{feature.shortDesc}</p>

                {/* Benefit Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {feature.benefit}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div>
            <h3 className="text-xl font-bold mb-2">Ready to Experience the Difference?</h3>
            <p className="text-base text-blue-100 mb-6 max-w-2xl mx-auto">
            Let our experts guide you through the entire process, from choosing the right structure to completing all registrations.
            </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WhatsAppCTAButton className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl shadow-lg">
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </WhatsAppCTAButton>

          
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

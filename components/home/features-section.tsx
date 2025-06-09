"use client"

import { useState } from "react"
import { Eye, Zap, Shield, Smartphone, GraduationCap, ArrowRight, CheckCircle, Star, Headphones } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState<number>(0)

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
    {
      icon: Headphones,
      title: "24/7 Support",
      shortDesc: "Round-the-clock assistance and guidance",
      benefit: "Always available",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ]

  return (
    <section className="py-8 relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full -mr-36 -mt-36 opacity-60 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full -ml-32 -mb-32 opacity-50 blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Why 1,000+ Businesses Choose Us
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Us?
            </span>
          </h2>
          <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto">Five key reasons that make us different</p>
        </div>

        {/* Features Grid - Better Alignment */}
        <div className="max-w-6xl mx-auto mb-12">
          {/* All Features in 2x3 Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-4 md:p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* Icon */}
                <div
                  className={`${feature.bgColor} w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-5 h-5 md:w-7 md:h-7 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[10px] md:text-xs text-slate-600 mb-3 md:mb-4 leading-relaxed">{feature.shortDesc}</p>

                {/* Benefit Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px] md:text-xs bg-slate-100 text-slate-700">
                    <CheckCircle className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                    {feature.benefit}
                  </Badge>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Ready to Experience the Difference?</h3>
              <p className="text-sm md:text-base text-blue-100 mb-4 md:mb-6 max-w-2xl mx-auto">
                Let our experts guide you through the entire process, from choosing the right structure to completing all registrations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WhatsAppCTAButton className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 md:px-8 py-2 md:py-3 rounded-xl shadow-lg text-sm md:text-base">
                Start Your Journey
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
              </WhatsAppCTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

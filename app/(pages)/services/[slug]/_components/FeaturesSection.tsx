"use client"

import { CheckCircle, Users, Star, Sparkles, ArrowRight, Zap, Shield, Award, TrendingUp } from "lucide-react"
import type { ServiceData } from "./service-types"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface FeaturesSectionProps {
  service: ServiceData
}

export default function FeaturesSection({ service }: FeaturesSectionProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredIdeal, setHoveredIdeal] = useState<number | null>(null)

  // Get dynamic colors based on service color
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        gradient: "from-blue-500 to-blue-600",
        light: "bg-blue-100",
        accent: "bg-blue-500",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        gradient: "from-green-500 to-green-600",
        light: "bg-green-100",
        accent: "bg-green-500",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        gradient: "from-purple-500 to-purple-600",
        light: "bg-purple-100",
        accent: "bg-purple-500",
      },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const colors = getColorClasses(service.color)

  // Feature icons mapping
  const featureIcons = [Zap, Shield, Award, TrendingUp, Star, CheckCircle]

  // Ideal for icons mapping
  const idealIcons = [Users, Star, Award, TrendingUp, Shield, Zap]

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
      id="features"
      className="py-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mt-48 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full -ml-40 -mb-40 blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Particles */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-30"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-3 h-3 bg-purple-400 rounded-full opacity-40"
        animate={{
          y: [0, 25, 0],
          rotate: [0, 360],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className={`mb-6 ${colors.bg} ${colors.text} ${colors.border} px-6 py-3 text-sm`}>
              <Sparkles className="w-4 h-4 mr-2" />
              Service Features & Benefits
            </Badge>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-slate-800">Why Choose Our</span>{" "}
              <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                {service.shortTitle}
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              {service.whatIs?.description ||
                "Comprehensive solution designed to meet all your business needs with expert guidance and seamless execution."}
            </p>
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Key Features Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div
                className={`${colors.bg} rounded-3xl p-8 lg:p-10 border-2 ${colors.border} shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
              >
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${colors.accent} rounded-full -mr-16 -mt-16`}></div>
                  <div
                    className={`absolute bottom-0 left-0 w-24 h-24 ${colors.accent} rounded-full -ml-12 -mb-12`}
                  ></div>
                </div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center mb-8">
                    <div
                      className={`${colors.light} w-16 h-16 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <CheckCircle className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-1">Key Features</h3>
                      <p className="text-slate-600 text-sm">What makes us different</p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    {service.keyFeatures?.map((feature: string, index: number) => {
                      const IconComponent = featureIcons[index % featureIcons.length]
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onMouseEnter={() => setHoveredFeature(index)}
                          onMouseLeave={() => setHoveredFeature(null)}
                          className="group/item flex items-center p-4 rounded-xl bg-white/60 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <div
                            className={`w-10 h-10 ${hoveredFeature === index ? colors.accent : colors.light} rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover/item:scale-110`}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${hoveredFeature === index ? "text-white" : colors.text} transition-colors duration-300`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-slate-800 font-medium group-hover/item:text-slate-900 transition-colors">
                              {feature}
                            </span>
                          </div>
                          <ArrowRight
                            className={`w-4 h-4 text-slate-400 group-hover/item:${colors.text.replace("text-", "text-")} group-hover/item:translate-x-1 transition-all duration-300`}
                          />
                        </motion.div>
                      )
                    }) || []}
                  </div>

                  {/* Feature Count Badge */}
                  <div className="mt-6 flex justify-between items-center">
                    <Badge variant="secondary" className={`${colors.bg} ${colors.text} border-0`}>
                      {service.keyFeatures?.length || 0} Key Features
                    </Badge>
                    <div className="flex items-center text-sm text-slate-500">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      Premium Benefits
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ideal For Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="bg-white rounded-3xl p-8 lg:p-10 border-2 border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-600 rounded-full -ml-12 -mb-12"></div>
                </div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center mb-8">
                    <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-1">Perfect For</h3>
                      <p className="text-slate-600 text-sm">Who should choose this</p>
                    </div>
                  </div>

                  {/* Ideal For List */}
                  <div className="space-y-4">
                    {service.idealFor?.map((item: string, index: number) => {
                      const IconComponent = idealIcons[index % idealIcons.length]
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onMouseEnter={() => setHoveredIdeal(index)}
                          onMouseLeave={() => setHoveredIdeal(null)}
                          className="group/item flex items-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <div
                            className={`w-10 h-10 ${hoveredIdeal === index ? "bg-slate-700" : "bg-slate-200"} rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover/item:scale-110`}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${hoveredIdeal === index ? "text-white" : "text-slate-600"} transition-colors duration-300`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-slate-800 font-medium group-hover/item:text-slate-900 transition-colors">
                              {item}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover/item:text-slate-600 group-hover/item:translate-x-1 transition-all duration-300" />
                        </motion.div>
                      )
                    }) || []}
                  </div>

                  {/* Ideal For Count Badge */}
                  <div className="mt-6 flex justify-between items-center">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0">
                      {service.idealFor?.length || 0} Business Types
                    </Badge>
                    <div className="flex items-center text-sm text-slate-500">
                      <Users className="w-4 h-4 mr-1" />
                      Suitable Options
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div
              className={`bg-gradient-to-r ${colors.gradient} rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
              </div>

              <div className="relative z-10">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Left - Stats */}
                  <div className="text-center md:text-left">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-white/80">Success Rate</div>
                  </div>

                  {/* Center - Message */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                    <p className="text-white/90">Join thousands who chose our expert services</p>
                  </div>

                  {/* Right - CTA */}
                  <div className="text-center md:text-right">
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-white/80">Expert Support</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

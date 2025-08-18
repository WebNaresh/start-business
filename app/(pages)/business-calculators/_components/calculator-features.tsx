"use client"

import { motion } from "framer-motion"
import { CheckCircle, Zap, BookOpen, Shield, Users, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CalculatorFeatures() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Calculations",
      description: "Instant results as you adjust parameters with intelligent algorithms",
      color: "yellow",
    },
    {
      icon: BookOpen,
      title: "Educational Content",
      description: "Learn financial concepts with detailed explanations and expert tips",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Accurate Formulas",
      description: "Industry-standard calculations with up-to-date tax rates and regulations",
      color: "green",
    },
    {
      icon: Users,
      title: "User-Friendly Interface",
      description: "Intuitive design with interactive sliders and visual breakdowns",
      color: "purple",
    },
  ]



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
    <section className="py-12 md:py-16 relative" id="features">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-6 py-3 text-sm mb-6">
              <Star className="w-4 h-4 mr-2" />
              Why Choose Our Calculators
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Intelligent Financial Tools</h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our calculators combine accuracy with education, helping you make informed financial decisions with
              confidence. Built specifically for Indian financial regulations and tax laws.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} transition={{ delay: index * 0.1 }} className="group">
                <Card className="h-full bg-white/90 backdrop-blur-sm border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 hover:border-blue-200">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                        feature.color === "yellow"
                          ? "bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600"
                          : feature.color === "blue"
                            ? "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600"
                            : feature.color === "green"
                              ? "bg-gradient-to-br from-green-100 to-green-200 text-green-600"
                              : "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600"
                      }`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Benefits */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 md:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                Trusted by 100,000+ Users
              </h3>
              <p className="text-slate-600">
                Join thousands of businesses and individuals who rely on our calculators for accurate financial planning.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/80 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-slate-600">Accurate</div>
              </div>
              <div className="bg-white/80 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">Free</div>
                <div className="text-sm text-slate-600">Always</div>
              </div>
              <div className="bg-white/80 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">Instant</div>
                <div className="text-sm text-slate-600">Results</div>
              </div>
              <div className="bg-white/80 rounded-xl p-4">
                <div className="text-2xl font-bold text-orange-600">Updated</div>
                <div className="text-sm text-slate-600">Regularly</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

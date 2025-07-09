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
    <section className="py-16 relative" id="calculators">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-6 py-3 text-sm mb-6">
              <Star className="w-4 h-4 mr-2" />
              Why Choose Our Calculators
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Intelligent Financial Tools</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our calculators combine accuracy with education, helping you make informed financial decisions with
              confidence.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} transition={{ delay: index * 0.1 }} className="group">
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                        feature.color === "yellow"
                          ? "bg-yellow-100 text-yellow-600"
                          : feature.color === "blue"
                            ? "bg-blue-100 text-blue-600"
                            : feature.color === "green"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-slate-600 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

        

          {/* Benefits List */}
         
        </motion.div>
      </div>
    </section>
  )
}

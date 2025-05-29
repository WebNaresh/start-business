"use client"

import { motion } from "framer-motion"
import { CheckCircle, Zap, Shield, BarChart3, Calculator, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Instant Calculations",
    description: "Get real-time results as you input values with intelligent algorithms",
  },
  {
    icon: Shield,
    title: "Accurate & Reliable",
    description: "All calculations are based on current financial formulas and regulations",
  },
  {
    icon: BarChart3,
    title: "Visual Charts",
    description: "Interactive charts and graphs to visualize your financial projections",
  },
  {
    icon: Calculator,
    title: "Multiple Scenarios",
    description: "Compare different scenarios and make informed financial decisions",
  },
  {
    icon: TrendingUp,
    title: "Growth Projections",
    description: "See how your investments and savings will grow over time",
  },
  {
    icon: CheckCircle,
    title: "Expert Validated",
    description: "All calculators are reviewed and validated by financial experts",
  },
]

export default function CalculatorFeatures() {
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
    <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Why Choose Our Financial Calculators?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our intelligent calculators provide accurate, real-time financial insights to help you make better
            decisions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

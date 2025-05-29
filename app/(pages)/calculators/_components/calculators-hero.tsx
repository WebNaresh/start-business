"use client"

import { motion } from "framer-motion"
import { Calculator, TrendingUp, PieChart, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CalculatorsHero() {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
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
          className="absolute bottom-0 left-0 w-80 h-80 bg-green-100 rounded-full -ml-40 -mb-40 blur-2xl"
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-blue-50 text-blue-600 border-blue-200 px-6 py-3 text-sm">
              <Calculator className="w-4 h-4 mr-2" />
              Smart Financial Tools
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-slate-800">Intelligent</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Financial Calculators
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Make informed financial decisions with our comprehensive suite of intelligent calculators. From loan
              planning to investment analysis, get accurate calculations instantly.
            </p>

            
          </motion.div>
        </div>
      </div>
    </section>
  )
}

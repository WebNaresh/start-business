"use client"

import { motion } from "framer-motion"
import { Calculator, TrendingUp, Receipt, Building2, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CalculatorsHero() {
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
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
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
        className="absolute bottom-32 left-16 w-3 h-3 bg-green-400 rounded-full opacity-40"
        animate={{
          y: [0, 25, 0],
          rotate: [0, 360],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-6 py-3 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              19 Intelligent Financial Calculators
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">Smart Financial</span>{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Calculators & Tools
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Make informed financial decisions with our comprehensive suite of calculators.
            From tax planning to investment analysis, get accurate results instantly.
          </motion.p>

          {/* Key Features */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 px-4">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-slate-200">
              <Calculator className="w-3 md:w-4 h-3 md:h-4 text-blue-600" />
              <span className="text-xs md:text-sm font-medium text-slate-700">19+ Calculators</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-slate-200">
              <TrendingUp className="w-3 md:w-4 h-3 md:h-4 text-green-600" />
              <span className="text-xs md:text-sm font-medium text-slate-700">Real-time Results</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-slate-200">
              <Receipt className="w-3 md:w-4 h-3 md:h-4 text-purple-600" />
              <span className="text-xs md:text-sm font-medium text-slate-700">Tax Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-slate-200">
              <Building2 className="w-3 md:w-4 h-3 md:h-4 text-orange-600" />
              <span className="text-xs md:text-sm font-medium text-slate-700">Business Ready</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 md:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-sm md:text-base"
              onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Calculators
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 px-6 md:px-8 py-3 rounded-xl transition-all duration-300 text-sm md:text-base"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto px-4">
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">19+</div>
              <div className="text-xs md:text-sm text-slate-600">Calculators</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">100K+</div>
              <div className="text-xs md:text-sm text-slate-600">Calculations</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">99.9%</div>
              <div className="text-xs md:text-sm text-slate-600">Accuracy</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">24/7</div>
              <div className="text-xs md:text-sm text-slate-600">Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

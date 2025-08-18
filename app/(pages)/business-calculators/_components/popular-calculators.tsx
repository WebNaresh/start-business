"use client"

import { motion } from "framer-motion"
import { Calculator, TrendingUp, Receipt, Home, Car, PiggyBank, Banknote, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const popularCalculators = [
  {
    id: "income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Calculate your tax liability for FY 2024-25 with old vs new regime comparison",
    icon: Banknote,
    category: "Tax",
    popularity: "Most Popular",
    color: "blue",
    features: ["Old vs New Regime", "HRA Exemption", "Deductions"]
  },
  {
    id: "gst-calculator",
    title: "GST Calculator",
    description: "Calculate GST amounts for all tax slabs with inclusive/exclusive options",
    icon: Receipt,
    category: "Tax",
    popularity: "Trending",
    color: "green",
    features: ["All GST Rates", "CGST/SGST Split", "Reverse Calculation"]
  },
  {
    id: "emi-calculator",
    title: "EMI Calculator",
    description: "Calculate loan EMI with detailed amortization schedule and prepayment options",
    icon: Calculator,
    category: "Loan",
    popularity: "Popular",
    color: "purple",
    features: ["Amortization Table", "Prepayment", "Interest Breakdown"]
  },
  {
    id: "salary-calculator",
    title: "Salary Calculator",
    description: "Calculate take-home salary after taxes, PF, and other deductions",
    icon: TrendingUp,
    category: "Tax",
    popularity: "Popular",
    color: "orange",
    features: ["CTC Breakdown", "Take Home", "Tax Savings"]
  },
  {
    id: "home-loan-calculator",
    title: "Home Loan Calculator",
    description: "Calculate home loan EMI, eligibility, and tax benefits on interest payments",
    icon: Home,
    category: "Loan",
    popularity: "Popular",
    color: "teal",
    features: ["Eligibility Check", "Tax Benefits", "EMI Schedule"]
  },
  {
    id: "ppf-calculator",
    title: "PPF Calculator",
    description: "Calculate PPF maturity amount with 15-year investment cycle and tax benefits",
    icon: PiggyBank,
    category: "Financial",
    popularity: "Popular",
    color: "indigo",
    features: ["15-Year Cycle", "Tax Free", "Compound Interest"]
  }
]

export default function PopularCalculators() {
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

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 bg-blue-50 text-blue-600 border-blue-200",
      green: "from-green-500 to-green-600 bg-green-50 text-green-600 border-green-200",
      purple: "from-purple-500 to-purple-600 bg-purple-50 text-purple-600 border-purple-200",
      orange: "from-orange-500 to-orange-600 bg-orange-50 text-orange-600 border-orange-200",
      teal: "from-teal-500 to-teal-600 bg-teal-50 text-teal-600 border-teal-200",
      indigo: "from-indigo-500 to-indigo-600 bg-indigo-50 text-indigo-600 border-indigo-200"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mt-48 blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-100 rounded-full -ml-40 -mb-40 blur-2xl opacity-30"></div>

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
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-sm mb-6">
              <Star className="w-4 h-4 mr-2" />
              Most Popular Calculators
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Start with These Top Picks
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              These are our most used calculators, trusted by thousands of users for accurate financial planning and tax calculations.
            </p>
          </motion.div>

          {/* Popular Calculators Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {popularCalculators.map((calculator, index) => {
              const colorClasses = getColorClasses(calculator.color)
              return (
                <motion.div
                  key={calculator.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/business-calculators/${calculator.id}`} className="block h-full">
                    <Card className="h-full bg-white/90 backdrop-blur-sm border-2 border-slate-100 hover:border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] cursor-pointer overflow-hidden">
                      {/* Popularity Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className={`${colorClasses.split(' ')[2]} ${colorClasses.split(' ')[3]} ${colorClasses.split(' ')[4]} text-xs font-medium`}>
                          {calculator.popularity}
                        </Badge>
                      </div>

                      <CardHeader className="pb-4 relative">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <calculator.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-blue-700 leading-tight transition-colors duration-200 line-clamp-2">
                              {calculator.title}
                            </CardTitle>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {calculator.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardDescription className="text-sm text-slate-600 leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors duration-200">
                          {calculator.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {calculator.features.map((feature, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-medium">Click to calculate</span>
                          <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                            <span className="text-sm font-medium">Try Now</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* View All Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl transition-all duration-300"
              onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View All Calculators
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import {
  Calculator,
  TrendingUp,
  Home,
  Car,
  PiggyBank,
  Receipt,
  Building2,
  CreditCard,
  Banknote,
  Target,
  Shield,
  Briefcase,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const calculators = [
  {
    id: "emi",
    title: "EMI Calculator",
    description: "Calculate monthly installments for loans with detailed amortization schedule",
    icon: Calculator,
    category: "Loans",
    color: "blue",
    popular: true,
  },
  {
    id: "sip",
    title: "SIP Calculator",
    description: "Plan your systematic investment with compound growth projections",
    icon: TrendingUp,
    category: "Investment",
    color: "green",
    popular: true,
  },
  {
    id: "home-loan",
    title: "Home Loan Calculator",
    description: "Calculate home loan EMI, eligibility, and total interest payable",
    icon: Home,
    category: "Loans",
    color: "purple",
    popular: true,
  },
  {
    id: "car-loan",
    title: "Car Loan Calculator",
    description: "Determine car loan EMI and total cost with insurance options",
    icon: Car,
    category: "Loans",
    color: "orange",
  },
  {
    id: "fd",
    title: "Fixed Deposit Calculator",
    description: "Calculate FD maturity amount with compound interest",
    icon: PiggyBank,
    category: "Investment",
    color: "blue",
  },
  {
    id: "gst",
    title: "GST Calculator",
    description: "Calculate GST inclusive/exclusive amounts for all tax slabs",
    icon: Receipt,
    category: "Tax",
    color: "red",
  },
  {
    id: "business-loan",
    title: "Business Loan Calculator",
    description: "Calculate business loan EMI and eligibility for your venture",
    icon: Building2,
    category: "Business",
    color: "indigo",
  },
  {
    id: "credit-card",
    title: "Credit Card Calculator",
    description: "Calculate minimum payments and payoff time for credit cards",
    icon: CreditCard,
    category: "Loans",
    color: "pink",
  },
  {
    id: "income-tax",
    title: "Income Tax Calculator",
    description: "Calculate income tax liability with latest tax slabs and deductions",
    icon: Banknote,
    category: "Tax",
    color: "yellow",
  },
  {
    id: "retirement",
    title: "Retirement Calculator",
    description: "Plan your retirement corpus with inflation-adjusted calculations",
    icon: Target,
    category: "Investment",
    color: "teal",
  },
  {
    id: "insurance",
    title: "Insurance Calculator",
    description: "Calculate life insurance coverage needed for financial security",
    icon: Shield,
    category: "Insurance",
    color: "cyan",
  },
  {
    id: "ppf",
    title: "PPF Calculator",
    description: "Calculate PPF maturity amount with 15-year investment cycle",
    icon: Briefcase,
    category: "Investment",
    color: "emerald",
  },
]

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
    orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
    red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    indigo: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
    pink: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
    yellow: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
    teal: "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
    cyan: "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
    emerald: "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

export default function CalculatorGrid() {
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
    <section className="py-8 md:py-12 relative">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {calculators.map((calculator) => (
            <motion.div key={calculator.id} variants={itemVariants}>
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getColorClasses(calculator.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <calculator.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {calculator.popular && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">
                          Popular
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {calculator.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-slate-900">
                    {calculator.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600 leading-relaxed">
                    {calculator.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={`/calculators/${calculator.id}`}>
                    <Button
                      className={`w-full bg-gradient-to-r ${getColorClasses(calculator.color)} text-white border-0 hover:shadow-lg transition-all duration-300`}
                      size="sm"
                    >
                      Calculate Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

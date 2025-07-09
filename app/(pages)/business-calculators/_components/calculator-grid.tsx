"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import {
  Calculator,
  TrendingUp,
  Home,
  Car,
  PiggyBank,
  Receipt,
  Banknote,
  Target,
  Shield,
  Briefcase,
  Percent,
  FileText,
  Users,
  Gift,
  DollarSign,
  CalculatorIcon as CalcIcon,
  FileCheck,
  Building,
  Search,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const calculatorCategories: {
  All: Array<{
    id: string
    title: string
    description: string
    icon: any
    category: string
  }>
  Financial: Array<{
    id: string
    title: string
    description: string
    icon: any
    category: string
  }>
  Tax: Array<{
    id: string
    title: string
    description: string
    icon: any
    category: string
  }>
  Loan: Array<{
    id: string
    title: string
    description: string
    icon: any
    category: string
  }>
} = {
  All: [
    // Financial
    {
      id: "sip-calculator",
      title: "SIP Calculator",
      description: "Plan your systematic investment with compound growth projections",
      icon: TrendingUp,
      category: "Financial",
    },
    {
      id: "fixed-deposit-calculator",
      title: "Fixed Deposit Calculator",
      description: "Calculate FD maturity amount with compound interest",
      icon: PiggyBank,
      category: "Financial",
    },
    {
      id: "rd-calculator",
      title: "RD Calculator",
      description: "Calculate recurring deposit maturity amount and returns",
      icon: Target,
      category: "Financial",
    },
    {
      id: "retirement-corpus-calculator",
      title: "Retirement Corpus Calculator",
      description: "Plan your retirement corpus with inflation-adjusted calculations",
      icon: Shield,
      category: "Financial",
    },
    {
      id: "ppf-calculator",
      title: "PPF Calculator",
      description: "Calculate PPF maturity amount with 15-year investment cycle",
      icon: Briefcase,
      category: "Financial",
    },
    {
      id: "ssy-calculator",
      title: "SSY Calculator",
      description: "Calculate Sukanya Samriddhi Yojana returns for girl child",
      icon: Gift,
      category: "Financial",
    },
    {
      id: "nps-calculator",
      title: "NPS Calculator",
      description: "Calculate National Pension System corpus and annuity",
      icon: Users,
      category: "Financial",
    },
    // Tax
    {
      id: "gst-calculator",
      title: "GST Calculator",
      description: "Calculate GST inclusive/exclusive amounts for all tax slabs",
      icon: Receipt,
      category: "Tax",
    },
    {
      id: "income-tax-calculator",
      title: "Income Tax Calculator",
      description: "Calculate income tax liability with latest tax slabs and deductions",
      icon: Banknote,
      category: "Tax",
    },
    {
      id: "hra-calculator",
      title: "HRA Calculator",
      description: "Calculate House Rent Allowance exemption and tax benefits",
      icon: Home,
      category: "Tax",
    },
    {
      id: "gratuity-calculator",
      title: "Gratuity Calculator",
      description: "Calculate gratuity amount based on salary and service years",
      icon: Gift,
      category: "Tax",
    },
    {
      id: "tds-calculator",
      title: "TDS Calculator",
      description: "Calculate Tax Deducted at Source for various income types",
      icon: FileText,
      category: "Tax",
    },
    {
      id: "salary-calculator",
      title: "Salary Calculator",
      description: "Calculate take-home salary after taxes and deductions",
      icon: DollarSign,
      category: "Tax",
    },
    {
      id: "gstr-3b-interest-calculator",
      title: "GSTR-3B Interest Calculator",
      description: "Calculate interest on delayed GSTR-3B filing",
      icon: Percent,
      category: "Tax",
    },
    {
      id: "hra-rent-receipt-calculator",
      title: "HRA Rent Receipt Generator",
      description: "Generate rent receipts for HRA tax exemption claims",
      icon: FileCheck,
      category: "Tax",
    },
    // Loan
    {
      id: "emi-calculator",
      title: "EMI Calculator",
      description: "Calculate monthly installments for loans with detailed amortization schedule",
      icon: Calculator,
      category: "Loan",
    },
    {
      id: "home-loan-calculator",
      title: "Home Loan Calculator",
      description: "Calculate home loan EMI, eligibility, and total interest payable",
      icon: Home,
      category: "Loan",
    },
    {
      id: "car-loan-calculator",
      title: "Car Loan Calculator",
      description: "Determine car loan EMI and total cost with insurance options",
      icon: Car,
      category: "Loan",
    },
    {
      id: "business-loan-calculator",
      title: "Business Loan Calculator",
      description: "Calculate business loan EMI and eligibility for your venture",
      icon: Building,
      category: "Loan",
    },
  ],
  Financial: [],
  Tax: [],
  Loan: [],
}

// Populate category-specific arrays
calculatorCategories.Financial = calculatorCategories.All.filter((calc) => calc.category === "Financial")
calculatorCategories.Tax = calculatorCategories.All.filter((calc) => calc.category === "Tax")
calculatorCategories.Loan = calculatorCategories.All.filter((calc) => calc.category === "Loan")

export default function CalculatorGrid() {
  const [activeTab, setActiveTab] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter calculators based on search query
  const filteredCalculators = useMemo(() => {
    const calculators = calculatorCategories[activeTab as keyof typeof calculatorCategories]
    if (!searchQuery) return calculators

    return calculators.filter(
      (calculator) =>
        calculator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calculator.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calculator.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [activeTab, searchQuery])

  const clearSearch = () => {
    setSearchQuery("")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Financial":
        return <TrendingUp className="w-4 h-4" />
      case "Tax":
        return <Receipt className="w-4 h-4" />
      case "Loan":
        return <Calculator className="w-4 h-4" />
      default:
        return <CalcIcon className="w-4 h-4" />
    }
  }

  const getCategoryCount = (category: string) => {
    if (category === "All") return calculatorCategories.All.length
    return calculatorCategories[category as keyof typeof calculatorCategories].length
  }

  return (
    <section id="calculators" className="py-4 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-3 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-100 p-1 rounded-xl">
                {["All", "Financial", "Tax", "Loan"].map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="flex items-center gap-2 px-4 py-1 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-200"
                  >
              
                    <span className="font-medium">{category}</span>
           
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Content */}
              {["All", "Financial", "Tax", "Loan"].map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  {/* Results Info */}
                  {searchQuery && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center">
                      <p className="text-slate-600">
                        {filteredCalculators.length > 0
                          ? `Found ${filteredCalculators.length} calculator${filteredCalculators.length !== 1 ? "s" : ""} for "${searchQuery}"`
                          : `No calculators found for "${searchQuery}"`}
                      </p>
                    </motion.div>
                  )}

                  {/* Calculators Grid */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={`${category}-${searchQuery}`}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredCalculators.map((calculator, index) => (
                      <motion.div
                        key={calculator.id}
                        variants={itemVariants}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:scale-105">
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <calculator.icon className="w-6 h-6 text-white" />
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {calculator.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 leading-tight">
                              {calculator.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-slate-600 leading-relaxed">
                              {calculator.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Link href={`/business-calculators/${calculator.id}`}>
                              <Button
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 hover:shadow-lg transition-all duration-300 group-hover:shadow-xl"
                                size="sm"
                              >
                                Calculate Now
                                <CalcIcon className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* No Results */}
                  {filteredCalculators.length === 0 && searchQuery && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">No calculators found</h3>
                      <p className="text-slate-600 mb-4">Try adjusting your search terms or browse all calculators.</p>
                      <Button variant="outline" onClick={clearSearch}>
                        Clear Search
                      </Button>
                    </motion.div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

       
        </div>
      </div>
    </section>
  )
}

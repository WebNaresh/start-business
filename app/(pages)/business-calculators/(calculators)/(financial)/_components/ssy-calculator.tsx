"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calculator, BookOpen, HelpCircle, Lightbulb, Heart, GraduationCap, Gift, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SSYCalculator() {
  const [annualInvestment, setAnnualInvestment] = useState(50000)
  const [daughterAge, setDaughterAge] = useState(5)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [yearsCompleted, setYearsCompleted] = useState(0)

  // SSY parameters
  const ssyRate = 8.2 // Current SSY interest rate
  const maxInvestmentPeriod = 14 // Can invest for 14 years
  const maturityAge = 21 // Account matures when girl turns 21
  const partialWithdrawalAge = 18 // Can withdraw 50% for education after 18

  // Calculations
  const [results, setResults] = useState({
    maturityAmount: 0,
    totalInvestment: 0,
    totalInterest: 0,
    taxSavings: 0,
    educationFund: 0,
    marriageFund: 0,
    yearsToMaturity: 0,
    yearsToEducation: 0,
  })

  useEffect(() => {
    calculateSSY()
  }, [annualInvestment, daughterAge, currentBalance, yearsCompleted])

  const calculateSSY = () => {
    const remainingInvestmentYears = Math.max(0, maxInvestmentPeriod - yearsCompleted)
    const yearsToMaturity = maturityAge - daughterAge
    const yearsToEducation = Math.max(0, partialWithdrawalAge - daughterAge)

    // Calculate future value with compound interest
    let totalAmount = currentBalance
    let totalInvestment = currentBalance

    // Add future investments
    for (let year = 1; year <= remainingInvestmentYears; year++) {
      totalAmount = (totalAmount + annualInvestment) * (1 + ssyRate / 100)
      totalInvestment += annualInvestment
    }

    // Continue compounding without new investments until maturity
    const remainingYears = yearsToMaturity - remainingInvestmentYears
    if (remainingYears > 0) {
      totalAmount = totalAmount * Math.pow(1 + ssyRate / 100, remainingYears)
    }

    // Calculate education fund (50% withdrawal at 18)
    const yearsToEducationFromNow = Math.max(0, partialWithdrawalAge - daughterAge)
    let educationAmount = currentBalance
    const investmentYearsForEducation = Math.min(remainingInvestmentYears, yearsToEducationFromNow)

    for (let year = 1; year <= investmentYearsForEducation; year++) {
      educationAmount = (educationAmount + annualInvestment) * (1 + ssyRate / 100)
    }

    const remainingEducationYears = yearsToEducationFromNow - investmentYearsForEducation
    if (remainingEducationYears > 0) {
      educationAmount = educationAmount * Math.pow(1 + ssyRate / 100, remainingEducationYears)
    }

    const educationFund = educationAmount * 0.5 // 50% can be withdrawn
    const marriageFund = totalAmount - educationFund

    const totalInterest = totalAmount - totalInvestment
    const taxSavings = Math.min(annualInvestment, 150000) * 0.3 // Assuming 30% tax bracket

    setResults({
      maturityAmount: totalAmount,
      totalInvestment,
      totalInterest,
      taxSavings,
      educationFund,
      marriageFund,
      yearsToMaturity,
      yearsToEducation,
    })
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`
    } else {
      return `₹${amount.toLocaleString("en-IN")}`
    }
  }

  const ssyTerms = [
    {
      term: "Sukanya Samriddhi Yojana (SSY)",
      definition:
        "A government savings scheme designed to secure the future of girl children, offering attractive interest rates and tax benefits.",
    },
    {
      term: "Eligible Girl Child",
      definition:
        "A girl child below 10 years of age is eligible for SSY account opening. Only one account per girl child is allowed.",
    },
    {
      term: "Deposit Period",
      definition:
        "Deposits can be made for 14 years from the date of account opening, with minimum ₹250 and maximum ₹1.5 lakh per year.",
    },
    {
      term: "Maturity Period",
      definition:
        "The account matures when the girl child turns 21 years old, or gets married after turning 18, whichever is earlier.",
    },
    {
      term: "Minimum & Maximum Deposit",
      definition:
        "Minimum annual deposit is ₹250 and maximum is ₹1,50,000. At least one deposit per year is mandatory to keep account active.",
    },
    {
      term: "Interest Rate Mechanism",
      definition:
        "Interest rate is declared by the government quarterly. Currently 8.2% per annum, compounded annually.",
    },
    {
      term: "Partial Withdrawal",
      definition: "50% of the balance can be withdrawn after the girl turns 18 for higher education expenses.",
    },
    {
      term: "Premature Closure",
      definition:
        "Account can be closed prematurely after girl turns 18 for marriage purposes with required documentation.",
    },
    {
      term: "Tax Benefits",
      definition:
        "Deposits qualify for deduction under Section 80C. Interest earned and maturity amount are completely tax-free.",
    },
    {
      term: "Account Transfer",
      definition:
        "SSY account can be transferred anywhere in India. Only two transfers are allowed during the account tenure.",
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
    <div className="container mx-auto px-4 py-8">
      <Link href="/business-calculators">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculators
        </Button>
      </Link>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mr-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">SSY Calculator</h1>
              <p className="text-slate-600">Sukanya Samriddhi Yojana - Secure Your Daughter's Future</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
            Current Rate: {ssyRate}% per annum
          </Badge>
        </motion.div>

        {/* Main Calculator */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="calculator" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="guide" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Guide
              </TabsTrigger>
              <TabsTrigger value="terms" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Terms
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                    <CardTitle className="text-slate-800">Investment Details</CardTitle>
                    <CardDescription>Enter your SSY investment information</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Annual Investment */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-slate-700">
                        Annual Investment: {formatCurrency(annualInvestment)}
                      </Label>
                      <Slider
                        value={[annualInvestment]}
                        onValueChange={(value) => setAnnualInvestment(value[0])}
                        min={250}
                        max={150000}
                        step={250}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>₹250</span>
                        <span>₹1,50,000</span>
                      </div>
                    </div>

                    {/* Daughter's Age */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-slate-700">
                        Daughter's Current Age: {daughterAge} years
                      </Label>
                      <Slider
                        value={[daughterAge]}
                        onValueChange={(value) => setDaughterAge(value[0])}
                        min={0}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>0 years</span>
                        <span>10 years</span>
                      </div>
                    </div>

                    {/* Current Balance */}
                    <div className="space-y-2">
                      <Label htmlFor="currentBalance" className="text-sm font-medium text-slate-700">
                        Current SSY Balance (Optional)
                      </Label>
                      <Input
                        id="currentBalance"
                        type="number"
                        value={currentBalance}
                        onChange={(e) => setCurrentBalance(Number(e.target.value))}
                        placeholder="₹0"
                        className="w-full"
                      />
                    </div>

                    {/* Years Completed */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-slate-700">
                        Years Completed: {yearsCompleted} years
                      </Label>
                      <Slider
                        value={[yearsCompleted]}
                        onValueChange={(value) => setYearsCompleted(value[0])}
                        min={0}
                        max={14}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>0 years</span>
                        <span>14 years</span>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Investment Progress</span>
                        <span className="text-blue-600 font-medium">{Math.round((yearsCompleted / 14) * 100)}%</span>
                      </div>
                      <Progress value={(yearsCompleted / 14) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Results Section */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
                    <CardTitle className="text-slate-800">SSY Projections</CardTitle>
                    <CardDescription>Your daughter's financial future</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {/* Maturity Amount */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-slate-600 mb-1">Maturity Amount (at 21 years)</p>
                        <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.maturityAmount)}</p>
                      </div>
                    </div>

                    {/* Education Fund */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <GraduationCap className="w-5 h-5 text-green-600 mr-2" />
                          <div>
                            <p className="text-sm text-slate-600">Education Fund (at 18 years)</p>
                            <p className="text-lg font-semibold text-green-700">
                              {formatCurrency(results.educationFund)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Marriage Fund */}
                    <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Gift className="w-5 h-5 text-pink-600 mr-2" />
                          <div>
                            <p className="text-sm text-slate-600">Marriage Fund (at 21 years)</p>
                            <p className="text-lg font-semibold text-pink-700">
                              {formatCurrency(results.marriageFund)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Investment Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500">Total Investment</p>
                        <p className="text-sm font-semibold text-slate-700">
                          {formatCurrency(results.totalInvestment)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500">Interest Earned</p>
                        <p className="text-sm font-semibold text-slate-700">
                          {formatCurrency(results.totalInterest)}
                        </p>
                      </div>
                    </div>

                    {/* Tax Savings */}
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="text-center">
                        <p className="text-sm text-yellow-700 mb-1">Annual Tax Savings (Section 80C)</p>
                        <p className="text-lg font-semibold text-yellow-800">{formatCurrency(results.taxSavings)}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Years to Education Fund</p>
                        <p className="text-lg font-bold text-blue-600">{results.yearsToEducation}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Years to Maturity</p>
                        <p className="text-lg font-bold text-green-600">{results.yearsToMaturity}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Important Alerts */}
              <div className="space-y-4">
                {daughterAge > 10 && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">
                      <strong>Age Limit Exceeded:</strong> SSY accounts can only be opened for girls below 10 years of
                      age.
                    </AlertDescription>
                  </Alert>
                )}

                {results.yearsToEducation <= 3 && results.yearsToEducation > 0 && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <AlertDescription className="text-blue-700">
                      <strong>Education Planning:</strong> Your daughter will be eligible for education fund
                      withdrawal in {results.yearsToEducation} years. Start planning for higher education expenses.
                    </AlertDescription>
                  </Alert>
                )}

                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">
                    <strong>Tax Benefits:</strong> SSY offers triple tax exemption (EEE) - deposits, interest, and
                    maturity amount are all tax-free.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="guide" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    How SSY Calculator Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-800">Calculation Process</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                            1
                          </div>
                          <div>
                            <p className="font-medium text-slate-700">Investment Period</p>
                            <p className="text-sm text-slate-600">
                              Deposits can be made for 14 years from account opening
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                            2
                          </div>
                          <div>
                            <p className="font-medium text-slate-700">Compound Interest</p>
                            <p className="text-sm text-slate-600">
                              Interest compounds annually at current rate of {ssyRate}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                            3
                          </div>
                          <div>
                            <p className="font-medium text-slate-700">Maturity Calculation</p>
                            <p className="text-sm text-slate-600">Account matures when girl child turns 21 years</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                            4
                          </div>
                          <div>
                            <p className="font-medium text-slate-700">Withdrawal Options</p>
                            <p className="text-sm text-slate-600">
                              50% can be withdrawn at 18 for education expenses
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-800">SSY Formula</h3>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm font-mono text-slate-700 mb-2">A = P × (1 + r)^n</p>
                        <div className="text-xs text-slate-600 space-y-1">
                          <p>
                            <strong>A</strong> = Maturity Amount
                          </p>
                          <p>
                            <strong>P</strong> = Annual Investment
                          </p>
                          <p>
                            <strong>r</strong> = Interest Rate ({ssyRate}%)
                          </p>
                          <p>
                            <strong>n</strong> = Number of Years
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Key Benefits</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Highest interest rate among government schemes</li>
                          <li>• Complete tax exemption (EEE status)</li>
                          <li>• Flexible investment amount (₹250 to ₹1.5L)</li>
                          <li>• Partial withdrawal for education</li>
                          <li>• Government backing and safety</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terms" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    SSY Terms & Definitions
                  </CardTitle>
                  <CardDescription>Understanding key terms related to Sukanya Samriddhi Yojana</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {ssyTerms.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          <span className="font-medium text-slate-800">{item.term}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-slate-600 leading-relaxed">{item.definition}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    Expert SSY Tips
                  </CardTitle>
                  <CardDescription>Smart strategies to maximize your daughter's SSY benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">💡 Start Early</h4>
                        <p className="text-sm text-green-700">
                          Open SSY account as soon as possible after birth. Earlier start means more compounding years
                          and higher maturity amount.
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">💰 Maximize Investment</h4>
                        <p className="text-sm text-blue-700">
                          Try to invest the maximum amount of ₹1.5 lakh annually to get maximum tax benefits and
                          higher returns.
                        </p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-800 mb-2">📅 Invest Early in FY</h4>
                        <p className="text-sm text-purple-700">
                          Make deposits at the beginning of financial year to get full year's interest benefit.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-orange-800 mb-2">🎓 Plan for Education</h4>
                        <p className="text-sm text-orange-700">
                          Remember that 50% can be withdrawn at 18 for higher education. Plan education expenses
                          accordingly.
                        </p>
                      </div>

                      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-800 mb-2">📈 Consider Inflation</h4>
                        <p className="text-sm text-pink-700">
                          Factor in inflation when planning for future education and marriage expenses. Start with
                          higher amounts if possible.
                        </p>
                      </div>

                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                        <h4 className="font-semibold text-indigo-800 mb-2">🔄 Regular Contributions</h4>
                        <p className="text-sm text-indigo-700">
                          Make at least minimum deposit of ₹250 annually to keep account active. Missing deposits can
                          make account dormant.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertDescription className="text-yellow-800">
                      <strong>Professional Advice:</strong> SSY is one of the best long-term investment options for
                      girl children with government backing, tax benefits, and attractive returns. Consult with a
                      financial advisor for comprehensive planning.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

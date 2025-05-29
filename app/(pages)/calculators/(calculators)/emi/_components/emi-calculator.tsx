"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingDown, PieChart, BarChart3, ArrowLeft, BookOpen, Info, HelpCircle, Lightbulb, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface EMIResult {
  emi: number
  totalAmount: number
  totalInterest: number
  monthlyBreakdown: Array<{
    month: number
    emi: number
    principal: number
    interest: number
    balance: number
  }>
}

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [result, setResult] = useState<EMIResult | null>(null)

  const calculateEMI = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / 12 / 100
    const months = tenure * 12

    // EMI calculation using the standard formula
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)

    const totalAmount = emi * months
    const totalInterest = totalAmount - principal

    // Generate amortization schedule
    const monthlyBreakdown = []
    let balance = principal

    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = emi - interestPayment
      balance -= principalPayment

      monthlyBreakdown.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance)),
      })
    }

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      monthlyBreakdown,
    })
  }

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, tenure])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const emiTerms = [
    {
      term: "EMI (Equated Monthly Installment)",
      definition: "A fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is fully paid off."
    },
    {
      term: "Principal Amount",
      definition: "The original sum of money borrowed in a loan or put into an investment. It's the amount on which interest is calculated and does not include any interest or dividends."
    },
    {
      term: "Interest Rate",
      definition: "The percentage of the principal amount charged by the lender for the use of money. It's typically expressed as an annual percentage rate (APR)."
    },
    {
      term: "Loan Tenure",
      definition: "The duration or time period for which the loan is taken. It's usually expressed in years or months and determines how long you'll be making EMI payments."
    },
    {
      term: "Amortization",
      definition: "The process of paying off debt with regular payments over time. Each payment covers both principal and interest, with the interest portion decreasing and principal portion increasing over time."
    },
    {
      term: "Outstanding Balance",
      definition: "The remaining amount of the loan that still needs to be paid. This decreases with each EMI payment as the principal portion is deducted from it."
    }
  ]

  const emiTips = [
    {
      title: "Choose Optimal Tenure",
      description: "Longer tenure means lower EMI but higher total interest. Shorter tenure means higher EMI but lower total interest cost."
    },
    {
      title: "Prepayment Benefits",
      description: "Making prepayments towards the principal can significantly reduce your total interest burden and loan tenure."
    },
    {
      title: "Interest Rate Impact",
      description: "Even a 0.5% difference in interest rate can save lakhs over the loan tenure. Always compare rates from different lenders."
    },
    {
      title: "EMI to Income Ratio",
      description: "Keep your total EMIs (all loans) under 40-50% of your monthly income to maintain healthy finances."
    }
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Enter Loan Details",
      description: "Input your desired loan amount, interest rate offered by the lender, and preferred loan tenure."
    },
    {
      step: "2",
      title: "EMI Calculation",
      description: "The calculator uses the standard EMI formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1] where P=Principal, R=Monthly Rate, N=Number of months."
    },
    {
      step: "3",
      title: "Amortization Schedule",
      description: "View the detailed month-wise breakdown showing how much of each EMI goes towards principal and interest."
    },
    {
      step: "4",
      title: "Financial Planning",
      description: "Use the results to plan your budget, compare different loan options, and make informed financial decisions."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/calculators">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculators
          </Button>
        </Link>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-4">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">EMI Calculator</h1>
            <p className="text-slate-600">Calculate your loan EMI with detailed amortization schedule and financial insights</p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
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
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Loan Details</CardTitle>
                  <CardDescription>Enter your loan information to calculate EMI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Loan Amount */}
                  <div className="space-y-3">
                    <Label htmlFor="loanAmount" className="text-sm font-medium">
                      Loan Amount: {formatCurrency(loanAmount)}
                    </Label>
                    <Slider
                      id="loanAmount"
                      min={100000}
                      max={10000000}
                      step={50000}
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>₹1L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-3">
                    <Label htmlFor="interestRate" className="text-sm font-medium">
                      Interest Rate: {interestRate}% per annum
                    </Label>
                    <Slider
                      id="interestRate"
                      min={5}
                      max={20}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div className="space-y-3">
                    <Label htmlFor="tenure" className="text-sm font-medium">
                      Loan Tenure: {tenure} years
                    </Label>
                    <Slider
                      id="tenure"
                      min={1}
                      max={30}
                      step={1}
                      value={[tenure]}
                      onValueChange={(value) => setTenure(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Adjust the sliders to see real-time changes in your EMI calculation. The results update automatically.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {result && (
                <>
                  {/* EMI Result */}
                  <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-sm opacity-90 mb-2">Monthly EMI</div>
                        <div className="text-3xl font-bold">{formatCurrency(result.emi)}</div>
                        <div className="text-sm opacity-80 mt-2">
                          For {tenure} years at {interestRate}% interest
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/80 backdrop-blur-sm border-0">
                      <CardContent className="p-4 text-center">
                        <TrendingDown className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-xs text-slate-600 mb-1">Total Amount</div>
                        <div className="text-lg font-bold text-slate-800">{formatCurrency(result.totalAmount)}</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm border-0">
                      <CardContent className="p-4 text-center">
                        <PieChart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                        <div className="text-xs text-slate-600 mb-1">Total Interest</div>
                        <div className="text-lg font-bold text-slate-800">{formatCurrency(result.totalInterest)}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Breakdown Chart */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Payment Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Principal Amount</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {formatCurrency(loanAmount)}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Interest Amount</span>
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            {formatCurrency(result.totalInterest)}
                          </Badge>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                            style={{
                              width: `${(loanAmount / result.totalAmount) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Principal: {((loanAmount / result.totalAmount) * 100).toFixed(1)}%</span>
                          <span>Interest: {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Amortization Preview */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">First 12 Months Breakdown</CardTitle>
                      <CardDescription>See how your EMI is split between principal and interest</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {result.monthlyBreakdown.slice(0, 12).map((month) => (
                          <div
                            key={month.month}
                            className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                          >
                            <span className="text-sm font-medium">Month {month.month}</span>
                            <div className="text-right">
                              <div className="text-sm font-medium">{formatCurrency(month.emi)}</div>
                              <div className="text-xs text-slate-500">
                                P: {formatCurrency(month.principal)} | I: {formatCurrency(month.interest)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How EMI Calculator Works
              </CardTitle>
              <CardDescription>
                Understanding the step-by-step process of EMI calculation and amortization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {howItWorks.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-3">EMI Formula Explained</h3>
                <div className="bg-white p-4 rounded-lg font-mono text-sm">
                  EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                </div>
                <div className="mt-3 text-sm text-blue-700">
                  <p><strong>P</strong> = Principal loan amount</p>
                  <p><strong>R</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</p>
                  <p><strong>N</strong> = Number of monthly installments (Years × 12)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <HelpCircle className="w-6 h-6 mr-2" />
                EMI Terms & Definitions
              </CardTitle>
              <CardDescription>
                Essential terminology to understand EMI calculations and loan management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {emiTerms.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.term}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {item.definition}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> Understanding these terms will help you make better financial decisions and communicate effectively with lenders.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Smart EMI Tips & Strategies
              </CardTitle>
              <CardDescription>
                Expert advice to optimize your loan and save money on interest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {emiTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-slate-800 mb-2">{tip.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{tip.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="font-semibold text-slate-800">Additional Money-Saving Tips:</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Compare interest rates from multiple lenders before finalizing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Consider making a larger down payment to reduce the principal amount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Use salary account benefits for better interest rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Set up auto-debit to avoid late payment charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Review and refinance if better rates become available</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

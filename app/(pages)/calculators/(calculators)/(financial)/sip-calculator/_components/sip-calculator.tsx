"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  PieChart,
  ArrowLeft,
  BookOpen,
  Info,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  Target,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface SIPResult {
  totalInvestment: number
  maturityAmount: number
  totalReturns: number
  yearlyBreakdown: Array<{
    year: number
    investment: number
    returns: number
    totalValue: number
  }>
}

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)
  const [result, setResult] = useState<SIPResult | null>(null)

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100
    const months = timePeriod * 12

    // SIP Future Value calculation
    const maturityAmount = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
    const totalInvestment = monthlyAmount * months
    const totalReturns = maturityAmount - totalInvestment

    // Generate yearly breakdown
    const yearlyBreakdown = []
    for (let year = 1; year <= timePeriod; year++) {
      const monthsCompleted = year * 12
      const yearlyMaturity =
        monthlyAmount * (((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) * (1 + monthlyRate))
      const yearlyInvestment = monthlyAmount * monthsCompleted
      const yearlyReturns = yearlyMaturity - yearlyInvestment

      yearlyBreakdown.push({
        year,
        investment: Math.round(yearlyInvestment),
        returns: Math.round(yearlyReturns),
        totalValue: Math.round(yearlyMaturity),
      })
    }

    setResult({
      totalInvestment: Math.round(totalInvestment),
      maturityAmount: Math.round(maturityAmount),
      totalReturns: Math.round(totalReturns),
      yearlyBreakdown,
    })
  }

  useEffect(() => {
    calculateSIP()
  }, [monthlyAmount, expectedReturn, timePeriod])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const sipTerms = [
    {
      term: "SIP (Systematic Investment Plan)",
      definition:
        "A disciplined approach to investing where you invest a fixed amount regularly in mutual funds. It helps in rupee cost averaging and building wealth over time through the power of compounding.",
    },
    {
      term: "Rupee Cost Averaging",
      definition:
        "When you invest a fixed amount regularly, you buy more units when prices are low and fewer units when prices are high, averaging out the cost of your investments over time.",
    },
    {
      term: "Compounding",
      definition:
        "The process where your investment returns generate their own returns. Over time, this creates a snowball effect that can significantly boost your wealth.",
    },
    {
      term: "NAV (Net Asset Value)",
      definition:
        "The per-unit price of a mutual fund scheme. It's calculated by dividing the total value of all assets minus liabilities by the number of outstanding units.",
    },
    {
      term: "Expected Return",
      definition:
        "The anticipated annual return from your investment based on historical performance and market conditions. It's used to project future value but actual returns may vary.",
    },
    {
      term: "Maturity Amount",
      definition:
        "The total value of your SIP investment at the end of the investment period, including both your invested amount and the returns generated.",
    },
  ]

  const sipTips = [
    {
      title: "Start Early",
      description:
        "The power of compounding works best over longer periods. Starting early, even with small amounts, can lead to significant wealth creation.",
    },
    {
      title: "Stay Consistent",
      description:
        "Don't stop your SIP during market downturns. Market volatility is normal, and consistency helps you benefit from rupee cost averaging.",
    },
    {
      title: "Increase SIP Amount",
      description:
        "Increase your SIP amount annually by 10-15% or whenever your income grows. This helps beat inflation and accelerates wealth creation.",
    },
    {
      title: "Choose Right Funds",
      description:
        "Select funds based on your risk tolerance, investment horizon, and financial goals. Diversify across different fund categories.",
    },
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Set Investment Amount",
      description:
        "Decide on a fixed amount you can invest monthly. Start with what you can afford and increase gradually.",
    },
    {
      step: "2",
      title: "Choose Time Horizon",
      description:
        "Determine your investment period based on your financial goals. Longer periods generally yield better results due to compounding.",
    },
    {
      step: "3",
      title: "Select Expected Return",
      description:
        "Based on historical data and fund performance, set realistic return expectations. Equity funds typically range from 10-15% annually.",
    },
    {
      step: "4",
      title: "Calculate & Invest",
      description:
        "Use the calculator to see projections and start your SIP. Monitor periodically but avoid frequent changes.",
    },
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mr-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">SIP Calculator</h1>
            <p className="text-slate-600">Plan your systematic investments with intelligent growth projections</p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
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
                  <CardTitle className="text-xl">SIP Investment Details</CardTitle>
                  <CardDescription>Enter your investment parameters to calculate returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Monthly Amount */}
                  <div className="space-y-3">
                    <Label htmlFor="monthlyAmount" className="text-sm font-medium">
                      Monthly Investment: {formatCurrency(monthlyAmount)}
                    </Label>
                    <Slider
                      id="monthlyAmount"
                      min={500}
                      max={100000}
                      step={500}
                      value={[monthlyAmount]}
                      onValueChange={(value) => setMonthlyAmount(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>₹500</span>
                      <span>₹1L</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div className="space-y-3">
                    <Label htmlFor="expectedReturn" className="text-sm font-medium">
                      Expected Annual Return: {expectedReturn}%
                    </Label>
                    <Slider
                      id="expectedReturn"
                      min={6}
                      max={20}
                      step={0.5}
                      value={[expectedReturn]}
                      onValueChange={(value) => setExpectedReturn(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>6%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Time Period */}
                  <div className="space-y-3">
                    <Label htmlFor="timePeriod" className="text-sm font-medium">
                      Investment Period: {timePeriod} years
                    </Label>
                    <Slider
                      id="timePeriod"
                      min={1}
                      max={30}
                      step={1}
                      value={[timePeriod]}
                      onValueChange={(value) => setTimePeriod(value[0])}
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
                      Returns are calculated based on compound annual growth. Actual returns may vary based on market
                      conditions.
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
                  {/* Maturity Amount */}
                  <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-sm opacity-90 mb-2">Maturity Amount</div>
                        <div className="text-3xl font-bold">{formatCurrency(result.maturityAmount)}</div>
                        <div className="text-sm opacity-80 mt-2">
                          After {timePeriod} years at {expectedReturn}% return
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/80 backdrop-blur-sm border-0">
                      <CardContent className="p-4 text-center">
                        <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-xs text-slate-600 mb-1">Total Investment</div>
                        <div className="text-lg font-bold text-slate-800">{formatCurrency(result.totalInvestment)}</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm border-0">
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-xs text-slate-600 mb-1">Total Returns</div>
                        <div className="text-lg font-bold text-slate-800">{formatCurrency(result.totalReturns)}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Breakdown Chart */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <PieChart className="w-5 h-5 mr-2" />
                        Investment Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Your Investment</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {formatCurrency(result.totalInvestment)}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Returns Generated</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {formatCurrency(result.totalReturns)}
                          </Badge>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                            style={{
                              width: `${(result.totalReturns / result.maturityAmount) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>
                            Investment: {((result.totalInvestment / result.maturityAmount) * 100).toFixed(1)}%
                          </span>
                          <span>Returns: {((result.totalReturns / result.maturityAmount) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Yearly Breakdown */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">Year-wise Growth</CardTitle>
                      <CardDescription>See how your investment grows over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {result.yearlyBreakdown.slice(-5).map((year) => (
                          <div
                            key={year.year}
                            className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                          >
                            <span className="text-sm font-medium">Year {year.year}</span>
                            <div className="text-right">
                              <div className="text-sm font-medium">{formatCurrency(year.totalValue)}</div>
                              <div className="text-xs text-slate-500">
                                Invested: {formatCurrency(year.investment)} | Returns: {formatCurrency(year.returns)}
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
                How SIP Calculator Works
              </CardTitle>
              <CardDescription>
                Understanding systematic investment planning and wealth creation through SIP
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
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-3">SIP Formula Explained</h3>
                <div className="bg-white p-4 rounded-lg font-mono text-sm">
                  FV = PMT × [((1 + r)^n - 1) / r] × (1 + r)
                </div>
                <div className="mt-3 text-sm text-green-700">
                  <p>
                    <strong>FV</strong> = Future Value (Maturity Amount)
                  </p>
                  <p>
                    <strong>PMT</strong> = Monthly SIP Amount
                  </p>
                  <p>
                    <strong>r</strong> = Monthly return rate (Annual rate ÷ 12)
                  </p>
                  <p>
                    <strong>n</strong> = Total number of months
                  </p>
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
                SIP Terms & Definitions
              </CardTitle>
              <CardDescription>Essential terminology for understanding systematic investment planning</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {sipTerms.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">{item.term}</AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">{item.definition}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> SIP is subject to market risks. Past performance doesn't guarantee future
                  returns. Always consult with a financial advisor.
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
                Smart SIP Investment Strategies
              </CardTitle>
              <CardDescription>Expert tips to maximize your SIP returns and build long-term wealth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {sipTips.map((tip, index) => (
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
                <h3 className="font-semibold text-slate-800">Additional Investment Tips:</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Diversify across large-cap, mid-cap, and small-cap funds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Review your portfolio annually and rebalance if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Use step-up SIP to increase investment amount annually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Don't panic during market volatility - stay invested</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Consider tax-saving ELSS funds for Section 80C benefits</span>
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

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calculator,
  PiggyBank,
  TrendingUp,
  Shield,
  BookOpen,
  Lightbulb,
  Info,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function PPFCalculator() {
  const [annualInvestment, setAnnualInvestment] = useState(150000)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [yearsCompleted, setYearsCompleted] = useState(0)
  const [investmentType, setInvestmentType] = useState<"annual" | "monthly">("annual")
  const [monthlyInvestment, setMonthlyInvestment] = useState(12500)

  // PPF current interest rate (as per latest government rates)
  const ppfInterestRate = 7.1

  // Calculate PPF maturity
  const calculatePPF = () => {
    const remainingYears = 15 - yearsCompleted
    const annualAmount = investmentType === "annual" ? annualInvestment : monthlyInvestment * 12

    let futureValue = currentBalance

    // Calculate compound interest for remaining years
    for (let year = 1; year <= remainingYears; year++) {
      futureValue = (futureValue + annualAmount) * (1 + ppfInterestRate / 100)
    }

    const totalInvestment = currentBalance + annualAmount * remainingYears
    const totalInterest = futureValue - totalInvestment
    const taxSavings = annualAmount * remainingYears * 0.3 // Assuming 30% tax bracket

    return {
      maturityAmount: futureValue,
      totalInvestment,
      totalInterest,
      taxSavings,
      remainingYears,
      annualAmount,
    }
  }

  const results = calculatePPF()

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`
    } else {
      return `₹${amount.toLocaleString("en-IN")}`
    }
  }

  const ppfTerms = [
    {
      term: "Public Provident Fund (PPF)",
      definition:
        "A long-term savings scheme backed by the Government of India with a 15-year lock-in period, offering tax benefits and guaranteed returns.",
    },
    {
      term: "Lock-in Period",
      definition:
        "The mandatory 15-year period during which you cannot withdraw the entire PPF amount. Partial withdrawals are allowed after the 7th year.",
    },
    {
      term: "Maturity Amount",
      definition:
        "The total amount you receive after 15 years, including your contributions and compound interest earned over the investment period.",
    },
    {
      term: "Section 80C",
      definition:
        "Tax deduction provision allowing up to ₹1.5 lakh annual deduction from taxable income for PPF investments and other specified investments.",
    },
    {
      term: "EEE Taxation",
      definition:
        "Exempt-Exempt-Exempt taxation means contributions are tax-deductible, interest earned is tax-free, and maturity amount is also tax-free.",
    },
    {
      term: "Compound Interest",
      definition:
        "Interest calculated on both the principal amount and previously earned interest, leading to exponential growth of your PPF investment over time.",
    },
    {
      term: "Partial Withdrawal",
      definition:
        "Option to withdraw up to 50% of the balance at the end of 6th year or preceding year's balance, whichever is lower, from the 7th year onwards.",
    },
    {
      term: "Loan Against PPF",
      definition:
        "You can take a loan against your PPF balance from the 3rd to 6th year, up to 25% of the balance at the end of 2nd preceding year.",
    },
    {
      term: "Extension Option",
      definition:
        "After 15 years, you can extend your PPF account in blocks of 5 years with or without making fresh contributions.",
    },
    {
      term: "Nomination",
      definition:
        "Facility to nominate beneficiaries who will receive the PPF amount in case of the account holder's demise during the investment period.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/business-calculators">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculators
        </Button>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              <PiggyBank className="w-4 h-4 mr-2" />
              PPF Calculator
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Public Provident Fund Calculator</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Calculate your PPF maturity amount, interest earned, and tax savings with our comprehensive 15-year
              investment planner
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
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
              <Info className="w-4 h-4" />
              Terms
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Tips
            </TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Calculator className="w-5 h-5" />
                    PPF Investment Details
                  </CardTitle>
                  <CardDescription>Enter your PPF investment details to calculate maturity amount</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Investment Type Toggle */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Investment Frequency</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={investmentType === "annual" ? "default" : "outline"}
                        onClick={() => setInvestmentType("annual")}
                        className="flex-1"
                      >
                        Annual
                      </Button>
                      <Button
                        variant={investmentType === "monthly" ? "default" : "outline"}
                        onClick={() => setInvestmentType("monthly")}
                        className="flex-1"
                      >
                        Monthly
                      </Button>
                    </div>
                  </div>

                  {/* Investment Amount */}
                  {investmentType === "annual" ? (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Annual Investment: {formatCurrency(annualInvestment)}
                      </Label>
                      <Slider
                        value={[annualInvestment]}
                        onValueChange={(value) => setAnnualInvestment(value[0])}
                        max={150000}
                        min={500}
                        step={500}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>₹500</span>
                        <span>₹1,50,000 (Max)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Monthly Investment: {formatCurrency(monthlyInvestment)}
                      </Label>
                      <Slider
                        value={[monthlyInvestment]}
                        onValueChange={(value) => setMonthlyInvestment(value[0])}
                        max={12500}
                        min={500}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>₹500</span>
                        <span>₹12,500 (Max)</span>
                      </div>
                    </div>
                  )}

                  {/* Current Balance */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Current PPF Balance: {formatCurrency(currentBalance)}</Label>
                    <Slider
                      value={[currentBalance]}
                      onValueChange={(value) => setCurrentBalance(value[0])}
                      max={2000000}
                      min={0}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>₹0</span>
                      <span>₹20,00,000</span>
                    </div>
                  </div>

                  {/* Years Completed */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Years Completed: {yearsCompleted} years</Label>
                    <Slider
                      value={[yearsCompleted]}
                      onValueChange={(value) => setYearsCompleted(value[0])}
                      max={14}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0 years</span>
                      <span>14 years</span>
                    </div>
                  </div>

                  {/* Current Interest Rate */}
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Current PPF Interest Rate: <strong>{ppfInterestRate}%</strong> per annum (compounded annually)
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <TrendingUp className="w-5 h-5" />
                    PPF Calculation Results
                  </CardTitle>
                  <CardDescription>Your PPF maturity and investment breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Key Results */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{formatCurrency(results.maturityAmount)}</div>
                      <div className="text-sm text-blue-700">Maturity Amount</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{formatCurrency(results.totalInterest)}</div>
                      <div className="text-sm text-green-700">Interest Earned</div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Total Investment</span>
                      <span className="font-semibold">{formatCurrency(results.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Interest Earned</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Tax Savings (Section 80C)</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(results.taxSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Remaining Years</span>
                      <span className="font-semibold">{results.remainingYears} years</span>
                    </div>
                  </div>

                  {/* Investment Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Investment Progress</span>
                      <span>{yearsCompleted}/15 years</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(yearsCompleted / 15) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {results.remainingYears <= 2 && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your PPF is nearing maturity! Consider extension options for continued tax-free growth.
                      </AlertDescription>
                    </Alert>
                  )}

                  {results.annualAmount < 150000 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Consider investing the maximum ₹1.5 lakh annually to maximize tax benefits and returns.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  How PPF Calculator Works
                </CardTitle>
                <CardDescription>Understanding PPF calculations and investment strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">PPF Calculation Process</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Annual Contribution</h4>
                          <p className="text-sm text-slate-600">Minimum ₹500, Maximum ₹1,50,000 per financial year</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Compound Interest</h4>
                          <p className="text-sm text-slate-600">
                            Interest compounded annually at current rate of {ppfInterestRate}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">15-Year Lock-in</h4>
                          <p className="text-sm text-slate-600">
                            Mandatory 15-year investment period with extension options
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium">Tax-Free Maturity</h4>
                          <p className="text-sm text-slate-600">
                            Entire maturity amount is tax-free under EEE taxation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">PPF Formula</h3>
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="text-sm font-mono">
                        <div className="mb-2">
                          <strong>Maturity Amount = P × [((1 + r)^n - 1) / r] × (1 + r)</strong>
                        </div>
                        <div className="space-y-1 text-xs text-slate-600">
                          <div>P = Annual Investment</div>
                          <div>r = Annual Interest Rate ({ppfInterestRate}%)</div>
                          <div>n = Number of Years (15)</div>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Pro Tip:</strong> Invest early in the financial year to maximize interest earnings, as
                        PPF interest is calculated on the lowest balance between 5th and last day of each month.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  PPF Terms & Definitions
                </CardTitle>
                <CardDescription>Essential terms to understand PPF investment</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {ppfTerms.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium">{item.term}</span>
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

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Lightbulb className="w-5 h-5" />
                    Smart PPF Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Maximize Annual Contribution</h4>
                        <p className="text-sm text-slate-600">
                          Invest the maximum ₹1.5 lakh annually to get full tax benefits and maximize returns.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Invest Early in Financial Year</h4>
                        <p className="text-sm text-slate-600">
                          Make contributions in April-May to earn interest for the entire year.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Use for Long-term Wealth Creation</h4>
                        <p className="text-sm text-slate-600">
                          PPF is ideal for retirement planning and long-term financial goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Shield className="w-5 h-5" />
                    Important Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Consider Extension Options</h4>
                        <p className="text-sm text-slate-600">
                          After 15 years, you can extend PPF in 5-year blocks for continued tax-free growth.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Plan Partial Withdrawals Wisely</h4>
                        <p className="text-sm text-slate-600">
                          From 7th year, you can withdraw up to 50% for emergencies, but it reduces future returns.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Maintain Regular Contributions</h4>
                        <p className="text-sm text-slate-600">
                          Consistent annual contributions help maximize the power of compounding over 15 years.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Disclaimer:</strong> PPF interest rates are subject to change by the Government of India.
                Current rate is {ppfInterestRate}% per annum. Please verify current rates before making investment
                decisions.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

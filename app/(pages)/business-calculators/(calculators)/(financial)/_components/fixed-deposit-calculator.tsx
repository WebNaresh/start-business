"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calculator,
  TrendingUp,
  Info,
  BookOpen,
  Lightbulb,
  PiggyBank,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function FixedDepositCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7.5)
  const [tenure, setTenure] = useState(3)
  const [compoundingFrequency, setCompoundingFrequency] = useState(4) // Quarterly
  const [results, setResults] = useState({
    maturityAmount: 0,
    interestEarned: 0,
    effectiveRate: 0,
  })

  // Calculate FD maturity amount
  useEffect(() => {
    const calculateFD = () => {
      const p = principal
      const r = rate / 100
      const n = compoundingFrequency
      const t = tenure

      // Compound Interest Formula: A = P(1 + r/n)^(nt)
      const maturityAmount = p * Math.pow(1 + r / n, n * t)
      const interestEarned = maturityAmount - p
      const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100

      setResults({
        maturityAmount: Math.round(maturityAmount),
        interestEarned: Math.round(interestEarned),
        effectiveRate: Number(effectiveRate.toFixed(2)),
      })
    }

    calculateFD()
  }, [principal, rate, tenure, compoundingFrequency])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const compoundingOptions = [
    { value: 1, label: "Annually" },
    { value: 2, label: "Half-Yearly" },
    { value: 4, label: "Quarterly" },
    { value: 12, label: "Monthly" },
  ]

  const fdTerms = [
    {
      term: "Fixed Deposit (FD)",
      definition:
        "A financial instrument provided by banks and NBFCs that offers investors a higher rate of interest than a regular savings account, until the given maturity date.",
    },
    {
      term: "Principal Amount",
      definition:
        "The initial amount of money invested in the fixed deposit. This is the base amount on which interest is calculated.",
    },
    {
      term: "Interest Rate",
      definition:
        "The annual percentage rate at which the bank pays interest on your fixed deposit. Higher rates mean better returns.",
    },
    {
      term: "Maturity Amount",
      definition:
        "The total amount you receive at the end of the FD tenure, including both principal and accumulated interest.",
    },
    {
      term: "Compound Interest",
      definition:
        "Interest calculated on the initial principal and also on the accumulated interest from previous periods. This leads to exponential growth.",
    },
    {
      term: "Tenure",
      definition:
        "The time period for which the money is deposited in the fixed deposit account. Longer tenures typically offer higher interest rates.",
    },
    {
      term: "Effective Annual Rate",
      definition:
        "The actual annual rate of return taking into account the effect of compounding. It's higher than the nominal rate when compounding occurs more than once per year.",
    },
    {
      term: "Premature Withdrawal",
      definition:
        "Withdrawing the FD before its maturity date. This usually results in penalty charges and reduced interest rates.",
    },
  ]

  const fdTips = [
    {
      title: "Compare Interest Rates",
      description:
        "Different banks offer different rates. Compare rates across multiple banks and choose the best option.",
    },
    {
      title: "Consider Tax Implications",
      description: "Interest earned on FDs is taxable. Consider tax-saving FDs or plan your investments accordingly.",
    },
    {
      title: "Ladder Your FDs",
      description:
        "Invest in multiple FDs with different maturity dates to ensure regular liquidity and better rate opportunities.",
    },
    {
      title: "Understand Penalty Charges",
      description:
        "Know the penalty for premature withdrawal. Some banks charge 0.5-1% penalty on the applicable interest rate.",
    },
    {
      title: "Choose Optimal Tenure",
      description:
        "Longer tenures usually offer higher rates, but consider your liquidity needs and interest rate trends.",
    },
    {
      title: "Consider Inflation Impact",
      description:
        "Ensure your FD rate beats inflation to maintain purchasing power. Real returns = FD rate - inflation rate.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <Link href="/business-calculators">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculators
          </Button>
        </Link>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mr-4">
              <PiggyBank className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Fixed Deposit Calculator</h1>
              <p className="text-slate-600 mt-1">Calculate FD maturity amount with compound interest</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <TrendingUp className="w-4 h-4 mr-1" />
            Investment Planning Tool
          </Badge>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200">
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
          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Investment Details
                  </CardTitle>
                  <CardDescription>Enter your fixed deposit investment parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Principal Amount */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Principal Amount</Label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="text-lg font-semibold"
                        min="1000"
                        max="10000000"
                      />
                      <Slider
                        value={[principal]}
                        onValueChange={(value) => setPrincipal(value[0])}
                        min={1000}
                        max={1000000}
                        step={1000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>₹1,000</span>
                        <span>₹10,00,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Annual Interest Rate (%)</Label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="text-lg font-semibold"
                        min="1"
                        max="15"
                        step="0.1"
                      />
                      <Slider
                        value={[rate]}
                        onValueChange={(value) => setRate(value[0])}
                        min={1}
                        max={15}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>1%</span>
                        <span>15%</span>
                      </div>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Tenure (Years)</Label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="text-lg font-semibold"
                        min="1"
                        max="10"
                      />
                      <Slider
                        value={[tenure]}
                        onValueChange={(value) => setTenure(value[0])}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>1 Year</span>
                        <span>10 Years</span>
                      </div>
                    </div>
                  </div>

                  {/* Compounding Frequency */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700">Compounding Frequency</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {compoundingOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={compoundingFrequency === option.value ? "default" : "outline"}
                          onClick={() => setCompoundingFrequency(option.value)}
                          className={`text-sm ${
                            compoundingFrequency === option.value ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"
                          }`}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Target className="w-5 h-5 text-blue-600" />
                    Investment Results
                  </CardTitle>
                  <CardDescription>Your fixed deposit maturity calculations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Maturity Amount */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <div className="text-center">
                      <p className="text-sm text-blue-600 font-medium mb-2">Maturity Amount</p>
                      <p className="text-3xl font-bold text-blue-700">{formatCurrency(results.maturityAmount)}</p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-slate-600 mb-1">Principal Amount</p>
                      <p className="text-lg font-semibold text-slate-800">{formatCurrency(principal)}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-green-600 mb-1">Interest Earned</p>
                      <p className="text-lg font-semibold text-green-700">{formatCurrency(results.interestEarned)}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Effective Annual Rate</span>
                      <span className="font-semibold text-slate-800">{results.effectiveRate}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Investment Period</span>
                      <span className="font-semibold text-slate-800">{tenure} Years</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-slate-600">Compounding</span>
                      <span className="font-semibold text-slate-800">
                        {compoundingOptions.find((opt) => opt.value === compoundingFrequency)?.label}
                      </span>
                    </div>
                  </div>

                  {/* Growth Visualization */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Investment Growth</span>
                      <span className="text-sm text-green-600 font-medium">
                        +{((results.interestEarned / principal) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min((results.interestEarned / principal) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Important Notes */}
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Important:</strong> Interest earned on Fixed Deposits is taxable as per your income tax slab.
                TDS is deducted if interest exceeds ₹40,000 per year (₹50,000 for senior citizens).
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  How Fixed Deposit Calculator Works
                </CardTitle>
                <CardDescription>Understanding FD calculations and compound interest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Calculation Process</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold text-blue-600">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Enter Investment Details</p>
                          <p className="text-sm text-slate-600">Input principal amount, interest rate, and tenure</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold text-blue-600">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Select Compounding Frequency</p>
                          <p className="text-sm text-slate-600">Choose how often interest is compounded</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold text-blue-600">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Calculate Maturity Amount</p>
                          <p className="text-sm text-slate-600">Get instant results with detailed breakdown</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold text-blue-600">
                          4
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Analyze Returns</p>
                          <p className="text-sm text-slate-600">Review interest earned and effective rate</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">FD Formula</h3>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="font-mono text-sm text-slate-800 mb-2">A = P(1 + r/n)^(nt)</p>
                      <div className="space-y-1 text-xs text-slate-600">
                        <p>
                          <strong>A</strong> = Maturity Amount
                        </p>
                        <p>
                          <strong>P</strong> = Principal Amount
                        </p>
                        <p>
                          <strong>r</strong> = Annual Interest Rate
                        </p>
                        <p>
                          <strong>n</strong> = Compounding Frequency
                        </p>
                        <p>
                          <strong>t</strong> = Time Period (Years)
                        </p>
                      </div>
                    </div>
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Pro Tip:</strong> More frequent compounding (monthly vs annually) results in higher
                        returns due to the power of compound interest.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Info className="w-5 h-5 text-blue-600" />
                  Fixed Deposit Terms & Definitions
                </CardTitle>
                <CardDescription>Essential terms to understand FD investments</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {fdTerms.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-slate-200 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium text-slate-800">{item.term}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 pb-4">{item.definition}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  Smart FD Investment Tips
                </CardTitle>
                <CardDescription>Expert strategies to maximize your fixed deposit returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {fdTips.map((tip, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                        <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold text-blue-600">
                          {index + 1}
                        </div>
                        {tip.title}
                      </h4>
                      <p className="text-sm text-slate-600">{tip.description}</p>
                    </div>
                  ))}
                </div>
                <Alert className="mt-6 border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Disclaimer:</strong> Fixed deposits are subject to market risks and tax implications. Please
                    consult with a financial advisor for personalized investment advice.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

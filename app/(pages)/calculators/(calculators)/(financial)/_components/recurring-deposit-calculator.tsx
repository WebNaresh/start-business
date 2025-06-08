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
  ArrowLeft,
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

export default function RecurringDepositCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000)
  const [rate, setRate] = useState(7.0)
  const [tenure, setTenure] = useState(24) // in months
  const [results, setResults] = useState({
    maturityAmount: 0,
    interestEarned: 0,
  })

  // Calculate RD maturity amount
  useEffect(() => {
    const calculateRD = () => {
      const P = monthlyDeposit
      const n = tenure
      const r = rate
      // Formula: Maturity = P × n + P × n(n+1)/2 × r/(400)
      const maturityAmount = P * n + (P * n * (n + 1) / 2) * (r / 400)
      const interestEarned = maturityAmount - P * n
      setResults({
        maturityAmount: Math.round(maturityAmount),
        interestEarned: Math.round(interestEarned),
      })
    }
    calculateRD()
  }, [monthlyDeposit, rate, tenure])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const rdTerms = [
    {
      term: "Recurring Deposit (RD)",
      definition:
        "A recurring deposit is a special kind of term deposit offered by banks in India which helps people with regular incomes to deposit a fixed amount every month into their recurring deposit account and earn interest at the rate applicable to fixed deposits.",
    },
    {
      term: "Monthly Installment",
      definition: "The fixed amount you deposit every month into your RD account.",
    },
    {
      term: "Interest Rate",
      definition: "The annual rate at which your RD earns interest, compounded quarterly.",
    },
    {
      term: "Tenure",
      definition: "The total period (in months) for which you make monthly deposits.",
    },
    {
      term: "Maturity Amount",
      definition: "The total amount you receive at the end of the RD tenure, including both your deposits and the interest earned.",
    },
  ]

  const rdTips = [
    {
      title: "Start Early",
      description: "The earlier you start, the more you benefit from compounding interest.",
    },
    {
      title: "Choose Tenure Wisely",
      description: "Pick a tenure that matches your savings goal and liquidity needs.",
    },
    {
      title: "Check Bank Rates",
      description: "Interest rates vary by bank. Compare before opening an RD.",
    },
    {
      title: "Avoid Premature Withdrawals",
      description: "Withdrawing before maturity may result in penalties and lower interest.",
    },
    {
      title: "Automate Deposits",
      description: "Set up auto-debit to never miss a monthly installment.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <Link href="/calculators">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculators
          </Button>
        </Link>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mr-4">
              <PiggyBank className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Recurring Deposit Calculator</h1>
              <p className="text-slate-600 mt-1">Calculate RD maturity amount and interest earned</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <TrendingUp className="w-4 h-4 mr-1" />
            Savings Planning Tool
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
                    <DollarSign className="w-5 h-5 text-green-600" />
                    RD Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="monthlyDeposit">Monthly Deposit (₹)</Label>
                    <Input
                      id="monthlyDeposit"
                      type="number"
                      min={100}
                      max={1000000}
                      value={monthlyDeposit}
                      onChange={e => setMonthlyDeposit(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
                    <Slider
                      id="rate"
                      min={3}
                      max={12}
                      step={0.1}
                      value={[rate]}
                      onValueChange={([v]) => setRate(v)}
                      className="mt-1"
                    />
                    <div className="text-xs text-slate-500 mt-1">{rate.toFixed(2)}% per annum</div>
                  </div>
                  <div>
                    <Label htmlFor="tenure">Tenure (months)</Label>
                    <Slider
                      id="tenure"
                      min={6}
                      max={120}
                      step={1}
                      value={[tenure]}
                      onValueChange={([v]) => setTenure(v)}
                      className="mt-1"
                    />
                    <div className="text-xs text-slate-500 mt-1">{tenure} months</div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Target className="w-5 h-5 text-green-600" />
                    Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Maturity Amount</span>
                      <span className="font-bold text-green-700 text-lg">{formatCurrency(results.maturityAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Total Interest Earned</span>
                      <span className="font-semibold text-green-700">{formatCurrency(results.interestEarned)}</span>
                    </div>
                  </div>
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <AlertDescription>
                      This calculation assumes quarterly compounding, which is standard for most Indian banks.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  How RD Calculation Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Recurring Deposit (RD) calculator helps you estimate the maturity amount and interest earned on your monthly deposits. The formula used is:
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm">
                  <strong>Maturity Amount = P × n + P × n(n+1)/2 × r/(400)</strong>
                  <br />
                  where P = monthly deposit, n = number of months, r = annual interest rate
                </div>
                <ul className="list-disc pl-6 text-slate-700 text-sm">
                  <li>Interest is compounded quarterly as per Indian banking standards.</li>
                  <li>Changing the deposit, rate, or tenure updates the results instantly.</li>
                  <li>This tool is for estimation only. Actual returns may vary by bank.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Info className="w-5 h-5 text-green-600" />
                  RD Terms Explained
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {rdTerms.map((item, idx) => (
                    <AccordionItem value={item.term} key={idx}>
                      <AccordionTrigger>{item.term}</AccordionTrigger>
                      <AccordionContent>{item.definition}</AccordionContent>
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
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  RD Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 text-slate-700 text-sm space-y-2">
                  {rdTips.map((tip, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{tip.title}:</span> {tip.description}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
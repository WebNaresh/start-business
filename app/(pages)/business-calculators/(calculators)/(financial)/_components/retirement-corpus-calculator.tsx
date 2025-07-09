"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calculator,
  BookOpen,
  FileText,
  Lightbulb,
  TrendingUp,
  PiggyBank,
  Target,
  Clock,
  AlertCircle,
  Info,
  DollarSign,
  Calendar,
  BarChart3,
  Shield,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RetirementCorpusCalculator() {
  const [currentAge, setCurrentAge] = useState([30])
  const [retirementAge, setRetirementAge] = useState([60])
  const [lifeExpectancy, setLifeExpectancy] = useState([80])
  const [monthlyExpenses, setMonthlyExpenses] = useState([50000])
  const [inflationRate, setInflationRate] = useState([6])
  const [preRetirementReturn, setPreRetirementReturn] = useState([12])
  const [postRetirementReturn, setPostRetirementReturn] = useState([8])
  const [currentSavings, setCurrentSavings] = useState([500000])
  const [monthlyInvestment, setMonthlyInvestment] = useState([25000])

  // Calculations
  const yearsToRetirement = retirementAge[0] - currentAge[0]
  const retirementYears = lifeExpectancy[0] - retirementAge[0]

  // Future value of current monthly expenses at retirement (adjusted for inflation)
  const futureMonthlyExpenses = monthlyExpenses[0] * Math.pow(1 + inflationRate[0] / 100, yearsToRetirement)
  const annualExpensesAtRetirement = futureMonthlyExpenses * 12

  // Required corpus using 4% withdrawal rule (adjusted for post-retirement returns)
  const withdrawalRate = postRetirementReturn[0] / 100
  const requiredCorpus = annualExpensesAtRetirement / withdrawalRate

  // Future value of current savings
  const futureValueCurrentSavings = currentSavings[0] * Math.pow(1 + preRetirementReturn[0] / 100, yearsToRetirement)

  // Future value of monthly investments (SIP)
  const monthlyRate = preRetirementReturn[0] / 100 / 12
  const totalMonths = yearsToRetirement * 12
  const futureValueSIP = (monthlyInvestment[0] * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / monthlyRate

  // Total corpus at retirement
  const totalCorpusAtRetirement = futureValueCurrentSavings + futureValueSIP

  // Shortfall or surplus
  const corpusGap = requiredCorpus - totalCorpusAtRetirement

  // Required monthly investment to meet the goal
  const requiredMonthlyInvestment =
    corpusGap > 0 ? corpusGap / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) : 0

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`
    } else {
      return `₹${amount.toLocaleString("en-IN")}`
    }
  }

  const retirementTerms = [
    {
      term: "Retirement Corpus",
      definition:
        "The total amount of money you need to accumulate by retirement to maintain your desired lifestyle throughout your retirement years.",
    },
    {
      term: "Inflation Rate",
      definition:
        "The rate at which the general level of prices for goods and services rises, reducing purchasing power over time. Typically 6-7% in India.",
    },
    {
      term: "Power of Compounding",
      definition:
        "The ability of an asset to generate earnings, which are then reinvested to generate their own earnings. Albert Einstein called it the 'eighth wonder of the world'.",
    },
    {
      term: "Rule of 72",
      definition:
        "A quick formula to estimate how long it takes for an investment to double. Divide 72 by the annual interest rate to get the approximate number of years.",
    },
    {
      term: "Withdrawal Rate",
      definition:
        "The percentage of your retirement corpus you withdraw annually. The 4% rule suggests withdrawing 4% annually for a 30-year retirement.",
    },
    {
      term: "Life Expectancy",
      definition:
        "The average number of years a person is expected to live. Important for calculating how long your retirement corpus needs to last.",
    },
    {
      term: "Financial Independence",
      definition:
        "Having sufficient personal wealth to live without depending on employment income. Your investments generate enough income to cover expenses.",
    },
    {
      term: "Asset Allocation",
      definition:
        "The distribution of investments across different asset classes (stocks, bonds, real estate) to balance risk and return based on age and goals.",
    },
    {
      term: "Sequence Risk",
      definition:
        "The risk that poor investment returns early in retirement can significantly impact the longevity of your retirement portfolio.",
    },
    {
      term: "Longevity Risk",
      definition:
        "The risk of outliving your retirement savings due to increased life expectancy or inadequate planning for healthcare costs.",
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
              <Shield className="w-4 h-4 mr-2" />
              Retirement Planning Tool
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Retirement Corpus Calculator</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Plan your retirement with intelligent calculations. Determine how much you need to save for a
              comfortable retirement.
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Guide</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Terms</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Tips</span>
            </TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Target className="w-5 h-5 text-blue-600" />
                    Retirement Planning Inputs
                  </CardTitle>
                  <CardDescription>Enter your details to calculate your retirement corpus needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Age Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Current Age</Label>
                      <div className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
                        <div className="text-lg font-semibold text-blue-600">{currentAge[0]} years</div>
                      </div>
                      <Slider
                        value={currentAge}
                        onValueChange={setCurrentAge}
                        max={60}
                        min={25}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>25</span>
                        <span>60</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Retirement Age</Label>
                      <div className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
                        <div className="text-lg font-semibold text-blue-600">{retirementAge[0]} years</div>
                      </div>
                      <Slider
                        value={retirementAge}
                        onValueChange={setRetirementAge}
                        max={75}
                        min={Math.max(45, currentAge[0] + 1)}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>45</span>
                        <span>75</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Life Expectancy</Label>
                      <div className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
                        <div className="text-lg font-semibold text-blue-600">{lifeExpectancy[0]} years</div>
                      </div>
                      <Slider
                        value={lifeExpectancy}
                        onValueChange={setLifeExpectancy}
                        max={100}
                        min={Math.max(65, retirementAge[0] + 1)}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>65</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Current Monthly Expenses</Label>
                      <div className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
                        <div className="text-lg font-semibold text-blue-600">
                          {formatCurrency(monthlyExpenses[0])}
                        </div>
                      </div>
                      <Slider
                        value={monthlyExpenses}
                        onValueChange={setMonthlyExpenses}
                        max={500000}
                        min={10000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>₹10K</span>
                        <span>₹5L</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Inflation Rate (%)</Label>
                        <div className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
                          <div className="text-lg font-semibold text-blue-600">{inflationRate[0]}%</div>
                        </div>
                        <Slider
                          value={inflationRate}
                          onValueChange={setInflationRate}
                          max={12}
                          min={2}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>2%</span>
                          <span>12%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Pre-Retirement Return (%)</Label>
                        <div className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
                          <div className="text-lg font-semibold text-blue-600">{preRetirementReturn[0]}%</div>
                        </div>
                        <Slider
                          value={preRetirementReturn}
                          onValueChange={setPreRetirementReturn}
                          max={16}
                          min={4}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>4%</span>
                          <span>16%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Post-Retirement Return (%)</Label>
                        <div className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
                          <div className="text-lg font-semibold text-blue-600">{postRetirementReturn[0]}%</div>
                        </div>
                        <Slider
                          value={postRetirementReturn}
                          onValueChange={setPostRetirementReturn}
                          max={12}
                          min={4}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>4%</span>
                          <span>12%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Current Savings</Label>
                        <Input
                          type="number"
                          value={currentSavings[0]}
                          onChange={(e) => setCurrentSavings([Number(e.target.value)])}
                          className="text-lg font-semibold"
                          placeholder="Enter current savings"
                        />
                        <p className="text-xs text-slate-500">Your existing retirement savings</p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Monthly Investment</Label>
                        <Input
                          type="number"
                          value={monthlyInvestment[0]}
                          onChange={(e) => setMonthlyInvestment([Number(e.target.value)])}
                          className="text-lg font-semibold"
                          placeholder="Enter monthly investment"
                        />
                        <p className="text-xs text-slate-500">Amount you plan to invest monthly</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Retirement Analysis
                  </CardTitle>
                  <CardDescription>Your retirement corpus calculation results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700">Required Retirement Corpus</p>
                          <p className="text-2xl font-bold text-blue-800">{formatCurrency(requiredCorpus)}</p>
                        </div>
                        <Target className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-700">Projected Corpus at Retirement</p>
                          <p className="text-2xl font-bold text-slate-800">
                            {formatCurrency(totalCorpusAtRetirement)}
                          </p>
                        </div>
                        <PiggyBank className="w-8 h-8 text-slate-600" />
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border ${corpusGap > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium ${corpusGap > 0 ? "text-red-700" : "text-green-700"}`}>
                            {corpusGap > 0 ? "Corpus Shortfall" : "Corpus Surplus"}
                          </p>
                          <p className={`text-2xl font-bold ${corpusGap > 0 ? "text-red-800" : "text-green-800"}`}>
                            {formatCurrency(Math.abs(corpusGap))}
                          </p>
                        </div>
                        <TrendingUp className={`w-8 h-8 ${corpusGap > 0 ? "text-red-600" : "text-green-600"}`} />
                      </div>
                    </div>
                  </div>

                  {/* Additional Insights */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-sm text-slate-600">Years to Retirement</span>
                      <span className="font-semibold text-slate-800">{yearsToRetirement} years</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-sm text-slate-600">Retirement Duration</span>
                      <span className="font-semibold text-slate-800">{retirementYears} years</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-sm text-slate-600">Future Monthly Expenses</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(futureMonthlyExpenses)}</span>
                    </div>
                    {corpusGap > 0 && (
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <span className="text-sm text-red-700">Additional Monthly Investment Needed</span>
                        <span className="font-semibold text-red-800">
                          {formatCurrency(requiredMonthlyInvestment)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Alerts */}
                  {yearsToRetirement < 10 && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-700">
                        You have less than 10 years to retirement. Consider increasing your monthly investments
                        significantly.
                      </AlertDescription>
                    </Alert>
                  )}

                  {corpusGap > 0 && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        Your current savings plan may not be sufficient. Consider increasing your monthly investment
                        or extending your retirement age.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  How Retirement Planning Works
                </CardTitle>
                <CardDescription>Understanding the fundamentals of retirement corpus calculation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Calculation Steps</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Calculate Future Expenses</p>
                          <p className="text-sm text-slate-600">
                            Adjust current expenses for inflation until retirement
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Determine Required Corpus</p>
                          <p className="text-sm text-slate-600">
                            Use withdrawal rate to calculate total corpus needed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Project Current Savings</p>
                          <p className="text-sm text-slate-600">
                            Calculate future value of existing savings and investments
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          4
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Calculate Gap</p>
                          <p className="text-sm text-slate-600">
                            Determine shortfall and required monthly investments
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Key Concepts</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Power of Compounding</p>
                        <p className="text-sm text-blue-700">
                          Your money grows exponentially over time as returns generate their own returns
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Inflation Impact</p>
                        <p className="text-sm text-blue-700">
                          Money loses purchasing power over time, requiring larger corpus for same lifestyle
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">4% Withdrawal Rule</p>
                        <p className="text-sm text-blue-700">
                          Withdraw 4% of corpus annually for sustainable 30-year retirement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    <strong>Formula:</strong> Required Corpus = (Annual Expenses at Retirement) ÷ (Withdrawal Rate)
                    <br />
                    <strong>Example:</strong> If you need ₹10L annually and use 4% withdrawal rate: ₹10L ÷ 0.04 = ₹2.5
                    Cr corpus needed
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Retirement Planning Terms
                </CardTitle>
                <CardDescription>Essential terminology for retirement planning</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {retirementTerms.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-slate-200">
                      <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                        <span className="font-medium">{item.term}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 leading-relaxed">
                        {item.definition}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  Expert Retirement Planning Tips
                </CardTitle>
                <CardDescription>Professional strategies for building your retirement corpus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800">Start Early</h4>
                          <p className="text-sm text-green-700">
                            Starting 10 years earlier can reduce required monthly investment by 50% due to
                            compounding.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Increase Savings Rate</h4>
                          <p className="text-sm text-blue-700">
                            Aim to save 15-20% of income for retirement. Increase by 1% annually or with salary hikes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-purple-800">Diversify Investments</h4>
                          <p className="text-sm text-purple-700">
                            Mix equity, debt, and real estate. Reduce equity allocation as you approach retirement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-orange-800">Account for Healthcare</h4>
                          <p className="text-sm text-orange-700">
                            Healthcare costs increase with age. Plan for 20-30% higher expenses in later retirement
                            years.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-800">Consider Tax Implications</h4>
                          <p className="text-sm text-red-700">
                            Use tax-advantaged accounts like PPF, ELSS, and NPS to reduce current tax burden.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-teal-800">Review Regularly</h4>
                          <p className="text-sm text-teal-700">
                            Review and adjust your retirement plan annually or after major life events.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="border-slate-200 bg-slate-50">
                  <AlertCircle className="h-4 w-4 text-slate-600" />
                  <AlertDescription className="text-slate-700">
                    <strong>Professional Advice:</strong> Consider consulting a certified financial planner for
                    personalized retirement strategies based on your specific situation and goals.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

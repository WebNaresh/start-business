"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, BookOpen, HelpCircle, Lightbulb, PiggyBank, TrendingUp, Shield, AlertCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NPSCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000)
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [accountType, setAccountType] = useState("tier1")
  const [annuityRate, setAnnuityRate] = useState(6)

  // Calculate NPS results
  const yearsToRetirement = Math.max(0, retirementAge - currentAge)
  const totalMonths = yearsToRetirement * 12
  const monthlyRate = expectedReturn / 100 / 12

  // Future value calculation with existing balance
  const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)

  const futureValueExisting = currentBalance * Math.pow(1 + expectedReturn / 100, yearsToRetirement)

  const totalCorpus = futureValueContributions + futureValueExisting
  const totalContributions = monthlyContribution * totalMonths + currentBalance
  const totalInterest = totalCorpus - totalContributions

  // NPS withdrawal rules
  const annuityAmount = totalCorpus * 0.4 // 40% mandatory annuity
  const lumpSumAmount = totalCorpus * 0.6 // 60% lump sum (tax-free)
  const monthlyPension = (annuityAmount * annuityRate) / 100 / 12

  // Tax savings calculation
  const annualContribution = monthlyContribution * 12
  const section80C = Math.min(annualContribution, 150000) // Up to 1.5 lakh
  const section80CCD1B = accountType === "tier1" ? Math.min(annualContribution, 50000) : 0 // Additional 50k for Tier I
  const totalTaxSaving = section80C + section80CCD1B
  const taxSavedAmount = totalTaxSaving * 0.3 // Assuming 30% tax bracket

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`
    } else {
      return `₹${amount.toLocaleString("en-IN")}`
    }
  }

  const npsTerms = [
    {
      term: "National Pension System (NPS)",
      definition:
        "A government-sponsored pension scheme designed to provide retirement income to all citizens. It's a market-linked, defined contribution pension system regulated by PFRDA.",
    },
    {
      term: "Tier I Account",
      definition:
        "The main NPS account with lock-in until age 60, offering tax benefits under Section 80C and 80CCD(1B). Withdrawals are restricted with specific conditions.",
    },
    {
      term: "Tier II Account",
      definition:
        "A voluntary savings account without lock-in period, offering complete liquidity. No tax benefits available, but provides flexibility for withdrawals.",
    },
    {
      term: "PRAN (Permanent Retirement Account Number)",
      definition:
        "A unique 12-digit number assigned to each NPS subscriber for tracking contributions and maintaining account records throughout the investment period.",
    },
    {
      term: "Annuity",
      definition:
        "A financial product that provides regular income after retirement. In NPS, 40% of corpus must be used to purchase annuity for monthly pension.",
    },
    {
      term: "Asset Allocation",
      definition:
        "Distribution of investments across equity (Class E), corporate bonds (Class C), and government securities (Class G) based on age and risk appetite.",
    },
    {
      term: "Auto Choice",
      definition:
        "Default investment option where asset allocation is automatically adjusted based on age, gradually shifting from equity to debt as you approach retirement.",
    },
    {
      term: "Active Choice",
      definition:
        "Investment option allowing subscribers to choose their own asset allocation across equity, corporate bonds, and government securities with specified limits.",
    },
    {
      term: "Partial Withdrawal",
      definition:
        "Facility to withdraw up to 25% of contributions after 3 years for specific purposes like higher education, marriage, medical treatment, or house purchase.",
    },
    {
      term: "Exit Options",
      definition:
        "At retirement, subscribers can withdraw 60% as lump sum (tax-free) and must invest 40% in annuity for monthly pension. Premature exit before 60 has restrictions.",
    },
  ]

  const npsGuide = [
    {
      step: "1. Choose Account Type",
      description:
        "Select Tier I for tax benefits and long-term retirement planning, or Tier II for flexible savings without lock-in.",
    },
    {
      step: "2. Determine Contribution",
      description:
        "Decide monthly contribution amount. Minimum ₹500 for Tier I and ₹250 for Tier II. Higher contributions lead to larger corpus.",
    },
    {
      step: "3. Select Asset Allocation",
      description:
        "Choose between Auto Choice (age-based allocation) or Active Choice (self-managed allocation) based on your risk appetite.",
    },
    {
      step: "4. Calculate Retirement Corpus",
      description:
        "Use compound interest formula: FV = PMT × [((1 + r)^n - 1) / r] where PMT is monthly contribution, r is monthly return rate, n is number of months.",
    },
  ]

  const npsExpertTips = [
    {
      title: "Start Early for Maximum Benefit",
      description:
        "Begin NPS investments in your 20s or early 30s to leverage the power of compounding over 30-40 years for substantial corpus building.",
    },
    {
      title: "Maximize Tax Benefits",
      description:
        "Contribute up to ₹1.5 lakh under Section 80C and additional ₹50,000 under Section 80CCD(1B) for Tier I to save maximum tax.",
    },
    {
      title: "Choose Appropriate Asset Allocation",
      description:
        "Younger investors can opt for higher equity allocation (up to 75%) for better returns, while older investors should prefer debt for stability.",
    },
    {
      title: "Regular Contribution Increases",
      description:
        "Increase your monthly contribution by 10-15% annually or with salary increments to build a larger retirement corpus.",
    },
    {
      title: "Monitor and Review Regularly",
      description:
        "Review your NPS portfolio annually, check fund performance, and adjust asset allocation based on market conditions and age.",
    },
    {
      title: "Plan Annuity Purchase Wisely",
      description:
        "Research different annuity providers and options before retirement to ensure the best monthly pension rates for your corpus.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/calculators">
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
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              <PiggyBank className="w-4 h-4 mr-2" />
              Retirement Planning Tool
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">NPS Calculator</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Calculate your National Pension System corpus, monthly pension, and tax savings with our comprehensive NPS
              calculator
            </p>
          </motion.div>
        </div>

        {/* Main Calculator */}
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

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    NPS Investment Details
                  </CardTitle>
                  <CardDescription>Enter your investment details to calculate NPS returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Account Type */}
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select value={accountType} onValueChange={setAccountType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tier1">Tier I (Tax Benefits + Lock-in)</SelectItem>
                        <SelectItem value="tier2">Tier II (No Lock-in)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Monthly Contribution */}
                  <div className="space-y-3">
                    <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[monthlyContribution]}
                        onValueChange={(value) => setMonthlyContribution(value[0])}
                        max={100000}
                        min={500}
                        step={500}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>₹500</span>
                        <span className="font-medium">₹{monthlyContribution.toLocaleString()}</span>
                        <span>₹1,00,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Age Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentAge">Current Age</Label>
                      <Input
                        id="currentAge"
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(Number(e.target.value))}
                        min={18}
                        max={65}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retirementAge">Retirement Age</Label>
                      <Input
                        id="retirementAge"
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(Number(e.target.value))}
                        min={60}
                        max={70}
                      />
                    </div>
                  </div>

                  {/* Current Balance */}
                  <div className="space-y-2">
                    <Label htmlFor="currentBalance">Current NPS Balance (Optional)</Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(Number(e.target.value))}
                      placeholder="Enter existing NPS balance"
                    />
                  </div>

                  {/* Expected Return */}
                  <div className="space-y-3">
                    <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[expectedReturn]}
                        onValueChange={(value) => setExpectedReturn(value[0])}
                        max={14}
                        min={8}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>8%</span>
                        <span className="font-medium">{expectedReturn}%</span>
                        <span>14%</span>
                      </div>
                    </div>
                  </div>

                  {/* Annuity Rate */}
                  <div className="space-y-3">
                    <Label htmlFor="annuityRate">Expected Annuity Rate (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[annuityRate]}
                        onValueChange={(value) => setAnnuityRate(value[0])}
                        max={8}
                        min={5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>5%</span>
                        <span className="font-medium">{annuityRate}%</span>
                        <span>8%</span>
                      </div>
                    </div>
                  </div>

                  {/* Validation Alerts */}
                  {retirementAge <= currentAge && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        Retirement age must be greater than current age
                      </AlertDescription>
                    </Alert>
                  )}

                  {yearsToRetirement < 5 && retirementAge > currentAge && (
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-700">
                        Consider starting earlier for better corpus accumulation
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    NPS Calculation Results
                  </CardTitle>
                  <CardDescription>Your projected NPS corpus and retirement benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Investment Timeline */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-700">Investment Period</span>
                      <span className="text-sm text-blue-600">{yearsToRetirement} years</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(((currentAge - 18) / (retirementAge - 18)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Main Results */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                      <div className="text-sm text-blue-700 mb-1">Total Corpus at Retirement</div>
                      <div className="text-2xl font-bold text-blue-800">{formatCurrency(totalCorpus)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-green-700 mb-1">Lump Sum (60%)</div>
                        <div className="text-lg font-bold text-green-800">{formatCurrency(lumpSumAmount)}</div>
                        <div className="text-xs text-green-600">Tax-free withdrawal</div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-sm text-purple-700 mb-1">Annuity (40%)</div>
                        <div className="text-lg font-bold text-purple-800">{formatCurrency(annuityAmount)}</div>
                        <div className="text-xs text-purple-600">For monthly pension</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                      <div className="text-sm text-green-700 mb-1">Monthly Pension</div>
                      <div className="text-2xl font-bold text-green-800">
                        ₹{monthlyPension.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-green-600">Based on {annuityRate}% annuity rate</div>
                    </div>
                  </div>

                  {/* Investment Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-800">Investment Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Total Contributions</span>
                        <span className="text-sm font-medium">{formatCurrency(totalContributions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Interest Earned</span>
                        <span className="text-sm font-medium text-green-600">{formatCurrency(totalInterest)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium text-slate-800">Total Corpus</span>
                        <span className="text-sm font-bold text-blue-600">{formatCurrency(totalCorpus)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tax Benefits */}
                  {accountType === "tier1" && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">Annual Tax Benefits</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-yellow-700">Section 80C</span>
                          <span className="font-medium">₹{section80C.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-700">Section 80CCD(1B)</span>
                          <span className="font-medium">₹{section80CCD1B.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="text-yellow-800 font-medium">Tax Saved (30% bracket)</span>
                          <span className="font-bold">₹{taxSavedAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Professional Alert */}
                  <Alert className="border-blue-200 bg-blue-50">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-700">
                      NPS is a market-linked product. Returns are subject to market risks. Past performance doesn't
                      guarantee future results.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  How NPS Calculator Works
                </CardTitle>
                <CardDescription>
                  Understanding National Pension System calculations and retirement planning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {npsGuide.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800 mb-1">{item.step}</h3>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-3">NPS Formula</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-blue-700">
                      <strong>Future Value = PMT × [((1 + r)^n - 1) / r]</strong>
                    </p>
                    <div className="text-blue-600 space-y-1">
                      <p>• PMT = Monthly contribution amount</p>
                      <p>• r = Monthly interest rate (Annual rate ÷ 12)</p>
                      <p>• n = Total number of months</p>
                      <p>• Annuity = 40% of corpus (mandatory)</p>
                      <p>• Lump Sum = 60% of corpus (tax-free)</p>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    <strong>Pro Tip:</strong> NPS offers dual tax benefits - deduction on contribution and tax-free lump
                    sum withdrawal. The monthly pension from annuity is taxable as per your income slab.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  NPS Terms & Definitions
                </CardTitle>
                <CardDescription>Essential terms to understand National Pension System</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {npsTerms.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-slate-800">{item.term}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600">{item.definition}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  Expert NPS Tips
                </CardTitle>
                <CardDescription>Professional strategies to maximize your NPS benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {npsExpertTips.map((tip, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <h3 className="font-medium text-slate-800 mb-2">{tip.title}</h3>
                      <p className="text-sm text-slate-600">{tip.description}</p>
                    </div>
                  ))}
                </div>

                <Alert className="mt-6 border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-700">
                    <strong>Important:</strong> NPS is subject to market risks and regulatory changes. Consult with a
                    financial advisor for personalized retirement planning advice.
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

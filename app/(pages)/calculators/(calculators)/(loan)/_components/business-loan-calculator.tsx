"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calculator,
  TrendingUp,
  Building2,
  PieChart,
  FileText,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  Calendar,
  Percent,
  Target,
  BarChart3,
  DollarSign,
  Shield,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Users,
  Factory,
  Store,
  Laptop,
  Rocket,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface BusinessLoanResult {
  emi: number
  totalInterest: number
  totalAmount: number
  eligibleAmount: number
  dscr: number
  monthlyInterest: number
  processingFee: number
  totalCost: number
  roi: number
  breakEvenMonths: number
}

export default function BusinessLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("1000000")
  const [interestRate, setInterestRate] = useState<string>("12")
  const [tenure, setTenure] = useState<string>("60")
  const [loanType, setLoanType] = useState<string>("term")
  const [businessType, setBusinessType] = useState<string>("trading")
  const [businessAge, setBusinessAge] = useState<string>("3")
  const [annualTurnover, setAnnualTurnover] = useState<string>("5000000")
  const [monthlyProfit, setMonthlyProfit] = useState<string>("200000")
  const [existingEmi, setExistingEmi] = useState<string>("0")
  const [collateral, setCollateral] = useState<string>("secured")
  const [loanPurpose, setLoanPurpose] = useState<string>("expansion")
  const [expectedReturns, setExpectedReturns] = useState<string>("15")
  const [result, setResult] = useState<BusinessLoanResult | null>(null)

  const loanTypes = [
    { value: "term", label: "Term Loan", rate: 0 },
    { value: "working-capital", label: "Working Capital", rate: 1 },
    { value: "equipment", label: "Equipment Financing", rate: -0.5 },
    { value: "line-of-credit", label: "Line of Credit", rate: 1.5 },
  ]

  const businessTypes = [
    { value: "manufacturing", label: "Manufacturing", rate: -0.5, icon: Factory },
    { value: "trading", label: "Trading", rate: 0, icon: Store },
    { value: "services", label: "Services", rate: 0.5, icon: Laptop },
    { value: "startup", label: "Startup", rate: 2, icon: Rocket },
  ]

  const calculateLoan = () => {
    const principal = Number.parseFloat(loanAmount) || 0
    const rate = Number.parseFloat(interestRate) || 0
    const months = Number.parseInt(tenure) || 0
    const turnover = Number.parseFloat(annualTurnover) || 0
    const profit = Number.parseFloat(monthlyProfit) || 0
    const existingEmis = Number.parseFloat(existingEmi) || 0
    const returns = Number.parseFloat(expectedReturns) || 0

    // Adjust interest rate based on business profile
    let adjustedRate = rate
    const businessTypeData = businessTypes.find((bt) => bt.value === businessType)
    const loanTypeData = loanTypes.find((lt) => lt.value === loanType)

    if (businessTypeData) adjustedRate += businessTypeData.rate
    if (loanTypeData) adjustedRate += loanTypeData.rate

    // Business age adjustment
    const age = Number.parseInt(businessAge)
    if (age < 2) adjustedRate += 1
    else if (age > 5) adjustedRate -= 0.5

    // Collateral adjustment
    if (collateral === "unsecured") adjustedRate += 1.5

    const monthlyRate = adjustedRate / 100 / 12

    // Calculate EMI for term loans
    let emi = 0
    let monthlyInterest = 0

    if (loanType === "term" || loanType === "equipment") {
      if (monthlyRate > 0 && months > 0) {
        emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      }
    } else {
      // For working capital and line of credit - interest only
      monthlyInterest = principal * monthlyRate
      emi = monthlyInterest
    }

    const totalAmount = emi * months
    const totalInterest = totalAmount - principal

    // Calculate eligibility based on turnover
    const eligibleAmount = Math.min(turnover * 0.3, principal) // 30% of turnover

    // Calculate DSCR (Debt Service Coverage Ratio)
    const dscr = profit / (emi + existingEmis)

    // Processing fee (typically 1-2% of loan amount)
    const processingFee = principal * 0.015

    // Total cost including processing fee
    const totalCost = totalAmount + processingFee

    // ROI calculation
    const roi = returns > 0 ? ((returns - adjustedRate) / adjustedRate) * 100 : 0

    // Break-even calculation (simplified)
    const breakEvenMonths = returns > 0 ? principal / (profit * (returns / 100 / 12)) : 0

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      eligibleAmount: Math.round(eligibleAmount),
      dscr: Math.round(dscr * 100) / 100,
      monthlyInterest: Math.round(monthlyInterest),
      processingFee: Math.round(processingFee),
      totalCost: Math.round(totalCost),
      roi: Math.round(roi * 100) / 100,
      breakEvenMonths: Math.round(breakEvenMonths),
    })
  }

  useEffect(() => {
    calculateLoan()
  }, [
    loanAmount,
    interestRate,
    tenure,
    loanType,
    businessType,
    businessAge,
    annualTurnover,
    monthlyProfit,
    existingEmi,
    collateral,
    loanPurpose,
    expectedReturns,
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getEligibilityStatus = () => {
    if (!result) return { status: "unknown", color: "gray", message: "Calculate to see eligibility" }

    if (result.dscr >= 1.5) {
      return { status: "excellent", color: "green", message: "Excellent eligibility" }
    } else if (result.dscr >= 1.25) {
      return { status: "good", color: "blue", message: "Good eligibility" }
    } else if (result.dscr >= 1) {
      return { status: "fair", color: "yellow", message: "Fair eligibility" }
    } else {
      return { status: "poor", color: "red", message: "Poor eligibility" }
    }
  }

  const eligibilityStatus = getEligibilityStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/calculators">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculators
          </Button>
        </Link>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Business Loan Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate EMI, analyze eligibility, and plan your business financing with our comprehensive calculator
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:mx-auto">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guide
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Input Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      Business Loan Details
                    </CardTitle>
                    <CardDescription>Enter your business loan requirements and business details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Loan Type Selection */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {loanTypes.map((type) => (
                        <Button
                          key={type.value}
                          variant={loanType === type.value ? "default" : "outline"}
                          onClick={() => setLoanType(type.value)}
                          className="h-auto p-3 text-center"
                        >
                          <div>
                            <div className="font-medium text-sm">{type.label}</div>
                          </div>
                        </Button>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="loanAmount" className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4" />
                          Loan Amount
                        </Label>
                        <Input
                          id="loanAmount"
                          type="number"
                          placeholder="Enter loan amount"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interestRate" className="flex items-center gap-2">
                          <Percent className="h-4 w-4" />
                          Interest Rate (% per annum)
                        </Label>
                        <Input
                          id="interestRate"
                          type="number"
                          step="0.1"
                          placeholder="Enter interest rate"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tenure" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Tenure (months)
                        </Label>
                        <Select value={tenure} onValueChange={setTenure}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tenure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12">1 Year</SelectItem>
                            <SelectItem value="24">2 Years</SelectItem>
                            <SelectItem value="36">3 Years</SelectItem>
                            <SelectItem value="48">4 Years</SelectItem>
                            <SelectItem value="60">5 Years</SelectItem>
                            <SelectItem value="84">7 Years</SelectItem>
                            <SelectItem value="120">10 Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="collateral">Collateral</Label>
                        <Select value={collateral} onValueChange={setCollateral}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select collateral type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="secured">Secured (with collateral)</SelectItem>
                            <SelectItem value="unsecured">Unsecured (no collateral)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="h-5 w-5 text-green-600" />
                      Business Profile
                    </CardTitle>
                    <CardDescription>Your business details affect loan eligibility and interest rates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Business Type Selection */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {businessTypes.map((type) => {
                        const IconComponent = type.icon
                        return (
                          <Button
                            key={type.value}
                            variant={businessType === type.value ? "default" : "outline"}
                            onClick={() => setBusinessType(type.value)}
                            className="h-auto p-3 text-center"
                          >
                            <div className="space-y-1">
                              <IconComponent className="h-5 w-5 mx-auto" />
                              <div className="font-medium text-xs">{type.label}</div>
                            </div>
                          </Button>
                        )
                      })}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessAge">Business Age (years)</Label>
                        <Select value={businessAge} onValueChange={setBusinessAge}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business age" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Less than 1 year</SelectItem>
                            <SelectItem value="2">1-2 years</SelectItem>
                            <SelectItem value="3">2-3 years</SelectItem>
                            <SelectItem value="5">3-5 years</SelectItem>
                            <SelectItem value="10">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loanPurpose">Loan Purpose</Label>
                        <Select value={loanPurpose} onValueChange={setLoanPurpose}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="expansion">Business Expansion</SelectItem>
                            <SelectItem value="equipment">Equipment Purchase</SelectItem>
                            <SelectItem value="working-capital">Working Capital</SelectItem>
                            <SelectItem value="inventory">Inventory Purchase</SelectItem>
                            <SelectItem value="renovation">Office/Shop Renovation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="annualTurnover" className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Annual Turnover
                        </Label>
                        <Input
                          id="annualTurnover"
                          type="number"
                          placeholder="Enter annual turnover"
                          value={annualTurnover}
                          onChange={(e) => setAnnualTurnover(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monthlyProfit" className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Monthly Net Profit
                        </Label>
                        <Input
                          id="monthlyProfit"
                          type="number"
                          placeholder="Enter monthly profit"
                          value={monthlyProfit}
                          onChange={(e) => setMonthlyProfit(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="existingEmi">Existing EMIs (monthly)</Label>
                        <Input
                          id="existingEmi"
                          type="number"
                          placeholder="Enter existing EMIs"
                          value={existingEmi}
                          onChange={(e) => setExistingEmi(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expectedReturns">Expected ROI (%)</Label>
                        <Input
                          id="expectedReturns"
                          type="number"
                          step="0.1"
                          placeholder="Expected returns from investment"
                          value={expectedReturns}
                          onChange={(e) => setExpectedReturns(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-blue-600" />
                      Loan Calculation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result && (
                      <>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">
                            {loanType === "working-capital" || loanType === "line-of-credit"
                              ? "Monthly Interest"
                              : "Monthly EMI"}
                          </div>
                          <div className="text-3xl font-bold text-blue-600">{formatCurrency(result.emi)}</div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loan Amount</span>
                            <span className="font-semibold">{formatCurrency(Number.parseFloat(loanAmount))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Interest</span>
                            <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Processing Fee</span>
                            <span className="font-semibold">{formatCurrency(result.processingFee)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-lg">
                            <span className="font-semibold">Total Cost</span>
                            <span className="font-bold text-blue-600">{formatCurrency(result.totalCost)}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Eligibility Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result && (
                      <>
                        <div className="text-center">
                          <Badge
                            variant={
                              eligibilityStatus.status === "excellent"
                                ? "default"
                                : eligibilityStatus.status === "good"
                                  ? "secondary"
                                  : eligibilityStatus.status === "fair"
                                    ? "outline"
                                    : "destructive"
                            }
                            className="text-sm px-3 py-1"
                          >
                            {eligibilityStatus.message}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>DSCR (Debt Service Coverage Ratio)</span>
                              <span className="font-semibold">{result.dscr}</span>
                            </div>
                            <Progress value={Math.min(result.dscr * 50, 100)} className="h-2" />
                            <div className="text-xs text-gray-500 mt-1">
                              {result.dscr >= 1.5
                                ? "Excellent"
                                : result.dscr >= 1.25
                                  ? "Good"
                                  : result.dscr >= 1
                                    ? "Fair"
                                    : "Poor"}
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Eligible Amount</span>
                            <span className="font-semibold">{formatCurrency(result.eligibleAmount)}</span>
                          </div>

                          {result.roi > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Expected ROI</span>
                              <span className="font-semibold text-green-600">{result.roi}%</span>
                            </div>
                          )}

                          {result.breakEvenMonths > 0 && result.breakEvenMonths < 120 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Break-even Period</span>
                              <span className="font-semibold">{Math.round(result.breakEvenMonths)} months</span>
                            </div>
                          )}
                        </div>

                        {result.dscr < 1.25 && (
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Consider reducing loan amount or increasing business income for better eligibility.
                            </AlertDescription>
                          </Alert>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      Quick Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-medium">Maintain Good DSCR</div>
                        <div className="text-gray-600">Keep DSCR above 1.5 for better rates</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-medium">Provide Collateral</div>
                        <div className="text-gray-600">Secured loans have lower interest rates</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-medium">Business Vintage</div>
                        <div className="text-gray-600">Older businesses get better terms</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    Loan Breakdown Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result && (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Principal Amount</span>
                          <span className="font-semibold">{formatCurrency(Number.parseFloat(loanAmount))}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(Number.parseFloat(loanAmount) / result.totalCost) * 100}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Total Interest</span>
                          <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${(result.totalInterest / result.totalCost) * 100}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Processing Fee</span>
                          <span className="font-semibold">{formatCurrency(result.processingFee)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${(result.processingFee / result.totalCost) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <Separator />

                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Total Cost of Borrowing</div>
                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(result.totalCost)}</div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Business Impact Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600">Monthly Cash Flow Impact</div>
                          <div className="text-lg font-bold text-blue-600">-{formatCurrency(result.emi)}</div>
                        </div>

                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-600">Remaining Monthly Profit</div>
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(
                              Number.parseFloat(monthlyProfit) - result.emi - Number.parseFloat(existingEmi),
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan to Turnover Ratio</span>
                          <span className="font-semibold">
                            {((Number.parseFloat(loanAmount) / Number.parseFloat(annualTurnover)) * 100).toFixed(1)}%
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">EMI to Profit Ratio</span>
                          <span className="font-semibold">
                            {((result.emi / Number.parseFloat(monthlyProfit)) * 100).toFixed(1)}%
                          </span>
                        </div>

                        {result.roi > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Net ROI (after interest)</span>
                            <span className={`font-semibold ${result.roi > 0 ? "text-green-600" : "text-red-600"}`}>
                              {result.roi}%
                            </span>
                          </div>
                        )}
                      </div>

                      <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertDescription>
                          {result.dscr >= 1.5
                            ? "Your business shows strong ability to service this loan."
                            : result.dscr >= 1.25
                              ? "Your business can manage this loan with careful cash flow management."
                              : "Consider reducing loan amount or improving business profitability."}
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Business Loan Types
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Term Loans</h4>
                      <p className="text-sm text-gray-600">
                        Fixed amount with regular EMI payments. Best for expansion, equipment purchase.
                      </p>
                      <div className="text-xs text-blue-600 mt-1">Interest: 10-15% | Tenure: 1-10 years</div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Working Capital Loans</h4>
                      <p className="text-sm text-gray-600">
                        Flexible credit line for day-to-day operations. Interest only on utilized amount.
                      </p>
                      <div className="text-xs text-green-600 mt-1">Interest: 12-18% | Tenure: 1-3 years</div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">Equipment Financing</h4>
                      <p className="text-sm text-gray-600">
                        Loan against equipment purchase. Equipment serves as collateral.
                      </p>
                      <div className="text-xs text-purple-600 mt-1">Interest: 9-14% | Tenure: 3-7 years</div>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold">Line of Credit</h4>
                      <p className="text-sm text-gray-600">Revolving credit facility. Withdraw and repay as needed.</p>
                      <div className="text-xs text-orange-600 mt-1">Interest: 13-20% | Tenure: 1-2 years</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Business Age</div>
                        <div className="text-sm text-gray-600">
                          Minimum 2 years of operations (1 year for some lenders)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Annual Turnover</div>
                        <div className="text-sm text-gray-600">Minimum ₹40 lakhs (varies by lender and loan type)</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Credit Score</div>
                        <div className="text-sm text-gray-600">Minimum 650 (750+ for better rates)</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">DSCR</div>
                        <div className="text-sm text-gray-600">Minimum 1.25 (1.5+ preferred)</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Profitability</div>
                        <div className="text-sm text-gray-600">Consistent profits for last 2 years</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Business Documents</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Business registration certificate</li>
                        <li>• GST registration certificate</li>
                        <li>• Partnership deed/MOA & AOA</li>
                        <li>• Business license/permits</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Financial Documents</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Last 2 years ITR with computation</li>
                        <li>• Last 2 years audited financials</li>
                        <li>• Bank statements (12 months)</li>
                        <li>• GST returns (12 months)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Personal Documents</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• PAN card of directors/partners</li>
                        <li>• Aadhaar card</li>
                        <li>• Address proof</li>
                        <li>• Passport size photographs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Government Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">MUDRA Loans</h4>
                      <p className="text-sm text-gray-600">
                        Up to ₹10 lakhs for micro enterprises. Lower interest rates.
                      </p>
                      <div className="text-xs text-blue-600 mt-1">Shishu: ₹50K | Kishore: ₹5L | Tarun: ₹10L</div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">MSME Loans</h4>
                      <p className="text-sm text-gray-600">Collateral-free loans up to ₹2 crores for MSMEs.</p>
                      <div className="text-xs text-green-600 mt-1">Interest: 8-12% | Tenure: Up to 7 years</div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">Stand-up India</h4>
                      <p className="text-sm text-gray-600">₹10 lakhs to ₹1 crore for SC/ST/Women entrepreneurs.</p>
                      <div className="text-xs text-purple-600 mt-1">Interest: Base rate + 3% | Tenure: 7 years</div>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold">CGTMSE</h4>
                      <p className="text-sm text-gray-600">
                        Credit guarantee for collateral-free loans up to ₹2 crores.
                      </p>
                      <div className="text-xs text-orange-600 mt-1">Guarantee: 75-85% | Fee: 0.75-1.5%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Common questions about business loans and calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-2">What is DSCR and why is it important?</h4>
                    <p className="text-sm text-gray-600">
                      Debt Service Coverage Ratio (DSCR) measures your ability to pay loan EMIs from business cash flow.
                      It's calculated as Net Operating Income ÷ Total Debt Service. A DSCR of 1.25 or higher is
                      preferred by lenders.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold mb-2">How much loan can I get based on my turnover?</h4>
                    <p className="text-sm text-gray-600">
                      Generally, you can get a loan of 20-30% of your annual turnover. However, this depends on your
                      business profitability, credit score, and the lender's policies. Some lenders may offer up to 40%
                      for established businesses.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-2">
                      What's the difference between secured and unsecured business loans?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Secured loans require collateral (property, equipment) and offer lower interest rates (9-14%).
                      Unsecured loans don't need collateral but have higher rates (12-20%) and stricter eligibility
                      criteria.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-2">Can I prepay my business loan?</h4>
                    <p className="text-sm text-gray-600">
                      Yes, most lenders allow prepayment. For floating rate loans, there's usually no prepayment
                      penalty. For fixed rate loans, there might be a penalty of 2-4% of the outstanding amount.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold mb-2">What factors affect my business loan interest rate?</h4>
                    <p className="text-sm text-gray-600">
                      Key factors include: credit score, business vintage, annual turnover, profitability, industry
                      type, loan amount, tenure, collateral, and relationship with the lender. Better these factors,
                      lower the rate.
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold mb-2">How long does business loan approval take?</h4>
                    <p className="text-sm text-gray-600">
                      Digital lenders: 1-7 days for unsecured loans. Traditional banks: 15-30 days. The timeline depends
                      on documentation completeness, loan amount, and internal processes.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-semibold mb-2">Are business loan interest payments tax deductible?</h4>
                    <p className="text-sm text-gray-600">
                      Yes, business loan interest is fully deductible under Section 37 of the Income Tax Act as a
                      business expense. This reduces your taxable income and overall tax liability.
                    </p>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-semibold mb-2">What is the maximum loan tenure available?</h4>
                    <p className="text-sm text-gray-600">
                      Term loans: Up to 10 years. Working capital: 1-3 years. Equipment financing: 3-7 years. Longer
                      tenure reduces EMI but increases total interest cost.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

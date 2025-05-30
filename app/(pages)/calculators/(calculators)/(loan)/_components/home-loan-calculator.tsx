"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calculator,
  Home,
  TrendingUp,
  PiggyBank,
  FileText,
  Info,
  DollarSign,
  Calendar,
  Percent,
  Building,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HomeLoanResult {
  emi: number
  totalAmount: number
  totalInterest: number
  loanAmount: number
  downPayment: number
  processingFee: number
  totalCost: number
  eligibleAmount: number
  taxBenefits: {
    section80C: number
    section24b: number
    totalBenefit: number
  }
}

interface PrepaymentResult {
  originalTenure: number
  newTenure: number
  interestSaved: number
  tenureReduction: number
}

interface AmortizationEntry {
  month: number
  emi: number
  principal: number
  interest: number
  balance: number
}

export default function HomeLoanCalculator() {
  const [propertyValue, setPropertyValue] = useState<string>("5000000")
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20")
  const [interestRate, setInterestRate] = useState<string>("8.5")
  const [tenure, setTenure] = useState<string>("20")
  const [monthlyIncome, setMonthlyIncome] = useState<string>("100000")
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("30000")
  const [prepaymentAmount, setPrepaymentAmount] = useState<string>("500000")
  const [prepaymentYear, setPrepaymentYear] = useState<string>("5")
  const [loanType, setLoanType] = useState<string>("home")

  const [result, setResult] = useState<HomeLoanResult | null>(null)
  const [prepaymentResult, setPrepaymentResult] = useState<PrepaymentResult | null>(null)
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateInputs = () => {
    const newErrors: Record<string, string> = {}

    if (!propertyValue || Number.parseFloat(propertyValue) <= 0) {
      newErrors.propertyValue = "Property value must be greater than 0"
    }
    if (
      !downPaymentPercent ||
      Number.parseFloat(downPaymentPercent) < 0 ||
      Number.parseFloat(downPaymentPercent) > 100
    ) {
      newErrors.downPaymentPercent = "Down payment must be between 0% and 100%"
    }
    if (!interestRate || Number.parseFloat(interestRate) <= 0 || Number.parseFloat(interestRate) > 50) {
      newErrors.interestRate = "Interest rate must be between 0% and 50%"
    }
    if (!tenure || Number.parseFloat(tenure) <= 0 || Number.parseFloat(tenure) > 30) {
      newErrors.tenure = "Tenure must be between 1 and 30 years"
    }
    if (!monthlyIncome || Number.parseFloat(monthlyIncome) <= 0) {
      newErrors.monthlyIncome = "Monthly income must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateHomeLoan = () => {
    if (!validateInputs()) return

    const propValue = Number.parseFloat(propertyValue)
    const downPayment = (propValue * Number.parseFloat(downPaymentPercent)) / 100
    const loanAmount = propValue - downPayment
    const rate = Number.parseFloat(interestRate) / 100 / 12
    const months = Number.parseFloat(tenure) * 12
    const income = Number.parseFloat(monthlyIncome)
    const expenses = Number.parseFloat(monthlyExpenses)

    // EMI Calculation
    const emi = (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
    const totalAmount = emi * months
    const totalInterest = totalAmount - loanAmount

    // Processing Fee (typically 0.5% to 1% of loan amount)
    const processingFee = loanAmount * 0.005

    // Total Cost
    const totalCost = propValue + processingFee + totalInterest

    // Loan Eligibility (typically 50-60% of net income)
    const netIncome = income - expenses
    const maxEMI = netIncome * 0.5
    const eligibleAmount = (maxEMI * (Math.pow(1 + rate, months) - 1)) / (rate * Math.pow(1 + rate, months))

    // Tax Benefits
    const section80C = Math.min(loanAmount * 0.01, 150000) // Principal repayment up to 1.5L
    const section24b = Math.min((totalInterest / months) * 12, 200000) // Interest up to 2L for self-occupied
    const totalBenefit = section80C + section24b

    const calculatedResult: HomeLoanResult = {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      loanAmount: Math.round(loanAmount),
      downPayment: Math.round(downPayment),
      processingFee: Math.round(processingFee),
      totalCost: Math.round(totalCost),
      eligibleAmount: Math.round(eligibleAmount),
      taxBenefits: {
        section80C: Math.round(section80C),
        section24b: Math.round(section24b),
        totalBenefit: Math.round(totalBenefit),
      },
    }

    setResult(calculatedResult)
    generateAmortizationSchedule(loanAmount, rate, months, emi)
  }

  const calculatePrepayment = () => {
    if (!result) return

    const loanAmount = result.loanAmount
    const rate = Number.parseFloat(interestRate) / 100 / 12
    const originalMonths = Number.parseFloat(tenure) * 12
    const emi = result.emi
    const prepayment = Number.parseFloat(prepaymentAmount)
    const prepaymentMonth = Number.parseFloat(prepaymentYear) * 12

    // Calculate remaining balance at prepayment time
    let balance = loanAmount
    for (let i = 1; i <= prepaymentMonth; i++) {
      const interestPayment = balance * rate
      const principalPayment = emi - interestPayment
      balance -= principalPayment
    }

    // New balance after prepayment
    const newBalance = balance - prepayment

    // Calculate new tenure
    const newMonths = Math.log(1 + (newBalance * rate) / emi) / Math.log(1 + rate)
    const newTenure = prepaymentMonth + newMonths

    // Interest saved
    const originalInterest = emi * originalMonths - loanAmount
    const newInterest = emi * newTenure - loanAmount + prepayment
    const interestSaved = originalInterest - newInterest

    const prepaymentCalc: PrepaymentResult = {
      originalTenure: originalMonths,
      newTenure: Math.round(newTenure),
      interestSaved: Math.round(interestSaved),
      tenureReduction: Math.round(originalMonths - newTenure),
    }

    setPrepaymentResult(prepaymentCalc)
  }

  const generateAmortizationSchedule = (principal: number, rate: number, months: number, emi: number) => {
    const schedule: AmortizationEntry[] = []
    let balance = principal

    for (let month = 1; month <= Math.min(months, 60); month++) {
      // Show first 5 years
      const interestPayment = balance * rate
      const principalPayment = emi - interestPayment
      balance -= principalPayment

      schedule.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance)),
      })

      if (balance <= 0) break
    }

    setAmortizationSchedule(schedule)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num)
  }

  useEffect(() => {
    calculateHomeLoan()
  }, [propertyValue, downPaymentPercent, interestRate, tenure, monthlyIncome, monthlyExpenses])

  useEffect(() => {
    if (result) {
      calculatePrepayment()
    }
  }, [prepaymentAmount, prepaymentYear, result])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link href="/calculators">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculators
        </Button>
      </Link>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-600 rounded-full">
            <Home className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Home Loan Calculator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate your home loan EMI, check eligibility, analyze prepayment benefits, and understand tax savings with
          our comprehensive home loan planning tool.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="guide">Home Loan Guide</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="tax-benefits">Tax Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Loan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <Input
                      id="propertyValue"
                      type="number"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(e.target.value)}
                      placeholder="Enter property value"
                    />
                    {errors.propertyValue && <p className="text-sm text-red-600 mt-1">{errors.propertyValue}</p>}
                  </div>

                  <div>
                    <Label htmlFor="downPaymentPercent">Down Payment (%)</Label>
                    <Input
                      id="downPaymentPercent"
                      type="number"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(e.target.value)}
                      placeholder="Enter down payment percentage"
                    />
                    {errors.downPaymentPercent && (
                      <p className="text-sm text-red-600 mt-1">{errors.downPaymentPercent}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Enter interest rate"
                    />
                    {errors.interestRate && <p className="text-sm text-red-600 mt-1">{errors.interestRate}</p>}
                  </div>

                  <div>
                    <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      placeholder="Enter loan tenure"
                    />
                    {errors.tenure && <p className="text-sm text-red-600 mt-1">{errors.tenure}</p>}
                  </div>

                  <div>
                    <Label htmlFor="loanType">Property Type</Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Self-Occupied Home</SelectItem>
                        <SelectItem value="investment">Investment Property</SelectItem>
                        <SelectItem value="construction">Under Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Income Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="monthlyIncome">Monthly Income</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="Enter monthly income"
                    />
                    {errors.monthlyIncome && <p className="text-sm text-red-600 mt-1">{errors.monthlyIncome}</p>}
                  </div>

                  <div>
                    <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(e.target.value)}
                      placeholder="Enter monthly expenses"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {result && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Monthly EMI</p>
                            <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.emi)}</p>
                          </div>
                          <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Loan Amount</p>
                            <p className="text-3xl font-bold text-green-600">{formatCurrency(result.loanAmount)}</p>
                          </div>
                          <Building className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Interest</p>
                            <p className="text-3xl font-bold text-orange-600">{formatCurrency(result.totalInterest)}</p>
                          </div>
                          <Percent className="h-8 w-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Amount</p>
                            <p className="text-3xl font-bold text-purple-600">{formatCurrency(result.totalAmount)}</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Loan Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Property Value:</span>
                            <span className="font-semibold">{formatCurrency(Number.parseFloat(propertyValue))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Down Payment:</span>
                            <span className="font-semibold">{formatCurrency(result.downPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loan Amount:</span>
                            <span className="font-semibold">{formatCurrency(result.loanAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Processing Fee:</span>
                            <span className="font-semibold">{formatCurrency(result.processingFee)}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly EMI:</span>
                            <span className="font-semibold">{formatCurrency(result.emi)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Interest:</span>
                            <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Cost:</span>
                            <span className="font-semibold">{formatCurrency(result.totalCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Eligible Amount:</span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(result.eligibleAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Prepayment Calculator */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PiggyBank className="h-5 w-5" />
                        Prepayment Calculator
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="prepaymentAmount">Prepayment Amount</Label>
                          <Input
                            id="prepaymentAmount"
                            type="number"
                            value={prepaymentAmount}
                            onChange={(e) => setPrepaymentAmount(e.target.value)}
                            placeholder="Enter prepayment amount"
                          />
                        </div>
                        <div>
                          <Label htmlFor="prepaymentYear">Prepayment Year</Label>
                          <Input
                            id="prepaymentYear"
                            type="number"
                            value={prepaymentYear}
                            onChange={(e) => setPrepaymentYear(e.target.value)}
                            placeholder="Enter prepayment year"
                          />
                        </div>
                      </div>

                      {prepaymentResult && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-600">Interest Saved</p>
                            <p className="text-2xl font-bold text-green-600">
                              {formatCurrency(prepaymentResult.interestSaved)}
                            </p>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600">Tenure Reduction</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {prepaymentResult.tenureReduction} months
                            </p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <p className="text-sm text-gray-600">New Tenure</p>
                            <p className="text-2xl font-bold text-purple-600">
                              {Math.round(prepaymentResult.newTenure / 12)} years
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Amortization Schedule */}
                  {amortizationSchedule.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Amortization Schedule (First 5 Years)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Month</th>
                                <th className="text-right p-2">EMI</th>
                                <th className="text-right p-2">Principal</th>
                                <th className="text-right p-2">Interest</th>
                                <th className="text-right p-2">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {amortizationSchedule.slice(0, 12).map((entry) => (
                                <tr key={entry.month} className="border-b">
                                  <td className="p-2">{entry.month}</td>
                                  <td className="text-right p-2">{formatNumber(entry.emi)}</td>
                                  <td className="text-right p-2">{formatNumber(entry.principal)}</td>
                                  <td className="text-right p-2">{formatNumber(entry.interest)}</td>
                                  <td className="text-right p-2">{formatNumber(entry.balance)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Home Loan Basics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is a Home Loan?</h4>
                  <p className="text-gray-600 text-sm">
                    A home loan is a secured loan provided by banks and financial institutions to help you purchase or
                    construct a residential property. The property itself serves as collateral for the loan.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Types of Home Loans</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Home Purchase Loan</li>
                    <li>• Home Construction Loan</li>
                    <li>• Home Improvement Loan</li>
                    <li>• Plot Purchase Loan</li>
                    <li>• Balance Transfer Loan</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Interest Rate Types</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Fixed Rate: Rate remains constant</li>
                    <li>• Floating Rate: Rate varies with market</li>
                    <li>• Hybrid Rate: Combination of both</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Identity & Address Proof</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• PAN Card</li>
                    <li>• Aadhaar Card</li>
                    <li>• Passport/Driving License</li>
                    <li>• Utility Bills</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Income Proof</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Salary Slips (3 months)</li>
                    <li>• Bank Statements (6 months)</li>
                    <li>• Form 16/ITR (2 years)</li>
                    <li>• Employment Certificate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Property Documents</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Sale Agreement</li>
                    <li>• Property Papers</li>
                    <li>• NOC from Builder</li>
                    <li>• Approved Building Plan</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      1
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Application</h4>
                      <p className="text-gray-600 text-sm">Submit loan application with required documents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      2
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Verification</h4>
                      <p className="text-gray-600 text-sm">Bank verifies documents and checks credit score</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      3
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Property Valuation</h4>
                      <p className="text-gray-600 text-sm">Technical and legal verification of property</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      4
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Approval</h4>
                      <p className="text-gray-600 text-sm">Loan sanctioned and agreement signed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      5
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Disbursement</h4>
                      <p className="text-gray-600 text-sm">Loan amount disbursed as per agreement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips for Better Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Improve Credit Score</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Maintain score above 750</li>
                    <li>• Pay EMIs on time</li>
                    <li>• Keep credit utilization low</li>
                    <li>• Avoid multiple loan applications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Increase Down Payment</h4>
                  <p className="text-gray-600 text-sm">
                    Higher down payment reduces loan amount and may get you better interest rates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Compare Lenders</h4>
                  <p className="text-gray-600 text-sm">
                    Compare interest rates, processing fees, and terms from multiple lenders.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Consider Prepayment</h4>
                  <p className="text-gray-600 text-sm">
                    Make partial prepayments to reduce interest burden and loan tenure.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Age Requirements</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Minimum: 21 years</li>
                    <li>• Maximum: 65 years (at loan maturity)</li>
                    <li>• Self-employed: Up to 70 years</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Income Requirements</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Salaried: ₹25,000+ per month</li>
                    <li>• Self-employed: ₹2,00,000+ per year</li>
                    <li>• Stable income for 2+ years</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Employment</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Salaried employees</li>
                    <li>• Self-employed professionals</li>
                    <li>• Business owners</li>
                    <li>• NRIs (specific conditions apply)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Factors Affecting Eligibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Credit Score</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• 750+: Excellent (best rates)</li>
                    <li>• 700-749: Good</li>
                    <li>• 650-699: Fair</li>
                    <li>• Below 650: Poor (may be rejected)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Debt-to-Income Ratio</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Should not exceed 50% of net income</li>
                    <li>• Includes all existing EMIs</li>
                    <li>• Lower ratio = higher eligibility</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Property Value</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Loan-to-Value ratio: 80-90%</li>
                    <li>• Property location matters</li>
                    <li>• Approved projects preferred</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Your Eligibility Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Eligible Loan Amount</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.eligibleAmount)}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Requested Amount</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(result.loanAmount)}</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">EMI-to-Income Ratio</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {((result.emi / Number.parseFloat(monthlyIncome)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    {result.loanAmount <= result.eligibleAmount ? (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          ✅ You are eligible for the requested loan amount. Your EMI-to-income ratio is within
                          acceptable limits.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          ⚠️ The requested loan amount exceeds your eligibility. Consider increasing your down payment or
                          reducing the loan amount.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tax-benefits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Section 80C - Principal Repayment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deduction Limit</h4>
                  <p className="text-gray-600 text-sm">
                    Up to ₹1,50,000 per financial year can be claimed as deduction under Section 80C for principal
                    repayment.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Eligibility</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Available for self-occupied property</li>
                    <li>• Property should be completed within 5 years</li>
                    <li>• Cannot sell property for 5 years</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Other 80C Investments</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• PPF, ELSS, NSC</li>
                    <li>• Life Insurance Premium</li>
                    <li>• ULIP, Tax Saver FD</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Section 24(b) - Interest Deduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Self-Occupied Property</h4>
                  <p className="text-gray-600 text-sm">
                    Up to ₹2,00,000 per financial year for interest paid on home loan for self-occupied property.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Let-Out Property</h4>
                  <p className="text-gray-600 text-sm">
                    No limit on interest deduction for let-out property. Full interest amount can be claimed.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Pre-Construction Interest</h4>
                  <p className="text-gray-600 text-sm">
                    Interest paid during construction can be claimed in 5 equal installments after completion.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Section 80EEA</h4>
                  <p className="text-gray-600 text-sm">
                    Additional ₹1,50,000 deduction for first-time home buyers (property value up to ₹45 lakhs, loan
                    sanctioned in FY 2019-20 to 2021-22).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Section 80EE</h4>
                  <p className="text-gray-600 text-sm">
                    Additional ₹50,000 deduction for first-time home buyers (loan sanctioned from April 1, 2013 to March
                    31, 2017).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Stamp Duty & Registration</h4>
                  <p className="text-gray-600 text-sm">
                    Stamp duty and registration charges can be claimed under Section 80C (within the ₹1.5 lakh limit).
                  </p>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Tax Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Section 80C Benefit</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(result.taxBenefits.section80C)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Section 24(b) Benefit</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(result.taxBenefits.section24b)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Annual Benefit</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {formatCurrency(result.taxBenefits.totalBenefit)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Tax Savings Calculation</h4>
                      <p className="text-sm text-gray-600">
                        Assuming 30% tax bracket, your annual tax savings would be approximately{" "}
                        <span className="font-semibold text-green-600">
                          {formatCurrency(result.taxBenefits.totalBenefit * 0.3)}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

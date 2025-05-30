"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Car, Calculator, TrendingUp, Shield, FileText, HelpCircle, DollarSign, Percent, PiggyBank, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CarLoanInputs {
  carPrice: number
  downPayment: number
  loanAmount: number
  interestRate: number
  tenure: number
  processingFee: number
  insurance: number
  monthlyIncome: number
  monthlyExpenses: number
  carType: string
  loanType: string
}

interface CarLoanResults {
  emi: number
  totalInterest: number
  totalAmount: number
  totalCost: number
  eligibility: number
  affordability: string
  loanToValue: number
}

export default function CarLoanCalculator() {
  const [inputs, setInputs] = useState<CarLoanInputs>({
    carPrice: 800000,
    downPayment: 200000,
    loanAmount: 600000,
    interestRate: 8.5,
    tenure: 5,
    processingFee: 5000,
    insurance: 25000,
    monthlyIncome: 50000,
    monthlyExpenses: 20000,
    carType: "new",
    loanType: "standard",
  })

  const [results, setResults] = useState<CarLoanResults>({
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
    totalCost: 0,
    eligibility: 0,
    affordability: "Good",
    loanToValue: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateInputs = () => {
    const newErrors: Record<string, string> = {}

    if (inputs.carPrice <= 0) newErrors.carPrice = "Car price must be greater than 0"
    if (inputs.downPayment < 0) newErrors.downPayment = "Down payment cannot be negative"
    if (inputs.downPayment >= inputs.carPrice) newErrors.downPayment = "Down payment must be less than car price"
    if (inputs.interestRate <= 0 || inputs.interestRate > 30)
      newErrors.interestRate = "Interest rate must be between 0.1% and 30%"
    if (inputs.tenure <= 0 || inputs.tenure > 7) newErrors.tenure = "Tenure must be between 1 and 7 years"
    if (inputs.monthlyIncome <= 0) newErrors.monthlyIncome = "Monthly income must be greater than 0"
    if (inputs.monthlyExpenses < 0) newErrors.monthlyExpenses = "Monthly expenses cannot be negative"
    if (inputs.monthlyExpenses >= inputs.monthlyIncome) newErrors.monthlyExpenses = "Expenses must be less than income"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateCarLoan = () => {
    if (!validateInputs()) return

    const principal = inputs.loanAmount
    const monthlyRate = inputs.interestRate / 100 / 12
    const totalMonths = inputs.tenure * 12

    // EMI Calculation
    const emi =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)

    const totalAmount = emi * totalMonths
    const totalInterest = totalAmount - principal
    const totalCost = inputs.carPrice + inputs.insurance + inputs.processingFee

    // Eligibility (50% of net income)
    const netIncome = inputs.monthlyIncome - inputs.monthlyExpenses
    const maxEMI = netIncome * 0.5
    const eligibility = (emi / maxEMI) * 100

    // Affordability
    let affordability = "Excellent"
    if (eligibility > 90) affordability = "Poor"
    else if (eligibility > 70) affordability = "Fair"
    else if (eligibility > 50) affordability = "Good"

    // Loan to Value ratio
    const loanToValue = (inputs.loanAmount / inputs.carPrice) * 100

    setResults({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      totalCost: Math.round(totalCost),
      eligibility: Math.round(eligibility),
      affordability,
      loanToValue: Math.round(loanToValue),
    })
  }

  useEffect(() => {
    const loanAmount = inputs.carPrice - inputs.downPayment
    setInputs((prev) => ({ ...prev, loanAmount }))
  }, [inputs.carPrice, inputs.downPayment])

  useEffect(() => {
    calculateCarLoan()
  }, [inputs])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getAffordabilityColor = (affordability: string) => {
    switch (affordability) {
      case "Excellent":
        return "bg-green-500"
      case "Good":
        return "bg-blue-500"
      case "Fair":
        return "bg-yellow-500"
      case "Poor":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const carTypes = [
    { value: "new", label: "New Car", rate: 8.5 },
    { value: "used", label: "Used Car", rate: 10.5 },
    { value: "certified", label: "Certified Pre-owned", rate: 9.5 },
  ]

  const loanTypes = [
    { value: "standard", label: "Standard Loan", rate: 0 },
    { value: "balloon", label: "Balloon Payment", rate: -0.5 },
    { value: "flexi", label: "Flexi Loan", rate: 0.5 },
  ]

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
            <div className="p-3 bg-blue-600 rounded-full">
              <Car className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Car Loan Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your car loan EMI, compare different options, and plan your dream car purchase with our
            comprehensive calculator
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:mx-auto">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Guide
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Eligibility
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Car Loan Details
                  </CardTitle>
                  <CardDescription className="text-blue-100">Enter your car and loan information</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Car Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Car Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="carType">Car Type</Label>
                        <Select
                          value={inputs.carType}
                          onValueChange={(value) => {
                            const selectedType = carTypes.find((type) => type.value === value)
                            setInputs((prev) => ({
                              ...prev,
                              carType: value,
                              interestRate: selectedType?.rate || 8.5,
                            }))
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {carTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label} ({type.rate}%)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loanType">Loan Type</Label>
                        <Select
                          value={inputs.loanType}
                          onValueChange={(value) => {
                            const selectedLoan = loanTypes.find((loan) => loan.value === value)
                            const baseRate = carTypes.find((type) => type.value === inputs.carType)?.rate || 8.5
                            setInputs((prev) => ({
                              ...prev,
                              loanType: value,
                              interestRate: baseRate + (selectedLoan?.rate || 0),
                            }))
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {loanTypes.map((loan) => (
                              <SelectItem key={loan.value} value={loan.value}>
                                {loan.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carPrice">Car Price (₹)</Label>
                      <Input
                        id="carPrice"
                        type="number"
                        value={inputs.carPrice}
                        onChange={(e) => setInputs((prev) => ({ ...prev, carPrice: Number(e.target.value) }))}
                        className={errors.carPrice ? "border-red-500" : ""}
                      />
                      {errors.carPrice && <p className="text-sm text-red-500">{errors.carPrice}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment (₹)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={inputs.downPayment}
                        onChange={(e) => setInputs((prev) => ({ ...prev, downPayment: Number(e.target.value) }))}
                        className={errors.downPayment ? "border-red-500" : ""}
                      />
                      {errors.downPayment && <p className="text-sm text-red-500">{errors.downPayment}</p>}
                      <p className="text-sm text-gray-500">
                        Recommended: {Math.round((inputs.carPrice * 0.2) / 1000)}K -{" "}
                        {Math.round((inputs.carPrice * 0.3) / 1000)}K (20-30%)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Loan Amount</Label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(inputs.loanAmount)}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Loan Terms */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Loan Terms
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="interestRate">Interest Rate (%)</Label>
                        <Input
                          id="interestRate"
                          type="number"
                          step="0.1"
                          value={inputs.interestRate}
                          onChange={(e) => setInputs((prev) => ({ ...prev, interestRate: Number(e.target.value) }))}
                          className={errors.interestRate ? "border-red-500" : ""}
                        />
                        {errors.interestRate && <p className="text-sm text-red-500">{errors.interestRate}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tenure">Tenure (Years)</Label>
                        <Select
                          value={inputs.tenure.toString()}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, tenure: Number(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year} Year{year > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Additional Costs */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Additional Costs
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="processingFee">Processing Fee (₹)</Label>
                        <Input
                          id="processingFee"
                          type="number"
                          value={inputs.processingFee}
                          onChange={(e) => setInputs((prev) => ({ ...prev, processingFee: Number(e.target.value) }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="insurance">Insurance (₹)</Label>
                        <Input
                          id="insurance"
                          type="number"
                          value={inputs.insurance}
                          onChange={(e) => setInputs((prev) => ({ ...prev, insurance: Number(e.target.value) }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Income Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <PiggyBank className="h-4 w-4" />
                      Income Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          value={inputs.monthlyIncome}
                          onChange={(e) => setInputs((prev) => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
                          className={errors.monthlyIncome ? "border-red-500" : ""}
                        />
                        {errors.monthlyIncome && <p className="text-sm text-red-500">{errors.monthlyIncome}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
                        <Input
                          id="monthlyExpenses"
                          type="number"
                          value={inputs.monthlyExpenses}
                          onChange={(e) => setInputs((prev) => ({ ...prev, monthlyExpenses: Number(e.target.value) }))}
                          className={errors.monthlyExpenses ? "border-red-500" : ""}
                        />
                        {errors.monthlyExpenses && <p className="text-sm text-red-500">{errors.monthlyExpenses}</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div className="space-y-6">
                {/* EMI Results */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Loan Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.emi)}</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(results.totalInterest)}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-purple-600">{formatCurrency(results.totalAmount)}</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                        <p className="text-2xl font-bold text-orange-600">{formatCurrency(results.totalCost)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Affordability Analysis */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Affordability Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">EMI to Income Ratio</span>
                        <Badge className={getAffordabilityColor(results.affordability)}>{results.affordability}</Badge>
                      </div>
                      <Progress value={results.eligibility} className="h-2" />
                      <p className="text-sm text-gray-600">{results.eligibility}% of recommended limit</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Loan to Value Ratio</span>
                        <span className="text-sm font-semibold">{results.loanToValue}%</span>
                      </div>
                      <Progress value={results.loanToValue} className="h-2" />
                      <p className="text-sm text-gray-600">
                        {results.loanToValue <= 80 ? "Good LTV ratio" : "High LTV ratio - consider higher down payment"}
                      </p>
                    </div>

                    {results.eligibility > 50 && (
                      <Alert>
                        <AlertDescription>
                          {results.eligibility > 90
                            ? "Your EMI is very high compared to your income. Consider a longer tenure or higher down payment."
                            : "Your EMI is manageable but consider optimizing for better financial health."}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Down Payment %:</span>
                        <span className="font-semibold">
                          {Math.round((inputs.downPayment / inputs.carPrice) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-semibold">{inputs.interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Tenure:</span>
                        <span className="font-semibold">{inputs.tenure} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing Fee:</span>
                        <span className="font-semibold">{formatCurrency(inputs.processingFee)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Complete Car Loan Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Types of Car Loans</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>New Car Loan:</strong> Lower interest rates (7-9%)
                      </li>
                      <li>
                        <strong>Used Car Loan:</strong> Higher rates (9-12%)
                      </li>
                      <li>
                        <strong>Certified Pre-owned:</strong> Moderate rates (8-10%)
                      </li>
                      <li>
                        <strong>Balloon Payment:</strong> Lower EMI, large final payment
                      </li>
                      <li>
                        <strong>Flexi Loan:</strong> Variable EMI options
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold">Interest Rate Factors</h3>
                    <ul className="space-y-2 text-sm">
                      <li>Credit score (750+ gets best rates)</li>
                      <li>Income stability and employment type</li>
                      <li>Car age and model</li>
                      <li>Down payment amount</li>
                      <li>Loan tenure</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Documentation Required</h3>
                    <ul className="space-y-2 text-sm">
                      <li>Identity proof (Aadhaar, PAN, Passport)</li>
                      <li>Address proof (Utility bills, Aadhaar)</li>
                      <li>Income proof (Salary slips, ITR, bank statements)</li>
                      <li>Employment proof (Offer letter, ID card)</li>
                      <li>Car quotation/proforma invoice</li>
                      <li>Bank statements (3-6 months)</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Tips for Better Rates</h3>
                    <ul className="space-y-2 text-sm">
                      <li>Maintain good credit score (750+)</li>
                      <li>Make higher down payment (25-30%)</li>
                      <li>Choose shorter tenure if affordable</li>
                      <li>Compare offers from multiple lenders</li>
                      <li>Consider manufacturer financing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eligibility" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Car Loan Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Age Requirements</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Minimum Age:</strong> 21 years
                      </li>
                      <li>
                        <strong>Maximum Age:</strong> 65 years (at loan maturity)
                      </li>
                      <li>
                        <strong>Salaried:</strong> 21-60 years
                      </li>
                      <li>
                        <strong>Self-employed:</strong> 25-65 years
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold">Income Requirements</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Minimum Salary:</strong> ₹15,000-25,000/month
                      </li>
                      <li>
                        <strong>Self-employed:</strong> ₹2-3 lakh annual income
                      </li>
                      <li>
                        <strong>EMI/Income Ratio:</strong> Maximum 50%
                      </li>
                      <li>
                        <strong>Work Experience:</strong> 2+ years
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Credit Score Impact</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-green-50 rounded">
                        <span>750+ (Excellent)</span>
                        <span className="font-semibold">Best rates, quick approval</span>
                      </div>
                      <div className="flex justify-between p-2 bg-blue-50 rounded">
                        <span>700-749 (Good)</span>
                        <span className="font-semibold">Good rates, standard process</span>
                      </div>
                      <div className="flex justify-between p-2 bg-yellow-50 rounded">
                        <span>650-699 (Fair)</span>
                        <span className="font-semibold">Higher rates, more scrutiny</span>
                      </div>
                      <div className="flex justify-between p-2 bg-red-50 rounded">
                        <span>Below 650 (Poor)</span>
                        <span className="font-semibold">Difficult approval, high rates</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold">Loan Amount Limits</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>New Car:</strong> Up to 90% of car value
                      </li>
                      <li>
                        <strong>Used Car:</strong> Up to 80% of car value
                      </li>
                      <li>
                        <strong>Maximum Amount:</strong> ₹50 lakh - 1 crore
                      </li>
                      <li>
                        <strong>Minimum Amount:</strong> ₹1 lakh
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">What is the maximum loan tenure for car loans?</h3>
                    <p className="text-sm text-gray-600">
                      Car loan tenure typically ranges from 1 to 7 years. New cars can get up to 7 years, while used
                      cars may be limited to 5 years depending on the car's age.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Can I prepay my car loan?</h3>
                    <p className="text-sm text-gray-600">
                      Yes, most lenders allow prepayment after 6-12 months. Some may charge a prepayment penalty of 2-5%
                      of the outstanding amount, while others offer free prepayment.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">What happens if I default on car loan payments?</h3>
                    <p className="text-sm text-gray-600">
                      Defaulting can lead to penalty charges, negative credit score impact, and eventually vehicle
                      repossession. It's important to communicate with your lender if facing difficulties.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is car loan interest tax deductible?</h3>
                    <p className="text-sm text-gray-600">
                      Car loan interest is not tax deductible for personal use. However, if the car is used for business
                      purposes, the interest may be claimed as a business expense.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">What is the difference between fixed and floating rates?</h3>
                    <p className="text-sm text-gray-600">
                      Fixed rates remain constant throughout the loan tenure, while floating rates change with market
                      conditions. Fixed rates offer certainty, while floating rates may be lower initially.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Can I transfer my car loan to another bank?</h3>
                    <p className="text-sm text-gray-600">
                      Yes, you can transfer your car loan to get better interest rates or service. This process is
                      called loan refinancing and may involve processing fees.
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

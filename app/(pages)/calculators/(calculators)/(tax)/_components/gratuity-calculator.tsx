"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Briefcase, Info, Lightbulb, BookOpen, AlertCircle, Award, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GratuityCalculator() {
  const [employeeType, setEmployeeType] = useState("private")
  const [lastSalary, setLastSalary] = useState("")
  const [serviceYears, setServiceYears] = useState("")
  const [serviceMonths, setServiceMonths] = useState("")
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = useState("26")

  const calculateGratuity = () => {
    const salary = Number.parseFloat(lastSalary) || 0
    const years = Number.parseInt(serviceYears) || 0
    const months = Number.parseInt(serviceMonths) || 0
    const workingDays = Number.parseInt(workingDaysPerMonth) || 26

    // Convert total service to years (including partial months)
    const totalServiceYears = years + months / 12

    // Round up partial years for gratuity calculation
    const gratuityYears = Math.ceil(totalServiceYears)

    let gratuityAmount = 0
    let dailyWage = 0
    let formula = ""

    if (employeeType === "government") {
      // Government employees: (Last drawn salary × 1/4 × completed years of service)
      gratuityAmount = salary * 0.25 * gratuityYears
      formula = "Last Salary × 1/4 × Service Years"
    } else {
      // Private sector: (15 × last drawn salary × completed years of service) / 26
      // For establishments with less than 10 employees, it's calculated differently
      dailyWage = salary / workingDays
      gratuityAmount = (15 * salary * gratuityYears) / workingDays
      formula = `(15 × Last Salary × Service Years) / ${workingDays}`
    }

    // Maximum gratuity limit (as per current rules)
    const maxGratuity = 2000000 // ₹20 lakh
    const finalGratuity = Math.min(gratuityAmount, maxGratuity)

    // Tax calculation
    const taxExemptLimit = 2000000 // ₹20 lakh is tax-free
    const taxableGratuity = Math.max(finalGratuity - taxExemptLimit, 0)

    return {
      gratuityAmount: finalGratuity,
      taxableAmount: taxableGratuity,
      taxFreeAmount: Math.min(finalGratuity, taxExemptLimit),
      totalServiceYears,
      gratuityYears,
      dailyWage,
      formula,
      isEligible: totalServiceYears >= 5 || employeeType === "government",
    }
  }

  const result = calculateGratuity()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const gratuityTerms = [
    {
      term: "Gratuity",
      definition:
        "A monetary benefit paid by employer to employee as a token of appreciation for services rendered. It's a retirement benefit under the Payment of Gratuity Act, 1972.",
    },
    {
      term: "Eligible Service",
      definition:
        "Minimum 5 years of continuous service required for gratuity eligibility in private sector. Government employees are eligible regardless of service period.",
    },
    {
      term: "Last Drawn Salary",
      definition:
        "Basic salary plus dearness allowance (if any) last drawn by the employee. Excludes overtime, bonus, commission, and other allowances.",
    },
    {
      term: "Completed Years of Service",
      definition:
        "Total years of continuous service. Any fraction of year exceeding 6 months is rounded up to the next year for gratuity calculation.",
    },
    {
      term: "Payment of Gratuity Act",
      definition:
        "Central legislation that governs gratuity payment in India. Applicable to establishments with 10 or more employees.",
    },
    {
      term: "Maximum Gratuity Limit",
      definition: "Current maximum gratuity amount is ₹20 lakh. This limit is revised periodically by the government.",
    },
    {
      term: "Tax Exemption",
      definition:
        "Gratuity up to ₹20 lakh is completely tax-free under Section 10(10) of Income Tax Act. Excess amount is taxable.",
    },
    {
      term: "Forfeiture of Gratuity",
      definition:
        "Gratuity can be forfeited partially or fully in case of misconduct, termination for cause, or damage to employer property.",
    },
    {
      term: "Nomination",
      definition:
        "Employee can nominate family members to receive gratuity in case of death during service. Nomination is mandatory.",
    },
    {
      term: "Continuous Service",
      definition:
        "Uninterrupted service with the same employer. Breaks due to illness, accident, or authorized leave don't affect continuity.",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Link href="/calculators">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculators
        </Button>
      </Link>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2">
          <Award className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Gratuity Calculator</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate your gratuity amount for both government and private sector employees with latest rules and tax
          implications
        </p>
      </motion.div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-100">
          <TabsTrigger value="calculator" className="flex items-center space-x-2">
            <Calculator className="h-4 w-4" />
            <span>Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Guide</span>
          </TabsTrigger>
          <TabsTrigger value="terms" className="flex items-center space-x-2">
            <Info className="h-4 w-4" />
            <span>Terms</span>
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4" />
            <span>Tips</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Employment Details</span>
                </CardTitle>
                <CardDescription>Enter your employment details to calculate gratuity amount</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Employee Type</Label>
                  <Select value={employeeType} onValueChange={setEmployeeType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private Sector</SelectItem>
                      <SelectItem value="government">Government Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Last Drawn Salary (Monthly) (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter last drawn salary"
                    value={lastSalary}
                    onChange={(e) => setLastSalary(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-slate-500">
                    Basic salary + Dearness Allowance (excluding overtime, bonus, etc.)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Service Years</Label>
                    <Input
                      type="number"
                      placeholder="Years"
                      value={serviceYears}
                      onChange={(e) => setServiceYears(e.target.value)}
                      min="0"
                      max="50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Months</Label>
                    <Input
                      type="number"
                      placeholder="Months"
                      value={serviceMonths}
                      onChange={(e) => setServiceMonths(e.target.value)}
                      min="0"
                      max="11"
                    />
                  </div>
                </div>

                {employeeType === "private" && (
                  <div className="space-y-2">
                    <Label>Working Days per Month</Label>
                    <Select value={workingDaysPerMonth} onValueChange={setWorkingDaysPerMonth}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="26">26 days (Standard)</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="24">24 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Eligibility Status</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {result.isEligible ? (
                      <span className="text-green-600 font-medium">✓ Eligible for gratuity</span>
                    ) : (
                      <span className="text-red-600 font-medium">✗ Minimum 5 years service required</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span>Gratuity Calculation</span>
                </CardTitle>
                <CardDescription>Your gratuity amount and tax implications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.isEligible ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-3">Calculation Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Service:</span>
                          <span className="font-medium">{result.totalServiceYears.toFixed(1)} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gratuity Years:</span>
                          <span className="font-medium">{result.gratuityYears} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Formula:</span>
                          <span className="font-medium text-xs">{result.formula}</span>
                        </div>
                        {employeeType === "private" && (
                          <div className="flex justify-between">
                            <span>Daily Wage:</span>
                            <span className="font-medium">{formatCurrency(result.dailyWage)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-green-800">Total Gratuity Amount</span>
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(result.gratuityAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-yellow-50 p-3 rounded">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-yellow-800">Tax-Free Amount</span>
                          <span className="font-semibold text-yellow-600">{formatCurrency(result.taxFreeAmount)}</span>
                        </div>
                      </div>

                      {result.taxableAmount > 0 && (
                        <div className="bg-red-50 p-3 rounded">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-red-800">Taxable Amount</span>
                            <span className="font-semibold text-red-600">{formatCurrency(result.taxableAmount)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                      <h4 className="font-semibold text-slate-800 mb-2">Key Information</h4>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>• Maximum gratuity limit: ₹20,00,000</p>
                        <p>• Tax exemption: Up to ₹20,00,000</p>
                        <p>• Employee type: {employeeType === "private" ? "Private Sector" : "Government"}</p>
                        {employeeType === "private" && (
                          <p>• Working days considered: {workingDaysPerMonth} days/month</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Not Eligible</h3>
                    <p className="text-slate-600">
                      Minimum 5 years of continuous service required for gratuity eligibility in private sector.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This calculator provides estimates based on current gratuity rules. Actual amount may vary based on
              company policy and specific circumstances.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gratuity Calculation Guide</CardTitle>
              <CardDescription>Understanding gratuity rules and calculation methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">Private Sector Formula</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Formula:</p>
                    <div className="bg-white p-3 rounded border font-mono text-xs">
                      (15 × Last Salary × Service Years) ÷ Working Days per Month
                    </div>
                    <p className="text-slate-600 mt-2">
                      Standard working days per month is 26. Some organizations use 30 days.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Government Formula</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Formula:</p>
                    <div className="bg-white p-3 rounded border font-mono text-xs">
                      Last Salary × 1/4 × Service Years
                    </div>
                    <p className="text-slate-600 mt-2">
                      Government employees get 1/4th of last salary for each completed year of service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-3">Eligibility Criteria</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Private Sector</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Minimum 5 years continuous service</li>
                      <li>• Applicable to establishments with 10+ employees</li>
                      <li>• Death or disability: No minimum service required</li>
                      <li>• Resignation: 5 years service mandatory</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Government Sector</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>• No minimum service period required</li>
                      <li>• Available from first day of service</li>
                      <li>• Higher calculation rate (1/4 vs 15/26)</li>
                      <li>• Different rules for different categories</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-3">Important Rules</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Service Calculation</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Fraction of year &gt; 6 months = 1 year</li>
                      <li>• Fraction of year ≤ 6 months = ignored</li>
                      <li>• Continuous service with same employer</li>
                      <li>• Authorized leave doesn't break continuity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Payment Timeline</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Must be paid within 30 days</li>
                      <li>• Interest applicable on delayed payment</li>
                      <li>• Can be paid in installments if agreed</li>
                      <li>• Nominee receives in case of death</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gratuity Terms & Definitions</CardTitle>
              <CardDescription>Essential gratuity terminology explained</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {gratuityTerms.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left">
                      <span className="font-medium">{item.term}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600">{item.definition}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gratuity Management Tips</CardTitle>
              <CardDescription>Expert advice for employees and employers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">For Employees</h3>
                    <p className="text-sm text-slate-600">
                      Maintain proper service records and ensure continuous service. Submit nomination form to HR for
                      family protection.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Documentation</h3>
                    <p className="text-sm text-slate-600">
                      Keep copies of appointment letter, salary certificates, and service records. These are crucial for
                      gratuity calculation.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Tax Planning</h3>
                    <p className="text-sm text-slate-600">
                      Gratuity up to ₹20 lakh is tax-free. Plan other retirement benefits to optimize overall tax
                      liability.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Claim Process</h3>
                    <p className="text-sm text-slate-600">
                      Submit gratuity application within prescribed time. Follow up with HR for timely processing and
                      payment.
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Avoid Forfeiture</h3>
                    <p className="text-sm text-slate-600">
                      Maintain good conduct and avoid misconduct that may lead to gratuity forfeiture. Follow company
                      policies strictly.
                    </p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-teal-800 mb-2">Know Your Rights</h3>
                    <p className="text-sm text-slate-600">
                      Understand company gratuity policy and Payment of Gratuity Act provisions. Seek legal advice if
                      payment is denied.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calculator, IndianRupee, PieChart, BookOpen, TrendingUp, Wallet, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SalaryBreakdown {
  grossSalary: number
  basicSalary: number
  hra: number
  specialAllowance: number
  pf: number
  esi: number
  professionalTax: number
  incomeTax: number
  totalDeductions: number
  netSalary: number
  ctc: number
  employerPf: number
  employerEsi: number
  gratuity: number
  totalEmployerContribution: number
}

export function SalaryCalculator() {
  const [ctc, setCtc] = useState("")
  const [city, setCity] = useState("metro")
  const [age, setAge] = useState("below60")
  const [pfApplicable, setPfApplicable] = useState(true)
  const [esiApplicable, setEsiApplicable] = useState(true)
  const [professionalTaxApplicable, setProfessionalTaxApplicable] = useState(true)
  const [taxRegime, setTaxRegime] = useState("new")
  const [standardDeduction, setStandardDeduction] = useState("50000")
  const [section80C, setSection80C] = useState("")
  const [section80D, setSection80D] = useState("")
  const [hraReceived, setHraReceived] = useState("")
  const [rentPaid, setRentPaid] = useState("")

  const [breakdown, setBreakdown] = useState<SalaryBreakdown>({
    grossSalary: 0,
    basicSalary: 0,
    hra: 0,
    specialAllowance: 0,
    pf: 0,
    esi: 0,
    professionalTax: 0,
    incomeTax: 0,
    totalDeductions: 0,
    netSalary: 0,
    ctc: 0,
    employerPf: 0,
    employerEsi: 0,
    gratuity: 0,
    totalEmployerContribution: 0,
  })

  useEffect(() => {
    calculateSalary()
  }, [
    ctc,
    city,
    age,
    pfApplicable,
    esiApplicable,
    professionalTaxApplicable,
    taxRegime,
    standardDeduction,
    section80C,
    section80D,
    hraReceived,
    rentPaid,
  ])

  const calculateSalary = () => {
    if (!ctc || isNaN(Number(ctc))) {
      setBreakdown({
        grossSalary: 0,
        basicSalary: 0,
        hra: 0,
        specialAllowance: 0,
        pf: 0,
        esi: 0,
        professionalTax: 0,
        incomeTax: 0,
        totalDeductions: 0,
        netSalary: 0,
        ctc: 0,
        employerPf: 0,
        employerEsi: 0,
        gratuity: 0,
        totalEmployerContribution: 0,
      })
      return
    }

    const annualCtc = Number(ctc)

    // Calculate employer contributions first
    const gratuity = annualCtc * 0.0481 // 4.81% of CTC
    const employerPf = Math.min(annualCtc * 0.4 * 0.12, 21600) // 12% of basic, max 1800/month
    const employerEsi = annualCtc <= 250000 ? annualCtc * 0.0325 : 0 // 3.25% if salary <= 25k/month
    const totalEmployerContribution = gratuity + employerPf + employerEsi

    // Calculate gross salary (CTC - employer contributions)
    const grossSalary = annualCtc - totalEmployerContribution

    // Salary structure
    const basicSalary = grossSalary * 0.4 // 40% of gross
    const hra = grossSalary * 0.5 // 50% of gross
    const specialAllowance = grossSalary * 0.1 // 10% of gross

    // Employee deductions
    let pf = 0
    let esi = 0
    let professionalTax = 0

    if (pfApplicable) {
      pf = Math.min(basicSalary * 0.12, 21600) // 12% of basic, max 1800/month
    }

    if (esiApplicable && grossSalary <= 250000) {
      esi = grossSalary * 0.0175 // 1.75% if salary <= 25k/month
    }

    if (professionalTaxApplicable) {
      const monthlyGross = grossSalary / 12
      if (monthlyGross > 15000) {
        professionalTax = 2400 // Rs 200/month
      } else if (monthlyGross > 10000) {
        professionalTax = 1800 // Rs 150/month
      }
    }

    // Calculate taxable income
    let taxableIncome = grossSalary

    // HRA exemption
    if (hraReceived && rentPaid) {
      const hraReceivedAmount = Number(hraReceived)
      const rentPaidAmount = Number(rentPaid)
      const hraExemption = Math.min(
        hraReceivedAmount,
        rentPaidAmount - basicSalary * 0.1,
        basicSalary * (city === "metro" ? 0.5 : 0.4),
      )
      taxableIncome -= Math.max(0, hraExemption)
    }

    // Standard deduction
    taxableIncome -= Number(standardDeduction)

    // Deductions under old regime
    if (taxRegime === "old") {
      if (section80C) {
        taxableIncome -= Math.min(Number(section80C), 150000)
      }
      if (section80D) {
        const maxDeduction = age === "senior" ? 50000 : 25000
        taxableIncome -= Math.min(Number(section80D), maxDeduction)
      }
    }

    // Calculate income tax
    let incomeTax = 0
    if (taxableIncome > 0) {
      if (taxRegime === "new") {
        // New tax regime rates (AY 2024-25) - Correct Rates
        if (taxableIncome > 300000) {
          incomeTax += Math.min(taxableIncome - 300000, 400000) * 0.05 // 3L to 7L
        }
        if (taxableIncome > 700000) {
          incomeTax += Math.min(taxableIncome - 700000, 300000) * 0.10 // 7L to 10L
        }
        if (taxableIncome > 1000000) {
          incomeTax += Math.min(taxableIncome - 1000000, 200000) * 0.15 // 10L to 12L
        }
        if (taxableIncome > 1200000) {
          incomeTax += Math.min(taxableIncome - 1200000, 300000) * 0.20 // 12L to 15L
        }
        if (taxableIncome > 1500000) {
          incomeTax += (taxableIncome - 1500000) * 0.30 // Above 15L
        }
      } else {
        // Old tax regime rates
        if (taxableIncome > 250000) {
          incomeTax += Math.min(taxableIncome - 250000, 250000) * 0.05
        }
        if (taxableIncome > 500000) {
          incomeTax += Math.min(taxableIncome - 500000, 500000) * 0.2
        }
        if (taxableIncome > 1000000) {
          incomeTax += (taxableIncome - 1000000) * 0.3
        }
      }

      // Section 87A rebate
      if (taxableIncome <= 500000 && taxRegime === "new") {
        incomeTax = Math.max(0, incomeTax - 25000)
      } else if (taxableIncome <= 500000 && taxRegime === "old") {
        incomeTax = Math.max(0, incomeTax - 12500)
      }

      // Health and education cess
      incomeTax *= 1.04
    }

    const totalDeductions = pf + esi + professionalTax + incomeTax
    const netSalary = grossSalary - totalDeductions

    setBreakdown({
      grossSalary,
      basicSalary,
      hra,
      specialAllowance,
      pf,
      esi,
      professionalTax,
      incomeTax,
      totalDeductions,
      netSalary,
      ctc: annualCtc,
      employerPf,
      employerEsi,
      gratuity,
      totalEmployerContribution,
    })
  }

  const monthlyBreakdown = {
    grossSalary: breakdown.grossSalary / 12,
    basicSalary: breakdown.basicSalary / 12,
    hra: breakdown.hra / 12,
    specialAllowance: breakdown.specialAllowance / 12,
    pf: breakdown.pf / 12,
    esi: breakdown.esi / 12,
    professionalTax: breakdown.professionalTax / 12,
    incomeTax: breakdown.incomeTax / 12,
    totalDeductions: breakdown.totalDeductions / 12,
    netSalary: breakdown.netSalary / 12,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/business-calculators">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculators
        </Button>
      </Link>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-600 rounded-full">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Salary Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your take-home salary with detailed breakdown of all deductions and employer contributions
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="comparison">Tax Comparison</TabsTrigger>
            <TabsTrigger value="guide">Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Salary Details
                  </CardTitle>
                  <CardDescription>Enter your salary details to calculate take-home pay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ctc">Annual CTC (₹)</Label>
                    <Input
                      id="ctc"
                      type="number"
                      placeholder="Enter annual CTC"
                      value={ctc}
                      onChange={(e) => setCtc(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City Type</Label>
                      <Select value={city} onValueChange={setCity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metro">Metro City</SelectItem>
                          <SelectItem value="non-metro">Non-Metro City</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Age Category</Label>
                      <Select value={age} onValueChange={setAge}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="below60">Below 60 years</SelectItem>
                          <SelectItem value="senior">60+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tax Regime</Label>
                    <Select value={taxRegime} onValueChange={setTaxRegime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Tax Regime</SelectItem>
                        <SelectItem value="old">Old Tax Regime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Applicable Deductions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pf">Provident Fund (PF)</Label>
                        <Switch id="pf" checked={pfApplicable} onCheckedChange={setPfApplicable} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="esi">Employee State Insurance (ESI)</Label>
                        <Switch id="esi" checked={esiApplicable} onCheckedChange={setEsiApplicable} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pt">Professional Tax</Label>
                        <Switch
                          id="pt"
                          checked={professionalTaxApplicable}
                          onCheckedChange={setProfessionalTaxApplicable}
                        />
                      </div>
                    </div>
                  </div>

                  {taxRegime === "old" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Tax Deductions (Old Regime)</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="section80c">Section 80C (₹)</Label>
                          <Input
                            id="section80c"
                            type="number"
                            placeholder="Max ₹1,50,000"
                            value={section80C}
                            onChange={(e) => setSection80C(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="section80d">Section 80D (₹)</Label>
                          <Input
                            id="section80d"
                            type="number"
                            placeholder="Health insurance premium"
                            value={section80D}
                            onChange={(e) => setSection80D(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="font-semibold">HRA Details (Optional)</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="hra-received">HRA Received (₹)</Label>
                        <Input
                          id="hra-received"
                          type="number"
                          placeholder="Annual HRA"
                          value={hraReceived}
                          onChange={(e) => setHraReceived(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rent-paid">Rent Paid (₹)</Label>
                        <Input
                          id="rent-paid"
                          type="number"
                          placeholder="Annual rent"
                          value={rentPaid}
                          onChange={(e) => setRentPaid(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    Salary Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ctc ? (
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          ₹{monthlyBreakdown.netSalary.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-lg text-gray-700">Monthly Take-Home</div>
                        <div className="text-sm text-gray-500 mt-1">
                          ₹{breakdown.netSalary.toLocaleString("en-IN", { maximumFractionDigits: 0 })} annually
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">
                            ₹{monthlyBreakdown.grossSalary.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                          </div>
                          <div className="text-sm text-gray-600">Monthly Gross</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-xl font-bold text-red-600">
                            ₹{monthlyBreakdown.totalDeductions.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                          </div>
                          <div className="text-sm text-gray-600">Total Deductions</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Monthly Breakdown</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Basic Salary</span>
                            <span className="font-medium">
                              ₹{monthlyBreakdown.basicSalary.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">HRA</span>
                            <span className="font-medium">
                              ₹{monthlyBreakdown.hra.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Special Allowance</span>
                            <span className="font-medium">
                              ₹{monthlyBreakdown.specialAllowance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Monthly Deductions</h4>
                        <div className="space-y-2">
                          {pfApplicable && (
                            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                              <span className="text-sm">Provident Fund</span>
                              <span className="font-medium text-red-600">
                                -₹{monthlyBreakdown.pf.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          )}
                          {esiApplicable && breakdown.esi > 0 && (
                            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                              <span className="text-sm">ESI</span>
                              <span className="font-medium text-red-600">
                                -₹{monthlyBreakdown.esi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          )}
                          {professionalTaxApplicable && breakdown.professionalTax > 0 && (
                            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                              <span className="text-sm">Professional Tax</span>
                              <span className="font-medium text-red-600">
                                -₹
                                {monthlyBreakdown.professionalTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                            <span className="text-sm">Income Tax</span>
                            <span className="font-medium text-red-600">
                              -₹{monthlyBreakdown.incomeTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Tax Regime: {taxRegime === "new" ? "New" : "Old"}</h4>
                        <p className="text-sm text-gray-600">
                          {taxRegime === "new"
                            ? "Using new tax regime with standard deduction of ₹50,000"
                            : "Using old tax regime with available deductions"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter your CTC to see salary breakdown</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="breakdown">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Annual Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ctc ? (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-600">Income Components</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                            <span>Cost to Company (CTC)</span>
                            <span className="font-bold">₹{breakdown.ctc.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 border-l-4 border-green-500 pl-4">
                            <span className="text-sm">Basic Salary</span>
                            <span>₹{breakdown.basicSalary.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 border-l-4 border-green-500 pl-4">
                            <span className="text-sm">HRA</span>
                            <span>₹{breakdown.hra.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 border-l-4 border-green-500 pl-4">
                            <span className="text-sm">Special Allowance</span>
                            <span>₹{breakdown.specialAllowance.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-100 rounded font-medium">
                            <span>Gross Salary</span>
                            <span>₹{breakdown.grossSalary.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-red-600">Employee Deductions</h4>
                        <div className="space-y-2">
                          {pfApplicable && (
                            <div className="flex justify-between items-center p-2 border-l-4 border-red-500 pl-4">
                              <span className="text-sm">Provident Fund (12%)</span>
                              <span className="text-red-600">-₹{breakdown.pf.toLocaleString("en-IN")}</span>
                            </div>
                          )}
                          {esiApplicable && breakdown.esi > 0 && (
                            <div className="flex justify-between items-center p-2 border-l-4 border-red-500 pl-4">
                              <span className="text-sm">ESI (1.75%)</span>
                              <span className="text-red-600">-₹{breakdown.esi.toLocaleString("en-IN")}</span>
                            </div>
                          )}
                          {professionalTaxApplicable && breakdown.professionalTax > 0 && (
                            <div className="flex justify-between items-center p-2 border-l-4 border-red-500 pl-4">
                              <span className="text-sm">Professional Tax</span>
                              <span className="text-red-600">
                                -₹{breakdown.professionalTax.toLocaleString("en-IN")}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center p-2 border-l-4 border-red-500 pl-4">
                            <span className="text-sm">Income Tax</span>
                            <span className="text-red-600">-₹{breakdown.incomeTax.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-red-100 rounded font-medium">
                            <span>Total Deductions</span>
                            <span className="text-red-600">-₹{breakdown.totalDeductions.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Net Take-Home</span>
                          <span className="text-2xl font-bold text-blue-600">
                            ₹{breakdown.netSalary.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter CTC to see detailed breakdown</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Employer Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  {ctc ? (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-blue-600">Employer Costs</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 border-l-4 border-blue-500 pl-4">
                            <span className="text-sm">Employer PF (12%)</span>
                            <span>₹{breakdown.employerPf.toLocaleString("en-IN")}</span>
                          </div>
                          {breakdown.employerEsi > 0 && (
                            <div className="flex justify-between items-center p-2 border-l-4 border-blue-500 pl-4">
                              <span className="text-sm">Employer ESI (3.25%)</span>
                              <span>₹{breakdown.employerEsi.toLocaleString("en-IN")}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center p-2 border-l-4 border-blue-500 pl-4">
                            <span className="text-sm">Gratuity (4.81%)</span>
                            <span>₹{breakdown.gratuity.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-100 rounded font-medium">
                            <span>Total Employer Cost</span>
                            <span>
                              ₹{(breakdown.ctc + breakdown.totalEmployerContribution).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <TrendingUp className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Total Cost to Company:</strong> Your actual cost to the employer is ₹
                          {(breakdown.ctc + breakdown.totalEmployerContribution).toLocaleString("en-IN")} annually,
                          which includes statutory contributions.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Salary Efficiency</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Take-home %</span>
                            <span className="font-medium">
                              {((breakdown.netSalary / breakdown.ctc) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Tax Rate</span>
                            <span className="font-medium">
                              {((breakdown.incomeTax / breakdown.grossSalary) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Total Deduction %</span>
                            <span className="font-medium">
                              {((breakdown.totalDeductions / breakdown.grossSalary) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter CTC to see employer contributions</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Tax Regime Comparison</CardTitle>
                <CardDescription>Compare old vs new tax regime to choose the best option</CardDescription>
              </CardHeader>
              <CardContent>
                {ctc ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-blue-600">New Tax Regime</h3>
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          • No deductions except standard deduction • Lower tax rates • Simplified calculation
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Tax Slabs:</span>
                          </div>
                          <div className="text-xs space-y-1 pl-4">
                            <div>₹0 - ₹3L: 0%</div>
                            <div>₹3L - ₹7L: 5%</div>
                            <div>₹7L - ₹10L: 10%</div>
                            <div>₹10L - ₹12L: 15%</div>
                            <div>₹12L - ₹15L: 20%</div>
                            <div>Above ₹15L: 30%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-green-600">Old Tax Regime</h3>
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          • Multiple deductions available • Higher tax rates • Complex calculation
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Tax Slabs:</span>
                          </div>
                          <div className="text-xs space-y-1 pl-4">
                            <div>₹0 - ₹2.5L: 0%</div>
                            <div>₹2.5L - ₹5L: 5%</div>
                            <div>₹5L - ₹10L: 20%</div>
                            <div>Above ₹10L: 30%</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">Available Deductions:</div>
                          <div className="text-xs space-y-1 pl-4">
                            <div>• Section 80C: ₹1.5L</div>
                            <div>• Section 80D: ₹25K-50K</div>
                            <div>• HRA exemption</div>
                            <div>• LTA exemption</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold mb-3">Recommendation</h4>
                      <p className="text-sm text-gray-700">
                        {taxRegime === "new"
                          ? "You're currently using the New Tax Regime. This is generally beneficial for those with minimal deductions."
                          : "You're currently using the Old Tax Regime. This may be beneficial if you have significant deductions under Section 80C, 80D, HRA, etc."}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        Consider switching regimes based on your deduction eligibility and tax liability comparison.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter CTC to see tax regime comparison</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Salary Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Basic Salary</h4>
                    <p className="text-sm text-gray-600">
                      Usually 40-50% of CTC. Forms the base for PF, gratuity, and bonus calculations.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">House Rent Allowance (HRA)</h4>
                    <p className="text-sm text-gray-600">
                      Tax-exempt allowance for rent. Exemption is minimum of actual HRA, rent paid minus 10% of basic,
                      or 50%/40% of basic for metro/non-metro cities.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Special Allowance</h4>
                    <p className="text-sm text-gray-600">
                      Fully taxable component that makes up the remaining salary after basic and HRA.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statutory Deductions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Provident Fund (PF)</h4>
                    <p className="text-sm text-gray-600">
                      12% of basic salary (max ₹1,800/month). Both employee and employer contribute equally.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Employee State Insurance (ESI)</h4>
                    <p className="text-sm text-gray-600">
                      Applicable if salary ≤ ₹25,000/month. Employee: 1.75%, Employer: 3.25%.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Professional Tax</h4>
                    <p className="text-sm text-gray-600">
                      State-specific tax. Usually ₹150-200/month for salaries above ₹10,000/month.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Planning Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Choose Right Tax Regime</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• New regime: Better for minimal deductions</li>
                      <li>• Old regime: Better with significant deductions</li>
                      <li>• Calculate both scenarios annually</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Maximize Deductions (Old Regime)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Section 80C: ELSS, PPF, NSC (₹1.5L)</li>
                      <li>• Section 80D: Health insurance (₹25K-50K)</li>
                      <li>• HRA: Keep rent receipts</li>
                      <li>• LTA: Plan travel expenses</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salary Negotiation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">CTC vs Take-Home</h4>
                    <p className="text-sm text-gray-600">
                      Understand the difference between CTC and actual take-home salary. Factor in all deductions and
                      employer contributions.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Salary Structure Optimization</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Request tax-friendly allowances</li>
                      <li>• Optimize basic vs allowances ratio</li>
                      <li>• Consider flexible benefits</li>
                      <li>• Negotiate reimbursements</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

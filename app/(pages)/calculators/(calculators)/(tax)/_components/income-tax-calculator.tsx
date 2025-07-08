"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Receipt, Info, Lightbulb, BookOpen, AlertCircle, TrendingDown, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function IncomeTaxCalculator() {
  const [taxRegime, setTaxRegime] = useState("new")
  const [age, setAge] = useState("below-60")
  const [basicSalary, setBasicSalary] = useState("")
  const [hra, setHra] = useState("")
  const [otherAllowances, setOtherAllowances] = useState("")
  const [bonus, setBonus] = useState("")
  const [otherIncome, setOtherIncome] = useState("")

  // Deductions (Old Regime)
  const [section80C, setSection80C] = useState("")
  const [section80D, setSection80D] = useState("")
  const [hraExemption, setHraExemption] = useState("")
  const [ltaExemption, setLtaExemption] = useState("")
  const [section80G, setSection80G] = useState("")
  const [section80E, setSection80E] = useState("")

  const calculateTax = () => {
    const basic = Number.parseFloat(basicSalary) || 0
    const hraAmount = Number.parseFloat(hra) || 0
    const allowances = Number.parseFloat(otherAllowances) || 0
    const bonusAmount = Number.parseFloat(bonus) || 0
    const other = Number.parseFloat(otherIncome) || 0

    const grossIncome = basic + hraAmount + allowances + bonusAmount + other

    const standardDeduction = 50000 // Standard deduction for salaried individuals
    let totalDeductions = standardDeduction

    if (taxRegime === "old") {
      const deduction80C = Math.min(Number.parseFloat(section80C) || 0, 150000)
      const deduction80D = Number.parseFloat(section80D) || 0
      const hraEx = Number.parseFloat(hraExemption) || 0
      const ltaEx = Number.parseFloat(ltaExemption) || 0
      const deduction80G = Number.parseFloat(section80G) || 0
      const deduction80E = Number.parseFloat(section80E) || 0

      totalDeductions += deduction80C + deduction80D + hraEx + ltaEx + deduction80G + deduction80E
    }

    const taxableIncome = Math.max(grossIncome - totalDeductions, 0)

    // Tax calculation based on regime and age
    let tax = 0
    let exemptionLimit = 250000

    if (age === "60-80") exemptionLimit = 300000
    if (age === "above-80") exemptionLimit = 500000

    if (taxRegime === "new") {
      // New Tax Regime Slabs (FY 2024-25)
      if (taxableIncome > 300000) tax += Math.min(taxableIncome - 300000, 300000) * 0.05
      if (taxableIncome > 600000) tax += Math.min(taxableIncome - 600000, 300000) * 0.1
      if (taxableIncome > 900000) tax += Math.min(taxableIncome - 900000, 300000) * 0.15
      if (taxableIncome > 1200000) tax += Math.min(taxableIncome - 1200000, 300000) * 0.2
      if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.3
    } else {
      // Old Tax Regime Slabs
      if (taxableIncome > exemptionLimit) {
        tax += Math.min(taxableIncome - exemptionLimit, 250000) * 0.05
      }
      if (taxableIncome > exemptionLimit + 250000) {
        tax += Math.min(taxableIncome - exemptionLimit - 250000, 500000) * 0.2
      }
      if (taxableIncome > exemptionLimit + 750000) {
        tax += (taxableIncome - exemptionLimit - 750000) * 0.3
      }
    }

    // Health and Education Cess (4%)
    const cess = tax * 0.04
    const totalTax = tax + cess

    // Rebate under Section 87A (for new regime)
    let rebate = 0
    if (taxRegime === "new" && taxableIncome <= 700000) {
      rebate = Math.min(totalTax, 25000)
    } else if (taxRegime === "old" && taxableIncome <= 500000) {
      rebate = Math.min(totalTax, 12500)
    }

    const finalTax = Math.max(totalTax - rebate, 0)
    const netSalary = grossIncome - finalTax

    return {
      grossIncome,
      totalDeductions,
      taxableIncome,
      tax,
      cess,
      totalTax,
      rebate,
      finalTax,
      netSalary,
      effectiveRate: grossIncome > 0 ? (finalTax / grossIncome) * 100 : 0,
    }
  }

  const result = calculateTax()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const taxTerms = [
    {
      term: "Gross Total Income",
      definition:
        "Total income from all sources before any deductions, including salary, house property, business income, capital gains, and other sources.",
    },
    {
      term: "Taxable Income",
      definition:
        "Income on which tax is calculated after deducting all eligible deductions and exemptions from gross total income.",
    },
    {
      term: "Section 80C",
      definition:
        "Deduction up to ₹1.5 lakh for investments in PPF, ELSS, life insurance premiums, home loan principal, etc.",
    },
    {
      term: "Section 80D",
      definition:
        "Deduction for health insurance premiums - up to ₹25,000 for self/family, additional ₹25,000 for parents (₹50,000 if senior citizen).",
    },
    {
      term: "Standard Deduction",
      definition: "Fixed deduction of ₹50,000 available to all salaried individuals without any investment or expense.",
    },
    {
      term: "HRA Exemption",
      definition:
        "House Rent Allowance exemption calculated as minimum of: actual HRA, 50%/40% of basic salary, or rent paid minus 10% of basic salary.",
    },
    {
      term: "Section 87A Rebate",
      definition:
        "Tax rebate available for individuals with taxable income up to ₹5 lakh (old regime) or ₹7 lakh (new regime).",
    },
    {
      term: "Health and Education Cess",
      definition: "Additional 4% cess on income tax and surcharge to fund health and education initiatives.",
    },
    {
      term: "Old vs New Tax Regime",
      definition:
        "Old regime allows deductions but has higher tax rates. New regime has lower rates but limited deductions.",
    },
    {
      term: "Effective Tax Rate",
      definition: "Actual percentage of total income paid as tax, calculated as total tax divided by gross income.",
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2">
          <Receipt className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Income Tax Calculator</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate your income tax liability for FY 2024-25 with support for both old and new tax regimes
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Calculator className="h-5 w-5 text-blue-600" />
                      <span>Income Details</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="tax-regime" className="text-sm">
                        New Regime
                      </Label>
                      <Switch
                        id="tax-regime"
                        checked={taxRegime === "old"}
                        onCheckedChange={(checked) => setTaxRegime(checked ? "old" : "new")}
                      />
                      <Label htmlFor="tax-regime" className="text-sm">
                        Old Regime
                      </Label>
                    </div>
                  </CardTitle>
                  <CardDescription>Enter your income details and select tax regime</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Age Group</Label>
                      <Select value={age} onValueChange={setAge}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="below-60">Below 60 years</SelectItem>
                          <SelectItem value="60-80">60-80 years (Senior Citizen)</SelectItem>
                          <SelectItem value="above-80">Above 80 years (Super Senior)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Basic Salary (₹)</Label>
                      <Input
                        type="number"
                        placeholder="Enter basic salary"
                        value={basicSalary}
                        onChange={(e) => setBasicSalary(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>HRA Received (₹)</Label>
                      <Input
                        type="number"
                        placeholder="House Rent Allowance"
                        value={hra}
                        onChange={(e) => setHra(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Other Allowances (₹)</Label>
                      <Input
                        type="number"
                        placeholder="Special allowances, etc."
                        value={otherAllowances}
                        onChange={(e) => setOtherAllowances(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bonus & Incentives (₹)</Label>
                      <Input
                        type="number"
                        placeholder="Annual bonus"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Other Income (₹)</Label>
                      <Input
                        type="number"
                        placeholder="Interest, dividends, etc."
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {taxRegime === "old" && (
                <Card className="border-2 border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingDown className="h-5 w-5 text-green-600" />
                      <span>Deductions (Old Regime)</span>
                    </CardTitle>
                    <CardDescription>Enter your eligible deductions and exemptions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Section 80C (₹)</Label>
                        <Input
                          type="number"
                          placeholder="Max ₹1,50,000"
                          value={section80C}
                          onChange={(e) => setSection80C(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Section 80D (₹)</Label>
                        <Input
                          type="number"
                          placeholder="Health insurance"
                          value={section80D}
                          onChange={(e) => setSection80D(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>HRA Exemption (₹)</Label>
                        <Input
                          type="number"
                          placeholder="HRA exemption amount"
                          value={hraExemption}
                          onChange={(e) => setHraExemption(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>LTA Exemption (₹)</Label>
                        <Input
                          type="number"
                          placeholder="Leave travel allowance"
                          value={ltaExemption}
                          onChange={(e) => setLtaExemption(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Section 80G (₹)</Label>
                        <Input
                          type="number"
                          placeholder="Donations"
                          value={section80G}
                          onChange={(e) => setSection80G(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Section 80E (₹)</Label>
                        <Input
                          type="number"
                          placeholder="Education loan interest"
                          value={section80E}
                          onChange={(e) => setSection80E(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Section */}
            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Receipt className="h-5 w-5 text-green-600" />
                  <span>Tax Calculation</span>
                </CardTitle>
                <CardDescription>Your tax liability breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="text-sm text-slate-600">Gross Income</span>
                    <span className="font-semibold">{formatCurrency(result.grossIncome)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="text-sm text-slate-600">Total Deductions</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(result.totalDeductions)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span className="text-sm text-slate-600">Taxable Income</span>
                    <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="text-sm text-slate-600">Income Tax</span>
                    <span className="font-semibold text-red-600">{formatCurrency(result.tax)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="text-sm text-slate-600">Health & Education Cess</span>
                    <span className="font-semibold text-red-600">{formatCurrency(result.cess)}</span>
                  </div>

                  {result.rebate > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="text-sm text-slate-600">Section 87A Rebate</span>
                      <span className="font-semibold text-green-600">-{formatCurrency(result.rebate)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center p-4 bg-slate-100 rounded-lg border-2">
                    <span className="font-medium">Total Tax Liability</span>
                    <span className="text-xl font-bold text-red-600">{formatCurrency(result.finalTax)}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2">
                    <span className="font-medium">Net Take-Home</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency(result.netSalary)}</span>
                  </div>

                  <div className="text-center p-3 bg-blue-50 rounded">
                    <span className="text-sm text-slate-600">Effective Tax Rate</span>
                    <div className="text-lg font-bold text-blue-600">{result.effectiveRate.toFixed(2)}%</div>
                  </div>
                </div>

                <Badge variant="outline" className="w-full justify-center">
                  {taxRegime === "new" ? "New Tax Regime" : "Old Tax Regime"}
                </Badge>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This calculator provides estimates based on current tax laws for FY 2024-25. Please consult a tax
              professional for accurate tax planning and filing.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Tax Calculation Guide</CardTitle>
              <CardDescription>Understanding tax calculation process and regimes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">New Tax Regime (Default)</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Tax Slabs (FY 2024-25):</p>
                    <ul className="space-y-1 text-slate-600">
                      <li>• Up to ₹3,00,000: Nil</li>
                      <li>• ₹3,00,001 - ₹6,00,000: 5%</li>
                      <li>• ₹6,00,001 - ₹9,00,000: 10%</li>
                      <li>• ₹9,00,001 - ₹12,00,000: 15%</li>
                      <li>• ₹12,00,001 - ₹15,00,000: 20%</li>
                      <li>• Above ₹15,00,000: 30%</li>
                    </ul>
                    <p className="text-xs text-slate-500 mt-2">Rebate: Up to ₹25,000 if income ≤ ₹7,00,000</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Old Tax Regime</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Tax Slabs:</p>
                    <ul className="space-y-1 text-slate-600">
                      <li>• Up to ₹2,50,000: Nil</li>
                      <li>• ₹2,50,001 - ₹5,00,000: 5%</li>
                      <li>• ₹5,00,001 - ₹10,00,000: 20%</li>
                      <li>• Above ₹10,00,000: 30%</li>
                    </ul>
                    <p className="text-xs text-slate-500 mt-2">
                      Rebate: Up to ₹12,500 if income ≤ ₹5,00,000
                      <br />
                      Senior Citizens: ₹3,00,000 exemption
                      <br />
                      Super Senior: ₹5,00,000 exemption
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-3">Tax Calculation Steps</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <p className="text-sm font-medium">Calculate Gross Income</p>
                    <p className="text-xs text-slate-600">Sum all income sources</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold text-green-600">2</span>
                    </div>
                    <p className="text-sm font-medium">Apply Deductions</p>
                    <p className="text-xs text-slate-600">Standard + eligible deductions</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold text-yellow-600">3</span>
                    </div>
                    <p className="text-sm font-medium">Calculate Tax</p>
                    <p className="text-xs text-slate-600">Apply tax slabs</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-red-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold text-red-600">4</span>
                    </div>
                    <p className="text-sm font-medium">Add Cess & Rebate</p>
                    <p className="text-xs text-slate-600">Final tax liability</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Tax Terms & Definitions</CardTitle>
              <CardDescription>Essential tax terminology explained</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {taxTerms.map((item, index) => (
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
              <CardTitle>Tax Planning Tips</CardTitle>
              <CardDescription>Expert strategies for tax optimization and compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Choose Right Regime</h3>
                    <p className="text-sm text-slate-600">
                      Compare both regimes annually. New regime is beneficial if you have minimal deductions. Old regime
                      works better with significant investments.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Maximize Section 80C</h3>
                    <p className="text-sm text-slate-600">
                      Invest ₹1.5 lakh in PPF, ELSS, life insurance, or home loan principal to get maximum deduction
                      under old regime.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Health Insurance</h3>
                    <p className="text-sm text-slate-600">
                      Claim up to ₹25,000 for health insurance premiums under Section 80D. Additional ₹25,000 for
                      parents' coverage.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Plan Investments Early</h3>
                    <p className="text-sm text-slate-600">
                      Start tax-saving investments early in the financial year to benefit from compounding and avoid
                      last-minute rush.
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Keep Records</h3>
                    <p className="text-sm text-slate-600">
                      Maintain proper documentation for all investments, donations, and expenses claimed as deductions.
                    </p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-teal-800 mb-2">Maintain Compliance</h3>
                    <p className="text-sm text-slate-600">
                      Ensure proper compliance with applicable tax regulations and maintain accurate financial records for your business.
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

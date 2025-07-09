"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Home, Info, Lightbulb, BookOpen, AlertCircle, MapPin, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState("")
  const [hraReceived, setHraReceived] = useState("")
  const [rentPaid, setRentPaid] = useState("")
  const [cityType, setCityType] = useState("metro")

  const calculateHRA = () => {
    const basic = Number.parseFloat(basicSalary) || 0
    const hra = Number.parseFloat(hraReceived) || 0
    const rent = Number.parseFloat(rentPaid) || 0

    // HRA exemption calculation
    const hraPercentage = cityType === "metro" ? 0.5 : 0.4
    const rentExcess = Math.max(rent - basic * 0.1, 0)

    const hraExemption = Math.min(
      hra, // Actual HRA received
      basic * hraPercentage, // 50% or 40% of basic salary
      rentExcess, // Rent paid minus 10% of basic salary
    )

    const taxableHRA = hra - hraExemption
    const taxSavings = hraExemption * 0.3 // Assuming 30% tax bracket

    return {
      hraExemption,
      taxableHRA,
      taxSavings,
      basic,
      hra,
      rent,
      rentExcess,
      hraPercentage: hraPercentage * 100,
    }
  }

  const result = calculateHRA()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const hraTerms = [
    {
      term: "House Rent Allowance (HRA)",
      definition:
        "A component of salary paid by employers to employees to meet their accommodation expenses. It's partially exempt from income tax.",
    },
    {
      term: "HRA Exemption",
      definition:
        "The portion of HRA that is exempt from income tax, calculated as the minimum of three conditions specified in Income Tax Act.",
    },
    {
      term: "Basic Salary",
      definition:
        "The fixed component of salary before any allowances or perquisites. HRA exemption is calculated as a percentage of basic salary.",
    },
    {
      term: "Metro City",
      definition:
        "Cities like Mumbai, Delhi, Chennai, and Kolkata where HRA exemption is 50% of basic salary. Higher exemption due to higher living costs.",
    },
    {
      term: "Non-Metro City",
      definition: "All cities other than the four metros where HRA exemption is 40% of basic salary.",
    },
    {
      term: "Rent Receipt",
      definition:
        "Documentary proof of rent payment required for claiming HRA exemption. Must contain landlord details and rent amount.",
    },
    {
      term: "10% Rule",
      definition: "Only rent paid in excess of 10% of basic salary is considered for HRA exemption calculation.",
    },
    {
      term: "PAN Requirement",
      definition: "Landlord's PAN is mandatory if annual rent exceeds ₹1 lakh. Required for HRA exemption claim.",
    },
    {
      term: "Taxable HRA",
      definition: "The portion of HRA that is taxable after deducting the exempt amount. Added to taxable income.",
    },
    {
      term: "Form 12BB",
      definition: "Declaration form submitted to employer for claiming HRA exemption and other tax deductions.",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Link href="/business-calculators">
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
          <Home className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">HRA Calculator</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate your House Rent Allowance exemption and tax savings with our comprehensive HRA calculator
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
                  <span>HRA Details</span>
                </CardTitle>
                <CardDescription>Enter your salary and rent details to calculate HRA exemption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Basic Salary (Annual) (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter annual basic salary"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label>HRA Received (Annual) (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter annual HRA received"
                    value={hraReceived}
                    onChange={(e) => setHraReceived(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rent Paid (Annual) (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter annual rent paid"
                    value={rentPaid}
                    onChange={(e) => setRentPaid(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label>City Type</Label>
                  <Select value={cityType} onValueChange={setCityType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metro">Metro City (Mumbai, Delhi, Chennai, Kolkata)</SelectItem>
                      <SelectItem value="non-metro">Non-Metro City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">HRA Rate</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {cityType === "metro" ? "50%" : "40%"} of basic salary for{" "}
                    {cityType === "metro" ? "metro" : "non-metro"} cities
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-green-600" />
                  <span>HRA Calculation</span>
                </CardTitle>
                <CardDescription>Your HRA exemption and tax savings breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">HRA Exemption Calculation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Actual HRA Received:</span>
                        <span className="font-medium">{formatCurrency(result.hra)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{result.hraPercentage}% of Basic Salary:</span>
                        <span className="font-medium">
                          {formatCurrency(result.basic * (result.hraPercentage / 100))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rent - 10% of Basic:</span>
                        <span className="font-medium">{formatCurrency(result.rentExcess)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-800">HRA Exemption (Minimum of above)</span>
                      <span className="text-xl font-bold text-green-600">{formatCurrency(result.hraExemption)}</span>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-red-800">Taxable HRA</span>
                      <span className="text-lg font-bold text-red-600">{formatCurrency(result.taxableHRA)}</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-yellow-800">Estimated Tax Savings (30% bracket)</span>
                      <span className="text-lg font-bold text-yellow-600">{formatCurrency(result.taxSavings)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Monthly HRA Exemption</p>
                      <p className="font-bold">{formatCurrency(result.hraExemption / 12)}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Monthly Tax Savings</p>
                      <p className="font-bold">{formatCurrency(result.taxSavings / 12)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              HRA exemption requires proper rent receipts and landlord details. If annual rent exceeds ₹1 lakh,
              landlord's PAN is mandatory.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>HRA Exemption Guide</CardTitle>
              <CardDescription>Understanding HRA calculation rules and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">HRA Exemption Formula</h3>
                <p className="text-sm text-slate-600 mb-4">
                  HRA exemption is the <strong>minimum</strong> of the following three amounts:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-medium text-slate-800 mb-2">1. Actual HRA Received</h4>
                    <p className="text-xs text-slate-600">The HRA component mentioned in your salary slip</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-medium text-slate-800 mb-2">2. 50%/40% of Basic Salary</h4>
                    <p className="text-xs text-slate-600">50% for metro cities, 40% for non-metro cities</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-medium text-slate-800 mb-2">3. Rent - 10% of Basic</h4>
                    <p className="text-xs text-slate-600">Rent paid minus 10% of basic salary</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Metro Cities</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Mumbai</li>
                    <li>• Delhi</li>
                    <li>• Chennai</li>
                    <li>• Kolkata</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-2">HRA exemption: 50% of basic salary</p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-3">Documentation Required</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Rent receipts with revenue stamp</li>
                    <li>• Rental agreement</li>
                    <li>• Landlord's PAN (if rent &gt; ₹1 lakh/year)</li>
                    <li>• Form 12BB declaration</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-3">Important Rules</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Eligibility</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Must be a salaried employee</li>
                      <li>• Should receive HRA from employer</li>
                      <li>• Must pay rent for accommodation</li>
                      <li>• Cannot own house in same city</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Restrictions</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>• No exemption if living in own house</li>
                      <li>• Rent to family members not allowed</li>
                      <li>• Proper documentation mandatory</li>
                      <li>• TDS applicable on landlord if required</li>
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
              <CardTitle>HRA Terms & Definitions</CardTitle>
              <CardDescription>Essential HRA terminology explained</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {hraTerms.map((item, index) => (
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
              <CardTitle>HRA Optimization Tips</CardTitle>
              <CardDescription>Expert strategies for maximizing HRA benefits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Maximize HRA Component</h3>
                    <p className="text-sm text-slate-600">
                      Negotiate with employer to increase HRA component in salary structure. Higher HRA means more
                      exemption potential.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Proper Documentation</h3>
                    <p className="text-sm text-slate-600">
                      Maintain rent receipts with revenue stamps, rental agreement, and landlord's PAN details for
                      smooth claim processing.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Strategic Rent Planning</h3>
                    <p className="text-sm text-slate-600">
                      Pay rent slightly above 10% of basic salary to maximize the third condition of HRA exemption
                      calculation.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Avoid Common Mistakes</h3>
                    <p className="text-sm text-slate-600">
                      Don't pay rent to family members, ensure proper PAN details, and avoid claiming HRA if you own
                      house in same city.
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">TDS Compliance</h3>
                    <p className="text-sm text-slate-600">
                      Deduct TDS if annual rent exceeds ₹2.4 lakh. Provide TDS certificate to landlord for their tax
                      filing.
                    </p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-teal-800 mb-2">Annual Review</h3>
                    <p className="text-sm text-slate-600">
                      Review HRA exemption annually and adjust rent or salary structure to optimize tax benefits.
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

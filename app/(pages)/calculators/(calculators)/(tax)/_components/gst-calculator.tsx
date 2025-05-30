"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Receipt, Info, Lightbulb, BookOpen, AlertCircle, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function GSTCalculator() {
  const [calculationType, setCalculationType] = useState("exclusive")
  const [amount, setAmount] = useState("")
  const [gstRate, setGstRate] = useState("18")
  const [transactionType, setTransactionType] = useState("intra-state")

  const calculateGST = () => {
    const baseAmount = parseFloat(amount) || 0
    const rate = parseFloat(gstRate) || 0

    if (calculationType === "exclusive") {
      // GST Exclusive: Add GST to base amount
      const gstAmount = (baseAmount * rate) / 100
      const totalAmount = baseAmount + gstAmount
      return {
        baseAmount,
        gstAmount,
        totalAmount,
        cgst: transactionType === "intra-state" ? gstAmount / 2 : 0,
        sgst: transactionType === "intra-state" ? gstAmount / 2 : 0,
        igst: transactionType === "inter-state" ? gstAmount : 0,
      }
    } else if (calculationType === "inclusive") {
      // GST Inclusive: Extract GST from total amount
      const totalAmount = baseAmount
      const gstAmount = (totalAmount * rate) / (100 + rate)
      const baseAmountCalc = totalAmount - gstAmount
      return {
        baseAmount: baseAmountCalc,
        gstAmount,
        totalAmount,
        cgst: transactionType === "intra-state" ? gstAmount / 2 : 0,
        sgst: transactionType === "intra-state" ? gstAmount / 2 : 0,
        igst: transactionType === "inter-state" ? gstAmount : 0,
      }
    } else {
      // Reverse GST: Calculate base amount from GST amount
      const gstAmount = baseAmount
      const baseAmountCalc = (gstAmount * 100) / rate
      const totalAmount = baseAmountCalc + gstAmount
      return {
        baseAmount: baseAmountCalc,
        gstAmount,
        totalAmount,
        cgst: transactionType === "intra-state" ? gstAmount / 2 : 0,
        sgst: transactionType === "intra-state" ? gstAmount / 2 : 0,
        igst: transactionType === "inter-state" ? gstAmount : 0,
      }
    }
  }

  const result = calculateGST()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const gstTerms = [
    {
      term: "Goods and Services Tax (GST)",
      definition: "A comprehensive indirect tax levied on the supply of goods and services in India, replacing multiple cascading taxes."
    },
    {
      term: "GST Exclusive",
      definition: "Pricing where GST is added on top of the base price. The quoted price does not include GST."
    },
    {
      term: "GST Inclusive",
      definition: "Pricing where GST is included in the quoted price. The total price includes both base amount and GST."
    },
    {
      term: "CGST (Central GST)",
      definition: "Central component of GST collected by the Central Government on intra-state transactions."
    },
    {
      term: "SGST (State GST)",
      definition: "State component of GST collected by the State Government on intra-state transactions."
    },
    {
      term: "IGST (Integrated GST)",
      definition: "GST levied on inter-state transactions, collected by the Central Government and shared with states."
    },
    {
      term: "Input Tax Credit (ITC)",
      definition: "Credit available to registered taxpayers for GST paid on purchases, which can be set off against output tax liability."
    },
    {
      term: "HSN Code",
      definition: "Harmonized System of Nomenclature code used to classify goods and determine applicable GST rates."
    },
    {
      term: "Reverse Charge Mechanism",
      definition: "A mechanism where the recipient of goods/services pays GST instead of the supplier."
    },
    {
      term: "Composition Scheme",
      definition: "A simplified GST scheme for small taxpayers with lower tax rates but no input tax credit."
    }
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
          <Receipt className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">GST Calculator</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate GST amounts with support for all tax rates, inclusive/exclusive pricing, and CGST/SGST breakdown
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
                  <span>GST Calculation</span>
                </CardTitle>
                <CardDescription>
                  Enter amount and select GST rate to calculate taxes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calculation Type */}
                <div className="space-y-2">
                  <Label>Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exclusive">GST Exclusive (Add GST)</SelectItem>
                      <SelectItem value="inclusive">GST Inclusive (Extract GST)</SelectItem>
                      <SelectItem value="reverse">Reverse GST (From GST Amount)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <Label>
                    {calculationType === "exclusive" ? "Base Amount (₹)" :
                     calculationType === "inclusive" ? "Total Amount (₹)" :
                     "GST Amount (₹)"}
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* GST Rate */}
                <div className="space-y-2">
                  <Label>GST Rate (%)</Label>
                  <Select value={gstRate} onValueChange={setGstRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% - Essential goods</SelectItem>
                      <SelectItem value="5">5% - Basic necessities</SelectItem>
                      <SelectItem value="12">12% - Standard goods</SelectItem>
                      <SelectItem value="18">18% - Most goods & services</SelectItem>
                      <SelectItem value="28">28% - Luxury goods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transaction Type */}
                <div className="space-y-2">
                  <Label>Transaction Type</Label>
                  <Select value={transactionType} onValueChange={setTransactionType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="intra-state">Intra-State (CGST + SGST)</SelectItem>
                      <SelectItem value="inter-state">Inter-State (IGST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Receipt className="h-5 w-5 text-green-600" />
                  <span>GST Breakdown</span>
                </CardTitle>
                <CardDescription>
                  Detailed GST calculation results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">Base Amount</p>
                    <p className="text-xl font-bold text-blue-600">
                      {formatCurrency(result.baseAmount)}
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">GST Amount</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(result.gstAmount)}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalAmount)}
                  </p>
                </div>

                {/* GST Breakdown */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-800">GST Breakdown:</h4>
                  {transactionType === "intra-state" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 p-3 rounded">
                        <p className="text-xs text-slate-600">CGST ({Number(gstRate)/2}%)</p>
                        <p className="font-semibold">{formatCurrency(result.cgst)}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded">
                        <p className="text-xs text-slate-600">SGST ({Number(gstRate)/2}%)</p>
                        <p className="font-semibold">{formatCurrency(result.sgst)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-xs text-slate-600">IGST ({gstRate}%)</p>
                      <p className="font-semibold">{formatCurrency(result.igst)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This calculator provides estimates based on current GST rates. Please consult a tax professional for complex scenarios and compliance requirements.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How GST Calculation Works</CardTitle>
              <CardDescription>Understanding GST calculation methods and formulas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">1. GST Exclusive</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    When GST is added to the base price
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-xs font-mono">GST Amount = Base × Rate ÷ 100</p>
                    <p className="text-xs font-mono">Total = Base + GST Amount</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">2. GST Inclusive</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    When GST is included in the total price
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-xs font-mono">GST = Total × Rate ÷ (100 + Rate)</p>
                    <p className="text-xs font-mono">Base = Total - GST Amount</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-3">3. Reverse GST</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    When calculating base from GST amount
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-xs font-mono">Base = GST Amount × 100 ÷ Rate</p>
                    <p className="text-xs font-mono">Total = Base + GST Amount</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-3">GST Structure in India</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Intra-State Transactions</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• CGST: Central GST (50% of total GST)</li>
                      <li>• SGST: State GST (50% of total GST)</li>
                      <li>• Both collected simultaneously</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Inter-State Transactions</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• IGST: Integrated GST (100% of total GST)</li>
                      <li>• Collected by Central Government</li>
                      <li>• Later distributed to states</li>
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
              <CardTitle>GST Terms & Definitions</CardTitle>
              <CardDescription>Essential GST terminology explained</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {gstTerms.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left">
                      <span className="font-medium">{item.term}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      {item.definition}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GST Compliance Tips</CardTitle>
              <CardDescription>Expert advice for GST management and compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Registration Requirements</h3>
                    <p className="text-sm text-slate-600">
                      Register for GST if annual turnover exceeds ₹20 lakhs (₹10 lakhs for special category states).
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Input Tax Credit</h3>
                    <p className="text-sm text-slate-600">
                      Claim ITC on business purchases to reduce your GST liability. Maintain proper invoices and documentation.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Filing Returns</h3>
                    <p className="text-sm text-slate-600">
                      File GSTR-1, GSTR-3B monthly and GSTR-9 annually. Late filing attracts penalties and interest.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Invoice Requirements</h3>
                    <p className="text-sm text-slate-600">
                      Include GSTIN, HSN codes, tax breakup, and all mandatory fields in your invoices.
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Common Mistakes</h3>
                    <p className="text-sm text-slate-600">
                      Avoid wrong HSN codes, incorrect tax rates, and claiming ITC without valid invoices.
                    </p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-teal-800 mb-2">Record Keeping</h3>
                    <p className="text-sm text-slate-600">
                      Maintain digital records for 6 years. Use GST-compliant accounting software for accuracy.
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

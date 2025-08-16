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
          <Receipt className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Free GST Calculator: Your Simple and Accurate Tool for India</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-4xl mx-auto">
          Calculating the Goods and Services Tax (GST) can be complex and time-consuming. Our free online GST calculator is an easy-to-use tool designed to simplify this process, helping you determine the correct tax amount and final price for any transaction, whether you are a buyer, seller, manufacturer, or wholesaler. By providing instant and precise results, our calculator helps you save time and reduce the chances of manual errors, ensuring accuracy and compliance in your financial dealings.
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
              <CardTitle>How to Use the GST Calculator?</CardTitle>
              <CardDescription>Using our GST calculator is a straightforward process that gets you the results you need in just a few steps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-3 text-center">Choose Your Calculation</h3>
                  <p className="text-sm text-slate-600 text-center">
                    First, select whether you need to calculate a GST Exclusive or GST Inclusive amount or reverse using tax amount.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-green-800 mb-3 text-center">Enter Your Amount</h3>
                  <p className="text-sm text-slate-600 text-center">
                    Input the original price of the goods or services into the designated field.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-3 text-center">Select the GST Rate</h3>
                  <p className="text-sm text-slate-600 text-center">
                    Choose the applicable GST rate for your product or service from the drop-down menu. Our calculator includes all the common Indian GST slabs: 5%, 12%, 18%, and 28%.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-3 text-center">View Your Results</h3>
                  <p className="text-sm text-slate-600 text-center">
                    View instantly get a detailed breakdown of the GST amount and the final price.
                  </p>
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
              <CardTitle>Frequently Asked Questions (FAQs)</CardTitle>
              <CardDescription>Common questions about GST calculation and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="faq-1" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="font-medium">Q: What is GST?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    A: Goods and Services Tax (GST) is a destination-based tax on the consumption of goods and services. It is levied at all stages of the supply chain, from manufacture to final consumption. Only the value addition at each stage is taxed, and the final tax burden is borne by the end consumer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="font-medium">Q: What are the different GST rates in India?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    A: India has a multi-tiered GST structure. The main tax slabs are 5%, 12%, 18%, and 28%. Additionally, some items are taxed at 0% (nil-rated), 0.25%, or 3%.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="font-medium">Q: How is GST calculated on the Maximum Retail Price (MRP)?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    A: The MRP is the final price, which already includes all taxes, including GST. To calculate the GST amount from the MRP, you can use the formula: GST Amount = (MRP x GST Rate) / (100 + GST Rate).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="font-medium">Q: What is the difference between GST Inclusive and GST Exclusive?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    A: GST Exclusive is the price of a product or service before the tax is added. GST Inclusive is the final price, with the GST already factored in. Our calculator is designed to perform both calculations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="font-medium">Q: On which value is GST calculated?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    A: GST is calculated on the transaction value of the goods or services. This includes the base price plus any additional costs like packaging and delivery.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Started with Our GST Calculator</CardTitle>
              <CardDescription>Your essential tool for accurate GST calculations in India</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Simplify Your GST Calculations Today
                </h3>
                <p className="text-slate-600 mb-6 max-w-3xl mx-auto">
                  With its simple interface and powerful features, our GST calculator is an essential tool for anyone in India managing their finances or running a business. By providing quick, accurate, and detailed results, it simplifies tax computations and helps you focus on what matters most.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Quick & Accurate</h4>
                    <p className="text-sm text-slate-600">
                      Get instant GST calculations with 100% accuracy for all Indian tax slabs.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Receipt className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Detailed Breakdown</h4>
                    <p className="text-sm text-slate-600">
                      View complete CGST, SGST, and IGST breakdowns for better understanding.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">Easy to Use</h4>
                    <p className="text-sm text-slate-600">
                      Simple interface designed for buyers, sellers, manufacturers, and wholesalers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-3">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Support for all GST rates: 5%, 12%, 18%, 28%</li>
                    <li>• GST Exclusive and Inclusive calculations</li>
                    <li>• Reverse GST calculation from tax amount</li>
                    <li>• CGST/SGST breakdown for intra-state transactions</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• IGST calculation for inter-state transactions</li>
                    <li>• Instant results with detailed breakdowns</li>
                    <li>• Mobile-friendly responsive design</li>
                    <li>• Free to use with no registration required</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

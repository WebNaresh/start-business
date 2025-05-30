"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, FileText, BookOpen, AlertCircle, Percent } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TdsSection {
  section: string
  description: string
  rate: number
  threshold: number
  category: string
}

const tdsRates: TdsSection[] = [
  {
    section: "194A",
    description: "Interest other than on securities",
    rate: 10,
    threshold: 40000,
    category: "Interest",
  },
  {
    section: "194B",
    description: "Winnings from lottery/crossword puzzle",
    rate: 30,
    threshold: 10000,
    category: "Winnings",
  },
  { section: "194BB", description: "Winnings from horse race", rate: 30, threshold: 10000, category: "Winnings" },
  { section: "194C", description: "Payment to contractors", rate: 1, threshold: 30000, category: "Contractor" },
  { section: "194D", description: "Insurance commission", rate: 5, threshold: 15000, category: "Commission" },
  {
    section: "194DA",
    description: "Payment in respect of life insurance policy",
    rate: 1,
    threshold: 100000,
    category: "Insurance",
  },
  { section: "194E", description: "Payment to non-resident sportsmen", rate: 20, threshold: 0, category: "Sports" },
  {
    section: "194F",
    description: "Payment on account of repurchase of units",
    rate: 20,
    threshold: 0,
    category: "Mutual Fund",
  },
  {
    section: "194G",
    description: "Commission on sale of lottery tickets",
    rate: 5,
    threshold: 15000,
    category: "Commission",
  },
  { section: "194H", description: "Commission or brokerage", rate: 5, threshold: 15000, category: "Commission" },
  { section: "194I", description: "Rent", rate: 10, threshold: 240000, category: "Rent" },
  {
    section: "194IA",
    description: "Payment for transfer of immovable property",
    rate: 1,
    threshold: 5000000,
    category: "Property",
  },
  { section: "194IB", description: "Rent paid by individuals/HUF", rate: 5, threshold: 50000, category: "Rent" },
  { section: "194IC", description: "Joint development agreement", rate: 10, threshold: 0, category: "Property" },
  {
    section: "194J",
    description: "Professional/technical services",
    rate: 10,
    threshold: 30000,
    category: "Professional",
  },
  {
    section: "194K",
    description: "Income from units of mutual fund/UTI",
    rate: 10,
    threshold: 5000,
    category: "Mutual Fund",
  },
  {
    section: "194LA",
    description: "Compensation on acquisition of immovable property",
    rate: 10,
    threshold: 250000,
    category: "Property",
  },
  {
    section: "194LB",
    description: "Income from investment in securitisation trust",
    rate: 25,
    threshold: 0,
    category: "Investment",
  },
  {
    section: "194LC",
    description: "Income from investment in specified company",
    rate: 5,
    threshold: 0,
    category: "Investment",
  },
  {
    section: "194LD",
    description: "Interest on certain bonds/debentures",
    rate: 5,
    threshold: 5000,
    category: "Interest",
  },
  {
    section: "194M",
    description: "Commission/brokerage/discount by e-commerce operator",
    rate: 5,
    threshold: 500000,
    category: "E-commerce",
  },
  {
    section: "194N",
    description: "Cash withdrawal exceeding Rs. 1 crore",
    rate: 2,
    threshold: 10000000,
    category: "Cash",
  },
  { section: "194O", description: "E-commerce transactions", rate: 1, threshold: 500000, category: "E-commerce" },
  { section: "194P", description: "Winnings from online games", rate: 30, threshold: 10000, category: "Gaming" },
  { section: "194Q", description: "Purchase of goods", rate: 0.1, threshold: 5000000, category: "Purchase" },
  { section: "194R", description: "Benefits or perquisites", rate: 10, threshold: 20000, category: "Benefits" },
  {
    section: "194S",
    description: "Payment for purchase of virtual digital assets",
    rate: 1,
    threshold: 50000,
    category: "Crypto",
  },
]

export function TdsCalculator() {
  const [selectedSection, setSelectedSection] = useState<TdsSection | null>(null)
  const [amount, setAmount] = useState("")
  const [panAvailable, setPanAvailable] = useState("yes")
  const [results, setResults] = useState({
    tdsAmount: 0,
    netAmount: 0,
    applicableRate: 0,
    isApplicable: false,
  })

  useEffect(() => {
    calculateTds()
  }, [selectedSection, amount, panAvailable])

  const calculateTds = () => {
    if (!selectedSection || !amount || isNaN(Number(amount))) {
      setResults({ tdsAmount: 0, netAmount: 0, applicableRate: 0, isApplicable: false })
      return
    }

    const grossAmount = Number(amount)
    const isApplicable = grossAmount > selectedSection.threshold

    if (!isApplicable) {
      setResults({
        tdsAmount: 0,
        netAmount: grossAmount,
        applicableRate: 0,
        isApplicable: false,
      })
      return
    }

    let applicableRate = selectedSection.rate

    // Higher rate if PAN not available (20% or existing rate, whichever is higher)
    if (panAvailable === "no") {
      applicableRate = Math.max(20, selectedSection.rate)
    }

    const tdsAmount = (grossAmount * applicableRate) / 100
    const netAmount = grossAmount - tdsAmount

    setResults({
      tdsAmount,
      netAmount,
      applicableRate,
      isApplicable: true,
    })
  }

  const categories = [...new Set(tdsRates.map((rate) => rate.category))]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">TDS Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate Tax Deducted at Source (TDS) for various income types with latest rates and thresholds
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="rates">TDS Rates</TabsTrigger>
            <TabsTrigger value="guide">Guide</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    TDS Calculation
                  </CardTitle>
                  <CardDescription>Select TDS section and enter payment amount to calculate TDS</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="section">TDS Section</Label>
                    <Select
                      onValueChange={(value) => {
                        const section = tdsRates.find((rate) => rate.section === value)
                        setSelectedSection(section || null)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select TDS Section" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <div key={category}>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500 bg-gray-50">{category}</div>
                            {tdsRates
                              .filter((rate) => rate.category === category)
                              .map((rate) => (
                                <SelectItem key={rate.section} value={rate.section}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>
                                      {rate.section} - {rate.description}
                                    </span>
                                    <Badge variant="secondary" className="ml-2">
                                      {rate.rate}%
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSection && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{selectedSection.section}:</strong> {selectedSection.description}
                        <br />
                        <strong>Rate:</strong> {selectedSection.rate}% |<strong> Threshold:</strong> ₹
                        {selectedSection.threshold.toLocaleString("en-IN")}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="amount">Payment Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter payment amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>PAN Available</Label>
                    <Select value={panAvailable} onValueChange={setPanAvailable}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - PAN Available</SelectItem>
                        <SelectItem value="no">No - PAN Not Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {panAvailable === "no" && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Higher TDS rate of 20% (or existing rate, whichever is higher) will be applied as PAN is not
                        available.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    TDS Calculation Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedSection && amount ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{Number(amount).toLocaleString("en-IN")}
                          </div>
                          <div className="text-sm text-gray-600">Gross Amount</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            ₹{results.tdsAmount.toLocaleString("en-IN")}
                          </div>
                          <div className="text-sm text-gray-600">TDS Amount</div>
                        </div>
                      </div>

                      <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          ₹{results.netAmount.toLocaleString("en-IN")}
                        </div>
                        <div className="text-lg text-gray-700">Net Amount Receivable</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">TDS Section:</span>
                          <span>{selectedSection.section}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">Applicable Rate:</span>
                          <span className="flex items-center gap-1">
                            <Percent className="h-4 w-4" />
                            {results.applicableRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">Threshold Limit:</span>
                          <span>₹{selectedSection.threshold.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">TDS Applicable:</span>
                          <Badge variant={results.isApplicable ? "default" : "secondary"}>
                            {results.isApplicable ? "Yes" : "No"}
                          </Badge>
                        </div>
                      </div>

                      {!results.isApplicable && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            No TDS is applicable as the payment amount is below the threshold limit of ₹
                            {selectedSection.threshold.toLocaleString("en-IN")}.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select TDS section and enter amount to see calculation results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rates">
            <Card>
              <CardHeader>
                <CardTitle>TDS Rates & Thresholds (AY 2024-25)</CardTitle>
                <CardDescription>
                  Complete list of TDS sections with applicable rates and threshold limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold mb-3 text-blue-600">{category}</h3>
                      <div className="grid gap-3">
                        {tdsRates
                          .filter((rate) => rate.category === category)
                          .map((rate) => (
                            <div
                              key={rate.section}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex-1">
                                <div className="font-medium">{rate.section}</div>
                                <div className="text-sm text-gray-600">{rate.description}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-blue-600">{rate.rate}%</div>
                                <div className="text-sm text-gray-500">
                                  Threshold: ₹{rate.threshold.toLocaleString("en-IN")}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    What is TDS?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    Tax Deducted at Source (TDS) is a method of collecting income tax where tax is deducted at the time
                    of payment itself.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Key Points:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Deducted by the payer at the time of payment</li>
                      <li>• Deposited with the government within specified time</li>
                      <li>• TDS certificate (Form 16A) issued to payee</li>
                      <li>• Can be claimed as credit while filing ITR</li>
                      <li>• Higher rate if PAN not provided</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>TDS Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Due Dates:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Government payments: 7th of next month</li>
                      <li>• Non-government payments: 30th of next month</li>
                      <li>• March payments: 30th April</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Quarterly Returns:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Q1 (Apr-Jun): 31st July</li>
                      <li>• Q2 (Jul-Sep): 31st October</li>
                      <li>• Q3 (Oct-Dec): 31st January</li>
                      <li>• Q4 (Jan-Mar): 31st May</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Important Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">PAN Requirements:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Mandatory for TDS deduction</li>
                      <li>• 20% rate if PAN not provided</li>
                      <li>• Valid PAN reduces TDS rate</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Exemptions:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Form 15G/15H for no tax liability</li>
                      <li>• Lower deduction certificate</li>
                      <li>• Nil deduction certificate</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Penalties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Non-compliance Penalties:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Failure to deduct: Equal to TDS amount</li>
                      <li>• Late deposit: 1.5% per month</li>
                      <li>• Late filing: ₹200 per day</li>
                      <li>• Incorrect information: ₹10,000 to ₹1,00,000</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>TDS Forms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Quarterly Returns:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Form 24Q: Salary payments</li>
                      <li>• Form 26Q: Non-salary payments</li>
                      <li>• Form 27Q: Mutual fund payments</li>
                      <li>• Form 27EQ: E-commerce transactions</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Certificates:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Form 16: Salary TDS certificate</li>
                      <li>• Form 16A: Non-salary TDS certificate</li>
                      <li>• Form 16B: Property TDS certificate</li>
                      <li>• Form 16C: Rent TDS certificate</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>TDS Rates for Non-Residents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Standard Rates:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Interest: 20%</li>
                      <li>• Dividends: 20%</li>
                      <li>• Royalty: 10%</li>
                      <li>• Technical services: 10%</li>
                      <li>• Other income: 30%</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">DTAA Benefits:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Lower rates under tax treaties</li>
                      <li>• Tax Residency Certificate required</li>
                      <li>• Form 10F for DTAA benefits</li>
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

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calculator, CalendarIcon, AlertTriangle, FileText, BookOpen, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface InterestCalculation {
  taxLiability: number
  interestRate: number
  delayDays: number
  interestAmount: number
  lateFee: number
  totalPenalty: number
  totalPayable: number
}

export function Gstr3bInterestCalculator() {
  const [returnPeriod, setReturnPeriod] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [filingDate, setFilingDate] = useState<Date>()
  const [taxLiability, setTaxLiability] = useState("")
  const [taxPaid, setTaxPaid] = useState("")
  const [turnover, setTurnover] = useState("")
  const [results, setResults] = useState<InterestCalculation>({
    taxLiability: 0,
    interestRate: 18,
    delayDays: 0,
    interestAmount: 0,
    lateFee: 0,
    totalPenalty: 0,
    totalPayable: 0,
  })

  const returnPeriods = [
    { value: "2024-04", label: "April 2024", dueDate: new Date(2024, 4, 20) },
    { value: "2024-05", label: "May 2024", dueDate: new Date(2024, 5, 20) },
    { value: "2024-06", label: "June 2024", dueDate: new Date(2024, 6, 20) },
    { value: "2024-07", label: "July 2024", dueDate: new Date(2024, 7, 20) },
    { value: "2024-08", label: "August 2024", dueDate: new Date(2024, 8, 20) },
    { value: "2024-09", label: "September 2024", dueDate: new Date(2024, 9, 20) },
    { value: "2024-10", label: "October 2024", dueDate: new Date(2024, 10, 20) },
    { value: "2024-11", label: "November 2024", dueDate: new Date(2024, 11, 20) },
    { value: "2024-12", label: "December 2024", dueDate: new Date(2025, 0, 20) },
    { value: "2025-01", label: "January 2025", dueDate: new Date(2025, 1, 20) },
    { value: "2025-02", label: "February 2025", dueDate: new Date(2025, 2, 20) },
    { value: "2025-03", label: "March 2025", dueDate: new Date(2025, 3, 20) },
  ]

  useEffect(() => {
    if (returnPeriod) {
      const period = returnPeriods.find((p) => p.value === returnPeriod)
      if (period) {
        setDueDate(period.dueDate)
      }
    }
  }, [returnPeriod])

  useEffect(() => {
    calculateInterest()
  }, [taxLiability, taxPaid, dueDate, filingDate, turnover])

  const calculateInterest = () => {
    if (!taxLiability || !dueDate || !filingDate || isNaN(Number(taxLiability))) {
      setResults({
        taxLiability: 0,
        interestRate: 18,
        delayDays: 0,
        interestAmount: 0,
        lateFee: 0,
        totalPenalty: 0,
        totalPayable: 0,
      })
      return
    }

    const taxLiabilityAmount = Number(taxLiability)
    const taxPaidAmount = Number(taxPaid) || 0
    const outstandingTax = Math.max(0, taxLiabilityAmount - taxPaidAmount)

    // Calculate delay days
    const delayDays = Math.max(0, Math.ceil((filingDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)))

    // Interest calculation (18% per annum)
    const interestRate = 18
    const interestAmount = (outstandingTax * interestRate * delayDays) / (365 * 100)

    // Late fee calculation
    let lateFee = 0
    if (delayDays > 0) {
      const annualTurnover = Number(turnover) || 0
      if (annualTurnover <= 15000000) {
        // Up to 1.5 crore
        lateFee = Math.min(delayDays * 20, 10000) // Rs 20 per day, max Rs 10,000
      } else {
        lateFee = Math.min(delayDays * 100, 10000) // Rs 100 per day, max Rs 10,000
      }
    }

    const totalPenalty = interestAmount + lateFee
    const totalPayable = outstandingTax + totalPenalty

    setResults({
      taxLiability: outstandingTax,
      interestRate,
      delayDays,
      interestAmount,
      lateFee,
      totalPenalty,
      totalPayable,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-orange-600 rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">GSTR-3B Interest Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate interest and late fees for delayed GSTR-3B filing with accurate penalty computation
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="rates">Interest Rates</TabsTrigger>
            <TabsTrigger value="guide">Filing Guide</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    GSTR-3B Details
                  </CardTitle>
                  <CardDescription>
                    Enter your GSTR-3B filing details to calculate interest and penalties
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="period">Return Period</Label>
                    <Select value={returnPeriod} onValueChange={setReturnPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select return period" />
                      </SelectTrigger>
                      <SelectContent>
                        {returnPeriods.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {dueDate && (
                    <Alert>
                      <CalendarIcon className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Due Date:</strong> {format(dueDate, "dd MMM yyyy")}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label>Actual Filing Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filingDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filingDate ? format(filingDate, "dd MMM yyyy") : "Select filing date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={filingDate} onSelect={setFilingDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax-liability">Tax Liability (₹)</Label>
                    <Input
                      id="tax-liability"
                      type="number"
                      placeholder="Enter total tax liability"
                      value={taxLiability}
                      onChange={(e) => setTaxLiability(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax-paid">Tax Paid (₹)</Label>
                    <Input
                      id="tax-paid"
                      type="number"
                      placeholder="Enter tax already paid"
                      value={taxPaid}
                      onChange={(e) => setTaxPaid(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="turnover">Annual Turnover (₹)</Label>
                    <Input
                      id="turnover"
                      type="number"
                      placeholder="Enter annual turnover"
                      value={turnover}
                      onChange={(e) => setTurnover(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Required for late fee calculation (affects penalty rates)</p>
                  </div>

                  {results.delayDays > 0 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Delay:</strong> {results.delayDays} days late filing detected. Interest and late fees
                        will apply.
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
                    Interest & Penalty Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {taxLiability && dueDate && filingDate ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{results.taxLiability.toLocaleString("en-IN")}
                          </div>
                          <div className="text-sm text-gray-600">Outstanding Tax</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{results.delayDays}</div>
                          <div className="text-sm text-gray-600">Days Delayed</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">Interest Rate:</span>
                          <span>{results.interestRate}% per annum</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                          <span className="font-medium">Interest Amount:</span>
                          <span className="text-red-600 font-bold">
                            ₹{results.interestAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                          <span className="font-medium">Late Fee:</span>
                          <span className="text-red-600 font-bold">₹{results.lateFee.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-100 rounded border-2 border-red-200">
                          <span className="font-bold">Total Penalty:</span>
                          <span className="text-red-600 font-bold text-lg">
                            ₹{results.totalPenalty.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>

                      <div className="text-center p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          ₹{results.totalPayable.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-lg text-gray-700">Total Amount Payable</div>
                        <div className="text-sm text-gray-500 mt-1">(Tax + Interest + Late Fee)</div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Calculation Details</h4>
                        <div className="text-sm space-y-2 p-4 bg-gray-50 rounded">
                          <div>
                            • Interest: ₹{results.taxLiability.toLocaleString("en-IN")} × {results.interestRate}% ×{" "}
                            {results.delayDays} days ÷ 365
                          </div>
                          <div>• Late Fee: {Number(turnover) <= 15000000 ? "₹20" : "₹100"} per day (max ₹10,000)</div>
                          <div>• Total Delay: {results.delayDays} days from due date</div>
                        </div>
                      </div>

                      {results.delayDays === 0 && (
                        <Alert>
                          <Clock className="h-4 w-4" />
                          <AlertDescription>
                            Great! No delay detected. Your return was filed on time with no additional interest or
                            penalties.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter return details to calculate interest and penalties</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rates">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interest Rates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Current Rates (2024-25)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Interest on delayed payment</span>
                        <Badge variant="destructive">18% per annum</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Interest on delayed filing</span>
                        <Badge variant="destructive">18% per annum</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Calculation Method</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Simple interest calculation</li>
                      <li>• Calculated on outstanding tax amount</li>
                      <li>• From due date to payment date</li>
                      <li>• Minimum one day interest if delayed</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Late Fee Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Turnover-based Late Fee</h4>
                    <div className="space-y-2">
                      <div className="p-3 border rounded">
                        <div className="font-medium">Turnover ≤ ₹1.5 Crore</div>
                        <div className="text-sm text-gray-600">₹20 per day (Max: ₹10,000)</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="font-medium">Turnover &gt; ₹1.5 Crore</div>
                        <div className="text-sm text-gray-600">₹100 per day (Max: ₹10,000)</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Important Notes</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Late fee applies even for nil returns</li>
                      <li>• Maximum late fee capped at ₹10,000</li>
                      <li>• Separate for CGST and SGST</li>
                      <li>• No late fee for first 7 days (some states)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Penalty Scenarios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Common Scenarios</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <div className="font-medium text-red-700">Late Filing with Tax Due</div>
                        <div className="text-red-600">Interest + Late Fee both applicable</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                        <div className="font-medium text-yellow-700">Late Filing, No Tax Due</div>
                        <div className="text-yellow-600">Only Late Fee applicable</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <div className="font-medium text-green-700">On-time Filing</div>
                        <div className="text-green-600">No penalties</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Waiver Provisions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Interest Waiver</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Technical glitches in GST portal</li>
                      <li>• Natural calamities</li>
                      <li>• Government notifications</li>
                      <li>• Court orders</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Late Fee Waiver</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• First-time filers (some states)</li>
                      <li>• Small taxpayers relief schemes</li>
                      <li>• Amnesty schemes</li>
                      <li>• Genuine hardship cases</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guide">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    GSTR-3B Filing Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">What is GSTR-3B?</h4>
                    <p className="text-sm text-gray-600">
                      GSTR-3B is a monthly summary return that contains details of outward supplies, input tax credit,
                      and tax liability.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Due Dates</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Regular taxpayers: 20th of next month</li>
                      <li>• Quarterly filers: 22nd/24th of next month</li>
                      <li>• Composition dealers: 18th of next month</li>
                      <li>• Input service distributors: 13th of next month</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Key Sections</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Table 3.1: Outward supplies</li>
                      <li>• Table 3.2: Inward supplies (reverse charge)</li>
                      <li>• Table 4: Input Tax Credit</li>
                      <li>• Table 5: Tax payable and paid</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Filing Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Step-by-Step Process</h4>
                    <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                      <li>Login to GST portal</li>
                      <li>Go to Returns → GSTR-3B</li>
                      <li>Select return period</li>
                      <li>Fill all mandatory tables</li>
                      <li>Verify calculations</li>
                      <li>Pay tax liability</li>
                      <li>Submit the return</li>
                    </ol>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Common Mistakes</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Incorrect ITC calculations</li>
                      <li>• Mismatched tax liability</li>
                      <li>• Wrong HSN/SAC codes</li>
                      <li>• Incomplete reverse charge entries</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Timely Filing</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Set calendar reminders</li>
                      <li>• Maintain monthly reconciliation</li>
                      <li>• Keep documents ready</li>
                      <li>• File 2-3 days before due date</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Record Keeping</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Maintain proper books of accounts</li>
                      <li>• Keep all invoices and receipts</li>
                      <li>• Regular backup of data</li>
                      <li>• Document all transactions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Avoid Penalties</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• File returns on time</li>
                      <li>• Pay taxes before due date</li>
                      <li>• Reconcile ITC regularly</li>
                      <li>• Maintain proper documentation</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Professional Help</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Consult CA for complex cases</li>
                      <li>• Use certified GST software</li>
                      <li>• Regular compliance audits</li>
                      <li>• Stay updated with law changes</li>
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
                  <CardTitle>Compliance Calendar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Monthly Compliance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 border rounded">
                        <span>GSTR-1</span>
                        <span>11th of next month</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded">
                        <span>GSTR-3B</span>
                        <span>20th of next month</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded">
                        <span>TDS Return</span>
                        <span>10th of next month</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded">
                        <span>TCS Return</span>
                        <span>10th of next month</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Quarterly Compliance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 border rounded">
                        <span>GSTR-2A Reconciliation</span>
                        <span>Quarterly</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded">
                        <span>ITC Reconciliation</span>
                        <span>Quarterly</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Penalty Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Non-Filing Penalties</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <div className="font-medium">GSTR-3B Late Filing</div>
                        <div>₹20-100 per day + 18% interest</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <div className="font-medium">GSTR-1 Late Filing</div>
                        <div>₹20-100 per day (max ₹5,000)</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Other Penalties</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Wrong ITC claim: 10% of tax + interest</li>
                      <li>• Non-payment of tax: 10% of tax amount</li>
                      <li>• Fake invoicing: 100% of tax amount</li>
                      <li>• Non-registration: 10% of tax liability</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recovery Procedures</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Recovery Methods</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Adjustment against refunds</li>
                      <li>• Bank account attachment</li>
                      <li>• Asset attachment and sale</li>
                      <li>• Third-party recovery</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Appeal Process</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• First appeal: Commissioner (Appeals)</li>
                      <li>• Second appeal: Appellate Tribunal</li>
                      <li>• High Court: Substantial questions of law</li>
                      <li>• Supreme Court: Final appeal</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">2024-25 Changes</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Increased late fee for large taxpayers</li>
                      <li>• Stricter ITC reconciliation rules</li>
                      <li>• Enhanced e-invoicing requirements</li>
                      <li>• New return filing system</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Upcoming Changes</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time return filing</li>
                      <li>• Automated ITC matching</li>
                      <li>• AI-based compliance monitoring</li>
                      <li>• Simplified return forms</li>
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

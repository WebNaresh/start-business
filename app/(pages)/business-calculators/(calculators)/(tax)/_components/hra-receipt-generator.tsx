"use client"

import { useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { format, addMonths, startOfMonth, endOfMonth } from "date-fns"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, Download, Printer, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Form schema
const formSchema = z.object({
  tenantName: z.string().min(2, { message: "Tenant name is required" }),
  tenantPan: z.string().optional(),
  landlordName: z.string().min(2, { message: "Landlord name is required" }),
  landlordPan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
      message: "Invalid PAN format. It should be in the format AAAAA0000A",
    })
    .optional(),
  propertyAddress: z.string().min(5, { message: "Property address is required" }),
  rentAmount: z.coerce.number().min(1, { message: "Rent amount is required" }),
  paymentMode: z.enum(["Cash", "Bank Transfer", "UPI", "Cheque"]),
  receiptType: z.enum(["Monthly", "Quarterly", "Annual"]),
  startDate: z.date(),
  includeGst: z.boolean().default(false),
  gstNumber: z.string().optional(),
  gstRate: z.coerce.number().default(18),
  includeSignature: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>

export default function HraReceiptGenerator() {
  const [receipts, setReceipts] = useState<any[]>([])
  const receiptRef = useRef<HTMLDivElement>(null)

  // Default values
  const defaultValues: Partial<FormValues> = {
    paymentMode: "Bank Transfer",
    receiptType: "Monthly",
    startDate: new Date(),
    includeGst: false,
    gstRate: 18,
    includeSignature: true,
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handlePrint = useReactToPrint({
    pageStyle: "@page { size: auto; margin: 20mm; }"
  })

  const handleDownloadPdf = async () => {
    if (!receiptRef.current) return

    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save("rent-receipt.pdf")
  }

  const onSubmit = (data: FormValues) => {
    const generatedReceipts = []
    const currentDate = data.startDate
    let months = 1

    if (data.receiptType === "Quarterly") months = 3
    if (data.receiptType === "Annual") months = 12

    for (let i = 0; i < months; i++) {
      const receiptDate = addMonths(currentDate, i)
      const periodStart = startOfMonth(receiptDate)
      const periodEnd = endOfMonth(receiptDate)

      const gstAmount = data.includeGst ? (data.rentAmount * data.gstRate) / 100 : 0
      const totalAmount = data.rentAmount + gstAmount

      generatedReceipts.push({
        ...data,
        receiptDate: format(new Date(), "dd/MM/yyyy"),
        periodStart: format(periodStart, "dd/MM/yyyy"),
        periodEnd: format(periodEnd, "dd/MM/yyyy"),
        receiptMonth: format(receiptDate, "MMMM yyyy"),
        gstAmount,
        totalAmount,
        receiptNumber: `RR${format(new Date(), "yyyyMMdd")}${i + 1}`,
      })
    }

    setReceipts(generatedReceipts)
  }

  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">HRA Rent Receipt Generator</h1>
          <p className="text-muted-foreground">Generate professional rent receipts for HRA tax exemption claims</p>
        </div>

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="guide">HRA Guide</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Receipt Details</CardTitle>
                  <CardDescription>Enter the details to generate rent receipt(s)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="receiptType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Receipt Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select receipt type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                                    <SelectItem value="Annual">Annual</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Start Month</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground",
                                        )}
                                      >
                                        {field.value ? format(field.value, "MMMM yyyy") : <span>Pick a month</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-medium">Tenant Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="tenantName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tenant Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Full name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="tenantPan"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tenant PAN (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="AAAAA0000A" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-medium">Landlord Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="landlordName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Landlord Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Full name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="landlordPan"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Landlord PAN
                                    <span className="text-xs text-muted-foreground ml-1">
                                      (Required for rent &gt; ₹1 lakh/year)
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="AAAAA0000A" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="propertyAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Complete address of rented property" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="rentAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly Rent Amount (₹)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="10000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="paymentMode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Payment Mode</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select payment mode" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Cash">Cash</SelectItem>
                                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                    <SelectItem value="UPI">UPI</SelectItem>
                                    <SelectItem value="Cheque">Cheque</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-medium">Additional Options</h3>

                          <FormField
                            control={form.control}
                            name="includeGst"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Include GST</FormLabel>
                                  <FormDescription>
                                    Add GST to the rent amount (for commercial properties)
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />

                          {form.watch("includeGst") && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="gstNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>GST Number</FormLabel>
                                    <FormControl>
                                      <Input placeholder="22AAAAA0000A1Z5" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="gstRate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>GST Rate (%)</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="18" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}

                          <FormField
                            control={form.control}
                            name="includeSignature"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Include Signature Space</FormLabel>
                                  <FormDescription>Add space for landlord signature on the receipt</FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Generate Receipt
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {receipts.length > 0 && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Generated Receipt</CardTitle>
                        <CardDescription>Preview your generated rent receipt</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={handlePrint}>
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                        <Button variant="default" size="sm" onClick={handleDownloadPdf}>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-md p-6 bg-white" ref={receiptRef}>
                        {receipts.map((receipt, index) => (
                          <div key={index} className={cn("receipt-container", index > 0 && "mt-8 pt-8 border-t")}>
                            <div className="text-center mb-6">
                              <h2 className="text-2xl font-bold uppercase">Rent Receipt</h2>
                              <p className="text-sm text-gray-500">Receipt No: {receipt.receiptNumber}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div>
                                <p className="text-sm text-gray-500">Date:</p>
                                <p className="font-medium">{receipt.receiptDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Period:</p>
                                <p className="font-medium">
                                  {receipt.periodStart} to {receipt.periodEnd}
                                </p>
                              </div>
                            </div>

                            <div className="mb-6">
                              <p className="text-sm text-gray-500">Received with thanks from:</p>
                              <p className="font-medium">{receipt.tenantName}</p>
                              {receipt.tenantPan && <p className="text-sm">PAN: {receipt.tenantPan}</p>}
                            </div>

                            <div className="mb-6">
                              <p className="text-sm text-gray-500">A sum of Rupees:</p>
                              <p className="font-medium">
                                {receipt.totalAmount.toLocaleString("en-IN", {
                                  maximumFractionDigits: 2,
                                  style: "currency",
                                  currency: "INR",
                                })}{" "}
                                ({numberToWords(receipt.totalAmount)} Only)
                              </p>
                            </div>

                            <div className="mb-6">
                              <p className="text-sm text-gray-500">Towards the rent for the month of:</p>
                              <p className="font-medium">{receipt.receiptMonth}</p>
                            </div>

                            <div className="mb-6">
                              <p className="text-sm text-gray-500">For the property located at:</p>
                              <p className="font-medium">{receipt.propertyAddress}</p>
                            </div>

                            <div className="mb-6">
                              <p className="text-sm text-gray-500">Payment Details:</p>
                              <table className="w-full border-collapse">
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-2">Rent Amount</td>
                                    <td className="py-2 text-right">
                                      {receipt.rentAmount.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                        style: "currency",
                                        currency: "INR",
                                      })}
                                    </td>
                                  </tr>

                                  {receipt.includeGst && (
                                    <tr className="border-b">
                                      <td className="py-2">GST @ {receipt.gstRate}%</td>
                                      <td className="py-2 text-right">
                                        {receipt.gstAmount.toLocaleString("en-IN", {
                                          maximumFractionDigits: 2,
                                          style: "currency",
                                          currency: "INR",
                                        })}
                                      </td>
                                    </tr>
                                  )}

                                  <tr className="font-medium">
                                    <td className="py-2">Total Amount</td>
                                    <td className="py-2 text-right">
                                      {receipt.totalAmount.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                        style: "currency",
                                        currency: "INR",
                                      })}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="mb-6">
                              <p className="text-sm text-gray-500">Payment Mode:</p>
                              <p className="font-medium">{receipt.paymentMode}</p>
                            </div>

                            <div className="mb-6">
                              <p className="text-sm text-gray-500">Landlord Details:</p>
                              <p className="font-medium">{receipt.landlordName}</p>
                              {receipt.landlordPan && <p className="text-sm">PAN: {receipt.landlordPan}</p>}
                              {receipt.includeGst && receipt.gstNumber && (
                                <p className="text-sm">GST: {receipt.gstNumber}</p>
                              )}
                            </div>

                            {receipt.includeSignature && (
                              <div className="mt-12 pt-8 border-t">
                                <div className="flex justify-end">
                                  <div className="text-center">
                                    <div className="h-16 border-b border-dashed mb-2 w-48"></div>
                                    <p className="text-sm">Landlord's Signature</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important Information</AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">For HRA exemption claims:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Landlord PAN is mandatory if annual rent exceeds ₹1 lakh</li>
                      <li>Keep original receipts for at least 8 years</li>
                      <li>Submit these receipts to your employer for HRA exemption</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>HRA Exemption Guide</CardTitle>
                <CardDescription>Understanding House Rent Allowance tax benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">What is HRA?</h3>
                  <p>
                    House Rent Allowance (HRA) is a component of salary provided by employers to employees to meet
                    rental expenses. It is exempt from income tax under Section 10(13A) of the Income Tax Act, subject
                    to certain conditions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">HRA Exemption Formula</h3>
                  <p className="mb-2">The HRA exemption is the minimum of the following three amounts:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Actual HRA received from the employer</li>
                    <li>50% of basic salary for metro cities (40% for non-metro cities)</li>
                    <li>Actual rent paid minus 10% of basic salary</li>
                  </ol>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Example Calculation</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Basic Salary:</strong> ₹50,000 per month
                    </p>
                    <p>
                      <strong>HRA Received:</strong> ₹20,000 per month
                    </p>
                    <p>
                      <strong>Rent Paid:</strong> ₹25,000 per month
                    </p>
                    <p>
                      <strong>Location:</strong> Metro city
                    </p>

                    <div className="mt-4 space-y-1">
                      <p>
                        <strong>Calculation:</strong>
                      </p>
                      <p>1. Actual HRA received = ₹20,000</p>
                      <p>2. 50% of Basic Salary = ₹25,000</p>
                      <p>3. Rent paid - 10% of Basic Salary = ₹25,000 - ₹5,000 = ₹20,000</p>
                      <p className="font-medium mt-2">HRA Exemption = ₹20,000 (minimum of the three)</p>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Metro vs Non-Metro Cities</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">For HRA exemption calculation, cities are classified as:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Metro Cities (50% of Basic)</h4>
                          <ul className="list-disc pl-5">
                            <li>Delhi & NCR</li>
                            <li>Mumbai</li>
                            <li>Kolkata</li>
                            <li>Chennai</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Non-Metro Cities (40% of Basic)</h4>
                          <p>All other cities and towns in India</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Special Cases</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Living in Own House</h4>
                          <p>If you live in your own house, you cannot claim HRA exemption.</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">Paying Rent to Parents</h4>
                          <p>You can claim HRA exemption even if you pay rent to your parents, provided:</p>
                          <ul className="list-disc pl-5">
                            <li>The house is owned by your parents</li>
                            <li>You have a genuine rent agreement</li>
                            <li>The rent payments are made through banking channels</li>
                            <li>The arrangement is not solely for tax benefits</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">No HRA Component in Salary</h4>
                          <p>
                            If your salary doesn't include HRA, you can still claim deduction under Section 80GG,
                            subject to certain conditions and limits.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentation Requirements</CardTitle>
                <CardDescription>Documents needed for HRA exemption claims</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Essential Documents</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <span className="font-medium">Rent Receipts:</span> Monthly receipts signed by the landlord
                      </li>
                      <li>
                        <span className="font-medium">Rent Agreement:</span> Valid rental agreement between you and the
                        landlord
                      </li>
                      <li>
                        <span className="font-medium">Landlord's PAN:</span> Required if annual rent exceeds ₹1 lakh
                      </li>
                      <li>
                        <span className="font-medium">Payment Proof:</span> Bank statements showing rent payments
                        (recommended)
                      </li>
                    </ul>
                  </div>

                  <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
                    <AlertTitle className="text-red-800">Important Notice</AlertTitle>
                    <AlertDescription>
                      <p>From FY 2023-24, if your annual rent exceeds ₹1 lakh, you must:</p>
                      <ul className="list-disc pl-5 mt-2">
                        <li>Collect and provide landlord's PAN details</li>
                        <li>Make rent payments through banking channels only</li>
                        <li>Submit Form 12BB to your employer</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Rent Receipt Format Requirements</h3>
                    <p className="mb-2">A valid rent receipt should contain:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Full name of the tenant</li>
                      <li>Full name and address of the landlord</li>
                      <li>Complete address of the rented property</li>
                      <li>Period of rent (month/quarter/year)</li>
                      <li>Amount of rent paid</li>
                      <li>Date of payment</li>
                      <li>Signature of the landlord</li>
                      <li>Landlord's PAN (if annual rent exceeds ₹1 lakh)</li>
                      <li>Revenue stamp (for amounts exceeding ₹5,000)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about HRA and rent receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it mandatory to submit rent receipts to claim HRA exemption?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes, rent receipts are mandatory documents for claiming HRA exemption. Your employer will
                        require these receipts as proof of rent payment. Additionally, the Income Tax Department may ask
                        for these receipts during assessment.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I claim HRA if I pay rent to my parents?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes, you can claim HRA exemption even if you pay rent to your parents, provided:</p>
                      <ul className="list-disc pl-5 mt-2">
                        <li>The house is owned by your parents</li>
                        <li>You have a genuine rent agreement</li>
                        <li>The rent payments are made through banking channels</li>
                        <li>Your parents declare this rental income in their tax returns</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is landlord's PAN mandatory on rent receipts?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Landlord's PAN is mandatory on rent receipts if your annual rent exceeds ₹1 lakh. If the
                        landlord doesn't have a PAN, they must provide a declaration in Form 60.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I generate rent receipts for previous months?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes, you can generate rent receipts for previous months or even for the entire financial year.
                        However, it's better to maintain monthly receipts and get them signed by your landlord
                        regularly.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Do I need to pay stamp duty on rent receipts?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        For rent receipts exceeding ₹5,000, a revenue stamp of ₹1 should be affixed. However, this is
                        rarely enforced in practice. For rent agreements, proper stamp duty as per state laws is
                        required.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>How long should I keep rent receipts?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        You should keep rent receipts for at least 8 years, which is the time limit for tax assessments
                        and notices. It's advisable to keep digital copies of all rent receipts and related documents.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>Can I claim HRA if I don't have rent receipts?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        It's difficult to claim HRA without rent receipts. However, if you have other proof of rent
                        payment like bank statements, rent agreements, and landlord details, you may still be able to
                        claim the exemption. It's always better to maintain proper rent receipts.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Helper function to convert numbers to words
function numberToWords(num: number): string {
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ]
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

  if (num === 0) return "Zero"

  function convertLessThanOneThousand(num: number): string {
    if (num < 20) {
      return units[num]
    }

    const ten = Math.floor(num / 10) % 10
    const unit = num % 10

    return (ten > 0 ? tens[ten] + " " : "") + (unit > 0 ? units[unit] : "")
  }

  let result = ""

  // Handle crores (10 million)
  const crore = Math.floor(num / 10000000)
  if (crore > 0) {
    result += convertLessThanOneThousand(crore) + " Crore "
    num %= 10000000
  }

  // Handle lakhs (100 thousand)
  const lakh = Math.floor(num / 100000)
  if (lakh > 0) {
    result += convertLessThanOneThousand(lakh) + " Lakh "
    num %= 100000
  }

  // Handle thousands
  const thousand = Math.floor(num / 1000)
  if (thousand > 0) {
    result += convertLessThanOneThousand(thousand) + " Thousand "
    num %= 1000
  }

  // Handle hundreds
  const hundred = Math.floor(num / 100)
  if (hundred > 0) {
    result += convertLessThanOneThousand(hundred) + " Hundred "
    num %= 100
  }

  // Handle tens and units
  if (num > 0) {
    if (result !== "") {
      result += "and "
    }
    result += convertLessThanOneThousand(num)
  }

  return result.trim()
}

import type { Metadata } from "next"
import IncomeTaxCalculator from "../_components/income-tax-calculator"

export const metadata: Metadata = {
  title: "Income Tax Calculator 2024-25 - Calculate Tax Liability | Free Online Tool",
  description:
    "Calculate your income tax liability with our comprehensive tax calculator. Support for old vs new tax regime, all deductions, and latest tax slabs for FY 2024-25.",
}

export default function IncomeTaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <IncomeTaxCalculator />
      </div>
    </div>
  )
}

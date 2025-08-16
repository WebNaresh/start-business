import type { Metadata } from "next"
import IncomeTaxCalculator from "../_components/income-tax-calculator"

export const metadata: Metadata = {
  title: "FY 2024-25 Income Tax Calculator (Old & New Regime) – StartBusiness",
  description:
    "Estimate your tax liability with detailed inputs like HRA, bonus; compare regimes; accurate for Indian taxpayers.",
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

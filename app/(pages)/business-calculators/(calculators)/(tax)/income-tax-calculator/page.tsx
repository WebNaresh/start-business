import type { Metadata } from "next"
import IncomeTaxCalculator from "../_components/income-tax-calculator"

export const metadata: Metadata = {
  title: "Free Income Tax Calculator India 2024-25 | Calculate Tax Online Old vs New Regime",
  description:
    "Calculate income tax liability for FY 2024-25 with our free online calculator. Compare old vs new tax regime, HRA exemption, deductions. Accurate for Indian taxpayers.",
  keywords: [
    'income tax calculator india',
    'tax calculator 2024-25',
    'income tax calculator ay 2024-25',
    'free income tax calculator',
    'calculate income tax india',
    'tax calculator old vs new regime',
    'indian income tax calculator',
    'income tax calculator with hra',
    'tax calculator india salary',
    'calculate tax liability',
    'income tax calculation online',
    'tax estimator 2024',
    'india tax calculator',
    'net salary calculator',
    'take home salary calculator',
    'ctc to net salary calculator',
    'gross salary calculator',
    'payroll tax calculator india'
  ],
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

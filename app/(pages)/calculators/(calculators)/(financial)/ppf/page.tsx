import type { Metadata } from "next"
import PPFCalculator from "../_components/ppf-calculator"

export const metadata: Metadata = {
  title: "PPF Calculator - Public Provident Fund Calculator | Financial Tools",
  description:
    "Calculate PPF maturity amount, interest earned, and tax savings with our comprehensive PPF calculator. Plan your 15-year investment with detailed projections.",
  keywords:
    "PPF calculator, Public Provident Fund, PPF maturity calculator, tax saving calculator, Section 80C, PPF interest rate",
}

export default function PPFCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <PPFCalculator />
    </div>
  )
}

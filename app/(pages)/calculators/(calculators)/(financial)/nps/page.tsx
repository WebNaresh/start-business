import type { Metadata } from "next"
import NPSCalculator from "../_calculators/nps-calculator"


export const metadata: Metadata = {
  title: "NPS Calculator - National Pension System Calculator | Financial Tools",
  description:
    "Calculate your NPS corpus, monthly pension, and tax savings with our comprehensive National Pension System calculator. Plan your retirement with intelligent insights.",
  keywords:
    "NPS calculator, National Pension System, retirement planning, pension calculator, tax savings, annuity calculator",
}

export default function NPSCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <NPSCalculator />
    </div>
  )
}

import type { Metadata } from "next"
import CalculatorsHero from "./_components/calculators-hero"
import CalculatorGrid from "./_components/calculator-grid"
import CalculatorFeatures from "./_components/calculator-features"


export const metadata: Metadata = {
  title: "Financial Calculators & Tools | Expert Business Calculators",
  description:
    "Access comprehensive financial calculators and tools for loans, investments, taxes, and business planning. Make informed financial decisions with our intelligent calculators.",
}

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <CalculatorsHero />
      <CalculatorGrid />
      <CalculatorFeatures />
    </div>
  )
}

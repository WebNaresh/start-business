import type { Metadata } from "next"
import GratuityCalculator from "../_components/gratuity-calculator"


export const metadata: Metadata = {
  title: "Gratuity Calculator - Calculate Employment Gratuity Amount | Free Tool",
  description:
    "Calculate your gratuity amount with our comprehensive gratuity calculator. Support for both government and private sector employees with latest rules.",
}

export default function GratuityCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <GratuityCalculator />
      </div>
    </div>
  )
}

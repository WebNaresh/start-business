import type { Metadata } from "next"
import GratuityCalculator from "../_components/gratuity-calculator"


export const metadata: Metadata = {
  title: "Free Gratuity Calculator India 2024 | Calculate Gratuity Amount Online",
  description:
    "Calculate gratuity amount for private & government employees with our free calculator. Check gratuity eligibility, calculation formula. Accurate gratuity calculator India.",
  keywords: [
    'gratuity calculator',
    'gratuity calculator india',
    'gratuity calculator online',
    'calculate gratuity',
    'gratuity calculation',
    'gratuity amount calculator',
    'gratuity calculator for private employees',
    'government gratuity calculator',
    'company gratuity calculator',
    'gratuity calculation india',
    'gratuity calculation for private employees',
    'gratuity calculation chart',
    'how to calculate gratuity',
    'gratuity eligibility calculator',
    'employment gratuity calculator',
    'gratuity formula calculator',
    'free gratuity calculator',
    'online gratuity calculator india'
  ],
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

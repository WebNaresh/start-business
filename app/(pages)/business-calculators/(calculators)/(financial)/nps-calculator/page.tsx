import type { Metadata } from "next"
import NPSCalculator from "../_components/nps-calculator"


export const metadata: Metadata = {
  title: "Free NPS Calculator India 2024 | Calculate National Pension System Returns",
  description:
    "Calculate NPS corpus, pension amount, tax savings with our free NPS calculator. National Pension System calculator with current balance, returns. Plan retirement India.",
  keywords: [
    'nps calculator',
    'nps calculator india',
    'national pension system calculator',
    'nps pension calculator',
    'nps returns calculator',
    'nps calculator with current balance',
    'nps calculator with existing balance',
    'nps corpus calculator',
    'nps amount calculator',
    'nps investment calculator',
    'nps withdrawal calculator',
    'nps annuity calculator',
    'nps gratuity calculator',
    'nps scheme calculator',
    'nps tax benefit calculator',
    'calculate nps returns',
    'how nps is calculated',
    'nps maturity calculator'
  ],
}

export default function NPSCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <NPSCalculator />
    </div>
  )
}

import type { Metadata } from "next"
import HRACalculator from "../_components/hra-calculator"


export const metadata: Metadata = {
  title: "HRA Calculator - Calculate House Rent Allowance Exemption | Free Tool",
  description:
    "Calculate your HRA exemption with our comprehensive HRA calculator. Determine tax savings on house rent allowance for metro and non-metro cities.",
}

export default function HRACalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <HRACalculator />
      </div>
    </div>
  )
}

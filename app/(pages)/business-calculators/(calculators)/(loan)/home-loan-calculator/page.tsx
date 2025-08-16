import type { Metadata } from "next"
import HomeLoanCalculator from "../_components/home-loan-calculator"


export const metadata: Metadata = {
  title: "Free Home Loan Calculator India 2024 | Calculate EMI, Eligibility, Tax Benefits",
  description:
    "Calculate home loan EMI, eligibility, prepayment benefits & tax savings with our free calculator. Get detailed amortization schedule. Best home loan calculator India.",
  keywords: [
    'home loan calculator',
    'home loan emi calculator',
    'home loan eligibility calculator',
    'home loan calculator india',
    'mortgage calculator india',
    'property loan calculator',
    'home loan emi calculator with prepayment',
    'home loan tax benefit calculator',
    'housing loan calculator',
    'home finance calculator',
    'home loan interest calculator',
    'home loan affordability calculator',
    'home loan payment calculator',
    'home loan amortization calculator',
    'home loan tenure calculator',
    'home loan prepayment calculator',
    'house loan calculator',
    'real estate loan calculator'
  ],
}

export default function HomeLoanCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <HomeLoanCalculator />
    </div>
  )
}

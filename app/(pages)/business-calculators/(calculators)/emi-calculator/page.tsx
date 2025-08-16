import type { Metadata } from "next"
import EMICalculator from "./_components/emi-calculator"


export const metadata: Metadata = {
  title: "Free EMI Calculator India 2024 | Calculate Loan EMI Online with Amortization",
  description:
    "Calculate loan EMI for home, car, personal loans with our free EMI calculator. Get detailed amortization schedule, interest breakdown. Best EMI calculator India.",
  keywords: [
    'emi calculator india',
    'free emi calculator',
    'loan emi calculator',
    'emi calculator online',
    'home loan emi calculator',
    'car loan emi calculator',
    'personal loan emi calculator',
    'loan calculator india',
    'emi calculation online',
    'loan amortization calculator',
    'monthly emi calculator',
    'loan interest calculator',
    'emi calculator with prepayment',
    'business loan emi calculator',
    'education loan emi calculator',
    'calculate emi online',
    'loan tenure calculator',
    'emi estimator'
  ],
}

export default function EMICalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <EMICalculator />
    </div>
  )
}

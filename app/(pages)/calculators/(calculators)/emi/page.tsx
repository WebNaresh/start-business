import type { Metadata } from "next"
import EMICalculator from "./_components/emi-calculator"


export const metadata: Metadata = {
  title: "EMI Calculator | Calculate Loan EMI with Amortization Schedule",
  description:
    "Calculate your loan EMI with detailed amortization schedule. Compare different loan amounts, interest rates, and tenures.",
}

export default function EMICalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <EMICalculator />
    </div>
  )
}

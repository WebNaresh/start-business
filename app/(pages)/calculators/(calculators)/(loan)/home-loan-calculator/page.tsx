import type { Metadata } from "next"
import HomeLoanCalculator from "../_components/home-loan-calculator"


export const metadata: Metadata = {
  title: "Home Loan Calculator - EMI, Eligibility & Tax Benefits | Financial Tools",
  description:
    "Calculate home loan EMI, check eligibility, analyze prepayment benefits, and understand tax savings. Comprehensive home loan planning tool with detailed amortization schedule.",
  keywords:
    "home loan calculator, home loan EMI, loan eligibility, prepayment calculator, tax benefits, property loan, mortgage calculator",
}

export default function HomeLoanCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <HomeLoanCalculator />
    </div>
  )
}

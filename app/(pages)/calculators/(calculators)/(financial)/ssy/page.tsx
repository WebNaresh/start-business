import type { Metadata } from "next"
import SSYCalculator from "../_components/ssy-calculator"


export const metadata: Metadata = {
  title: "SSY Calculator - Sukanya Samriddhi Yojana Calculator | Financial Tools",
  description:
    "Calculate Sukanya Samriddhi Yojana returns for your girl child. Plan for education and marriage expenses with our intelligent SSY calculator.",
  keywords:
    "SSY calculator, Sukanya Samriddhi Yojana, girl child investment, education planning, marriage planning, tax savings",
}

export default function SSYCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-slate-50">
      <SSYCalculator />
    </div>
  )
}

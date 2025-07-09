import type { Metadata } from "next"
import BusinessLoanCalculator from "../_components/business-loan-calculator"


export const metadata: Metadata = {
  title: "Business Loan Calculator | EMI, Interest & Eligibility Calculator",
  description:
    "Calculate business loan EMI, interest rates, and eligibility. Compare term loans, working capital, and equipment financing options with detailed analysis.",
  keywords:
    "business loan calculator, EMI calculator, working capital loan, term loan, equipment financing, business loan eligibility",
}

export default function BusinessLoanPage() {
  return <BusinessLoanCalculator />
}

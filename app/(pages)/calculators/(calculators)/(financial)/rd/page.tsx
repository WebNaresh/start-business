
import { Metadata } from "next"
import RecurringDepositCalculator from "../_components/recurring-deposit-calculator"
export const metadata: Metadata = {
    title: "Recurring Deposit Calculator | Calculate Recurring Deposit Returns",
    description: "Calculate your recurring deposit returns with detailed projections. Plan your recurring deposit investments with intelligent insights and growth analysis.",
    keywords: "recurring deposit calculator, recurring deposit returns, recurring deposit investment, recurring deposit calculator, recurring deposit returns, recurring deposit growth, recurring deposit investment",
    openGraph: {
        images: ["/calculator_og.png"],
      },
}
export default function Page() {
  return <RecurringDepositCalculator />
} 
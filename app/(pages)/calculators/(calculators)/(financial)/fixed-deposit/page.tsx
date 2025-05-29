import { Metadata } from "next";
import FixedDepositCalculator from "../_calculators/fixed-deposit-calculator";

export const metadata: Metadata = {
  title: "Fixed Deposit Calculator | Calculate Fixed Deposit Returns",
  description: "Calculate your fixed deposit returns with detailed projections. Plan your fixed deposit investments with intelligent insights and growth analysis.",
  keywords: "fixed deposit calculator, fixed deposit returns, fixed deposit investment, fixed deposit calculator, fixed deposit returns, fixed deposit growth, fixed deposit investment",
  openGraph: {
    images: ["/calculator_og.png"],
  },
}
export default function FixedDepositCalculatorPage() {
  return <FixedDepositCalculator />
}

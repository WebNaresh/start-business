import type { Metadata } from "next"
import CarLoanCalculator from "../_components/car-loan-calculator"


export const metadata: Metadata = {
  title: "Car Loan Calculator - Calculate EMI, Interest & Total Cost | Free Tool",
  description:
    "Calculate car loan EMI, total interest, and affordability with our comprehensive car loan calculator. Compare different loan options and plan your car purchase.",
  keywords: "car loan calculator, auto loan EMI, car finance calculator, vehicle loan, car EMI calculator",
}

export default function CarLoanPage() {
  return <CarLoanCalculator />
}

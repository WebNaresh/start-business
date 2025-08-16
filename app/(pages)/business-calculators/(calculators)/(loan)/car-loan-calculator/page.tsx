import type { Metadata } from "next"
import CarLoanCalculator from "../_components/car-loan-calculator"


export const metadata: Metadata = {
  title: "Free Car Loan Calculator India 2024 | Calculate Car EMI, Interest Online",
  description:
    "Calculate car loan EMI, interest, total cost with our free car loan calculator. Check car loan eligibility, compare rates. Best auto loan calculator India 2024.",
  keywords: [
    'car loan calculator india',
    'car emi calculator',
    'auto loan calculator',
    'vehicle loan calculator',
    'car finance calculator india',
    'car loan emi calculator',
    'free car loan calculator',
    'car loan eligibility calculator',
    'auto loan emi calculator',
    'car financing calculator',
    'vehicle finance calculator',
    'car loan interest calculator',
    'used car loan calculator',
    'new car loan calculator',
    'car loan affordability calculator',
    'auto finance calculator',
    'car payment calculator',
    'vehicle emi calculator'
  ],
}

export default function CarLoanPage() {
  return <CarLoanCalculator />
}

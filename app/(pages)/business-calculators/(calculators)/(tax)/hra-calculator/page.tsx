import type { Metadata } from "next"
import HRACalculator from "../_components/hra-calculator"


export const metadata: Metadata = {
  title: "Free HRA Calculator India 2024-25 | Calculate House Rent Allowance Exemption",
  description:
    "Calculate HRA exemption for income tax with our free HRA calculator. Check house rent allowance tax savings for metro, non-metro cities. Generate rent receipts online.",
  keywords: [
    'hra calculator',
    'hra calculator income tax',
    'house rent allowance calculator',
    'hra exemption calculator',
    'hra tax calculator',
    'calculate hra exemption',
    'hra calculation online',
    'hra tax exemption calculator',
    'hra deduction calculator',
    'rent allowance calculator',
    'house rent calculator income tax',
    'hra calc',
    'hra calculater',
    'calculate hra for income tax',
    'hra exemption calculator online',
    'income tax hra calculator',
    'hra rent receipt calculator',
    'basic salary hra calculation',
    'hra calculation formula'
  ],
}

export default function HRACalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <HRACalculator />
      </div>
    </div>
  )
}

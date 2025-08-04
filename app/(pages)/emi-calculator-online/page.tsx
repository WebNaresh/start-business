import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "EMI Calculator Online - Free Loan EMI Calculator India | StartBusiness",
  description: "Free online EMI calculator to calculate loan EMI for home, car, personal loans. Get detailed amortization schedule and compare loan offers.",
  keywords: [
    'emi calculator online',
    'loan emi calculator',
    'emi calculator india',
    'online emi calculator',
    'free emi calculator',
    'loan calculator online',
    'monthly emi calculator'
  ],
  alternates: {
    canonical: 'https://www.startbusiness.co.in/business-calculators/emi-calculator'
  }
}

export default function EMICalculatorOnlinePage() {
  redirect('/business-calculators/emi-calculator')
}
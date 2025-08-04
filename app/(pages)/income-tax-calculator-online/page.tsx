import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Income Tax Calculator Online - Free Tax Calculator India 2024-25 | StartBusiness",
  description: "Free online income tax calculator for FY 2024-25. Calculate tax liability, compare old vs new regime, get accurate tax calculations with latest tax slabs.",
  keywords: [
    'income tax calculator online',
    'income tax calculator india',
    'tax calculator online',
    'income tax calculator 2024-25',
    'free tax calculator',
    'online tax calculator india',
    'tax calculator india online'
  ],
  alternates: {
    canonical: 'https://www.startbusiness.co.in/business-calculators/income-tax-calculator'
  }
}

export default function IncomeTaxCalculatorOnlinePage() {
  redirect('/business-calculators/income-tax-calculator')
}
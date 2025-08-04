import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateCalculatorMetaTags } from "@/lib/seo-utils"
import { calculatorSEOConfigs } from "@/lib/calculator-seo-config"

const calculatorConfig = calculatorSEOConfigs['ppf-calculator']

export const metadata: Metadata = {
  title: "PPF Calculator Online - Free Public Provident Fund Calculator | StartBusiness",
  description: "Free online PPF calculator to calculate Public Provident Fund maturity amount, interest rate, and returns. Plan your 15-year PPF investment with accurate calculations.",
  keywords: [
    'ppf calculator online',
    'public provident fund calculator',
    'ppf maturity calculator',
    'ppf interest calculator',
    'ppf calculator india',
    'online ppf calculator',
    'free ppf calculator',
    'ppf investment calculator',
    'ppf return calculator'
  ],
  alternates: {
    canonical: 'https://www.startbusiness.co.in/business-calculators/ppf-calculator'
  }
}

export default function PPFCalculatorOnlinePage() {
  // Redirect to the main PPF calculator page for SEO consolidation
  redirect('/business-calculators/ppf-calculator')
}
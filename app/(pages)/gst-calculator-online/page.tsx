import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "GST Calculator Online - Free GST Tax Calculator India | StartBusiness",
  description: "Free online GST calculator to calculate GST amount, tax inclusive/exclusive prices for all GST rates - 5%, 12%, 18%, 28%. Accurate GST calculations for India.",
  keywords: [
    'gst calculator online',
    'gst tax calculator',
    'gst calculator india',
    'online gst calculator',
    'free gst calculator',
    'gst amount calculator',
    'gst rate calculator',
    'calculate gst online'
  ],
  alternates: {
    canonical: 'https://www.startbusiness.co.in/business-calculators/gst-calculator'
  }
}

export default function GSTCalculatorOnlinePage() {
  redirect('/business-calculators/gst-calculator')
}
import type { Metadata } from "next"
import GSTCalculator from "../_components/gst-calculator"


export const metadata: Metadata = {
  title: "Free GST Calculator Online India 2024 | Calculate GST Inclusive Exclusive Tax",
  description:
    "Calculate GST online with our free calculator. GST inclusive, exclusive & reverse calculation. Supports 5%, 12%, 18%, 28% rates. CGST, SGST, IGST breakdown for India.",
  keywords: [
    'gst calculator online india',
    'free gst calculator',
    'gst calculator inclusive',
    'gst calculator exclusive',
    'calculate gst online',
    'gst calculation online',
    'cgst sgst calculator',
    'igst calculator',
    'gst percentage calculator',
    'gst tax calculator india',
    'gst converter',
    'including gst calculator',
    'gst add calculator',
    'subtract gst calculator',
    'gst value calculator',
    'online gst calculator',
    'gst calc',
    'calculate gst inclusive amount',
    'gst adjustment calculator'
  ],
}

export default function GSTCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <GSTCalculator />
      </div>
    </div>
  )
}

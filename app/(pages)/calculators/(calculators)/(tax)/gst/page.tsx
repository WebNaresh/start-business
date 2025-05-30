import type { Metadata } from "next"
import GSTCalculator from "../_components/gst-calculator"


export const metadata: Metadata = {
  title: "GST Calculator - Calculate GST Inclusive & Exclusive | Free Online Tool",
  description:
    "Calculate GST amounts with our comprehensive GST calculator. Support for all GST rates (5%, 12%, 18%, 28%), inclusive/exclusive calculations, and CGST/SGST breakdown.",
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

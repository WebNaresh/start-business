import type { Metadata } from "next"
import GSTCalculator from "../_components/gst-calculator"


export const metadata: Metadata = {
  title: "Free GST Calculator: Your Simple and Accurate Tool for India",
  description:
    "Calculate GST amounts with our free online GST calculator. Easy-to-use tool for buyers, sellers, manufacturers & wholesalers. Supports all GST rates (5%, 12%, 18%, 28%).",
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

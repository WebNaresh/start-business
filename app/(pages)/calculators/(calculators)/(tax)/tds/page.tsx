import { Metadata } from "next";
import TDSCalculator from '../_components/tds-calculator'

export const metadata: Metadata = {
    title: "TDS Calculator - Calculate TDS Amount | Free Tool",
    description:
      "Calculate your TDS amount with our comprehensive TDS calculator. Support for all TDS rates, and latest TDS slabs for FY 2024-25.",
  }

export default function TDSPage() {
    return (
        <div className="min-h-screen bg-white">
            <TDSCalculator />
        </div>
    )
}
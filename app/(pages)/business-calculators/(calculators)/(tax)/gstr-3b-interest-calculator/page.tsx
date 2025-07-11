import { Metadata } from "next";
import GSTR3BInterestCalculator from '../_components/gstr3b-interest-calculator'

export const metadata: Metadata = {
    title: "GSTR-3B Interest Calculator - Calculate GST Interest Amount | Free Tool",
    description:
      "Calculate your GST interest amount with our comprehensive GSTR-3B interest calculator. Support for all GST rates (5%, 12%, 18%, 28%), inclusive/exclusive calculations, and CGST/SGST breakdown.",
  }

export default function GSTR3BInterestPage() {
    return (
        <div className="min-h-screen bg-white">
            <GSTR3BInterestCalculator />
        </div>
    )
}
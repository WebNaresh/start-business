import { Metadata } from "next";
import { TdsCalculator } from "../_components/tds-calculator";
export const metadata: Metadata = {
    title: "TDS Calculator - Calculate TDS Amount | Free Tool",
    description:
      "Calculate your TDS amount with our comprehensive TDS calculator. Support for all TDS rates, and latest TDS slabs for FY 2024-25.",
  }
export default function page(){
    return (
        <>
        <TdsCalculator/>
        </>
    )
}
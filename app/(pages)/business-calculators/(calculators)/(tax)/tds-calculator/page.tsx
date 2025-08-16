import { Metadata } from "next";
import TDSCalculator from '../_components/tds-calculator'

export const metadata: Metadata = {
    title: "Free TDS Calculator India 2024-25 | Calculate TDS Amount Online",
    description:
      "Calculate TDS amount for salary, FD, rent, professional fees with our free TDS calculator. All TDS rates, sections for FY 2024-25. Accurate TDS calculation online.",
    keywords: [
      'tds calculator',
      'tds calculator online',
      'calculate tds',
      'tds calculation online',
      'tds amount calculator',
      'tds on salary calculator',
      'tds on fd calculator',
      'tds payment calculator',
      'tds return calculator',
      'tds tax calculator',
      'tds calculations',
      'calculate tds online',
      'tds calculator india',
      'tds rate calculator',
      'income tax tds calculator',
      'tds deduction calculator',
      'tds calculator for fy 2024-25',
      'free tds calculator'
    ],
  }

export default function TDSPage() {
    return (
        <div className="min-h-screen bg-white">
            <TDSCalculator />
        </div>
    )
}
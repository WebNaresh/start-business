import type { Metadata } from "next"
import SIPCalculator from "./_components/sip-calculator"


export const metadata: Metadata = {
  title: "SIP Calculator | Systematic Investment Plan Calculator with Growth Projections",
  description:
    "Calculate your SIP returns with detailed projections. Plan your mutual fund investments with intelligent insights and growth analysis.",
  keywords: "sip calculator, mutual fund calculator, systematic investment plan, sip returns, sip growth, sip investment, sip calculator, sip returns, sip growth, sip investment",
  openGraph: {
    images: ["/calculator_og.png"],
  },
  appleWebApp: {
    title: "SIP Calculator | Systematic Investment Plan Calculator with Growth Projections",
    
   
  },    
  
}

export default function SIPCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      <SIPCalculator />
    </div>
  )
}

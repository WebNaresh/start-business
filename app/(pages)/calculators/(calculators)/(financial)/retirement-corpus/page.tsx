import { Metadata } from "next";
import RetirementCorpusCalculator from "../_calculators/retirement-corpus-calculator";
export const metadata: Metadata = {
    title: "Retirement Corpus Calculator | Calculate Retirement Corpus",
    description: "Calculate your retirement corpus with detailed projections. Plan your retirement investments with intelligent insights and growth analysis.",
    keywords: "retirement corpus calculator, retirement corpus, retirement investment, retirement calculator, retirement corpus, retirement growth, retirement investment",
    openGraph: {
        images: ["/calculator_og.png"],
      },
}
export default function RetirementCorpusCalculatorPage() {
    return (
        <>
        <RetirementCorpusCalculator/>
        </>
    )
}
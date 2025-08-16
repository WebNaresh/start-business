import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Which ITR Form to File? Free ITR Eligibility Quiz 2025",
  description: "Confused about which ITR form to file? Take our quick ITR Eligibility Quiz for FY 2024-25 and find the right form (ITR-1, 2, 3, or 4) for your income profile.",
  keywords: "ITR eligibility quiz, which ITR form to file, income tax return, ITR-1, ITR-2, ITR-3, ITR-4, tax filing, FY 2024-25, AY 2025-26, presumptive taxation, agricultural income, capital gains",
  openGraph: {
    title: "Which ITR Form to File? Free ITR Eligibility Quiz 2025",
    description: "Confused about which ITR form to file? Take our quick ITR Eligibility Quiz for FY 2024-25 and find the right form (ITR-1, 2, 3, or 4) for your income profile.",
    type: "website",
    images:["/og/quiz/itr-quiz-og.png"]
  },
}

export default function ITREligibilityQuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
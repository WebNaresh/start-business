import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ITR Eligibility Quiz FY 2024-25 | Find the Right ITR Form",
  description: "Determine your Income Tax Return filing requirements for FY 2024-25. Get personalized recommendations for ITR-1, ITR-2, ITR-3, or ITR-4 forms based on your income sources and tax status.",
  keywords: "ITR eligibility quiz, income tax return, ITR form, ITR-1, ITR-2, ITR-3, ITR-4, tax filing, FY 2024-25, income tax calculator",
  openGraph: {
    title: "ITR Eligibility Quiz FY 2024-25 | Find the Right ITR Form",
    description: "Determine your Income Tax Return filing requirements for FY 2024-25. Get personalized recommendations for the right ITR form.",
    type: "website",
  },
}

export default function ITREligibilityQuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Structure Decision Quiz | Find Your Perfect Company Type",
  description: "Get personalized recommendations for your business structure. Our AI-powered quiz helps you choose between Sole Proprietorship, OPC, Partnership, LLP, or Private Limited Company based on your needs.",
  keywords: "business structure quiz, company registration, sole proprietorship, OPC, partnership, LLP, private limited company, business formation",
  openGraph: {
    title: "Business Structure Decision Quiz | Find Your Perfect Company Type",
    description: "Get personalized recommendations for your business structure. Our AI-powered quiz helps you choose the right company type for your needs.",
    type: "website",
  },
}

export default function BusinessStructureQuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
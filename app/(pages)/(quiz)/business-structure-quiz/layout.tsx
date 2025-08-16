import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Structure Quiz – Find the Right Company Type in India",
  description: "Take our free Business Structure Quiz to find the best entity – Proprietorship, OPC, LLP, or Private Limited. CA-verified advice for Indian startups.",
  keywords: "business structure quiz, best business structure in India, company registration options, startup entity selection, sole proprietorship, OPC, partnership, LLP, private limited company, business formation India",
  openGraph: {
    title: "Business Structure Quiz – Find the Right Company Type in India",
    description: "Take our free Business Structure Quiz to find the best entity – Proprietorship, OPC, LLP, or Private Limited. CA-verified advice for Indian startups.",
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
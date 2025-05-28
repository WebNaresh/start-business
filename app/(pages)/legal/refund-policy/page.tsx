import type { Metadata } from "next"
import RefundPolicy from "./_components/refund-policy"

export const metadata: Metadata = {
  title: "Refund Policy - StartBusiness | Transparent Refund Terms",
  description: "Learn about our refund policy, terms, and conditions. We ensure transparent and fair refund processes for all our business services.",
  keywords: [
    "refund policy",
    "money back guarantee",
    "refund terms",
    "service refund",
    "business services refund",
    "refund process",
    "refund conditions",
    "refund eligibility",
  ],
  openGraph: {
    title: "Refund Policy - StartBusiness",
    description: "Learn about our refund policy, terms, and conditions. We ensure transparent and fair refund processes for all our business services.",
    type: "website",
    locale: "en_IN",
    siteName: "StartBusiness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy - StartBusiness",
    description: "Learn about our refund policy, terms, and conditions. We ensure transparent and fair refund processes for all our business services.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://startbusiness.co.in/legal/refund-policy",
  },
}

export default function Page() {
  return <RefundPolicy />
}

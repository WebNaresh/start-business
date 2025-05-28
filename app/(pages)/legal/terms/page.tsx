

import type { Metadata } from "next"
import TermsAndConditions from "./_components/terms"

export const metadata: Metadata = {
  title: "Terms & Conditions - StartBusiness | Legal Terms of Service",
  description: "Read our terms and conditions to understand the legal agreement between you and StartBusiness. Clear guidelines for using our business services.",
  keywords: [
    "terms and conditions",
    "legal terms",
    "service agreement",
    "business terms",
    "legal agreement",
    "terms of service",
    "user agreement",
    "legal compliance",
  ],
  openGraph: {
    title: "Terms & Conditions - StartBusiness",
    description: "Read our terms and conditions to understand the legal agreement between you and StartBusiness. Clear guidelines for using our business services.",
    type: "website",
    locale: "en_IN",
    siteName: "StartBusiness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions - StartBusiness",
    description: "Read our terms and conditions to understand the legal agreement between you and StartBusiness. Clear guidelines for using our business services.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://startbusiness.co.in/legal/terms",
  },
}

export default function Page() {
  return (
  <TermsAndConditions/>
  )
} 
import type { Metadata } from "next"
import PrivacyPolicy from "./_components/privacy-policy"

export const metadata: Metadata = {
  title: "Privacy Policy - StartBusiness | Data Protection & Privacy",
  description: "Learn about how we collect, use, and protect your personal information. Our privacy policy ensures transparency and security of your data.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "data security",
    "privacy rights",
    "GDPR compliance",
    "data privacy",
    "information security",
  ],
  openGraph: {
    title: "Privacy Policy - StartBusiness",
    description: "Learn about how we collect, use, and protect your personal information. Our privacy policy ensures transparency and security of your data.",
    type: "website",
    locale: "en_IN",
    siteName: "StartBusiness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - StartBusiness",
    description: "Learn about how we collect, use, and protect your personal information. Our privacy policy ensures transparency and security of your data.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://startbusiness.co.in/privacy-policy",
  },
}

export default function Page() {
  return <PrivacyPolicy />
}
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "StartBusiness - Business Registration & Compliance Services",
  description:
    "Professional business registration, compliance, and legal services to help your business thrive in India",
  keywords: "company registration, trademark, compliance, business services, startup registration, legal services",
  authors: [{ name: "StartBusiness" }],
  creator: "StartBusiness",
  publisher: "StartBusiness",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://StartBusiness",
    siteName: "StartBusiness",
    title: "StartBusiness - Business Registration & Compliance Services",
    description:
      "Professional business registration, compliance, and legal services to help your business thrive in India",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StartBusiness - Business Registration & Compliance Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StartBusiness - Business Registration & Compliance Services",
    description:
      "Professional business registration, compliance, and legal services to help your business thrive in India",
    images: ["/og-image.jpg"],
  },
}

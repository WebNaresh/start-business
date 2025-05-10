import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "StartBusiness.co.in - Business Registration & Compliance Services",
  description:
    "Professional business registration, compliance, and legal services to help your business thrive in India",
  keywords: "company registration, trademark, compliance, business services, startup registration, legal services",
  authors: [{ name: "StartBusiness.co.in" }],
  creator: "StartBusiness.co.in",
  publisher: "StartBusiness.co.in",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://startbusiness.co.in",
    siteName: "StartBusiness.co.in",
    title: "StartBusiness.co.in - Business Registration & Compliance Services",
    description:
      "Professional business registration, compliance, and legal services to help your business thrive in India",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StartBusiness.co.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StartBusiness.co.in - Business Registration & Compliance Services",
    description:
      "Professional business registration, compliance, and legal services to help your business thrive in India",
    images: ["/og-image.jpg"],
  },
}

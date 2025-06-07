import type { Metadata } from "next"
import ServicesHero from "./_components/services-hero"
import ServicesNavigation from "./_components/services-navigation"
import EnhancedServicesSection from "@/components/home/services-section"


export const metadata: Metadata = {
  title: "Business Services - StartBusiness | Complete Business Solutions in India",
  description:
    "Comprehensive business services including company registration, GST filing, trademark registration, compliance management, and more. Expert guidance for entrepreneurs across India.",
  keywords: [
    "business services India",
    "company registration",
    "GST registration",
    "trademark registration",
    "business compliance",
    "startup services",
    "business setup",
    "tax filing services",
    "business licenses",
    "entrepreneur services",
  ],
  openGraph: {
    title: "Complete Business Services - StartBusiness",
    description:
      "From business registration to compliance management, get all your business services under one roof. Expert guidance, fast processing, and 100% compliance assurance.",
    type: "website",
    locale: "en_IN",
    siteName: "StartBusiness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Business Services - StartBusiness",
    description: "Expert business services for entrepreneurs. Company registration, compliance, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://startbusiness.co.in/services",
  },
}

const servicesFaqs = [
  {
    question: "What business registration services do you offer?",
    answer:
      "We offer complete business registration services including Private Limited Company, LLP, OPC, Sole Proprietorship, Partnership Firm, and specialized registrations like Nidhi Company and Producer Company. Each service includes end-to-end documentation and government filing.",
  },
  {
    question: "How long does company registration take?",
    answer:
      "Company registration typically takes 10-15 working days for Private Limited Company and 15-20 days for LLP, depending on document completeness and government processing time. We provide real-time updates throughout the process.",
  },
  {
    question: "Do you provide ongoing compliance support?",
    answer:
      "Yes, we provide comprehensive compliance support including annual filings, GST returns, income tax filing, board resolutions, and regulatory compliance management. Our team ensures you never miss any important deadlines.",
  },
  {
    question: "What is included in your trademark registration service?",
    answer:
      "Our trademark registration includes comprehensive trademark search, application filing, government fee, status tracking, objection handling (if any), and final certificate delivery. We also provide ongoing trademark watch services.",
  },

  {
    question: "What are your service charges and payment terms?",
    answer:
      "We offer transparent pricing with no hidden costs. Payment can be made in installments, and we provide detailed cost breakdowns upfront. Government fees are separate and clearly mentioned in our quotations.",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServicesNavigation />
      {/* <ServicesHero /> */}
   
  <EnhancedServicesSection/>
    </div>
  )
}

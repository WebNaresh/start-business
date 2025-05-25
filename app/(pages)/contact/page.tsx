import type { Metadata } from "next"

import ContactInfo from "./_components/contact-info"
import ContactForm from "./_components/contact-form"
import ContactMap from "./_components/contact-map"
import ContactFAQ from "./_components/contact-faq"


export const metadata: Metadata = {
  title: "Contact Us - StartBusiness | Expert Business Registration & Compliance Services",
  description:
    "Get in touch with StartBusiness for professional business registration, trademark, compliance, and legal services. 24/7 support, expert guidance, and 100% compliance assurance.",
  keywords: [
    "contact StartBusiness",
    "business registration support",
    "trademark consultation",
    "compliance services contact",
    "business legal help",
    "company registration assistance",
    "Pune business services",
  ],
  openGraph: {
    title: "Contact StartBusiness - Expert Business Services",
    description:
      "Connect with our expert team for business registration, compliance, and legal services. Get instant support via WhatsApp or schedule a consultation.",
    type: "website",
    locale: "en_IN",
    siteName: "StartBusiness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact StartBusiness - Expert Business Services",
    description: "Get professional business registration and compliance services. Contact our expert team today.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://startbusiness.co.in/contact",
  },
}

const faqs = [
  {
    question: "How long does it take to register a company?",
    answer:
      "The process typically takes 10-15 working days, depending on the type of company and the completeness of documentation provided. We ensure all paperwork is handled efficiently to minimize delays.",
  },
  {
    question: "What documents are required for trademark registration?",
    answer:
      "You'll need proof of identity, address proof, business registration documents, the trademark logo/design (if applicable), and a list of goods/services for which the trademark will be used. Our team will guide you through the complete documentation process.",
  },
  {
    question: "Do you provide services outside of India?",
    answer:
      "Yes, we provide international trademark registration and company incorporation services in select foreign jurisdictions including USA, UK, Singapore, and Dubai. Please contact us for specific requirements and pricing.",
  },
  {
    question: "What are the annual compliance requirements for a Private Limited Company?",
    answer:
      "Private Limited Companies must file Annual Returns (MGT-7), Financial Statements (AOC-4), conduct Annual General Meetings, maintain statutory registers, and comply with various ROC requirements. We provide comprehensive compliance management services.",
  },
  {
    question: "How much does it cost to register a trademark in India?",
    answer:
      "The cost includes government fees starting from ₹4,500 for individuals/startups and ₹9,000 for companies per class, plus our professional charges. We offer transparent pricing with no hidden costs and provide detailed cost breakdowns upfront.",
  },
  {
    question: "Can I convert my existing business structure to a different one?",
    answer:
      "Yes, it's possible to convert your business structure, such as from Proprietorship to LLP or Private Limited Company. The process involves specific legal procedures and documentation. We handle the entire conversion process seamlessly.",
  },
  {
    question: "Do you offer emergency or urgent processing services?",
    answer:
      "Yes, we offer expedited processing for urgent requirements. Depending on the service, we can fast-track applications with additional government fees. Contact us to discuss your timeline and we'll provide the best possible solution.",
  },
  {
    question: "What support do you provide after service completion?",
    answer:
      "We provide comprehensive post-service support including compliance reminders, renewal notifications, ongoing consultation, and assistance with any government correspondence. Our relationship doesn't end with service delivery.",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactMap />
      <ContactFAQ faqs={faqs} />
    </div>
  )
}

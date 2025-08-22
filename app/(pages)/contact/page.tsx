import type { Metadata } from "next"

import ContactInfo from "./_components/contact-info"
import ContactForm from "./_components/contact-form"
import ContactMap from "./_components/contact-map"
import ContactFAQ from "./_components/contact-faq"
import ContactLocationInfo from "./_components/contact-location-info"
import ContactSection from "@/components/home/contact-section"


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
      {/* Enhanced Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-blue-100 rounded-full -mr-36 md:-mr-48 -mt-36 md:-mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 bg-purple-50 rounded-full -ml-32 md:-ml-40 -mb-32 md:-mb-40 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48 bg-gradient-to-r from-blue-200 to-purple-300 rounded-full opacity-20 blur-xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100 shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              24/7 Expert Support
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Touch
              </span>{" "}
              with Experts
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Ready to start your business journey? Our expert team is here to guide you through every step of the process.
            </p>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
              <a
                href="tel:+919699214195"
                className="flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-slate-700">Call Now</div>
                </div>
              </a>

              <a
                href="https://wa.me/919699214195"
                className="flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-slate-700">WhatsApp</div>
                </div>
              </a>

              <a
                href="mailto:start@startbusiness.co.in"
                className="flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-slate-700">Email Us</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection/>
      <ContactMap />

      {/* Enhanced FAQ Section */}
      <ContactFAQ faqs={faqs} />
    </div>
  )
}

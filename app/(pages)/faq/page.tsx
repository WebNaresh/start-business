import FAQAccordion from "@/components/faq-accordion"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Frequently Asked Questions</h1>
            <p className="mb-6 text-lg text-slate-200">Find answers to common questions about our business services</p>
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {faqCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border border-slate-100 hover:border-blue-200 transition-colors"
              >
                <h2 className="text-xl font-bold mb-4 text-blue-600">{category.title}</h2>
                <ul className="space-y-2 mb-4">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`#${category.id}`}
                  className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
                >
                  View FAQs
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* Company Registration FAQs */}
          <div id="company-registration" className="mb-16 scroll-mt-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Company Registration FAQs</h2>
              <FAQAccordion faqs={companyRegistrationFaqs} />

              <div className="mt-8 text-center">
                <WhatsAppCTAButton service="Company Registration" className="mx-auto">
                  Ask About Company Registration
                </WhatsAppCTAButton>
              </div>
            </div>
          </div>

          {/* Trademark FAQs */}
          <div id="trademark" className="mb-16 scroll-mt-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Trademark FAQs</h2>
              <FAQAccordion faqs={trademarkFaqs} />

              <div className="mt-8 text-center">
                <WhatsAppCTAButton service="Trademark Registration" className="mx-auto">
                  Ask About Trademark Registration
                </WhatsAppCTAButton>
              </div>
            </div>
          </div>

          {/* Compliance FAQs */}
          <div id="compliance" className="mb-16 scroll-mt-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Compliance FAQs</h2>
              <FAQAccordion faqs={complianceFaqs} />

              <div className="mt-8 text-center">
                <WhatsAppCTAButton service="Compliance Services" className="mx-auto">
                  Ask About Compliance Services
                </WhatsAppCTAButton>
              </div>
            </div>
          </div>

          {/* General FAQs */}
          <div id="general" className="scroll-mt-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">General FAQs</h2>
              <FAQAccordion faqs={generalFaqs} />

              <div className="mt-8 text-center">
                <WhatsAppCTAButton className="mx-auto">Ask Us Anything</WhatsAppCTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-slate-600 mb-8">
              Our team of experts is ready to provide personalized assistance for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppCTAButton size="lg">Chat With Us Now</WhatsAppCTAButton>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 shadow-sm hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const faqCategories = [
  {
    id: "company-registration",
    title: "Company Registration",
    items: [
      "Private Limited Company",
      "Limited Liability Partnership",
      "One Person Company",
      "Registration Process",
      "Documentation Requirements",
    ],
  },
  {
    id: "trademark",
    title: "Trademark & Copyright",
    items: [
      "Trademark Registration",
      "Copyright Registration",
      "Trademark Objections",
      "International Protection",
      "Renewal Process",
    ],
  },
  {
    id: "compliance",
    title: "Compliance Services",
    items: ["Annual Filings", "MCA Compliance", "FEMA Compliance", "Director KYC", "Statutory Registers"],
  },
  {
    id: "general",
    title: "General Questions",
    items: ["Service Pricing", "Turnaround Time", "Documentation", "Business Structure", "After-Sales Support"],
  },
]

const companyRegistrationFaqs = [
  {
    question: "What is the difference between a Private Limited Company and an LLP?",
    answer:
      "A Private Limited Company is a separate legal entity with shareholders and directors, offering limited liability protection but with more compliance requirements. An LLP (Limited Liability Partnership) combines the benefits of a partnership and a company, providing limited liability to partners while having fewer compliance requirements than a Private Limited Company.",
  },
  {
    question: "How long does it take to register a Private Limited Company in India?",
    answer:
      "The process typically takes 10-15 working days, depending on the completeness of documentation and government processing times. This includes Name Reservation, submission of incorporation documents, and receipt of the Certificate of Incorporation.",
  },
  {
    question: "What is the minimum capital requirement for a Private Limited Company?",
    answer:
      "There is no minimum paid-up capital requirement for incorporating a Private Limited Company in India as per the Companies Act, 2013. However, you need to specify the authorized share capital in the incorporation documents, which determines the registration fee.",
  },
  {
    question: "How many directors and shareholders are required for a Private Limited Company?",
    answer:
      "A Private Limited Company requires a minimum of 2 directors and 2 shareholders, with a maximum limit of 200 shareholders. The directors and shareholders can be the same individuals, and at least one director must be a resident of India.",
  },
  {
    question: "What documents are required for company registration?",
    answer:
      "The key documents include identity and address proof of directors/shareholders (PAN card, Aadhaar card, passport, voter ID, driving license), proof of registered office address (utility bills, rent agreement), photographs of directors, and digital signatures of the proposed directors.",
  },
]

const trademarkFaqs = [
  {
    question: "How long does trademark registration take in India?",
    answer:
      "The trademark registration process in India typically takes 18-24 months if there are no objections or oppositions. However, you get protection from the date of application filing.",
  },
  {
    question: "What is the validity period of a trademark in India?",
    answer:
      "A registered trademark in India is valid for 10 years from the date of application. It can be renewed indefinitely for successive periods of 10 years by paying the renewal fee.",
  },
  {
    question: "Can I register a trademark that is similar to an existing one?",
    answer:
      "Generally, you cannot register a trademark that is identical or deceptively similar to an existing registered trademark for similar goods or services. The Trademark Registry conducts an examination to check for similarities with existing marks.",
  },
  {
    question: "What is the difference between TM and ® symbols?",
    answer:
      "The TM symbol can be used with any trademark to indicate that you are claiming rights to the mark, even if it's not registered. The ® symbol can only be used with trademarks that have been officially registered with the Trademark Registry.",
  },
  {
    question: "Can I register my trademark internationally?",
    answer:
      "Yes, you can register your trademark internationally through the Madrid Protocol system, which allows you to file a single application and designate multiple countries. Alternatively, you can file separate applications in each country where you want protection.",
  },
]

const complianceFaqs = [
  {
    question: "What are the annual compliance requirements for a Private Limited Company?",
    answer:
      "Private Limited Companies must file Annual Returns (MGT-7), Financial Statements (AOC-4), conduct Annual General Meetings, maintain statutory registers, and comply with applicable regulatory requirements. Additionally, they must file Director KYC (DIR-3 KYC) annually.",
  },
  {
    question: "What happens if I miss compliance deadlines?",
    answer:
      "Missing compliance deadlines can result in penalties, late fees, and legal consequences. For example, late filing of Annual Returns can incur penalties of ₹100 per day of delay. Continued non-compliance can lead to the company being marked as 'Active Non-Compliant' or even struck off from the Register of Companies.",
  },
  {
    question: "What is Director KYC and when is it required?",
    answer:
      "Director KYC (DIR-3 KYC) is an annual compliance requirement where all directors with a Director Identification Number (DIN) must verify their details with the Ministry of Corporate Affairs. It must be filed every year by September 30th, regardless of whether there are changes in the director's information.",
  },
  {
    question: "What are the compliance requirements for LLPs?",
    answer:
      "LLPs must file Annual Returns (Form 11) and Statement of Accounts & Solvency (Form 8) annually. They must maintain proper books of accounts and comply with applicable regulatory requirements. LLPs must also update any changes in partners or the LLP agreement through appropriate forms.",
  },
]

const generalFaqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of business services including company registration, trademark registration, MCA compliance, RBI compliance, business registration, and various other business-related services to help entrepreneurs start and run their businesses efficiently.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Our service fees vary depending on the specific service and requirements. We offer transparent pricing with no hidden charges. Please contact us for a detailed quote based on your specific needs.",
  },
  {
    question: "Do you provide services outside of India?",
    answer:
      "Yes, we provide international trademark registration and company incorporation services in select foreign jurisdictions. Please contact us for specific requirements and jurisdictions we cover.",
  },
  {
    question: "How can I track the progress of my application?",
    answer:
      "Once you engage our services, you will be assigned a dedicated relationship manager who will provide regular updates on your application status. We also have an online portal where you can track the progress of your applications in real-time.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We have a transparent refund policy. If we are unable to deliver the promised service due to reasons within our control, we offer a full refund. For specific cases where partial work has been completed, a proportionate refund may be applicable. Please refer to our terms of service for detailed information.",
  },
]

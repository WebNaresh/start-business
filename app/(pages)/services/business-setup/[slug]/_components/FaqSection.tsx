import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { ServiceData } from "./service-types"
import Script from "next/script"

interface FaqSectionProps {
  service: ServiceData
  openFAQs: number[]
  toggleFAQ: (index: number) => void
}

export default function FaqSection({ service, openFAQs, toggleFAQ }: FaqSectionProps) {
  // Generate FAQPage structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <section id="faqs" className="py-12 md:py-16 bg-white" aria-labelledby="faq-heading">
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 id="faq-heading" className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-2 md:mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto">
              Get answers to common questions about {service.shortTitle}
            </p>
          </div>
          <div className="space-y-3 md:space-y-4" role="list">
            {service.faqs.map((faq: { question: string; answer: string }, index: number) => (
              <div key={index} role="listitem">
                <Collapsible
                  open={openFAQs.includes(index)}
                  onOpenChange={() => toggleFAQ(index)}
                  className="bg-white border border-slate-200 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CollapsibleTrigger 
                    className="w-full p-4 md:p-6 text-left hover:bg-slate-50 transition-colors duration-300 rounded-lg md:rounded-xl"
                    aria-expanded={openFAQs.includes(index)}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm md:text-base font-semibold text-slate-800 pr-4">{faq.question}</h3>
                      <div
                        className={`flex-shrink-0 transition-transform duration-300 ${
                          openFAQs.includes(index) ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent 
                    id={`faq-answer-${index}`}
                    className="px-4 md:px-6 pb-4 md:pb-6"
                    role="region"
                  >
                    <div className="text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 
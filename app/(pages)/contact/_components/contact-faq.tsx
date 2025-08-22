"use client"

import { ChevronDown, HelpCircle } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

interface ContactFAQProps {
  faqs: FAQ[]
}

export default function ContactFAQ({ faqs }: ContactFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100 shadow-sm">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ Section
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Questions
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Find quick answers to common questions about our services and processes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <Collapsible
                  open={openItems.includes(index)}
                  onOpenChange={() => toggleItem(index)}
                  className="bg-white border-2 border-slate-200 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:border-blue-200 overflow-hidden"
                >
                  <CollapsibleTrigger className="w-full p-4 md:p-6 lg:p-8 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-300 touch-manipulation">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base md:text-lg lg:text-xl font-semibold text-slate-900 leading-tight">{faq.question}</h3>
                      <div className={`flex-shrink-0 transition-all duration-300 p-1 rounded-full ${
                        openItems.includes(index)
                          ? 'rotate-180 bg-blue-100 text-blue-600'
                          : 'bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600'
                      }`}>
                        <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
                    <div className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed border-t border-slate-200 pt-4 md:pt-6">
                      {faq.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-8 md:mt-12 text-center">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200">
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
                Still have questions?
              </h3>
              <p className="text-slate-600 mb-6">
                Our expert team is here to help you with any additional questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+919699214195"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  Call Now
                </a>
                <a
                  href="https://wa.me/919699214195"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

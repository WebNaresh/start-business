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
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-3">
            <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Frequently Asked Questions</h2>
          </div>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Find quick answers to common questions about our services and processes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index}>
                <Collapsible
                  open={openItems.includes(index)}
                  onOpenChange={() => toggleItem(index)}
                  className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CollapsibleTrigger className="w-full p-4 sm:p-5 text-left hover:bg-slate-50 transition-colors duration-300 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-800 pr-4">{faq.question}</h3>
                      <div className={`flex-shrink-0 transition-transform duration-300 ${openItems.includes(index) ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
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

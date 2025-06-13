"use client"

import { Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import CallCTAButton from "@/components/call-cta-button"

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
  showCallButtons?: boolean
}

export default function FAQAccordion({ faqs, showCallButtons = true }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200">
          <AccordionTrigger className="text-left font-semibold text-lg hover:text-blue-600 transition-colors">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="text-slate-600 mb-4">{faq.answer}</div>
            {showCallButtons && (
              <CallCTAButton
                service={faq.question}
                className="text-sm px-4 py-2 mt-2 flex items-center w-auto"
                size="sm"
              >
             
                Call for more info
              </CallCTAButton>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

"use client"

import { motion } from "framer-motion"
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Frequently Asked Questions</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Find quick answers to common questions about our services and processes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Collapsible
                  open={openItems.includes(index)}
                  onOpenChange={() => toggleItem(index)}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CollapsibleTrigger className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-300 rounded-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      </motion.div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-6">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

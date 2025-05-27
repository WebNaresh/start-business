import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { ServiceData } from "./service-types"

interface FaqSectionProps {
  service: ServiceData
  openFAQs: number[]
  toggleFAQ: (index: number) => void
}

export default function FaqSection({ service, openFAQs, toggleFAQ }: FaqSectionProps) {
  return (
    <section id="faqs" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Get answers to common questions about {service.shortTitle}</p>
          </motion.div>
          <div className="space-y-4">
            {service.faqs.map((faq: { question: string; answer: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Collapsible
                  open={openFAQs.includes(index)}
                  onOpenChange={() => toggleFAQ(index)}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CollapsibleTrigger className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-300 rounded-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openFAQs.includes(index) ? 180 : 0 }}
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
        </div>
      </div>
    </section>
  )
} 
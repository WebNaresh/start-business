"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import FAQAccordion from "@/components/faq-accordion"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function FAQSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const homeFaqs = [
    {
      question: "How long does it take to register a company in India?",
      answer:
        "The process typically takes 10-15 working days, depending on the type of company and the completeness of documentation provided.",
    },
    {
      question: "What is the difference between a Private Limited Company and an LLP?",
      answer:
        "A Private Limited Company offers limited liability to shareholders with more compliance requirements, while an LLP combines partnership benefits with limited liability protection and fewer compliance requirements.",
    },
    {
      question: "How much does trademark registration cost in India?",
      answer:
        "The cost includes government fees (starting from ₹4,500 for individuals/startups and ₹9,000 for companies per class) plus professional charges that vary based on complexity.",
    },
    {
      question: "What are the key compliance requirements for businesses in India?",
      answer:
        "Key compliance requirements include annual filings, financial statements, tax returns, GST compliance, and maintaining statutory registers. The specific requirements vary based on your business structure.",
    },
  ]

  return (
    <section className="py-16 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto">Find answers to common questions about our services</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <FAQAccordion faqs={homeFaqs} />

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <WhatsAppCTAButton className="sm:flex-1 max-w-xs mx-auto sm:mx-0">Ask a Question</WhatsAppCTAButton>
            <Link
              href="/faq"
              className="sm:flex-1 max-w-xs mx-auto sm:mx-0 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 shadow-sm hover:bg-blue-50 transition-colors"
            >
              View All FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

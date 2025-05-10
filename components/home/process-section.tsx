"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ClipboardCheck, FileText, MessageSquare, CheckCircle, ArrowRight } from "lucide-react"

export default function ProcessSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "Schedule a free consultation with our experts to discuss your requirements",
      color: "bg-blue-100 text-blue-600 border-blue-600",
      hoverColor: "group-hover:bg-blue-600 group-hover:text-white",
      shadowColor: "shadow-blue-200",
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "We'll guide you through the required documentation process",
      color: "bg-emerald-100 text-emerald-600 border-emerald-600",
      hoverColor: "group-hover:bg-emerald-600 group-hover:text-white",
      shadowColor: "shadow-emerald-200",
    },
    {
      icon: ClipboardCheck,
      title: "Processing",
      description: "Our team handles all the paperwork and filing with the authorities",
      color: "bg-purple-100 text-purple-600 border-purple-600",
      hoverColor: "group-hover:bg-purple-600 group-hover:text-white",
      shadowColor: "shadow-purple-200",
    },
    {
      icon: CheckCircle,
      title: "Completion",
      description: "Receive your registration certificates and start your business journey",
      color: "bg-amber-100 text-amber-600 border-amber-600",
      hoverColor: "group-hover:bg-amber-600 group-hover:text-white",
      shadowColor: "shadow-amber-200",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600 mb-4">
            Simple Process
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Our streamlined 4-step process makes business registration simple, efficient, and hassle-free
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line for mobile */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-emerald-200 to-amber-200 md:hidden"></div>

          {/* Connecting line for desktop */}
          <div className="absolute left-0 top-1/2 hidden h-2 w-full -translate-y-1/2 md:block">
            <div className="h-full bg-gradient-to-r from-blue-200 via-purple-200 to-amber-200 rounded-full"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-slate-200 shadow-md z-20">
                  {index + 1}
                </div>

                {/* Icon container */}
                <div
                  className={`relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
                    step.color
                  } border-2 transition-all duration-300 ${step.hoverColor} shadow-lg ${step.shadowColor}`}
                >
                  <step.icon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 w-full border border-slate-100 group-hover:border-slate-200">
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-slate-600 mb-4">{step.description}</p>

                  {/* Arrow for next step - hidden on last item */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                      <div className="bg-white rounded-full p-2 shadow-md">
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Your Business Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

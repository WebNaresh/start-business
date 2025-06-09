"use client"

import { ClipboardCheck, FileText, MessageSquare, CheckCircle, ArrowRight, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ProcessSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "Schedule a free consultation with our experts to discuss your requirements",
      color: "bg-blue-50 text-blue-600 border-blue-600",
      hoverColor: "group-hover:bg-blue-600 group-hover:text-white",
      shadowColor: "shadow-blue-200",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "We'll guide you through the required documentation process",
      color: "bg-purple-50 text-purple-600 border-purple-600",
      hoverColor: "group-hover:bg-purple-600 group-hover:text-white",
      shadowColor: "shadow-purple-200",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: ClipboardCheck,
      title: "Processing",
      description: "Our team handles all the paperwork and filing with the authorities",
      color: "bg-emerald-50 text-emerald-600 border-emerald-600",
      hoverColor: "group-hover:bg-emerald-600 group-hover:text-white",
      shadowColor: "shadow-emerald-200",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: CheckCircle,
      title: "Completion",
      description: "Receive your registration certificates and start your business journey",
      color: "bg-amber-50 text-amber-600 border-amber-600",
      hoverColor: "group-hover:bg-amber-600 group-hover:text-white",
      shadowColor: "shadow-amber-200",
      gradient: "from-amber-500 to-amber-600",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Simple Process
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            How It <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-8 max-w-2xl mx-auto">
            Our streamlined 4-step process makes business registration simple, efficient, and hassle-free
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for mobile */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-purple-200 to-emerald-200 md:hidden"></div>

          {/* Connecting line for desktop */}
          <div className="absolute left-0 top-1/2 hidden h-2 w-full -translate-y-1/2 md:block">
            <div className="h-full bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200 rounded-full"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-slate-200 shadow-md z-20">
                  {index + 1}
                </div>

                {/* Icon container */}
                <div
                  className={`relative z-10 mb-6 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full ${
                    step.color
                  } border-2 transition-all duration-300 ${step.hoverColor} shadow-lg ${step.shadowColor}`}
                >
                  <step.icon className="h-8 w-8 md:h-10 md:w-10 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 w-full border border-slate-100 group-hover:border-slate-200">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mb-4 leading-relaxed">{step.description}</p>

                  {/* Arrow for next step - hidden on last item */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                      <div className="bg-white rounded-full p-2 shadow-md">
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  )}

                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300 pointer-events-none`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Your Business Journey
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

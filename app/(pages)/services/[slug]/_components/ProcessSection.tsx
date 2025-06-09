"use client"

import { useRef } from "react"
import type { ServiceData } from "./service-types"
import {
  CheckCircle,
  FileText,
  Send,
  Award,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProcessSectionProps {
  service: ServiceData
}

export default function ProcessSection({ service }: ProcessSectionProps) {
  const sectionRef = useRef(null)

  // Step icons mapping
  const stepIcons = [FileText, Send, CheckCircle, Award, Target, Zap]

  if (!service.process) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-4 relative overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full -mr-36 -mt-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-50 text-blue-600 border-blue-200 px-4 py-2 text-xs">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Step-by-Step Process
            </Badge>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
              <span className="text-slate-800">Simple</span>{" "}
              <span className="text-blue-600">
                Registration Process
              </span>
            </h2>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4">
              Follow our streamlined process to get your business registered quickly and efficiently
            </p>
          </div>

          {/* Desktop Process Grid */}
          <div className="hidden lg:block mb-12">
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {service.process.map((step, index) => {
                const IconComponent = stepIcons[index % stepIcons.length]

                return (
                  <div
                    key={index}
                    className="relative group"
                  >
                    {/* Connection Line */}
                    {index < service.process.length - 1 && (
                      <div className="hidden xl:block absolute top-10 -right-3 w-6 h-0.5 bg-slate-200 z-0">
                        <div className="h-full bg-blue-600" />
                      </div>
                    )}

                    {/* Step Card */}
                    <div
                      className="relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-blue-200"
                    >
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-blue-600 text-white shadow-md"
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {step.step}
                        </div>
                      </div>

                      {/* Step Content */}
                      <h3 className="text-sm font-bold mb-1.5 text-blue-600">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <div className="relative max-w-xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200">
                <div className="w-full bg-blue-600" />
              </div>

              {service.process.map((step, index) => {
                const IconComponent = stepIcons[index % stepIcons.length]

                return (
                  <div
                    key={index}
                    className="relative flex items-start mb-8 last:mb-0"
                  >
                    {/* Timeline Node */}
                    <div className="relative z-10 mr-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border-3 transition-all duration-300 bg-blue-600 border-white text-white shadow-md ring-2 ring-blue-200"
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Step Number Badge */}
                      <div
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-white text-blue-600"
                      >
                        {step.step}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-1">
                      <div
                        className="bg-white rounded-xl p-4 border-2 transition-all duration-300 border-blue-200 bg-blue-50 shadow-md"
                      >
                        <h3 className="text-sm font-bold mb-1.5 text-blue-600">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                        <ArrowRight className="w-3 h-3 text-slate-400 ml-auto mt-2" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

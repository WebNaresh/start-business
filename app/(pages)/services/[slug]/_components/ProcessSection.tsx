"use client"

import { motion, useInView } from "framer-motion"
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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Step icons mapping
  const stepIcons = [FileText, Send, CheckCircle, Award, Target, Zap]

  if (!service.process) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-4 relative overflow-hidden bg-white"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mt-48 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full -ml-40 -mb-40 blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-blue-50 text-blue-600 border-blue-200 px-6 py-3 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Step-by-Step Process
            </Badge>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-slate-800">Simple</span>{" "}
              <span className="text-blue-600">
                Registration Process
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl mx-auto mb-6">
              Follow our streamlined process to get your business registered quickly and efficiently
            </p>
          </motion.div>

          {/* Desktop Process Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hidden lg:block mb-16"
          >
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {service.process.map((step, index) => {
                const IconComponent = stepIcons[index % stepIcons.length]

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group"
                  >
                    {/* Connection Line */}
                    {index < service.process.length - 1 && (
                      <div className="hidden xl:block absolute top-12 -right-4 w-8 h-0.5 bg-slate-200 z-0">
                        <motion.div
                          className="h-full bg-blue-600 origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.2 }}
                        />
                      </div>
                    )}

                    {/* Step Card */}
                    <div
                      className="relative bg-white rounded-3xl p-8 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-blue-200"
                    >
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 bg-blue-600 text-white shadow-lg"
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div className="text-3xl font-bold text-blue-600">
                          {step.step}
                        </div>
                      </div>

                      {/* Step Content */}
                      <h3 className="text-base font-bold mb-2 text-blue-600">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Enhanced Mobile Timeline */}
          <div className="lg:hidden">
            <div className="relative max-w-2xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200">
                <motion.div
                  className="w-full bg-blue-600 origin-top"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {service.process.map((step, index) => {
                const IconComponent = stepIcons[index % stepIcons.length]

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex items-start mb-12 last:mb-0"
                  >
                    {/* Timeline Node */}
                    <div className="relative z-10 mr-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 bg-blue-600 border-white text-white shadow-lg ring-4 ring-blue-200"
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>

                      {/* Step Number Badge */}
                      <div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white text-blue-600"
                      >
                        {step.step}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-2">
                      <div
                        className="bg-white rounded-2xl p-6 border-2 transition-all duration-300 border-blue-200 bg-blue-50 shadow-lg"
                      >
                        <h3 className="text-base font-bold mb-2 text-blue-600">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">{step.description}</p>
                        <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

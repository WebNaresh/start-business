"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import type { ServiceData } from "./service-types"
import {
  CheckCircle,
  Clock,
  FileText,
  Send,
  Award,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ProcessSectionProps {
  service: ServiceData
}

export default function ProcessSection({ service }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Get dynamic colors based on service color
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        gradient: "from-blue-500 to-blue-600",
        light: "bg-blue-100",
        accent: "bg-blue-500",
        ring: "ring-blue-200",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        gradient: "from-green-500 to-green-600",
        light: "bg-green-100",
        accent: "bg-green-500",
        ring: "ring-green-200",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        gradient: "from-purple-500 to-purple-600",
        light: "bg-purple-100",
        accent: "bg-purple-500",
        ring: "ring-purple-200",
      },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const colors = getColorClasses(service.color)

  // Step icons mapping
  const stepIcons = [FileText, Send, CheckCircle, Award, Target, Zap]

  // Auto-advance steps
  useEffect(() => {
    if (!isPlaying || !service.process) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => (current + 1) % service.process!.length)
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, service.process, activeStep])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const resetAnimation = () => {
    setActiveStep(0)
    setProgress(0)
    setIsPlaying(true)
  }

  const goToStep = (stepIndex: number) => {
    setActiveStep(stepIndex)
    setProgress(0)
  }

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
      className="py-4 relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-30">
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
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full -ml-40 -mb-40 blur-2xl"
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

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-40"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-3 h-3 bg-purple-400 rounded-full opacity-50"
        animate={{
          y: [0, 25, 0],
          rotate: [0, 360],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className={`mb-6 ${colors.bg} ${colors.text} ${colors.border} px-6 py-3 text-sm`}>
              <Sparkles className="w-4 h-4 mr-2" />
              Step-by-Step Process
            </Badge>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-slate-800">Simple</span>{" "}
              <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                Registration Process
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-8">
              Follow our streamlined process to get your business registered quickly and efficiently
            </p>

            {/* Process Controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlayPause}
                className={`${colors.border} ${colors.text} hover:${colors.bg}`}
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetAnimation}
                className={`${colors.border} ${colors.text} hover:${colors.bg}`}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <div className="text-sm text-slate-500">
                Step {activeStep + 1} of {service.process.length}
              </div>
            </div>

            {/* Overall Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Progress</span>
                <span>{Math.round((activeStep * 100 + progress) / service.process.length)}%</span>
              </div>
              <Progress value={(activeStep * 100 + progress) / service.process.length} className="h-2" />
            </div>
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
                const isActive = index === activeStep
                const isCompleted = index < activeStep

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group cursor-pointer"
                    onClick={() => goToStep(index)}
                  >
                    {/* Connection Line */}
                    {index < service.process.length - 1 && (
                      <div className="hidden xl:block absolute top-12 -right-4 w-8 h-0.5 bg-slate-200 z-0">
                        <motion.div
                          className={`h-full ${colors.accent} origin-left`}
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: isCompleted ? 1 : isActive ? progress / 100 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}

                    {/* Step Card */}
                    <div
                      className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                        isActive
                          ? `${colors.border} ${colors.bg} shadow-xl scale-105`
                          : isCompleted
                            ? "border-green-200 bg-green-50"
                            : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? `${colors.accent} text-white shadow-lg`
                              : isCompleted
                                ? "bg-green-500 text-white"
                                : `${colors.bg} ${colors.text} group-hover:scale-110`
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="w-8 h-8" /> : <IconComponent className="w-8 h-8" />}
                        </div>
                        <div
                          className={`text-3xl font-bold ${
                            isActive ? colors.text : isCompleted ? "text-green-600" : "text-slate-300"
                          }`}
                        >
                          {step.step}
                        </div>
                      </div>

                      {/* Step Content */}
                      <h3
                        className={`text-xl font-bold mb-3 transition-colors ${
                          isActive
                            ? colors.text
                            : isCompleted
                              ? "text-green-800"
                              : "text-slate-800 group-hover:text-blue-600"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{step.description}</p>

                      {/* Step Progress */}
                      {isActive && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>In Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-1" />
                        </div>
                      )}

                      {/* Completion Badge */}
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-4">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className={`absolute -top-2 -right-2 w-6 h-6 ${colors.accent} rounded-full flex items-center justify-center`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
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
                  className={`w-full ${colors.accent} origin-top`}
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: (activeStep + progress / 100) / service.process.length,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {service.process.map((step, index) => {
                const IconComponent = stepIcons[index % stepIcons.length]
                const isActive = index === activeStep
                const isCompleted = index < activeStep

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex items-start mb-12 last:mb-0"
                    onClick={() => goToStep(index)}
                  >
                    {/* Timeline Node */}
                    <div className="relative z-10 mr-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 ${
                          isActive
                            ? `${colors.accent} border-white text-white shadow-lg ${colors.ring} ring-4`
                            : isCompleted
                              ? "bg-green-500 border-white text-white shadow-lg"
                              : `${colors.bg} ${colors.border} ${colors.text}`
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-8 h-8" /> : <IconComponent className="w-8 h-8" />}
                      </div>

                      {/* Step Number Badge */}
                      <div
                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isActive
                            ? "bg-white text-blue-600"
                            : isCompleted
                              ? "bg-white text-green-600"
                              : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {step.step}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-2">
                      <div
                        className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                          isActive
                            ? `${colors.border} ${colors.bg} shadow-lg`
                            : isCompleted
                              ? "border-green-200 bg-green-50"
                              : "border-slate-200"
                        }`}
                      >
                        <h3
                          className={`text-lg font-bold mb-2 ${
                            isActive ? colors.text : isCompleted ? "text-green-800" : "text-slate-800"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">{step.description}</p>

                        {/* Mobile Progress */}
                        {isActive && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                              <span>Progress</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-1" />
                          </div>
                        )}

                        {/* Status Badges */}
                        <div className="flex items-center justify-between mt-4">
                          {isCompleted && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {isActive && (
                            <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
                              <Clock className="w-3 h-3 mr-1" />
                              In Progress
                            </Badge>
                          )}
                          <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
                        </div>
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

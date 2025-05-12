"use client"

import Image from "next/image"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Shield, Award, Zap, Users, ArrowRight } from "lucide-react"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Reduced to 5 key differentiating features with unique images
  const features = [
    {
      icon: Shield,
      title: "Legal Protection",
      description:
        "Our expert team ensures your business has complete legal protection with proper documentation and compliance measures.",
      image: "/features/feature-legal-protection.png",
      color: "bg-blue-100 text-[#2563eb]",
      highlight: "bg-blue-50",
      points: [
        "Comprehensive legal documentation",
        "Regulatory compliance assurance",
        "Intellectual property protection",
      ],
    },
    {
      icon: Zap,
      title: "Accelerated Processing",
      description:
        "Experience faster business registration and compliance processes with our streamlined systems and expert handling.",
      image: "/features/feature-accelerated-processing.png",
      color: "bg-amber-100 text-amber-600",
      highlight: "bg-amber-50",
      points: ["50% faster than industry average", "Real-time application tracking", "Priority processing options"],
    },
    {
      icon: Users,
      title: "Dedicated Expert Team",
      description:
        "Work with our specialized team of legal and business experts who provide personalized guidance throughout your journey.",
      image: "/features/feature-expert-team.png",
      color: "bg-green-100 text-green-600",
      highlight: "bg-green-50",
      points: [
        "Industry specialists with 10+ years experience",
        "Dedicated account manager",
        "Direct access to legal experts",
      ],
    },
    {
      icon: Award,
      title: "Success Guarantee",
      description:
        "We stand behind our services with a success guarantee, ensuring your business registration and compliance needs are met.",
      image: "/features/feature-success-guarantee.png",
      color: "bg-purple-100 text-purple-600",
      highlight: "bg-purple-50",
      points: ["98% first-time approval rate", "Money-back guarantee", "Free revisions and corrections"],
    },
    {
      icon: Shield,
      title: "Digital-First Approach",
      description:
        "Our digital platform simplifies document submission, tracking, and management for a seamless experience.",
      image: "/features/feature-digital-approach.png",
      color: "bg-rose-100 text-rose-600",
      highlight: "bg-rose-50",
      points: ["Secure digital document storage", "Paperless application process", "Real-time status updates"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-full -ml-16 -mb-16 opacity-70"></div>

      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#2563eb] bg-blue-50 rounded-full border border-blue-100">
            Our Unique Advantages
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl bg-gradient-to-r from-[#2563eb] to-blue-800 bg-clip-text text-transparent">
            Why Choose us
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 text-lg">
            We go beyond standard services to provide exceptional value and results for your business
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Feature tabs - left side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group rounded-xl p-6 transition-all duration-300 cursor-pointer
                  ${
                    activeFeature === index
                      ? `border-l-4 border-[#2563eb] shadow-lg ${feature.highlight}`
                      : "border border-slate-200 bg-white hover:border-blue-200"
                  }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start">
                  <div
                    className={`${feature.color} p-3 rounded-full mr-4 transition-all duration-300 ${
                      activeFeature === index ? "scale-110" : "group-hover:scale-110"
                    }`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold transition-colors duration-300 ${
                        activeFeature === index ? "text-[#2563eb]" : "text-slate-800 group-hover:text-[#2563eb]"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mt-1 line-clamp-2 group-hover:text-slate-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature details - right side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
          >
            <div className="relative h-96 w-full">
              <Image
                src={
                  features[activeFeature].image ||
                  `/placeholder.svg?height=400&width=600&query=${features[activeFeature].title}`
                }
                alt={features[activeFeature].title}
                fill
                className="object-fill transition-all duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{features[activeFeature].title}</h3>
                <p className="text-white/90 max-w-md">{features[activeFeature].description}</p>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-[#2563eb] mb-4">Key Benefits:</h4>
              <ul className="space-y-3">
                {features[activeFeature].points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <WhatsAppCTAButton service={features[activeFeature].title} className="w-full justify-center rounded-lg">
                  Learn more about {features[activeFeature].title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </WhatsAppCTAButton>
              </div>
            </div>
          </motion.div>
        </div>

      
      </div>
    </section>
  )
}

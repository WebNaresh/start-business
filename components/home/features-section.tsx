"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Clock, FileCheck, Shield, Users, Zap, Award, Globe, HeartHandshake, ArrowRight } from "lucide-react"

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Fast processing and timely delivery of all services with guaranteed deadlines",
      color: "bg-blue-100 text-blue-600",
      gradient: "from-blue-500 to-blue-600",
      highlight: "bg-blue-50",
    },
    {
      icon: Shield,
      title: "Legal Expertise",
      description: "Team of experienced professionals with specialized knowledge to guide you",
      color: "bg-blue-100 text-blue-600",
      gradient: "from-blue-500 to-blue-700",
      highlight: "bg-blue-50",
    },
    {
      icon: FileCheck,
      title: "Compliance Assured",
      description: "Stay compliant with all regulatory requirements and avoid legal complications",
      color: "bg-purple-100 text-purple-600",
      gradient: "from-purple-500 to-purple-600",
      highlight: "bg-purple-50",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personalized assistance throughout the process with a dedicated manager",
      color: "bg-amber-100 text-amber-600",
      gradient: "from-amber-500 to-amber-600",
      highlight: "bg-amber-50",
    },
    {
      icon: Zap,
      title: "Efficient Process",
      description: "Streamlined procedures to save your time and effort with digital solutions",
      color: "bg-rose-100 text-rose-600",
      gradient: "from-rose-500 to-rose-600",
      highlight: "bg-rose-50",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Commitment to excellence in every interaction with satisfaction guarantee",
      color: "bg-indigo-100 text-indigo-600",
      gradient: "from-indigo-500 to-indigo-600",
      highlight: "bg-indigo-50",
    },
    {
      icon: Globe,
      title: "Pan-India Service",
      description: "Serving clients across all states and union territories with local expertise",
      color: "bg-cyan-100 text-cyan-600",
      gradient: "from-cyan-500 to-cyan-600",
      highlight: "bg-cyan-50",
    },
    {
      icon: HeartHandshake,
      title: "Client-Centric Approach",
      description: "Tailored solutions to meet your specific needs with personalized strategies",
      color: "bg-orange-100 text-orange-600",
      gradient: "from-orange-500 to-orange-600",
      highlight: "bg-orange-50",
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
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
            Our Advantages
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Why Choose StartBusiness.co.in?
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 text-lg">
            We provide end-to-end business solutions with expertise, efficiency, and excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group rounded-xl p-6 transition-all duration-300 relative overflow-hidden
                ${hoveredFeature === index ? feature.highlight : "bg-white"}
                border border-slate-200 hover:border-transparent
                hover:shadow-lg hover:shadow-${feature.color.split(" ")[0].replace("bg-", "")}/10`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              whileHover={{ y: -5 }}
            >
              {/* Animated border on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                initial={false}
                animate={hoveredFeature === index ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-blue-500 to-blue-600 -z-10 mask-border"></div>
              </motion.div>

              {/* Icon with animated background */}
              <div className="relative mb-6">
                <div
                  className={`absolute inset-0 rounded-full ${feature.color.split(" ")[0]} opacity-20 blur-lg transform group-hover:scale-150 transition-transform duration-500`}
                ></div>
                <div
                  className={`relative z-10 rounded-full ${feature.color} p-4 w-fit transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                {feature.description}
              </p>

          
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/20"
          >
            <span className="font-medium">Start your business journey today</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>

      {/* Add this to your global CSS or as a style tag */}
      <style jsx>{`
        .mask-border {
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
        }
      `}</style>
    </section>
  )
}

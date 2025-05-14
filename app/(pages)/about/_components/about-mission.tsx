"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Target, Lightbulb, Compass } from "lucide-react"

export default function AboutMission() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Mission & Vision</h2>
          <p className="text-lg text-slate-600">Guiding principles that drive our organization forward</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-lg bg-white p-8 shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition-shadow"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 p-4 text-white shadow-lg">
              <Target className="h-8 w-8" />
            </div>
            <div className="mt-6 text-center">
              <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
              <p className="text-slate-600">
                To simplify the complex process of business registration and compliance, enabling entrepreneurs to focus
                on their core business while we handle the legal formalities with efficiency and expertise.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-lg bg-white p-8 shadow-lg border-t-4 border-yellow-500 hover:shadow-xl transition-shadow"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 p-4 text-navy-900 shadow-lg">
              <Lightbulb className="h-8 w-8" />
            </div>
            <div className="mt-6 text-center">
              <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
              <p className="text-slate-600">
                To be the most trusted partner for businesses across India for all their registration, compliance, and
                legal needs, known for our reliability, expertise, and customer-centric approach.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative rounded-lg bg-white p-8 shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 p-4 text-white shadow-lg">
              <Compass className="h-8 w-8" />
            </div>
            <div className="mt-6 text-center">
              <h3 className="mb-4 text-2xl font-bold">Our Approach</h3>
              <p className="text-slate-600">
                We take a client-centric approach, tailoring our services to meet the specific needs of each business,
                ensuring timely delivery, transparent communication, and exceptional results.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

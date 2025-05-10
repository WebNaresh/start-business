"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Building, FileCheck, Users } from "lucide-react"

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      icon: Building,
      value: "5000+",
      label: "Businesses Registered",
      color: "bg-navy-100 text-navy-700",
    },
    {
      icon: Users,
      value: "10000+",
      label: "Happy Clients",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: FileCheck,
      value: "98%",
      label: "Success Rate",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Award,
      value: "50+",
      label: "Expert Consultants",
      color: "bg-amber-100 text-amber-600",
    },
  ]

  return (
    <section className="py-12 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center rounded-lg border border-slate-100 bg-white p-6 text-center shadow-sm"
            >
              <div className={`mb-4 rounded-full ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="mb-1 text-3xl font-bold"
              >
                {stat.value}
              </motion.h3>
              <p className="text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Shield, Zap, Users, Award, Heart, Clock } from "lucide-react"

export default function AboutValues() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We uphold the highest standards of integrity in all our dealings, ensuring transparency and honesty in every interaction.",
    },
    {
      icon: Zap,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, delivering high-quality services that exceed expectations.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description:
        "We put our clients at the center of everything we do, tailoring our services to meet their specific needs and requirements.",
    },
    {
      icon: Award,
      title: "Expertise",
      description:
        "Our team consists of industry experts with in-depth knowledge and experience in business registration and compliance.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We are passionate about helping businesses succeed and grow, and this passion drives our commitment to excellence.",
    },
    {
      icon: Clock,
      title: "Timeliness",
      description:
        "We understand the value of time in business and ensure timely delivery of all our services without compromising on quality.",
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
    <section className="py-20 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Core Values</h2>
          <p className="text-lg text-slate-600">The principles that guide our work and relationships</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group rounded-lg bg-white p-8 shadow-md hover:shadow-lg transition-all hover:border-blue-200 border border-transparent"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold">{value.title}</h3>
              <p className="text-slate-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Clock, Users, Award, CheckCircle } from "lucide-react"

export default function AboutHero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      icon: Clock,
      value: "10+",
      label: "Years Experience",
    },
    {
      icon: Users,
      value: "5000+",
      label: "Satisfied Clients",
    },
    {
      icon: Award,
      value: "50+",
      label: "Expert Consultants",
    },
    {
      icon: CheckCircle,
      value: "100%",
      label: "Compliance Assured",
    },
  ]

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 py-20 text-white overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl"
          >
            About <span className="text-yellow-400">StartBusiness.co.in</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-lg text-slate-200 md:text-xl"
          >
            Your trusted partner for business registration and compliance services
          </motion.p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <p className="mb-4 text-lg text-slate-200">
              StartBusiness.co.in was founded with a vision to simplify the complex process of business registration and
              compliance for entrepreneurs and businesses across India.
            </p>
            <p className="mb-4 text-lg text-slate-200">
              With over a decade of experience in the industry, our team of experts has helped thousands of businesses
              navigate the regulatory landscape and establish their presence in the market.
            </p>
            <p className="mb-6 text-lg text-slate-200">
              We understand the challenges faced by entrepreneurs and strive to provide efficient, cost-effective, and
              reliable services that enable our clients to focus on growing their business while we take care of the
              legal and compliance aspects.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center">
                    <stat.icon className="mr-2 h-5 w-5 text-yellow-400" />
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <p className="text-slate-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-2xl">
              <Image src="/about-hero-image.png" alt="Our team" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-2xl font-bold">Building Business Success</p>
                <p className="text-lg">Since 2012</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-lg bg-yellow-500 p-4 text-blue-900 shadow-lg">
              <p className="text-2xl font-bold">Trusted by</p>
              <p className="text-lg">Businesses across India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

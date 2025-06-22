"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Clock, Users, Award, CheckCircle } from "lucide-react"
import CSSPatternBackground from "@/components/ui/css-pattern-background"

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
    <section className="relative bg-white py-8 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-white"></div>
      <CSSPatternBackground pattern="dots" opacity={0.02} />
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full -ml-48 -mb-48 opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-slate-800"
          >
            About <span className="text-[#2563eb]">StartBusiness</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-lg text-slate-600 md:text-xl"
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
            <h2 className="mb-6 text-3xl font-bold text-[#2563eb]">Our Story</h2>
            <p className="mb-4 text-lg text-slate-600">
              StartBusiness was founded with a vision to simplify the complex process of business registration and
              compliance for entrepreneurs and businesses across India.
            </p>
            <p className="mb-4 text-lg text-slate-600">
              With over a decade of experience in the industry, our team of experts has helped thousands of businesses
              navigate the regulatory landscape and establish their presence in the market.
            </p>
            <p className="mb-6 text-lg text-slate-600">
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
                  className="rounded-lg bg-blue-50 p-4 hover:shadow-md transition-all border border-blue-100"
                >
                  <div className="mb-2 flex items-center">
                    <stat.icon className="mr-2 h-5 w-5 text-[#2563eb]" />
                    <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                  </div>
                  <p className="text-slate-600">{stat.label}</p>
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
              <Image
                src="/about-hero-image.png"
                alt="Our team"
                width={600}
                height={450}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover w-full h-full"
                quality={75}
                priority={true}
                loading="eager"
                fetchPriority="high"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2563eb]/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-2xl font-bold">Building Business </p>
                <p className="text-lg">Since 2012</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-lg bg-[#2563eb] p-4 text-white shadow-lg">
              <p className="text-2xl font-bold">Trusted by</p>
              <p className="text-lg">Businesses across India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

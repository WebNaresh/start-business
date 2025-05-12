"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Reduced to 6 main service categories with icons and images
  const services = [
    {
      title: "Business Registration",
      description: "Register your business entity with proper legal structure",
      image: "/services/service-business-registration.png",
      icon: "/icons/business-registration.png",
      slug: "startup-registration",
      color: "from-blue-500 to-blue-600",
      lightColor: "from-blue-50 to-blue-100",
    },
    {
      title: "Trademark Protection",
      description: "Secure your brand identity and intellectual property",
      image: "/services/service-trademark.png",
      icon: "/icons/trademark.png",
      slug: "trademark-copyright",
      color: "from-purple-500 to-purple-600",
      lightColor: "from-purple-50 to-purple-100",
    },
    {
      title: "Compliance Services",
      description: "Stay compliant with all regulatory requirements",
      image: "/services/service-compliance.png",
      icon: "/icons/compliance.png",
      slug: "company-compliance",
      color: "from-emerald-500 to-emerald-600",
      lightColor: "from-emerald-50 to-emerald-100",
    },
    {
      title: "Tax & GST",
      description: "Manage tax registrations and filings efficiently",
      image: "/services/service-tax.png",
      icon: "/icons/tax.png",
      slug: "tax-services",
      color: "from-amber-500 to-amber-600",
      lightColor: "from-amber-50 to-amber-100",
    },
    {
      title: "FSSAI Registration",
      description: "Food business licensing and compliance solutions",
      image: "/services/service-fssai.png",
      icon: "/icons/fssai.png",
      slug: "fssai-registration",
      color: "from-rose-500 to-rose-600",
      lightColor: "from-rose-50 to-rose-100",
    },
    {
      title: "NGO Services",
      description: "Specialized services for non-profit organizations",
      image: "/services/service-ngo.png",
      icon: "/icons/ngo.png",
      slug: "ngo-services",
      color: "from-cyan-500 to-cyan-600",
      lightColor: "from-cyan-50 to-cyan-100",
    },
  ]

  return (
    <section className="py-8 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-full -ml-16 -mb-16 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#2563eb] bg-blue-50 rounded-full">
            Our Services
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Comprehensive <span className="text-[#2563eb]">Business Solutions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 text-lg">
            Everything you need to start, run, and grow your business
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden shadow-lg h-[280px] transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={service.image || `/placeholder.svg?height=400&width=600&query=${service.title}`}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="mb-4 flex items-center">
                
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="mb-4 text-white/80">{service.description}</p>

                {/* Animated button */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-sm font-medium text-white hover:text-[#2563eb] transition-colors"
                >
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563eb] transition-all duration-300 group-hover:w-full"></span>
                    Explore Services
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Hover overlay with gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr ${
                  service.color
                } mix-blend-soft-light`}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center rounded-full bg-[#2563eb] px-8 py-4 text-lg font-medium text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 group"
          >
            View All Services <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

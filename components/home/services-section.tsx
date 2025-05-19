"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function ServicesSection() {
  // Service data as per the image
  const services = [
    {
      title: "Business Registration",
      description: "Complete business registration and incorporation services",
      price: "₹4,999",
      billing: "/one-time",
      slug: "startup-registration",
      mostPopular: true,
    },
    {
      title: "Trademark Protection",
      description: "Comprehensive trademark registration and protection",
      price: "₹6,499",
      billing: "/one-time",
      slug: "trademark-copyright",
      mostPopular: false,
    },
    {
      title: "Compliance Services",
      description: "Annual compliance and regulatory requirements",
      price: "₹12,999",
      billing: "/one-time",
      slug: "company-compliance",
      mostPopular: false,
    },
    {
      title: "Tax & GST",
      description: "Complete tax and GST management services",
      price: "₹8,999",
      billing: "/one-time",
      slug: "tax-services",
      mostPopular: false,
    },
    {
      title: "FSSAI Registration",
      description: "Food business licensing and compliance",
      price: "₹3,999",
      billing: "/one-time",
      slug: "fssai-registration",
      mostPopular: false,
    },
    {
      title: "NGO Services",
      description: "Specialized services for non-profit organizations",
      price: "₹9,999",
      billing: "/one-time",
      slug: "ngo-services",
      mostPopular: false,
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#2563eb] bg-blue-50 rounded-full">
            Our Services
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Comprehensive <span className="text-[#2563eb]">Business Solutions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 text-lg">
            Everything you need to start, run, and grow your business
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative rounded-xl bg-white shadow-md border ${service.mostPopular ? 'border-[#2563eb] shadow-lg' : 'border-slate-100'} flex flex-col p-6 h-[240px] justify-between`}
            >
              <div>
                <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                <p className="text-slate-600 text-sm mb-6">{service.description}</p>
                <div className="text-2xl font-bold mb-2">{service.price}<span className="text-base font-normal text-slate-500">{service.billing}</span></div>
              </div>
              <Link
                href={`/services/${service.slug}`}
                className={`w-full flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors ${service.mostPopular ? 'bg-[#2563eb] text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'} mt-auto`}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function ServicesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      title: "Startup Registration & Incorporation",
      slug: "startup-registration",
      items: [
        "Sole Proprietorship",
        "Private Limited Company",
        "Public Limited Company",
        "Partnership",
        "Limited Liability Partnership",
        "Section 8 Company",
        "Farmer Producer Company",
        "Artisans Producer Company",
        "Subsidiary of a Foreign Company",
        "Company Incorporation in Foreign Jurisdiction",
      ],
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200",
      borderColor: "border-blue-200",
    },
    {
      title: "Trademark & Copyrights",
      slug: "trademark-copyright",
      items: [
        "Trademark Registration",
        "Trademark Objection",
        "Trademark Opposition",
        "Trademark Hearing",
        "Trademark Rectification",
        "Trademark Registration in Foreign Jurisdiction",
        "Copyright Registration",
        "Copyright Objection",
      ],
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200",
      borderColor: "border-blue-200",
    },
    {
      title: "Companies Law Compliance",
      slug: "company-compliance",
      items: [
        "Obtaining Digital Signature Certificate",
        "Obtaining DIN",
        "Change in Directors",
        "Appointment of Auditor",
        "Annual Filing of Forms",
        "Dematerialisation of Securities",
        "Alteration in Share Capital",
        "Share Transfer",
        "Alteration in MOA and AOA",
        "Change in Company Name",
        "Shifting of Registered Office",
        "Charge Registration",
        "Conducting Due Diligence",
        "Providing Search Reports",
        "Maintenance of Statutory Registers",
        "Closure and Winding up of Business",
        "Beneficial Owner Compliance",
      ],
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200",
      borderColor: "border-purple-200",
    },
    {
      title: "LLP Compliances",
      slug: "llp-compliance",
      items: [
        "Change in Designated Partner",
        "Filing of Form 8 and Form 11",
        "Beneficial Owner Compliance",
        "Maintenance of Statutory Registers",
      ],
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200",
      borderColor: "border-amber-200",
    },
    {
      title: "FEMA Compliance Services",
      slug: "fema-compliance",
      items: ["FDI Reporting with RBI", "Filing of FLA Return"],
      bgColor: "bg-gradient-to-br from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200",
      borderColor: "border-rose-200",
    },
    {
      title: "Other Registrations",
      slug: "other-registrations",
      items: [
        "Startup Registration",
        "MSME (Udyam) Registration",
        "FSSAI Basic Registration",
        "FSSAI State License",
        "FSSAI Central License",
        "GST Registration",
        "ESI Registration",
        "Shop & Establishment",
        "Importer-Exporter Code",
        "EPF Registration",
        "GeM Portal Registration",
      ],
      bgColor: "bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200",
      borderColor: "border-cyan-200",
    },
    {
      title: "NGO Services",
      slug: "ngo-services",
      items: [
        "Section 8 Company Registration",
        "Incorporation of Company Limited by Guarantee",
        "Trust Registration",
        "NGO Darpan Registration",
        "CSR Registration",
        "Filing of CSR-1",
        "Registration on CSR Exchange Portal",
      ],
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200",
      borderColor: "border-orange-200",
    },
    {
      title: "POSH Compliance",
      slug: "posh-compliance",
      items: [
        "Drafting of Organizational Policy",
        "Conducting Training Programs",
        "Formulation of Internal Complaints Committee",
        "Appointment of External Member",
        "Drafting of Minutes",
        "Drafting and Filing of Annual Reports",
      ],
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200",
      borderColor: "border-indigo-200",
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
    <section className="bg-slate-50 py-16" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Comprehensive Services</h2>
          <p className="mx-auto max-w-2xl text-slate-600">Everything you need to start, run, and grow your business</p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`rounded-lg ${service.bgColor} ${service.borderColor} border p-6 shadow-sm transition-all hover:shadow-md`}
            >
              <h3 className="mb-4 text-xl font-bold">{service.title}</h3>
              <ul className="space-y-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              {service.items.length > 4 && (
                <p className="mt-2 text-sm text-slate-500">+{service.items.length - 4} more services</p>
              )}
              
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
          >
            View All Services <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

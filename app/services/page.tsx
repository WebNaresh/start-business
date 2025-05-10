"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Services</h1>
            <p className="mb-6 text-lg text-blue-100">
              Comprehensive business solutions to help you start, run, and grow your business
            </p>
            <WhatsAppCTAButton size="lg" className="mt-4 shadow-lg">
              Get Expert Advice Now
            </WhatsAppCTAButton>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200 group"
              >
                <div className="mb-4 rounded-full bg-blue-100 p-3 w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <service.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h2 className="mb-4 text-2xl font-bold group-hover:text-blue-600 transition-colors">{service.title}</h2>
                <p className="mb-6 text-slate-600">{service.description}</p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <WhatsAppCTAButton service={service.title} className="flex-1">
                    Contact Now
                  </WhatsAppCTAButton>
                  <Link href={`/services/${service.slug}`} className="flex-1">
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-white p-8 shadow-lg border border-blue-100">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-slate-800">Need Help Choosing the Right Service?</h2>
                <p className="mb-6 text-lg text-slate-600">
                  Our experts are available on WhatsApp to guide you through the process and help you select the
                  services that best fit your business needs.
                </p>
                <WhatsAppCTAButton size="lg" className="shadow-md hover:shadow-lg">
                  Chat With Us Now
                </WhatsAppCTAButton>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer">
                  <a
                    href={`https://wa.me/919699214195?text=${encodeURIComponent("Hi! I'm interested in your business services. Can you help me choose the right one for my needs?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/business-consultation.png"
                      alt="Business consultation"
                      width={400}
                      height={300}
                      className="w-full h-auto transition-transform group-hover:scale-[1.02] duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <p className="font-medium flex items-center">
                          <MessageSquare className="mr-2 h-5 w-5" />
                          Get instant WhatsApp consultation
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Building, FileCheck, FileText, Globe, Landmark, LayoutGrid, ShieldCheck, Users } from "lucide-react"

const services = [
  {
    title: "Startup Registration & Incorporation",
    slug: "startup-registration",
    icon: Building,
    description: "Register your business entity and obtain the necessary licenses to operate legally in India.",
    features: [
      "Private Limited Company Registration",
      "LLP Registration",
      "One Person Company Registration",
      "Foreign Company Registration",
      "Fast processing and documentation",
    ],
  },
  {
    title: "Trademark & Copyrights",
    slug: "trademark-copyright",
    icon: ShieldCheck,
    description: "Secure your brand identity and intellectual property with our comprehensive IPR services.",
    features: [
      "Trademark Registration",
      "Trademark Objection & Opposition",
      "Copyright Registration",
      "IP Protection Strategy",
      "International Trademark Registration",
    ],
  },
  {
    title: "Companies Law Compliance",
    slug: "company-compliance",
    icon: FileCheck,
    description: "Stay compliant with all statutory requirements and avoid penalties with our compliance services.",
    features: [
      "Annual Filings (AOC-4, MGT-7)",
      "Director KYC and Changes",
      "Share Capital Alterations",
      "Charge Registration",
      "Statutory Registers Maintenance",
    ],
  },
  {
    title: "LLP Compliances",
    slug: "llp-compliance",
    icon: FileText,
    description: "Ensure your Limited Liability Partnership meets all regulatory requirements.",
    features: [
      "Annual Return Filing (Form 8)",
      "Statement of Accounts (Form 11)",
      "Partner Changes",
      "Beneficial Owner Compliance",
      "LLP Agreement Amendments",
    ],
  },
  {
    title: "FEMA Compliance Services",
    slug: "fema-compliance",
    icon: Globe,
    description: "Navigate foreign investment regulations with our specialized FEMA compliance services.",
    features: [
      "FDI Reporting with RBI",
      "Filing of FLA Returns",
      "FCGPR/FCTRS Filings",
      "ODI Compliance",
      "FEMA Consultation",
    ],
  },
  {
    title: "Other Registrations",
    slug: "other-registrations",
    icon: LayoutGrid,
    description: "Obtain all necessary licenses and registrations to operate your business smoothly.",
    features: [
      "GST Registration",
      "MSME/Udyam Registration",
      "FSSAI Registration",
      "Import-Export Code",
      "Shop & Establishment License",
    ],
  },
  {
    title: "NGO Services",
    slug: "ngo-services",
    icon: Users,
    description: "Specialized services for non-profit organizations and charitable institutions.",
    features: [
      "Section 8 Company Registration",
      "Trust Registration",
      "NGO Darpan Registration",
      "CSR Registration",
      "FCRA Registration",
    ],
  },
  {
    title: "POSH Compliance",
    slug: "posh-compliance",
    icon: Landmark,
    description: "Create safe workplaces with our Prevention of Sexual Harassment (POSH) compliance services.",
    features: [
      "POSH Policy Drafting",
      "Internal Committee Formation",
      "Employee Awareness Training",
      "External Member Appointment",
      "Annual Report Filing",
    ],
  },
]

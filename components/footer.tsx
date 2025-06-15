"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronUp,
  Clock,
  Shield,
  Globe,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function EnhancedFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isBusinessOpen = () => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()

    if (day === 0 || day === 6) return false // Saturday and Sunday closed
    return hour >= 10 && hour < 19 // Monday-Friday 10-7
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Enhanced Main Footer */}
      <div className="bg-slate-800 py-8 lg:py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {/* Company Info - Full width on mobile, spans 2 cols on xl */}
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <Link href="/" className="mb-4 lg:mb-6 flex items-center group">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 mr-3 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-2 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                    alt="StartBusiness"
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    StartBusiness
                  </span>
                </div>
              </Link>

              <p className="mb-4 lg:mb-6 text-slate-300 leading-relaxed text-sm sm:text-base">
                Your trusted partner for business registration, compliance, and legal services in India. Empowering
                entrepreneurs since 2017.
              </p>

              {/* Enhanced Social Links */}
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                  { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
                  { icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
                  { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-slate-700 text-slate-300 transition-all duration-300 ${social.color} hover:text-white hover:scale-110 hover:shadow-lg`}
                    aria-label={`Follow us on ${social.icon.name}`}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-1">
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Our Services
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "Startup Registration", href: "/services/startup-registration", popular: true },
                  { name: "Trademark & Copyright", href: "/services/trademark-copyright", popular: false },
                  { name: "Company Compliance", href: "/services/company-compliance", popular: true },
                  { name: "LLP Registration", href: "/services/llp-compliance", popular: false },
                  { name: "Tax Services", href: "/services/tax-services", popular: true },
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="group flex items-center text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm sm:text-base"
                    >
                      <span className="mr-2 lg:mr-3 h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 flex-1">
                        {service.name}
                      </span>
                      {service.popular && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs bg-orange-900/50 text-orange-300 border-orange-800 hidden sm:inline-flex"
                        >
                          Popular
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="group flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm sm:text-base"
                  >
                    <span className="mr-2">View All Services</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Tools", href: "/calculators" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Success Stories", href: "/testimonials" },
                  { name: "Blog & Resources", href: "/blog" },
                  { name: "Career Opportunities", href: "/careers" },
                  { name: "Help & FAQs", href: "/faq" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm sm:text-base"
                    >
                      <span className="mr-2 lg:mr-3 h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculator Tools */}
            <div className="lg:col-span-1">
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Calculator Tools
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "GST Calculator", href: "/calculators/gst", popular: true },
                  { name: "TDS Calculator", href: "/calculators/tds" },
                  { name: "Income Tax Calculator", href: "/calculators/income-tax", popular: true },
                  { name: "HRA Calculator", href: "/calculators/hra" },
                  { name: "Gratuity Calculator", href: "/calculators/gratuity" },
                  { name: "EPF Calculator", href: "/calculators/epf", popular: true },
                ].map((tool, index) => (
                  <li key={index}>
                    <Link
                      href={tool.href}
                      className="group flex items-center text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm sm:text-base"
                    >
                      <span className="mr-2 lg:mr-3 h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 flex-1">
                        {tool.name}
                      </span>
                      {tool.popular && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs bg-orange-900/50 text-orange-300 border-orange-800 hidden sm:inline-flex"
                        >
                          Popular
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/calculators"
                    className="group flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm sm:text-base"
                  >
                    <span className="mr-2">View All Calculators</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Government Portals - Hidden on mobile, shown on larger screens */}
            <div className=" lg:block lg:col-span-1">
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Government Portals
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "MCA Portal", href: "https://www.mca.gov.in", external: true },
                  { name: "GST Portal", href: "https://www.gst.gov.in", external: true },
                  { name: "Income Tax Portal", href: "https://www.incometax.gov.in", external: true },
                  { name: "MSME Portal", href: "https://udyamregistration.gov.in", external: true },
                  { name: "EPF Portal", href: "https://www.epfindia.gov.in", external: true },
                  { name: "Startup India", href: "https://www.startupindia.gov.in", external: true },
                ].map((portal, index) => (
                  <li key={index}>
                    <a
                      href={portal.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm sm:text-base"
                    >
                      <span className="mr-2 lg:mr-3 h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 flex-1">
                        {portal.name}
                      </span>
                      <Globe className="ml-2 h-3 w-3 text-blue-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Business Hours - Combined on mobile, separate on larger screens */}
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Get In Touch
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>

              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                <div className="flex items-start group">
                  <div className="mr-3 p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-300 mb-1">Office Address</p>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      Office No 7, 3rd Floor, Saraswati Heights,
                      <br />
                      Deccan Gymkhana, Behind Goodluck Café,
                      <br />
                      Pune 411004, Maharashtra
                    </p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="mr-3 p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
                    <Phone className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-300 mb-1">Phone Number</p>
                    <a
                      href="https://wa.me/919699214195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-green-400 transition-colors text-xs sm:text-sm font-medium"
                    >
                      +91 91684 99520
                    </a>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="mr-3 p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
                    <Mail className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-300 mb-1">Email Address</p>
                    <a
                      href="mailto:start@startbusiness.co.in"
                      className="text-slate-400 hover:text-purple-400 transition-colors text-xs sm:text-sm break-all"
                    >
                      start@startbusiness.co.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours Card removed */}
            </div>
          </div>

          {/* Divider for separation */}
          <div className="my-6 lg:my-8 border-t border-slate-700"></div>

          {/* Enhanced Bottom Bar */}
          <div className="bg-slate-900 text-white py-4 lg:py-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-center sm:text-left">
                <p className="text-slate-300">&copy; {new Date().getFullYear()} StartBusiness - All rights reserved.</p>
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>SSL Secured</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-xs sm:text-sm">
                {[
                  { name: "Privacy Policy", href: "/legal/privacy-policy" },
                  { name: "Terms of Service", href: "/legal/terms" },
                  { name: "Refund Policy", href: "/legal/refund-policy" },
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-300 hover:underline whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

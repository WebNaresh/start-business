"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 relative">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full -ml-48 -mb-48 opacity-10"></div>

        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated with Latest Business Insights
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for expert tips, regulatory updates, and exclusive offers to help your
                business thrive.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <WhatsAppCTAButton className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 w-full sm:w-auto">
                  Chat With Us Now
                </WhatsAppCTAButton>

                <Button
                  className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 w-full sm:w-auto"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-white text-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="mb-6 flex items-center">
                <div className="relative h-10 w-10 mr-2 overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                    alt="StartBusiness.co.in"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    StartBusiness
                  </span>
                  <span className="text-xl font-bold text-slate-400">.co.in</span>
                </div>
              </Link>
              <p className="mb-6 text-slate-400 max-w-xs">
                Your trusted partner for business registration, compliance, and legal services in India.
              </p>
              <div className="flex flex-wrap space-x-3 mt-4">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-800 relative inline-block">
                Our Services
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-600"></span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/startup-registration"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    Startup Registration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/trademark-copyright"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    Trademark & Copyright
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/company-compliance"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    Company Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/llp-compliance"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    LLP Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/fema-compliance"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    FEMA Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-blue-600 hover:text-blue-500 transition-colors font-medium flex items-center"
                  >
                    View All Services
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-800 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-600"></span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center">
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center">
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testimonials"
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-600"></span>
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-800 relative inline-block">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-600"></span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 break-words">
                    Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café, Pune 411004
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-blue-500 flex-shrink-0" />
                  <a
                    href="https://wa.me/919699214195"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-blue-400 transition-colors"
                  >
                    +91 96992 14195
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-blue-500 flex-shrink-0" />
                  <a
                    href="mailto:sales@biztreeaccounting.com"
                    className="text-slate-600 hover:text-blue-400 transition-colors"
                  >
                    sales@biztreeaccounting.com
                  </a>
                </li>
              </ul>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 className="text-slate-800 font-medium mb-2">Business Hours</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex flex-wrap justify-between text-slate-600">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex flex-wrap justify-between text-slate-600">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </p>
                  <p className="flex flex-wrap justify-between text-slate-600">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
                <div className="mt-4">
                  <WhatsAppCTAButton className="w-full text-sm">Chat With Us Now</WhatsAppCTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-50 border-t border-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-slate-500 mb-4 md:mb-0 text-center md:text-left">
              &copy; {new Date().getFullYear()} StartBusiness.co.in. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="hover:text-blue-400 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-3 shadow-lg transition-all hover:shadow-blue-600/20 hover:shadow-xl"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  )
}

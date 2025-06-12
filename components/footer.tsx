"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
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
  Award,
  Shield,
  Users,
  Star,
  Send,
  CheckCircle,
  Globe,
  MessageCircle,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function EnhancedFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Enhanced CTA Section */}
   

      {/* Enhanced Main Footer */}
      <div className="bg-gradient-to-br from-slate-200 to-white py-8">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Link href="/" className="mb-6 flex items-center group">
                <div className="relative h-12 w-12 mr-3 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-2 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                    alt="StartBusiness"
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    StartBusiness
                  </span>
             
                </div>
              </Link>

              <p className="mb-6 text-slate-600 leading-relaxed">
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
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 ${social.color} hover:text-white hover:scale-110 hover:shadow-lg`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Follow us on ${social.icon.name}`}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h3 className="mb-6 text-lg font-bold text-slate-800 relative">
                Our Services
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
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
                      className="group flex items-center text-slate-600 hover:text-blue-600 transition-all duration-300"
                    >
                      <span className="mr-3 h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-blue-600 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {service.name}
                      </span>
                      {service.popular && (
                        <Badge variant="secondary" className="ml-2 text-xs bg-orange-100 text-orange-600">
                          Popular
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="group flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <span className="mr-2">View All Services</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="mb-6 text-lg font-bold text-slate-800 relative">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
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
                      className="group flex items-center text-slate-600 hover:text-blue-600 transition-all duration-300"
                    >
                      <span className="mr-3 h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-blue-600 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Enhanced Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className="mb-6 text-lg font-bold text-slate-800 relative">
                Get In Touch
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start group">
                  <div className="mr-3 p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">Office Address</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Office No 7, 3rd Floor, Saraswati Heights,
                      <br />
                      Deccan Gymkhana, Behind Goodluck Café,
                      <br />
                      Pune 411004, Maharashtra
                    </p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="mr-3 p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">Phone Number</p>
                    <a
                      href="https://wa.me/919699214195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-green-600 transition-colors text-sm font-medium"
                    >
                      +91 91684 99520
                    </a>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="mr-3 p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Mail className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">Email Address</p>
                    <a
                      href="mailto:start@startbusiness.co.in"
                      className="text-slate-600 hover:text-purple-600 transition-colors text-sm"
                    >
                      start@startbusiness.co.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Enhanced Business Hours */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-slate-800 font-semibold flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    Business Hours
                  </h4>
                  <Badge
                    variant={isBusinessOpen() ? "default" : "secondary"}
                    className={`text-xs ${
                      isBusinessOpen()
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    {isBusinessOpen() ? "Open Now" : "Closed"}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Monday - Friday:</span>
                    <span className="font-medium text-slate-700">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Saturday:</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Sunday:</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-blue-200">
                  <p className="text-xs text-slate-500 mb-3">
                    Current time:{" "}
                    {currentTime.toLocaleTimeString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    IST
                  </p>
                  <WhatsAppCTAButton className="w-full text-sm py-2">
                  
                    Call Now
                  </WhatsAppCTAButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Bottom Bar */}
      <div className="bg-slate-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <p className="text-slate-300">
                &copy; {new Date().getFullYear()} StartBusiness - All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-slate-400">
                <Shield className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: "Privacy Policy", href: "/legal/privacy-policy" },
                { name: "Terms of Service", href: "/legal/terms" },
                { name: "Refund Policy", href: "/legal/refund-policy" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors duration-300 hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </motion.button>
    </footer>
  )
}

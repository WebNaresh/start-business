"use client"

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
  Shield,
  Globe,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EnhancedFooter() {

  return (
    <footer className="relative overflow-hidden">
      {/* Enhanced Main Footer */}
      <div className="bg-slate-800 py-8 lg:py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* First Row - Company Info + Main Services */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-8">
            {/* Company Info */}
            <div>
              <Link href="/" className="mb-4 lg:mb-6 flex items-center group">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 mr-3 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-2 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/logos/logo_icon.png"
                    alt="StartBusiness logo"
                    width={48}
                    height={48}
                    sizes="(max-width: 640px) 40px, 48px"
                    className="object-contain filter brightness-0 invert w-full h-full"
                    quality={75}
                    priority={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
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

            {/* Company Registration Services */}
            <div>
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Company Registration
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "Private Limited Company", href: "/services/private-limited-company", popular: true },
                  { name: "Limited Liability Partnership", href: "/services/llp", popular: false },
                  { name: "One Person Company", href: "/services/opc", popular: false },
                  { name: "Partnership Firm", href: "/services/partnership-firm", popular: false },
                  { name: "Sole Proprietorship", href: "/services/sole-proprietorship", popular: false },
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="group flex items-center text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm sm:text-base"
                      title={`${service.name} registration services`}
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

            {/* Compliances Services */}
            <div>
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Compliances
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "GST Registration", href: "/services/gst-registration", popular: true },
                  { name: "Company Annual ROC Compliance", href: "/services/roc-annual-compliances", popular: true },
                  { name: "LLP Annual Compliance", href: "/services/llp-annual-compliance", popular: false },
                  { name: "FEMA Compliance", href: "/services/fema-compliance", popular: false },
                  { name: "CSR Compliance", href: "/services/csr-compliance", popular: false },
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="group flex items-center text-slate-300 hover:text-green-400 transition-all duration-300 text-sm sm:text-base"
                      title={`${service.name} services`}
                    >
                      <span className="mr-2 lg:mr-3 h-1.5 w-1.5 rounded-full bg-green-500 group-hover:bg-green-400 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 flex-1">
                        {service.name}
                      </span>
                      {service.popular && (
                        <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-700 border-green-200">
                          Popular
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services/tax-compliance"
                    className="group flex items-center text-green-400 hover:text-green-300 font-medium transition-colors text-sm sm:text-base"
                  >
                    <span className="mr-2">View All Tax Services</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Second Row - Business Tools & Resources */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-8">
            {/* Business Calculators */}
            <div>
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Business Calculators
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "GST Calculator", href: "/business-calculators/gst-calculator", popular: true },
                  { name: "Income Tax Calculator", href: "/business-calculators/income-tax-calculator", popular: true },
                  { name: "EMI Calculator", href: "/business-calculators/emi-calculator", popular: false },
                  { name: "Business Loan Calculator", href: "/business-calculators/business-loan-calculator", popular: false },
                  { name: "Salary Calculator", href: "/business-calculators/salary-calculator", popular: false },
                ].map((tool, index) => (
                  <li key={index}>
                    <Link
                      href={tool.href}
                      className="group flex items-center text-slate-300 hover:text-purple-400 transition-all duration-300 text-sm sm:text-base"
                      title={`Free ${tool.name} for business calculations`}
                    >
                      <span className="mr-2 lg:mr-3 h-1.5 w-1.5 rounded-full bg-purple-500 group-hover:bg-purple-400 group-hover:scale-150 transition-all duration-300"></span>
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
                    href="/business-calculators"
                    className="group flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors text-sm sm:text-base"
                  >
                    <span className="mr-2">View All Calculators</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Intellectual Property
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "Trademark Registration", href: "/services/trademark-registration", popular: true },
                  { name: "Copyright Registration", href: "/services/copyright-registration", popular: false },
                  { name: "Trademark Objection", href: "/services/trademark-objection", popular: false },
                  { name: "Trademark Hearing", href: "/services/trademark-hearing", popular: false },
                  { name: "Copyright Objection", href: "/services/copyright-objection", popular: false },
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="group flex items-center text-slate-300 hover:text-red-400 transition-all duration-300 text-sm sm:text-base"
                      title={`${service.name} services`}
                    >
                      <span className="mr-2 lg:mr-3 h-1.5 w-1.5 rounded-full bg-red-500 group-hover:bg-red-400 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 flex-1">
                        {service.name}
                      </span>
                      {service.popular && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs bg-red-100 text-red-700 border-red-200"
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
                    className="group flex items-center text-red-400 hover:text-red-300 font-medium transition-colors text-sm sm:text-base"
                  >
                    <span className="mr-2">View All Legal Services</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Business Setup */}
            <div>
              <h3 className="mb-4 lg:mb-6 text-base sm:text-lg font-bold text-white relative">
                Business Setup
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { name: "IEC License", href: "/services/iec-license", popular: true },
                  { name: "Shop & Establishment", href: "/services/shop-establishment", popular: false },
                  { name: "Professional Tax", href: "/services/professional-tax", popular: false },
                  { name: "Startup India", href: "/services/startup-india", popular: false },
                  { name: "MSME Registration", href: "/services/msme-registration", popular: true },
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="group flex items-center text-slate-300 hover:text-indigo-400 transition-all duration-300 text-sm sm:text-base"
                      title={`${service.name} services`}
                    >
                      <span className="mr-2 lg:mr-3 h-1.5 w-1.5 rounded-full bg-indigo-500 group-hover:bg-indigo-400 group-hover:scale-150 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 flex-1">
                        {service.name}
                      </span>
                      {service.popular && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs bg-indigo-100 text-indigo-700 border-indigo-200"
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
                    className="group flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition-colors text-sm sm:text-base"
                  >
                    <span className="mr-2">View All Setup Services</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Third Row - Additional Services and Contact */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-8">
            {/* Resources & Guides */}
            <div>
              <h3 className="mb-4 text-base font-bold text-white relative">
                Resources & Guides
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {[
                  { name: "Business Blog", href: "/blog" },
                  { name: "Startup Guide", href: "/blog/startup-guide" },
                  { name: "Tax Filing Guide", href: "/blog/tax-filing-guide" },
                  { name: "Company Registration Guide", href: "/blog/company-registration-guide" },
                ].map((resource, index) => (
                  <li key={index}>
                    <Link
                      href={resource.href}
                      className="text-slate-300 hover:text-orange-400 transition-colors text-sm"
                      title={`${resource.name} - Free business resources`}
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h3 className="mb-4 text-base font-bold text-white relative">
                Get In Touch
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></span>
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-start group">
                  <div className="mr-3 p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-300 mb-1">Office Address</p>
                    <p className="text-slate-400 text-xs leading-relaxed">
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
                    <p className="text-xs font-medium text-slate-300 mb-1">Phone Number</p>
                    <a
                      href="https://wa.me/919699214195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-green-400 transition-colors text-xs font-medium"
                    >
                      +91 96992 14195
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-base font-bold text-white relative">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {[
                  { name: "About Us", href: "/about-us" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Sitemap", href: "/sitemap-page" },
                  { name: "Privacy Policy", href: "/privacy-policy" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-yellow-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


          </div>

          {/* Divider for separation */}
          <div className="my-6 lg:my-8 border-t border-slate-700"></div>

          {/* Enhanced Bottom Bar */}
          <div className="bg-slate-900 text-white py-4 lg:py-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-center sm:text-left">
                <p className="text-slate-300">&copy; {new Date().getFullYear()} StartBusiness - All rights reserved.</p>
                <div className="flex items-center gap-2 text-slate-300">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>SSL Secured</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-xs sm:text-sm">
                {[
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms of Service", href: "/terms-of-service" },
                  { name: "Refund Policy", href: "/refund-policy" },
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

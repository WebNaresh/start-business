"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Phone, Mail, X, MapPin, ChevronDown, ChevronRight, Building2, FileText, Gavel, Shield, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface SubService {
  name: string
  href: string
  popular?: boolean
  new?: boolean
  description?: string
}

interface Service {
  id: string
  name: string
  shortName: string
  icon: any
  description: string
  color: string
  bgColor: string
  gradientFrom: string
  gradientTo: string
  subServices: SubService[]
}

interface SubLink {
  name: string
  href: string
}

interface NavLink {
  name: string
  href: string
  subLinks?: SubLink[]
}

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const pathname = usePathname()

  const serviceCategories: Service[] = [
    {
      id: "business-setup",
      name: "Business Setup",
      shortName: "Setup",
      icon: Building2,
      description: "Complete business registration and setup services",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      gradientFrom: "from-blue-600",
      gradientTo: "to-blue-400",
      subServices: [
        {
          name: "Private Limited Company",
          href: "/services/private-limited-company",
          popular: true,
          description: "Register your business as a Private Limited Company with limited liability protection",
        },
        {
          name: "Limited Liability Partnership",
          href: "/services/llp",
          description: "Form an LLP with the benefits of partnership and limited liability",
        },
        {
          name: "One Person Company",
          href: "/services/opc",
          description: "Start a company with a single person as shareholder and director",
        },
        {
          name: "Sole Proprietorship",
          href: "/services/sole-proprietorship",
          description: "Register as a sole proprietor for simple business structure",
        },
        {
          name: "Nidhi Company",
          href: "/services/nidhi-company",
          description: "Establish a Nidhi Company for borrowing and lending among members",
        },
        {
          name: "Producer Company",
          href: "/services/producer-company",
          description: "Form a company owned by primary producers or farmers",
        },
        {
          name: "Partnership Firm",
          href: "/services/partnership-firm",
          description: "Create a partnership between two or more individuals",
        },
        {
          name: "Startup India Registration",
          href: "/services/startup-india",
          new: true,
          description: "Register under Startup India to access government benefits and incentives",
        },
      ],
    },
    {
      id: "tax-compliance",
      name: "Tax & Compliance",
      shortName: "Tax",
      icon: FileText,
      description: "GST, tax filing, and compliance management",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      gradientFrom: "from-emerald-600",
      gradientTo: "to-green-400",
      subServices: [
        {
          name: "GST Registration",
          href: "/services/gst-registration",
          popular: true,
          description: "Register for Goods and Services Tax (GST) for your business",
        },
        {
          name: "ITR-4 Filing",
          href: "/services/itr-4-filing",
          popular: true,
          description: "File your income tax returns under presumptive taxation scheme",
        },
        {
          name: "ROC Annual Compliances",
          href: "/services/roc-annual-compliances",
          description: "Stay compliant with all ROC requirements including annual returns",
        },
        {
          name: "GST Filing",
          href: "/services/gst-filing",
          description: "File your GST returns accurately and on time",
        },
        {
          name: "GST Cancellation and Revocation",
          href: "/services/gst-cancellation",
          description: "Cancel or revoke your GST registration",
        },
        {
          name: "Income Tax Filing",
          href: "/services/income-tax-filing",
          popular: true,
          description: "File your income tax returns accurately and on time",
        },
        {
          name: "TDS Return Filing",
          href: "/services/tds-filing",
          description: "File your Tax Deducted at Source (TDS) returns",
        },
        {
          name: "Annual Compliance",
          href: "/services/annual-compliance",
          description: "Manage all your annual compliance requirements",
        },
      ],
    },
    {
      id: "intellectual-property",
      name: "Trademark & IP",
      shortName: "IP",
      icon: Shield,
      description: "Protect your brand and intellectual property",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      gradientFrom: "from-purple-600",
      gradientTo: "to-indigo-400",
      subServices: [
        {
          name: "Trademark Registration",
          href: "/services/trademark-registration",
          popular: true,
          description: "Protect your brand identity with trademark registration",
        },
        {
          name: "Trademark Search",
          href: "/services/trademark-search",
          description: "Check if your desired trademark is available",
        },
        {
          name: "Respond to TM Objection",
          href: "/services/trademark-objection",
          description: "Get help responding to trademark objections",
        },
        {
          name: "Copyright Registration",
          href: "/services/copyright-registration",
          description: "Protect your creative works with copyright registration",
        },
      ],
    },
    {
      id: "licenses-registrations",
      name: "Licenses & Registrations",
      shortName: "Licenses",
      icon: Gavel,
      description: "Various business licenses and regulatory approvals",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      gradientFrom: "from-amber-600",
      gradientTo: "to-orange-400",
      subServices: [
        {
          name: "Import Export Code",
          href: "/services/iec-license",
          description: "Get IEC code for import/export business activities",
        },
        {
          name: "Digital Signature Certificate",
          href: "/services/digital-signature",
          description: "Obtain DSC for secure electronic transactions",
        },
        {
          name: "MSME Registration",
          href: "/services/msme-registration",
          popular: true,
          description: "Register as a Micro, Small, or Medium Enterprise",
        },
        {
          name: "Shop & Establishment License",
          href: "/services/shop-establishment",
          description: "Obtain mandatory license for your business premises",
        },
        {
          name: "Professional Tax Registration",
          href: "/services/professional-tax",
          description: "Register for professional tax in your state",
        },
      ],
    },
  ]

  // Handle scroll effect with improved performance
  useEffect(() => {
    setMounted(true)
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { 
      name: "More",
      href: "#",
      subLinks: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        {name:"Blog",href:"/blog"},
        { name: "Tools", href: "/calculators" },
      ]
    }
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  if (!mounted) {
    return null
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-lg bg-white/95 backdrop-blur-sm" : "bg-white"}`}>
      {/* Top bar with contact info */}
     

     

      {/* Main navigation */}
      <div className={`transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <div className="container mx-auto flex items-end justify-between px-4">
          {/* Logo with animation */}
          <Link href="/" className="flex items-center group">
            <motion.div 
              className="relative h-8 w-8 mr-2 overflow-hidden"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                alt="StartBusiness"
                fill
                className="object-contain"
              />
            </motion.div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">
                StartBusiness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with improved hover effects */}
          <nav className="hidden lg:flex items-center justify-end space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative" 
                onMouseEnter={() => setOpenCategory(link.name)} 
                onMouseLeave={() => setOpenCategory(null)}
              >
                {link.subLinks ? (
                  <>
                    <button
                      className={`relative px-1 py-1 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1 ${
                        isActive(link.href) 
                          ? "text-blue-600" 
                          : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openCategory === link.name ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {openCategory === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-[200px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                        >
                          <div className="p-1">
                            <div className="space-y-1">
                              {link.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.href}
                                  href={subLink.href}
                                  className="block px-2 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                                >
                                  {subLink.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive(link.href) 
                        ? "text-blue-600" 
                        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {link.name}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}

            {/* Service Categories with enhanced dropdown */}
            {serviceCategories.map((category) => (
              <div 
                key={category.id} 
                className="relative" 
                onMouseEnter={() => setOpenCategory(category.id)} 
                onMouseLeave={() => setOpenCategory(null)}
              >
                <button
                  className={`relative px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1 ${
                    isActive(`/services/${category.id}`) 
                      ? "text-blue-600" 
                      : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {category.name}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openCategory === category.id ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {openCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-[300px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <category.icon className={`w-4 h-4 ${category.color}`} />
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800">{category.name}</h3>
                        </div>
                        <div className="space-y-1">
                          {category.subServices.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block px-2 py-1.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                            >
                              <div className="flex items-center justify-between">
                                <span>{service.name}</span>
                                {service.popular && (
                                  <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-none text-[10px] px-1.5 py-0">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
                        <Link
                          href={`/services/${category.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                        >
                          View all {category.name} services
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

     

          {/* Mobile menu button with animation */}
          <Sheet>
            <SheetTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="outline" size="icon" className="lg:hidden border-none">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile menu header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                      alt="StartBusiness"
                      width={32}
                      height={32}
                      className="mr-2"
                    />
                    <span className="text-lg font-bold text-slate-900">StartBusiness</span>
                  </Link>
                </div>

                {/* Mobile navigation */}
                <div className="flex-1 overflow-auto py-4 px-2">
                  <nav className="flex flex-col space-y-1">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                          isActive("/")
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        Home
                      </Link>
                    </SheetClose>

                    {/* More dropdown in mobile */}
                    <div className="space-y-1">
                      <button
                        onClick={() => setExpandedMobileCategory(expandedMobileCategory === "More" ? null : "More")}
                        className={`w-full rounded-md px-4 py-3 text-base font-medium transition-colors flex items-center justify-between ${
                          isActive("/about") || isActive("/contact") || isActive("/calculators")
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        <span>More</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            expandedMobileCategory === "More" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedMobileCategory === "More" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-1">
                              <SheetClose asChild>
                                <Link
                                  href="/about"
                                  className="block px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                >
                                  About Us
                                </Link>
                              </SheetClose>
                              <SheetClose asChild>
                                <Link
                                  href="/contact"
                                  className="block px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                >
                                  Contact
                                </Link>
                              </SheetClose>
                              <SheetClose asChild>
                                <Link
                                  href="/calculators"
                                  className="block px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                >
                                  Tools
                                </Link>
                              </SheetClose>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Mobile Service Categories */}
                    {serviceCategories.map((category) => (
                      <div key={category.id} className="space-y-1">
                        <button
                          onClick={() => setExpandedMobileCategory(expandedMobileCategory === category.id ? null : category.id)}
                          className={`w-full rounded-md px-4 py-3 text-base font-medium transition-colors flex items-center justify-between ${
                            isActive(`/services/${category.id}`)
                              ? "bg-blue-50 text-blue-600"
                              : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${category.bgColor}`}>
                              <category.icon className={`w-4 h-4 ${category.color}`} />
                            </div>
                            <span>{category.name}</span>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              expandedMobileCategory === category.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedMobileCategory === category.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 space-y-1">
                                {category.subServices.map((service) => (
                                  <SheetClose asChild key={service.href}>
                                    <Link
                                      href={service.href}
                                      className="block px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span>{service.name}</span>
                                        {service.popular && (
                                          <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-none text-[10px] px-1.5 py-0">
                                            Popular
                                          </Badge>
                                        )}
                                      </div>
                                    </Link>
                                  </SheetClose>
                                ))}
                                <SheetClose asChild>
                                  <Link
                                    href={`/services/${category.id}`}
                                    className="block px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                                  >
                                    View all {category.name} services
                                  </Link>
                                </SheetClose>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Mobile contact & CTA */}
                <div className="border-t p-4 space-y-4">
                  <div className="flex flex-col space-y-3">
                    <a
                      href="https://wa.me/919699214195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <Phone className="mr-2 h-4 w-4 text-blue-600" />
                      <span>+91 96992 14195</span>
                    </a>
                    <a
                      href="mailto:sales@biztreeaccounting.com"
                      className="flex items-center text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="mr-2 h-4 w-4 text-blue-600" />
                      <span>sales@biztreeaccounting.com</span>
                    </a>
                  </div>
                  <WhatsAppCTAButton className="w-full rounded-md">Call Now</WhatsAppCTAButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

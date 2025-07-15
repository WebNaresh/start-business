"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Phone, Mail, ChevronDown, ChevronRight, Building2, FileText, Gavel, Shield, Calculator, TrendingUp, Receipt, Home, PiggyBank, Target, Banknote } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import { Badge } from "@/components/ui/badge"

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

interface Calculator {
  name: string
  href: string
  popular?: boolean
  new?: boolean
  description?: string
}

interface CalculatorCategory {
  id: string
  name: string
  shortName: string
  icon: any
  description: string
  color: string
  bgColor: string
  gradientFrom: string
  gradientTo: string
  calculators: Calculator[]
}



export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null)
  const pathname = usePathname()
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

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
          name: "Section 8 Company",
          href: "/services/section-8-company",
          description: "Register a non-profit company for charitable and social welfare activities",
        },
        {
          name: "Subsidiary of Foreign Company",
          href: "/services/subsidiary-foreign-company",
          description: "Establish Indian subsidiary of your foreign company with complete compliance",
        },
      ],
    },
    {
      id: "tax-compliance",
      name: "Compliances",
      shortName: "Compliance",
      icon: FileText,
      description: "MCA, RBI and regulatory compliance management",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      gradientFrom: "from-emerald-600",
      gradientTo: "to-green-400",
      subServices: [
        {
          name: "Company Annual ROC Compliance",
          href: "/services/roc-annual-compliances",
          popular: true,
          description: "Stay compliant with all ROC requirements including annual returns",
        },
        {
          name: "LLP Annual Compliance",
          href: "/services/llp-annual-compliance",
          description: "Complete LLP annual compliance including Form 8 and Form 11",
        },
        {
          name: "FEMA Compliance Services",
          href: "/services/fema-compliance",
          description: "FDI/ODI reporting with RBI and FLA return filing services",
        },
        {
          name: "CSR Compliances",
          href: "/services/csr-compliance",
          description: "CSR consultancy, CSR-1 and CSR-2 filing services",
        },
        {
          name: "Maintenance of Statutory Registers",
          href: "/services/statutory-registers",
          description: "Maintain all mandatory statutory registers and minutes",
        },
        {
          name: "Shifting of Registered Office",
          href: "/services/registered-office-shifting",
          description: "Change registered office address with complete regulatory compliance",
        },
        {
          name: "Dematerialisation of Securities",
          href: "/services/dematerialisation-securities",
          description: "Convert physical securities to electronic form with NSDL/CDSL",
        },
      ],
    },
    {
      id: "intellectual-property",
      name: "Trademark Services",
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
          name: "Trademark Rectification",
          href: "/services/trademark-rectification",
          description: "Remove or modify trademark registrations through legal proceedings",
        },
        {
          name: "Respond to TM Objection",
          href: "/services/trademark-objection",
          description: "Get help responding to trademark objections",
        },
        {
          name: "Trademark Hearing",
          href: "/services/trademark-hearing",
          description: "Professional representation for trademark hearings",
        },
        {
          name: "Copyright Registration",
          href: "/services/copyright-registration",
          description: "Protect your creative works with copyright registration",
        },
        {
          name: "Copyright Objection",
          href: "/services/copyright-objection",
          description: "Handle copyright objections and disputes professionally",
        },
      ],
    },
    {
      id: "licenses-registrations",
      name: "Important Registration",
      shortName: "Licenses",
      icon: Gavel,
      description: "Various business licenses and regulatory approvals",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      gradientFrom: "from-amber-600",
      gradientTo: "to-orange-400",
      subServices: [
        {
          name: "GST Registration",
          href: "/services/gst-registration",
          popular: true,
          description: "Register for Goods and Services Tax (GST) for your business",
        },
        {
          name: "Import Export Code",
          href: "/services/iec-license",
          description: "Get IEC code for import/export business activities",
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
        {
          name: "Startup India Registration",
          href: "/services/startup-india",
          new: true,
          description: "Register under Startup India to access government benefits and incentives",
        },
        {
          name: "NGO Darpan Registration",
          href: "/services/ngo-darpan",
          description: "Register your NGO on NITI Aayog NGO Darpan portal for government funding",
        },
        {
          name: "GeM Portal Registration",
          href: "/services/gem-portal",
          description: "Register on Government e-Marketplace to sell to government organizations",
        }
      ],
    },
  ]

  const calculatorCategories: CalculatorCategory[] = [
    {
      id: "financial-calculators",
      name: "Financial Calculators",
      shortName: "Financial",
      icon: TrendingUp,
      description: "Investment and financial planning tools",
      color: "text-green-600",
      bgColor: "bg-green-50",
      gradientFrom: "from-green-600",
      gradientTo: "to-green-400",
      calculators: [
        {
          name: "SIP Calculator",
          href: "/business-calculators/sip-calculator",
          popular: true,
          description: "Plan your systematic investment with compound growth projections",
        },
        {
          name: "Fixed Deposit Calculator",
          href: "/business-calculators/fixed-deposit-calculator",
          description: "Calculate FD maturity amount with compound interest",
        },
        {
          name: "PPF Calculator",
          href: "/business-calculators/ppf-calculator",
          popular: true,
          description: "Calculate PPF maturity amount with 15-year investment cycle",
        },
        {
          name: "RD Calculator",
          href: "/business-calculators/rd-calculator",
          description: "Calculate recurring deposit maturity amount and returns",
        },
        {
          name: "Retirement Corpus Calculator",
          href: "/business-calculators/retirement-corpus-calculator",
          description: "Plan your retirement corpus with inflation-adjusted calculations",
        },
        {
          name: "NPS Calculator",
          href: "/business-calculators/nps-calculator",
          description: "Calculate National Pension System corpus and annuity",
        },
        {
          name: "SSY Calculator",
          href: "/business-calculators/ssy-calculator",
          description: "Calculate Sukanya Samriddhi Yojana returns for girl child",
        },
      ],
    },
    {
      id: "tax-calculators",
      name: "Tax Calculators",
      shortName: "Tax",
      icon: Receipt,
      description: "Tax calculation and compliance tools",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      gradientFrom: "from-purple-600",
      gradientTo: "to-purple-400",
      calculators: [
        {
          name: "Income Tax Calculator",
          href: "/business-calculators/income-tax-calculator",
          popular: true,
          description: "Calculate income tax liability with latest tax slabs and deductions",
        },
        {
          name: "GST Calculator",
          href: "/business-calculators/gst-calculator",
          popular: true,
          description: "Calculate GST inclusive/exclusive amounts for all tax slabs",
        },
        {
          name: "HRA Calculator",
          href: "/business-calculators/hra-calculator",
          description: "Calculate House Rent Allowance exemption and tax benefits",
        },
        {
          name: "TDS Calculator",
          href: "/business-calculators/tds-calculator",
          description: "Calculate Tax Deducted at Source for various income types",
        },
        {
          name: "Salary Calculator",
          href: "/business-calculators/salary-calculator",
          description: "Calculate take-home salary after taxes and deductions",
        },
        {
          name: "Gratuity Calculator",
          href: "/business-calculators/gratuity-calculator",
          description: "Calculate gratuity amount based on salary and service years",
        },
        {
          name: "GSTR-3B Interest Calculator",
          href: "/business-calculators/gstr-3b-interest-calculator",
          description: "Calculate interest on delayed GSTR-3B filing",
        },
        {
          name: "HRA Rent Receipt Generator",
          href: "/business-calculators/hra-rent-receipt-calculator",
          new: true,
          description: "Generate rent receipts for HRA tax exemption claims",
        },
      ],
    },
    {
      id: "loan-calculators",
      name: "Loan Calculators",
      shortName: "Loan",
      icon: Calculator,
      description: "Loan EMI and eligibility calculators",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      gradientFrom: "from-orange-600",
      gradientTo: "to-orange-400",
      calculators: [
        {
          name: "EMI Calculator",
          href: "/business-calculators/emi-calculator",
          popular: true,
          description: "Calculate monthly installments for loans with detailed amortization schedule",
        },
        {
          name: "Home Loan Calculator",
          href: "/business-calculators/home-loan-calculator",
          popular: true,
          description: "Calculate home loan EMI, eligibility, and total interest payable",
        },
        {
          name: "Car Loan Calculator",
          href: "/business-calculators/car-loan-calculator",
          description: "Determine car loan EMI and total cost with insurance options",
        },
        {
          name: "Business Loan Calculator",
          href: "/business-calculators/business-loan-calculator",
          description: "Calculate business loan EMI and eligibility for your venture",
        },
      ],
    },
  ]

  // Handle scroll effect with improved performance
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleMouseEnter = (categoryId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setOpenCategory(categoryId)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenCategory(null)
    }, 150) // 150ms delay before closing
    setHoverTimeout(timeout)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  if (!mounted) {
    return null
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 shadow-lg ${scrolled ? "shadow-lg bg-white/95 backdrop-blur-sm" : "bg-white"}`}
    >
      {/* Main navigation */}
      <div className={`transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex flex-1 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src="/logos/logo_icon.png"
                  alt="StartBusiness logo"
                  width={48}
                  height={48}
                  sizes="48px"
                  className="object-contain w-full h-full"
                  quality={80}
                  priority={true}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">
                  StartBusiness
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center flex-shrink-0">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-end space-x-1">
              <Link
                href="/"
                className={`relative px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive("/") ? "text-blue-600" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Home
                {isActive("/") && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
              </Link>

              {serviceCategories.map((category) => (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`relative px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1 ${
                      isActive(`/services/${category.id}`)
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {category.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${openCategory === category.id ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openCategory === category.id && (
                    <div
                      className="absolute top-full left-0 mt-1 w-[300px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden transform origin-top transition-all duration-200 ease-out opacity-100 scale-100 z-50"
                      onMouseEnter={() => handleMouseEnter(category.id)}
                      onMouseLeave={handleMouseLeave}
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
                    </div>
                  )}
                </div>
              ))}

              {/* Calculators Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => handleMouseEnter('calculators')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`relative px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1 ${
                    isActive("/business-calculators")
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Calculators
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${openCategory === 'calculators' ? "rotate-180" : ""}`}
                  />
                </button>

                {openCategory === 'calculators' && (
                  <div
                    className="absolute top-full left-0 mt-1 w-[380px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden transform origin-top transition-all duration-200 ease-out opacity-100 scale-100 z-50"
                    onMouseEnter={() => handleMouseEnter('calculators')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-blue-50">
                          <Calculator className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800">Business Calculators</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6">
                        {calculatorCategories.map((category) => (
                          <div key={category.id} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-md ${category.bgColor}`}>
                                <category.icon className={`w-3.5 h-3.5 ${category.color}`} />
                              </div>
                              <h4 className="text-xs font-medium text-slate-700">{category.name}</h4>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                              {category.calculators.slice(0, 3).map((calculator) => (
                                <Link
                                  key={calculator.href}
                                  href={calculator.href}
                                  className="block px-2 py-1.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs">{calculator.name}</span>
                                    {calculator.popular && (
                                      <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-none text-[9px] px-1 py-0">
                                        Popular
                                      </Badge>
                                    )}
                                    {calculator.new && (
                                      <Badge className="bg-green-50 text-green-600 hover:bg-green-100 border-none text-[9px] px-1 py-0">
                                        New
                                      </Badge>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
                      <Link
                        href="/business-calculators"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                      >
                        View all calculators
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                className={`relative px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive("/blog") ? "text-blue-600" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Blogs
                {isActive("/blog") && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
              <Link
                href="/contact"
                className={`relative px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive("/contact") ? "text-blue-600" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Contact
                {isActive("/contact") && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            </nav>
          </div>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden border-none hover:bg-slate-50"
              >
                <Menu className="h-5 w-5 text-slate-700" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile menu header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/logos/logo_icon.png"
                      alt="StartBusiness logo"
                      width={32}
                      height={32}
                          blurDataURL="/placeholder.svg"
                          quality={75} // Reduce if needed
  priority={true} // For LCP image
  placeholder="blur" // Optional blur-up
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

                    {/* Mobile Service Categories */}
                    {serviceCategories.map((category) => (
                      <div key={category.id} className="space-y-1">
                        <button
                          onClick={() =>
                            setExpandedMobileCategory(expandedMobileCategory === category.id ? null : category.id)
                          }
                          className={`w-full rounded-md px-4 py-3 text-base font-medium transition-all duration-200 flex items-center justify-between ${
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
                        {expandedMobileCategory === category.id && (
                          <div className="overflow-hidden transition-all duration-200 ease-out">
                            <div className="pl-4 space-y-1">
                              {category.subServices.map((service) => (
                                <SheetClose asChild key={service.href}>
                                  <Link
                                    href={service.href}
                                    className="block px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
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
                                  className="block px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-200"
                                >
                                  View all {category.name} services
                                </Link>
                              </SheetClose>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Mobile Calculator Categories */}
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          setExpandedMobileCategory(expandedMobileCategory === 'calculators' ? null : 'calculators')
                        }
                        className={`w-full rounded-md px-4 py-3 text-base font-medium transition-all duration-200 flex items-center justify-between ${
                          isActive("/business-calculators")
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-blue-50">
                            <Calculator className="w-4 h-4 text-blue-600" />
                          </div>
                          <span>Calculators</span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            expandedMobileCategory === 'calculators' ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {expandedMobileCategory === 'calculators' && (
                        <div className="overflow-hidden transition-all duration-200 ease-out">
                          <div className="pl-4 space-y-3">
                            {calculatorCategories.map((category) => (
                              <div key={category.id} className="space-y-1">
                                <div className="flex items-center gap-2 px-4 py-1">
                                  <div className={`p-1 rounded-md ${category.bgColor}`}>
                                    <category.icon className={`w-3 h-3 ${category.color}`} />
                                  </div>
                                  <span className="text-xs font-medium text-slate-600">{category.name}</span>
                                </div>
                                {category.calculators.slice(0, 3).map((calculator) => (
                                  <SheetClose asChild key={calculator.href}>
                                    <Link
                                      href={calculator.href}
                                      className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span>{calculator.name}</span>
                                        {calculator.popular && (
                                          <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-none text-[10px] px-1.5 py-0">
                                            Popular
                                          </Badge>
                                        )}
                                        {calculator.new && (
                                          <Badge className="bg-green-50 text-green-600 hover:bg-green-100 border-none text-[10px] px-1.5 py-0">
                                            New
                                          </Badge>
                                        )}
                                      </div>
                                    </Link>
                                  </SheetClose>
                                ))}
                              </div>
                            ))}
                            <SheetClose asChild>
                              <Link
                                href="/business-calculators"
                                className="block px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-200"
                              >
                                View all calculators
                              </Link>
                            </SheetClose>
                          </div>
                        </div>
                      )}
                    </div>

                  

                    <SheetClose asChild>
                      <Link
                        href="/blog"
                        className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                          isActive("/blog")
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        Blogs
                      </Link>
                    </SheetClose>
                        <SheetClose asChild>
                      <Link
                        href="/contact"
                        className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                          isActive("/contact")
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        Contact
                      </Link>
                        </SheetClose>

                  </nav>
                </div>

                {/* Mobile contact & CTA */}
                <div className="border-t p-4 space-y-4">
                  <div className="flex flex-col space-y-3">
                    <a
                      href="tel:+919168499520"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <Phone className="mr-2 h-4 w-4 text-blue-600" />
                      <span>+91 91684 99520</span>
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Contact us"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Contact Us</span>
                    </Link>
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

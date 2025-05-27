"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Building2, FileText, Gavel, Shield, TrendingUp, Globe, Menu, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SubService {
  name: string
  href: string
}

interface Service {
  id: string
  name: string
  shortName: string
  icon: any
  description: string
  color: string
  bgColor: string
  subServices: SubService[]
}

export default function ServicesNavigation() {
  const [activeCategory, setActiveCategory] = useState<string>("business-setup")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const serviceCategories: Service[] = [
    {
      id: "business-setup",
      name: "Business Setup",
      shortName: "Setup",
      icon: Building2,
      description: "Complete business registration and setup services",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      subServices: [
        { name: "Private Limited Company", href: "/services/private-limited-company" },
        { name: "Limited Liability Partnership", href: "/services/llp" },
        { name: "One Person Company", href: "/services/opc" },
        { name: "Sole Proprietorship", href: "/services/sole-proprietorship" },
        { name: "Nidhi Company", href: "/services/nidhi-company" },
        { name: "Producer Company", href: "/services/producer-company" },
        { name: "Partnership Firm", href: "/services/partnership-firm" },
        { name: "Startup India Registration", href: "/services/startup-india" },
      ],
    },
    {
      id: "tax-compliance",
      name: "Tax & Compliance",
      shortName: "Tax",
      icon: FileText,
      description: "GST, tax filing, and compliance management",
      color: "text-green-600",
      bgColor: "bg-green-50",
      subServices: [
        { name: "GST Registration", href: "/services/gst-registration" },
        { name: "GST Filing", href: "/services/gst-filing" },
        { name: "HSN Code Finder", href: "/services/hsn-code-finder" },
        { name: "GST Cancellation and Revocation", href: "/services/gst-cancellation" },
        { name: "Income Tax Filing", href: "/services/income-tax-filing" },
        { name: "TDS Return Filing", href: "/services/tds-filing" },
        { name: "Annual Compliance", href: "/services/annual-compliance" },
      ],
    },
    {
      id: "trademark-ip",
      name: "Trademark & IP",
      shortName: "IP",
      icon: Shield,
      description: "Intellectual property protection and registration",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      subServices: [
        { name: "Trademark Registration", href: "/services/trademark-registration" },
        { name: "Trademark Search", href: "/services/trademark-search" },
        { name: "Respond to TM Objection", href: "/services/trademark-objection" },
        { name: "Copyright Registration", href: "/services/copyright-registration" },
        { name: "Patent Registration", href: "/services/patent-registration" },
        { name: "Design Registration", href: "/services/design-registration" },
        { name: "International Trademark", href: "/services/international-trademark" },
      ],
    },
    {
      id: "licenses-registrations",
      name: "Licenses & Registrations",
      shortName: "Licenses",
      icon: Gavel,
      description: "Various business licenses and regulatory approvals",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      subServices: [
        { name: "FSSAI License", href: "/services/fssai-license" },
        { name: "Import Export Code", href: "/services/iec-license" },
        { name: "Digital Signature Certificate", href: "/services/digital-signature" },
        { name: "ISO Certification", href: "/services/iso-certification" },
        { name: "MSME Registration", href: "/services/msme-registration" },
        { name: "Shop & Establishment License", href: "/services/shop-establishment" },
        { name: "Professional Tax Registration", href: "/services/professional-tax" },
      ],
    },
    {
      id: "funding-support",
      name: "Funding & Support",
      shortName: "Funding",
      icon: TrendingUp,
      description: "Business funding and growth support services",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      subServices: [
        { name: "Business Plan Preparation", href: "/services/business-plan" },
        { name: "Pitch Deck Creation", href: "/services/pitch-deck" },
        { name: "Business Loan Assistance", href: "/services/business-loan" },
        { name: "DPR Service", href: "/services/dpr-service" },
        { name: "Government Scheme Registration", href: "/services/government-schemes" },
        { name: "Investor Connect", href: "/services/investor-connect" },
      ],
    },
    {
      id: "international-services",
      name: "International Services",
      shortName: "Global",
      icon: Globe,
      description: "Global business setup and expansion services",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      subServices: [
        { name: "Singapore Company Registration", href: "/services/singapore-company" },
        { name: "USA LLC Registration", href: "/services/usa-llc" },
        { name: "UK Company Registration", href: "/services/uk-company" },
        { name: "Dubai Company Setup", href: "/services/dubai-company" },
        { name: "International Trademark", href: "/services/international-trademark" },
        { name: "FEMA Compliance", href: "/services/fema-compliance" },
      ],
    },
  ]

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  const activeService = serviceCategories.find((cat) => cat.id === activeCategory)

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            {activeService && (
              <>
                <div className={`${activeService.bgColor} p-2 rounded-lg`}>
                  <activeService.icon className={`w-5 h-5 ${activeService.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">{activeService.name}</h3>
                  <p className="text-xs text-slate-500">{activeService.subServices.length} services</p>
                </div>
              </>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex overflow-x-auto scrollbar-hide">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center gap-2 px-4 lg:px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? `border-blue-500 ${category.color} bg-blue-50/50`
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="hidden lg:inline">{category.name}</span>
              <span className="lg:hidden">{category.shortName}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${
                  activeCategory === category.id ? "rotate-180" : ""
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile Category Selector */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-slate-50 border-t border-slate-200"
            >
              <div className="py-2">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                      activeCategory === category.id
                        ? `${category.bgColor} ${category.color}`
                        : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className="text-xs text-slate-500">{category.description}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.subServices.length}
                    </Badge>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropdown Content */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {serviceCategories
                .filter((cat) => cat.id === activeCategory)
                .map((category) => (
                  <div key={category.id} className="py-4 md:py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
                      {/* Category Info - Hidden on mobile, shown on desktop */}
                      <div className="hidden lg:block lg:col-span-1">
                        <div className={`${category.bgColor} rounded-xl p-6`}>
                          <div
                            className={`${category.bgColor.replace("bg-", "bg-").replace("-50", "-100")} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                          >
                            <category.icon className={`w-6 h-6 ${category.color}`} />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-2">{category.name}</h3>
                          <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                          <Badge variant="secondary" className="text-xs">
                            {category.subServices.length} Services
                          </Badge>
                        </div>
                      </div>

                      {/* Services Grid */}
                      <div className="col-span-1 lg:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                          {category.subServices.map((service, index) => (
                            <motion.a
                              key={index}
                              href={service.href}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="group p-3 md:p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 bg-white hover:bg-slate-50 active:scale-95"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors text-sm md:text-base leading-tight">
                                  {service.name}
                                </h4>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

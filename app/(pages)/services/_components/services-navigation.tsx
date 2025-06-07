"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  ChevronRight,
  Building2,
  FileText,
  Gavel,
  Shield,
  Menu,
  X,
  Search,
  ArrowRight,
  Star,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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

export default function EnhancedServicesNavigation() {
  const [activeCategory, setActiveCategory] = useState<string>("business-setup")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{ service: Service; subServices: SubService[] }[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentlyViewed, setRecentlyViewed] = useState<SubService[]>([])
  const [showRecentlyViewed, setShowRecentlyViewed] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const isNavInView = useInView(navRef)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Load recently viewed from localStorage
  useEffect(() => {
    const storedRecent = localStorage.getItem("recentlyViewedServices")
    if (storedRecent) {
      try {
        setRecentlyViewed(JSON.parse(storedRecent))
      } catch (e) {
        console.error("Failed to parse recently viewed services")
      }
    }
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
      name: "Intellectual Property",
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

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.length > 1) {
      setIsSearching(true)

      // Search through all services and subservices
      const results = serviceCategories
        .map((service) => {
          const matchingSubServices = service.subServices.filter(
            (subService) =>
              subService.name.toLowerCase().includes(query.toLowerCase()) ||
              (subService.description && subService.description.toLowerCase().includes(query.toLowerCase())),
          )

          return {
            service,
            subServices: matchingSubServices,
          }
        })
        .filter((result) => result.subServices.length > 0)

      setSearchResults(results)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  const handleServiceClick = (service: SubService) => {
    // Add to recently viewed
    const updatedRecent = [service, ...recentlyViewed.filter((item) => item.href !== service.href)].slice(0, 4)
    setRecentlyViewed(updatedRecent)
    localStorage.setItem("recentlyViewedServices", JSON.stringify(updatedRecent))

    // Close search
    setIsSearching(false)
    setSearchQuery("")
  }

  const activeService = serviceCategories.find((cat) => cat.id === activeCategory)

  return (
    <div className="bg-white border-b border-slate-200 sticky top-[55px] z-40 shadow-sm" ref={navRef}>
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 border-slate-200"
              onClick={() => setShowRecentlyViewed(!showRecentlyViewed)}
            >
              <Clock className="h-4 w-4 text-slate-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 border-slate-200"
              onClick={() => setIsSearching(!isSearching)}
            >
              <Search className="h-4 w-4 text-slate-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full h-8 w-8"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-6">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-full px-4 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} text-white shadow-md`
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{isMobile ? category.shortName : category.name}</span>
              </button>
            ))}
          </div>

          <div className="relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => recentlyViewed.length > 0 && setShowRecentlyViewed(true)}
                className="w-64 pl-10 pr-4 py-2 rounded-full border-slate-200 focus:border-slate-300 focus:ring-slate-200"
              />
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearching && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-slate-100">
                    <h3 className="text-sm font-medium text-slate-700">Search Results</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    {searchResults.map((result, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="flex items-center gap-2 px-3 py-1.5">
                          <div className={`p-1.5 rounded-md ${result.service.bgColor}`}>
                            <result.service.icon className={`w-3.5 h-3.5 ${result.service.color}`} />
                          </div>
                          <span className="text-xs font-medium text-slate-500">{result.service.name}</span>
                        </div>
                        {result.subServices.map((subService, subIdx) => (
                          <a
                            key={subIdx}
                            href={subService.href}
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                            onClick={() => handleServiceClick(subService)}
                          >
                            <div>
                              <div className="text-sm font-medium text-slate-800">{subService.name}</div>
                              {subService.description && (
                                <div className="text-xs text-slate-500 line-clamp-1">{subService.description}</div>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Recently Viewed Dropdown */}
              {showRecentlyViewed && recentlyViewed.length > 0 && !isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-slate-700">Recently Viewed</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-slate-500 hover:text-slate-700"
                      onClick={() => setShowRecentlyViewed(false)}
                    >
                      Close
                    </Button>
                  </div>
                  <div className="p-2">
                    {recentlyViewed.map((service, idx) => (
                      <a
                        key={idx}
                        href={service.href}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm text-slate-800">{service.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isSearching && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-slate-200 py-3"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border-slate-200"
                  autoFocus
                />
              </div>

              {searchQuery.length > 1 ? (
                <div className="mt-3 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((result, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="flex items-center gap-2 px-2 py-1.5">
                          <div className={`p-1.5 rounded-md ${result.service.bgColor}`}>
                            <result.service.icon className={`w-3.5 h-3.5 ${result.service.color}`} />
                          </div>
                          <span className="text-xs font-medium text-slate-500">{result.service.name}</span>
                        </div>
                        {result.subServices.map((subService, subIdx) => (
                          <a
                            key={subIdx}
                            href={subService.href}
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                            onClick={() => handleServiceClick(subService)}
                          >
                            <div className="text-sm font-medium text-slate-800">{subService.name}</div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </a>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-sm text-slate-500">No services found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              ) : searchQuery.length === 0 && recentlyViewed.length > 0 ? (
                <div className="mt-3">
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="text-xs font-medium text-slate-500">Recently Viewed</span>
                  </div>
                  {recentlyViewed.map((service, idx) => (
                    <a
                      key={idx}
                      href={service.href}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm text-slate-800">{service.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </a>
                  ))}
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recently Viewed Mobile */}
        <AnimatePresence>
          {showRecentlyViewed && isMobile && recentlyViewed.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-slate-200 py-3"
            >
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs font-medium text-slate-500">Recently Viewed</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-slate-500"
                  onClick={() => setShowRecentlyViewed(false)}
                >
                  Close
                </Button>
              </div>
              {recentlyViewed.map((service, idx) => (
                <a
                  key={idx}
                  href={service.href}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm text-slate-800">{service.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
                        <div className={`rounded-xl overflow-hidden relative`}>
                          <div
                            className={`bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} p-6 text-white`}
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

                            <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                              <category.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                            <p className="text-sm text-white/80 mb-4">{category.description}</p>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-xs">
                              {category.subServices.length} Services
                            </Badge>
                          </div>

                          <div className="bg-gradient-to-br from-slate-50 to-white p-4 border-t border-white/20">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-medium text-slate-700">Popular Services</h4>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                            <div className="space-y-2">
                              {category.subServices
                                .filter((service) => service.popular)
                                .slice(0, 2)
                                .map((service, idx) => (
                                  <a
                                    key={idx}
                                    href={service.href}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                  >
                                    <Star className="w-3.5 h-3.5 text-amber-500" />
                                    <span className="text-xs font-medium text-slate-700">{service.name}</span>
                                  </a>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Services Grid */}
                      <div className="col-span-1 lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-800 md:hidden">{category.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600 hidden md:flex">
                              <Zap className="mr-1 h-3 w-3 text-amber-500" />
                              Popular
                            </Badge>
                            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600 hidden md:flex">
                              <Sparkles className="mr-1 h-3 w-3 text-blue-500" />
                              New
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                          {category.subServices.map((service, index) => (
                            <motion.a
                              key={index}
                              href={service.href}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className={cn(
                                "group p-3 md:p-4 rounded-xl border transition-all duration-300 bg-white hover:shadow-md relative",
                                service.popular
                                  ? "border-amber-200"
                                  : service.new
                                    ? "border-blue-200"
                                    : "border-slate-200 hover:border-slate-300",
                              )}
                              onClick={() => handleServiceClick(service)}
                            >
                              {service.popular && (
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-none text-[10px] px-1.5 py-0">
                                    <Star className="mr-0.5 h-2.5 w-2.5" />
                                    Popular
                                  </Badge>
                                </div>
                              )}

                              {service.new && (
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none text-[10px] px-1.5 py-0">
                                    <Sparkles className="mr-0.5 h-2.5 w-2.5" />
                                    New
                                  </Badge>
                                </div>
                              )}

                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors text-sm md:text-base leading-tight">
                                  {service.name}
                                </h4>
                                <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors ml-2 flex-shrink-0">
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-300" />
                                </div>
                              </div>

                              {service.description && (
                                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{service.description}</p>
                              )}
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

      {/* Sticky Indicator */}
      {isNavInView && (
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full absolute bottom-0 left-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  )
}

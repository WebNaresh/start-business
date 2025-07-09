"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Building2,
  FileText,
  Gavel,
  Shield,
  Search,
  ArrowRight,
  Star,
  Clock,
  Sparkles,
  Grid3X3,
  List,
  TrendingUp,
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SubService {
  name: string
  href: string
  popular?: boolean
  new?: boolean
  description?: string
  price?: string
  timeline?: string
  features?: string[]
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
  totalServices?: number
}

type ViewMode = 'grid' | 'list'
type SortBy = 'popular' | 'name' | 'newest'

export default function AllServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortBy>('popular')
  const [filteredServices, setFilteredServices] = useState<SubService[]>([])

  // Initialize and filter services
  useEffect(() => {
    const allServices = serviceCategories.flatMap(category =>
      category.subServices.map(service => ({
        ...service,
        category: category.name,
        categoryId: category.id,
        categoryColor: category.color,
        categoryBg: category.bgColor
      }))
    )

    let filtered = allServices

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(service => service.categoryId === activeCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          if (a.popular && !b.popular) return -1
          if (!a.popular && b.popular) return 1
          return a.name.localeCompare(b.name)
        case 'newest':
          if (a.new && !b.new) return -1
          if (!a.new && b.new) return 1
          return a.name.localeCompare(b.name)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredServices(filtered)
  }, [activeCategory, searchQuery, sortBy])

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
      totalServices: 9,
      subServices: [
        {
          name: "Private Limited Company",
          href: "/services/private-limited-company",
          popular: true,
          description: "Register your business as a Private Limited Company with limited liability protection",
          price: "₹6,999",
          timeline: "7-10 days",
          features: ["Limited Liability", "Separate Legal Entity", "Easy Fund Raising"]
        },
        {
          name: "Limited Liability Partnership",
          href: "/services/llp",
          description: "Form an LLP with the benefits of partnership and limited liability",
          price: "₹5,999",
          timeline: "5-7 days",
          features: ["Partnership Benefits", "Limited Liability", "Tax Advantages"]
        },
        {
          name: "One Person Company",
          href: "/services/opc",
          description: "Start a company with a single person as shareholder and director",
          price: "₹5,499",
          timeline: "7-10 days",
          features: ["Single Owner", "Limited Liability", "Corporate Benefits"]
        },
        {
          name: "Sole Proprietorship",
          href: "/services/sole-proprietorship",
          description: "Register as a sole proprietor for simple business structure",
          price: "₹2,999",
          timeline: "3-5 days",
          features: ["Simple Structure", "Easy Setup", "Full Control"]
        },
        {
          name: "Nidhi Company",
          href: "/services/nidhi-company",
          description: "Establish a Nidhi Company for borrowing and lending among members",
          price: "₹12,999",
          timeline: "15-20 days",
          features: ["Member Lending", "RBI Regulated", "Mutual Benefit"]
        },
        {
          name: "Producer Company",
          href: "/services/producer-company",
          description: "Form a company owned by primary producers or farmers",
          price: "₹8,999",
          timeline: "10-15 days",
          features: ["Farmer Owned", "Collective Benefits", "Agricultural Focus"]
        },
        {
          name: "Partnership Firm",
          href: "/services/partnership-firm",
          description: "Create a partnership between two or more individuals",
          price: "₹3,999",
          timeline: "5-7 days",
          features: ["Shared Ownership", "Flexible Structure", "Easy Formation"]
        },
        {
          name: "Section 8 Company",
          href: "/services/section-8-company",
          description: "Register a non-profit company for charitable and social welfare activities",
          price: "₹18,000",
          timeline: "30-45 days",
          features: ["Non-profit", "Tax Exemptions", "Social Impact"]
        },
        {
          name: "Subsidiary of Foreign Company",
          href: "/services/subsidiary-foreign-company",
          description: "Establish Indian subsidiary of your foreign company with complete compliance",
          price: "₹35,000",
          timeline: "25-35 days",
          features: ["100% Foreign Ownership", "Local Presence", "FEMA Compliance"]
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
      totalServices: 7,
      subServices: [
        {
          name: "GST Registration",
          href: "/services/gst-registration",
          popular: true,
          description: "Register for Goods and Services Tax (GST) for your business",
          price: "₹2,999",
          timeline: "3-5 days",
          features: ["GST Number", "Input Tax Credit", "Legal Compliance"]
        },
        {
          name: "Company Annual ROC Compliance",
          href: "/services/roc-annual-compliances",
          popular: true,
          description: "Stay compliant with all ROC requirements including annual returns",
          price: "₹15,000",
          timeline: "10-15 days",
          features: ["Annual Returns", "ROC Compliance", "Penalty Avoidance"]
        },
        {
          name: "LLP Annual Compliance",
          href: "/services/llp-annual-compliance",
          description: "Complete LLP annual compliance including Form 8 and Form 11",
          price: "₹8,000",
          timeline: "10-12 days",
          features: ["Form 11 & 8 Filing", "Compliance Review", "Expert Support"]
        },
        {
          name: "FEMA Compliance Services",
          href: "/services/fema-compliance",
          description: "FDI/ODI reporting with RBI and FLA return filing services",
          price: "₹25,000",
          timeline: "15-20 days",
          features: ["FDI Reporting", "ODI Reporting", "FLA Returns"]
        },
        {
          name: "CSR Compliances",
          href: "/services/csr-compliance",
          description: "CSR consultancy, CSR-1 and CSR-2 filing services",
          price: "₹18,000",
          timeline: "10-15 days",
          features: ["CSR Strategy", "CSR-1 Filing", "CSR-2 Filing"]
        },
        {
          name: "Maintenance of Statutory Registers",
          href: "/services/statutory-registers",
          description: "Maintain all mandatory statutory registers and minutes",
          price: "₹12,000",
          timeline: "5-7 days",
          features: ["Register Maintenance", "Minutes Recording", "Compliance Updates"]
        },
        {
          name: "Shifting of Registered Office",
          href: "/services/registered-office-shifting",
          description: "Change registered office address with all regulatory compliances",
          price: "₹15,000",
          timeline: "15-25 days",
          features: ["Address Change", "ROC Filing", "Regulatory Updates"]
        },
        {
          name: "Dematerialisation of Securities",
          href: "/services/dematerialisation-securities",
          description: "Convert physical securities to electronic form with NSDL/CDSL",
          price: "₹20,000",
          timeline: "20-30 days",
          features: ["NSDL/CDSL Process", "Electronic Conversion", "SEBI Compliance"]
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
      totalServices: 6,
      subServices: [
        {
          name: "Trademark Registration",
          href: "/services/trademark-registration",
          popular: true,
          description: "Protect your brand identity with trademark registration",
          price: "₹6,999",
          timeline: "12-18 months",
          features: ["Brand Protection", "Legal Rights", "Nationwide Coverage"]
        },
        {
          name: "Respond to TM Objection",
          href: "/services/trademark-objection",
          description: "Get help responding to trademark objections",
          price: "₹4,999",
          timeline: "30 days",
          features: ["Legal Response", "Expert Drafting", "Follow-up Support"]
        },
        {
          name: "Trademark Hearing",
          href: "/services/trademark-hearing",
          description: "Professional representation for trademark hearings",
          price: "₹8,000",
          timeline: "As per hearing date",
          features: ["Legal Representation", "Expert Arguments", "Documentation Support"]
        },
        {
          name: "Trademark Rectification",
          href: "/services/trademark-rectification",
          description: "Rectify or remove conflicting trademarks from registry",
          price: "₹25,000",
          timeline: "12-18 months",
          features: ["Legal Proceedings", "Expert Representation", "Registry Removal"]
        },
        {
          name: "Copyright Registration",
          href: "/services/copyright-registration",
          description: "Protect your creative works with copyright registration",
          price: "₹3,999",
          timeline: "6-8 months",
          features: ["Creative Protection", "Legal Rights", "Infringement Protection"]
        },
        {
          name: "Copyright Objection",
          href: "/services/copyright-objection",
          description: "Handle copyright objections and disputes professionally",
          price: "₹12,000",
          timeline: "3-6 months",
          features: ["Legal Response", "Expert Handling", "Dispute Resolution"]
        },
      ],
    },
    {
      id: "licenses-registrations",
      name: "Important Registrations",
      shortName: "Licenses",
      icon: Gavel,
      description: "Various business licenses and regulatory approvals",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      gradientFrom: "from-amber-600",
      gradientTo: "to-orange-400",
      totalServices: 7,
      subServices: [
        {
          name: "Import Export Code",
          href: "/services/iec-license",
          description: "Get IEC code for import/export business activities",
          price: "₹2,999",
          timeline: "7-10 days",
          features: ["Import/Export Rights", "Global Trade", "Government Approval"]
        },
        {
          name: "MSME Registration",
          href: "/services/msme-registration",
          popular: true,
          description: "Register as a Micro, Small, or Medium Enterprise",
          price: "₹1,999",
          timeline: "3-5 days",
          features: ["Government Benefits", "Loan Advantages", "Tax Benefits"]
        },
        {
          name: "Shop & Establishment License",
          href: "/services/shop-establishment",
          description: "Obtain mandatory license for your business premises",
          price: "₹2,499",
          timeline: "7-15 days",
          features: ["Legal Operation", "Employee Rights", "Compliance"]
        },
        {
          name: "Professional Tax Registration",
          href: "/services/professional-tax",
          description: "Register for professional tax in your state",
          price: "₹1,499",
          timeline: "5-7 days",
          features: ["State Compliance", "Employee Tax", "Legal Requirement"]
        },
        {
          name: "Startup India Registration",
          href: "/services/startup-india",
          new: true,
          description: "Register under Startup India to access government benefits and incentives",
          price: "₹4,999",
          timeline: "15-20 days",
          features: ["Government Benefits", "Tax Exemptions", "Funding Support"]
        },
        {
          name: "NGO Darpan Registration",
          href: "/services/ngo-darpan",
          description: "Register your NGO on NITI Aayog's NGO Darpan portal for government funding",
          price: "₹5,999",
          timeline: "10-15 days",
          features: ["Government Recognition", "Funding Eligibility", "Credibility Enhancement"]
        },
        {
          name: "GeM Portal Registration",
          href: "/services/gem-portal",
          description: "Register on Government e-Marketplace to sell to government organizations",
          price: "₹8,999",
          timeline: "7-12 days",
          features: ["Government Contracts", "Direct Sales", "Digital Marketplace"]
        },
      ],
    },
  ]

  // Get category statistics
  const getCategoryStats = () => {
    const totalServices = serviceCategories.reduce((sum, cat) => sum + cat.subServices.length, 0)
    const popularServices = serviceCategories.reduce((sum, cat) =>
      sum + cat.subServices.filter(service => service.popular).length, 0
    )
    const newServices = serviceCategories.reduce((sum, cat) =>
      sum + cat.subServices.filter(service => service.new).length, 0
    )

    return { totalServices, popularServices, newServices }
  }

  const stats = getCategoryStats()

  // Category filter options
  const categoryOptions = [
    { id: "all", name: "All Services", count: stats.totalServices, icon: null },
    ...serviceCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: cat.subServices.length,
      icon: cat.icon,
      color: cat.color,
      bgColor: cat.bgColor
    }))
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-8 md:py-8 lg:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-48 -mt-48 opacity-60 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
       

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              All Business Services
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                In One Place
              </span>
            </h1>

         
            
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-6 sm:py-8 bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-between">

            {/* Search Bar */}
            <div className="w-full lg:w-96 order-2 lg:order-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-slate-200 focus:border-blue-300 focus:ring-blue-200 text-sm"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 order-1 lg:order-2">
              {categoryOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={activeCategory === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(option.id)}
                  className={`transition-all duration-300 text-xs sm:text-sm ${
                    activeCategory === option.id
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                      : "hover:bg-blue-50 hover:border-blue-200"
                  }`}
                >
                  {option.icon && <option.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />}
                  <span className="hidden sm:inline">{option.name}</span>
                  <span className="sm:hidden">{option.name.split(' ')[0]}</span>
                  <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0">
                    {option.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center gap-2 order-3">
              <div className="flex items-center border border-slate-200 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:border-blue-300 focus:ring-blue-200"
              >
                <option value="popular">Popular First</option>
                <option value="name">Name A-Z</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Display Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {activeCategory === "all" ? "All Services" : categoryOptions.find(cat => cat.id === activeCategory)?.name}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {filteredServices.length > 0 && (
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <Badge variant="outline" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {filteredServices.filter(s => s.popular).length} Popular
                </Badge>
                {filteredServices.filter(s => s.new).length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {filteredServices.filter(s => s.new).length} New
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Services Grid/List */}
          {filteredServices.length > 0 ? (
            <div className={cn(
              "transition-all duration-300",
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-4"
            )}>
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "group relative bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300",
                    viewMode === 'list' && "flex items-center p-4 sm:p-6"
                  )}
                >
                  {/* Popular/New Badge */}
                  {(service.popular || service.new) && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge
                        className={cn(
                          "text-xs px-2 py-1",
                          service.popular
                            ? "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                        )}
                      >
                        {service.popular && <Star className="w-3 h-3 mr-1" />}
                        {service.new && <Sparkles className="w-3 h-3 mr-1" />}
                        {service.popular ? "Popular" : "New"}
                      </Badge>
                    </div>
                  )}

                  <Link href={service.href} className="block">
                    {viewMode === 'grid' ? (
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base leading-tight pr-8">
                            {service.name}
                          </h3>
                        </div>

                        {service.description && (
                          <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                            {service.description}
                          </p>
                        )}

                        {service.price && (
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-lg sm:text-xl font-bold text-emerald-600">
                              {service.price}
                            </div>
                            {service.timeline && (
                              <div className="flex items-center text-xs text-slate-500">
                                <Clock className="w-3 h-3 mr-1" />
                                {service.timeline}
                              </div>
                            )}
                          </div>
                        )}

                        {service.features && service.features.length > 0 && (
                          <div className="space-y-1.5 mb-4">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center text-xs text-slate-600">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Get Started
                            <ArrowRight className="w-3 h-3 ml-1.5" />
                          </Button>
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-base sm:text-lg">
                            {service.name}
                          </h3>
                          {service.price && (
                            <div className="text-lg font-bold text-emerald-600 ml-4">
                              {service.price}
                            </div>
                          )}
                        </div>

                        {service.description && (
                          <p className="text-sm text-slate-600 mb-3 line-clamp-1">
                            {service.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            {service.timeline && (
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {service.timeline}
                              </div>
                            )}
                            {service.features && (
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {service.features.length} features
                              </div>
                            )}
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No services found</h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery
                    ? `No services match "${searchQuery}". Try adjusting your search or browse by category.`
                    : "No services available in this category."
                  }
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                  variant="outline"
                >
                  View All Services
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Script from "next/script"
import {
  Building2,
  Shield,
  FileCheck,
  Calculator,
  Users,
  CheckCircle,
  Sparkles,
  Filter,
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedCTAButton from "@/components/ui/enhanced-cta-button"

import EnhancedSearch from "@/components/services/enhanced-search"

// Type definitions
type Service = {
  title: string
  description: string
  price: string
  originalPrice: string
  billing: string
  slug: string
  mostPopular: boolean
  category: string
  icon: React.ElementType
  rating: number
  completedProjects: number
  deliveryTime: string
  features: string[]
  testimonial: {
    text: string
    author: string
  }
}

type ServiceCardProps = {
  service: Service
  idx: number
  hoveredCard: number | null
  setHoveredCard: (idx: number | null) => void
}

export default function ServicesCarousel() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  // const [isPlaying, setIsPlaying] = useState(true) // Unused for now
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Configure Embla Carousel - show multiple but scroll one at a time
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: true,
    slidesToScroll: 1, // Always scroll one slide at a time
    skipSnaps: false,
    // This ensures smooth one-by-one scrolling while showing multiple services
  })

  // Autoplay functionality (disabled for now)
  const autoplay = useCallback(() => {
    if (!emblaApi) return
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    // Autoplay disabled - can be re-enabled by uncommenting below
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, 5000) // Change slide every 5 seconds
  }, [emblaApi])

  // Handle autoplay on mount and cleanup
  useEffect(() => {
    if (!emblaApi) return

    autoplay()

    emblaApi.on("pointerDown", () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    })

    emblaApi.on("pointerUp", autoplay)

    emblaApi.on("select", () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    })

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [emblaApi, autoplay])

  // Toggle autoplay (currently unused but kept for future functionality)
  // const toggleAutoplay = () => {
  //   setIsPlaying(!isPlaying)
  // }

  // Enhanced service data with more details
  const services = [
    {
      title: "Private Limited Registration",
      description: "Most popular choice for startups and growing businesses",
      price: "₹12,000",
      originalPrice: "₹15,000",
      billing: "/one-time",
      slug: "private-limited-company",
      mostPopular: true,
      category: "registration",
      icon: Building2,
      rating: 4.9,
      completedProjects: 2500,
      deliveryTime: "7-10 days",
      features: [
        "Company Name Reservation",
        "All Govt. Fees (Capital of Rs. 1 Lac)",
        "eMoA & eAoA",
        "DSC for two directors",
        "DIN for two directors",
        "Incorporation Certificate",
        "PAN + TAN + PF + ESIC + Professional Tax",
      ],
      testimonial: {
        text: "Seamless process, got everything done quickly!",
        author: "Rajesh Kumar",
      },
    },
    {
      title: "Limited Liability Partnership",
      description: "Perfect for professional services and partnerships",
      price: "₹10,000",
      originalPrice: "₹13,000",
      billing: "/one-time",
      slug: "llp",
      mostPopular: false,
      category: "registration",
      icon: Users,
      rating: 4.8,
      completedProjects: 1800,
      deliveryTime: "10-12 days",
      features: [
        "Name Reservation fees",
        "ROC filing fees",
        "DSC for partners",
        "DIN for designated partners",
        "Professional charges",
        "LLP incorporation certificate",
      ],
      testimonial: {
        text: "Professional and efficient service!",
        author: "Priya Sharma",
      },
    },
    {
      title: "GST Registration",
      description: "Faster GST registration with compliance guidance",
      price: "₹3,000",
      originalPrice: "₹4,500",
      billing: "/one-time",
      slug: "gst-registration",
      mostPopular: false,
      category: "tax",
      icon: Calculator,
      rating: 4.9,
      completedProjects: 3200,
      deliveryTime: "5-7 days",
      features: [
        "GST registration application",
        "Document preparation",
        "Government liaison",
        "GST certificate",
        "Professional charges",
        "Post-registration support",
      ],
      testimonial: {
        text: "Quick and hassle-free registration!",
        author: "Amit Patel",
      },
    },
    {
      title: "ROC Annual Compliances",
      description: "Stay compliant with all ROC requirements including annual returns and financial statements",
      price: "₹15,000",
      originalPrice: "₹20,000",
      billing: "/year",
      slug: "roc-compliance",
      mostPopular: false,
      category: "compliance",
      icon: FileCheck,
      rating: 4.7,
      completedProjects: 4100,
      deliveryTime: "3-5 days",
      features: [
        "Annual return filing",
        "Financial statements preparation",
        "Board meeting minutes",
        "Compliance calendar management",
        "Professional charges",
        "Post-filing support",
      ],
      testimonial: {
        text: "Never missed a deadline since!",
        author: "Neha Gupta",
      },
    },
    {
      title: "Trademark Registration & Protection",
      description: "Protect your brand identity with our end-to-end trademark registration services",
      price: "₹3,000",
      originalPrice: "₹4,500",
      billing: "/one-time",
      slug: "trademark-registration",
      mostPopular: false,
      category: "legal",
      icon: Shield,
      rating: 4.8,
      completedProjects: 1200,
      deliveryTime: "15-20 days",
      features: [
        "Trademark search",
        "Application filing",
        "Government fees",
        "Document preparation",
        "Professional charges",
        "Post-registration support",
      ],
      testimonial: {
        text: "Protected our brand perfectly!",
        author: "Vikram Singh",
      },
    },
  ]

  const categories = [
    { id: "all", name: "All Services", count: services.length },
    { id: "registration", name: "Registration", count: services.filter((s) => s.category === "registration").length },
    { id: "legal", name: "Legal", count: services.filter((s) => s.category === "legal").length },
    { id: "compliance", name: "Compliance", count: services.filter((s) => s.category === "compliance").length },
    { id: "tax", name: "Tax", count: services.filter((s) => s.category === "tax").length },
  ]

  // Filter services based on category and search
  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Generate structured data for services
  const servicesStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "Start Business"
      },
      "offers": {
        "@type": "Offer",
        "price": service.price.replace(/[₹,]/g, ""),
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": service.rating,
        "reviewCount": service.completedProjects
      },
      "serviceType": service.category,
      "areaServed": "IN",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Service Features",
        "itemListElement": service.features.map((feature) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": feature
          }
        }))
      }
    }))
  }

  return (
    <section 
      className="py-4"
      aria-labelledby="services-heading"
    >
      <Script
        id="services-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
      />
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="mb-6 md:mb-8 text-center px-4">
          <Badge
            variant="secondary"
            className="mb-3 md:mb-4 bg-blue-100 text-blue-700 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm"
            aria-label="Services section badge"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" aria-hidden="true" />
            Our Services
          </Badge>
          <h2
            id="services-heading"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 md:mb-3 leading-tight"
          >
            Our Popular Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Everything you need to start, run, and grow your business with confidence
          </p>
        </div>

        {/* Enhanced Filters and Search */}
        <div className="mb-8 md:mb-12 px-4">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center justify-between">
            {/* Category Filters */}
            <div
              className="flex flex-wrap gap-1.5 md:gap-2 justify-center lg:justify-start"
              role="group"
              aria-label="Service category filters"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                      : "hover:bg-blue-50 hover:border-blue-200"
                  }`}
                  aria-pressed={selectedCategory === category.id}
                  role="button"
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" aria-hidden="true" />
                  <span className="hidden sm:inline">{category.name} ({category.count})</span>
                  <span className="sm:hidden">{category.name}</span>
                </Button>
              ))}
            </div>

            {/* Enhanced Search */}
            <div className="w-full lg:w-80">
              <EnhancedSearch
                onSearch={setSearchTerm}
                placeholder="Search services..."
                className="w-full text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          {filteredServices.length > 0 ? (
            <>
              <div 
                className="overflow-hidden" 
                ref={emblaRef}
                role="region"
                aria-roledescription="carousel"
                aria-label="Services carousel"
              >
                <div className="flex">
                  {filteredServices.map((service, idx) => (
                    <div
                      key={service.title}
                      className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2 sm:px-3 md:px-4"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`Slide ${idx + 1} of ${filteredServices.length}`}
                    >
                      <ServiceCard
                        service={service}
                        idx={idx}
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <div 
                className="mt-8 flex items-center justify-center gap-4"
                role="group"
                aria-label="Carousel controls"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white shadow-md hover:bg-slate-50"
                  onClick={() => emblaApi?.scrollPrev()}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </Button>

                {/* Dots Indicators */}
                <div 
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Slide indicators"
                >
                  {filteredServices.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => emblaApi?.scrollTo(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === idx ? "bg-blue-600 w-4" : "bg-slate-300"
                      }`}
                      role="tab"
                      aria-selected={currentSlide === idx}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white shadow-md hover:bg-slate-50"
                  onClick={() => emblaApi?.scrollNext()}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </>
          ) : (
            /* No Results State */
            <div 
              className="text-center py-12"
              role="alert"
              aria-live="polite"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No services found</h3>
              <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                aria-label="Clear all filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

   
        {/* View More Services Button */}
        <div className="mt-8 text-center">
          <EnhancedCTAButton
            href="/services"
            variant="primary"
            size="lg"
            className="inline-flex"
          >
            View All Services
          </EnhancedCTAButton>
        </div>
      </div>
    </section>
  )
}

// Service Card Component
function ServiceCard({ service, idx, hoveredCard, setHoveredCard }: ServiceCardProps) {
  const IconComponent = service.icon
  const savings =
    Number.parseInt(service.originalPrice.replace(/[₹,]/g, "")) - Number.parseInt(service.price.replace(/[₹,]/g, ""))
  const savingsPercent = Math.round((savings / Number.parseInt(service.originalPrice.replace(/[₹,]/g, ""))) * 100)

  return (
    <article
      className={`group relative rounded-2xl bg-white shadow-lg border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        service.mostPopular ? "border-blue-500 shadow-blue-100" : "border-slate-100 hover:border-blue-200"
      } flex flex-col overflow-hidden h-full`}
      onMouseEnter={() => setHoveredCard(idx)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Savings Badge */}
      <div className="absolute top-2 right-2 z-10">
        <Badge
          variant="destructive"
          className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1"
          aria-label={`Save ${savingsPercent}%`}
        >
          Save {savingsPercent}%
        </Badge>
      </div>

      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        {/* Service Header */}
        <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
          <div
            className={`p-2 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl ${service.mostPopular ? "bg-blue-100" : "bg-slate-100"} group-hover:scale-110 transition-transform duration-300`}
            aria-hidden="true"
          >
            <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${service.mostPopular ? "text-blue-600" : "text-slate-600"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 mb-1.5 md:mb-2 group-hover:text-blue-600 transition-colors leading-tight">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{service.description}</p>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-4 md:mb-6 flex-1">
          <h4 className="text-xs sm:text-sm font-semibold mb-2 md:mb-3 text-slate-700">What's included:</h4>
          <ul className="space-y-1.5 md:space-y-2" role="list">
            {service.features.slice(0, 3).map((feature, featureIdx) => (
              <li key={featureIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600" role="listitem">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
            {service.features.length > 3 && (
              <li className="text-xs sm:text-sm text-blue-600 font-medium">
                +{service.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        {/* Pricing */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-baseline gap-1.5 md:gap-2 mb-1">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{service.price}</span>
            <span className="text-sm sm:text-base md:text-lg text-slate-500 line-through">{service.originalPrice}</span>
            <span className="text-xs sm:text-sm font-normal text-slate-500">{service.billing}</span>
          </div>
          <p className="text-xs sm:text-sm text-green-700 font-medium">
            You save ₹{savings.toLocaleString()}!
          </p>
          <div className="flex items-center gap-1 mt-1.5 md:mt-2 text-xs sm:text-sm text-red-600">
            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            <span>Government fee excluded</span>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className="mt-auto">
          <EnhancedCTAButton
            href={`/services/${service.slug}`}
            variant={service.mostPopular ? "primary" : "secondary"}
            size="lg"
            className="w-full"
            savings={`Save ₹${savings.toLocaleString()}`}
            popular={service.mostPopular}
            guarantee={true}
          >
            Get Started Now
          </EnhancedCTAButton>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent transition-opacity duration-300 pointer-events-none ${
          hoveredCard === idx ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </article>
  )
}

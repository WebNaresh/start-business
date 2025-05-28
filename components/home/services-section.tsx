"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  Building2,
  Shield,
  FileCheck,
  Calculator,
  Utensils,
  Heart,
  Star,
  Clock,
  Users,
  CheckCircle,
  Sparkles,
  Filter,
  Search,
  X,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function EnhancedServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Enhanced service data with more details
  const services = [
    {
      title: "Private Limited Registration",
      description: "Most popular choice for startups and growing businesses",
      price: "₹12,000",
      originalPrice: "₹15,000",
      billing: "/one-time",
      slug: "private-limited-registration",
      mostPopular: true,
      category: "registration",
      icon: Building2,
      rating: 4.9,
      completedProjects: 2500,
      deliveryTime: "7-10 days",
      features: [
        "Company Name Reservation",
        "Digital Signature Certificate",
        "Director Identification Number",
        "Certificate of Incorporation",
        "PAN & TAN Registration",
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
      slug: "llp-registration",
      mostPopular: false,
      category: "registration",
      icon: Users,
      rating: 4.8,
      completedProjects: 1800,
      deliveryTime: "10-12 days",
      features: [
        "LLP Agreement Drafting",
        "Digital Signature Certificate",
        "Designated Partner DIN",
        "LLP Registration Certificate",
        "PAN & TAN Registration",
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
        "GST Registration Application",
        "Document Preparation",
        "Government Liaison",
        "GSTIN Generation",
        "Compliance Guidance",
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
        "Annual Return Filing",
        "Financial Statements",
        "Board Resolutions",
        "Compliance Calendar",
        "Penalty Protection",
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
        "Trademark Search",
        "Application Filing",
        "Government Fee Included",
        "Status Updates",
        "Certificate Delivery",
      ],
      testimonial: {
        text: "Protected our brand perfectly!",
        author: "Vikram Singh",
      },
    },
    {
      title: "ITR-4 Return Filing",
      description: "Specialized tax filing service for businesses under presumptive taxation scheme",
      price: "₹2,999",
      originalPrice: "₹4,000",
      billing: "/year",
      slug: "itr4-filing",
      mostPopular: false,
      category: "tax",
      icon: Calculator,
      rating: 4.9,
      completedProjects: 800,
      deliveryTime: "2-3 days",
      features: [
        "Income Computation",
        "Tax Calculation",
        "Form Preparation",
        "E-filing Support",
        "Tax Planning Tips",
      ],
      testimonial: {
        text: "Saved us time and money!",
        author: "Dr. Sunita Rao",
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Our Services
          </Badge>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-5xl text-blue-700">
          Our Popular Services 
          </h2>
          <p className="mx-auto max-w-3xl text-slate-600 text-xl leading-relaxed">
            Everything you need to start, run, and grow your business with confidence
          </p>
        </motion.div>

        {/* Enhanced Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                      : "hover:bg-blue-50 hover:border-blue-200"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 border-slate-200 focus:border-blue-300 focus:ring-blue-200"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredServices.map((service, idx) => {
            const IconComponent = service.icon
            const savings =
              Number.parseInt(service.originalPrice.replace(/[₹,]/g, "")) -
              Number.parseInt(service.price.replace(/[₹,]/g, ""))
            const savingsPercent = Math.round(
              (savings / Number.parseInt(service.originalPrice.replace(/[₹,]/g, ""))) * 100,
            )

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`group relative rounded-2xl bg-white shadow-lg border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  service.mostPopular ? "border-blue-500 shadow-blue-100" : "border-slate-100 hover:border-blue-200"
                } flex flex-col overflow-hidden`}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Savings Badge */}
                <div className="absolute top-1 right-1 z-10">
                  <Badge variant="destructive" className="bg-green-600 hover:bg-green-700">
                    Save {savingsPercent}%
                  </Badge>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Service Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-xl ${service.mostPopular ? "bg-blue-100" : "bg-slate-100"} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${service.mostPopular ? "text-blue-600" : "text-slate-600"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-6 flex-1">
                    <h4 className="text-sm font-semibold mb-3 text-slate-700">What's included:</h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-sm text-blue-600 font-medium">
                          +{service.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-slate-900">{service.price}</span>
                      <span className="text-lg text-slate-400 line-through">{service.originalPrice}</span>
                      <span className="text-sm font-normal text-slate-500">{service.billing}</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">You save ₹{savings.toLocaleString()}!</p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Government fee excluded</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/services/${service.slug}`} className="mt-auto">
                    <Button
                      className={`w-full group/btn transition-all duration-300 ${
                        service.mostPopular
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                          : "bg-slate-900 hover:bg-slate-800"
                      }`}
                      size="lg"
                    >
                      Get Started Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={false}
                  animate={{ opacity: hoveredCard === idx ? 1 : 0 }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* No Results State */}
        {filteredServices.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No services found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* View More Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/services">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

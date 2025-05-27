"use client"

import { motion, useScroll } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Users,
  FileText,
  ChevronDown,
  Phone,
  MessageCircle,
  Share2,
  Play,
  ArrowUp,
  X,
  Calendar,
  Shield,
  Award,
  TrendingUp,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

interface ServiceData {
  title: string
  shortTitle: string
  description: string
  category: string
  icon: string
  color: string
  popular?: boolean
  pricing: {
    amount: string
    originalAmount: string
    currency: string
    gst: boolean
    includes: string[]
  }
  timeline: {
    total: string
    steps: Array<{ name: string; duration: string }>
  }
  whatIs: {
    title: string
    description: string
  }
  keyFeatures: string[]
  idealFor: string[]
  process: Array<{
    step: number
    title: string
    description: string
  }>
  requiredDocuments: {
    [key: string]: string[]
  }
  faqs: Array<{
    question: string
    answer: string
  }>
}

interface DynamicServicePageProps {
  service: ServiceData
  slug: string
}

// Simplified floating navbar component
const FloatingNavbar = ({
  service,
  activeSection,
  scrollToSection,
  showStickyNav,
}: {
  service: ServiceData
  activeSection: string
  scrollToSection: (section: string) => void
  showStickyNav: boolean
}) => {
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "process", label: "Process" },
    { id: "documents", label: "Documents" },
    { id: "pricing", label: "Pricing" },
    { id: "faqs", label: "FAQs" },
  ]

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: showStickyNav ? 0 : -100,
        opacity: showStickyNav ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-1/5 left:1/2 md:left-1/3 transform -translate-x-1/2 z-50"
    >
      <div className="bg-blue-50 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-lg shadow-slate-900/5">
        <div className="px-2 py-2">
          {/* Navigation Menu - Always visible */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}

           
          </nav>
        </div>
      </div>
    </motion.div>
  )
}

export default function DynamicServicePage({ service, slug }: DynamicServicePageProps) {
  const [openFAQs, setOpenFAQs] = useState<number[]>([])
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([])
  const [showVideo, setShowVideo] = useState(false)
  const [showCallbackForm, setShowCallbackForm] = useState(false)
  const [showStickyNav, setShowStickyNav] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [readingProgress, setReadingProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)

  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  // Calculate reading progress
  useEffect(() => {
    const updateReadingProgress = () => {
      if (!pageRef.current) return

      const totalHeight = pageRef.current.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(Math.min(progress, 100))

      // Show sticky nav after hero section
      setShowStickyNav(window.scrollY > 400)
    }

    window.addEventListener("scroll", updateReadingProgress)
    return () => window.removeEventListener("scroll", updateReadingProgress)
  }, [])

  // Track active section
  useEffect(() => {
    const updateActiveSection = () => {
      const sections = ["overview", "features", "process", "documents", "pricing", "faqs"]

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", updateActiveSection)
    return () => window.removeEventListener("scroll", updateActiveSection)
  }, [])

  // Section navigation
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "process", label: "Process" },
    { id: "documents", label: "Documents" },
    { id: "pricing", label: "Pricing" },
    { id: "faqs", label: "FAQs" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const toggleDocument = (doc: string) => {
    setCheckedDocuments((prev) => (prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]))
  }

  const shareService = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: service.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        gradient: "from-blue-600 to-blue-700",
        light: "bg-blue-100",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        gradient: "from-green-600 to-green-700",
        light: "bg-green-100",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        gradient: "from-purple-600 to-purple-700",
        light: "bg-purple-100",
      },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const colors = getColorClasses(service.color)
  const savings =
    Number.parseInt(service.pricing.originalAmount.replace(/,/g, "")) -
    Number.parseInt(service.pricing.amount.replace(/,/g, ""))
  const savingsPercent = Math.round((savings / Number.parseInt(service.pricing.originalAmount.replace(/,/g, ""))) * 100)

  // Sample testimonials (would come from props in real implementation)
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Tech Startup",
      rating: 5,
      text: "Excellent service! Got my company registered in just 12 days. The team was very professional and guided me through every step.",
      avatar: "/placeholder.svg?height=40&width=40&query=business+person",
    },
    {
      name: "Priya Sharma",
      company: "E-commerce Business",
      rating: 5,
      text: "Highly recommend StartBusiness! They made the entire process so simple and transparent. Great value for money.",
      avatar: "/placeholder.svg?height=40&width=40&query=business+woman",
    },
  ]

  return (
    <TooltipProvider>
      <div ref={pageRef} className="min-h-screen bg-white">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress value={readingProgress} className="h-1 rounded-none" />
        </div>

        {/* Simplified Floating Navbar */}
        <FloatingNavbar
          service={service}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          showStickyNav={showStickyNav}
        />

        {/* Enhanced Floating Table of Contents */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: showStickyNav ? 0 : -100,
            opacity: showStickyNav ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg p-4 max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-800 text-sm">Table of Contents</h4>
              <Badge variant="secondary" className="text-xs">
                {Math.round(readingProgress)}%
              </Badge>
            </div>
            <div className="space-y-2">
              {[
                { id: "overview", label: "Service Overview", icon: "📋" },
                { id: "features", label: "Key Features", icon: "⭐" },
                { id: "process", label: "Process Steps", icon: "🔄" },
                { id: "documents", label: "Documents", icon: "📄" },
                { id: "pricing", label: "Pricing", icon: "💰" },
                { id: "faqs", label: "FAQs", icon: "❓" },
              ].map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? `${colors.bg} ${colors.text} font-medium`
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="text-base">{section.icon}</span>
                  <span className="flex-1">{section.label}</span>
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`w-2 h-2 rounded-full ${colors.bg.replace("50", "500")}`}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <WhatsAppCTAButton className="w-full text-xs py-2">
                <MessageCircle className="w-3 h-3 mr-1" />
                Quick Chat
              </WhatsAppCTAButton>
            </div>
          </div>
        </motion.div>

        {/* Mobile Floating Navigation */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: showStickyNav ? 0 : 100,
            opacity: showStickyNav ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-40 lg:hidden"
        >
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Navigate</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {Math.round(readingProgress)}%
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileNav(!showMobileNav)} className="p-1">
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMobileNav ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>

            <motion.div initial={false} animate={{ height: showMobileNav ? "auto" : 0 }} className="overflow-hidden">
              <div className="grid grid-cols-3 gap-2 pb-2">
                {[
                  { id: "overview", label: "Overview", icon: "📋" },
                  { id: "features", label: "Features", icon: "⭐" },
                  { id: "process", label: "Process", icon: "🔄" },
                  { id: "documents", label: "Documents", icon: "📄" },
                  { id: "pricing", label: "Pricing", icon: "💰" },
                  { id: "faqs", label: "FAQs", icon: "❓" },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(section.id)
                      setShowMobileNav(false)
                    }}
                    className={`flex flex-col items-center gap-1 p-2 text-xs rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? `${colors.bg} ${colors.text} font-medium`
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <WhatsAppCTAButton className="flex-1 text-xs py-2">Chat Now</WhatsAppCTAButton>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCallbackForm(true)}
                className="flex-1 text-xs py-2"
              >
                Callback
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Progress Ring for Desktop */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: showStickyNav ? 1 : 0, opacity: showStickyNav ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-40 hidden lg:block"
        >
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={
                  colors.text.includes("blue") ? "#3b82f6" : colors.text.includes("green") ? "#10b981" : "#8b5cf6"
                }
                strokeWidth="2"
                strokeDasharray={`${readingProgress}, 100`}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-slate-700">{Math.round(readingProgress)}%</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: showStickyNav ? 1 : 0, opacity: showStickyNav ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 hidden lg:block"
        >
          <div className="flex flex-col gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={shareService}
                  className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Share this service</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`w-12 h-12 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isBookmarked ? "bg-yellow-500 hover:bg-yellow-600" : "bg-slate-600 hover:bg-slate-700"
                  }`}
                >
                  {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isBookmarked ? "Remove bookmark" : "Bookmark service"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setShowCallbackForm(true)}
                  className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calendar className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Request callback</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="w-12 h-12 rounded-full bg-slate-600 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Back to top</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.div>

        {/* Hero Section */}
        <section
          ref={heroRef}
          id="overview"
          className={`relative py-16 md:py-24 bg-gradient-to-br ${colors.gradient} overflow-hidden`}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-40 -mb-40 blur-2xl"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                {service.popular && (
                  <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2">
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    Most Popular Service
                  </Badge>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {service.title}
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  {service.description}
                </p>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <WhatsAppCTAButton className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg group">
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </WhatsAppCTAButton>
                  <Button
                    variant="outline"
                    onClick={() => setShowVideo(true)}
                    className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection("pricing")}
                    className="text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-lg"
                  >
                    View Pricing
                  </Button>
                </div>

                {/* Enhanced Quick Stats with animations */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: service.timeline.total, label: "Processing Time", icon: Clock },
                    { value: `₹${service.pricing.amount}`, label: "Starting Price", icon: TrendingUp },
                    { value: "100%", label: "Success Rate", icon: Award },
                    { value: "24/7", label: "Support", icon: Shield },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center group"
                    >
                      <div className="bg-white/10 rounded-lg p-3 mb-2 mx-auto w-fit group-hover:bg-white/20 transition-colors">
                        <stat.icon className="w-6 h-6 text-white mx-auto" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-white/70 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">100% Secure Process</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Government Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">10,000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Fast Processing</span>
              </div>
            </div>
          </div>
        </section>

        {/* What Is Section with enhanced features */}
        <section id="features" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{service.whatIs.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">{service.whatIs.description}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Enhanced Key Features with tooltips */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`${colors.bg} rounded-2xl p-8 border ${colors.border}`}
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                    <CheckCircle className={`w-6 h-6 ${colors.text} mr-3`} />
                    Key Features
                  </h3>
                  <ul className="space-y-4">
                    {service.keyFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center text-slate-700 group hover:text-slate-900 transition-colors"
                      >
                        <div
                          className={`w-3 h-3 ${colors.bg.replace("50", "500")} rounded-full mr-3 group-hover:scale-110 transition-transform`}
                        ></div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">{feature}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Learn more about {feature.toLowerCase()}</p>
                          </TooltipContent>
                        </Tooltip>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Enhanced Ideal For section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                    <Users className={`w-6 h-6 ${colors.text} mr-3`} />
                    Ideal For
                  </h3>
                  <ul className="space-y-4">
                    {service.idealFor.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center text-slate-700 group hover:text-slate-900 transition-colors"
                      >
                        <div
                          className={`w-3 h-3 ${colors.bg.replace("50", "500")} rounded-full mr-3 group-hover:scale-110 transition-transform`}
                        ></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Process Section with progress indicator */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Registration Process</h2>
                <p className="text-lg text-slate-600">Simple and streamlined process to get your business registered</p>
              </motion.div>

              {/* Process Timeline for mobile */}
              <div className="md:hidden mb-8">
                <div className="relative">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start mb-6 last:mb-0">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center border-2 ${colors.border}`}
                        >
                          <span className={`text-sm font-bold ${colors.text}`}>{step.step}</span>
                        </div>
                        {index < service.process.length - 1 && (
                          <div className={`w-0.5 h-12 ${colors.bg.replace("50", "200")} mt-2`}></div>
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-semibold text-slate-800 mb-1">{step.title}</h3>
                        <p className="text-slate-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Grid for desktop */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div
                      className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <span className={`text-xl font-bold ${colors.text}`}>{step.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>

                    {/* Connection line for desktop */}
                    {index < service.process.length - 1 && (
                      <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-slate-200"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents & Timeline Section */}
        <section id="documents" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Required Documents */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                    <FileText className={`w-6 h-6 ${colors.text} mr-3`} />
                    Required Documents
                  </h3>
                  {Object.entries(service.requiredDocuments).map(([category, documents], index) => (
                    <div key={index} className="mb-6">
                      <h4 className="font-semibold text-slate-700 mb-3 capitalize">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <ul className="space-y-2">
                        {documents.map((doc, docIndex) => (
                          <li key={docIndex} className="flex items-center text-slate-600 text-sm">
                            <input
                              type="checkbox"
                              id={`doc-${docIndex}`}
                              className="mr-2 h-4 w-4 rounded text-blue-500 focus:ring-blue-500"
                              checked={checkedDocuments.includes(doc)}
                              onChange={() => toggleDocument(doc)}
                            />
                            <label htmlFor={`doc-${docIndex}`}>{doc}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>

                {/* Timeline & Pricing */}
                <div className="space-y-8">
                  {/* Timeline */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                  >
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                      <Clock className={`w-6 h-6 ${colors.text} mr-3`} />
                      Timeline
                    </h3>
                    <div className="mb-4">
                      <div className="text-lg font-semibold text-slate-800">
                        Standard processing time: {service.timeline.total}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {service.timeline.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0"
                        >
                          <span className="text-slate-700">{step.name}</span>
                          <span className="font-medium text-slate-800">{step.duration}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Pricing */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`bg-gradient-to-br ${colors.gradient} rounded-2xl p-8 text-white shadow-lg`}
                  >
                    <h3 className="text-2xl font-bold mb-6">Pricing</h3>
                    <div className="mb-4">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-bold">
                          {service.pricing.currency}
                          {service.pricing.amount}
                        </span>
                        <span className="text-xl text-white/70 line-through">
                          {service.pricing.currency}
                          {service.pricing.originalAmount}
                        </span>
                      </div>
                      <div className="text-white/90">+ GST</div>
                      <Badge className="bg-white/20 text-white border-white/30 mt-2">
                        Save {savingsPercent}% (₹{savings.toLocaleString()})
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-6">
                      {service.pricing.includes.map((item, index) => (
                        <div key={index} className="flex items-center text-white/90 text-sm">
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <WhatsAppCTAButton className="w-full bg-white text-slate-800 hover:bg-slate-100 font-semibold py-3 rounded-xl">
                      Get Started
                    </WhatsAppCTAButton>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-slate-600">Get answers to common questions about {service.shortTitle}</p>
              </motion.div>

              <div className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Collapsible
                      open={openFAQs.includes(index)}
                      onOpenChange={() => toggleFAQ(index)}
                      className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <CollapsibleTrigger className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-300 rounded-xl">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.question}</h3>
                          <motion.div
                            animate={{ rotate: openFAQs.includes(index) ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          </motion.div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-6 pb-6">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                        >
                          {faq.answer}
                        </motion.div>
                      </CollapsibleContent>
                    </Collapsible>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-16 bg-gradient-to-br ${colors.gradient}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
                <p className="text-xl text-white/90 mb-8">
                  Join thousands of successful businesses who trust us with their {service.shortTitle.toLowerCase()}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <WhatsAppCTAButton className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat With Expert
                  </WhatsAppCTAButton>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Callback Form Modal */}
      {showCallbackForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Request Callback</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCallbackForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <Input placeholder="Your Name" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Email Address" />
              <Textarea placeholder="Message (optional)" rows={3} />
              <Button className="w-full">Request Callback</Button>
            </div>
          </motion.div>
        </div>
      )}
    </TooltipProvider>
  )
}

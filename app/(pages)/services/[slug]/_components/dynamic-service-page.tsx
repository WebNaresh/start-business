"use client"

import { motion, useScroll } from "framer-motion"

import { useState, useEffect, useRef } from "react"

import { Progress } from "@/components/ui/progress"
import {  TooltipProvider } from "@/components/ui/tooltip"

import OverviewSection from "./OverviewSection"
import FeaturesSection from "./FeaturesSection"
import ProcessSection from "./ProcessSection"
import DocumentsSection from "./DocumentsSection"
import PricingSection from "./PricingSection"
import FaqSection from "./FaqSection"

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
                className={`px-2 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
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
      <FloatingNavbar
        service={service}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        showStickyNav={showStickyNav}
      />
      <div ref={pageRef} className="min-h-screen bg-white">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress value={readingProgress} className="h-1 rounded-none" />
        </div>
        {/* Section Components */}
        <OverviewSection service={service} />
        <FeaturesSection service={service} />
        <ProcessSection service={service} />
        <DocumentsSection service={service}/>
        <PricingSection service={service} />
        <FaqSection service={service} openFAQs={openFAQs} toggleFAQ={toggleFAQ} />
        {/* ...rest of the page (CTA, etc.) ... */}
      </div>
      {/* ...rest of the floating/fab/cta code ... */}
    </TooltipProvider>
  )
}

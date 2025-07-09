"use client"

import { useState, useEffect, useRef } from "react"

import { Progress } from "@/components/ui/progress"
import {  TooltipProvider } from "@/components/ui/tooltip"

import OverviewSection from "./OverviewSection"
import FeaturesSection from "./FeaturesSection"
import ProcessSection from "./ProcessSection"
import DocumentsSection from "./DocumentsSection"
import PricingSection from "./PricingSection"
import FaqSection from "./FaqSection"
import RelatedServicesSection from "./RelatedServicesSection"
import Breadcrumbs from "@/components/ui/breadcrumbs"
import RelatedServices from "@/components/seo/related-services"

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
  requiredDocuments?: {
    [key: string]: string[]
  }
  documents?: string[]
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
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-300 ${
        showStickyNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg shadow-slate-900/5">
        <div className="px-3 py-2">
          {/* Navigation Menu - Always visible */}
          <nav className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeSection === item.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
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

  const savings =
    Number.parseInt(service.pricing.originalAmount.replace(/,/g, "")) -
    Number.parseInt(service.pricing.amount.replace(/,/g, ""))
  const savingsPercent = Math.round((savings / Number.parseInt(service.pricing.originalAmount.replace(/,/g, ""))) * 100)



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
          <Progress value={readingProgress} className="h-1 rounded-none bg-blue-100" />
        </div>

        {/* Breadcrumbs */}
        <Breadcrumbs className="bg-slate-50 border-b border-slate-200" />

        {/* Section Components with improved spacing */}
        <div className="space-y-0">
          <OverviewSection service={service} />
          <FeaturesSection service={service} />
          <ProcessSection service={service} />
          <DocumentsSection service={service}/>
          <PricingSection service={service} />

          {/* Related Services Section */}
          <section className="py-12 md:py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <RelatedServices
                title="Related Business Services"
                description="Explore other services that complement your business registration"
                showClusterLinks={true}
                className="mb-8"
              />
            </div>
          </section>

          <FaqSection service={service} openFAQs={openFAQs} toggleFAQ={toggleFAQ} />
        </div>
      </div>
    </TooltipProvider>
  )
}

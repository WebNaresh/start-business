"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Star,
  Building2,
  Calculator,
  FileText,
  HelpCircle,
  ExternalLink,
  Play,
  Users,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  Pause
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import QuizModal from "@/components/ui/quiz-modal"
import CompanyRegistrationQuiz from "./company-registration-quiz"
import ITREligibilityQuiz from "./itr-eligibility-quiz"
import { useServiceCarousel } from '@/hooks/use-service-carousel'

interface ServiceCategory {
  id: string
  title: string
  description: string
  icon: React.ElementType
  gradient: string
  color: string
  popular?: boolean
}

export default function ServiceRecommendationQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Use custom carousel hook
  const {
    emblaRef,
    currentSlide,
    isPlaying,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    toggleAutoplay
  } = useServiceCarousel({
    autoplayDelay: 4000,
    stopOnInteraction: false,
    loop: true
  })

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check with fallback
    try {
      checkMobile()
    } catch (error) {
      console.warn('Failed to detect mobile device, defaulting to desktop layout')
      setIsMobile(false)
    }

    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Service categories
  const serviceCategories: ServiceCategory[] = [
    {
      id: "company-registration",
      title: "Find Your Perfect Business Structure",
      description: "Get personalized recommendations for your business structure based on your needs, investment capacity, and growth plans.",
      icon: Building2,
      gradient: "from-blue-500 to-indigo-600",
      color: "blue",
      popular: true
    },
    {
      id: "itr-eligibility",
      title: "Find the right ITR form for you | FY 2024-25",
      description: "Determine your Income Tax Return filing requirements based on your income sources, earnings, and tax status.",
      icon: FileText,
      gradient: "from-green-500 to-emerald-600",
      color: "green"
    },
    {
      id: "business-calculators",
      title: "Explore Business Calculators",
      description: "Access intelligent calculators for GST, Income Tax, EMI, and more with personalized recommendations.",
      icon: Calculator,
      gradient: "from-purple-500 to-pink-600",
      color: "purple"
    }
  ]

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === "business-calculators") {
      // Redirect to calculators page
      window.open("/business-calculators", "_blank")
      return
    }
    setSelectedQuiz(categoryId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedQuiz(null)
  }

  const getModalTitle = () => {
    const category = serviceCategories.find(cat => cat.id === selectedQuiz)
    return category?.title || "Quiz"
  }

  const renderQuizContent = () => {
    switch (selectedQuiz) {
      case "company-registration":
        return <CompanyRegistrationQuiz />
      case "itr-eligibility":
        return <ITREligibilityQuiz />
      default:
        return null
    }
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lightweight Hero Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <span className="text-xs sm:text-sm font-semibold text-blue-700">AI-Powered Recommendations</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
            Find Your Perfect Business Service
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6">
            Choose from our intelligent recommendation tools to get personalized advice for your business needs. Get started in under 2 minutes.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 mb-8">
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              <span>Expert Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
              <span>2 Min Setup</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
              <span>10K+ Helped</span>
            </div>
          </div>
        </div>

        {/* Enhanced Service Category Cards with Mobile Carousel */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <div className="relative">
              {/* Progress indicator */}
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full px-3 py-1 shadow-sm border border-slate-200">
                  <span className="text-xs text-slate-600 font-medium">
                    {currentSlide + 1} of {serviceCategories.length}
                  </span>
                </div>
              </div>

              {/* Carousel Container */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                  {serviceCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex-[0_0_85%] min-w-0 px-3"
                    >
                      <ServiceCard
                        category={category}
                        onSelect={handleCategorySelect}
                        isMobile={true}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Carousel Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="rounded-full p-2 h-auto bg-white shadow-md hover:shadow-lg touch-target disabled:opacity-50"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Autoplay Control */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAutoplay}
                  className="rounded-full p-2 h-auto bg-white shadow-md hover:shadow-lg touch-target"
                  aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="rounded-full p-2 h-auto bg-white shadow-md hover:shadow-lg touch-target disabled:opacity-50"
                  aria-label="Next service"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Enhanced Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {serviceCategories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollTo(idx)}
                    className={`rounded-full transition-all duration-300 touch-target ${currentSlide === idx
                        ? "bg-blue-600 w-6 h-2"
                        : "bg-slate-300 w-2 h-2 hover:bg-slate-400"
                      }`}
                    aria-label={`Go to service ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Swipe hint for first-time users */}
              <div className="flex justify-center mt-2">
                <span className="text-xs text-slate-400 animate-pulse">
                  Swipe to explore more services
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceCategories.map((category) => (
              <ServiceCard
                key={category.id}
                category={category}
                onSelect={handleCategorySelect}
                isMobile={false}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Get Expert Help Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 text-center relative overflow-hidden">
          {/* Enhanced Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full -ml-12 -mb-12 blur-xl" />

          {/* Mobile floating elements */}
          {isMobile && (
            <>
              <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse" />
              <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse delay-1000" />
              <div className="absolute bottom-6 left-8 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse delay-500" />
            </>
          )}

          <div className="max-w-3xl mx-auto relative z-10">
            <div className={cn(
              "bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg hover:scale-105 transition-transform duration-300",
              isMobile ? "w-14 h-14" : "w-12 h-12 sm:w-16 sm:h-16"
            )}>
              <HelpCircle className={cn(
                "text-white",
                isMobile ? "w-7 h-7" : "w-6 h-6 sm:w-8 sm:h-8"
              )} />
            </div>

            <h3 className={cn(
              "font-bold text-slate-900 mb-3 sm:mb-4",
              isMobile ? "text-lg" : "text-base sm:text-lg lg:text-xl"
            )}>
              Need Personal Guidance?
            </h3>

            <p className={cn(
              "text-slate-600 mb-6 sm:mb-8 leading-relaxed",
              isMobile ? "text-sm px-2" : "text-sm sm:text-base px-2"
            )}>
              Our business experts are here to help you make the right decisions for your specific situation. Get personalized advice in just 15 minutes.
            </p>

            {/* Enhanced Stats with Mobile Carousel */}
            <div className={cn(
              "mb-6 sm:mb-8 text-xs sm:text-sm text-slate-500",
              isMobile ? "overflow-x-auto" : ""
            )}>
              <div className={cn(
                "flex items-center justify-center gap-4 sm:gap-6",
                isMobile ? "min-w-max px-4" : "flex-wrap"
              )}>
                <div className="flex items-center gap-1 bg-white/50 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">500+ CA Experts</span>
                </div>
                <div className="flex items-center gap-1 bg-white/50 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">15 Min Response</span>
                </div>
                <div className="flex items-center gap-1 bg-white/50 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Free Consultation</span>
                </div>
              </div>
            </div>

            <Link href="/contact">
              <Button className={cn(
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105",
                isMobile ? "px-6 py-3 text-sm w-full max-w-xs" : "px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
              )}>
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className={isMobile ? "" : "hidden sm:inline"}>
                  {isMobile ? "Get Help" : "Get Expert Help"}
                </span>
                {!isMobile && <span className="sm:hidden">Get Help</span>}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
      >
        {renderQuizContent()}
      </QuizModal>
    </>
  )
}

// ServiceCard Component for reusability
interface ServiceCardProps {
  category: ServiceCategory
  onSelect: (categoryId: string) => void
  isMobile: boolean
}

function ServiceCard({ category, onSelect, isMobile }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer",
        isMobile
          ? "h-[320px] service-card-mobile active:scale-95"
          : "h-full hover:-translate-y-1"
      )}
      onClick={() => onSelect(category.id)}
    >
      {/* Popular Badge */}
      {category.popular && (
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-800 bg-orange-200 rounded-full shadow-sm">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </span>
        </div>
      )}

      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300",
        category.gradient
      )} />

      <div className="relative p-4 sm:p-6 lg:p-8 h-full flex flex-col">
        {/* Icon */}
        <div className={cn(
          "rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 shadow-lg group-hover:scale-105",
          `bg-gradient-to-br ${category.gradient} text-white`,
          isMobile ? "w-14 h-14" : "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
        )}>
          <category.icon className={cn(
            isMobile ? "w-7 h-7" : "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          )} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className={cn(
            "font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors leading-tight",
            isMobile ? "text-lg" : "text-base sm:text-lg lg:text-xl"
          )}>
            {category.title}
          </h3>

          <p className={cn(
            "text-slate-600 mb-4 sm:mb-6 leading-relaxed flex-1",
            isMobile ? "text-sm" : "text-sm sm:text-base"
          )}
            style={isMobile ? {
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            } : {}}>
            {category.description}
          </p>

          {/* Action Button */}
          <button className={cn(
            "w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg",
            `bg-gradient-to-r ${category.gradient} text-white shadow-md`,
            isMobile ? "text-sm" : "text-sm sm:text-base"
          )}>
            {category.id === "business-calculators" ? (
              <>
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className={isMobile ? "" : "hidden sm:inline"}>
                  {isMobile ? "Explore" : "Explore Calculators"}
                </span>
                {!isMobile && <span className="sm:hidden">Explore</span>}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className={isMobile ? "" : "hidden sm:inline"}>
                  {isMobile ? "Start" : "Start Quiz"}
                </span>
                {!isMobile && <span className="sm:hidden">Start</span>}
              </>
            )}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile-specific enhancements */}
      {isMobile && (
        <div className="absolute bottom-2 left-2 right-2">
          <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
        </div>
      )}
    </div>
  )
}

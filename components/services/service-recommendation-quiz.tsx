"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Star,
  Building2,
  Calculator,
  FileText,
  ExternalLink,
  Play,
  Sparkles,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Timer,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
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
  const isMobile = useMobile(768)
  const isTablet = useMobile(1024)

  // Use custom carousel hook with enhanced settings
  const {
    emblaRef,
    currentSlide,
    isPlaying,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    toggleAutoplay
  } = useServiceCarousel({
    autoplayDelay: 3000,
    stopOnInteraction: false,
    loop: true
  })

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
      window.location.href = "/business-calculators"
      return
    }
    
    // Redirect to dedicated quiz pages instead of opening modals
    if (categoryId === "company-registration") {
      window.location.href = "/business-structure-quiz"
      return
    }

    if (categoryId === "itr-eligibility") {
      window.location.href = "/itr-eligibility-quiz"
      return
    }
  }



  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 border border-blue-200/50 backdrop-blur-sm max-w-full">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-blue-700 truncate">AI-Powered Recommendations</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
            Find Your Perfect Business Service
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
            Choose from our intelligent recommendation tools to get personalized advice for your business needs. Get started in under 2 minutes.
          </p>

          {/* Enhanced trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 px-2">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-slate-200 shadow-sm">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Expert Verified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-slate-200 shadow-sm">
              <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span className="whitespace-nowrap">2 Min Setup</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-slate-200 shadow-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
              <span className="whitespace-nowrap">10K+ Helped</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-slate-200 shadow-sm">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
              <span className="whitespace-nowrap">100% Secure</span>
            </div>
          </div>
        </div>

        {/* Enhanced Service Category Cards with Better Mobile Experience */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          {/* Mobile/Tablet Carousel */}
          <div className="block lg:hidden">
            <div className="relative w-full">
              {/* Enhanced progress indicator */}
              <div className="flex justify-center mb-4 sm:mb-6 px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg border border-slate-200">
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    {currentSlide + 1} of {serviceCategories.length}
                  </span>
                </div>
              </div>

              {/* Enhanced Carousel Container */}
              <div className="overflow-hidden rounded-xl sm:rounded-2xl mx-2 sm:mx-0" ref={emblaRef}>
                <div className="flex touch-pan-y">
                  {serviceCategories.map((category) => (
                    <div
                      key={category.id}
                      className={cn(
                        "min-w-0 pl-3 pr-3 sm:pl-4 sm:pr-4",
                        isMobile ? "flex-[0_0_85%]" : "flex-[0_0_80%]"
                      )}
                    >
                      <ServiceCard
                        category={category}
                        onSelect={handleCategorySelect}
                        isMobile={isMobile}
                        isTablet={isTablet}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Mobile Carousel Controls */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="rounded-full p-2 sm:p-3 h-auto bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 disabled:opacity-30 transition-all duration-300"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                {/* Enhanced dot indicators */}
                <div className="flex gap-1.5 sm:gap-2">
                  {serviceCategories.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-1.5 sm:h-2 rounded-full transition-all duration-300",
                        currentSlide === index 
                          ? "w-6 sm:w-8 bg-gradient-to-r from-blue-500 to-purple-500" 
                          : "w-1.5 sm:w-2 bg-slate-300"
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="rounded-full p-2 sm:p-3 h-auto bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 disabled:opacity-30 transition-all duration-300"
                  aria-label="Next service"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>

              {/* Enhanced swipe hint */}
              <div className="flex justify-center mt-3 sm:mt-4 px-4">
                <span className="text-xs sm:text-sm text-slate-400 animate-pulse text-center">
                  ← Swipe to explore more →
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {serviceCategories.map((category) => (
              <ServiceCard
                key={category.id}
                category={category}
                onSelect={handleCategorySelect}
                isMobile={false}
                isTablet={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced ServiceCard Component
interface ServiceCardProps {
  category: ServiceCategory
  onSelect: (categoryId: string) => void
  isMobile: boolean
  isTablet?: boolean
}

function ServiceCard({ category, onSelect, isMobile, isTablet = false }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer",
        isMobile
          ? "h-[360px] active:scale-95"
          : "h-full hover:-translate-y-2 hover:scale-105"
      )}
      onClick={() => onSelect(category.id)}
    >
      {/* Enhanced Popular Badge */}
      {category.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-orange-800 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full shadow-lg border border-orange-300">
            <Star className="w-3 h-3 mr-1 fill-orange-500" />
            Popular
          </span>
        </div>
      )}

      {/* Enhanced Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-15 transition-all duration-500",
        category.gradient
      )} />

      <div className="relative p-6 sm:p-8 h-full flex flex-col">
        {/* Enhanced Icon */}
        <div className={cn(
          "rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-3",
          `bg-gradient-to-br ${category.gradient} text-white`,
          isMobile ? "w-16 h-16" : "w-20 h-20"
        )}>
          <category.icon className={cn(
            isMobile ? "w-8 h-8" : "w-10 h-10"
          )} />
        </div>

        {/* Enhanced Content */}
        <div className="flex-1 flex flex-col">
          <h3 className={cn(
            "font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight",
            isMobile ? "text-lg" : "text-xl"
          )}>
            {category.title}
          </h3>

          <p className={cn(
            "text-slate-600 mb-6 leading-relaxed flex-1",
            isMobile ? "text-sm line-clamp-3" : "text-base"
          )}>
            {category.description}
          </p>

          {/* Enhanced Action Button */}
          <button className={cn(
            "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl group-hover:scale-105",
            `bg-gradient-to-r ${category.gradient} text-white shadow-lg`,
            isMobile ? "text-sm" : "text-base"
          )}>
            {category.id === "business-calculators" ? (
              <>
                <Calculator className="w-5 h-5" />
                <span>Explore Calculators</span>
                <ExternalLink className="w-4 h-4" />
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Start Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Enhanced mobile indicator */}
      {isMobile && (
        <div className="absolute bottom-3 left-3 right-3">
          <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
        </div>
      )}

      {/* Success checkmark for completed actions */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
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
  Award
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import QuizModal from "@/components/ui/quiz-modal"
import CompanyRegistrationQuiz from "./company-registration-quiz"
import ITREligibilityQuiz from "./itr-eligibility-quiz"

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

        {/* Lightweight Service Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {serviceCategories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
              onClick={() => handleCategorySelect(category.id)}
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
                  "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 shadow-lg group-hover:scale-105",
                  `bg-gradient-to-br ${category.gradient} text-white`
                )}>
                  <category.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {category.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed flex-1">
                    {category.description}
                  </p>

                  {/* Action Button */}
                  <button className={cn(
                    "w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base hover:shadow-lg",
                    `bg-gradient-to-r ${category.gradient} text-white shadow-md`
                  )}>
                    {category.id === "business-calculators" ? (
                      <>
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Explore Calculators</span>
                        <span className="sm:hidden">Explore</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Start Quiz</span>
                        <span className="sm:hidden">Start</span>
                      </>
                    )}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightweight Get Expert Help Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg hover:scale-105 transition-transform duration-300">
              <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
              Need Personal Guidance?
            </h3>
            
            <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 leading-relaxed px-2">
              Our business experts are here to help you make the right decisions for your specific situation. Get personalized advice in just 15 minutes.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                <span>500+ CA Experts</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>15 Min Response</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                <span>Free Consultation</span>
              </div>
            </div>
            
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base font-semibold hover:scale-105">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Get Expert Help</span>
                <span className="sm:hidden">Get Help</span>
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

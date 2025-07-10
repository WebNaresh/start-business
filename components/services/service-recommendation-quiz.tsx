"use client"

import { useState } from "react"
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
  Sparkles
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
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">AI-Powered Recommendations</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
            Find Your Perfect Business Service
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Choose from our intelligent recommendation tools to get personalized advice for your business needs.
          </p>
        </div>

        {/* Service Category Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {serviceCategories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-800 bg-orange-200 rounded-full">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </span>
                </div>
              )}

              {/* Background Gradient */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500",
                category.gradient
              )} />

              <div className="relative p-6 md:p-8">
                {/* Icon */}
                <div className={cn(
                  "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110",
                  `bg-gradient-to-br ${category.gradient} text-white shadow-lg`
                )}>
                  <category.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => handleCategorySelect(category.id)}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105",
                    `bg-gradient-to-r ${category.gradient} text-white hover:shadow-${category.color}-500/25`
                  )}
                >
                  {category.id === "business-calculators" ? (
                    <>
                      <ExternalLink className="w-5 h-5" />
                      Explore Calculators
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Start Quiz
                    </>
                  )}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Get Expert Help Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6 md:p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              Need Personal Guidance?
            </h3>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our business experts are here to help you make the right decisions for your specific situation.
            </p>
            
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Users className="w-5 h-5 mr-2" />
                Get Expert Help
                <ArrowRight className="w-5 h-5 ml-2" />
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

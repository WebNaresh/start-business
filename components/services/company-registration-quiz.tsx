"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Building2,
  Lightbulb,
  Rocket,
  Laptop,
  Store,
  Factory,
  Users,
  UserCheck,
  Banknote,
  Sparkles,
  Clock,
  Star,
  Target,
  RotateCcw,
  Award,
  Shield,
  Globe


} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface QuizQuestion {
  id: string
  question: string
  description?: string
  emoji?: string
  options: {
    id: string
    label: string
    description: string
    icon: React.ElementType
    value: string
    gradient: string
    popular?: boolean
  }[]
}

interface CompanyRecommendation {
  title: string
  description: string
  price: string
  originalPrice: string
  slug: string
  confidence: number
  reasons: string[]
}

export default function CompanyRegistrationQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const questions: QuizQuestion[] = [
    {
      id: "team_structure",
      question: "Are you starting the business alone?",
      description: "This helps us understand your business partnership structure",
      emoji: "�",
      options: [
        {
          id: "alone",
          label: "Yes, I'm starting alone",
          description: "I'm starting as a solo entrepreneur",
          icon: UserCheck,
          value: "alone",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "with_partners",
          label: "No, I have partners",
          description: "I'm starting with business partners",
          icon: Users,
          value: "with_partners",
          gradient: "from-purple-400 to-purple-600"
        }
      ]
    },
    {
      id: "compliance_preference",
      question: "What is your preference for compliance burden?",
      description: "Different structures have varying compliance requirements",
      emoji: "📋",
      options: [
        {
          id: "minimal",
          label: "Minimal compliance, I prefer simplicity",
          description: "I want simple, easy-to-manage requirements",
          icon: Lightbulb,
          value: "minimal",
          gradient: "from-green-400 to-green-600",
          popular: true
        },
        {
          id: "moderate",
          label: "I can handle moderate compliance for better structure",
          description: "I'm okay with regular filings for better business structure",
          icon: Building2,
          value: "moderate",
          gradient: "from-orange-400 to-orange-600"
        }
      ]
    },
    {
      id: "liability_protection",
      question: "Do you want limited liability protection for your solo business?",
      description: "This affects your personal asset protection",
      emoji: "🛡️",
      options: [
        {
          id: "yes_protection",
          label: "Yes, I want limited liability protection",
          description: "I want to protect my personal assets from business risks",
          icon: Shield,
          value: "yes_protection",
          gradient: "from-red-400 to-red-600",
          popular: true
        },
        {
          id: "no_protection",
          label: "No, I'm comfortable with unlimited liability",
          description: "I'm comfortable with personal liability for business",
          icon: UserCheck,
          value: "no_protection",
          gradient: "from-gray-400 to-gray-600"
        }
      ]
    }
  ]

  // Auto-advance after selection
  useEffect(() => {
    if (selectedOption && !isAnimating) {
      const timer = setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setIsAnimating(true)
          setTimeout(() => {
            setCurrentStep(currentStep + 1)
            setSelectedOption(null)
            setIsAnimating(false)
          }, 300)
        } else {
          setShowResults(true)
        }
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [selectedOption, currentStep, isAnimating, questions.length])

  const getRecommendations = (): CompanyRecommendation[] => {
    const {
      team_structure,
      compliance_preference,
      liability_protection
    } = answers

    const recommendations: CompanyRecommendation[] = []
    let confidence = 80

    // Enhanced logic for recommendations based on new questions

    // Solo Proprietorship - For minimal compliance and no liability protection
    if (team_structure === "alone" && compliance_preference === "minimal" && liability_protection === "no_protection") {
      confidence = 95

      recommendations.push({
        title: "Sole Proprietorship",
        description: "Simplest business structure with minimal compliance",
        price: "₹3,000",
        originalPrice: "₹5,000",
        slug: "sole-proprietorship",
        confidence: Math.min(confidence, 98),
        reasons: [
          "You're starting alone",
          "Minimal compliance requirements",
          "No liability protection needed",
          "Lowest cost structure",
          "Easy to start and manage"
        ]
      })
    }

    // One Person Company (OPC) - For solo entrepreneurs with liability protection
    if (team_structure === "alone" && liability_protection === "yes_protection") {
      confidence = 92
      if (compliance_preference === "minimal") confidence += 3

      recommendations.push({
        title: "One Person Company (OPC)",
        description: "Perfect for solo entrepreneurs with limited liability protection",
        price: "₹8,000",
        originalPrice: "₹10,000",
        slug: "opc-registration",
        confidence: Math.min(confidence, 98),
        reasons: [
          "You're operating solo",
          "Limited liability protection",
          "Professional credibility",
          "Can convert to Pvt Ltd later",
          ...(compliance_preference === "minimal" ? ["Relatively simple compliance"] : ["Structured business approach"])
        ]
      })
    }

    // Partnership - For multiple partners with minimal compliance
    if (team_structure === "with_partners" && compliance_preference === "minimal" && liability_protection === "no_protection") {
      confidence = 88

      recommendations.push({
        title: "Partnership Firm",
        description: "Simple structure for multiple partners",
        price: "₹5,000",
        originalPrice: "₹7,000",
        slug: "partnership-firm",
        confidence: Math.min(confidence, 95),
        reasons: [
          "You have business partners",
          "Minimal compliance requirements",
          "Easy to establish",
          "Flexible profit sharing",
          "Cost-effective structure"
        ]
      })
    }

    // Limited Liability Partnership (LLP) - For partners with liability protection
    if (team_structure === "with_partners" && liability_protection === "yes_protection") {
      confidence = 90
      if (compliance_preference === "moderate") confidence += 5

      recommendations.push({
        title: "Limited Liability Partnership (LLP)",
        description: "Ideal for partnerships with liability protection",
        price: "₹10,000",
        originalPrice: "₹13,000",
        slug: "llp-registration",
        confidence: Math.min(confidence, 98),
        reasons: [
          "Perfect for partnerships",
          "Limited liability protection",
          "Flexible management structure",
          "Professional credibility",
          ...(compliance_preference === "moderate" ? ["Manageable compliance"] : ["Structured approach"])
        ]
      })
    }

    // Private Limited Company - For those who want maximum structure and protection
    if (compliance_preference === "moderate" && liability_protection === "yes_protection") {
      confidence = 85
      if (team_structure === "with_partners") confidence += 5

      recommendations.push({
        title: "Private Limited Company",
        description: "Most professional structure with maximum benefits",
        price: "₹12,000",
        originalPrice: "₹15,000",
        slug: "private-limited-company",
        confidence: Math.min(confidence, 95),
        reasons: [
          "Maximum liability protection",
          "Professional credibility",
          "Easy to raise capital",
          "Investor-friendly structure",
          "Separate legal entity",
          ...(team_structure === "with_partners" ? ["Great for multiple stakeholders"] : ["Can add partners later"])
        ]
      })
    }

    // Sort by confidence and return top 3
    return recommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3)
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    setSelectedOption(value)
  }

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setSelectedOption(null)
        setIsAnimating(false)
      }, 300)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setSelectedOption(answers[questions[currentStep - 1].id] || null)
        setIsAnimating(false)
      }, 300)
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setSelectedOption(null)
    setIsAnimating(false)
  }

  if (showResults) {
    const recommendations = getRecommendations()

    return (
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Results Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="text-xs sm:text-sm font-semibold text-green-700">Analysis Complete</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 px-2">
            Your Perfect Company Structure
          </h3>

          <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2">
            Based on your answers, here are the best company registration options for your business.
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-3 sm:space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6 hover:shadow-lg transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-0">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2">{rec.title}</h4>
                    <div className="sm:text-right sm:ml-4">
                      <div className="bg-green-100 text-green-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold mb-2 inline-block">
                        {rec.confidence}% match
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 mb-3">{rec.description}</p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-green-600">{rec.price}</span>
                    <span className="text-base sm:text-lg text-slate-400 line-through">{rec.originalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Why this is perfect for you:
                </h5>
                <ul className="space-y-1">
                  {rec.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/services/${rec.slug}`}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started - {rec.price}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Take Quiz Again
          </Button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Progress Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Question {currentStep + 1} of {questions.length}
          </Badge>
          <div className="text-xs sm:text-sm font-medium text-slate-600">
            {Math.round(progress)}% complete
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-md mx-auto">
          <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className={cn(
        "transition-all duration-300",
        isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
      )}>
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg sm:rounded-xl border border-slate-200 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4">{currentQuestion.emoji}</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight px-2">
              {currentQuestion.question}
            </h3>
            {currentQuestion.description && (
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto px-2">
                {currentQuestion.description}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="grid gap-3 sm:gap-4 mb-4 sm:mb-6">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value
              const isCurrentSelection = selectedOption === option.value

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  disabled={isAnimating}
                  className={cn(
                    "group relative p-3 sm:p-4 text-left border-2 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-lg",
                    isSelected || isCurrentSelection
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg scale-[1.02] sm:scale-105"
                      : "border-slate-200 bg-white hover:border-slate-300",
                    option.popular && "ring-1 sm:ring-2 ring-yellow-400 ring-offset-1 sm:ring-offset-2",
                    isAnimating && "pointer-events-none"
                  )}
                >
                  {/* Popular Badge */}
                  {option.popular && (
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                      <Star className="w-2 h-2 sm:w-3 sm:h-3 inline mr-0.5 sm:mr-1" />
                      <span className="hidden sm:inline">Popular</span>
                      <span className="sm:hidden">★</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
                      isSelected || isCurrentSelection
                        ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    )}>
                      <option.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className={cn(
                        "font-semibold text-sm sm:text-base md:text-lg transition-colors duration-300 leading-tight",
                        isSelected || isCurrentSelection ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                      )}>
                        {option.label}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                        {option.description}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {(isSelected || isCurrentSelection) && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isAnimating}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-sm order-2 sm:order-1"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-500 order-1 sm:order-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{questions.length - currentStep - 1} left</span>
            </div>

            {!selectedOption && (
              <Button
                onClick={nextStep}
                disabled={!answers[currentQuestion.id] || isAnimating}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 sm:px-6 py-2 text-sm sm:text-base order-3 w-full sm:w-auto"
              >
                <span className="truncate">
                  {currentStep === questions.length - 1 ? "Get Results" : "Next"}
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

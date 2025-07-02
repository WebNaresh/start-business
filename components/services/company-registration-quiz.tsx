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
      id: "business_stage",
      question: "What stage is your business in?",
      description: "This helps us understand your current needs",
      emoji: "🚀",
      options: [
        {
          id: "idea",
          label: "Just an idea",
          description: "I have a business concept but haven't started yet",
          icon: Lightbulb,
          value: "idea",
          gradient: "from-yellow-400 to-orange-500"
        },
        {
          id: "planning",
          label: "Planning stage",
          description: "I'm ready to register and start operations",
          icon: Rocket,
          value: "planning",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "operating",
          label: "Already operating",
          description: "I'm running a business but need compliance help",
          icon: Building2,
          value: "operating",
          gradient: "from-green-400 to-green-600"
        }
      ]
    },
    {
      id: "business_type",
      question: "What type of business are you starting?",
      description: "Different business types have different requirements",
      emoji: "💼",
      options: [
        {
          id: "tech",
          label: "Technology/Software",
          description: "SaaS, apps, IT services, or tech products",
          icon: Laptop,
          value: "tech",
          gradient: "from-purple-400 to-purple-600",
          popular: true
        },
        {
          id: "service",
          label: "Professional Services",
          description: "Consulting, legal, accounting, or other services",
          icon: Store,
          value: "service",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "manufacturing",
          label: "Manufacturing/Trading",
          description: "Physical products, manufacturing, or trading",
          icon: Factory,
          value: "manufacturing",
          gradient: "from-orange-400 to-red-600"
        }
      ]
    },
    {
      id: "team_size",
      question: "How many people will be involved?",
      description: "This affects the type of company structure you need",
      emoji: "👥",
      options: [
        {
          id: "solo",
          label: "Just me",
          description: "I'm starting as a solo entrepreneur",
          icon: UserCheck,
          value: "solo",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "small_team",
          label: "2-5 people",
          description: "Small team or partnership",
          icon: Users,
          value: "small_team",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "large_team",
          label: "6+ people",
          description: "Larger team with multiple stakeholders",
          icon: Building2,
          value: "large_team",
          gradient: "from-purple-400 to-purple-600"
        }
      ]
    },
    {
      id: "funding_plans",
      question: "Do you plan to raise funding?",
      description: "This determines the best structure for investors",
      emoji: "💰",
      options: [
        {
          id: "no_funding",
          label: "No external funding",
          description: "I'll bootstrap or use personal funds",
          icon: UserCheck,
          value: "no_funding",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "maybe_funding",
          label: "Maybe in the future",
          description: "I might seek funding later",
          icon: Target,
          value: "maybe_funding",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "seeking_funding",
          label: "Yes, actively seeking",
          description: "I plan to raise investment soon",
          icon: Banknote,
          value: "seeking_funding",
          gradient: "from-purple-400 to-purple-600"
        }
      ]
    },
    {
      id: "liability_preference",
      question: "How important is limited liability protection?",
      description: "This affects your personal asset protection",
      emoji: "🛡️",
      options: [
        {
          id: "not_important",
          label: "Not a priority",
          description: "I'm comfortable with personal liability",
          icon: UserCheck,
          value: "not_important",
          gradient: "from-gray-400 to-gray-600"
        },
        {
          id: "somewhat_important",
          label: "Moderately important",
          description: "Some protection would be good",
          icon: Shield,
          value: "somewhat_important",
          gradient: "from-yellow-400 to-orange-600",
          popular: true
        },
        {
          id: "very_important",
          label: "Very important",
          description: "I need maximum asset protection",
          icon: Award,
          value: "very_important",
          gradient: "from-red-400 to-red-600"
        }
      ]
    },
    {
      id: "compliance_comfort",
      question: "How comfortable are you with compliance requirements?",
      description: "Different structures have varying compliance needs",
      emoji: "📋",
      options: [
        {
          id: "minimal",
          label: "Prefer minimal compliance",
          description: "I want simple, easy-to-manage requirements",
          icon: Lightbulb,
          value: "minimal",
          gradient: "from-green-400 to-green-600",
          popular: true
        },
        {
          id: "moderate",
          label: "Can handle moderate compliance",
          description: "I'm okay with regular filings and meetings",
          icon: Building2,
          value: "moderate",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "complex",
          label: "Can manage complex compliance",
          description: "I have resources for detailed requirements",
          icon: Factory,
          value: "complex",
          gradient: "from-purple-400 to-purple-600"
        }
      ]
    },
    {
      id: "business_location",
      question: "Where will your business primarily operate?",
      description: "Location affects registration requirements and benefits",
      emoji: "🌍",
      options: [
        {
          id: "single_state",
          label: "Single state/city",
          description: "Operations limited to one location",
          icon: Store,
          value: "single_state",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "multiple_states",
          label: "Multiple states in India",
          description: "Pan-India operations planned",
          icon: Building2,
          value: "multiple_states",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "international",
          label: "International operations",
          description: "Global business or export/import",
          icon: Globe,
          value: "international",
          gradient: "from-purple-400 to-purple-600"
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
      business_stage,
      business_type,
      team_size,
      funding_plans,
      liability_preference,
      compliance_comfort,
      business_location
    } = answers

    const recommendations: CompanyRecommendation[] = []
    let confidence = 70

    // Enhanced logic for recommendations

    // One Person Company (OPC) - Best for solo entrepreneurs
    if (team_size === "solo" && funding_plans === "no_funding" && compliance_comfort === "minimal") {
      confidence = 95
      if (liability_preference === "very_important") confidence += 5
      if (business_location === "single_state") confidence += 3

      recommendations.push({
        title: "One Person Company (OPC)",
        description: "Perfect for solo entrepreneurs with limited liability protection",
        price: "₹8,000",
        originalPrice: "₹10,000",
        slug: "opc-registration",
        confidence: Math.min(confidence, 98),
        reasons: [
          "You're operating solo",
          "No external funding needed",
          "Limited liability protection",
          "Minimal compliance requirements",
          ...(business_location === "single_state" ? ["Ideal for local operations"] : [])
        ]
      })
    }

    // Private Limited Company - Best for growth and funding
    if (funding_plans === "seeking_funding" || funding_plans === "maybe_funding" ||
        business_location === "international" || team_size === "large_team") {
      confidence = 90
      if (funding_plans === "seeking_funding") confidence += 8
      if (liability_preference === "very_important") confidence += 5
      if (business_location === "international") confidence += 5
      if (team_size === "large_team") confidence += 3

      recommendations.push({
        title: "Private Limited Company",
        description: "Best for businesses seeking investment and growth",
        price: "₹12,000",
        originalPrice: "₹15,000",
        slug: "private-limited-company",
        confidence: Math.min(confidence, 98),
        reasons: [
          "Investor-friendly structure",
          "Easy to raise capital",
          "Professional credibility",
          "Separate legal entity",
          ...(business_location === "international" ? ["Perfect for global operations"] : []),
          ...(liability_preference === "very_important" ? ["Maximum liability protection"] : [])
        ]
      })
    }

    // Limited Liability Partnership (LLP) - Best for professional services
    if ((team_size === "small_team" && business_type === "service") ||
        (business_type === "service" && compliance_comfort === "moderate" && funding_plans === "no_funding")) {
      confidence = 85
      if (business_type === "service") confidence += 8
      if (liability_preference === "very_important") confidence += 5
      if (compliance_comfort === "moderate") confidence += 3

      recommendations.push({
        title: "Limited Liability Partnership (LLP)",
        description: "Ideal for professional service partnerships",
        price: "₹10,000",
        originalPrice: "₹13,000",
        slug: "llp-registration",
        confidence: Math.min(confidence, 98),
        reasons: [
          "Perfect for partnerships",
          "Professional service friendly",
          "Flexible management structure",
          "Limited liability protection",
          "Moderate compliance requirements"
        ]
      })
    }

    // Partnership Firm - For simple partnerships with minimal compliance
    if (team_size === "small_team" && compliance_comfort === "minimal" &&
        funding_plans === "no_funding" && liability_preference === "not_important") {
      confidence = 80

      recommendations.push({
        title: "Partnership Firm",
        description: "Simple structure for small partnerships",
        price: "₹6,000",
        originalPrice: "₹8,000",
        slug: "partnership-firm",
        confidence,
        reasons: [
          "Simple registration process",
          "Minimal compliance requirements",
          "Cost-effective option",
          "Suitable for small partnerships"
        ]
      })
    }

    // Sole Proprietorship - For very simple businesses
    if (team_size === "solo" && compliance_comfort === "minimal" &&
        funding_plans === "no_funding" && liability_preference === "not_important" &&
        business_location === "single_state") {
      confidence = 75

      recommendations.push({
        title: "Sole Proprietorship",
        description: "Simplest business structure for individual entrepreneurs",
        price: "₹3,000",
        originalPrice: "₹5,000",
        slug: "sole-proprietorship",
        confidence,
        reasons: [
          "Simplest registration process",
          "Lowest cost option",
          "Complete control",
          "Minimal compliance"
        ]
      })
    }

    // Sort by confidence and return top 2
    recommendations.sort((a, b) => b.confidence - a.confidence)

    // Add fallback recommendation if none match
    if (recommendations.length === 0) {
      recommendations.push({
        title: "Private Limited Company",
        description: "Most versatile business structure for growth",
        price: "₹12,000",
        originalPrice: "₹15,000",
        slug: "private-limited-company",
        confidence: 80,
        reasons: [
          "Versatile business structure",
          "Professional credibility",
          "Growth-friendly",
          "Investor ready"
        ]
      })
    }

    return recommendations.slice(0, 2)
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
      <div className="p-6 space-y-6">
        {/* Results Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Analysis Complete</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Your Perfect Company Structure
          </h3>

          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Based on your answers, here are the best company registration options for your business.
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{rec.title}</h4>
                  <p className="text-slate-600 mb-3">{rec.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-green-600">{rec.price}</span>
                    <span className="text-lg text-slate-400 line-through">{rec.originalPrice}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold mb-2">
                    {rec.confidence}% match
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
    <div className="p-6">
      {/* Progress Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Question {currentStep + 1} of {questions.length}
          </Badge>
          <div className="text-sm font-medium text-slate-600">
            {Math.round(progress)}% complete
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
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
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">{currentQuestion.emoji}</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {currentQuestion.question}
            </h3>
            {currentQuestion.description && (
              <p className="text-slate-600 max-w-xl mx-auto">
                {currentQuestion.description}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="grid gap-4 mb-6">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value
              const isCurrentSelection = selectedOption === option.value

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  disabled={isAnimating}
                  className={cn(
                    "group relative p-4 text-left border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    isSelected || isCurrentSelection
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg scale-105"
                      : "border-slate-200 bg-white hover:border-slate-300",
                    option.popular && "ring-2 ring-yellow-400 ring-offset-2",
                    isAnimating && "pointer-events-none"
                  )}
                >
                  {/* Popular Badge */}
                  {option.popular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 inline mr-1" />
                      Popular
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                      isSelected || isCurrentSelection
                        ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    )}>
                      <option.icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className={cn(
                        "font-semibold text-lg transition-colors duration-300",
                        isSelected || isCurrentSelection ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                      )}>
                        {option.label}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {option.description}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {(isSelected || isCurrentSelection) && (
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isAnimating}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>{questions.length - currentStep - 1} questions left</span>
            </div>

            {!selectedOption && (
              <Button
                onClick={nextStep}
                disabled={!answers[currentQuestion.id] || isAnimating}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {currentStep === questions.length - 1 ? "Get Recommendations" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

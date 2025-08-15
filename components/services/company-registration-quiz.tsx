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
  Globe,
  TrendingUp,
  FileText
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
      id: "business_type",
      question: "What type of business are you planning to start?",
      description: "Different business types have different structural requirements",
      emoji: "💼",
      options: [
        {
          id: "service_business",
          label: "Service-based business",
          description: "Consulting, freelancing, professional services",
          icon: Laptop,
          value: "service_business",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "product_business",
          label: "Product-based business",
          description: "Manufacturing, retail, e-commerce",
          icon: Store,
          value: "product_business",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "tech_startup",
          label: "Technology startup",
          description: "Software, app development, SaaS",
          icon: Rocket,
          value: "tech_startup",
          gradient: "from-purple-400 to-purple-600"
        },
        {
          id: "manufacturing",
          label: "Manufacturing business",
          description: "Production, heavy machinery, industrial",
          icon: Factory,
          value: "manufacturing",
          gradient: "from-orange-400 to-orange-600"
        }
      ]
    },
    {
      id: "team_structure",
      question: "How many people will be involved in the business?",
      description: "This helps determine the ownership structure",
      emoji: "👥",
      options: [
        {
          id: "solo",
          label: "Just me (Solo entrepreneur)",
          description: "I'm starting and running the business alone",
          icon: UserCheck,
          value: "solo",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "two_to_five",
          label: "2-5 partners/co-founders",
          description: "Small team of partners or co-founders",
          icon: Users,
          value: "two_to_five",
          gradient: "from-purple-400 to-purple-600"
        },
        {
          id: "more_than_five",
          label: "More than 5 people",
          description: "Large team or multiple investors",
          icon: Building2,
          value: "more_than_five",
          gradient: "from-orange-400 to-orange-600"
        }
      ]
    },
    {
      id: "initial_investment",
      question: "What's your initial investment range?",
      description: "Investment amount affects the suitable business structure",
      emoji: "💰",
      options: [
        {
          id: "under_1_lakh",
          label: "Under ₹1 Lakh",
          description: "Small investment, testing the waters",
          icon: Banknote,
          value: "under_1_lakh",
          gradient: "from-green-400 to-green-600",
          popular: true
        },
        {
          id: "1_to_10_lakh",
          label: "₹1 Lakh - ₹10 Lakh",
          description: "Moderate investment for established business",
          icon: Target,
          value: "1_to_10_lakh",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "10_to_50_lakh",
          label: "₹10 Lakh - ₹50 Lakh",
          description: "Significant investment for growth-oriented business",
          icon: TrendingUp,
          value: "10_to_50_lakh",
          gradient: "from-purple-400 to-purple-600"
        },
        {
          id: "above_50_lakh",
          label: "Above ₹50 Lakh",
          description: "Large investment for scalable business",
          icon: Award,
          value: "above_50_lakh",
          gradient: "from-orange-400 to-red-600"
        }
      ]
    },
    {
      id: "growth_plans",
      question: "What are your growth and expansion plans?",
      description: "Future plans help determine the most suitable structure",
      emoji: "📈",
      options: [
        {
          id: "local_small",
          label: "Local/Small scale operation",
          description: "Planning to stay small and local",
          icon: Store,
          value: "local_small",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "moderate_growth",
          label: "Moderate growth within state/region",
          description: "Planning to expand regionally over time",
          icon: TrendingUp,
          value: "moderate_growth",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "rapid_scaling",
          label: "Rapid scaling across India",
          description: "Planning aggressive expansion and scaling",
          icon: Rocket,
          value: "rapid_scaling",
          gradient: "from-purple-400 to-purple-600"
        },
        {
          id: "global_expansion",
          label: "International expansion",
          description: "Planning to expand globally in future",
          icon: Globe,
          value: "global_expansion",
          gradient: "from-orange-400 to-red-600"
        }
      ]
    },
    {
      id: "funding_needs",
      question: "Do you plan to raise external funding?",
      description: "Funding requirements affect the choice of business structure",
      emoji: "💸",
      options: [
        {
          id: "no_funding",
          label: "No external funding needed",
          description: "Self-funded or bootstrapped business",
          icon: Shield,
          value: "no_funding",
          gradient: "from-green-400 to-green-600",
          popular: true
        },
        {
          id: "bank_loans",
          label: "Bank loans and traditional funding",
          description: "Planning to get bank loans or traditional financing",
          icon: Building2,
          value: "bank_loans",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "investor_funding",
          label: "Angel investors or VCs",
          description: "Planning to raise from investors or venture capital",
          icon: Rocket,
          value: "investor_funding",
          gradient: "from-purple-400 to-purple-600"
        }
      ]
    },
    {
      id: "compliance_comfort",
      question: "How comfortable are you with regulatory compliance?",
      description: "Different structures have varying compliance requirements",
      emoji: "📋",
      options: [
        {
          id: "minimal_compliance",
          label: "Prefer minimal compliance",
          description: "I want the simplest possible requirements",
          icon: Lightbulb,
          value: "minimal_compliance",
          gradient: "from-green-400 to-green-600",
          popular: true
        },
        {
          id: "moderate_compliance",
          label: "Can handle moderate compliance",
          description: "I'm okay with regular filings and documentation",
          icon: FileText,
          value: "moderate_compliance",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "complex_compliance",
          label: "Can manage complex compliance",
          description: "I have resources to handle detailed compliance",
          icon: Award,
          value: "complex_compliance",
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
      business_type,
      team_structure,
      initial_investment,
      growth_plans,
      funding_needs,
      compliance_comfort
    } = answers

    const recommendations: CompanyRecommendation[] = []
    
    // Scoring system for each business structure
    const scores = {
      sole_proprietorship: 0,
      opc: 0,
      partnership: 0,
      llp: 0,
      private_limited: 0
    }

    // Business type scoring
    if (business_type === "service_business") {
      scores.sole_proprietorship += 25
      scores.opc += 20
      scores.llp += 15
    } else if (business_type === "product_business") {
      scores.opc += 20
      scores.private_limited += 25
      scores.llp += 15
    } else if (business_type === "tech_startup") {
      scores.opc += 15
      scores.private_limited += 30
      scores.llp += 10
    } else if (business_type === "manufacturing") {
      scores.private_limited += 30
      scores.llp += 20
    }

    // Team structure scoring
    if (team_structure === "solo") {
      scores.sole_proprietorship += 30
      scores.opc += 25
    } else if (team_structure === "two_to_five") {
      scores.partnership += 20
      scores.llp += 25
      scores.private_limited += 20
    } else if (team_structure === "more_than_five") {
      scores.private_limited += 30
      scores.llp += 15
    }

    // Investment amount scoring
    if (initial_investment === "under_1_lakh") {
      scores.sole_proprietorship += 25
      scores.opc += 15
    } else if (initial_investment === "1_to_10_lakh") {
      scores.opc += 20
      scores.partnership += 15
      scores.llp += 20
    } else if (initial_investment === "10_to_50_lakh") {
      scores.llp += 20
      scores.private_limited += 25
    } else if (initial_investment === "above_50_lakh") {
      scores.private_limited += 30
    }

    // Growth plans scoring
    if (growth_plans === "local_small") {
      scores.sole_proprietorship += 20
      scores.partnership += 15
    } else if (growth_plans === "moderate_growth") {
      scores.opc += 20
      scores.llp += 20
      scores.private_limited += 15
    } else if (growth_plans === "rapid_scaling") {
      scores.private_limited += 30
      scores.llp += 10
    } else if (growth_plans === "global_expansion") {
      scores.private_limited += 35
    }

    // Funding needs scoring
    if (funding_needs === "no_funding") {
      scores.sole_proprietorship += 20
      scores.opc += 15
      scores.partnership += 15
    } else if (funding_needs === "bank_loans") {
      scores.opc += 15
      scores.llp += 20
      scores.private_limited += 20
    } else if (funding_needs === "investor_funding") {
      scores.private_limited += 35
    }

    // Compliance comfort scoring
    if (compliance_comfort === "minimal_compliance") {
      scores.sole_proprietorship += 25
      scores.partnership += 20
    } else if (compliance_comfort === "moderate_compliance") {
      scores.opc += 20
      scores.llp += 25
    } else if (compliance_comfort === "complex_compliance") {
      scores.private_limited += 25
      scores.llp += 15
    }

    // Generate recommendations based on scores
    const sortedStructures = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)

    sortedStructures.forEach(([structure, score]) => {
      const confidence = Math.min(Math.round((score / 150) * 100), 98)
      
      if (structure === "sole_proprietorship" && confidence > 40) {
        recommendations.push({
          title: "Sole Proprietorship",
          description: "Simplest business structure with minimal compliance and quick setup",
          price: "₹3,000",
          originalPrice: "₹5,000",
          slug: "sole-proprietorship",
          confidence,
          reasons: [
            "Lowest cost and fastest setup",
            "Minimal compliance requirements",
            "Complete control over business",
            "Direct tax benefits",
            "Easy to close if needed",
            "Perfect for small service businesses"
          ]
        })
      } else if (structure === "opc" && confidence > 40) {
        recommendations.push({
          title: "One Person Company (OPC)",
          description: "Perfect balance of simplicity and professional credibility for solo entrepreneurs",
          price: "₹8,000",
          originalPrice: "₹10,000",
          slug: "opc-registration",
          confidence,
          reasons: [
            "Limited liability protection",
            "Professional business credibility",
            "Can convert to Pvt Ltd later",
            "Separate legal entity status",
            "Better for client trust",
            "Suitable for moderate growth plans"
          ]
        })
      } else if (structure === "partnership" && confidence > 40) {
        recommendations.push({
          title: "Partnership Firm",
          description: "Simple and cost-effective structure for multiple partners",
          price: "₹5,000",
          originalPrice: "₹7,000",
          slug: "partnership-firm",
          confidence,
          reasons: [
            "Easy to establish and manage",
            "Flexible profit sharing",
            "Minimal compliance burden",
            "Cost-effective for partners",
            "Quick decision making",
            "Suitable for professional services"
          ]
        })
      } else if (structure === "llp" && confidence > 40) {
        recommendations.push({
          title: "Limited Liability Partnership (LLP)",
          description: "Best of both worlds - partnership flexibility with liability protection",
          price: "₹10,000",
          originalPrice: "₹13,000",
          slug: "llp-registration",
          confidence,
          reasons: [
            "Limited liability for all partners",
            "Flexible management structure",
            "Professional credibility",
            "Perpetual succession",
            "Better for scaling businesses",
            "Suitable for professional firms"
          ]
        })
      } else if (structure === "private_limited" && confidence > 40) {
        recommendations.push({
          title: "Private Limited Company",
          description: "Most professional structure with maximum benefits and growth potential",
          price: "₹12,000",
          originalPrice: "₹15,000",
          slug: "private-limited-company",
          confidence,
          reasons: [
            "Maximum liability protection",
            "Easy to raise capital and funding",
            "Highest professional credibility",
            "Separate legal entity",
            "Perpetual succession",
            "Best for scaling and expansion",
            "Investor and bank friendly"
          ]
        })
      }
    })

    return recommendations.filter(rec => rec.confidence > 40)
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
        <div className="space-y-4 sm:space-y-6">
          {recommendations.map((rec, index) => (
            <div key={index} className={cn(
              "bg-gradient-to-br from-white to-slate-50 rounded-xl border-2 p-6 hover:shadow-xl transition-all duration-300",
              index === 0 ? "border-blue-300 bg-gradient-to-br from-blue-50 to-white" : "border-slate-200"
            )}>
              {/* Header with Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900">{rec.title}</h4>
                    {index === 0 && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Best Match
                      </Badge>
                    )}
                  </div>
                  <p className="text-base text-slate-600 mb-3">{rec.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className={cn(
                    "px-3 py-2 rounded-full text-sm font-bold mb-2",
                    rec.confidence >= 80 ? "bg-green-100 text-green-700" :
                    rec.confidence >= 60 ? "bg-yellow-100 text-yellow-700" :
                    "bg-orange-100 text-orange-700"
                  )}>
                    {rec.confidence}% match
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">{rec.price}</span>
                  <span className="text-lg text-slate-400 line-through">{rec.originalPrice}</span>
                </div>
                <div className="text-sm text-green-700 font-medium">
                  Save {parseInt(rec.originalPrice.replace('₹', '').replace(',', '')) - parseInt(rec.price.replace('₹', '').replace(',', ''))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-6">
                <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Why this structure is perfect for you:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rec.reasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600 p-2 bg-slate-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/services/${rec.slug}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3">
                    Get Started - {rec.price}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" className="sm:w-auto px-6">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 mt-6">
          <div className="text-center">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Need Help Deciding?
            </h4>
            <p className="text-sm text-slate-600 mb-4 max-w-2xl mx-auto">
              Our business experts can help you understand the nuances of each structure and guide you through the registration process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Users className="w-4 h-4 mr-2" />
                Talk to Expert
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                <FileText className="w-4 h-4 mr-2" />
                Download Comparison
              </Button>
            </div>
          </div>
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

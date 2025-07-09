"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Store,
  TrendingUp,
  Globe,
  Shield,
  Target,
  Award,
  Sparkles,
  Clock,
  Star,
  RotateCcw,
  FileText,
  AlertCircle,
  Info,
  Building,
  Home,
  Coins
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
    description?: string
    icon: React.ElementType
    value: string
    gradient: string
    popular?: boolean
  }[]
}

interface ITRResult {
  eligible: boolean
  itrForm: string
  title: string
  description: string
  requirements: string[]
  nextSteps: string[]
  confidence: number
}

export default function ITREligibilityQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const questions: QuizQuestion[] = [
    {
      id: "total_income",
      question: "What is your total income for FY 2024-25?",
      description: "Enter your total annual income from all sources",
      emoji: "💰",
      options: [
        {
          id: "below_250000",
          label: "Below ₹2.5 Lakh",
          description: "No tax liability for most individuals",
          icon: Shield,
          value: "below_250000",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "250000_500000",
          label: "₹2.5L - ₹5L",
          description: "5% tax rate applicable",
          icon: Target,
          value: "250000_500000",
          gradient: "from-yellow-400 to-yellow-600"
        },
        {
          id: "500000_1000000",
          label: "₹5L - ₹10L",
          description: "20% tax rate applicable",
          icon: TrendingUp,
          value: "500000_1000000",
          gradient: "from-orange-400 to-orange-600",
          popular: true
        },
        {
          id: "1000000_5000000",
          label: "₹10L - ₹50L",
          description: "30% tax rate applicable",
          icon: Award,
          value: "1000000_5000000",
          gradient: "from-red-400 to-red-600"
        },
        {
          id: "above_5000000",
          label: "Above ₹50L",
          description: "Higher tax rates and compliance",
          icon: Star,
          value: "above_5000000",
          gradient: "from-purple-400 to-purple-600"
        }
      ]
    },
    {
      id: "business_income",
      question: "Do you have income from business or profession?",
      description: "This includes freelancing, consultancy, trading, etc.",
      emoji: "💼",
      options: [
        {
          id: "yes_business",
          label: "Yes, I have business/professional income",
          description: "Income from business, profession, or freelancing",
          icon: Store,
          value: "yes_business",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "no_business",
          label: "No, I don't have business income",
          description: "Only salary, pension, or other sources",
          icon: Shield,
          value: "no_business",
          gradient: "from-green-400 to-green-600",
          popular: true
        }
      ]
    },
    {
      id: "director_status",
      question: "Are you a director of any company?",
      description: "Director status affects ITR filing requirements",
      emoji: "👔",
      options: [
        {
          id: "yes_director",
          label: "Yes, I am a director",
          description: "Director of private/public company",
          icon: Building,
          value: "yes_director",
          gradient: "from-purple-400 to-purple-600"
        },
        {
          id: "no_director",
          label: "No, I am not a director",
          description: "Not a company director",
          icon: Shield,
          value: "no_director",
          gradient: "from-green-400 to-green-600",
          popular: true
        }
      ]
    },
    {
      id: "capital_gains",
      question: "Do you have capital gains?",
      description: "From sale of shares, property, or other assets",
      emoji: "📈",
      options: [
        {
          id: "yes_capital_gains",
          label: "Yes, I have capital gains",
          description: "From sale of shares, property, or investments",
          icon: TrendingUp,
          value: "yes_capital_gains",
          gradient: "from-orange-400 to-orange-600"
        },
        {
          id: "no_capital_gains",
          label: "No capital gains",
          description: "No asset sales or capital gains",
          icon: Shield,
          value: "no_capital_gains",
          gradient: "from-green-400 to-green-600",
          popular: true
        }
      ]
    },
    {
      id: "foreign_assets",
      question: "Do you have foreign assets or income?",
      description: "Foreign assets require mandatory ITR filing",
      emoji: "🌍",
      options: [
        {
          id: "yes_foreign",
          label: "Yes, I have foreign assets/income",
          description: "Foreign bank accounts, property, or income",
          icon: Globe,
          value: "yes_foreign",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "no_foreign",
          label: "No foreign assets/income",
          description: "All assets and income are in India",
          icon: Shield,
          value: "no_foreign",
          gradient: "from-green-400 to-green-600",
          popular: true
        }
      ]
    },
    {
      id: "crypto_esop",
      question: "Do you have income from cryptocurrency or ESOPs?",
      description: "Digital assets and employee stock options",
      emoji: "₿",
      options: [
        {
          id: "yes_crypto_esop",
          label: "Yes, I have crypto/ESOP income",
          description: "Income from cryptocurrency or employee stock options",
          icon: Coins,
          value: "yes_crypto_esop",
          gradient: "from-yellow-400 to-orange-600"
        },
        {
          id: "no_crypto_esop",
          label: "No crypto/ESOP income",
          description: "No digital assets or stock options",
          icon: Shield,
          value: "no_crypto_esop",
          gradient: "from-green-400 to-green-600",
          popular: true
        }
      ]
    },
    {
      id: "unlisted_shares",
      question: "Do you hold unlisted equity shares?",
      description: "Shares of private companies not listed on stock exchange",
      emoji: "📊",
      options: [
        {
          id: "yes_unlisted",
          label: "Yes, I hold unlisted shares",
          description: "Shares in private companies",
          icon: TrendingUp,
          value: "yes_unlisted",
          gradient: "from-purple-400 to-purple-600"
        },
        {
          id: "no_unlisted",
          label: "No unlisted shares",
          description: "Only listed shares or no shares",
          icon: Shield,
          value: "no_unlisted",
          gradient: "from-green-400 to-green-600",
          popular: true
        }
      ]
    },
    {
      id: "house_properties",
      question: "How many house properties do you own?",
      description: "Property ownership affects tax calculations",
      emoji: "🏠",
      options: [
        {
          id: "no_property",
          label: "None",
          description: "No house property owned",
          icon: Shield,
          value: "no_property",
          gradient: "from-gray-400 to-gray-600"
        },
        {
          id: "one_property",
          label: "One property",
          description: "Single house property (self-occupied or rented)",
          icon: Home,
          value: "one_property",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "multiple_properties",
          label: "Multiple properties",
          description: "More than one house property",
          icon: Building,
          value: "multiple_properties",
          gradient: "from-orange-400 to-orange-600"
        }
      ]
    }
  ]

  // Auto-advance after selection (disabled to allow manual navigation)
  // useEffect(() => {
  //   if (selectedOption && !isAnimating) {
  //     const timer = setTimeout(() => {
  //       if (currentStep < questions.length - 1) {
  //         setCurrentStep(prev => prev + 1)
  //         setSelectedOption(null)
  //         setIsAnimating(false)
  //       } else {
  //         setShowResults(true)
  //       }
  //     }, 800)
  //     return () => clearTimeout(timer)
  //   }
  // }, [selectedOption, currentStep, isAnimating, questions.length])

  // Sync selectedOption with current answer when step changes
  useEffect(() => {
    const currentQuestionId = questions[currentStep]?.id
    if (currentQuestionId) {
      setSelectedOption(answers[currentQuestionId] || null)
    }
  }, [currentStep, answers, questions])

  const getITRResult = (): ITRResult => {
    const {
      total_income,
      business_income,
      director_status,
      capital_gains,
      foreign_assets,
      crypto_esop,
      unlisted_shares,
      house_properties
    } = answers

    // Determine if filing is required based on income
    const incomeValue = {
      "below_250000": 200000,
      "250000_500000": 375000,
      "500000_1000000": 750000,
      "1000000_5000000": 2500000,
      "above_5000000": 7500000
    }[total_income] || 200000

    let isEligible = false
    let confidence = 70
    let mandatoryReasons: string[] = []
    let itrForm = "ITR-1"
    let title = ""
    let description = ""

    // Check mandatory filing conditions
    if (incomeValue > 250000) {
      isEligible = true
      mandatoryReasons.push("Your income is ≤ ₹50 lakhs")
      confidence += 25
    }

    if (business_income === "yes_business") {
      isEligible = true
      itrForm = "ITR-3"
      mandatoryReasons.push("You are not a director")
      mandatoryReasons.push("No business income")
      confidence += 20
    }

    if (director_status === "yes_director") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Director status requires ITR filing")
      confidence += 20
    }

    if (capital_gains === "yes_capital_gains") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("No capital gains")
      confidence += 15
    }

    if (foreign_assets === "yes_foreign") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("No foreign assets")
      confidence += 25
    }

    if (crypto_esop === "yes_crypto_esop") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("No complex investments")
      confidence += 15
    }

    if (unlisted_shares === "yes_unlisted") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Unlisted shares require ITR-2")
      confidence += 10
    }

    // Determine the appropriate ITR form and result
    if (!isEligible || (incomeValue <= 250000 && business_income === "no_business" && director_status === "no_director" && capital_gains === "no_capital_gains" && foreign_assets === "no_foreign" && crypto_esop === "no_crypto_esop" && unlisted_shares === "no_unlisted")) {
      title = "ITR-1 (Sahaj)"
      description = "Simplest form for resident individuals with total income ≤ ₹50 lakh"
      itrForm = "ITR-1"
    } else if (business_income === "yes_business") {
      title = "ITR-3"
      description = "Comprehensive form for business owners"
      itrForm = "ITR-3"
    } else {
      title = "ITR-2"
      description = "For individuals without business income but with capital gains, etc."
      itrForm = "ITR-2"
    }

    const requirements = [
      "ITR-1: Only for salary, pension, and house property income",
      "ITR-2: For individuals without business income but with capital gains, etc.",
      "ITR-3: Comprehensive form for business owners",
      "ITR-4: For presumptive taxation scheme (44AD/44ADA/44AE)"
    ]

    const nextSteps = [
      "Gather all required documents",
      "Choose the appropriate ITR form",
      "File your return before the due date",
      "Keep records for future reference"
    ]

    return {
      eligible: true,
      itrForm,
      title,
      description,
      requirements: mandatoryReasons.length > 0 ? mandatoryReasons : requirements,
      nextSteps,
      confidence: Math.min(confidence, 95)
    }
  }

  const handleOptionSelect = (optionValue: string) => {
    if (isAnimating) return

    setIsAnimating(true)
    setSelectedOption(optionValue)
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: optionValue
    }))
    
    // Reset animation state after a short delay to allow visual feedback
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  const goToPrevious = () => {
    if (currentStep > 0 && !isAnimating) {
      setCurrentStep(prev => prev - 1)
      // Set selected option to the answer for the previous question
      const previousQuestionId = questions[currentStep - 1].id
      setSelectedOption(answers[previousQuestionId] || null)
    }
  }

  const goToNext = () => {
    if (currentStep < questions.length - 1 && !isAnimating) {
      setCurrentStep(prev => prev + 1)
      // Set selected option to the answer for the next question
      const nextQuestionId = questions[currentStep + 1].id
      setSelectedOption(answers[nextQuestionId] || null)
    } else if (currentStep === questions.length - 1) {
      setShowResults(true)
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
    const result = getITRResult()

    return (
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Results Header */}
        <div className="text-center">
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4",
            "bg-gradient-to-r from-green-100 to-blue-100"
          )}>
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="text-xs sm:text-sm font-semibold text-green-700">
              Analysis Complete
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 px-2">
            {result.title}
          </h3>

          <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2">
            {result.description}
          </p>
        </div>

        {/* Result Details */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Requirements */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 sm:mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="text-sm sm:text-base">Why this form is recommended</span>
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {result.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Points */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 sm:mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span className="text-sm sm:text-base">Key Points</span>
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">ITR-1: Only for salary, pension, and house property income</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">ITR-2: For individuals without business income but with capital gains, etc.</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">ITR-3: Comprehensive form for business owners</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">ITR-4: For presumptive taxation scheme (44AD/44ADA/44AE)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center pt-2">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="h-10 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-medium border-slate-300 hover:bg-slate-50"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Take Quiz Again
          </Button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Progress Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-medium text-slate-600">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="font-medium text-blue-600">
            {Math.round(progress)}% Complete
          </span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center space-y-2 sm:space-y-3">
        {currentQuestion.emoji && (
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
            {currentQuestion.emoji}
          </div>
        )}

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 px-2">
          {currentQuestion.question}
        </h2>

        {currentQuestion.description && (
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto px-2">
            {currentQuestion.description}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2 sm:space-y-3">
        {currentQuestion.options.map((option) => {
          const Icon = option.icon
          const isSelected = answers[currentQuestion.id] === option.value
          const isCurrentlySelected = selectedOption === option.value

          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.value)}
              disabled={isAnimating}
              className={cn(
                "w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 text-left transition-all duration-300 group relative overflow-hidden",
                isSelected || isCurrentlySelected
                  ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md",
                isAnimating && isCurrentlySelected && "animate-pulse",
                option.popular && !isSelected && "ring-2 ring-orange-200 ring-opacity-50"
              )}
            >
              {option.popular && !isSelected && (
                <Badge className="absolute top-2 right-2 bg-orange-100 text-orange-600 border-orange-200 text-xs px-2 py-0.5">
                  <Star className="w-2.5 h-2.5 mr-1" />
                  Popular
                </Badge>
              )}

              <div className="flex items-start gap-3 sm:gap-4">
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                  `bg-gradient-to-br ${option.gradient}`,
                  isSelected || isCurrentlySelected ? "shadow-lg" : "shadow-md"
                )}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1">
                    {option.label}
                  </h3>
                  {option.description && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {option.description}
                    </p>
                  )}
                </div>

                {(isSelected || isCurrentlySelected) && (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 sm:pt-6">
        <Button
          onClick={goToPrevious}
          disabled={currentStep === 0 || isAnimating}
          variant="outline"
          className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Previous
        </Button>

        <Button
          onClick={goToNext}
          disabled={!answers[currentQuestion.id] || isAnimating}
          className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {currentStep === questions.length - 1 ? "Get Results" : "Next"}
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
        </Button>
      </div>
    </div>
  )
}

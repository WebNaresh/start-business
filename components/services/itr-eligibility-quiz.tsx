"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Briefcase,
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
  Info
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
      id: "income_sources",
      question: "What are your primary income sources?",
      description: "This helps determine your ITR filing requirements",
      emoji: "💰",
      options: [
        {
          id: "salary",
          label: "Salary Income",
          description: "Income from employment or pension",
          icon: Briefcase,
          value: "salary",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "business",
          label: "Business Income",
          description: "Income from business or profession",
          icon: Store,
          value: "business",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "capital_gains",
          label: "Capital Gains",
          description: "Income from sale of assets or investments",
          icon: TrendingUp,
          value: "capital_gains",
          gradient: "from-purple-400 to-purple-600"
        },
        {
          id: "multiple",
          label: "Multiple Sources",
          description: "Income from various sources",
          icon: Globe,
          value: "multiple",
          gradient: "from-orange-400 to-orange-600"
        }
      ]
    },
    {
      id: "annual_income",
      question: "What's your annual income range?",
      description: "This determines your tax obligations",
      emoji: "📊",
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
          id: "above_1000000",
          label: "Above ₹10L",
          description: "30% tax rate applicable",
          icon: Award,
          value: "above_1000000",
          gradient: "from-red-400 to-red-600"
        }
      ]
    },
    {
      id: "age_category",
      question: "What's your age category?",
      description: "Age affects tax exemption limits",
      emoji: "👤",
      options: [
        {
          id: "below_60",
          label: "Below 60 years",
          description: "Standard tax exemption limit",
          icon: Target,
          value: "below_60",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "60_to_80",
          label: "60-80 years",
          description: "Senior citizen benefits",
          icon: Shield,
          value: "60_to_80",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "above_80",
          label: "Above 80 years",
          description: "Super senior citizen benefits",
          icon: Award,
          value: "above_80",
          gradient: "from-purple-400 to-purple-600"
        }
      ]
    },
    {
      id: "tax_deductions",
      question: "Do you have significant tax deductions?",
      description: "Deductions can affect your filing requirements",
      emoji: "💸",
      options: [
        {
          id: "no_deductions",
          label: "No major deductions",
          description: "Standard deductions only",
          icon: Shield,
          value: "no_deductions",
          gradient: "from-gray-400 to-gray-600"
        },
        {
          id: "some_deductions",
          label: "Some deductions",
          description: "80C, HRA, or medical insurance",
          icon: Target,
          value: "some_deductions",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "many_deductions",
          label: "Multiple deductions",
          description: "Home loan, investments, donations, etc.",
          icon: TrendingUp,
          value: "many_deductions",
          gradient: "from-green-400 to-green-600"
        }
      ]
    },
    {
      id: "previous_filing",
      question: "Have you filed ITR before?",
      description: "Previous filing history affects requirements",
      emoji: "📄",
      options: [
        {
          id: "never_filed",
          label: "Never filed",
          description: "This would be my first time",
          icon: FileText,
          value: "never_filed",
          gradient: "from-orange-400 to-red-600"
        },
        {
          id: "filed_before",
          label: "Filed in previous years",
          description: "I have filing experience",
          icon: CheckCircle,
          value: "filed_before",
          gradient: "from-green-400 to-green-600",
          popular: true
        },
        {
          id: "irregular_filing",
          label: "Filed irregularly",
          description: "Sometimes filed, sometimes not",
          icon: AlertCircle,
          value: "irregular_filing",
          gradient: "from-yellow-400 to-orange-600"
        }
      ]
    },
    {
      id: "financial_transactions",
      question: "Do you have high-value financial transactions?",
      description: "Large transactions may require mandatory filing",
      emoji: "💳",
      options: [
        {
          id: "no_high_value",
          label: "No high-value transactions",
          description: "Regular day-to-day transactions only",
          icon: Shield,
          value: "no_high_value",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "some_high_value",
          label: "Some high-value transactions",
          description: "Property purchase, large investments",
          icon: TrendingUp,
          value: "some_high_value",
          gradient: "from-yellow-400 to-orange-600",
          popular: true
        },
        {
          id: "frequent_high_value",
          label: "Frequent high-value transactions",
          description: "Regular large transactions or investments",
          icon: Award,
          value: "frequent_high_value",
          gradient: "from-red-400 to-red-600"
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
          id: "no_foreign",
          label: "No foreign assets",
          description: "All assets and income are in India",
          icon: Shield,
          value: "no_foreign",
          gradient: "from-green-400 to-green-600",
          popular: true
        },
        {
          id: "foreign_income",
          label: "Foreign income",
          description: "Income from foreign sources",
          icon: Globe,
          value: "foreign_income",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "foreign_assets",
          label: "Foreign assets",
          description: "Bank accounts, property, or investments abroad",
          icon: TrendingUp,
          value: "foreign_assets",
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

  const getITRResult = (): ITRResult => {
    const {
      income_sources,
      annual_income,
      age_category,
      tax_deductions,
      previous_filing,
      financial_transactions,
      foreign_assets
    } = answers

    // Determine exemption limit based on age
    let exemptionLimit = 250000
    if (age_category === "60_to_80") exemptionLimit = 300000
    if (age_category === "above_80") exemptionLimit = 500000

    // Check if filing is required
    const incomeValue = {
      "below_250000": 200000,
      "250000_500000": 375000,
      "500000_1000000": 750000,
      "above_1000000": 1500000
    }[annual_income] || 200000

    // Enhanced eligibility logic
    let isEligible = false
    let confidence = 70
    let mandatoryReasons: string[] = []
    let itrForm = "ITR-1"

    // Mandatory filing conditions
    if (incomeValue > exemptionLimit) {
      isEligible = true
      mandatoryReasons.push("Annual income exceeds exemption limit")
      confidence += 25
    }

    if (income_sources === "business") {
      isEligible = true
      itrForm = "ITR-3"
      mandatoryReasons.push("Business income requires ITR filing")
      confidence += 20
    }

    if (income_sources === "capital_gains" || income_sources === "multiple") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Multiple income sources require ITR filing")
      confidence += 15
    }

    if (foreign_assets === "foreign_income" || foreign_assets === "foreign_assets") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Foreign assets/income mandate ITR filing")
      confidence += 30
    }

    if (financial_transactions === "frequent_high_value") {
      isEligible = true
      mandatoryReasons.push("High-value transactions require ITR filing")
      confidence += 15
    } else if (financial_transactions === "some_high_value") {
      confidence += 10
    }

    // Additional factors affecting confidence
    if (previous_filing === "filed_before") {
      confidence += 5
    } else if (previous_filing === "irregular_filing") {
      mandatoryReasons.push("Previous irregular filing history")
      confidence += 10
    }

    if (tax_deductions === "many_deductions") {
      mandatoryReasons.push("Multiple deductions benefit from ITR filing")
      confidence += 8
    } else if (tax_deductions === "some_deductions") {
      confidence += 5
    }

    // Determine final ITR form based on complexity
    if (foreign_assets !== "no_foreign" || income_sources === "multiple" || income_sources === "capital_gains") {
      itrForm = "ITR-2"
    } else if (income_sources === "business") {
      itrForm = "ITR-3"
    } else if (income_sources === "salary" && tax_deductions !== "many_deductions") {
      itrForm = "ITR-1"
    } else {
      itrForm = "ITR-2"
    }

    confidence = Math.min(confidence, 98)

    if (isEligible) {
      return {
        eligible: true,
        itrForm,
        title: "Yes, you need to file ITR",
        description: `Based on your profile, you are required to file ${itrForm} form.`,
        requirements: [
          ...mandatoryReasons,
          "Compliance with Income Tax Act",
          "Avoid penalties and legal issues"
        ],
        nextSteps: [
          "Gather all income documents",
          "Collect investment and deduction proofs",
          "Calculate total taxable income",
          "File ITR before due date (July 31st)",
          ...(tax_deductions === "many_deductions" ? ["Organize all deduction certificates"] : []),
          ...(foreign_assets !== "no_foreign" ? ["Prepare foreign asset details"] : []),
          "Pay any tax liability"
        ],
        confidence
      }
    } else {
      // Even if not mandatory, check if beneficial
      let beneficialReasons: string[] = [
        "Income below exemption limit",
        "No mandatory filing requirement"
      ]

      if (tax_deductions === "some_deductions" || tax_deductions === "many_deductions") {
        beneficialReasons.push("Filing can help claim tax refunds")
        confidence += 15
      }

      if (previous_filing === "filed_before") {
        beneficialReasons.push("Maintains filing continuity")
        confidence += 10
      }

      if (financial_transactions === "some_high_value") {
        beneficialReasons.push("Documents high-value transactions")
        confidence += 10
      }

      return {
        eligible: false,
        itrForm: incomeValue > 0 ? "ITR-1 (Optional)" : "Not Required",
        title: confidence > 85 ? "ITR filing recommended" : "ITR filing not mandatory",
        description: confidence > 85 ?
          "While not mandatory, filing ITR would be beneficial for you." :
          "Based on your profile, ITR filing is not mandatory, but could be beneficial.",
        requirements: beneficialReasons,
        nextSteps: [
          confidence > 85 ? "Consider voluntary filing for benefits" : "Consider voluntary filing",
          "Maintain income and investment records",
          "Plan for future tax obligations",
          ...(tax_deductions !== "no_deductions" ? ["File to claim tax refunds"] : []),
          "Consult for tax optimization strategies"
        ],
        confidence
      }
    }
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
    const result = getITRResult()

    return (
      <div className="p-6 space-y-6">
        {/* Results Header */}
        <div className="text-center">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4",
            result.eligible 
              ? "bg-gradient-to-r from-orange-100 to-red-100" 
              : "bg-gradient-to-r from-green-100 to-blue-100"
          )}>
            {result.eligible ? (
              <AlertCircle className="w-5 h-5 text-orange-600" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            <span className={cn(
              "text-sm font-semibold",
              result.eligible ? "text-orange-700" : "text-green-700"
            )}>
              Analysis Complete
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {result.title}
          </h3>

          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            {result.description}
          </p>
        </div>

        {/* Result Details */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                Key Points
              </h4>
              <ul className="space-y-2">
                {result.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Next Steps
              </h4>
              <ul className="space-y-2">
                {result.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ITR Form Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h5 className="font-semibold text-blue-900">Recommended ITR Form</h5>
                <p className="text-blue-700 text-sm">{result.itrForm}</p>
              </div>
              <div className="ml-auto">
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                  {result.confidence}% confidence
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/services/income-tax-filing" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <FileText className="w-4 h-4 mr-2" />
              Get ITR Filing Help
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <Button
            variant="outline"
            onClick={resetQuiz}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Take Quiz Again
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs text-slate-500">
            This is a general assessment. For specific tax advice, please consult a qualified tax professional.
          </p>
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
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
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
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-700"
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
                      ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg scale-105"
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
                        isSelected || isCurrentSelection ? "text-green-700" : "text-slate-900 group-hover:text-green-600"
                      )}>
                        {option.label}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {option.description}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {(isSelected || isCurrentSelection) && (
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
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
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {currentStep === questions.length - 1 ? "Get Results" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

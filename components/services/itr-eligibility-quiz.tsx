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
  Star,
  RotateCcw,
  FileText,
  Info,
  Building,
  Home,
  Coins,
  HelpCircle,
  Download,
  ExternalLink,
  Calendar,
  Users,
  Leaf,
  TreePine,
  CreditCard
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
      id: "presumptive_taxation",
      question: "Are you opting for presumptive taxation?",
      description: "Under sections 44AD, 44ADA, or 44AE",
      emoji: "📋",
      options: [
        {
          id: "yes_presumptive",
          label: "Yes, opting for presumptive taxation",
          description: "Using sections 44AD, 44ADA, or 44AE",
          icon: FileText,
          value: "yes_presumptive",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "no_presumptive",
          label: "No, not opting for presumptive taxation",
          description: "Regular business taxation",
          icon: Shield,
          value: "no_presumptive",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        }
      ]
    },
    {
      id: "agricultural_income",
      question: "Do you have agricultural income?",
      description: "Income from agricultural activities",
      emoji: "🌾",
      options: [
        {
          id: "no_agricultural",
          label: "No agricultural income",
          description: "No income from farming or agriculture",
          icon: Shield,
          value: "no_agricultural",
          gradient: "from-gray-400 to-gray-600",
          popular: true
        },
        {
          id: "agricultural_below_5000",
          label: "Up to ₹5,000",
          description: "Agricultural income up to ₹5,000",
          icon: Leaf,
          value: "agricultural_below_5000",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "agricultural_above_5000",
          label: "Above ₹5,000",
          description: "Agricultural income above ₹5,000",
          icon: TreePine,
          value: "agricultural_above_5000",
          gradient: "from-orange-400 to-orange-600"
        }
      ]
    },
    {
      id: "capital_gains_112a",
      question: "Do you have LTCG u/s 112A up to ₹1.25 Lac?",
      description: "Long-term capital gains from equity shares/units",
      emoji: "📊",
      options: [
        {
          id: "yes_ltcg_112a",
          label: "Yes, LTCG u/s 112A up to ₹1.25 Lac",
          description: "Long-term capital gains from equity shares up to ₹1.25 Lac",
          icon: TrendingUp,
          value: "yes_ltcg_112a",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "no_ltcg_112a",
          label: "No such capital gains",
          description: "No LTCG u/s 112A or above ₹1.25 Lac",
          icon: Shield,
          value: "no_ltcg_112a",
          gradient: "from-green-400 to-green-600",
          popular: true
        }
      ]
    },
    {
      id: "tds_194n",
      question: "Do you have TDS u/s 194N deducted?",
      description: "TDS on cash withdrawal exceeding ₹1 crore",
      emoji: "💳",
      options: [
        {
          id: "yes_tds_194n",
          label: "Yes, TDS u/s 194N deducted",
          description: "TDS deducted on cash withdrawal",
          icon: CreditCard,
          value: "yes_tds_194n",
          gradient: "from-red-400 to-red-600"
        },
        {
          id: "no_tds_194n",
          label: "No TDS u/s 194N",
          description: "No such TDS deducted",
          icon: Shield,
          value: "no_tds_194n",
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

  // Auto-advance after selection
  useEffect(() => {
    if (selectedOption && !isAnimating) {
      const timer = setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setIsAnimating(true)
          setTimeout(() => {
            setCurrentStep(prev => prev + 1)
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
      house_properties,
      presumptive_taxation,
      agricultural_income,
      capital_gains_112a,
      tds_194n
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

    // Check for business income and presumptive taxation
    if (business_income === "yes_business") {
      isEligible = true
      if (presumptive_taxation === "yes_presumptive") {
        itrForm = "ITR-4"
        mandatoryReasons.push("Business income under presumptive taxation scheme")
      } else {
        itrForm = "ITR-3"
        mandatoryReasons.push("Business income not under presumptive taxation")
      }
      confidence += 20
    }

    if (director_status === "yes_director") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Director status requires ITR-2")
      confidence += 20
    }

    if (capital_gains === "yes_capital_gains") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Capital gains require ITR-2")
      confidence += 15
    }

    if (foreign_assets === "yes_foreign") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Foreign assets require ITR-2")
      confidence += 25
    }

    if (crypto_esop === "yes_crypto_esop") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Crypto/ESOP income requires ITR-2")
      confidence += 15
    }

    if (unlisted_shares === "yes_unlisted") {
      isEligible = true
      itrForm = "ITR-2"
      mandatoryReasons.push("Unlisted shares require ITR-2")
      confidence += 10
    }

    // Check agricultural income
    if (agricultural_income === "agricultural_above_5000") {
      isEligible = true
      if (itrForm === "ITR-1") {
        itrForm = "ITR-2"
      }
      mandatoryReasons.push("Agricultural income above ₹5,000 requires ITR-2/3")
      confidence += 10
    }

    // Check LTCG u/s 112A
    if (capital_gains_112a === "yes_ltcg_112a") {
      isEligible = true
      mandatoryReasons.push("LTCG u/s 112A up to ₹1.25 Lac allowed in ITR-1/4")
      confidence += 5
    }

    // Check TDS 194N
    if (tds_194n === "yes_tds_194n") {
      isEligible = true
      if (itrForm === "ITR-1") {
        itrForm = "ITR-2"
      }
      mandatoryReasons.push("TDS u/s 194N requires ITR-2/3")
      confidence += 10
    }

    // Check house properties
    if (house_properties === "multiple_properties") {
      isEligible = true
      if (itrForm === "ITR-1" || itrForm === "ITR-4") {
        itrForm = "ITR-2"
      }
      mandatoryReasons.push("Multiple house properties require ITR-2/3")
      confidence += 10
    }

    // Determine the appropriate ITR form and result
    if (!isEligible || (incomeValue <= 250000 && business_income === "no_business" && director_status === "no_director" && capital_gains === "no_capital_gains" && foreign_assets === "no_foreign" && crypto_esop === "no_crypto_esop" && unlisted_shares === "no_unlisted" && agricultural_income !== "agricultural_above_5000" && tds_194n === "no_tds_194n" && house_properties !== "multiple_properties")) {
      title = "ITR-1 (Sahaj)"
      description = "Simplest form for resident individuals with total income ≤ ₹50 lakh"
      itrForm = "ITR-1"
    } else if (business_income === "yes_business" && presumptive_taxation === "yes_presumptive") {
      title = "ITR-4 (Sugam)"
      description = "For businesses opting for presumptive taxation scheme"
      itrForm = "ITR-4"
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

    setSelectedOption(optionValue)
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: optionValue
    }))
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
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        {/* Enhanced Results Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-2 sm:mb-3",
            "bg-gradient-to-r from-green-100 to-blue-100 shadow-sm"
          )}>
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="text-xs sm:text-sm font-semibold text-green-700">
              Analysis Complete
            </span>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 px-2">
              Recommended: {result.title}
            </h3>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto px-2 leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Confidence Score */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-200">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              {result.confidence}% Match Confidence
            </span>
          </div>
        </div>

        {/* Enhanced Result Details */}
        <div className="space-y-4 sm:space-y-6">
          {/* Main Result Card */}
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Why This Form */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Why {result.itrForm} is recommended
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {result.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ITR Forms Overview */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  ITR Forms Overview
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { form: "ITR-1", desc: "Salary, pension, house property (≤₹50L)" },
                    { form: "ITR-2", desc: "Capital gains, multiple sources, directors" },
                    { form: "ITR-3", desc: "Business/professional income" },
                    { form: "ITR-4", desc: "Presumptive taxation (44AD/44ADA)" }
                  ].map((item, i) => (
                    <div key={i} className={cn(
                      "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors",
                      result.itrForm === item.form
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-slate-50"
                    )}>
                      <div className={cn(
                        "w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-xs font-bold",
                        result.itrForm === item.form
                          ? "bg-blue-600 text-white"
                          : "bg-slate-300 text-slate-600"
                      )}>
                        {item.form.split('-')[1]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs sm:text-sm text-slate-900">{item.form}</div>
                        <div className="text-xs text-slate-600 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 sm:p-6">
            <h4 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Next Steps for ITR Filing
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { step: "1", title: "Gather Documents", desc: "Form 16, bank statements, investment proofs" },
                { step: "2", title: "Choose ITR Form", desc: `Use ${result.itrForm} based on your profile` },
                { step: "3", title: "File Before Deadline", desc: "July 31st for individuals (AY 2025-26)" },
                { step: "4", title: "Verify Return", desc: "E-verify within 120 days of filing" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs sm:text-sm text-slate-900 mb-1">{item.title}</div>
                    <div className="text-xs text-slate-600 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 sm:p-6">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Need Professional Help?</h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-md mx-auto">
                  Our tax experts can help you file your ITR accurately and claim maximum deductions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Button className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5">
                  <Users className="w-4 h-4 mr-2" />
                  Get Expert Help
                </Button>

              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="h-10 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-medium border-slate-300 hover:bg-slate-50"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Take Quiz Again
          </Button>
          <Link href={"https://eportal.incometax.gov.in/iec/foservices/"} target="_blank">
            <Button className="h-10 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              File ITR Online
            </Button>
          </Link>
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

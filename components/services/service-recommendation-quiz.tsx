"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Users,
  Building2,
  Briefcase,
  Target,
  Lightbulb,
  Sparkles,
  Clock,
  TrendingUp,
  Award,
  Zap,
  Star,
  Shield,
  Rocket,
  Heart,
  Laptop,
  Store,
  Factory,
  Banknote,
  UserCheck,
  Globe,
  ChevronRight,
  Play,
  RotateCcw
} from "lucide-react"
import { cn } from "@/lib/utils"
import EnhancedCTAButton from "@/components/ui/enhanced-cta-button"

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
    color: string
    gradient: string
    popular?: boolean
  }[]
}

interface ServiceRecommendation {
  title: string
  description: string
  price: string
  originalPrice: string
  slug: string
  confidence: number
  reasons: string[]
}

export default function ServiceRecommendationQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  // Auto-advance after selection with smooth animation
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
  }, [selectedOption, currentStep, isAnimating])

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
          color: "text-yellow-600",
          gradient: "from-yellow-400 to-orange-500"
        },
        {
          id: "planning",
          label: "Planning stage",
          description: "I'm ready to register and start operations",
          icon: Rocket,
          value: "planning",
          color: "text-blue-600",
          gradient: "from-blue-400 to-blue-600",
          popular: true
        },
        {
          id: "operating",
          label: "Already operating",
          description: "I'm running a business but need compliance help",
          icon: Building2,
          value: "operating",
          color: "text-green-600",
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
          color: "text-purple-600",
          gradient: "from-purple-400 to-purple-600",
          popular: true
        },
        {
          id: "service",
          label: "Service Business",
          description: "Consulting, professional services, or personal services",
          icon: Briefcase,
          value: "service",
          color: "text-blue-600",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "retail",
          label: "Retail/E-commerce",
          description: "Selling products online or in physical stores",
          icon: Store,
          value: "retail",
          color: "text-green-600",
          gradient: "from-green-400 to-green-600"
        },
        {
          id: "manufacturing",
          label: "Manufacturing",
          description: "Producing goods or physical products",
          icon: Factory,
          value: "manufacturing",
          color: "text-orange-600",
          gradient: "from-orange-400 to-orange-600"
        }
      ]
    },
    {
      id: "team_size",
      question: "How many people will be involved?",
      description: "This affects the business structure we recommend",
      emoji: "👥",
      options: [
        {
          id: "solo",
          label: "Just me",
          description: "I'll be the only owner and operator",
          icon: UserCheck,
          value: "solo",
          color: "text-indigo-600",
          gradient: "from-indigo-400 to-indigo-600",
          popular: true
        },
        {
          id: "small_team",
          label: "2-5 people",
          description: "Small team or partnership",
          icon: Users,
          value: "small_team",
          color: "text-blue-600",
          gradient: "from-blue-400 to-blue-600"
        },
        {
          id: "large_team",
          label: "6+ people",
          description: "Larger team with multiple stakeholders",
          icon: Building2,
          value: "large_team",
          color: "text-green-600",
          gradient: "from-green-400 to-green-600"
        }
      ]
    },
    {
      id: "funding_plans",
      question: "Do you plan to raise funding?",
      description: "This influences the best business structure for you",
      emoji: "💰",
      options: [
        {
          id: "no_funding",
          label: "No external funding",
          description: "I'll fund the business myself or with partners",
          icon: Heart,
          value: "no_funding",
          color: "text-pink-600",
          gradient: "from-pink-400 to-pink-600"
        },
        {
          id: "maybe_funding",
          label: "Maybe in the future",
          description: "I might seek investors or loans later",
          icon: TrendingUp,
          value: "maybe_funding",
          color: "text-yellow-600",
          gradient: "from-yellow-400 to-yellow-600",
          popular: true
        },
        {
          id: "seeking_funding",
          label: "Yes, actively seeking",
          description: "I plan to raise money from investors soon",
          icon: Banknote,
          value: "seeking_funding",
          color: "text-green-600",
          gradient: "from-green-400 to-green-600"
        }
      ]
    }
  ]

  const getRecommendations = (): ServiceRecommendation[] => {
    const { business_stage, business_type, team_size, funding_plans } = answers

    // Logic to determine best services based on answers
    const recommendations: ServiceRecommendation[] = []

    // Primary recommendation logic
    if (team_size === "solo" && funding_plans === "no_funding") {
      recommendations.push({
        title: "One Person Company Registration",
        description: "Perfect for solo entrepreneurs with limited liability protection",
        price: "₹8,000",
        originalPrice: "₹10,000",
        slug: "opc",
        confidence: 95,
        reasons: [
          "You're operating solo",
          "No external funding needed",
          "Limited liability protection",
          "Easy compliance requirements"
        ]
      })
    } else if (funding_plans === "seeking_funding" || funding_plans === "maybe_funding") {
      recommendations.push({
        title: "Private Limited Company Registration",
        description: "Best for businesses seeking investment and growth",
        price: "₹12,000",
        originalPrice: "₹15,000",
        slug: "private-limited-company",
        confidence: 90,
        reasons: [
          "Investor-friendly structure",
          "Easy to raise capital",
          "Professional credibility",
          "Separate legal entity"
        ]
      })
    } else if (team_size === "small_team" && business_type === "service") {
      recommendations.push({
        title: "Limited Liability Partnership",
        description: "Ideal for professional service partnerships",
        price: "₹10,000",
        originalPrice: "₹13,000",
        slug: "llp",
        confidence: 85,
        reasons: [
          "Perfect for partnerships",
          "Professional service friendly",
          "Flexible management",
          "Limited liability protection"
        ]
      })
    }

    // Secondary recommendations
    if (business_stage === "operating") {
      recommendations.push({
        title: "GST Registration",
        description: "Essential for business compliance and growth",
        price: "₹3,000",
        originalPrice: "₹4,500",
        slug: "gst-registration",
        confidence: 80,
        reasons: [
          "Already operating business",
          "Legal compliance required",
          "Input tax credit benefits",
          "Professional credibility"
        ]
      })
    }

    return recommendations.slice(0, 3) // Return top 3 recommendations
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
    setIsStarted(false)
    setSelectedOption(null)
    setIsAnimating(false)
  }

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">AI-Powered Recommendations</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Find Your Perfect Business Service
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get personalized recommendations in under 2 minutes. Our smart quiz analyzes your business needs and suggests the ideal services to get you started.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Target, label: "Personalized", desc: "Tailored to your needs", color: "from-blue-400 to-blue-600" },
            { icon: Clock, label: "Quick", desc: "Under 2 minutes", color: "from-green-400 to-green-600" },
            { icon: Award, label: "Expert", desc: "Professional advice", color: "from-purple-400 to-purple-600" },
            { icon: Zap, label: "Accurate", desc: "95% match rate", color: "from-orange-400 to-orange-600" }
          ].map((feature, index) => (
            <div key={index} className="group text-center p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{feature.label}</h3>
              <p className="text-sm text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-600">4 simple questions</span>
              </div>

              <button
                onClick={() => setIsStarted(true)}
                className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-3">
                  <Play className="w-5 h-5" />
                  <span className="text-lg">Start Your Journey</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>2 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const recommendations = getRecommendations()

    return (
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Results Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-6">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Analysis Complete</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Your Perfect Business Services
          </h2>

          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Based on your answers, we've found the ideal services to help you start and grow your business successfully.
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {recommendations.map((rec, index) => (
            <div key={index} className={cn(
              "group relative bg-white rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
              index === 0
                ? "border-gradient-to-r from-blue-500 to-purple-500 shadow-xl scale-105"
                : "border-slate-200 hover:border-slate-300"
            )}>
              {/* Best Match Badge */}
              {index === 0 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    <Star className="w-4 h-4 inline mr-2" />
                    Best Match
                  </div>
                </div>
              )}

              {/* Confidence Score */}
              <div className="absolute top-6 right-6">
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  rec.confidence >= 90 ? "bg-green-100 text-green-700" :
                  rec.confidence >= 80 ? "bg-blue-100 text-blue-700" :
                  "bg-yellow-100 text-yellow-700"
                )}>
                  {rec.confidence}% match
                </div>
              </div>

              <div className="p-8">
                {/* Service Title */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {rec.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {rec.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      {rec.price}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      {rec.originalPrice}
                    </span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Save {Math.round(((parseInt(rec.originalPrice.replace(/[₹,]/g, '')) - parseInt(rec.price.replace(/[₹,]/g, ''))) / parseInt(rec.originalPrice.replace(/[₹,]/g, ''))) * 100)}%
                  </div>
                </div>

                {/* Reasons */}
                <div className="mb-8">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    Why this is perfect for you:
                  </h4>
                  <ul className="space-y-3">
                    {rec.reasons.map((reason, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="leading-relaxed">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <EnhancedCTAButton
                  href={`/services/${rec.slug}`}
                  variant={index === 0 ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                  popular={index === 0}
                  guarantee={index === 0}
                  savings={index === 0 ? `Save ₹${parseInt(rec.originalPrice.replace(/[₹,]/g, '')) - parseInt(rec.price.replace(/[₹,]/g, ''))}` : undefined}
                >
                  {index === 0 ? "Start Now - Best Choice" : "Get Started"}
                </EnhancedCTAButton>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={resetQuiz}
              className="flex items-center gap-2 px-6 py-3 rounded-xl"
            >
              <RotateCcw className="w-4 h-4" />
              Take Quiz Again
            </Button>

            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-xl"
            >
              <a href="/services" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                View All Services
              </a>
            </Button>
          </div>

          <p className="text-sm text-slate-500">
            Need help choosing? <a href="/contact" className="text-blue-600 hover:underline">Contact our experts</a> for personalized guidance.
          </p>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Question {currentStep + 1} of {questions.length}
          </Badge>
          <div className="text-sm font-medium text-slate-600">
            {Math.round(progress)}% complete
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative w-full max-w-md mx-auto">
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index <= currentStep
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-110"
                    : "bg-slate-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className={cn(
        "transition-all duration-300",
        isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
      )}>
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{currentQuestion.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {currentQuestion.description}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value
              const isCurrentSelection = selectedOption === option.value

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  disabled={isAnimating}
                  className={cn(
                    "group relative p-6 text-left border-2 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg",
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

                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
                    isSelected || isCurrentSelection
                      ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                  )}>
                    <option.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className={cn(
                      "font-semibold text-lg transition-colors duration-300",
                      isSelected || isCurrentSelection ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                    )}>
                      {option.label}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  {(isSelected || isCurrentSelection) && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
              className="flex items-center gap-2 px-6 py-3 rounded-xl"
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
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
``
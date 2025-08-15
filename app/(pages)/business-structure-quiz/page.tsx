"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, UserCheck, Building2, Users, Target, Award, Sparkles, Clock } from "lucide-react"
import Link from "next/link"
import CompanyRegistrationQuiz from "@/components/services/company-registration-quiz"
import { cn } from "@/lib/utils"

export default function BusinessStructureQuizPage() {
  const [showQuiz, setShowQuiz] = useState(false)

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Business Structure Decision Quiz
              </h1>
              <p className="text-slate-600">
                Find the perfect business structure for your needs
              </p>
            </div>

            {/* Quiz Component */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <CompanyRegistrationQuiz />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Landing Content */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Play className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Find Your Perfect Business Structure
                </h1>

                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Get personalized recommendations for your business structure based on your business type, 
                  team size, investment capacity, and growth plans. Our intelligent quiz analyzes multiple 
                  factors to suggest the ideal company registration type.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">6</div>
                    <div className="text-sm text-slate-600">Smart Questions</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">3</div>
                    <div className="text-sm text-slate-600">Minutes to Complete</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">5</div>
                    <div className="text-sm text-slate-600">Structure Options</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600 mb-1">98%</div>
                    <div className="text-sm text-slate-600">Accuracy Rate</div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Smart Quiz
                </Button>

                <div className="mt-6 text-sm text-slate-500">
                  ✓ Free expert consultation • ✓ AI-powered recommendations • ✓ Instant results
                </div>
              </div>
            </div>

            {/* Business Structure Comparison */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Business Structure Comparison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Sole Proprietorship</h3>
                  <p className="text-sm text-slate-600 mb-3">Simplest structure for individual entrepreneurs</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Lowest cost (₹3,000)</li>
                    <li>• Minimal compliance</li>
                    <li>• Complete control</li>
                    <li>• Unlimited liability</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">One Person Company</h3>
                  <p className="text-sm text-slate-600 mb-3">Perfect for solo entrepreneurs with liability protection</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Moderate cost (₹8,000)</li>
                    <li>• Limited liability</li>
                    <li>• Professional credibility</li>
                    <li>• Can convert to Pvt Ltd</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Private Limited</h3>
                  <p className="text-sm text-slate-600 mb-3">Most professional structure for scaling businesses</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Higher cost (₹12,000)</li>
                    <li>• Maximum protection</li>
                    <li>• Easy funding access</li>
                    <li>• Investor friendly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Why Use Our Quiz */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Why Use Our Smart Business Structure Quiz?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="text-left">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Personalized Analysis</h3>
                        <p className="text-sm text-slate-600">Considers your business type, team size, investment, and growth plans</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Expert Verified</h3>
                        <p className="text-sm text-slate-600">Recommendations verified by CA and legal experts</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">AI-Powered Scoring</h3>
                        <p className="text-sm text-slate-600">Advanced algorithm analyzes multiple factors for accurate recommendations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Instant Results</h3>
                        <p className="text-sm text-slate-600">Get detailed recommendations with pricing and next steps immediately</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Analysis Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, FileText, Calendar, Target } from "lucide-react"
import Link from "next/link"
import ITREligibilityQuiz from "@/components/services/itr-eligibility-quiz"

export default function ITREligibilityQuizPage() {
  const [showQuiz, setShowQuiz] = useState(false)

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                ITR Eligibility Quiz - FY 2024-25
              </h1>
              <p className="text-slate-600">
                Find the right ITR form for your tax filing requirements
              </p>
            </div>

            {/* Quiz Component */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <ITREligibilityQuiz />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Landing Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Find the Right ITR Form for You
              </h1>
              
              <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-6">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">FY 2024-25</span>
              </div>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Determine your Income Tax Return filing requirements based on your income sources, 
                earnings, and tax status. Get personalized recommendations for ITR-1, ITR-2, ITR-3, 
                or ITR-4 forms with expert guidance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">8</div>
                  <div className="text-sm text-slate-600">Comprehensive Questions</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
                  <div className="text-sm text-slate-600">Minutes to Complete</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                  <div className="text-sm text-slate-600">Compliance Assured</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  What You'll Get
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Recommended ITR form
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Filing requirements
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Next steps guidance
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Expert consultation
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </Button>

              <div className="mt-6 text-sm text-slate-500">
                ✓ Updated for FY 2024-25 • ✓ CA verified recommendations • ✓ Free expert consultation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
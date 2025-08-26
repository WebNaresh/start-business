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
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4 touch-target">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm sm:text-base">Back to Home</span>
              </Link>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight px-2">
                ITR Eligibility Quiz – Find the Right ITR Form (AY 2025-26)
              </h1>
              <p className="text-sm sm:text-base text-slate-600 px-2">
                Find the right ITR form for your tax filing requirements
              </p>
            </div>

            {/* Quiz Component */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200">
              <ITREligibilityQuiz />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4 touch-target">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">Back to Home</span>
            </Link>
          </div>

          {/* Landing Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight px-2">
                  ITR Eligibility Quiz – Find the Right ITR Form (AY 2025-26)
                </h1>

                <div className="inline-flex items-center gap-2 bg-orange-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                  <span className="text-xs sm:text-sm font-semibold text-orange-700">FY 2024-25</span>
                </div>

                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed px-2">
                  Confused about which ITR form to file for AY 2025-26? Choosing the right Income Tax Return form is crucial to avoid notices and ensure a smooth filing process. Our free ITR Eligibility Quiz helps individuals, freelancers, and businesses instantly identify the correct ITR form (ITR-1, ITR-2, ITR-3, or ITR-4) based on your income sources and tax profile. Designed as per the latest Income Tax Rules for FY 2024-25, the quiz provides CA-verified guidance in just a few clicks — saving time, reducing errors, and keeping you fully compliant. For additional tax calculations, check our{' '}
                  <Link href="/business-calculators/income-tax-calculator" className="text-blue-600 hover:text-blue-700 underline">
                    Income Tax Calculator
                  </Link>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">8</div>
                    <div className="text-xs sm:text-sm text-slate-600">Comprehensive Questions</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">3</div>
                    <div className="text-xs sm:text-sm text-slate-600">Minutes to Complete</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">100%</div>
                    <div className="text-xs sm:text-sm text-slate-600">Compliance Assured</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    What You'll Get
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
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
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto touch-target"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start Quiz
                </Button>

                <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-500 px-2">
                  ✓ Updated for FY 2024-25 • ✓ CA verified recommendations • ✓ Free expert consultation
                </div>
              </div>
            </div>

            {/* ITR Forms Comparison Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 text-center px-2">
                ITR Forms Comparison Table (AY 2025–26)
              </h2>

              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="min-w-[700px] sm:min-w-0">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900 sticky left-0 bg-white">Particulars</th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900">ITR-1 (Sahaj)</th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900">ITR-2</th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900">ITR-3</th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900">ITR-4 (Sugam)</th>
                      </tr>
                    </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Applicant Type</td>
                    <td className="py-3 px-2">Resident Individual</td>
                    <td className="py-3 px-2">Individual & HUF (Resident, RNOR, or Non-Resident)</td>
                    <td className="py-3 px-2">Individual & HUF with Business/Professional Income</td>
                    <td className="py-3 px-2">Resident Individual, HUF & Firm (other than LLP)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Total Income</td>
                    <td className="py-3 px-2">Up to ₹50 Lakh</td>
                    <td className="py-3 px-2">No Limit</td>
                    <td className="py-3 px-2">No Limit</td>
                    <td className="py-3 px-2">Up to ₹50 Lakh</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Income from Salary/Pension</td>
                    <td className="py-3 px-2">Yes</td>
                    <td className="py-3 px-2">Yes</td>
                    <td className="py-3 px-2">Yes</td>
                    <td className="py-3 px-2">Yes</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Income from House Property</td>
                    <td className="py-3 px-2">Income from One house property</td>
                    <td className="py-3 px-2">Income from More than one house property</td>
                    <td className="py-3 px-2">Income from More than one house property</td>
                    <td className="py-3 px-2">Income from One house property</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Capital Gains</td>
                    <td className="py-3 px-2">Limited: LTCG u/s 112A up to ₹1.25 Lakh. Cannot have any other capital gains.</td>
                    <td className="py-3 px-2">All Capital Gains (Short-Term & Long-Term).</td>
                    <td className="py-3 px-2">All Capital Gains (Short-Term & Long-Term) and losses.</td>
                    <td className="py-3 px-2">Limited: LTCG u/s 112A up to ₹1.25 Lakh. Cannot have any other capital gains.</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Income from Other Sources</td>
                    <td className="py-3 px-2">Excludes winnings from lottery, gambling, etc.</td>
                    <td className="py-3 px-2">Includes all Other Sources (winnings from lottery, gambling, etc.)</td>
                    <td className="py-3 px-2">Includes all Other Sources.</td>
                    <td className="py-3 px-2">Excludes winnings from lottery, gambling, racehorses, etc.</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Agricultural Income</td>
                    <td className="py-3 px-2">Up to ₹5,000</td>
                    <td className="py-3 px-2">Above ₹5,000</td>
                    <td className="py-3 px-2">No Limit</td>
                    <td className="py-3 px-2">Up to ₹5,000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Income from Business or Profession</td>
                    <td className="py-3 px-2">Not Permitted</td>
                    <td className="py-3 px-2">Not Permitted</td>
                    <td className="py-3 px-2">Permitted (Required for businesses not opting for the presumptive scheme)</td>
                    <td className="py-3 px-2">Permitted, but only under the presumptive taxation scheme (Sec. 44AD, 44ADA, or 44AE)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Foreign Assets/Income</td>
                    <td className="py-3 px-2">Not Permitted</td>
                    <td className="py-3 px-2">Permitted</td>
                    <td className="py-3 px-2">Permitted</td>
                    <td className="py-3 px-2">Not Permitted</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Director in a Company</td>
                    <td className="py-3 px-2">Not Permitted</td>
                    <td className="py-3 px-2">Permitted</td>
                    <td className="py-3 px-2">Permitted</td>
                    <td className="py-3 px-2">Not Permitted</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Unlisted Equity Shares</td>
                    <td className="py-3 px-2">Not Permitted</td>
                    <td className="py-3 px-2">Permitted</td>
                    <td className="py-3 px-2">Permitted</td>
                    <td className="py-3 px-2">Not Permitted</td>
                  </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* How the Quiz Works */}
            <div className="bg-gradient-to-br from-slate-50 to-green-50 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 text-center px-2">
                Step-by-Step: How the Quiz Works
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-white font-bold text-sm sm:text-base">1</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Answer Income Questions</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Select whether you earn from salary, business, profession, capital gains, or foreign sources.</p>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-white font-bold text-sm sm:text-base">2</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Choose Residential Status</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Resident, Non-Resident, or Resident but Not Ordinarily Resident.</p>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-white font-bold text-sm sm:text-base">3</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Add Special Conditions</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Check if you are a company director, own foreign assets, or have agricultural income.</p>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-white font-bold text-sm sm:text-base">4</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Get Instant Results</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">The quiz will recommend the correct ITR form (ITR-1, ITR-2, ITR-3, or ITR-4).</p>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm sm:col-span-2 lg:col-span-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-white font-bold text-sm sm:text-base">5</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Next Steps</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Option to consult a Chartered Accountant for filing, or proceed with DIY filing.</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 text-center px-2">
                Frequently Asked Questions (FAQ)
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="border-b border-slate-100 pb-4 sm:pb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3 leading-tight">
                    Q1. How do I know which ITR form is correct for me?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    The right ITR form depends on your income sources, residential status, and special conditions. Our quiz quickly matches your profile with the correct form.
                  </p>
                </div>

              <div className="border-b border-slate-100 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Q2. What happens if I file the wrong ITR form?
                </h3>
                <p className="text-slate-600">
                  Your return may be treated as defective, leading to notices from the Income Tax Department. You may have to re-file using the correct form.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Q3. Can freelancers and consultants use this quiz?
                </h3>
                <p className="text-slate-600">
                  Yes. If you earn professional income under section 44ADA or normal business/profession income, the quiz will guide you to ITR-3 or ITR-4.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Q4. I have capital gains from shares. Which ITR applies?
                </h3>
                <p className="text-slate-600">
                  Capital gains are not allowed in ITR-1 or ITR-4. You will need to file ITR-2 (if no business income) or ITR-3 (if business/profession income exists).
                </p>
              </div>

              <div className="border-b border-slate-100 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Q5. Does the quiz cover the new regime and old regime tax options?
                </h3>
                <p className="text-slate-600">
                  Yes. While the quiz identifies the correct ITR form, you can still choose between old vs. new regime at the time of filing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Q6. Is this quiz valid for AY 2025–26?
                </h3>
                <p className="text-slate-600">
                  Yes. The tool is updated as per Income Tax Rules for FY 2024-25 (AY 2025-26).
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
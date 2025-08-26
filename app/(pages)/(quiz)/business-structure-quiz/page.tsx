"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, UserCheck, Building2, Users, Target, Award, Sparkles, Clock } from "lucide-react"
import Link from "next/link"
import CompanyRegistrationQuiz from "@/components/services/company-registration-quiz"

export default function BusinessStructureQuizPage() {
  const [showQuiz, setShowQuiz] = useState(false)

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 touch-target">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm sm:text-base">Back to Home</span>
              </Link>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight px-2">
                Which Business Structure is Right for You? Take the Quiz
              </h1>
              <p className="text-sm sm:text-base text-slate-600 px-2">
                Find the perfect business structure for your needs with our CA-verified recommendations
              </p>
            </div>

            {/* Quiz Component */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200">
              <CompanyRegistrationQuiz />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 touch-target">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">Back to Home</span>
            </Link>
          </div>

          {/* Landing Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight px-2">
                  Which Business Structure is Right for You? Take the Quiz
                </h1>

                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed px-2">
                  Discover the best business structure in India for your startup with our comprehensive quiz.
                  Get CA-verified recommendations for company registration options including Sole Proprietorship,
                  OPC, Partnership, LLP, or Private Limited Company. Our intelligent startup entity selection
                  tool analyzes your business type, team size, investment capacity, and growth plans to suggest
                  the ideal company registration type for Indian entrepreneurs. For detailed insights, read our{' '}
                  <Link href="/blog//which-business-structure-is-right-for-you-a-beginner-s-guide-to-company-registration-in-india" className="text-blue-600 hover:text-blue-700 underline">
                    comprehensive business structure guide
                  </Link>{' '}before taking the quiz.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">6</div>
                    <div className="text-xs sm:text-sm text-slate-600">Smart Questions</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">3</div>
                    <div className="text-xs sm:text-sm text-slate-600">Minutes to Complete</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">5</div>
                    <div className="text-xs sm:text-sm text-slate-600">Structure Options</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">98%</div>
                    <div className="text-xs sm:text-sm text-slate-600">Accuracy Rate</div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto touch-target"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start Smart Quiz
                </Button>

                <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-500 px-2">
                  ✓ Free expert consultation • ✓ AI-powered recommendations • ✓ Instant results
                </div>
              </div>
            </div>

            {/* Business Structure Comparison */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 text-center px-2">
                Business Structure Comparison
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Sole Proprietorship</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">Simplest structure for individual entrepreneurs</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Lowest cost (₹3,000)</li>
                    <li>• Minimal compliance</li>
                    <li>• Complete control</li>
                    <li>• Unlimited liability</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">One Person Company</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">Perfect for solo entrepreneurs with liability protection</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Moderate cost (₹8,000)</li>
                    <li>• Limited liability</li>
                    <li>• Professional credibility</li>
                    <li>• Can convert to Pvt Ltd</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-200 sm:col-span-2 lg:col-span-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Private Limited</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">Most professional structure for scaling businesses</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Higher cost (₹12,000)</li>
                    <li>• Maximum protection</li>
                    <li>• Easy funding access</li>
                    <li>• Investor friendly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Comparative Analysis Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 text-center px-2">
                Comparative Analysis of Key Business Structures in India
              </h2>

              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="min-w-[600px] sm:min-w-0">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900 sticky left-0 bg-white">Dimension</th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900">Sole Proprietorship</th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900">Partnership</th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900">LLP</th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-slate-900">Private Limited</th>
                      </tr>
                    </thead>
                  <tbody className="text-slate-600">
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Governing Act</td>
                      <td className="py-3 px-2">N/A (informal)</td>
                      <td className="py-3 px-2">Indian Partnership Act, 1932</td>
                      <td className="py-3 px-2">LLP Act, 2008</td>
                      <td className="py-3 px-2">Companies Act, 2013</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Minimum Owners</td>
                      <td className="py-3 px-2">1</td>
                      <td className="py-3 px-2">2</td>
                      <td className="py-3 px-2">2</td>
                      <td className="py-3 px-2">2 (shareholders & directors)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Maximum Owners</td>
                      <td className="py-3 px-2">1</td>
                      <td className="py-3 px-2">50</td>
                      <td className="py-3 px-2">No limit</td>
                      <td className="py-3 px-2">200 (shareholders)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Legal Status</td>
                      <td className="py-3 px-2">Not a separate entity</td>
                      <td className="py-3 px-2">Not a separate entity</td>
                      <td className="py-3 px-2">Separate legal entity</td>
                      <td className="py-3 px-2">Separate legal entity</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Liability</td>
                      <td className="py-3 px-2">Unlimited personal liability</td>
                      <td className="py-3 px-2">Shared unlimited liability</td>
                      <td className="py-3 px-2">Limited to partner contribution</td>
                      <td className="py-3 px-2">Limited to shareholder investment</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Taxation</td>
                      <td className="py-3 px-2">Individual income tax</td>
                      <td className="py-3 px-2">Partners' individual income tax</td>
                      <td className="py-3 px-2">Fixed 30% on firm's income</td>
                      <td className="py-3 px-2">Corporate tax (15% to 30% rates)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Audit Requirement</td>
                      <td className="py-3 px-2">None (unless specified)</td>
                      <td className="py-3 px-2">None (unless specified)</td>
                      <td className="py-3 px-2">Conditional (Turnover &gt; ₹40L or Capital &gt; ₹25L)</td>
                      <td className="py-3 px-2">Mandatory (irrespective of turnover)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Compliance Burden</td>
                      <td className="py-3 px-2">Low</td>
                      <td className="py-3 px-2">Low</td>
                      <td className="py-3 px-2">Moderate</td>
                      <td className="py-3 px-2">High</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Cost of Formation</td>
                      <td className="py-3 px-2">Low</td>
                      <td className="py-3 px-2">Low to moderate</td>
                      <td className="py-3 px-2">Moderate</td>
                      <td className="py-3 px-2">High</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">External Funding</td>
                      <td className="py-3 px-2">Poor (limited to debt)</td>
                      <td className="py-3 px-2">Poor (limited to debt)</td>
                      <td className="py-3 px-2">Poor (cannot issue equity)</td>
                      <td className="py-3 px-2">Excellent (can issue shares)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Perpetual Succession</td>
                      <td className="py-3 px-2">No</td>
                      <td className="py-3 px-2">No</td>
                      <td className="py-3 px-2">Yes</td>
                      <td className="py-3 px-2">Yes</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Why Use Our Quiz */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 px-2">
                  Why Use Our Smart Business Structure Quiz?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-left space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Personalized Analysis</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Considers your business type, team size, investment, and growth plans</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Expert Verified</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Recommendations verified by CA and legal experts</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-left space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">AI-Powered Scoring</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Advanced algorithm analyzes multiple factors for accurate recommendations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Instant Results</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Get detailed recommendations with pricing and next steps immediately</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto touch-target"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start Your Analysis Now
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 text-center px-2">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="border-b border-slate-100 pb-4 sm:pb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3 leading-tight">
                    Which is the best business structure for startups in India?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    For high-growth startups planning to raise investment, a Private Limited Company is the most suitable.
                    It offers limited liability, credibility, and is investor-friendly.
                  </p>
                </div>

                <div className="border-b border-slate-100 pb-4 sm:pb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3 leading-tight">
                    Is OPC better than Proprietorship?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Yes, an OPC provides limited liability and a separate legal identity, unlike a proprietorship where
                    the owner's personal assets are at risk. However, OPC has higher compliance and costs.
                  </p>
                </div>

                <div className="border-b border-slate-100 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    What is the difference between LLP and Pvt Ltd?
                  </h3>
                  <p className="text-slate-600">
                    LLP suits professional services or small businesses wanting limited liability with fewer compliances.
                    Pvt Ltd is better for startups and companies needing investment and scalability, though it has stricter compliance.
                  </p>
                </div>

                <div className="border-b border-slate-100 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Which business structure has the lowest cost and compliance?
                  </h3>
                  <p className="text-slate-600">
                    A Sole Proprietorship has the lowest cost and minimal compliance, but it comes with unlimited liability.
                  </p>
                </div>

                <div className="border-b border-slate-100 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Can a foreigner start a business in India?
                  </h3>
                  <p className="text-slate-600">
                    Foreigners can invest in or start a Private Limited Company or LLP in India (subject to FDI rules).
                    Proprietorships and partnerships are not available to NRIs.
                  </p>
                </div>

                <div className="border-b border-slate-100 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    What is the cheapest way to register a company in India?
                  </h3>
                  <p className="text-slate-600">
                    If you just want to formalize operations, a Partnership Firm or Proprietorship is cheapest.
                    But for legal protection and credibility, OPC or LLP is better.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Which business structure is best for freelancers?
                  </h3>
                  <p className="text-slate-600">
                    Freelancers and solo consultants usually start with Sole Proprietorship. If income grows and
                    liability risk increases, they can shift to OPC or LLP.
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
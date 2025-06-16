import type { Metadata } from "next"
import Script from "next/script"
import {
  Calendar,
  Clock,
  User,
  Building2,
  Users,
  Shield,
  TrendingUp,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Private Limited Company vs. LLP: A Comprehensive Comparison Guide",
  description:
    "Detailed comparison between Private Limited Company and Limited Liability Partnership (LLP) in India. Learn about formation, compliance, taxation, and more to make an informed business decision.",
  keywords:
    "Private Limited Company, LLP, business structure, company formation, business registration, India business, company compliance",
}

export default function PrivateLimitedVsLLP() {
  // Generate structured data for the blog post
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Private Limited Company vs. LLP: A Comprehensive Comparison Guide",
    description:
      "Detailed comparison between Private Limited Company and Limited Liability Partnership (LLP) in India. Learn about formation, compliance, taxation, and more to make an informed business decision.",
    author: {
      "@type": "Organization",
      name: "Your Company Name",
    },
    datePublished: "2024-03-20",
    publisher: {
      "@type": "Organization",
      name: "Your Company Name",
      logo: {
        "@type": "ImageObject",
        url: "https://yourcompany.com/logo.png",
      },
    },
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-blue-200 mb-4">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium">Business Structure Guide</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Private Limited Company vs. LLP: Complete Comparison
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Make an informed decision for your business with our comprehensive guide comparing Private Limited
                Companies and Limited Liability Partnerships in India.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>March 20, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>10 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Business Expert</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Business formation comparison"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 mb-8">
            <p className="text-lg text-slate-700 leading-relaxed m-0">
              Choosing the right business structure is one of the most crucial decisions entrepreneurs make when
              starting a business in India. Two popular options are Private Limited Companies and Limited Liability
              Partnerships (LLPs). This comprehensive guide will help you understand the key differences and make an
              informed decision.
            </p>
          </div>
        </div>

        {/* Quick Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Private Limited Company</h3>
              </div>
              <p className="text-blue-100">Formal corporate structure with shareholders and directors</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Better for raising capital and attracting investors</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Separate legal entity with limited liability</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Higher compliance requirements and costs</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">More complex tax structure</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Limited Liability Partnership</h3>
              </div>
              <p className="text-slate-200">Flexible partnership with limited liability protection</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Lower compliance requirements and costs</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Pass-through taxation benefits</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Limited options for raising capital</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Less attractive to investors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Detailed Comparison</h2>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-6 font-semibold text-slate-900">Aspect</th>
                    <th className="text-left p-6 font-semibold text-blue-700">Private Limited Company</th>
                    <th className="text-left p-6 font-semibold text-slate-700">LLP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-6 font-medium text-slate-900">Minimum Members</td>
                    <td className="p-6 text-slate-700">2 Directors, 2 Shareholders</td>
                    <td className="p-6 text-slate-700">2 Partners</td>
                  </tr>
                  <tr className="bg-slate-25">
                    <td className="p-6 font-medium text-slate-900">Registration Cost</td>
                    <td className="p-6 text-slate-700">₹15,000 - ₹25,000</td>
                    <td className="p-6 text-slate-700">₹8,000 - ₹15,000</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium text-slate-900">Annual Compliance</td>
                    <td className="p-6 text-slate-700">High (AGM, Board Meetings, ROC Filings)</td>
                    <td className="p-6 text-slate-700">Low (Annual Filing, Statement of A/c)</td>
                  </tr>
                  <tr className="bg-slate-25">
                    <td className="p-6 font-medium text-slate-900">Audit Requirement</td>
                    <td className="p-6 text-slate-700">Mandatory for all companies</td>
                    <td className="p-6 text-slate-700">Only if turnover &gt; ₹40 lakhs</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium text-slate-900">Taxation</td>
                    <td className="p-6 text-slate-700">Corporate Tax (25-30%)</td>
                    <td className="p-6 text-slate-700">Pass-through (Partners' Tax Rate)</td>
                  </tr>
                  <tr className="bg-slate-25">
                    <td className="p-6 font-medium text-slate-900">Foreign Investment</td>
                    <td className="p-6 text-slate-700">Allowed (subject to FDI policy)</td>
                    <td className="p-6 text-slate-700">Not allowed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Formation Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Formation Process</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Private Limited Company</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span className="text-slate-700">Obtain Digital Signature Certificate (DSC)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span className="text-slate-700">Apply for Director Identification Number (DIN)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span className="text-slate-700">Reserve company name (RUN)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <span className="text-slate-700">File incorporation documents (SPICe+)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    5
                  </div>
                  <span className="text-slate-700">Obtain Certificate of Incorporation</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">LLP Formation</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span className="text-slate-700">Obtain Digital Signature Certificate (DSC)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span className="text-slate-700">Apply for Designated Partner Identification Number (DPIN)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span className="text-slate-700">Reserve LLP name (RUN-LLP)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <span className="text-slate-700">File incorporation documents (FiLLiP)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    5
                  </div>
                  <span className="text-slate-700">Obtain Certificate of Incorporation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Considerations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Considerations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Growth Plans</h3>
              <p className="text-slate-600">
                Consider your long-term growth objectives and funding requirements when choosing between structures.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Compliance Capacity</h3>
              <p className="text-slate-600">
                Evaluate your ability to handle ongoing compliance requirements and associated costs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Tax Implications</h3>
              <p className="text-slate-600">
                Understand the tax implications of each structure on your business and personal finances.
              </p>
            </div>
          </div>
        </div>

        {/* Decision Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Which One Should You Choose?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Choose Private Limited Company if:</h3>
              <div className="space-y-3">
                {[
                  "You plan to raise external funding or attract investors",
                  "You want to build a scalable, growth-oriented business",
                  "You need a formal corporate structure",
                  "You plan to go public in the future",
                  "You want better credibility with clients and vendors",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Choose LLP if:</h3>
              <div className="space-y-3">
                {[
                  "You're starting a professional services business",
                  "You want lower compliance requirements and costs",
                  "You prefer a simpler, more flexible structure",
                  "You want pass-through taxation benefits",
                  "You're starting a small to medium-sized business",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Need Expert Guidance?</h3>
            <p className="text-xl text-slate-300 mb-8">
              Our team of business formation experts can help you choose the right structure and guide you through the
              entire registration process. Get personalized advice based on your specific business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold">
                Download Comparison Guide
              </button>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-start gap-6">
            <img src="/placeholder.svg?height=80&width=80" alt="Business Expert" className="w-20 h-20 rounded-full" />
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Business Formation Expert</h4>
              <p className="text-slate-600 mb-4">
                With over 10 years of experience in business formation and corporate law, our experts have helped
                thousands of entrepreneurs choose the right business structure and successfully register their
                companies.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>Published: March 20, 2024</span>
                <span>•</span>
                <span>Updated: March 20, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

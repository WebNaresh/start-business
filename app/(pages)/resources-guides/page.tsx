import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Calculator, BookOpen, Users, ArrowRight, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Business Resources & Guides | StartBusiness",
  description: "Access comprehensive business guides, calculators, templates, and resources to help you start and grow your business in India.",
  keywords: "business guides, startup resources, business templates, calculators, compliance guides",
}

const resourceCategories = [
  {
    title: "Business Setup Guides",
    description: "Step-by-step guides for different business structures",
    icon: BookOpen,
    color: "blue",
    resources: [
      { title: "Private Limited Company Setup Guide", href: "/services/private-limited-company", type: "Guide" },
      { title: "LLP Registration Process", href: "/services/llp", type: "Guide" },
      { title: "One Person Company Guide", href: "/services/opc", type: "Guide" },
      { title: "Partnership Firm Registration", href: "/services/partnership-firm", type: "Guide" },
    ]
  },
  {
    title: "Financial Calculators",
    description: "Essential calculators for business planning",
    icon: Calculator,
    color: "green",
    resources: [
      { title: "Business Loan Calculator", href: "/business-calculators/business-loan-calculator", type: "Calculator" },
      { title: "GST Calculator", href: "/business-calculators/gst-calculator", type: "Calculator" },
      { title: "Income Tax Calculator", href: "/business-calculators/income-tax-calculator", type: "Calculator" },
      { title: "EMI Calculator", href: "/business-calculators/emi-calculator", type: "Calculator" },
    ]
  },
  {
    title: "Compliance Resources",
    description: "Stay compliant with legal requirements",
    icon: FileText,
    color: "purple",
    resources: [
      { title: "Annual Compliance Guide", href: "/services/annual-compliance", type: "Guide" },
      { title: "GST Filing Process", href: "/services/gst-filing", type: "Guide" },
      { title: "ITR Filing Guide", href: "/services/itr-filing", type: "Guide" },
      { title: "ROC Compliance", href: "/services/roc-compliance", type: "Guide" },
    ]
  },
  {
    title: "Business Templates",
    description: "Ready-to-use business documents",
    icon: Download,
    color: "orange",
    resources: [
      { title: "Business Plan Template", href: "#", type: "Template", external: true },
      { title: "Partnership Agreement Template", href: "#", type: "Template", external: true },
      { title: "Employment Contract Template", href: "#", type: "Template", external: true },
      { title: "Invoice Template", href: "#", type: "Template", external: true },
    ]
  }
]

const featuredGuides = [
  {
    title: "Complete Guide to Starting a Business in India",
    description: "Everything you need to know about starting your business journey in India",
    readTime: "15 min read",
    category: "Business Setup",
    href: "/blog/complete-guide-starting-business-india"
  },
  {
    title: "Understanding GST for New Businesses",
    description: "A comprehensive guide to GST registration, filing, and compliance",
    readTime: "12 min read",
    category: "Tax & Compliance",
    href: "/blog/understanding-gst-new-businesses"
  },
  {
    title: "Choosing the Right Business Structure",
    description: "Compare different business structures and choose what's best for you",
    readTime: "10 min read",
    category: "Business Setup",
    href: "/blog/choosing-right-business-structure"
  }
]

export default function ResourcesGuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Business Resources & Guides
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Access comprehensive guides, calculators, templates, and resources to help you start, 
              manage, and grow your business in India.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                50+ Guides
              </Badge>
              <Badge className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
                <Calculator className="w-4 h-4 mr-2" />
                15+ Calculators
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2">
                <FileText className="w-4 h-4 mr-2" />
                Templates & Forms
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Featured Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {featuredGuides.map((guide, index) => (
                <Link key={index} href={guide.href} className="group">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group-hover:border-blue-300">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {guide.category}
                      </Badge>
                      <span className="text-xs text-slate-500">{guide.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Read Guide
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-12 text-center">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {resourceCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-${category.color}-100 flex items-center justify-center mr-4`}>
                        <Icon className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
                        <p className="text-sm text-slate-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {category.resources.map((resource, resourceIndex) => (
                        <Link
                          key={resourceIndex}
                          href={resource.href}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                          {...(('external' in resource && resource.external) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                              {resource.title}
                            </span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {resource.type}
                            </Badge>
                          </div>
                          {('external' in resource && resource.external) ? (
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          ) : (
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Personalized Guidance?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Our expert consultants are here to help you navigate your business journey with personalized advice and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Users className="w-5 h-5 mr-2" />
                  Talk to an Expert
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <FileText className="w-5 h-5 mr-2" />
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Clock,
  Shield,
  CheckCircle,
  Star,
  Zap,
  Award,
  Phone,
  Calculator,
  FileText,
  Building2,
  Target,
  IndianRupee
} from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import Script from "next/script"

export default function ModernHeroSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const trustMetrics = [
    { value: "1,000+", label: "Businesses Registered", icon: Building2 },
    { value: "7-15", label: "Days Average Setup", icon: Clock },
    { value: "100%", label: "Compliance Rate", icon: Shield },
    { value: "4.9/5", label: "Customer Rating", icon: Star }
  ]

  const quickActions = [
    {
      title: "Business Structure Quiz",
      description: "Find the perfect entity type",
      icon: Target,
      href: "/business-structure-quiz",
      popular: true
    },
    {
      title: "Tax Calculator",
      description: "Calculate your tax liability",
      icon: Calculator,
      href: "/business-calculators/income-tax-calculator"
    },
    {
      title: "Company Search",
      description: "Verify company details",
      icon: FileText,
      href: "#company-search"
    }
  ]

  const testimonials = [
    {
      text: "StartBusiness made our company registration seamless. Their CA team guided us perfectly!",
      author: "Rahul Sharma",
      company: "TechStart Solutions",
      rating: 5
    },
    {
      text: "Transparent pricing, fast processing, and excellent support. Highly recommended!",
      author: "Priya Patel",
      company: "StyleHub",
      rating: 5
    },
    {
      text: "Best decision for our startup. They handled everything while we focused on our product.",
      author: "Vikram Singh",
      company: "Global Exports Ltd",
      rating: 5
    }
  ]

  const keyBenefits = [
    { icon: Zap, text: "30% Faster Processing" },
    { icon: IndianRupee, text: "Transparent Pricing" },
    { icon: Award, text: "CA-Verified Services" },
    { icon: Phone, text: "24/7 Expert Support" }
  ]

  // Structured data for SEO
  const heroStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "India's #1 Business Registration Platform - StartBusiness",
    "description": "Register your business in India with 100% compliance guarantee. Expert CA support, transparent pricing, and fastest processing. 1,000+ businesses trust us.",
    "mainEntity": {
      "@type": "Service",
      "name": "Business Registration Services",
      "provider": {
        "@type": "Organization",
        "name": "StartBusiness",
        "description": "India's leading business registration and compliance platform"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceRange": "₹2,999 - ₹15,000"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1000"
      }
    }
  }

  const heroRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-white via-slate-50/50 to-primary/5 min-h-screen flex items-center py-6 sm:py-8 lg:py-12 overflow-hidden"
      aria-label="India's leading business registration platform"
    >
      <Script
        id="hero-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroStructuredData) }}
      />

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Content Section */}
          <div className={`flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Trust Badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                India's #1 Platform
              </Badge>
              <Badge className="bg-slate-100 text-slate-700 border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 fill-current text-yellow-500" />
                1,000+ Businesses
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                Register Your Business in India with
                <span className="text-primary block sm:inline sm:ml-2 lg:ml-3">
                  Zero Hassle
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                From idea to incorporation in just <span className="font-semibold text-primary">7-15 days</span>.
                Expert CA guidance, transparent pricing, and 100% compliance guarantee.
                <span className="font-semibold">No hidden fees, no surprises.</span>
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-white border border-slate-200 hover:border-primary/30 hover:bg-primary/5 rounded-lg transition-all duration-300">
                  <benefit.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link href="/services/private-limited-company" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  Start Registration Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/business-structure-quiz" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 group"
                >
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Take Free Quiz
                </Button>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 sm:pt-4">
              <p className="text-sm font-medium text-slate-700 mb-3">Quick Tools:</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="group relative">
                      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md">
                        <action.icon className="w-4 h-4 text-primary" />
                        <span className="hidden sm:inline text-slate-700 group-hover:text-primary">{action.title}</span>
                        <span className="sm:hidden text-slate-700 group-hover:text-primary">{action.title.split(' ')[0]}</span>
                        {action.popular && (
                          <Badge className="bg-primary/10 text-primary text-xs px-2 py-0.5 border-0">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">

              {/* Main Visual Container */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8">

                {/* Trust Metrics */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {trustMetrics.map((metric, index) => (
                    <div key={index} className="text-center p-2 sm:p-3 bg-slate-50 hover:bg-primary/5 rounded-lg sm:rounded-xl transition-colors duration-300">
                      <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-primary" />
                      <div className="text-base sm:text-lg font-bold text-slate-900">{metric.value}</div>
                      <div className="text-xs text-slate-600">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial Carousel */}
                <div className="relative bg-primary/5 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 mb-2 italic leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold">{testimonials[currentTestimonial].author}</span>
                    <span className="text-slate-500"> • {testimonials[currentTestimonial].company}</span>
                  </div>

                  {/* Testimonial Indicators */}
                  <div className="flex justify-center gap-1 mt-2 sm:mt-3">
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                          index === currentTestimonial ? 'bg-primary' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-primary text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                  ✓ CA Verified
                </div>

                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-slate-700 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                  7-15 Days
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-4 sm:top-8 left-4 sm:left-8 w-full h-full bg-primary/10 rounded-2xl sm:rounded-3xl"></div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className={`mt-8 sm:mt-12 lg:mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">100% Secure & Compliant</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">Government Approved</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-slate-600">Need help choosing?</span>
                <Link href="tel:+91-XXXXXXXXXX">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Call Expert</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Building2, TrendingUp, Clock, FileCheck, Star, ArrowUp, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Script from "next/script"

export default function TrustStatsSection() {
  const [counters, setCounters] = useState({
    businesses: 0,
    successRate: 0,
    hoursSaved: 0,
    compliances: 0,
  })

  const finalStats = {
    businesses: 1000,
    successRate: 100,
    hoursSaved: 2000,
    compliances: 5000,
  }

  // Generate structured data for statistics
  const statsStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Start Business",
    "description": "Professional business registration and compliance services in India",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "ratingCount": finalStats.businesses.toString(),
      "reviewCount": finalStats.businesses.toString()
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Registration",
            "description": "Professional business registration services",
            "provider": {
              "@type": "Organization",
              "name": "Start Business"
            }
          },
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "slogan": "Trusted by Entrepreneurs Nationwide"
  }

  // Simple counter effect
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounters({
        businesses: Math.floor(finalStats.businesses * progress),
        successRate: Math.floor(finalStats.successRate * progress),
        hoursSaved: Math.floor(finalStats.hoursSaved * progress),
        compliances: Math.floor(finalStats.compliances * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounters(finalStats)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      icon: Building2,
      value: `${counters.businesses}+`,
      label: "Business Registered",
      description: "Across India",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+15% this month",
    },
    {
      icon: TrendingUp,
      value: `${counters.successRate}%`,
      label: "Success Rate",
      description: "Positive client feedback",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      trend: "Perfect record",
    },
    {
      icon: Clock,
      value: `${counters.hoursSaved}+`,
      label: "Hours Saved",
      description: "Through automation & tools",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      trend: "Per client avg",
    },
    {
      icon: FileCheck,
      value: `${counters.compliances}+`,
      label: "Compliances Managed",
      description: "GST, ITR, TDS annually",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "Zero penalties",
    },
  ]

  return (
    <section 
      className="py-4 relative overflow-hidden via-white to-blue-50/30"
      aria-labelledby="stats-heading"
    >
      <Script
        id="stats-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(statsStructuredData) }}
      />
      {/* Background Elements */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full -ml-48 -mt-48 opacity-40 blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full -mr-40 -mb-40 opacity-30 blur-2xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge 
            className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-6 py-3 text-sm"
            aria-label="Trust badge"
          >
            <Star className="w-4 h-4 mr-2 fill-current" aria-hidden="true" />
            Trusted by Entrepreneurs Nationwide
          </Badge>

          <h2 
            id="stats-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-3"
          >
            Why Entrepreneurs Trust {""}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StartBusiness
            </span>
          </h2>

          <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            With thousands of successful business registrations and a proven track record, we're the preferred choice
            for entrepreneurs across India.
          </p>
        </div>

        {/* Stats Grid */}
        <div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16"
          role="list"
          aria-label="Statistics"
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative"
              role="listitem"
            >
              {/* Main Card */}
              <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className={`${stat.bgColor} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}
                    aria-hidden="true"
                  >
                    <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.iconColor}`} />
                  </div>

                  {/* Value */}
                  <div 
                    className="text-2xl md:text-4xl font-bold text-slate-800 mb-2"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {stat.value}
                  </div>

                  {/* Label */}
                  <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1 md:mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] md:text-xs text-slate-600 mb-3 md:mb-4">
                    {stat.description}
                  </p>

                  {/* Trend Badge */}
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className={`text-[10px] md:text-xs ${stat.bgColor} ${stat.iconColor} border-0`}
                      aria-label={`Trend: ${stat.trend}`}
                    >
                      <ArrowUp className="w-2 h-2 md:w-3 md:h-3 mr-1" aria-hidden="true" />
                      {stat.trend}
                    </Badge>
                    <CheckCircle 
                      className={`w-4 h-4 md:w-5 md:h-5 ${stat.iconColor} opacity-60`}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
                  aria-hidden="true"
                />
              </div>

              {/* Floating Number Effect */}
              <div 
                className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-[10px] md:text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

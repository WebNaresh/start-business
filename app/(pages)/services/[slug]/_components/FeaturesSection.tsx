"use client"

import { CheckCircle, Users, Star, Sparkles, ArrowRight, Zap, Shield, Award, TrendingUp } from "lucide-react"
import type { ServiceData } from "./service-types"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Script from "next/script"

interface FeaturesSectionProps {
  service: ServiceData
}

export default function FeaturesSection({ service }: FeaturesSectionProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredIdeal, setHoveredIdeal] = useState<number | null>(null)

  // Feature icons mapping
  const featureIcons = [Zap, Shield, Award, TrendingUp, Star, CheckCircle]

  // Ideal for icons mapping
  const idealIcons = [Users, Star, Award, TrendingUp, Shield, Zap]

  // Generate structured data for features
  const featuresStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.shortTitle,
    "description": service.whatIs?.description || "Comprehensive solution designed to meet all your business needs with expert guidance and seamless execution.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    },
    "featureList": service.keyFeatures || [],
    "suitableFor": service.idealFor || [],
    "provider": {
      "@type": "Organization",
      "name": "Your Company Name"
    }
  }

  return (
    <section
      id="features"
      className="py-8 sm:py-12 lg:py-16 relative overflow-hidden bg-white"
      aria-labelledby="features-heading"
    >
      <Script
        id="features-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresStructuredData) }}
      />
      {/* Background Elements - Responsive */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-blue-100 rounded-full -mr-24 sm:-mr-32 lg:-mr-36 -mt-24 sm:-mt-32 lg:-mt-36 blur-2xl lg:blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-blue-50 rounded-full -ml-20 sm:-ml-28 lg:-ml-32 -mb-20 sm:-mb-28 lg:-mb-32 blur-xl lg:blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header - Enhanced Responsive */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-blue-50 text-blue-600 border-blue-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" aria-hidden="true" />
              Service Features & Benefits
            </Badge>

            <h2 id="features-heading" className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 px-4">
             <span className="text-blue-600">{service.shortTitle}</span> in India
            </h2>

            <div className="max-w-5xl mx-auto">
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                {service.whatIs?.description ||
                  `${service.shortTitle} is a comprehensive business solution designed to streamline your operations and ensure compliance with Indian regulations. Our expert team provides end-to-end support, from initial consultation to final implementation, making the entire process seamless and efficient for your business.`}
              </p>
            </div>
          </div>

          {/* Features Grid - Enhanced Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {/* Key Features Card */}
            <div className="relative group">
              <div
                className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-blue-200 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full"
                role="region"
                aria-label="Service advantages"
              >
                {/* Card Background Pattern - Responsive */}
                <div className="absolute inset-0 opacity-5" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-500 rounded-full -mr-8 sm:-mr-10 lg:-mr-12 -mt-8 sm:-mt-10 lg:-mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-400 rounded-full -ml-6 sm:-ml-8 lg:-ml-10 -mb-6 sm:-mb-8 lg:-mb-10"></div>
                </div>

                <div className="relative z-10">
                  {/* Card Header - Enhanced Mobile */}
                  <div className="flex items-start sm:items-center mb-4 sm:mb-6">
                    <div
                      className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 mb-1 leading-tight">
                        Advantages of <span className="text-blue-600 break-words">{service.shortTitle.replace("Registration", "").trim()}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">What makes us different</p>
                    </div>
                  </div>

                  {/* Features List - Enhanced Mobile Experience */}
                  <div className="space-y-2 sm:space-y-3" role="list" aria-label="Key features">
                    {service.keyFeatures?.map((feature: string, index: number) => {
                      const IconComponent = featureIcons[index % featureIcons.length]
                      return (
                        <div
                          key={index}
                          onMouseEnter={() => setHoveredFeature(index)}
                          onMouseLeave={() => setHoveredFeature(null)}
                          onFocus={() => setHoveredFeature(index)}
                          onBlur={() => setHoveredFeature(null)}
                          className="group/item flex items-start sm:items-center p-2.5 sm:p-3 lg:p-4 rounded-lg bg-white hover:bg-blue-50 hover:shadow-sm focus:bg-blue-50 focus:shadow-sm transition-all duration-300 cursor-pointer touch-manipulation"
                          role="listitem"
                          tabIndex={0}
                          aria-label={feature}
                        >
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 ${hoveredFeature === index ? "bg-blue-600" : "bg-blue-100"} rounded-md flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 group-hover/item:scale-105 flex-shrink-0 mt-0.5 sm:mt-0`}
                            aria-hidden="true"
                          >
                            <IconComponent
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${hoveredFeature === index ? "text-white" : "text-blue-600"} transition-colors duration-300`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs sm:text-sm lg:text-base text-slate-800 font-medium group-hover/item:text-slate-900 transition-colors leading-relaxed block">
                              {feature}
                            </span>
                          </div>
                          <ArrowRight
                            className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2 mt-0.5 sm:mt-0"
                            aria-hidden="true"
                          />
                        </div>
                      )
                    }) || []}
                  </div>

                  {/* Feature Count Badge - Enhanced Mobile */}
                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-0 text-xs sm:text-sm px-3 py-1.5 w-fit" aria-label={`${service.keyFeatures?.length || 0} key features available`}>
                      {service.keyFeatures?.length || 0} Key Features
                    </Badge>
                    <div className="flex items-center text-xs sm:text-sm text-slate-500">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      Premium Benefits
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ideal For Card - Enhanced Responsive */}
            <div className="relative group">
              <div
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full"
                role="region"
                aria-label="Suitable business types"
              >
                {/* Card Background Pattern - Responsive */}
                <div className="absolute inset-0 opacity-5" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-500 rounded-full -mr-8 sm:-mr-10 lg:-mr-12 -mt-8 sm:-mt-10 lg:-mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-400 rounded-full -ml-6 sm:-ml-8 lg:-ml-10 -mb-6 sm:-mb-8 lg:-mb-10"></div>
                </div>

                <div className="relative z-10">
                  {/* Card Header - Enhanced Mobile */}
                  <div className="flex items-start sm:items-center mb-4 sm:mb-6">
                    <div
                      className="bg-blue-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 mb-1 leading-tight">
                        Who Should Register For <span className="text-blue-600 break-words">{service.shortTitle.replace("Registration", "").trim()}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">Who should choose this</p>
                    </div>
                  </div>

                  {/* Ideal For List - Enhanced Mobile Experience */}
                  <div className="space-y-2 sm:space-y-3" role="list" aria-label="Suitable business types">
                    {service.idealFor?.map((item: string, index: number) => {
                      const IconComponent = idealIcons[index % idealIcons.length]
                      return (
                        <div
                          key={index}
                          onMouseEnter={() => setHoveredIdeal(index)}
                          onMouseLeave={() => setHoveredIdeal(null)}
                          onFocus={() => setHoveredIdeal(index)}
                          onBlur={() => setHoveredIdeal(null)}
                          className="group/item flex items-start sm:items-center p-2.5 sm:p-3 lg:p-4 rounded-lg bg-slate-50 hover:bg-blue-50 hover:shadow-sm focus:bg-blue-50 focus:shadow-sm transition-all duration-300 cursor-pointer touch-manipulation"
                          role="listitem"
                          tabIndex={0}
                          aria-label={item}
                        >
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 ${hoveredIdeal === index ? "bg-blue-600" : "bg-blue-100"} rounded-md flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 group-hover/item:scale-105 flex-shrink-0 mt-0.5 sm:mt-0`}
                            aria-hidden="true"
                          >
                            <IconComponent
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${hoveredIdeal === index ? "text-white" : "text-blue-600"} transition-colors duration-300`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs sm:text-sm lg:text-base text-slate-800 font-medium group-hover/item:text-slate-900 transition-colors leading-relaxed block">
                              {item}
                            </span>
                          </div>
                          <ArrowRight
                            className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2 mt-0.5 sm:mt-0"
                            aria-hidden="true"
                          />
                        </div>
                      )
                    }) || []}
                  </div>

                  {/* Ideal For Count Badge - Enhanced Mobile */}
                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-0 text-xs sm:text-sm px-3 py-1.5 w-fit" aria-label={`${service.idealFor?.length || 0} business types supported`}>
                      {service.idealFor?.length || 0} Business Types
                    </Badge>
                    <div className="flex items-center text-xs sm:text-sm text-slate-500">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" aria-hidden="true" />
                      Suitable Options
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Enhanced Responsive CTA */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden"
              role="complementary"
              aria-label="Call to action"
            >
              {/* Background Pattern - Responsive */}
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white rounded-full -mr-10 sm:-mr-14 lg:-mr-16 -mt-10 sm:-mt-14 lg:-mt-16"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-full -ml-8 sm:-ml-10 lg:-ml-12 -mb-8 sm:-mb-10 lg:-mb-12"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white/5 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                    Get Your <span className="text-blue-200">{service.shortTitle.replace("Registration", "").trim()}</span> Registered Today
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
                    Join thousands of satisfied clients who chose our expert services for their business needs
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      <span>Expert Guidance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      <span>Quick Processing</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      <span>100% Compliance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
      className="py-4 relative overflow-hidden bg-white"
      aria-labelledby="features-heading"
    >
      <Script
        id="features-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresStructuredData) }}
      />
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full -mr-36 -mt-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-50 text-blue-600 border-blue-200 px-4 py-2 text-xs">
              <Sparkles className="w-3 h-3 mr-1.5" aria-hidden="true" />
              Service Features & Benefits
            </Badge>

            <h2 id="features-heading" className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
             <span className="text-blue-600">{service.shortTitle}</span> in India
            </h2>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {service.whatIs?.description ||
                "Comprehensive solution designed to meet all your business needs with expert guidance and seamless execution."}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Key Features Card */}
            <div className="relative group">
              <div
                className="bg-blue-50 rounded-2xl p-6 lg:p-8 border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                role="region"
                aria-label="Service advantages"
              >
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-400 rounded-full -ml-10 -mb-10"></div>
                </div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center mb-6">
                    <div
                      className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-0.5">Advantages of <span className="text-blue-600">{service.shortTitle.replace("Registration", "").trim()}</span></h3>
                      <p className="text-xs text-slate-600">What makes us different</p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3" role="list" aria-label="Key features">
                    {service.keyFeatures?.map((feature: string, index: number) => {
                      const IconComponent = featureIcons[index % featureIcons.length]
                      return (
                        <div
                          key={index}
                          onMouseEnter={() => setHoveredFeature(index)}
                          onMouseLeave={() => setHoveredFeature(null)}
                          className="group/item flex items-center p-3 rounded-lg bg-white hover:bg-blue-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                          role="listitem"
                          tabIndex={0}
                          aria-label={feature}
                        >
                          <div
                            className={`w-8 h-8 ${hoveredFeature === index ? "bg-blue-600" : "bg-blue-100"} rounded-md flex items-center justify-center mr-3 transition-all duration-300 group-hover/item:scale-105`}
                            aria-hidden="true"
                          >
                            <IconComponent
                              className={`w-4 h-4 ${hoveredFeature === index ? "text-white" : "text-blue-600"} transition-colors duration-300`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs text-slate-800 font-medium group-hover/item:text-slate-900 transition-colors">
                              {feature}
                            </span>
                          </div>
                          <ArrowRight
                            className="w-3 h-3 text-slate-500 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all duration-300"
                            aria-hidden="true"
                          />
                        </div>
                      )
                    }) || []}
                  </div>

                  {/* Feature Count Badge */}
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-0 text-xs" aria-label={`${service.keyFeatures?.length || 0} key features available`}>
                      {service.keyFeatures?.length || 0} Key Features
                    </Badge>
                    <div className="flex items-center text-xs text-slate-500">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      Premium Benefits
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ideal For Card */}
            <div className="relative group">
              <div 
                className="bg-white rounded-2xl p-6 lg:p-8 border-2 border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                role="region"
                aria-label="Suitable business types"
              >
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-400 rounded-full -ml-10 -mb-10"></div>
                </div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center mb-6">
                    <div 
                      className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-0.5">Who Should Register For <span className="text-blue-600">{service.shortTitle.replace("Registration", "").trim()}</span></h3>
                      <p className="text-xs text-slate-600">Who should choose this</p>
                    </div>
                  </div>

                  {/* Ideal For List */}
                  <div className="space-y-3" role="list" aria-label="Suitable business types">
                    {service.idealFor?.map((item: string, index: number) => {
                      const IconComponent = idealIcons[index % idealIcons.length]
                      return (
                        <div
                          key={index}
                          onMouseEnter={() => setHoveredIdeal(index)}
                          onMouseLeave={() => setHoveredIdeal(null)}
                          className="group/item flex items-center p-3 rounded-lg bg-slate-50 hover:bg-blue-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                          role="listitem"
                          tabIndex={0}
                          aria-label={item}
                        >
                          <div
                            className={`w-8 h-8 ${hoveredIdeal === index ? "bg-blue-600" : "bg-blue-100"} rounded-md flex items-center justify-center mr-3 transition-all duration-300 group-hover/item:scale-105`}
                            aria-hidden="true"
                          >
                            <IconComponent
                              className={`w-4 h-4 ${hoveredIdeal === index ? "text-white" : "text-blue-600"} transition-colors duration-300`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs text-slate-800 font-medium group-hover/item:text-slate-900 transition-colors">
                              {item}
                            </span>
                          </div>
                          <ArrowRight 
                            className="w-3 h-3 text-slate-500 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all duration-300"
                            aria-hidden="true"
                          />
                        </div>
                      )
                    }) || []}
                  </div>

                  {/* Ideal For Count Badge */}
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-0 text-xs" aria-label={`${service.idealFor?.length || 0} business types supported`}>
                      {service.idealFor?.length || 0} Business Types
                    </Badge>
                    <div className="flex items-center text-xs text-slate-500">
                      <Users className="w-3 h-3 mr-1" aria-hidden="true" />
                      Suitable Options
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 text-center">
            <div
              className="bg-blue-600 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden"
              role="complementary"
              aria-label="Call to action"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
              </div>

              <div className="relative z-10">
                <div className="items-center">
                  {/* Center - Message */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-1.5">Get Your {service.shortTitle.replace("Registration", "").trim()} Registered Today</h3>
                    <p className="text-white/90 text-xs">Join thousands who chose our expert services</p>
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

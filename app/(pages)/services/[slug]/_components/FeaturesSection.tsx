"use client"

import { CheckCircle, Users, Star, Sparkles, ArrowRight, Zap, Shield, Award, TrendingUp } from "lucide-react"
import type { ServiceData } from "./service-types"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

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

  return (
    <section
      id="features"
      className="py-4 relative overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full -ml-40 -mb-40 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-50 text-blue-600 border-blue-200 px-6 py-3 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Service Features & Benefits
            </Badge>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-slate-800">Why Choose Our</span>{" "}
              <span className="text-blue-600">
                {service.shortTitle}
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl mx-auto">
              {service.whatIs?.description ||
                "Comprehensive solution designed to meet all your business needs with expert guidance and seamless execution."}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Key Features Card */}
            <div className="relative group">
              <div
                className="bg-blue-50 rounded-3xl p-8 lg:p-10 border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full -ml-12 -mb-12"></div>
                </div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center mb-8">
                    <div
                      className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                    >
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 mb-1">Key Features</h3>
                      <p className="text-xs text-slate-600">What makes us different</p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    {service.keyFeatures?.map((feature: string, index: number) => {
                      const IconComponent = featureIcons[index % featureIcons.length]
                      return (
                        <div
                          key={index}
                          onMouseEnter={() => setHoveredFeature(index)}
                          onMouseLeave={() => setHoveredFeature(null)}
                          className="group/item flex items-center p-4 rounded-xl bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <div
                            className={`w-10 h-10 ${hoveredFeature === index ? "bg-blue-600" : "bg-blue-100"} rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover/item:scale-110`}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${hoveredFeature === index ? "text-white" : "text-blue-600"} transition-colors duration-300`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm text-slate-800 font-medium group-hover/item:text-slate-900 transition-colors">
                              {feature}
                            </span>
                          </div>
                          <ArrowRight
                            className="w-4 h-4 text-slate-400 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all duration-300"
                          />
                        </div>
                      )
                    }) || []}
                  </div>

                  {/* Feature Count Badge */}
                  <div className="mt-6 flex justify-between items-center">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-0">
                      {service.keyFeatures?.length || 0} Key Features
                    </Badge>
                    <div className="flex items-center text-sm text-slate-500">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      Premium Benefits
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ideal For Card */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 lg:p-10 border-2 border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full -ml-12 -mb-12"></div>
                </div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center mb-8">
                    <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 mb-1">Perfect For</h3>
                      <p className="text-xs text-slate-600">Who should choose this</p>
                    </div>
                  </div>

                  {/* Ideal For List */}
                  <div className="space-y-4">
                    {service.idealFor?.map((item: string, index: number) => {
                      const IconComponent = idealIcons[index % idealIcons.length]
                      return (
                        <div
                          key={index}
                          onMouseEnter={() => setHoveredIdeal(index)}
                          onMouseLeave={() => setHoveredIdeal(null)}
                          className="group/item flex items-center p-4 rounded-xl bg-slate-50 hover:bg-blue-50 hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <div
                            className={`w-10 h-10 ${hoveredIdeal === index ? "bg-blue-600" : "bg-blue-100"} rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover/item:scale-110`}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${hoveredIdeal === index ? "text-white" : "text-blue-600"} transition-colors duration-300`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm text-slate-800 font-medium group-hover/item:text-slate-900 transition-colors">
                              {item}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all duration-300" />
                        </div>
                      )
                    }) || []}
                  </div>

                  {/* Ideal For Count Badge */}
                  <div className="mt-6 flex justify-between items-center">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-0">
                      {service.idealFor?.length || 0} Business Types
                    </Badge>
                    <div className="flex items-center text-sm text-slate-500">
                      <Users className="w-4 h-4 mr-1" />
                      Suitable Options
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 text-center">
            <div
              className="bg-blue-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
              </div>

              <div className="relative z-10">
                <div className="items-center">
                  {/* Center - Message */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
                    <p className="text-white/90 text-sm">Join thousands who chose our expert services</p>
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

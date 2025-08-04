"use client"

import type React from "react"
import { useRef } from "react"

import { ArrowRight, Shield, Clock, Users, CheckCircle, Star, TrendingUp, Award, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import Link from "next/link"

import Script from "next/script"
import Image from "next/image"

export default function ProfessionalHeroSection() {


  const keyFeatures = [
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Get your business registered in 7-15 days with our streamlined process"
    },
    {
      icon: Shield,
      title: "100% Compliance",
      description: "Guaranteed regulatory compliance with all government requirements"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated CA and legal experts to guide you through every step"
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Strategic business setup to maximize your growth potential"
    }
  ]

  // Generate structured data for the hero section
  const heroStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Business Registration and Compliance Services in India",
    "description": "India's leading business registration platform with 10,000+ companies registered. Expert CA and legal support for Private Limited, LLP, OPC registration with 100% compliance guarantee.",
    "mainEntity": {
      "@type": "Service",
      "name": "Business Registration Services",
      "provider": {
        "@type": "Organization",
        "name": "StartBusiness",
        "description": "Leading provider of business registration and compliance services in India with 7+ years experience"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
     
        "Expert CA and legal guidance",
        "End-to-end business solutions",
        "100% compliance guaranteed"
      ]
    }
  }

  const heroRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-white via-slate-50 to-blue-50/30 min-h-[90vh] flex items-center py-8 overflow-hidden"
      aria-label="Professional business registration services"
    >
      <Script
        id="hero-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroStructuredData) }}
      />

      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -mr-64 -mt-64 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-100/15 to-transparent rounded-full -ml-48 -mb-48 blur-2xl" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <div className="flex flex-col justify-center space-y-8">


            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Start Your Business with
                <span className="text-primary ml-2">
                  Expert Guidance
                </span>
              </h1>

              {/* Professional Description */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                India's most trusted business registration platform. Get your Private Limited Company, LLP, or OPC registered with 100% compliance guarantee.
              </p>
            </div>

            {/* Key Features - Simplified */}
            <div className="grid grid-cols-2 gap-6">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{feature.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Professional CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-base font-semibold"
              >
                <Link href="/contact" className="group">
                  Start Registration Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 px-8 py-4 text-base font-medium"
              >
                <Link href="/services" className="group">
                  <Building2 className="mr-2 h-5 w-5" />
                  Explore Services
                </Link>
              </Button>
            </div>

            {/* Professional Guarantee */}
            <div className="flex items-center space-x-2 text-sm text-slate-600 pt-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>100% Money-back guarantee • Free consultation • 7-15 days processing</span>
            </div>
          </div>

          {/* Professional Visual Section */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              {/* Main Image Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-100">
                <Image
                  src="/hero/hero-latest-1.png"
                  alt="Professional business registration services"
                  className="object-contain w-full h-full"
                  priority={true}
                  width={1200}
                  height={900}
                  quality={95}
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✓ Verified
                </div>
            
              </div>

              {/* Subtle Decorative Elements */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-3xl" />
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators - Clean and minimal */}
        <div className="mt-16 pt-8 border-t border-slate-200/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-8 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Expert CA Team</span>
              </div>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Trusted by 1,000+ entrepreneurs
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

